// enerOS main scripts
// enerOS Website Script
// Intelligent energy, now with a little browser-side electricity ⚡

document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu a");
  const sections = document.querySelectorAll("section[id]");
  const animatedItems = document.querySelectorAll(".reveal");
  const counters = document.querySelectorAll("[data-counter]");
  const motionToggle = document.querySelector("[data-motion-toggle]");
  const motionAreas = document.querySelectorAll("[data-motion-area]");

  // Mobile Navigation
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      navToggle.classList.toggle("active");

      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
    });
  }

  // Close mobile menu after clicking a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu?.classList.remove("active");
      navToggle?.classList.remove("active");
      navToggle?.setAttribute("aria-expanded", "false");
    });
  });

  // Smooth scrolling
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (targetId && targetId.startsWith("#")) {
        event.preventDefault();

        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  });

  // Reveal animation on scroll
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
    }
  );

  animatedItems.forEach((item) => {
    revealObserver.observe(item);
  });

  // Active navigation link while scrolling
  function updateActiveNav() {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");

      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveNav);
  updateActiveNav();

  // Counter animation
  function animateCounter(counter) {
    const target = Number(counter.dataset.counter);
    const duration = 1600;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(progress * target);

      counter.textContent = value.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target.toLocaleString();
      }
    }

    requestAnimationFrame(updateCounter);
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });

  // Header shadow on scroll
  const header = document.querySelector(".site-header");

  function updateHeaderState() {
    if (!header) return;

    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", updateHeaderState, { passive: true });
  updateHeaderState();

  // Motion pause/play control for all animated motion areas
  if (motionToggle && motionAreas.length > 0) {
    motionToggle.addEventListener("click", () => {
      const shouldPause = !motionAreas[0].classList.contains("motion-paused");

      motionAreas.forEach((motionArea) => {
        motionArea.classList.toggle("motion-paused", shouldPause);
      });

      motionToggle.textContent = shouldPause ? "Play" : "Pause";
      motionToggle.setAttribute("aria-pressed", String(!shouldPause));
      motionToggle.setAttribute(
        "aria-label",
        shouldPause ? "Play energy animations" : "Pause energy animations"
      );
    });
  }

  // Current year in footer
  const yearElement = document.querySelector("#year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
