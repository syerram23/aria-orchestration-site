/* ============================================================
   ARIA Orchestration Solutions — Shared JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ----- Scroll-triggered fade-in animations ----- */
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.fade-in-up').forEach(el => fadeObserver.observe(el));

    /* ----- Navbar hide/show on scroll ----- */
    const nav = document.querySelector('.nav');
    let lastScroll = 0;
    if (nav) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;
            if (currentScroll > 80) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
            if (currentScroll > lastScroll && currentScroll > 200) {
                nav.classList.add('hidden');
            } else {
                nav.classList.remove('hidden');
            }
            lastScroll = currentScroll;
        }, { passive: true });
    }

    /* ----- Mobile nav toggle ----- */
    const mobileBtn = document.querySelector('.nav-mobile');
    const navLinks = document.querySelector('.nav-links');
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            const icon = mobileBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }

    /* ----- Dropdown toggle (mobile) ----- */
    document.querySelectorAll('.nav-dropdown > .nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                link.parentElement.classList.toggle('open');
            }
        });
    });

    /* ----- Smooth scroll for anchor links ----- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                if (navLinks) navLinks.classList.remove('show');
            }
        });
    });

    /* ----- FAQ accordion ----- */
    document.querySelectorAll('.faq-q').forEach(q => {
        q.addEventListener('click', () => {
            const item = q.parentElement;
            const wasOpen = item.classList.contains('open');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
            if (!wasOpen) item.classList.add('open');
        });
    });

    /* ----- Step accordion (How It Works) ----- */
    document.querySelectorAll('.step-header').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const wasActive = item.classList.contains('active');
            document.querySelectorAll('.step-item').forEach(s => s.classList.remove('active'));
            if (!wasActive) item.classList.add('active');
        });
    });

    /* ----- Workflow detail accordion ----- */
    document.querySelectorAll('.wf-detail-header').forEach(header => {
        header.addEventListener('click', () => {
            const card = header.parentElement;
            const wasActive = card.classList.contains('active');
            document.querySelectorAll('.wf-detail-card').forEach(c => c.classList.remove('active'));
            if (!wasActive) card.classList.add('active');
        });
    });

    /* ----- Workflow filter tabs ----- */
    document.querySelectorAll('.workflow-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const filter = tab.dataset.filter;
            document.querySelectorAll('.workflow-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            document.querySelectorAll('.workflow-card').forEach(card => {
                if (filter === 'all' || card.dataset.team === filter) {
                    card.classList.remove('hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(12px)';
                    requestAnimationFrame(() => {
                        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    });
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

});
