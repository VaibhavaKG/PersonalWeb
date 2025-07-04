document.querySelectorAll("header a").forEach(link => {
  const text = link.textContent.trim().toLowerCase();
  if (["gallery", "poems", "resume"].includes(text)) {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      if (text === "gallery") toggleModal("galleryModal");
      if (text === "poems") window.location.href = "poems.html"; // ✅ navigate
      if (text === "resume") window.location.href = "resume.html"; // ✅ navigate
    });
  }
});

function copyPhone() {
    const number = "8123013091";
    navigator.clipboard.writeText(number).then(() => {
      alert("Phone number copied to clipboard!");
    }).catch(() => {
      alert("Failed to copy the number.");
    });
  }

  const toggle = document.getElementById("socialToggle");
  const bubbles = document.getElementById("socialBubbles");

  toggle.addEventListener("click", () => {
    bubbles.classList.toggle("hidden");
  });

  // Optional: Close on outside click
  document.addEventListener("click", (e) => {
    if (!toggle.contains(e.target) && !bubbles.contains(e.target)) {
      bubbles.classList.add("hidden");
    }
  });
<script>
  document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById('socialToggle');
    const bubbles = document.getElementById('socialBubbles');

    toggleButton.addEventListener('click', function () {
      bubbles.classList.toggle('hidden');
    });
  });
</script>
