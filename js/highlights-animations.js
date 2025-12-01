// ====================================
// ANIMAÇÕES DA SEÇÃO HIGHLIGHTS
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    initHighlightsAnimations();
    initScrollAnimations();
    initParallaxEffect();
});

// Inicializa animações dos cards de highlights
function initHighlightsAnimations() {
    const highlightCards = document.querySelectorAll('.highlight-card');
    
    highlightCards.forEach((card, index) => {
        // Adiciona efeito de partículas ao passar o mouse
        card.addEventListener('mouseenter', function() {
            createCardParticles(card);
        });
        
        // Adiciona animação de pulse no conteúdo
        card.addEventListener('mouseenter', function() {
            const content = card.querySelector('.highlight-content');
            content.style.animation = 'contentPulse 0.6s ease-out';
        });
        
        card.addEventListener('mouseleave', function() {
            const content = card.querySelector('.highlight-content');
            content.style.animation = '';
        });
    });
}

// Cria partículas ao passar o mouse nos cards
function createCardParticles(card) {
    const particleCount = 8;
    const rect = card.getBoundingClientRect();
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'highlight-particle';
        
        // Posição aleatória dentro do card
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        
        particle.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 4px;
            height: 4px;
            background: radial-gradient(circle, rgba(168, 85, 247, 1), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10;
            animation: particleRise ${1 + Math.random()}s ease-out forwards;
        `;
        
        card.appendChild(particle);
        
        // Remove a partícula após a animação
        setTimeout(() => {
            particle.remove();
        }, 1500);
    }
}

// Animação de scroll reveal
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 200);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const highlightCards = document.querySelectorAll('.highlight-card');
    highlightCards.forEach(card => observer.observe(card));
    
    // Anima o título
    const title = document.getElementById('highlightsTitle');
    if (title) {
        const titleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateTitle(title);
                    titleObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        titleObserver.observe(title);
    }
}

// Anima o título com efeito de digitação
function animateTitle(titleElement) {
    const text = titleElement.textContent;
    titleElement.textContent = '';
    titleElement.style.opacity = '1';
    
    let index = 0;
    const speed = 80;
    
    function typeWriter() {
        if (index < text.length) {
            titleElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, speed);
        }
    }
    
    typeWriter();
}

// Efeito parallax nas imagens dos highlights
function initParallaxEffect() {
    const highlightImages = document.querySelectorAll('.highlight-image img');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        highlightImages.forEach((img, index) => {
            const card = img.closest('.highlight-card');
            const rect = card.getBoundingClientRect();
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const offset = (rect.top - window.innerHeight / 2) * 0.1;
                img.style.transform = `translateY(${offset}px) scale(1.05)`;
            }
        });
    });
}

// Adiciona estilos de animação dinamicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes contentPulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.02);
        }
    }
    
    @keyframes particleRise {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) scale(0);
            opacity: 0;
        }
    }
    
    .highlight-particle {
        animation: particleRise 1.5s ease-out forwards;
    }
    
    /* Animação de reveal para os cards */
    .highlight-card {
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .highlight-card:nth-child(1).visible {
        transition-delay: 0.1s;
    }
    
    .highlight-card:nth-child(2).visible {
        transition-delay: 0.3s;
    }
    
    .highlight-card:nth-child(3).visible {
        transition-delay: 0.5s;
    }
`;
document.head.appendChild(style);
