// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            mobileMenuBtn.textContent = mobileMenu.classList.contains('active') ? '✕' : '☰';
        });

        // Close mobile menu when clicking on a link
        const mobileLinks = document.querySelectorAll('.mobile-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.textContent = '☰';
            });
        });
    }

    // Floating Crystals Animation
    createFloatingCrystals();

    // Particles Animation
    createParticles();

    // Parallax Effect on Hero Image
    const heroImage = document.getElementById('heroImage');
    if (heroImage) {
        document.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
            heroImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }

    // Typing Effect for Title
    animateTitle();
}

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .highlight-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// Create Floating Crystals
function createFloatingCrystals() {
    const container = document.querySelector('.floating-crystals');
    if (!container) return;

    const crystalCount = 8;
    for (let i = 0; i < crystalCount; i++) {
        const crystal = document.createElement('div');
        crystal.className = 'crystal';
        crystal.style.left = `${Math.random() * 100}%`;
        crystal.style.top = `${Math.random() * 100}%`;
        crystal.style.animationDelay = `${Math.random() * 5}s`;
        crystal.style.animationDuration = `${8 + Math.random() * 4}s`;
        
        // Random size variation
        const scale = 0.6 + Math.random() * 0.8;
        crystal.style.transform = `scale(${scale})`;
        
        container.appendChild(crystal);
    }
}

// Create Particles
function createParticles() {
    const container = document.querySelector('.particles');
    if (!container) return;

    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 10}s`;
        particle.style.animationDuration = `${8 + Math.random() * 6}s`;
        
        container.appendChild(particle);
    }
}

// Animate Title with Letter Appearance
function animateTitle() {
    const titleWords = document.querySelectorAll('.title-word');
    
    titleWords.forEach((word, wordIndex) => {
        const text = word.textContent;
        word.textContent = '';
        word.style.opacity = '1';
        
        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');
            span.textContent = text[i];
            span.style.opacity = '0';
            span.style.display = 'inline-block';
            span.style.animation = `fadeIn 0.5s ease forwards`;
            span.style.animationDelay = `${(wordIndex * 0.8) + (i * 0.1)}s`;
            word.appendChild(span);
        }
    });
}

// Filter functionality for cards page
function filterCards(type) {
    const cards = document.querySelectorAll('.card-item');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    cards.forEach(card => {
        if (type === 'Todas' || card.dataset.type === type) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 10);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// Card modal functionality
function openCardModal(cardId) {
    const modal = document.getElementById('cardModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        // Load card data here
    }
}

function closeCardModal() {
    const modal = document.getElementById('cardModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Accordion functionality for updates page
function toggleAccordion(element) {
    const content = element.nextElementSibling;
    const isOpen = content.style.maxHeight;

    // Close all accordions
    document.querySelectorAll('.accordion-content').forEach(acc => {
        acc.style.maxHeight = null;
    });

    document.querySelectorAll('.accordion-header').forEach(header => {
        header.classList.remove('active');
    });

    // Open clicked accordion if it was closed
    if (!isOpen) {
        content.style.maxHeight = content.scrollHeight + 'px';
        element.classList.add('active');
    }
}