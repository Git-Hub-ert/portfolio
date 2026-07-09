// ExperiencePage.jsx
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import HILogo from '../assets/CompanyLogos/HILogo.png';
import BirdzLogo from '../assets/CompanyLogos/BirdzLogo.png';
import ErciyesLogo from '../assets/CompanyLogos/ErciyesLogo.png';
import BKLogo from '../assets/CompanyLogos/BKLogo.png';
import CagetteLogo from '../assets/CompanyLogos/CagetteLogo.png';
import ValboisLogo from '../assets/CompanyLogos/ValboisLogo.png';

export default function ExperiencePage() {
  const Jobs = [
    {
      title: 'IT advisor',
      company: 'Valbois',
      date: 'Dec 2025 - June 2026',
      place: 'Lyon, France',
      description: 'Worked as the only IT professional in a small company. Solved tickets for the users, did the configuration of the company\'s digital environment, developed a tool to automatically obtain potential clients contact details in a specific zone.',
      logo: ValboisLogo,
    },
    {
      title: 'CISO Apprentice (Upcoming)',
      company: 'Véolia - Birdz',
      date: 'Sep 2026 - Sep 2028',
      place: 'Lyon, France',
      description: 'Starting September 2026. I will be joining the Birdz cybersecurity team as a CISO apprentice, working on governance, risk, and compliance while completing my engineering degree.',
      logo: BirdzLogo,
    },
  ];

  const internships = [
    {
      title: 'Software Implementation',
      company: 'Humanity & Inclusion',
      date: 'Jun 2023 - Jul 2023',
      place: 'Lyon, France',
      description: 'Analyzed 30+ IT monitoring tools, gathered vendor input, and evaluated them using MuSCoW, SWOT, and SMART methods. Deployed and configured a CheckMK monitoring server after negotiating a reduced licensing price.',
      logo: HILogo,
    },
    {
      title: 'Phishing Attack Prevention',
      company: 'Véolia - Birdz',
      date: 'Feb 2024 - Apr 2024',
      place: 'Lyon, France',
      description: 'Built and ran a phishing awareness campaign on Google Cloud (300 users). Created phishing emails and sites, analyzed results (10% victim rate), trained employees, and cut organizational risk by half.',
      logo: BirdzLogo,
    },
    {
      title: 'Adversarial Attack Generation',
      company: 'Erciyes University',
      date: 'Jun 2025 - Aug 2025',
      place: 'Kayseri, Turkey',
      description: 'Built Python modules and a React dashboard for OptiAttack, analyzed JSON results, ran E2E tests, and collaborated with a 6-person international team to improve AI robustness.',
      logo: ErciyesLogo,
    },
  ];

  const studentJobs = [
    {
      title: 'Versatile Employee',
      company: 'Burger King',
      date: 'Apr 2023 - Aug 2023',
      place: 'Lyon, France',
      description: 'Worked as part of a fast-paced team to prepare orders, assist customers, and maintain service quality during rush hours. Developed teamwork, communication, and stress-management skills.',
      logo: BKLogo,
    },
    {
      title: 'Store Employee',
      company: 'La Cagette des Gônes',
      date: 'Jan 2024 - September 2024',
      place: 'Lyon, France',
      description: 'Added new products to inventory, advised customers, handled payments, and managed stock organization. Ensured customer satisfaction and contributed to daily shop operations.',
      logo: CagetteLogo,
    },
  ];
  const [activeJob, setActiveJob] = useState(0);
  const [activeInternship, setActiveInternship] = useState(0);
  const [activeStudentJob, setActiveStudentJob] = useState(0);

  return (
    <div className="experience-container">
      <Helmet>
        <title>Experience | Hubert de Tournay</title>
        <meta
          name="description"
          content="Professional experience of Hubert de Tournay — IT advisor, CISO apprentice, and cybersecurity internships including phishing prevention and adversarial AI research."
        />
        <link rel="canonical" href="https://www.de-tournay.fr/experience" />
      </Helmet>

      {/* Jobs Section */}
      <section className="section">
        <h2 className="section-title">Jobs</h2>
        <p className="section-subtitle">
          IT paid works
        </p>

        <div className="buttons-container">
          {Jobs.map((job, index) => (
            <button
              key={index}
              onClick={() => setActiveJob(index)}
              className={`tab-button ${activeJob === index ? 'active' : ''}`}
            >
              {job.title}
            </button>
          ))}
        </div>

        <div className="content-card">
          <img
            src={Jobs[activeJob].logo}
            alt={Jobs[activeJob].company}
            className="logo"
          />
          <h3 className="job-title">
            {Jobs[activeJob].title}
          </h3>
          <p className="company">
            {Jobs[activeJob].company}
          </p>
          <p className="date">
            {Jobs[activeJob].date}
            <br />
            {Jobs[activeJob].place}
          </p>
          <p className="description">
            {Jobs[activeJob].description}
          </p>
        </div>
      </section>

      {/* Internships Section */}
      <section className="section">
        <h2 className="section-title">Internships</h2>
        <p className="section-subtitle">
          Professional experience and hands-on learning
        </p>

        <div className="buttons-container">
          {internships.map((internship, index) => (
            <button
              key={index}
              onClick={() => setActiveInternship(index)}
              className={`tab-button ${activeInternship === index ? 'active' : ''}`}
            >
              {internship.title}
            </button>
          ))}
        </div>

        <div className="content-card">
          <img
            src={internships[activeInternship].logo}
            alt={internships[activeInternship].company}
            className="logo"
          />
          <h3 className="job-title">
            {internships[activeInternship].title}
          </h3>
          <p className="company">
            {internships[activeInternship].company}
          </p>
          <p className="date">
            {internships[activeInternship].date}
            <br />
            {internships[activeInternship].place}
          </p>
          <p className="description">
            {internships[activeInternship].description}
          </p>
        </div>
      </section>

      {/* Student Jobs Section */}
      <section className="section">
        <h2 className="section-title">Student Jobs</h2>
        <p className="section-subtitle">
          Early work experience and professional development
        </p>

        <div className="buttons-container">
          {studentJobs.map((job, index) => (
            <button
              key={index}
              onClick={() => setActiveStudentJob(index)}
              className={`tab-button ${activeStudentJob === index ? 'active' : ''}`}
            >
              {job.title}
            </button>
          ))}
        </div>

        <div className="content-card">
          <img
            src={studentJobs[activeStudentJob].logo}
            alt={studentJobs[activeStudentJob].company}
            className="logo"
          />
          <h3 className="job-title">
            {studentJobs[activeStudentJob].title}
          </h3>
          <p className="company">
            {studentJobs[activeStudentJob].company}
          </p>
          <p className="date">
            {studentJobs[activeStudentJob].date}
            <br />
            {studentJobs[activeStudentJob].place}
          </p>
          <p className="description">
            {studentJobs[activeStudentJob].description}
          </p>
        </div>
      </section>
    </div>
  );
}