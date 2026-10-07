// `type`: 'Certification' = passed an exam; 'Training' = course with a completion quiz; 'Awareness' = short awareness course.
const certificationsData = [
  {
    id: "tenacy",
    name: "Tenacy Certified User",
    issuer: "Tenacy",
    type: "Certification",
    category: "Security",
    connections: ["cissp", "anssi"],
    obtained: "2025",
    // TODO(Hubert): confirm the description of Tenacy (governance, risk and compliance platform).
    summary: "Certification on Tenacy, a cybersecurity governance, risk and compliance (GRC) platform, obtained by passing an exam."
  },
  {
    id: "anssi",
    name: "SecNumacadémie - Cybersecurity Awareness",
    issuer: "ANSSI (French National Cybersecurity Agency)",
    type: "Awareness",
    category: "Security",
    connections: ["fortinet", "cisco", "ethicalHacker"],
    obtained: "2023",
    summary: "Online course on cybersecurity fundamentals: the threat landscape, authentication, safe internet use and device security."
  },
  {
    id: "cisco",
    name: "Introduction to Cybersecurity",
    issuer: "Cisco",
    type: "Training",
    category: "Security",
    connections: ["anssi", "fortinet"],
    obtained: "2023",
    // TODO(Hubert): check this summary matches what the course covered.
    summary: "Cisco's introductory course on common cyber threats, protecting personal data and devices, and how organizations defend against attacks."
  },
  {
    id: "fortinet",
    name: "Information Security Awareness",
    issuer: "Fortinet",
    type: "Awareness",
    category: "Security",
    connections: ["anssi", "cisco"],
    obtained: "2023",
    summary: "An English-language introduction to information security best practices, similar in scope to SecNumacadémie."
  },
  {
    id: "cissp",
    name: "CISSP Preparation Course",
    issuer: "Master of Project Academy",
    type: "Training",
    category: "Security",
    connections: ["ethicalHacker", "tenacy"],
    obtained: "2023",
    summary: "An online course preparing for the CISSP exam. This is a training course, not the CISSP certification itself."
  },
  {
    id: "ethicalHacker",
    name: "Ethical Hacker Training",
    issuer: "Master of Project Academy",
    type: "Training",
    category: "Security",
    connections: ["cissp", "anssi"],
    obtained: "2023",
    summary: "An introductory course on the basics of ethical hacking."
  },
  {
    id: "vigipirate",
    name: "Vigipirate Plan Awareness",
    issuer: "French Government (MOOC)",
    type: "Awareness",
    category: "Other",
    connections: ["hi"],
    obtained: "2023",
    summary: "An online course on the Vigipirate plan, France's national system for preventing and responding to terrorist threats."
  },
  {
    id: "hi",
    name: "Field Onboarding & Security Training (5 modules)",
    issuer: "Humanity & Inclusion",
    type: "Training",
    category: "Other",
    connections: ["vigipirate"],
    obtained: "2023",
    summary: "Five onboarding modules from the international NGO Humanity & Inclusion: staff welcome, HI security policies, explosive ordnance safety, health and safety in dangerous areas, and fraud and corruption prevention."
  },
];

export default certificationsData;