  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>

  <!-- Script -->
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      function toggleModal(id) {
        const modal = document.getElementById(id);
        modal.classList.toggle('hidden');
      }

      document.querySelectorAll("header a").forEach(link => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const text = link.textContent.trim().toLowerCase();
          if (text === "gallery") toggleModal("galleryModal");
          if (text === "poems") toggleModal("poemsModal");
          if (text === "resume") toggleModal("resumeModal");
        });
      });

      window.toggleModal = toggleModal; // expose globally for close buttons
    });
  </script>
