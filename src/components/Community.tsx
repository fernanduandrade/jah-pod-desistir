"use client";

const FAMILY = [
  {
    name: "jahpodalmossar",
    label: "Já posso almoçar?",
    href: "https://jah-pod-al-mossar.vercel.app",
  },
  {
    name: "jahpodbeber",
    label: "Já posso beber?",
    href: "https://jahpodebeber.com",
  },
  {
    name: "jahpodbebeuaguahj",
    label: "Já bebeu água hoje?",
    href: "https://jah-bebeu-agua-hj.vercel.app/"
  },
  {
    name: "jahpodjantar",
    label: "Já posso jantar?",
    href: "#",
    soon: true,
  },
  {
    name: "heartdevs",
    label: "He4rt Develops",
    href: "https://heartdevs.com/",
  },
] as const;

const SHARE_TEXT =
  "Já posso desistir? NÃO. Estuda pra ficar rico logo. — jahpoddesistir";

export function Community() {
  function getShareUrl() {
    return window.location.href;
  }

  async function handleShare() {
    const url = getShareUrl();
    const payload = { title: "jahpoddesistir", text: SHARE_TEXT, url };

    if (navigator.share) {
      try {
        await navigator.share(payload);
        return;
      } catch {
        /* user cancelled or share failed — fall through */
      }
    }

    const twitter = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      SHARE_TEXT,
    )}&url=${encodeURIComponent(url)}`;
    window.open(twitter, "_blank", "noopener,noreferrer");
  }

  function handleWhatsApp() {
    const wa = `https://wa.me/?text=${encodeURIComponent(
      `${SHARE_TEXT} ${getShareUrl()}`,
    )}`;
    window.open(wa, "_blank", "noopener,noreferrer");
  }

  return (
    <section className="community" id="comunidade">
      <h2 className="section-title">Estuda pra ficar rico logo</h2>
      <p className="section-copy">
        Aqui a resposta é sempre NÃO. Desistir não é opção — compartilha o
        resultado e continua na missão com a família jahpod.
      </p>

      <div className="cta-row">
        <button type="button" className="cta-secondary" onClick={handleShare}>
          Compartilhar resultado
        </button>
        <button type="button" className="cta-ghost" onClick={handleWhatsApp}>
          Mandar no WhatsApp
        </button>
      </div>
    </section>
  );
}
