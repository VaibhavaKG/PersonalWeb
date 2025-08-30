<script>
  // Handle link navigation
  document.querySelectorAll("header a").forEach(link => {
    const text = link.textContent.trim().toLowerCase();
    if (["gallery", "poems", "resume"].includes(text)) {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        if (text === "gallery") toggleModal("galleryModal"); // Assuming you have this function
        if (text === "poems") window.location.href = "poems.html";
        if (text === "resume") window.location.href = "resume.html";
      });
    }
  });

//Send mail
<button onclick="sendMail()">Mail Me</button>

  function sendMail() {
     const email = "vaibhava23@iisertvm.ac.in";
    window.location.href = "mailto:yourname@example.com";
  }

// Copy phone number
  function copyPhone() {
    const number = "8123013091";
    navigator.clipboard.writeText(number)
      .then(() => alert("Phone number copied to clipboard!"))
      .catch(() => alert("Failed to copy the number."));
  }

  // Toggle popup message on social icon button
  const toggleBtn = document.getElementById("socialToggle");
  const popup = document.getElementById("socialMessage");

  let timeoutId; // Prevent multiple timers

  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    popup.classList.toggle("hidden");

    if (!popup.classList.contains("hidden")) {
      clearTimeout(timeoutId); // Clear any existing timer
      timeoutId = setTimeout(() => {
        popup.classList.add("hidden");
      }, 3000);
    }
  });

  // Close popup on outside click
  document.addEventListener("click", (e) => {
    if (!toggleBtn.contains(e.target) && !popup.contains(e.target)) {
      popup.classList.add("hidden");
    }
  });
</script>
