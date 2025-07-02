
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
