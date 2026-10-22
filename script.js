"use strict";

const whatsappNumber = "916387204479";
const bookingForm = document.querySelector("#booking-form");
const serviceSelect = document.querySelector("#customer-service");
const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");
const currentYear = document.querySelector("#current-year");

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation menu" : "Close navigation menu");
    primaryNav.classList.toggle("is-open", !isExpanded);
  });

  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
      primaryNav.classList.remove("is-open");
    });
  });
}

document.querySelectorAll("[data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    const selectedService = link.getAttribute("data-service");
    const matchingOption = Array.from(serviceSelect.options).find((option) => option.value === selectedService || option.textContent === selectedService);

    if (matchingOption) {
      serviceSelect.value = matchingOption.value || matchingOption.textContent;
    }
  });
});

const roomExperience = document.querySelector(".room-experience");
if (roomExperience) {
  const paletteButtons = roomExperience.querySelectorAll("[data-room-palette]");
  const selectedMaterial = roomExperience.querySelector("#selected-room-material");
  const roomMaterialLabel = roomExperience.querySelector("#room-material-label");
  const roomEnquireLink = roomExperience.querySelector(".room-enquire");
  const roomMaterials = {
    pvc: { label: "PVC", service: "PVC Panel" },
    wpc: { label: "WPC", service: "WPC Panel" },
    uv: { label: "UV sheet", service: "UV Sheet" },
    tiles: { label: "Tiles", service: "Tiles" },
    wooden: { label: "Wood", service: "Wooden Work" },
    acp: { label: "ACP", service: "ACP Work" }
  };

  paletteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const palette = button.getAttribute("data-room-palette");
      const material = palette ? roomMaterials[palette] : undefined;
      if (!palette || !material) {
        return;
      }

      roomExperience.setAttribute("data-palette", palette);
      if (selectedMaterial) {
        selectedMaterial.textContent = material.label;
      }
      if (roomMaterialLabel) {
        roomMaterialLabel.textContent = `LIVING ROOM · ${material.label.toUpperCase()}`;
      }
      if (roomEnquireLink) {
        roomEnquireLink.setAttribute("data-service", material.service);
        roomEnquireLink.setAttribute("aria-label", `Enquire about ${material.service}`);
      }
      paletteButtons.forEach((option) => {
        option.setAttribute("aria-pressed", String(option === button));
      });
    });
  });
}

if (bookingForm) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!bookingForm.reportValidity()) {
      return;
    }

    const formData = new FormData(bookingForm);
    const name = String(formData.get("name")).trim();
    const phone = String(formData.get("phone")).trim();
    const city = String(formData.get("city"));
    const service = String(formData.get("service"));
    const message = String(formData.get("message")).trim();
    const lines = [
      "Hello Zerova Interior Solution, I would like to book a deal.",
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `City: ${city}`,
      `Service: ${service}`,
      ...(message ? [`Project details: ${message}`] : [])
    ];
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  });
}
