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
