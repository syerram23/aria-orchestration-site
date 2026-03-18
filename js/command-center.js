(function () {
  "use strict";

  var hasRun = false;
  var cycleInterval = null;
  var userHasClicked = false;
  var currentCycleIndex = 0;

  var statusStates = ["pending", "running", "complete"];
  var statusCycleIndex = 0;

  function staggerAdd(nodes, className, delayBetween, startDelay) {
    Array.prototype.forEach.call(nodes, function (node, i) {
      setTimeout(function () {
        node.classList.add(className);
      }, startDelay + i * delayBetween);
    });
  }

  function clearHighlights(section) {
    var highlighted = section.querySelectorAll(".cc-highlighted");
    Array.prototype.forEach.call(highlighted, function (el) {
      el.classList.remove("cc-highlighted");
    });
  }

  function clearActiveRows(sidebarRows) {
    Array.prototype.forEach.call(sidebarRows, function (row) {
      row.classList.remove("cc-active");
    });
  }

  function activateRow(row, section) {
    var pipeline = row.getAttribute("data-pipeline");
    if (!pipeline) return;

    row.classList.add("cc-active");

    // Highlight matching pipeline cards by data-pipeline and data-type
    var cards = section.querySelectorAll(
      '[data-pipeline="' + pipeline + '"]'
    );
    Array.prototype.forEach.call(cards, function (card) {
      if (
        card.classList.contains("cc-card-define") ||
        card.classList.contains("cc-card-live") ||
        card.classList.contains("cc-card-result")
      ) {
        card.classList.add("cc-highlighted");
      }
    });
  }

  function cycleStatusBadges(section) {
    statusCycleIndex = (statusCycleIndex + 1) % statusStates.length;
    var badges = section.querySelectorAll(".cc-status-badge");
    Array.prototype.forEach.call(badges, function (badge) {
      // Remove all status states
      statusStates.forEach(function (state) {
        badge.classList.remove("cc-status-" + state);
      });
      // Add current cycle state
      badge.classList.add("cc-status-" + statusStates[statusCycleIndex]);
    });
  }

  function startAutoCycle(sidebarRows, section) {
    if (userHasClicked || !sidebarRows.length) return;

    cycleInterval = setInterval(function () {
      if (userHasClicked) {
        clearInterval(cycleInterval);
        cycleInterval = null;
        return;
      }

      clearActiveRows(sidebarRows);
      clearHighlights(section);

      currentCycleIndex = (currentCycleIndex + 1) % sidebarRows.length;
      activateRow(sidebarRows[currentCycleIndex], section);
      cycleStatusBadges(section);
    }, 10000);
  }

  function initCommandCenter() {
    var section = document.getElementById("command-center");
    if (!section) return;

    var wrapper = section.querySelector(".cc-wrapper");
    if (!wrapper) return;

    var sidebarRows = section.querySelectorAll(".cc-sidebar-row");
    var defineCards = section.querySelectorAll(".cc-card-define");
    var liveCards = section.querySelectorAll(".cc-card-live");
    var resultCards = section.querySelectorAll(".cc-card-result");

    // Sidebar click handler
    Array.prototype.forEach.call(sidebarRows, function (row) {
      row.addEventListener("click", function () {
        userHasClicked = true;

        if (cycleInterval) {
          clearInterval(cycleInterval);
          cycleInterval = null;
        }

        clearActiveRows(sidebarRows);
        clearHighlights(section);

        // Toggle: if already active, deactivate; otherwise activate
        if (row.classList.contains("cc-active")) {
          row.classList.remove("cc-active");
        } else {
          activateRow(row, section);
        }
      });
    });

    // IntersectionObserver for scroll-triggered animation
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting || hasRun) return;
          hasRun = true;
          observer.disconnect();

          // Stage 1: Sidebar rows slide in (150ms stagger)
          staggerAdd(sidebarRows, "cc-visible", 150, 0);

          // Stage 2: After 1000ms - define cards fade in (150ms stagger)
          staggerAdd(defineCards, "cc-visible", 150, 1000);

          // Stage 3: After 1600ms - live cards fade in
          staggerAdd(liveCards, "cc-visible", 150, 1600);

          // Stage 4: After 2200ms - result cards fade in
          staggerAdd(resultCards, "cc-visible", 150, 2200);

          // Stage 5: After 4000ms - start auto-cycling
          setTimeout(function () {
            if (sidebarRows.length) {
              clearActiveRows(sidebarRows);
              clearHighlights(section);
              activateRow(sidebarRows[0], section);
              currentCycleIndex = 0;
              startAutoCycle(sidebarRows, section);
            }
          }, 4000);
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(wrapper);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCommandCenter);
  } else {
    initCommandCenter();
  }
})();
