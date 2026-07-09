const certificationsData = [
  { 
    id: "anssi", 
    name: "ANSSI - Cybersecurity Awareness", 
    category: "Security", 
    connections: ["fortinet", "cissp", "ethicalHacker"], 
    obtained: "2023", 
    summary: "Based on ANSSI (French National Cybersecurity Agency) standards...",
    document: "/Certifications/FrenchInstitutions/attestation_anssi.pdf"
  },
  { 
    id: "fortinet",
    name: "Fortinet - Information Security Awareness",
    category: "Security",
    connections: ["anssi", "cissp"],
    obtained: "2023",
    summary: "Provides foundational knowledge on cybersecurity best practices...",
    document: "/Certifications/Fortinet/Course_Completion_Certificate.pdf"
  },
  { 
    id: "cissp",
    name: "MAP - CISSP Training",
    category: "Security",
    connections: ["ethicalHacker", "fortinet"],
    obtained: "2023",
    summary: "Comprehensive CISSP-oriented training",
    document: "/Certifications/MasterOfProjectAcademy/certificate-of-completion-for-free-cissp-training.pdf"
  },
  { 
    id: "ethicalHacker",
    name: "MAP - Ethical Hacker Training",
    category: "Security",
    connections: ["cissp"],
    obtained: "2023",
    summary: "Introduces ethical hacking techniques..."
  },
  { 
    id: "vigipirate",
    name: "Vigipirate",
    category: "Other",
    connections: ["hiIntroSecurity"],
    obtained: "2023",
    summary: "French national safety program..."
  },
  { 
    id: "hiFraud",
    name: "HI - Awareness of Fraud and Corruption Prevention",
    category: "Other",
    connections: ["hiIntroSecurity"],
    obtained: "2023",
    summary: "Focuses on identifying and preventing fraud..."
  },
  { 
    id: "hiHealth",
    name: "HI - Health Module for International Staff",
    category: "Other",
    connections: ["hiIntroSecurity"],
    obtained: "2023",
    summary: "Covers essential health and safety practices..."
  },
  { 
    id: "hiIntroSecurity",
    name: "HI - Introduction to Security at HI",
    category: "Security",
    connections: ["vigipirate", "hiExplosive"],
    obtained: "2023",
    summary: "Introduces HI’s security policies and situational awareness."
  },
  { 
    id: "hiExplosive",
    name: "HI - Explosive Ordnance Security Training",
    category: "Security",
    connections: ["hiIntroSecurity"],
    obtained: "2023",
    summary: "Provides awareness and safety procedures for environments contaminated by explosives."
  },
  { 
    id: "hiWelcome",
    name: "HI - Welcome (FR)",
    category: "Other",
    connections: ["hiIntroSecurity", "hiHealth"],
    obtained: "2023",
    summary: "Introductory onboarding program for new HI staff."
  },
];

export default certificationsData;
