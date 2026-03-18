(function () {
  "use strict";

  function animateCards(container) {
    var cards = container.querySelectorAll(".use-card");
    // Set initial hidden state
    Array.prototype.forEach.call(cards, function (card) {
      card.style.opacity = "0";
      card.style.transform = "translateY(16px)";
      card.style.transition = "opacity 0.35s ease, transform 0.35s ease";
    });

    // Stagger reveal with 40ms per card
    Array.prototype.forEach.call(cards, function (card, i) {
      setTimeout(function () {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, i * 40);
    });
  }

  function initUseCaseTabs() {
    var tabButtons = document.querySelectorAll(".tab-btn");
    var gridContainers = document.querySelectorAll(
      ".use-grid-container[data-tab]"
    );

    if (!tabButtons.length || !gridContainers.length) return;

    Array.prototype.forEach.call(tabButtons, function (btn) {
      btn.addEventListener("click", function () {
        var targetTab = btn.getAttribute("data-tab");
        if (!targetTab) return;

        // Toggle active state on buttons
        Array.prototype.forEach.call(tabButtons, function (b) {
          b.classList.remove("active");
        });
        btn.classList.add("active");

        // Toggle active state on matching grid containers
        Array.prototype.forEach.call(gridContainers, function (container) {
          if (container.getAttribute("data-tab") === targetTab) {
            container.classList.add("active");
            animateCards(container);
          } else {
            container.classList.remove("active");
          }
        });
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initUseCaseTabs);
  } else {
    initUseCaseTabs();
  }
})();
