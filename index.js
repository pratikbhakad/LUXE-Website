document.addEventListener("DOMContentLoaded", function () {

 
  const heroSlides = document.getElementById("heroSlides");
  const currentNumber = document.getElementById("currentNumber");
  const heroPrevBtn = document.getElementById("prevBtn");
  const heroNextBtn = document.getElementById("nextBtn");

  if (heroSlides && currentNumber && heroPrevBtn && heroNextBtn) {

    const heroImages = [
      "https://vf-architectures.com/wp-content/uploads/2025/10/luxury-chalet-in-courchevel-architect-vielliard-francheteau-1.webp",
      "https://images.adsttc.com/media/images/628f/e75b/d68d/6201/6637/a5d3/large_jpg/chalet-d-monovolume-architecture-plus-design_12.jpg?1653598059",
      
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkpTooFmTXIR4WZaLfwvz7yGLUwJe9kBNNOp_TmHA6NMrbnEVGp4uKoQmM&s=10"
    ];

    let heroIndex = 0;
    let heroTimer = null;

    heroSlides.innerHTML = "";

    heroImages.forEach(function (imageUrl) {
      const slide = document.createElement("div");

      slide.className = "hero-slide";
      slide.style.backgroundImage = `url("${imageUrl}")`;

      heroSlides.appendChild(slide);
    });

    const heroSlideItems = Array.from(heroSlides.children);

    function showHeroSlide(index) {
      heroIndex =
        (index + heroSlideItems.length) % heroSlideItems.length;

      heroSlideItems.forEach(function (slide, i) {
        slide.classList.toggle("active", i === heroIndex);
      });

      currentNumber.textContent =
        String(heroIndex + 1).padStart(2, "0");
    }

    function restartHeroTimer() {
      clearInterval(heroTimer);

      heroTimer = setInterval(function () {
        showHeroSlide(heroIndex + 1);
      }, 4000);
    }

    heroNextBtn.addEventListener("click", function () {
      showHeroSlide(heroIndex + 1);
      restartHeroTimer();
    });

    heroPrevBtn.addEventListener("click", function () {
      showHeroSlide(heroIndex - 1);
      restartHeroTimer();
    });

    showHeroSlide(0);
    restartHeroTimer();
  }


  

  const reviewTrack = document.getElementById("sliderTrack");
  const reviewDots = document.getElementById("sliderDots");
  const reviewSlider = document.querySelector(".slider");

  if (reviewTrack && reviewDots && reviewSlider) {

    const reviewWindow =
      reviewSlider.querySelector(".slider-window");

    const reviewPrevBtn =
      reviewSlider.querySelector(".prev");

    const reviewNextBtn =
      reviewSlider.querySelector(".next");

    const reviewCards = Array.from(reviewTrack.children);

    let reviewIndex = 0;
    let reviewTimer = null;
    let isReviewPaused = false;

    if (
      reviewWindow &&
      reviewPrevBtn &&
      reviewNextBtn &&
      reviewCards.length > 0
    ) {

      function getVisibleCards() {
        if (window.innerWidth <= 700) return 1;
        if (window.innerWidth <= 1050) return 2;
        return 3;
      }

      function getMaxReviewIndex() {
        return Math.max(
          0,
          reviewCards.length - getVisibleCards()
        );
      }

      function createReviewDots() {
        reviewDots.innerHTML = "";

        for (let i = 0; i <= getMaxReviewIndex(); i++) {
          const dot = document.createElement("button");

          dot.type = "button";
          dot.className = "dot";
          dot.setAttribute(
            "aria-label",
            "Show review slide " + (i + 1)
          );

          dot.addEventListener("click", function () {
            reviewIndex = i;
            updateReviewSlider();
            restartReviewTimer();
          });

          reviewDots.appendChild(dot);
        }
      }

      function updateReviewSlider() {
        reviewIndex = Math.max(
          0,
          Math.min(reviewIndex, getMaxReviewIndex())
        );

        const cardWidth =
          reviewCards[0].getBoundingClientRect().width;

        const trackStyle = getComputedStyle(reviewTrack);

        const gap =
          parseFloat(trackStyle.columnGap) ||
          parseFloat(trackStyle.gap) ||
          0;

        const offset = reviewIndex * (cardWidth + gap);

        reviewTrack.style.transform =
          "translateX(-" + offset + "px)";

        Array.from(reviewDots.children).forEach(
          function (dot, i) {
            dot.classList.toggle(
              "active",
              i === reviewIndex
            );
          }
        );

        reviewPrevBtn.disabled = getMaxReviewIndex() === 0;
        reviewNextBtn.disabled = getMaxReviewIndex() === 0;
      }

      function nextReviewSlide() {
        const max = getMaxReviewIndex();

        if (max === 0) return;

        reviewIndex =
          reviewIndex >= max ? 0 : reviewIndex + 1;

        updateReviewSlider();
      }

      function previousReviewSlide() {
        const max = getMaxReviewIndex();

        if (max === 0) return;

        reviewIndex =
          reviewIndex <= 0 ? max : reviewIndex - 1;

        updateReviewSlider();
      }

      function stopReviewTimer() {
        if (reviewTimer !== null) {
          clearInterval(reviewTimer);
          reviewTimer = null;
        }
      }

      function restartReviewTimer() {
        stopReviewTimer();

        if (!isReviewPaused && getMaxReviewIndex() > 0) {
          reviewTimer = setInterval(function () {
            nextReviewSlide();
          }, 4000);
        }
      }

      reviewNextBtn.addEventListener("click", function () {
        nextReviewSlide();
        restartReviewTimer();
      });

      reviewPrevBtn.addEventListener("click", function () {
        previousReviewSlide();
        restartReviewTimer();
      });

      reviewSlider.addEventListener("mouseenter", function () {
        isReviewPaused = true;
        stopReviewTimer();
      });

      reviewSlider.addEventListener("mouseleave", function () {
        isReviewPaused = false;
        restartReviewTimer();
      });


      window.addEventListener("resize", function () {
        createReviewDots();
        updateReviewSlider();
        restartReviewTimer();
      });

      
      createReviewDots();
      updateReviewSlider();
      restartReviewTimer();
    }
  }

});

