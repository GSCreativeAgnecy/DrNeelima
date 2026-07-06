document.addEventListener('DOMContentLoaded', function () {

    // ---- Loader ----
    const loader = document.getElementById('loader');
    if (loader) {
        window.addEventListener('load', function () {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => loader.remove(), 500);
            }, 300);
        });
        // fallback: hide after 3s regardless
        setTimeout(() => {
            if (loader.parentNode) {
                loader.style.opacity = '0';
                setTimeout(() => loader.remove(), 500);
            }
        }, 3000);
    }

    // ---- Scroll Reveal ----
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    reveals.forEach((el) => observer.observe(el));

    // ---- Navbar Scroll Effect ----
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 20) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ---- Mobile Menu Toggle ----
    const menuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function () {
            mobileMenu.classList.toggle('open');
            const icon = menuBtn.querySelector('i');
            if (mobileMenu.classList.contains('open')) {
                icon.className = 'fas fa-times text-xl text-gray-700';
            } else {
                icon.className = 'fas fa-bars text-xl text-gray-700';
            }
        });

        // Close on link click
        mobileMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                mobileMenu.classList.remove('open');
                const icon = menuBtn.querySelector('i');
                icon.className = 'fas fa-bars text-xl text-gray-700';
            });
        });
    }

    // ---- Scroll to Top ----
    const scrollTop = document.getElementById('scrollTop');
    if (scrollTop) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 400) {
                scrollTop.style.opacity = '1';
                scrollTop.style.visibility = 'visible';
            } else {
                scrollTop.style.opacity = '0';
                scrollTop.style.visibility = 'hidden';
            }
        });

        scrollTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ---- Appointment Form ----
    const form = document.getElementById('appointmentForm');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');

    if (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Booking...';
            }
            if (formMessage) {
                formMessage.classList.add('hidden');
                formMessage.className = 'hidden p-4 rounded-lg text-sm font-medium';
            }

            const formData = new FormData(form);
            const payload = {
                full_name: formData.get('full_name'),
                age: parseInt(formData.get('age')),
                phone: formData.get('phone'),
                email: formData.get('email'),
                appointment_date: formData.get('appointment_date'),
                preferred_time: formData.get('preferred_time'),
                reason: formData.get('reason'),
            };

            try {
                const response = await fetch('/api/appointments', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });

                const data = await response.json();

                if (response.ok && data.success) {
                    if (formMessage) {
                        formMessage.className = 'block p-4 rounded-lg text-sm font-medium bg-green-50 text-green-700 border border-green-200 show';
                        formMessage.innerHTML = '<i class="fas fa-check-circle mr-1"></i> ' + data.message;
                    }
                    form.reset();
                    // Update reference ID in success message
                    const refEl = document.getElementById('appointmentRef');
                    if (refEl && data.appointment_id) {
                        refEl.textContent = '#APT-' + String(data.appointment_id).padStart(3, '0');
                    }
                    // Scroll to success on success page
                    const isStandalone = window.location.pathname === '/appointment';
                    if (!isStandalone && data.appointment_id) {
                        // Redirect to success page if on homepage section
                        window.location.href = '/success?ref=' + data.appointment_id;
                    }
                } else {
                    throw new Error(data.detail || 'Something went wrong. Please try again.');
                }
            } catch (err) {
                if (formMessage) {
                    formMessage.className = 'block p-4 rounded-lg text-sm font-medium bg-red-50 text-red-700 border border-red-200 show';
                    formMessage.innerHTML = '<i class="fas fa-exclamation-circle mr-1"></i> ' + err.message;
                }
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>Book Appointment';
                }
            }
        });
    }

    // ---- Copy UPI ----
    window.copyUPI = function () {
        const upiId = 'doctor@okaxis';
        navigator.clipboard.writeText(upiId).then(function () {
            const btn = document.querySelector('button[onclick="copyUPI()"]');
            if (btn) {
                btn.textContent = 'Copied!';
                setTimeout(function () { btn.textContent = 'Copy UPI ID'; }, 2000);
            }
        }).catch(function () {
            alert('UPI ID: ' + upiId);
        });
    };

    // ---- Set min date on date inputs ----
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    dateInputs.forEach(function (input) {
        input.setAttribute('min', today);
    });
});
