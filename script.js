document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const themeToggleButton = document.getElementById("theme-button");
  const themeIcon = document.getElementById("theme-icon");
  const signNowButton = document.getElementById("sign-now-button");
  const reduceMotionButton = document.getElementById("reduce-motion");
  const closeModalButton = document.getElementById("close-modal-button");
  const navbarLinks = document.querySelectorAll(".navbar-container a");
  const hamburgerButton = document.getElementById("hamburger-button");
  const navbarContainer = document.getElementById("navbar-container");
  const backToTopButton = document.querySelector(".footer a[href='#top']");
  const modal = document.getElementById("thanks-modal");

  if (!signNowButton) {
    console.error("Sign Now button not found.");
    return;
  }

  function toggleDarkMode() {
    const isDarkMode = body.classList.toggle("dark-mode");
    themeIcon.textContent = isDarkMode ? "☀️" : "🌙";
    console.log("Dark mode toggled:", isDarkMode);
  }

  function addErrorClass(input) {
    input.classList.add("error");
    console.log("Added error class to input:", input);
  }

  function removeErrorClass(input) {
    input.classList.remove("error");
    console.log("Removed error class from input:", input);
  }

  function validateInput(input) {
    if (input.value.trim().length >= 2) {
      removeErrorClass(input);
      console.log("Input validated:", input);
      return true;
    } else {
      addErrorClass(input);
      console.log("Input validation failed:", input);
      return false;
    }
  }

  function validateEmail(input) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(input.value.trim())) {
      removeErrorClass(input);
      console.log("Email validated:", input);
      return true;
    } else {
      addErrorClass(input);
      console.log("Email validation failed:", input);
      return false;
    }
  }

  function validateAndAddSignature(event) {
    event.preventDefault();
    console.log("Sign Now button clicked");

    const nameInput = document.getElementById("name");
    const hometownInput = document.getElementById("hometown");
    const emailInput = document.getElementById("email");

    if (!nameInput || !hometownInput || !emailInput) {
      console.error("One or more form inputs not found.");
      return;
    }

    const isValidName = validateInput(nameInput);
    const isValidHometown = validateInput(hometownInput);
    const isValidEmail = validateEmail(emailInput);

    if (isValidName && isValidHometown && isValidEmail) {
      const person = {
        name: nameInput.value.trim(),
        hometown: hometownInput.value.trim(),
        email: emailInput.value.trim(),
      };
      console.log("Signature valid:", person);
      addSignature(person);
      clearForm();
      toggleModal(person);
    } else {
      console.log("Signature invalid. Please correct the form fields.");
    }
  }

  function addSignature(person) {
    const signaturesDiv = document.getElementById("signature-list");
    if (!signaturesDiv) {
      console.error("Signature list element not found.");
      return;
    }
    let newSignature = document.createElement("p");
    newSignature.textContent = `🖊️ ${person.name} from ${person.hometown} supports this.`;
    signaturesDiv.insertBefore(
      newSignature,
      document.getElementById("counter")
    );
    console.log("New signature added:", person);

    updateSignatureCount();
  }

  function updateSignatureCount() {
    const signatureCount = document.querySelectorAll(
      "#signature-list p:not(#counter)"
    ).length;
    const totalSignatures = document.getElementById("counter");
    if (!totalSignatures) {
      console.error("Counter element not found.");
      return;
    }
    totalSignatures.textContent = `🖊️ ${signatureCount} people have signed this petition and support this cause.`;
    console.log("Updated signature count:", signatureCount);
  }

  function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("hometown").value = "";
    document.getElementById("email").value = "";
    console.log("Form cleared");
  }

  function toggleModal(person) {
    if (!modal) {
      console.error("Modal element not found.");
      return;
    }
    if (modal.style.display !== "flex") {
      modal.style.display = "flex";

      const modalTextContent = document.getElementById("thanks-modal-content");
      if (modalTextContent) {
        modalTextContent.textContent = `Thank you, ${person.name}, for your support!`;
        console.log("Modal opened with content:", modalTextContent.textContent);
      }

      animateImage("modal-image", 1); // Scale animation

      setTimeout(() => {
        modal.style.display = "none";
        clearAnimations(); // Clear animations when modal closes
        console.log("Modal closed");
      }, 4000);
    }
  }

  function animateImage(imageId, animationType) {
    const modalImage = document.getElementById(imageId);
    if (!modalImage) {
      console.error("Modal image not found.");
      return;
    }
    let scaleFactor = 1;
    let angle = 0;
    let opacity = 1;

    const intervalId = setInterval(() => {
      switch (animationType) {
        case 1: // Scale
          scaleFactor = scaleFactor === 1 ? 1.1 : 1;
          modalImage.style.transform = `scale(${scaleFactor})`;
          break;
        case 2: // Rotate
          angle = (angle + 10) % 360;
          modalImage.style.transform = `rotate(${angle}deg)`;
          break;
        case 3: // Opacity
          opacity = opacity === 1 ? 0.5 : 1;
          modalImage.style.opacity = opacity;
          break;
      }
    }, 500);

    modalImage.dataset.intervalId = intervalId; // Store the interval ID for clearing later
    console.log("Animation started for image:", imageId);
  }

  function clearAnimations() {
    const images = document.querySelectorAll(".modal-content img");
    images.forEach((img) => {
      clearInterval(parseInt(img.dataset.intervalId));
      img.style.transform = ""; // Reset transformations
      img.style.opacity = ""; // Reset opacity
      console.log("Cleared animations for image:", img.id);
    });
  }

  if (backToTopButton) {
    backToTopButton.addEventListener("click", (event) => {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      console.log("Scrolled to top");
    });
  } else {
    console.error("Back to Top button not found.");
  }

  if (themeToggleButton) {
    themeToggleButton.addEventListener("click", toggleDarkMode);
  } else {
    console.error("Theme toggle button not found.");
  }

  if (signNowButton) {
    signNowButton.addEventListener("click", validateAndAddSignature);
  } else {
    console.error("Sign Now button not found.");
  }

  if (reduceMotionButton) {
    reduceMotionButton.addEventListener("click", () => {
      body.classList.toggle("no-animation");
      console.log("Toggled motion reduction");
    });
  } else {
    console.error("Reduce motion button not found.");
  }

  if (closeModalButton) {
    closeModalButton.addEventListener("click", () => {
      modal.style.display = "none";
      clearAnimations();
      console.log("Modal closed via button");
    });
  } else {
    console.error("Close modal button not found.");
  }

  navbarLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        window.scrollTo({
          top:
            targetSection.offsetTop -
            document.querySelector(".navbar").offsetHeight,
          behavior: "smooth",
        });
        console.log("Scrolled to section:", targetId);
        if (window.innerWidth <= 768) {
          navbarContainer.classList.remove("active");
          hamburgerButton.classList.remove("active");
        }
      }
    });
  });

  if (hamburgerButton) {
    hamburgerButton.addEventListener("click", () => {
      navbarContainer.classList.toggle("active");
      hamburgerButton.classList.toggle("active"); // Toggle active class on the hamburger button
      console.log("Hamburger menu toggled");
    });
  } else {
    console.error("Hamburger button not found.");
  }

  const revealableContainers = document.querySelectorAll(".revealable");
  let isThrottled = false;
  window.addEventListener("scroll", () => {
    if (!isThrottled) {
      reveal();
      isThrottled = true;
      setTimeout(() => {
        isThrottled = false;
      }, 100);
    }
  });

  function reveal() {
    const windowHeight = window.innerHeight;
    revealableContainers.forEach((container) => {
      const topOfContainer = container.getBoundingClientRect().top;
      if (topOfContainer < windowHeight - 150) {
        container.classList.add("active");
        console.log("Revealed element:", container);
      } else {
        container.classList.remove("active");
      }
    });
  }
});
