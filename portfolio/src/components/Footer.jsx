import { siteConfig } from "../data/siteConfig.js";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-wrap footer-row">
        <p>{siteConfig.footer.copyright} <span aria-hidden="true">·</span> {siteConfig.footer.note}</p>
        <a href={`#${siteConfig.footer.topTarget}`}>{siteConfig.footer.backToTop}</a>
      </div>
    </footer>
  );
}
