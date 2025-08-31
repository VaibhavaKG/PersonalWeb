document.addEventListener('DOMContentLoaded', () => {
  // Mobile hamburger menu toggle
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Social message popup functionality
  const socialToggle = document.getElementById('socialToggle');
  const socialMessage = document.getElementById('socialMessage');
  
  if (socialToggle && socialMessage) {
    let timeoutId;
    
    // Toggle social message on click
    socialToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      socialMessage.classList.toggle('hidden');
      
      // Auto-hide after 3 seconds if showing
      if (!socialMessage.classList.contains('hidden')) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          socialMessage.classList.add('hidden');
        }, 3000);
      }
    });
    
    // Close message when clicking outside
    document.addEventListener('click', (e) => {
      if (!socialToggle.contains(e.target) && !socialMessage.contains(e.target)) {
        socialMessage.classList.add('hidden');
        clearTimeout(timeoutId);
      }
    });
  }
});

// Email function
function sendMail() {
  const email = "vaibhava23@iisertvm.ac.in";
  window.location.href = `mailto:${email}`;
}

// Phone copy function with better error handling
function copyPhone() {
  const number = "8123013091";
  
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(number)
      .then(() => {
        alert("Phone number copied to clipboard!");
      })
      .catch(() => {
        fallbackCopyTextToClipboard(number);
      });
  } else {
    fallbackCopyTextToClipboard(number);
  }
}

// Fallback copy function for older browsers
function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";
  
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    const successful = document.execCommand('copy');
    if (successful) {
      alert("Phone number copied to clipboard!");
    } else {
      alert("Failed to copy the number.");
    }
  } catch (err) {
    alert("Failed to copy the number.");
  }
  
  document.body.removeChild(textArea);
}
