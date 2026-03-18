(function () {
  "use strict";

  var hasRun = false;

  function staggerAdd(nodes, className, delayBetween, startDelay) {
    Array.prototype.forEach.call(nodes, function (node, i) {
      setTimeout(function () {
        node.classList.add(className);
      }, startDelay + i * delayBetween);
    });
  }

  function initOrchestrationHub() {
    var section = document.getElementById("orchestration-hub");
    if (!section) return;

    var flow = section.querySelector(".orch-flow");
    if (!flow) return;

    var inputNodes = section.querySelectorAll(".orch-input");
    var outputNodes = section.querySelectorAll(".orch-output");
    var connectorIn = section.querySelector(".orch-connector-in");
    var connectorOut = section.querySelector(".orch-connector-out");
    var hub = section.querySelector(".orch-hub");
    var hubPulse = section.querySelector(".orch-hub-pulse");

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting || hasRun) return;
          hasRun = true;
          observer.disconnect();

          // Stage 1: Input nodes fade in with stagger (100ms each)
          staggerAdd(inputNodes, "orch-visible", 100, 0);

          // Stage 2: After 700ms - left connector activates
          setTimeout(function () {
            if (connectorIn) {
              connectorIn.classList.add("orch-active");
            }
          }, 700);

          // Stage 3: After 1200ms - center hub scales up + pulse starts
          setTimeout(function () {
            if (hub) {
              hub.classList.add("orch-visible");
            }
            if (hubPulse) {
              hubPulse.classList.add("orch-pulsing");
            }
          }, 1200);

          // Stage 4: After 1800ms - right connector activates
          setTimeout(function () {
            if (connectorOut) {
              connectorOut.classList.add("orch-active");
            }
          }, 1800);

          // Stage 5: After 2300ms - output nodes fade in with stagger (100ms each)
          staggerAdd(outputNodes, "orch-visible", 100, 2300);
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(flow);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initOrchestrationHub);
  } else {
    initOrchestrationHub();
  }
})();
