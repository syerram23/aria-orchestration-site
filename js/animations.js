/* ============================================================
   ARIA Orchestration Solutions — Animations
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ----- Animated Counters ----- */
    function animateCounter(el) {
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        const duration = 1800;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            el.textContent = prefix + current + suffix;
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('[data-counter]').forEach(el => counterObserver.observe(el));

    /* ----- Typewriter Effect ----- */
    function typewriter(el) {
        const text = el.dataset.text;
        if (!text) return;
        el.textContent = '';
        let i = 0;
        const interval = setInterval(() => {
            el.textContent += text[i];
            i++;
            if (i >= text.length) clearInterval(interval);
        }, 40);
    }

    const typeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typewriter(entry.target);
                typeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('[data-typewriter]').forEach(el => typeObserver.observe(el));

    /* ----- Progress Bar Animation ----- */
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('[data-width]');
                bars.forEach((bar, i) => {
                    setTimeout(() => {
                        bar.style.width = bar.dataset.width;
                    }, i * 150);
                });
                barObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.animate-bars').forEach(el => barObserver.observe(el));

    /* ----- Hero Architecture Animation ----- */
    const archDiagram = document.querySelector('.arch-diagram');
    if (archDiagram) {
        const archObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const agents = archDiagram.querySelectorAll('.arch-agent');
                    const connector = archDiagram.querySelector('.arch-connector');
                    const workflows = archDiagram.querySelectorAll('.arch-wf');

                    agents.forEach((agent, i) => {
                        setTimeout(() => {
                            agent.style.opacity = '1';
                            agent.style.transform = 'translateY(0)';
                        }, i * 150);
                    });

                    setTimeout(() => {
                        if (connector) connector.style.opacity = '1';
                    }, 500);

                    workflows.forEach((wf, i) => {
                        setTimeout(() => {
                            wf.style.opacity = '1';
                            wf.style.transform = 'translateY(0)';
                        }, 700 + i * 60);
                    });

                    archObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        // Set initial states
        archDiagram.querySelectorAll('.arch-agent').forEach(a => {
            a.style.opacity = '0';
            a.style.transform = 'translateY(16px)';
            a.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        const conn = archDiagram.querySelector('.arch-connector');
        if (conn) {
            conn.style.opacity = '0';
            conn.style.transition = 'opacity 0.5s ease';
        }
        archDiagram.querySelectorAll('.arch-wf').forEach(w => {
            w.style.opacity = '0';
            w.style.transform = 'translateY(10px)';
            w.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        });

        archObserver.observe(archDiagram);
    }

    /* ----- Hero Video Mockup Animation ----- */
    const heroMockup = document.querySelector('.hero-video-mockup');
    if (heroMockup) {
        const speeches = [
            '"Tell me about your experience with enterprise Java development."',
            '"How do you handle deployments in a microservices architecture?"',
            '"What\'s your approach to mentoring junior engineers?"',
            '"Thanks for your time. We\'ll share next steps shortly."'
        ];
        const bubble = heroMockup.querySelector('.ai-bubble');
        const qualBars = heroMockup.querySelectorAll('.qual-fill');
        const fitScore = heroMockup.querySelector('.fit-score');
        const scoreVal = heroMockup.querySelector('.score-val');

        if (bubble && qualBars.length) {
            const barSteps = [
                [20, 15, 10, 0],
                [55, 40, 25, 0],
                [78, 65, 50, 70],
                [85, 70, 60, 90]
            ];

            let hasRun = false;
            const mockupObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !hasRun) {
                        hasRun = true;
                        runMockupAnimation();
                        mockupObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });

            function runMockupAnimation() {
                bubble.textContent = speeches[0];
                setBars(0);

                for (let i = 1; i < speeches.length; i++) {
                    ((step) => {
                        setTimeout(() => {
                            bubble.style.opacity = '0';
                            setTimeout(() => {
                                bubble.textContent = speeches[step];
                                bubble.style.opacity = '1';
                                setBars(step);
                            }, 400);
                        }, step * 4000);
                    })(i);
                }

                // Show fit score
                setTimeout(() => {
                    if (fitScore) fitScore.style.opacity = '1';
                    if (scoreVal) {
                        let current = 0;
                        const target = 82;
                        const interval = setInterval(() => {
                            current += 2;
                            if (current >= target) {
                                current = target;
                                clearInterval(interval);
                            }
                            scoreVal.textContent = current + '%';
                        }, 30);
                    }
                }, 14000);
            }

            function setBars(step) {
                qualBars.forEach((bar, i) => {
                    const pct = barSteps[step][i];
                    bar.style.width = pct + '%';
                    const pctEl = bar.closest('.qual-row')?.querySelector('.qual-pct');
                    if (pctEl) pctEl.textContent = pct ? pct + '%' : '—';
                });
            }

            mockupObserver.observe(heroMockup);
        }
    }

    /* ----- Search Typewriter Animation ----- */
    const searchMockup = document.querySelector('.search-typewriter');
    if (searchMockup) {
        const query = searchMockup.dataset.query || 'Senior Java Developer, 5+ years, NYC metro';
        const queryEl = searchMockup.querySelector('.query');
        const results = searchMockup.querySelectorAll('.search-result');
        const meta = searchMockup.querySelector('.search-meta');

        if (queryEl) {
            let hasRun = false;
            const searchObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !hasRun) {
                        hasRun = true;
                        queryEl.textContent = '';
                        let i = 0;
                        const interval = setInterval(() => {
                            queryEl.textContent += query[i];
                            i++;
                            if (i >= query.length) {
                                clearInterval(interval);
                                // Show results
                                setTimeout(() => {
                                    if (meta) { meta.style.opacity = '1'; }
                                    results.forEach((r, idx) => {
                                        setTimeout(() => {
                                            r.style.opacity = '1';
                                            r.style.transform = 'translateY(0)';
                                        }, idx * 200);
                                    });
                                }, 500);
                            }
                        }, 45);
                        searchObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });

            // Set initial states
            results.forEach(r => {
                r.style.opacity = '0';
                r.style.transform = 'translateY(10px)';
                r.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            });
            if (meta) { meta.style.opacity = '0'; meta.style.transition = 'opacity 0.4s ease'; }

            searchObserver.observe(searchMockup);
        }
    }

});
