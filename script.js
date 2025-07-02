  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>

    <!-- Script -->
<script>
  document.querySelectorAll("header a").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const text = link.textContent.trim().toLowerCase();
    if (text === "gallery") toggleModal("galleryModal");
    if (text === "poems") toggleModal("poemsModal");
    if (text === "blogs") toggleModal("blogsModal");
    if (text === "resume") toggleModal("resumeModal");
  });
});
</script>

