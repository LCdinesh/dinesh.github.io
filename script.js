(function () {
  if (window.emailjs) {
    emailjs.init({
      publicKey: "eJXVN7N6uSArCs2xY"
    });
  }
})();

// mobile menu
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

// reveal on scroll
const revealItems = document.querySelectorAll(".reveal");

function revealOnScroll() {
  revealItems.forEach((item) => {
    const itemTop = item.getBoundingClientRect().top;
    if (itemTop < window.innerHeight - 80) {
      item.classList.add("show");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// typing effect
const typingElement = document.getElementById("typing-text");

if (typingElement) {
  const roles = [
    "GIS Professional",
    "Drone Mapping Specialist",
    "Spatial Analyst",
    "Remote Sensing Enthusiast"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentRole = roles[roleIndex];
    typingElement.textContent = currentRole.substring(0, charIndex);

    if (!isDeleting) {
      charIndex++;
      if (charIndex > currentRole.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1200);
        return;
      }
    } else {
      charIndex--;
      if (charIndex < 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        charIndex = 0;
      }
    }

    setTimeout(typeEffect, isDeleting ? 45 : 85);
  }

  typeEffect();
}

// tilt cards
const tiltCards = document.querySelectorAll(".tilt-card");

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform =
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
  });
});

// storymaps slider
const storymapsSlider = document.getElementById("storymaps-slider");
const storymapsPrev = document.getElementById("storymaps-prev");
const storymapsNext = document.getElementById("storymaps-next");

if (storymapsSlider && storymapsPrev && storymapsNext) {
  const getScrollAmount = () => {
    const firstCard = storymapsSlider.querySelector(".storymap-card");
    if (!firstCard) return 350;

    const cardStyles = window.getComputedStyle(firstCard);
    const gap = parseFloat(cardStyles.marginRight || 0);
    return firstCard.offsetWidth + gap + 20;
  };

  storymapsPrev.addEventListener("click", () => {
    storymapsSlider.scrollBy({
      left: -getScrollAmount(),
      behavior: "smooth"
    });
  });

  storymapsNext.addEventListener("click", () => {
    storymapsSlider.scrollBy({
      left: getScrollAmount(),
      behavior: "smooth"
    });
  });
}

// animated counters
const counters = document.querySelectorAll(".counter");
const achievementSection = document.querySelector(".achievement-side-card");

function animateCounter(counter) {
  const target = parseInt(counter.getAttribute("data-target"), 10);
  const duration = 1500;
  const startTime = performance.now();

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const currentValue = Math.floor(progress * target);

    counter.textContent = `${currentValue}+`;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      counter.textContent = `${target}+`;
      counter.dataset.animated = "true";
    }
  }

  requestAnimationFrame(updateCounter);
}

function resetCounters() {
  counters.forEach((counter) => {
    counter.textContent = "0";
    counter.dataset.animated = "false";
  });
}

if (achievementSection && counters.length) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          counters.forEach((counter) => {
            if (counter.dataset.animated !== "true") {
              animateCounter(counter);
            }
          });
        } else {
          resetCounters();
        }
      });
    },
    {
      threshold: 0.35
    }
  );

  counterObserver.observe(achievementSection);
}

// contact form
const form = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (form && formStatus) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!window.emailjs) {
      formStatus.textContent = "Email service is not loaded.";
      return;
    }

    formStatus.textContent = "Sending message...";

    emailjs
      .sendForm("service_jyx53hu", "template_muymlje", this)
      .then(() => {
        formStatus.textContent = "Message sent successfully.";
        form.reset();
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        formStatus.textContent = "Failed to send message. Please try again.";
      });
  });
}