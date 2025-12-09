 // Navbar scroll effect
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Active nav link on scroll
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });

        // Reveal animations
        const reveals = document.querySelectorAll('.reveal');
        const revealObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        reveals.forEach(r => revealObserver.observe(r));

        // Counter animation
        const counters = document.querySelectorAll('.count');
        const runCounter = (el) => {
            const target = +el.dataset.target;
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    el.textContent = target;
                    clearInterval(timer);
                } else {
                    el.textContent = Math.floor(current);
                }
            }, 16);
        };

        const counterObserver = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    runCounter(e.target);
                    counterObserver.unobserve(e.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(c => counterObserver.observe(c));

        // Form handling
        const form = document.getElementById('contactForm');
        const status = document.getElementById('formStatus');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            status.textContent = 'Sending...';

            await new Promise(r => setTimeout(r, 1000));
            status.textContent = '✓ Message sent successfully!';
            form.reset();

            setTimeout(() => {
                status.textContent = '';
            }, 3000);
        });


        const element = document.getElementById("typeWriter");
const fullText = "Hi, I'm Younan Gamal";

let i = 0;
let isDeleting = false;

function typeLoop() {
    if (!isDeleting) {
        element.innerText = fullText.substring(0, i + 1);
        i++;

        if (i === fullText.length) {
            isDeleting = true;
            setTimeout(typeLoop, 1200); // pause before deleting
            return;
        }
    } else {
        element.innerText = fullText.substring(0, i - 1);
        i--;

        if (i === 0) {
            isDeleting = false;
        }
    }

    setTimeout(typeLoop, isDeleting ? 60 : 100);  
}

typeLoop();
