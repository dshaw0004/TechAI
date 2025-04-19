document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".sidebar-nav .nav-link");
  const contentSections = document.querySelectorAll(".content-section");
  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.querySelector(".sidebar");
  const appContainer = document.querySelector(".app-container");

  // Function to show a specific section
  function showSection(targetId) {
    // Hide all sections
    contentSections.forEach((section) => {
      section.classList.remove("active");
    });

    // Show the target section
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.classList.add("active");
    }
  }

  // Function to update the active state of nav links
  function updateActiveLink(activeLink) {
    navLinks.forEach((link) => {
      link.classList.remove("active");
    });
    activeLink.classList.add("active");

  }

  // Add click event listeners to nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default anchor behavior
      const targetId = link.getAttribute("data-target");

      showSection(targetId);
      updateActiveLink(link);

      // Close sidebar on mobile after clicking a link
      if (window.innerWidth <= 768) {
        sidebar.classList.remove("open");
        appContainer.classList.remove("sidebar-open");
      }
    });
  });

  // Menu toggle functionality for mobile
  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    appContainer.classList.toggle("sidebar-open");
  });

  // close the menu if clicked outside of it in mobile device
  document.addEventListener("click", (event) => {
    if (window.innerWidth <= 768 && sidebar.classList.contains("open")) {
      // Check if the click is outside the sidebar and not on the toggle button
      if (
        !sidebar.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        sidebar.classList.remove("open");
        appContainer.classList.remove("sidebar-open");
      }
    }
  });


  // to copy the webhook URL
  const copyButton = document.querySelector(".copy-button");
  const webhookUrlInput = document.getElementById("webhookUrl");

  if (copyButton && webhookUrlInput) {
    copyButton.addEventListener("click", () => {
      webhookUrlInput.select(); 
      webhookUrlInput.setSelectionRange(0, 99999);

      try {
        navigator.clipboard
          .writeText(webhookUrlInput.value)
          .then(() => {
            // after coping change the icon to checked icon
            const originalIcon = copyButton.innerHTML;
            copyButton.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
              // change back the icon
              copyButton.innerHTML = originalIcon;
            }, 1500);
          })
          .catch((err) => {
            alert("Could not copy text. Please copy manually.");
          });
      } catch (err) {
        console.error("Clipboard API not available:", err);
        alert("Could not copy text. Please copy manually.");
      }
    });
  }

  const defaultActiveLink = document.querySelector(
    ".sidebar-nav .nav-link.active"
  ); // currently active nav link
  if (defaultActiveLink) {
    /*
     get id of currently active section and show it.
     */
    const defaultTargetId = defaultActiveLink.getAttribute("data-target");
    showSection(defaultTargetId);
  } else {
    // Fallback if no link is marked active initially
    navLinks[0].classList.add("active");
    showSection(navLinks[0].getAttribute("data-target"));
  }
});
