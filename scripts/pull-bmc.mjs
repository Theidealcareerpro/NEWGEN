// scripts/pull-bmc.mjs
import 'dotenv/config';
import fetch from 'node-fetch';
import { createClient } from '@supabase/supabase-js';

const {
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  BMC_API_KEY,
  BMC_BASE_URL = 'https://developers.buymeacoffee.com/api/v1',
  BMC_PAGE_SIZE = '50',
} = process.env;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY envs.');
  process.exit(1);
}
if (!BMC_API_KEY) {
  console.error('❌ Missing BMC_API_KEY env.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

async function fetchSupporters({ page = 1 } = {}) {
  const urlCandidates = [
    `${BMC_BASE_URL}/supporters?page=${page}&per_page=${BMC_PAGE_SIZE}`,
    `${BMC_BASE_URL}/supporters?page=${page}`,
    `${BMC_BASE_URL}/supporters`,
  ];
  const headerCandidates = [
    { Authorization: `Bearer ${BMC_API_KEY}` },
    { 'X-API-Key': BMC_API_KEY },
  ];

  for (const url of urlCandidates) {
    for (const headers of headerCandidates) {
      try {
        const res = await fetch(url, { headers });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            return { items: data, nextPage: null };
          } else if (data?.data) {
            const nextPage = data?.pagination?.has_next_page ? page + 1 : null;
            return { items: data.data, nextPage };
          } else {
            return { items: data, nextPage: null };
          }
        } else {
          continue;
        }
      } catch {
        continue;
      }
    }
  }
  throw new Error('Could not fetch supporters from any known BMC endpoint/header combination.');
}

function extractFingerprint(note = '') {
  const m = note.match(/fp-[a-zA-Z0-9]{6,}/);
  return m ? m[0] : null;
}

function normalizeSupporter(raw) {
  const supporterId = raw?.support_id || raw?.id || raw?.payment_id || null;
  const occurredAt =
    raw?.support_created_on ||
    raw?.created_at ||
    raw?.createdOn ||
    raw?.purchase_time ||
    null;
  const email = raw?.supporter_email || raw?.payer_email || raw?.email || null;
  const name = raw?.supporter_name || raw?.payer_name || raw?.name || null;
  const amount =
    typeof raw?.support_coffees === 'number' && raw?.coffee_price
      ? Number(raw.support_coffees) * Number(raw.coffee_price)
      : raw?.amount || raw?.support_amount || null;
  const currency =
    raw?.support_currency || raw?.currency || raw?.amount_currency || null;
  const note =
    raw?.support_note || raw?.note || raw?.message || raw?.supporter_message || '';

  return {
    supporterId,
    occurredAt: occurredAt ? new Date(occurredAt).toISOString() : null,
    email,
    name,
    amount: amount != null ? Number(amount) : null,
    currency: currency || null,
    note: typeof note === 'string' ? note : JSON.stringify(note),
    raw,
  };
}

async function extendForSupporter({ fingerprint, email }) {
  if (!fingerprint && !email) return { updated: 0 };

  if (fingerprint) {
    const { data, error } = await supabase
      .from('usage_tracking')
      .select('fingerprint, expiry_date, is_supporter')
      .eq('fingerprint', fingerprint)
      .maybeSingle();

    if (!error && data?.fingerprint) {
      const now = Date.now();
      const base = data.expiry_date ? new Date(data.expiry_date).getTime() : now;
      const extended = new Date(Math.max(now, base) + 30 * 24 * 60 * 60 * 1000)
        .toISOString();

      const { error: updErr } = await supabase
        .from('usage_tracking')
        .update({
          is_supporter: true,
          expiry_date: extended,
          updated_at: new Date().toISOString(),
        })
        .eq('fingerprint', fingerprint);

      if (updErr) {
        console.error('Supabase update error (fingerprint):', updErr.message);
        return { updated: 0 };
      }
      return { updated: 1 };
    }
  }

  if (email) {
    const { data: found, error: findErr } = await supabase
      .from('usage_tracking')
      .select('fingerprint, expiry_date, is_supporter')
      .eq('email', email)
      .maybeSingle();

    if (!findErr && found?.fingerprint) {
      const now = Date.now();
      const base = found.expiry_date ? new Date(found.expiry_date).getTime() : now;
      const extended = new Date(Math.max(now, base) + 30 * 24 * 60 * 60 * 1000)
        .toISOString();
      const { error: updErr } = await supabase
        .from('usage_tracking')
        .update({
          is_supporter: true,
          expiry_date: extended,
          updated_at: new Date().toISOString(),
        })
        .eq('fingerprint', found.fingerprint);

      if (updErr) {
        console.error('Supabase update error (email):', updErr.message);
        return { updated: 0 };
      }
      return { updated: 1 };
    }
  }

  return { updated: 0 };
}

async function getSyncState() {
  const { data, error } = await supabase
    .from('bmc_sync_state')
    .select('*')
    .order('id', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('Read sync state error:', error.message);
    return { last_cursor: null, last_supporter_iso: null };
  }
  return {
    last_cursor: data?.last_cursor || null,
    last_supporter_iso: data?.last_supporter_iso || null,
  };
}

async function upsertSyncState({ last_cursor, last_supporter_iso }) {
  const { error } = await supabase.from('bmc_sync_state').insert({
    last_cursor,
    last_supporter_iso,
    updated_at: new Date().toISOString(),
  });
  if (error) console.error('Upsert sync state error:', error.message);
}

async function main() {
  console.log('🔄 Pulling BMC supporters…');

  const state = await getSyncState();
  let page = 1;
  let processed = 0;
  let newestTimestamp = state.last_supporter_iso
    ? new Date(state.last_supporter_iso).getTime()
    : 0;

  while (true) {
    const { items, nextPage } = await fetchSupporters({ page });
    if (!items || (Array.isArray(items) && items.length === 0)) break;

    const array = Array.isArray(items) ? items : items?.data || [];
    for (const raw of array) {
      const s = normalizeSupporter(raw);

      const ts = s.occurredAt ? new Date(s.occurredAt).getTime() : 0;
      if (newestTimestamp && ts && ts <= newestTimestamp) {
        continue;
      }

      await supabase.from('bmc_supporter_events').insert({
        supporter_id: s.supporterId,
        occurred_at: s.occurredAt,
        email: s.email,
        name: s.name,
        amount: s.amount,
        currency: s.currency,
        note: s.note,
        raw: s.raw,
      });

      const fp = extractFingerprint(s.note);
      const { updated } = await extendForSupporter({
        fingerprint: fp,
        email: s.email,
      });
      if (updated) processed++;

      if (ts > newestTimestamp) newestTimestamp = ts;
    }

    if (!nextPage) break;
    page = nextPage;
  }

  if (newestTimestamp) {
    await upsertSyncState({
      last_cursor: null,
      last_supporter_iso: new Date(newestTimestamp).toISOString(),
    });
  }

  console.log(`✅ Done. Processed supporters: ${processed}`);
}

main().catch((err) => {
  console.error('Fatal error in BMC pull:', err);
  process.exit(1);
});
