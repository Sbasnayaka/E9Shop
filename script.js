document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const drawer = document.getElementById("drawer");
  const backDrop = drawer;
  const navLinks = drawer?.querySelectorAll("a") || [];

  const closeDrawer = () => {
    if (drawer) {
      drawer.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
    }
  };

  menuToggle?.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = drawer?.classList.contains("open");
    drawer?.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", (!isOpen).toString());
  });

  backDrop?.addEventListener("click", (event) => {
    if (event.target === backDrop) {
      closeDrawer();
    }
  });

  navLinks.forEach((link) =>
    link.addEventListener("click", () => {
      closeDrawer();
    })
  );

  document.addEventListener("keyup", (event) => {
    if (event.key === "Escape") {
      closeDrawer();
    }
  });

  const handleForm = (form) => {
    form?.addEventListener("submit", (event) => {
      event.preventDefault();
      form.querySelectorAll("button, input").forEach((el) => (el.disabled = true));
      setTimeout(() => {
        window.location.href = "thank-you.html";
      }, 300);
    });
  };

  handleForm(document.getElementById("user-form"));
  handleForm(document.getElementById("drawer-user-form"));

  const backBtn = document.querySelector("[data-back]");
  backBtn?.addEventListener("click", () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "index.html";
    }
  });
});


