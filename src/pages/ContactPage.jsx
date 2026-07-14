// ContactPage.jsx
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Linkedin, Github, MapPin } from 'lucide-react';
import qrCodeImage from '../assets/LinkedinQRCode.png';
import emailjs from '@emailjs/browser';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [honeypot, setHoneypot] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (honeypot) return;
    setSubmitError('');

    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        formData,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setFormSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      })
      .catch((err) => {
        console.error('EmailJS error:', err);
        setSubmitError('Something went wrong. Please try again or contact me directly.');
      });
  };

  const contactLinks = [
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/Git-Hub-ert',
      href: 'https://github.com/Git-Hub-ert',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com',
      href: 'https://www.linkedin.com/in/hubert-de-tournay/',
    },
  ];

  return (
    <div className="contact-container">
      <Helmet>
        <title>Contact | Hubert de Tournay</title>
        <meta
          name="description"
          content="Get in touch with Hubert de Tournay, cybersecurity engineering student and CISO apprentice based in Lyon, France."
        />
        <link rel="canonical" href="https://www.de-tournay.fr/contact" />
      </Helmet>

      <section className="hero-section">
        <h1 className="hero-title">Let's Connect</h1>
        <p className="hero-description">
          I'm always interested in hearing about new projects and opportunities.
        </p>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: 'rgba(139, 92, 246, 0.1)', border: '1px solid var(--color-border)', borderRadius: '20px', color: 'var(--color-text-secondary)' }}>
          <MapPin size={20} color="var(--color-accent)" />
          <span>Lyon, France</span>
        </div>
      </section>

      <div className="main-content">
        <section className="contact-links-section">
          <h2 className="section-title">Check these out</h2>
          <div className="contact-links-grid">
            {contactLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  <div className="icon-container">
                    <Icon className="svg-l" />
                  </div>
                  <h3 className="contact-link-label">{link.label}</h3>
                  <p className="contact-link-value">{link.value}</p>
                </a>
              );
            })}
          </div>
        </section>

        <div className="content-row">
          <section className="qr-section">
            <h2 className="section-title">Connect on LinkedIn</h2>
            <div className="qr-container">
              <img src={qrCodeImage} alt="LinkedIn QR Code" className="qr-code" />
              <p className="qr-text">Scan to visit my LinkedIn profile</p>
            </div>
          </section>

          <section className="form-section">
            <h2 className="section-title">Send Me a Message</h2>
            <form onSubmit={handleSubmit} className="form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="5"
                />
              </div>

              {/* Honeypot — hidden from real users, bots fill it in */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex="-1"
                  autoComplete="off"
                />
              </div>

              {submitError && <p className="captcha-error">{submitError}</p>}

              <button type="submit" className="btn-primary submit-button">
                {formSubmitted ? 'Message Sent! ✓' : 'Send Message'}
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}