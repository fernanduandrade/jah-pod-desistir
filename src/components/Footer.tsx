const FAMILY = [
  { label: "jahpodalmossar", href: "https://jah-pod-al-mossar.vercel.app" },
  { label: "jahpodbeber", href: "https://jahpodebeber.com" },
  { label: "jahpodjantar", href: "#", soon: true },
] as const;

const COMMUNITY = [
  { label: "He4rt Develops", href: "https://heartdevs.com/" },
] as const;

const SOCIAL = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/fernanduandrade",
  },
  {
    label: "GitHub",
    href: "https://github.com/fernanduandrade",
  },
] as const;

function FooterLinks({
  items,
}: {
  items: readonly {
    label: string;
    href: string;
    soon?: boolean;
  }[];
}) {
  return (
    <ul className="footer-list">
      {items.map((link) => (
        <li key={link.label}>
          {"soon" in link && link.soon ? (
            <span className="footer-link footer-link--soon">{link.label}</span>
          ) : (
            <a
              className="footer-link"
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-col">
          <p className="footer-heading">Criador</p>
          <p className="footer-creator">Criado por Fernando Andrade</p>
          <ul className="footer-list footer-list--social">
            {SOCIAL.map((link) => (
              <li key={link.label}>
                <a
                  className="footer-link"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav className="footer-col" aria-label="Família jahpod">
          <p className="footer-heading">Família jahpod</p>
          <FooterLinks items={FAMILY} />
        </nav>

        <nav className="footer-col" aria-label="Comunidade">
          <p className="footer-heading">Comunidade</p>
          <FooterLinks items={COMMUNITY} />
        </nav>
      </div>
    </footer>
  );
}
