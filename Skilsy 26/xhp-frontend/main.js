// Navbar scroll effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll Reveal Animations
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    reveals.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);
// Trigger once on load
reveal();

// Initial Hero Stagger Animation
document.addEventListener('DOMContentLoaded', () => {
    const staggers = document.querySelectorAll('.stagger-up');

    staggers.forEach((element, index) => {
        setTimeout(() => {
            element.style.transition = 'all 1s cubic-bezier(0.25, 1, 0.5, 1)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100 + (index * 150)); // Adds delay progressively
    });
});
