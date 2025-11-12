// Interactividad del mapa
document.addEventListener('DOMContentLoaded', function() {
    const markers = document.querySelectorAll('.location-marker');
    const tooltip = document.getElementById('locationTooltip');
    const mapWrapper = document.querySelector('.panama-map-wrapper');

    // Agregar eventos a cada marcador
    markers.forEach(marker => {
        marker.addEventListener('mouseenter', function(e) {
            const locationName = this.getAttribute('data-location');
            tooltip.textContent = locationName;
            tooltip.classList.add('active');
        });

        marker.addEventListener('mousemove', function(e) {
            const rect = mapWrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            tooltip.style.left = x + 20 + 'px';
            tooltip.style.top = y - 10 + 'px';
        });

        marker.addEventListener('mouseleave', function() {
            tooltip.classList.remove('active');
        });

        // Efecto de click
        marker.addEventListener('click', function() {
            const locationName = this.getAttribute('data-location');
            
            // Crear efecto de onda
            const ripple = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            const markerDot = this.querySelector('.marker-dot');
            const cx = markerDot.getAttribute('cx');
            const cy = markerDot.getAttribute('cy');
            
            ripple.setAttribute('cx', cx);
            ripple.setAttribute('cy', cy);
            ripple.setAttribute('r', '0');
            ripple.setAttribute('fill', 'none');
            ripple.setAttribute('stroke', '#ff6b35');
            ripple.setAttribute('stroke-width', '2');
            ripple.style.opacity = '1';
            
            this.appendChild(ripple);
            
            // Animar la onda
            let radius = 0;
            let opacity = 1;
            const animate = setInterval(() => {
                radius += 2;
                opacity -= 0.05;
                ripple.setAttribute('r', radius);
                ripple.style.opacity = opacity;
                
                if (opacity <= 0) {
                    clearInterval(animate);
                    ripple.remove();
                }
            }, 30);

            // Scroll a la tarjeta correspondiente
            const locationCards = document.querySelectorAll('.location-card h3');
            locationCards.forEach(card => {
                if (card.textContent === locationName) {
                    card.parentElement.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                    
                    // Efecto de destaque
                    card.parentElement.style.transform = 'scale(1.05)';
                    card.parentElement.style.borderColor = '#ff6b35';
                    
                    setTimeout(() => {
                        card.parentElement.style.transform = '';
                        card.parentElement.style.borderColor = '';
                    }, 2000);
                }
            });
        });
    });

    // Animación de las tarjetas al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const locationCards = document.querySelectorAll('.location-card');
    locationCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Efecto hover en las tarjetas que resalta el marcador correspondiente
    locationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const locationName = this.querySelector('h3').textContent;
            markers.forEach(marker => {
                if (marker.getAttribute('data-location') === locationName) {
                    const ring = marker.querySelector('.marker-ring');
                    ring.style.opacity = '1';
                }
            });
        });

        card.addEventListener('mouseleave', function() {
            markers.forEach(marker => {
                const ring = marker.querySelector('.marker-ring');
                ring.style.opacity = '0';
            });
        });

        // Click en tarjeta para centrar el mapa en el marcador
        card.addEventListener('click', function() {
            const locationName = this.querySelector('h3').textContent;
            markers.forEach(marker => {
                if (marker.getAttribute('data-location') === locationName) {
                    // Scroll al mapa
                    mapWrapper.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                    
                    // Efecto de destaque en el marcador
                    const ring = marker.querySelector('.marker-ring');
                    ring.style.opacity = '1';
                    ring.style.strokeWidth = '4';
                    
                    setTimeout(() => {
                        ring.style.opacity = '0';
                        ring.style.strokeWidth = '2';
                    }, 1500);
                }
            });
        });
    });

});
