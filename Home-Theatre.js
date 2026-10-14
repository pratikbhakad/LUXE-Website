javascript
document.addEventListener("DOMContentLoaded", function () {

    // 1. SMOOTH SCROLLING
    const pageLinks = document.querySelectorAll('a[href^="#"]');

    pageLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            // Ignore empty links such as href="#"
            if (!targetId || targetId === "#") {
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                event.preventDefault();

                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        });

    });


    // 2. IMAGE ERROR HANDLING
    const images = document.querySelectorAll("img");

    images.forEach(function (img) {

        img.addEventListener("error", function () {

            img.alt = "Image could not be loaded. Please check your internet connection.";

            img.classList.add("image-error");

            console.log("Image failed to load:", img.src);

        });

    });


    // 3. EXPLORE DESIGNS BUTTON
    const exploreButton = document.querySelector(".hero .btn");

    if (exploreButton) {

        exploreButton.addEventListener("click", function () {

            const designsSection = document.getElementById("designs");

            if (designsSection) {
                designsSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        });

    }


    // 4. PAGE LOADED MESSAGE
    console.log("LUXE Interior Design - Home Theatre page loaded.");

});