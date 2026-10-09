import { siteConfig } from "../data/siteConfig.js";

function BrandIcon({ kind }) {
  if (kind === "linkedin") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.44c.98 0 1.79-.77 1.79-1.72V1.72C24 .77 23.19 0 22.22 0Z" /></svg>;
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.08c-3.1.67-3.75-1.32-3.75-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 .1.74 2.43 3.35 1.72.1-.73.4-1.23.72-1.51-2.48-.28-5.09-1.24-5.09-5.53 0-1.22.44-2.22 1.16-3-.12-.28-.5-1.42.11-2.96 0 0 .95-.3 3.06 1.15a10.63 10.63 0 0 1 5.57 0c2.12-1.44 3.06-1.15 3.06-1.15.61 1.54.23 2.68.11 2.96.72.78 1.16 1.78 1.16 3 0 4.3-2.61 5.25-5.1 5.52.4.35.76 1.03.76 2.08V22c0 .3.2.64.77.53A11.1 11.1 0 0 0 12 .9Z" /></svg>;
}

export default function SocialLinks({ compact = false }) {
  const links = [
    { id: "linkedin", href: siteConfig.social.linkedIn, label: siteConfig.social.linkedInLabel },
    { id: "github", href: siteConfig.social.github, label: siteConfig.social.githubLabel },
  ];
  return (
    <div className={compact ? "contact-socials" : "hero-socials"} role="group" aria-label={siteConfig.labels.socialLinks}>
      {links.map((link) => (
        <a className="social-icon-link" href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label} key={link.id}>
          <BrandIcon kind={link.id} />
        </a>
      ))}
    </div>
  );
}
