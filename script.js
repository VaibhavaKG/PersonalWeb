document.addEventListener("DOMContentLoaded", () => {
  renderSiteHeader();

  const pageLoader = document.querySelector(".loader-container");

  // Show loader immediately on internal page navigation.
  if (pageLoader) {
    document.addEventListener("click", (event) => {
      const link = event.target.closest("a[href]");

      if (!link) return;
      if (link.target === "_blank") return;

      const href = link.getAttribute("href") || "";
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      )
        return;

      const url = new URL(link.href, window.location.href);
      const sameOrigin = url.origin === window.location.origin;
      const samePage =
        url.pathname === window.location.pathname &&
        url.search === window.location.search &&
        url.hash === window.location.hash;

      if (!sameOrigin || samePage) return;

      pageLoader.style.display = "flex";
      pageLoader.style.opacity = "1";
    });
  }

  // Hamburger menu toggle
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
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

function renderSiteHeader() {
  const headerMount = document.querySelector("[data-site-header]");

  if (!headerMount) {
    return;
  }

  const currentPage = (() => {
    const path = window.location.pathname.split("/").pop() || "index.html";

    if (path === "" || path === "index.html") return "home";
    if (path === "gallery.html") return "gallery";
    if (path === "poems.html") return "poems";
    if (path === "resume.html") return "resume";

    return "";
  })();

  const navClass = (page) =>
    `text-sm font-medium transition-colors ${currentPage === page ? "text-white" : "text-gray-400 hover:text-white"}`;

  headerMount.innerHTML = `
  <header class="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800">
    <div class="max-w-6xl mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <a href="index.html" class="flex items-center gap-3 group">
          <div class="w-8 h-8 rounded-full bg-white flex items-center justify-center transition-transform group-hover:scale-110">
            <span class="text-black text-sm font-bold">V</span>
          </div>
          <h1 class="text-xl font-semibold tracking-tight">Vaibhava Addagal</h1>
        </a>

        <nav class="hidden md:flex items-center gap-8">
          <a href="index.html" class="${navClass("home")}" ${currentPage === "home" ? 'aria-current="page"' : ""}>Home</a>
          <a href="gallery.html" class="${navClass("gallery")}" ${currentPage === "gallery" ? 'aria-current="page"' : ""}>Gallery</a>
          <a href="poems.html" class="${navClass("poems")}" ${currentPage === "poems" ? 'aria-current="page"' : ""}>Poems</a>
          <a href="resume.html" class="${navClass("resume")}" ${currentPage === "resume" ? 'aria-current="page"' : ""}>Resume</a>
        </nav>

        <div class="flex items-center gap-3">
          <div class="hidden md:flex items-center gap-2">
            <a href="https://www.linkedin.com/in/vaibhavaaddagal" target="_blank" aria-label="LinkedIn" class="social-icon w-9 h-9 flex items-center justify-center rounded-lg bg-gray-900 hover:bg-gray-800">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.38-1.12 2.5-2.5 2.5S0 4.88 0 3.5 1.12 1 2.5 1s2.5 1.12 2.5 2.5zM0 8.5h5v15H0v-15zM7.5 8.5h4.7v2.2h.1c.7-1.3 2.3-2.2 3.9-2.2 4.2 0 5 2.8 5 6.3v8.7h-5v-7.7c0-1.8 0-4.2-2.5-4.2s-2.9 1.9-2.9 4v7.9h-5v-15z"/></svg>
            </a>
            <a href="https://x.com/VaibhavaAddagal" target="_blank" aria-label="Twitter" class="social-icon w-9 h-9 flex items-center justify-center rounded-lg bg-gray-900 hover:bg-gray-800">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://open.spotify.com/user/31c7qhz3mrrvup5dzg2f5h667jj4" target="_blank" aria-label="Spotify" class="social-icon w-9 h-9 flex items-center justify-center rounded-lg bg-gray-900 hover:bg-gray-800">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.372 0 0 5.372 0 12c0 6.627 5.372 12 12 12s12-5.373 12-12c0-6.628-5.372-12-12-12zm5.336 17.233a.747.747 0 0 1-1.03.249c-2.828-1.733-6.39-2.126-10.593-1.164a.75.75 0 1 1-.33-1.46c4.623-1.048 8.637-.604 11.82 1.334a.748.748 0 0 1 .249 1.041zm1.476-3.156a.934.934 0 0 1-1.28.31c-3.237-1.987-8.172-2.565-11.996-1.405a.935.935 0 1 1-.523-1.795c4.28-1.245 9.684-.605 13.36 1.64a.935.935 0 0 1 .44 1.25zm.138-3.234C16.326 8.28 7.872 8.032 5.152 8.823a1.121 1.121 0 1 1-.614-2.158c3.2-.91 12.478-.633 15.978 1.574a1.12 1.12 0 1 1-1.065 1.904z"/></svg>
            </a>
            <a href="https://github.com/VaibhavaKG" target="_blank" aria-label="GitHub" class="social-icon w-9 h-9 flex items-center justify-center rounded-lg bg-gray-900 hover:bg-gray-800">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.799 8.205 11.387.6.111.82-.261.82-.58 0-.287-.011-1.046-.017-2.054-3.338.725-4.042-1.61-4.042-1.61C4.422 17.875 3.633 17.5 3.633 17.5c-1.087-.743.083-.728.083-.728 1.205.085 1.84 1.238 1.84 1.238 1.07 1.832 2.809 1.303 3.495.997.108-.775.418-1.304.762-1.603-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 013.003-.404c1.02.004 2.047.137 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.655 1.653.243 2.874.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.804 5.624-5.475 5.921.43.372.823 1.104.823 2.224 0 1.606-.015 2.903-.015 3.296 0 .322.216.696.825.578C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
          </div>

          <div class="relative">
            <button type="button" id="socialToggle" class="w-9 h-9 flex items-center justify-center rounded-lg bg-white text-black hover:bg-gray-200 transition-all hover:scale-105" aria-label="Toggle Message">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 256 256"><path d="M208.31,75.68A59.78,59.78,0,0,0,128,48C94.83,48,68.42,74.83,68.42,108.31c0,26.54,10.19,50.06,26.83,65.93a4,4,0,0,0,5.5,0C117.39,158.37,127.58,134.85,127.58,108.31A59.78,59.78,0,0,0,208.31,75.68ZM128,72a36,36,0,1,1-36,36A36,36,0,0,1,128,72Zm0,144a36,36,0,1,1,36-36A36,36,0,0,1,128,216Z"></path></svg>
            </button>
            <div id="socialMessage" class="hidden absolute top-12 right-0 w-48 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-xl border border-gray-700">Cookin' something crazy!</div>
          </div>

          <button type="button" id="hamburger" class="md:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors" aria-label="Open menu">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </button>
        </div>
      </div>
    </div>
  </header>

  <nav id="mobile-menu" class="hidden md:hidden bg-gray-900 border-b border-gray-800">
    <div class="max-w-6xl mx-auto px-6 py-4 space-y-2">
      <a href="index.html" class="block py-2 text-sm font-medium ${currentPage === "home" ? "text-white" : "text-gray-400 hover:text-white"}" ${currentPage === "home" ? 'aria-current="page"' : ""}>Home</a>
      <a href="gallery.html" class="block py-2 text-sm font-medium ${currentPage === "gallery" ? "text-white" : "text-gray-400 hover:text-white"}" ${currentPage === "gallery" ? 'aria-current="page"' : ""}>Gallery</a>
      <a href="poems.html" class="block py-2 text-sm font-medium ${currentPage === "poems" ? "text-white" : "text-gray-400 hover:text-white"}" ${currentPage === "poems" ? 'aria-current="page"' : ""}>Poems</a>
      <a href="resume.html" class="block py-2 text-sm font-medium ${currentPage === "resume" ? "text-white" : "text-gray-400 hover:text-white"}" ${currentPage === "resume" ? 'aria-current="page"' : ""}>Resume</a>
      <div class="pt-4 border-t border-gray-800">
        <p class="text-xs text-gray-500 mb-3">Connect with me</p>
        <div class="flex items-center gap-3">
          <a href="https://www.linkedin.com/in/vaibhavaaddagal" target="_blank" aria-label="LinkedIn" class="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.38-1.12 2.5-2.5 2.5S0 4.88 0 3.5 1.12 1 2.5 1s2.5 1.12 2.5 2.5zM0 8.5h5v15H0v-15zM7.5 8.5h4.7v2.2h.1c.7-1.3 2.3-2.2 3.9-2.2 4.2 0 5 2.8 5 6.3v8.7h-5v-7.7c0-1.8 0-4.2-2.5-4.2s-2.9 1.9-2.9 4v7.9h-5v-15z"/></svg></a>
          <a href="https://x.com/VaibhavaAddagal" target="_blank" aria-label="Twitter" class="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
          <a href="https://open.spotify.com/user/31c7qhz3mrrvup5dzg2f5h667jj4" target="_blank" aria-label="Spotify" class="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.372 0 0 5.372 0 12c0 6.627 5.372 12 12 12s12-5.373 12-12c0-6.628-5.372-12-12-12zm5.336 17.233a.747.747 0 0 1-1.03.249c-2.828-1.733-6.39-2.126-10.593-1.164a.75.75 0 1 1-.33-1.46c4.623-1.048 8.637-.604 11.82 1.334a.748.748 0 0 1 .249 1.041zm1.476-3.156a.934.934 0 0 1-1.28.31c-3.237-1.987-8.172-2.565-11.996-1.405a.935.935 0 1 1-.523-1.795c4.28-1.245 9.684-.605 13.36 1.64a.935.935 0 0 1 .44 1.25zm.138-3.234C16.326 8.28 7.872 8.032 5.152 8.823a1.121 1.121 0 1 1-.614-2.158c3.2-.91 12.478-.633 15.978 1.574a1.12 1.12 0 1 1-1.065 1.904z"/></svg></a>
          <a href="https://github.com/VaibhavaKG" target="_blank" aria-label="GitHub" class="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.799 8.205 11.387.6.111.82-.261.82-.58 0-.287-.011-1.046-.017-2.054-3.338.725-4.042-1.61-4.042-1.61C4.422 17.875 3.633 17.5 3.633 17.5c-1.087-.743.083-.728.083-.728 1.205.085 1.84 1.238 1.84 1.238 1.07 1.832 2.809 1.303 3.495.997.108-.775.418-1.304.762-1.603-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 013.003-.404c1.02.004 2.047.137 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.655 1.653.243 2.874.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.804 5.624-5.475 5.921.43.372.823 1.104.823 2.224 0 1.606-.015 2.903-.015 3.296 0 .322.216.696.825.578C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z"/></svg></a>
        </div>
      </div>
    </div>
  </nav>`;
}

function downloadCV() {
  const link = document.createElement("a");
  link.href = "KG RESUME.pdf"; // Path to your PDF file
  link.download = "KG RESUME.pdf";
  link.click();
}

function sendMail() {
  const email = "vaibhava23@iisertvm.ac.in";
  window.location.href = `mailto:${email}`;
}

function copyPhone() {
  const number = "8123013091";
  navigator.clipboard
    .writeText(number)
    .then(() => alert("Phone number copied to clipboard!"))
    .catch(() => alert("Failed to copy the number."));
}

/* =============== LOADER =============== */
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader-container");

  if (!loader) {
    return;
  }

  // Fade out the loader
  loader.style.opacity = "0";

  // Hide the loader completely after the transition
  setTimeout(() => {
    loader.style.display = "none";
  }, 500); // 500ms matches the CSS transition time
});
