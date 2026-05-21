document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // SIDEBAR TOGGLE & STATE MANAGEMENT
    // ==========================================================================
    const body = document.body;
    const sidebar = document.querySelector('.sidebar');
    const topHeaderToggleBtn = document.querySelector('.top-header-toggle-btn');

    // Create sidebar overlay element dynamically (works on all pages without HTML changes)
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    // Load persisted state or default to expanded ('false')
    const isCollapsed = localStorage.getItem('sidebar-collapsed') === 'true';
    
    if (isCollapsed) {
        body.classList.remove('sidebar-expanded');
    } else {
        body.classList.add('sidebar-expanded');
    }

    // Toggle logic for desktop & mobile
    function toggleSidebar() {
        if (window.innerWidth > 992) {
            // Desktop: toggle expand/collapse
            body.classList.toggle('sidebar-expanded');
            const nowCollapsed = !body.classList.contains('sidebar-expanded');
            localStorage.setItem('sidebar-collapsed', nowCollapsed ? 'true' : 'false');
        } else {
            // Mobile: toggle drawer slide-in with overlay
            if (sidebar) {
                const isOpen = sidebar.classList.toggle('open');
                overlay.classList.toggle('active', isOpen);
            }
        }
    }

    if (topHeaderToggleBtn) {
        topHeaderToggleBtn.addEventListener('click', toggleSidebar);
    }

    // Close sidebar when clicking the overlay
    overlay.addEventListener('click', () => {
        if (sidebar) {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
        }
    });

    // Close sidebar when clicking outside on mobile (legacy fallback)
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 992 && sidebar && sidebar.classList.contains('open')) {
            if (!sidebar.contains(e.target) && topHeaderToggleBtn && !topHeaderToggleBtn.contains(e.target)) {
                sidebar.classList.remove('open');
                overlay.classList.remove('active');
            }
        }
    });


    // ==========================================================================
    // HERO SLIDER
    // ==========================================================================
    const slides = document.querySelectorAll('.hero-slide');
    const prevArrow = document.querySelector('.slider-arrow-left');
    const nextArrow = document.querySelector('.slider-arrow-right');

    if (slides.length > 0) {
        let currentSlide = 0;
        let slideInterval;

        function showSlide(index) {
            slides.forEach(s => s.classList.remove('active'));
            slides[index].classList.add('active');
            currentSlide = index;
        }

        function nextSlide() {
            const next = (currentSlide + 1) % slides.length;
            showSlide(next);
        }

        function prevSlide() {
            const prev = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prev);
        }

        // Auto-advance every 6 seconds
        function startAutoSlide() {
            slideInterval = setInterval(nextSlide, 6000);
        }

        if (nextArrow) {
            nextArrow.addEventListener('click', () => {
                clearInterval(slideInterval);
                nextSlide();
                startAutoSlide();
            });
        }

        if (prevArrow) {
            prevArrow.addEventListener('click', () => {
                clearInterval(slideInterval);
                prevSlide();
                startAutoSlide();
            });
        }

        // Initialize
        showSlide(0);
        startAutoSlide();
    }


    // ==========================================================================
    // TESTIMONIAL CAROUSEL
    // ==========================================================================
    const track = document.getElementById('testimonial-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (track && prevBtn && nextBtn) {
        const cards = Array.from(track.children);
        let currentIndex = 0;
        let testimonialInterval;

        function updateCarousel() {
            track.style.transform = `translateX(${currentIndex * -100}%)`;
        }

        function nextTestimonial() {
            currentIndex = (currentIndex + 1) % cards.length;
            updateCarousel();
        }

        function prevTestimonial() {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            updateCarousel();
        }

        function startAutoTestimonials() {
            testimonialInterval = setInterval(nextTestimonial, 5000); // Auto-advance every 5 seconds
        }

        nextBtn.addEventListener('click', () => {
            clearInterval(testimonialInterval);
            nextTestimonial();
            startAutoTestimonials();
        });

        prevBtn.addEventListener('click', () => {
            clearInterval(testimonialInterval);
            prevTestimonial();
            startAutoTestimonials();
        });

        // Initialize auto play
        startAutoTestimonials();
    }


    // ==========================================================================
    // FAQ ACCORDION (contact page)
    // ==========================================================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isOpen = item.classList.contains('open');
                // Close all
                faqItems.forEach(i => i.classList.remove('open'));
                // Toggle current
                if (!isOpen) item.classList.add('open');
            });
        }
    });


    // ==========================================================================
    // TOAST NOTIFICATION SYSTEM
    // ==========================================================================
    let toastTimer = null;

    function showToast(type, title, message) {
        // Remove any existing toast first
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();
        if (toastTimer) clearTimeout(toastTimer);

        const icon = type === 'success' ? '✓' : '✕';
        const toast = document.createElement('div');
        toast.className = `toast${type === 'error' ? ' toast--error' : ''}`;
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'polite');
        toast.innerHTML = `
            <div class="toast-icon">${icon}</div>
            <div class="toast-body">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close" aria-label="Close notification">&times;</button>
        `;

        document.body.appendChild(toast);

        // Trigger slide-in (needs a frame delay for transition to fire)
        requestAnimationFrame(() => {
            requestAnimationFrame(() => toast.classList.add('toast--show'));
        });

        // Close button
        toast.querySelector('.toast-close').addEventListener('click', () => {
            dismissToast(toast);
        });

        // Auto-dismiss after 5 seconds
        toastTimer = setTimeout(() => dismissToast(toast), 5000);
    }

    function dismissToast(toast) {
        toast.classList.remove('toast--show');
        toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    }


    // ==========================================================================
    // CONTACT FORM HANDLING
    // ==========================================================================
    const contactForms = document.querySelectorAll('[data-contact-form]');

    contactForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            if (btn) {
                const originalText = btn.textContent;
                btn.textContent = 'Sending...';
                btn.disabled = true;

                // Send form data to Formspree asynchronously
                fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .then(response => {
                    if (response.ok) {
                        form.reset();
                        showToast(
                            'success',
                            'Message Sent Successfully!',
                            'JazakAllah Khair! We\'ve received your message and will get back to you within 24 hours.'
                        );
                    } else {
                        showToast(
                            'error',
                            'Submission Failed',
                            'Something went wrong. Please try again or contact us directly on WhatsApp.'
                        );
                    }
                })
                .catch(() => {
                    showToast(
                        'error',
                        'Network Error',
                        'Please check your internet connection and try again.'
                    );
                })
                .finally(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                });
            }
        });
    });


    // ==========================================================================
    // ACTIVE NAV LINK HIGHLIGHT
    // ==========================================================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.sidebar-nav a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});
