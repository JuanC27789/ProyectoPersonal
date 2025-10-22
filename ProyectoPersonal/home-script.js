// Animación de entrada
document.addEventListener('DOMContentLoaded', () => {
    console.log('Grupo JC Transporte - Página Principal Cargada');
    
    // Agregar efecto de typing al tagline
    const tagline = document.querySelector('.tagline');
    const text = tagline.textContent;
    tagline.textContent = '';
    
    let index = 0;
    const typingSpeed = 50;
    
    function typeWriter() {
        if (index < text.length) {
            tagline.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, typingSpeed);
        }
    }
    
    setTimeout(typeWriter, 500);
});

// Efecto parallax en el mouse
document.addEventListener('mousemove', (e) => {
    const particles = document.querySelectorAll('.particle');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    particles.forEach((particle, index) => {
        const speed = (index + 1) * 20;
        const xMove = (x - 0.5) * speed;
        const yMove = (y - 0.5) * speed;
        
        particle.style.transform = `translate(${xMove}px, ${yMove}px)`;
    });
});

// Animación de los feature items
const featureItems = document.querySelectorAll('.feature-item');

featureItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        item.style.transition = 'all 0.5s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
    }, 1000 + (index * 200));
});

// Animación de los botones
const buttons = document.querySelectorAll('.btn-main, .btn-secondary');

buttons.forEach((button, index) => {
    button.style.opacity = '0';
    button.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        button.style.transition = 'all 0.5s ease';
        button.style.opacity = '1';
        button.style.transform = 'scale(1)';
    }, 1500 + (index * 200));
});

// Animación de info boxes
const infoBoxes = document.querySelectorAll('.info-box');

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const infoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 150);
            infoObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

infoBoxes.forEach(box => {
    box.style.opacity = '0';
    box.style.transform = 'translateX(-30px)';
    box.style.transition = 'all 0.5s ease';
    infoObserver.observe(box);
});

// Efecto de brillo en el logo
const logoIcon = document.querySelector('.logo-container i');
let glowIntensity = 0;
let glowDirection = 1;

setInterval(() => {
    glowIntensity += 0.02 * glowDirection;
    
    if (glowIntensity >= 1) {
        glowDirection = -1;
    } else if (glowIntensity <= 0) {
        glowDirection = 1;
    }
    
    const glowValue = 20 + (glowIntensity * 20);
    logoIcon.style.filter = `drop-shadow(0 0 ${glowValue}px rgba(211, 47, 47, 0.6))`;
}, 50);

// Prevenir comportamiento por defecto en enlaces sociales
document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.getAttribute('href') === '#') {
            e.preventDefault();
            alert('Próximamente: Síguenos en nuestras redes sociales');
        }
    });
});

// Agregar efecto de ripple a los botones
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple-effect');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Agregar estilos para el efecto ripple
const style = document.createElement('style');
style.textContent = `
    .btn-main, .btn-secondary {
        position: relative;
        overflow: hidden;
    }
    
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Contador de visitas (simulado)
const visitCount = localStorage.getItem('visitCount') || 0;
localStorage.setItem('visitCount', parseInt(visitCount) + 1);

console.log(`Visitas totales: ${parseInt(visitCount) + 1}`);
