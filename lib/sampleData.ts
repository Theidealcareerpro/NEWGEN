// lib/sampleData.ts
import { CVData } from "./types";

export const sampleCV: CVData = {
  name: "Jane Doe",
  location: "London, UK",
  phone: "07812345678",
  email: "jane.doe@example.com",
  linkedin: "https://linkedin.com/in/janedoe",
  portfolio: "https://janedoe.dev",
  summary:
    "Results-driven software engineer with extensive experience in crafting scalable web applications and optimizing cloud infrastructure. Proficient in leading agile teams to deliver innovative solutions that enhance user experience and operational efficiency.",
  education: [
    {
      school: "Imperial College London",
      degree: "BSc Computer Science",
      location: "London, UK",
      date: "2017 - 2020",
      details:
        "Graduated with First Class Honours, specializing in cloud computing and software architecture. Developed a distributed task scheduler for final-year project.",
    },
  ],
  experience: [
    {
      company: "SkyNet Technologies",
      role: "Full-Stack Software Engineer",
      location: "London, UK",
      date: "2021 - Present",
      description:
        "At SkyNet Technologies, architected and delivered high-performance, cloud-native web applications using React, TypeScript, Node.js, and AWS, serving over 50,000 monthly active users. Designed scalable microservices architectures, integrating GraphQL APIs and PostgreSQL databases to ensure robust data handling. Spearheaded the adoption of CI/CD pipelines using Jenkins and GitHub Actions, reducing deployment times by 40%. Collaborated with product managers and UX designers to refine application features, achieving a 30% increase in user satisfaction. Led code reviews and implemented automated testing with Jest, improving code coverage to 95%.",
      achievements: [
        "Enhanced application performance by 28% via optimized GraphQL queries and caching strategies.",
        "Led a team of 4 developers to deliver a client portal, increasing customer retention by 35%.",
      ],
    },
  ],
  skills: [
    "Proficient in JavaScript, building dynamic, interactive web applications with optimized performance.",
    "Expert in TypeScript, enhancing code reliability with static typing in large-scale projects.",
    "Skilled in React, crafting responsive, component-based UIs for seamless user experiences.",
    "Experienced with Node.js, developing scalable backend services and RESTful APIs.",
    "Adept at AWS, deploying and managing cloud infrastructure with EC2, Lambda, and S3.",
    "Proficient in GraphQL, designing efficient APIs for flexible data querying.",
    "Fluent in Git, managing version control and collaborative workflows with GitHub.",
  ],
  certifications: [
    "AWS Certified Solutions Architect – Associate",
    "Certified Kubernetes Application Developer",
  ],
  projects: [
    "Built a real-time analytics dashboard with React, Node.js, and MongoDB, improving data processing speed by 20%. Kindly visit E-Portfolio Url for more: https://janedoe.dev",
  ],
  theme: "blue",
  font: "inter",
};
