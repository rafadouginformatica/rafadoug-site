const WHATSAPP_NUMBER = "5519991358604";

document.querySelectorAll(".current-year").forEach(el => {
  el.textContent = new Date().getFullYear();
});

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav-links");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });
}

/* Affiliate placeholders */
const toast = document.getElementById("toast");
const toastText = document.getElementById("toastText");
let toastTimer;

document.querySelectorAll(".affiliate-link").forEach(a => {
  a.addEventListener("click", e => {
    if (a.getAttribute("href") === "#") {
      e.preventDefault();

      if (toast) {
        toastText.textContent = `Adicione o link de afiliado real para: ${a.dataset.product}.`;
        toast.classList.add("show");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
      }
    }
  });
});

/* ORÇAMENTO */
const quoteForm = document.getElementById("quoteForm");

if (quoteForm) {
  const serviceEl = document.getElementById("quoteService");
  const requested = new URLSearchParams(window.location.search).get("servico");

  if (requested && serviceEl) {
    const normalizeText = value =>
      value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();

    const requestedNormalized = normalizeText(requested);

    [...serviceEl.options].forEach(opt => {
      const textNormalized = normalizeText(opt.text);
      const valueNormalized = normalizeText(opt.value);

      if (
        textNormalized.includes(requestedNormalized) ||
        valueNormalized.includes(requestedNormalized) ||
        requestedNormalized.includes(textNormalized)
      ) {
        serviceEl.value = opt.value;
      }
    });
  }

  function getQuoteData() {
    return {
      servico: document.getElementById("quoteService").value,
      problema: document.getElementById("quoteProblem").value.trim(),
      nome: document.getElementById("quoteName").value.trim(),
      email: document.getElementById("quoteEmail").value.trim(),
      telefone: document.getElementById("quotePhone").value.trim(),
      endereco: document.getElementById("quoteAddress").value.trim()
    };
  }

  function validQuote(data) {
    return data.servico && data.problema && data.nome && data.email && data.endereco;
  }

  const quoteWhatsAppBtn = document.getElementById("quoteWhatsAppBtn");

  if (quoteWhatsAppBtn) {
    quoteWhatsAppBtn.addEventListener("click", () => {
      const data = getQuoteData();
      const note = document.getElementById("quoteNote");

      if (!validQuote(data)) {
        note.textContent = "Preencha os campos obrigatórios antes de enviar.";
        note.classList.add("error");
        return;
      }

      const msg = `Olá, RafaDoug! Vim pelo site e gostaria de uma avaliação.

Nome: ${data.nome}
E-mail: ${data.email}
Telefone: ${data.telefone || "Não informado"}
Endereço: ${data.endereco}
Assunto: ${data.servico}

O que está acontecendo:
${data.problema}`;

      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
        "_blank",
        "noopener,noreferrer"
      );
    });
  }
}

/* FALE CONOSCO */
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  function getContactData() {
    return {
      nome: document.getElementById("contactName").value.trim(),
      email: document.getElementById("contactEmail").value.trim(),
      telefone: document.getElementById("contactPhone").value.trim(),
      mensagem: document.getElementById("contactMessage").value.trim()
    };
  }

  function validContact(data) {
    return data.nome && data.email && data.mensagem;
  }

  const contactWhatsAppBtn = document.getElementById("contactWhatsAppBtn");

  if (contactWhatsAppBtn) {
    contactWhatsAppBtn.addEventListener("click", () => {
      const data = getContactData();
      const note = document.getElementById("contactNote");

      if (!validContact(data)) {
        note.textContent = "Preencha nome, e-mail e mensagem antes de enviar.";
        note.classList.add("error");
        return;
      }

      const msg = `Olá, RafaDoug! Vim pelo Fale Conosco do site.

Nome: ${data.nome}
E-mail: ${data.email}
Telefone: ${data.telefone || "Não informado"}

Mensagem:
${data.mensagem}`;

      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
        "_blank",
        "noopener,noreferrer"
      );
    });
  }
}


/* Marketplace / links de afiliado ainda sem URL final */
document.querySelectorAll(".affiliate-buy-link").forEach(link => {
  link.addEventListener("click", e => {
    if (link.getAttribute("href") === "#") {
      e.preventDefault();

      const product = link.dataset.product || "este produto";
      const toast = document.getElementById("toast");
      const toastText = document.getElementById("toastText");

      if (toast) {
        if (toastText) {
          toastText.textContent = `Adicione o link de afiliado real do Mercado Livre para ${product}.`;
        }
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 3200);
      } else {
        alert(`O link de afiliado de ${product} ainda precisa ser configurado.`);
      }
    }
  });
});


/* Tempo de experiência da RafaDoug — atualizado automaticamente a partir de 2013 */
document.querySelectorAll(".experience-years").forEach(el => {
  const foundingYear = 2013;
  const currentYear = new Date().getFullYear();
  el.textContent = Math.max(0, currentYear - foundingYear);
});
