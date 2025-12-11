// Get Supabase client (if available)
const getSupabase = () => {
  return window.supabaseClient || null;
};

// Submit form to Supabase
const submitFormToSupabase = async (formData) => {
  const supabase = getSupabase();
  if (!supabase) {
    console.warn("Supabase not configured. Form submission skipped.");
    return { success: false, error: "Backend not configured" };
  }

  try {
    const { data, error } = await supabase.from("leads").insert([
      {
        name: formData.name,
        mobile: formData.mobile,
        country: formData.country,
        status: "new",
      },
    ]);

    if (error) {
      console.error("Form submission error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Form submission error:", err);
    return { success: false, error: err.message };
  }
};

// Load services from Supabase
const loadServices = async () => {
  const supabase = getSupabase();
  if (!supabase) {
    console.warn("Supabase not configured. Using static content.");
    return;
  }

  try {
    const { data, error } = await supabase.from("services").select("*").order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading services:", error);
      return;
    }

    if (data && data.length > 0) {
      // Update services grid on home page
      const serviceGrid = document.querySelector(".service-grid");
      if (serviceGrid) {
        const categories = ["Jobs", "Visa & Legal", "Money & E9Pay", "Language & TOPIK", "Health", "Support"];
        const categoryMap = {};
        data.forEach((service) => {
          if (service.category && categories.includes(service.category)) {
            categoryMap[service.category] = service;
          }
        });

        // Update grid items if we have matching services
        const gridItems = serviceGrid.querySelectorAll(".card");
        gridItems.forEach((card, index) => {
          const titleEl = card.querySelector(".card-title");
          if (titleEl) {
            const category = titleEl.textContent.trim();
            const service = categoryMap[category];
            if (service) {
              const img = card.querySelector("img");
              if (img && service.image_url) {
                img.src = service.image_url;
                img.alt = service.title || category;
              }
            }
          }
        });
      }

      // Update all-services list
      const servicesList = document.querySelector(".all-services-list");
      if (servicesList) {
        servicesList.innerHTML = "";
        data.forEach((service) => {
          const article = document.createElement("article");
          article.className = "service-item";
          article.innerHTML = `
            <div class="topic-thumb">
              <img src="${service.image_url || "assets/job.png"}" alt="${service.title}" />
            </div>
            <div class="topic-meta">
              <div class="topic-title">${service.title}</div>
              <div class="topic-desc">${service.description || ""}</div>
              <a class="topic-link" href="#">Read more &gt;&gt;</a>
            </div>
          `;
          servicesList.appendChild(article);
        });
      }
    }
  } catch (err) {
    console.error("Error loading services:", err);
  }
};

// Load active banner from Supabase
const loadBanner = async () => {
  const supabase = getSupabase();
  if (!supabase) {
    return;
  }

  try {
    const { data, error } = await supabase.from("banners").select("*").eq("active", true).limit(1).single();

    if (error || !data) {
      return;
    }

    const heroVisual = document.querySelector(".hero-visual");
    if (heroVisual && data.image_url) {
      heroVisual.style.backgroundImage = `url("${data.image_url}")`;
    }
  } catch (err) {
    console.error("Error loading banner:", err);
  }
};

// Handle search functionality
const handleSearch = (searchForm) => {
  if (!searchForm) return;

  searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const input = searchForm.querySelector('input[type="search"]');
    const query = input?.value.trim().toLowerCase();

    if (!query) return;

    // Simple client-side search (can be enhanced with Supabase full-text search later)
    const serviceItems = document.querySelectorAll(".service-item, .topic-card");
    serviceItems.forEach((item) => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(query) ? "" : "none";
    });
  });
};

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

  // Form submission with Supabase integration
  const handleForm = async (form) => {
    if (!form) return;

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = {
        name: form.querySelector('input[name="name"]')?.value || "",
        mobile: form.querySelector('input[name="mobile"]')?.value || "",
        country: form.querySelector('input[name="country"]')?.value || "",
      };

      // Disable form
      form.querySelectorAll("button, input").forEach((el) => (el.disabled = true));

      // Submit to Supabase
      const result = await submitFormToSupabase(formData);

      if (result.success) {
        // Success - redirect to thank you page
        setTimeout(() => {
          window.location.href = "thank-you.html";
        }, 300);
      } else {
        // Error - show message and re-enable form
        alert("Sorry, there was an error submitting your form. Please try again.");
        form.querySelectorAll("button, input").forEach((el) => (el.disabled = false));
      }
    });
  };

  handleForm(document.getElementById("user-form"));
  handleForm(document.getElementById("drawer-user-form"));

  // Load dynamic content
  loadServices();
  loadBanner();

  // Handle search
  const searchForm = document.querySelector('form[role="search"]');
  handleSearch(searchForm);

  const backBtn = document.querySelector("[data-back]");
  backBtn?.addEventListener("click", () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "index.html";
    }
  });
});


