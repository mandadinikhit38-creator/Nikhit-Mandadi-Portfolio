import { useRef, useState } from "react";
import { siteConfig } from "../data/siteConfig.js";
import SectionHeading from "../components/SectionHeading.jsx";
import SocialLinks from "../components/SocialLinks.jsx";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const { contact, labels } = siteConfig;
  const [status, setStatus] = useState("");
  const lastSubmit = useRef(0);

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.elements.company.value) return;
    if (Date.now() - lastSubmit.current < 10000) return;

    const name = form.elements.name.value.replace(/[\r\n]/g, "").trim();
    const replyEmail = form.elements.email.value.replace(/[\r\n]/g, "").trim();
    const message = form.elements.message.value.trim();
    let error = "";
    if (!name || name.length > 80) error = "Enter your name (up to 80 characters).";
    else if (replyEmail.length > 120 || !emailPattern.test(replyEmail)) error = "Enter a valid email (up to 120 characters).";
    else if (!message || message.length > 1000) error = "Enter a message (up to 1,000 characters).";
    setStatus(error);
    if (error) return;

    lastSubmit.current = Date.now();
    const subject = `Portfolio message from ${name}`;
    const body = `${message}\n\nReply to: ${replyEmail}`;
    setStatus(contact.formPrompt);
    try {
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    } catch {
      setStatus("The email application could not be opened. Please use the direct email link.");
    }
  }

  return (
    <section className="section" id="contact" aria-labelledby="contact-heading">
      <SectionHeading label={contact.label} title={contact.heading} id="contact-heading" />
      <div className="page-wrap">
        <p className="section-intro">{contact.intro}</p>
        <div className="contact-layout">
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="contact-name">{contact.formLabels.name}</label>
            <input id="contact-name" name="name" type="text" maxLength={80} autoComplete="name" required />
            <label htmlFor="contact-email">{contact.formLabels.email}</label>
            <input id="contact-email" name="email" type="email" maxLength={120} autoComplete="email" required />
            <label htmlFor="contact-message">{contact.formLabels.message}</label>
            <textarea id="contact-message" name="message" maxLength={1000} required />
            <div className="honeypot" aria-hidden="true">
              <label htmlFor="contact-company">{contact.honeypotLabel}</label>
              <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <button className="button button-primary" type="submit">{contact.formLabels.submit}</button>
            <p className="form-status" role="status" aria-live="polite">{status}</p>
          </form>
          <aside aria-label="Direct contact details">
            <dl className="contact-detail-list">
              <div><dt>{labels.contactEmail}</dt><dd><a href={`mailto:${contact.email}`}>{contact.email}</a></dd></div>
              <div><dt>{labels.contactPhone}</dt><dd><a href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}>{contact.phone}</a></dd></div>
            </dl>
            <SocialLinks compact />
          </aside>
        </div>
        <p className="security-link"><a href={contact.securityReport.href}>{contact.securityReport.text}</a></p>
      </div>
    </section>
  );
}