document.addEventListener("DOMContentLoaded", function () {

    const overlay = document.getElementById("consultationOverlay");
    const closeBtn = document.getElementById("popupClose");
    const consultationForm = document.getElementById("consultationForm");
    const formMessage = document.getElementById("formMessage");

    if (!overlay || !closeBtn || !consultationForm) {
        return;
    }

    const popupTimer = setTimeout(function () {
        overlay.classList.add("show");
    }, 1000);

    
    closeBtn.addEventListener("click", function () {
        overlay.classList.remove("show");
        clearTimeout(popupTimer);
    });

   
    overlay.addEventListener("click", function (event) {
        if (event.target === overlay) {
            overlay.classList.remove("show");
            clearTimeout(popupTimer);
        }
    });

    
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            overlay.classList.remove("show");
            clearTimeout(popupTimer);
        }
    });

    
    consultationForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const selectedProperties = consultationForm.querySelectorAll(
            'input[name="propertyType"]:checked'
        );

        if (selectedProperties.length === 0) {
            formMessage.textContent =
                "Please select at least one Property Type.";
            return;
        }

        if (!consultationForm.checkValidity()) {
            consultationForm.reportValidity();
            return;
        }

        formMessage.textContent =
            "Form validated successfully! Connect a backend to receive enquiries.";

        
    });

});

/* ===== BEFORE AFTER TRANSFORMATION ===== */

document.addEventListener("DOMContentLoaded", function () {

    const range = document.getElementById("transformRange");
    const afterWrap = document.getElementById("afterWrap");
    const divider = document.getElementById("transformDivider");
    const beforeImage = document.getElementById("beforeImage");
    const afterImage = document.getElementById("afterImage");

    const title = document.getElementById("transformTitle");
    const description = document.getElementById("transformDescription");

    const featureOne = document.getElementById("featureOne");
    const featureTwo = document.getElementById("featureTwo");
    const featureThree = document.getElementById("featureThree");

    const tabs = document.querySelectorAll(".transform-tab");

    if (
        !range || !afterWrap || !divider ||
        !beforeImage || !afterImage || !title ||
        !description || !featureOne || !featureTwo ||
        !featureThree || !tabs.length
    ) {
        return;
    }

    const projects = {
        living: {
            title: "Modern Luxury Living Room",
            description:
                "A thoughtfully designed living space combining warm textures, elegant furniture and beautiful lighting.",
            before:
                "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85",
            after:
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
            features: [
                "Elegant Wall Finishes",
                "Warm Ambient Lighting",
                "Bespoke Furniture"
            ]
        },

        bedroom: {
            title: "Elegant Bedroom Retreat",
            description:
                "Create a calm and comfortable retreat with refined finishes, layered lighting and carefully selected furniture.",
            before:
                "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85",
            after:
                "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1400&q=85",
            features: [
                "Soft Neutral Palette",
                "Layered Bedroom Lighting",
                "Custom Wardrobe Style"
            ]
        },

        kitchen: {
            title: "Contemporary Kitchen",
            description:
                "Bring style and functionality together with contemporary finishes, clean lines and an organised kitchen layout.",
            before:
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
            after:
                "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85",
            features: [
                "Modern Cabinet Finishes",
                "Refined Material Palette",
                "Functional Layout"
            ]
        }
    };

    function updateComparison() {
        const value = range.value;

        afterWrap.style.width = value + "%";
        divider.style.left = value + "%";
    }

    range.addEventListener("input", updateComparison);

    tabs.forEach(function (tab) {

        tab.addEventListener("click", function () {

            const project = projects[tab.dataset.room];

            if (!project) return;

            tabs.forEach(function (item) {
                item.classList.remove("active");
            });

            tab.classList.add("active");

            beforeImage.src = project.before;
            afterImage.src = project.after;

            beforeImage.alt = project.title + " before";
            afterImage.alt = project.title + " after";

            title.textContent = project.title;
            description.textContent = project.description;

            featureOne.textContent = project.features[0];
            featureTwo.textContent = project.features[1];
            featureThree.textContent = project.features[2];

            range.value = 50;
            updateComparison();

        });

    });

    updateComparison();

});