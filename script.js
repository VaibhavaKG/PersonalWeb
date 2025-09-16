document.addEventListener('DOMContentLoaded', () => {
  // Hamburger menu toggle
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Handle social message popup
  const toggleBtn = document.getElementById("socialToggle");
  const popup = document.getElementById("socialMessage");

  if (toggleBtn && popup) {
    let timeoutId;

    toggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      popup.classList.toggle("hidden");

      if (!popup.classList.contains("hidden")) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          popup.classList.add("hidden");
        }, 3000);
      }
    });

    document.addEventListener("click", (e) => {
      if (!toggleBtn.contains(e.target) && !popup.contains(e.target)) {
        popup.classList.add("hidden");
      }
    });
  }
});

function sendMail() {
  const email = "vaibhava23@iisertvm.ac.in";
  window.location.href = `mailto:${email}`;
}

function copyPhone() {
  const number = "8123013091";
  navigator.clipboard.writeText(number)
    .then(() => alert("Phone number copied to clipboard!"))
    .catch(() => alert("Failed to copy the number."));
}
