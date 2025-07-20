// Copa del Rey JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    initCopaDelRey();
});

function initCopaDelRey() {
    // Inicializar funcionalidades
    updateStatistics();
    animateEliminatorias();
    setupCountdown();
    addInteractiveEffects();
    loadMatchHighlights(); // Ahora carga información de la próxima temporada
}

// Actualizar estadísticas dinámicamente
function updateStatistics() {
    const stats = {
        eliminatoriaActual: "Sin empezar",
        partidosJugados: 0,
        golesMarcados: 0,
        golesRecibidos: 0
    };

    // Actualizar elementos con animación (mantener en 0 porque la copa no ha empezado)
    animateCounter('partidos-copa', stats.partidosJugados);
    animateCounter('goles-copa', stats.golesMarcados);
    
    // Actualizar eliminatoria actual
    const eliminatoriaElement = document.getElementById('eliminatoria-actual');
    if (eliminatoriaElement) {
        eliminatoriaElement.textContent = stats.eliminatoriaActual;
    }
}

// Animar contadores
function animateCounter(elementId, targetValue) {
    const element = document.getElementById(elementId);
    if (!element) return;

    let currentValue = 0;
    const increment = targetValue / 20;
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
        }
        element.textContent = Math.floor(currentValue);
    }, 50);
}

// Animar eliminatorias
function animateEliminatorias() {
    const eliminatorias = document.querySelectorAll('.eliminatoria');
    
    eliminatorias.forEach((eliminatoria, index) => {
        eliminatoria.style.opacity = '0';
        eliminatoria.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            eliminatoria.style.transition = 'all 0.6s ease';
            eliminatoria.style.opacity = '1';
            eliminatoria.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Configurar cuenta regresiva para el próximo partido
function setupCountdown() {
    const nextMatchDate = new Date('2025-01-29T21:00:00');
    
    function updateCountdown() {
        const now = new Date();
        const difference = nextMatchDate - now;
        
        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            
            // Crear o actualizar elemento de cuenta regresiva
            let countdownElement = document.getElementById('countdown');
            if (!countdownElement) {
                countdownElement = document.createElement('div');
                countdownElement.id = 'countdown';
                countdownElement.className = 'countdown-container';
                
                const proximaSection = document.querySelector('.proxima-section');
                if (proximaSection) {
                    proximaSection.appendChild(countdownElement);
                }
            }
            
            countdownElement.innerHTML = `
                <h3>Tiempo hasta el próximo partido:</h3>
                <div class="countdown-timer">
                    <div class="time-unit">
                        <span class="time-number">${days}</span>
                        <span class="time-label">Días</span>
                    </div>
                    <div class="time-unit">
                        <span class="time-number">${hours}</span>
                        <span class="time-label">Horas</span>
                    </div>
                    <div class="time-unit">
                        <span class="time-number">${minutes}</span>
                        <span class="time-label">Minutos</span>
                    </div>
                </div>
            `;
            
            // Agregar estilos CSS dinámicamente
            if (!document.getElementById('countdown-styles')) {
                const style = document.createElement('style');
                style.id = 'countdown-styles';
                style.textContent = `
                    .countdown-container {
                        text-align: center;
                        margin: 2rem 0;
                        padding: 2rem;
                        background: rgba(255, 204, 0, 0.1);
                        border-radius: 15px;
                        border: 1px solid rgba(255, 204, 0, 0.3);
                    }
                    
                    .countdown-container h3 {
                        color: #ffcc00;
                        margin-bottom: 1.5rem;
                        font-size: 1.5rem;
                    }
                    
                    .countdown-timer {
                        display: flex;
                        justify-content: center;
                        gap: 2rem;
                        flex-wrap: wrap;
                    }
                    
                    .time-unit {
                        background: rgba(255, 255, 255, 0.1);
                        padding: 1rem;
                        border-radius: 10px;
                        min-width: 80px;
                    }
                    
                    .time-number {
                        display: block;
                        font-size: 2rem;
                        font-weight: bold;
                        color: #ffcc00;
                        margin-bottom: 0.5rem;
                    }
                    
                    .time-label {
                        color: #ffffff;
                        font-size: 0.9rem;
                        opacity: 0.8;
                    }
                `;
                document.head.appendChild(style);
            }
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 60000); // Actualizar cada minuto
}

// Efectos interactivos
function addInteractiveEffects() {
    // Efecto hover en tarjetas de trofeos
    const trofeoCards = document.querySelectorAll('.trofeo-card');
    trofeoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.boxShadow = '0 15px 40px rgba(255, 204, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Efecto parallax eliminado para evitar superposiciones
    // window.addEventListener('scroll', function() {
    //     const scrolled = window.pageYOffset;
    //     const parallaxElements = document.querySelectorAll('.hero-copa');
    //     
    //     parallaxElements.forEach(element => {
    //         const speed = 0.5;
    //         element.style.transform = `translateY(${scrolled * speed}px)`;
    //     });
    // });
    
    // Animación de aparición en scroll
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
    
    // Observar elementos para animación
    const elementsToAnimate = document.querySelectorAll('.historia-card, .trofeo-card, .titulo-item');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
}

// Cargar información de la próxima temporada
function loadMatchHighlights() {
    const seasonInfo = [
        {
            title: "Preparación para la Copa del Rey 2025-26",
            date: "Temporada próxima",
            info: [
                "Sorteo de primera eliminatoria por anunciarse",
                "El Barcelona buscará su título número 33",
                "Preparación en la pretemporada",
                "Nuevos fichajes para reforzar el equipo"
            ]
        },
        {
            title: "Objetivos para la nueva temporada",
            date: "Copa del Rey 2025-26",
            info: [
                "Llegar a la final en Sevilla",
                "Mantener la tradición copera del club",
                "Integrar a los jóvenes talentos",
                "Conquistar el trofeo número 33"
            ]
        }
    ];
    
    // Crear sección de información de temporada si no existe
    const seasonSection = createSeasonInfoSection(seasonInfo);
    const main = document.querySelector('main');
    const historialSection = document.getElementById('historial');
    
    if (main && historialSection) {
        main.insertBefore(seasonSection, historialSection);
    }
}

// Crear sección de información de temporada
function createSeasonInfoSection(seasonInfo) {
    const section = document.createElement('section');
    section.className = 'season-info-section';
    section.id = 'season-info';
    
    section.innerHTML = `
        <h2>Próxima Temporada 2025-26</h2>
        <div class="season-info-container">
            ${seasonInfo.map(info => `
                <div class="season-info-card">
                    <h3>${info.title}</h3>
                    <p class="season-info-date">${info.date}</p>
                    <ul class="season-info-list">
                        ${info.info.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            `).join('')}
        </div>
    `;
    
    // Agregar estilos para información de temporada
    if (!document.getElementById('season-info-styles')) {
        const style = document.createElement('style');
        style.id = 'season-info-styles';
        style.textContent = `
            .season-info-section {
                padding: 4rem 2rem;
                background: rgba(0, 0, 0, 0.2);
                position: relative;
                z-index: 2;
            }
            
            .season-info-section h2 {
                font-size: 2.5rem;
                margin-bottom: 3rem;
                color: #ffcc00;
                text-align: center;
            }
            
            .season-info-container {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                gap: 2rem;
                max-width: 1000px;
                margin: 0 auto;
            }
            
            .season-info-card {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 15px;
                padding: 2rem;
                border: 1px solid rgba(255, 204, 0, 0.3);
                transition: all 0.3s ease;
            }
            
            .season-info-card:hover {
                transform: translateY(-5px);
                border-color: rgba(255, 204, 0, 0.6);
                background: rgba(255, 255, 255, 0.1);
            }
            
            .season-info-card h3 {
                color: #ffcc00;
                margin-bottom: 0.5rem;
                font-size: 1.3rem;
            }
            
            .season-info-date {
                color: #cccccc;
                margin-bottom: 1.5rem;
                font-size: 0.9rem;
                font-style: italic;
            }
            
            .season-info-list {
                list-style: none;
                padding: 0;
            }
            
            .season-info-list li {
                background: rgba(255, 204, 0, 0.1);
                margin-bottom: 0.5rem;
                padding: 0.8rem;
                border-radius: 8px;
                color: #ffffff;
                border-left: 3px solid #ffcc00;
            }
            
            .season-info-list li:before {
                content: "🎯";
                margin-right: 0.5rem;
            }
        `;
        document.head.appendChild(style);
    }
    
    return section;
}

// Función deshabilitada - La copa no ha empezado aún
function simulateRealTimeUpdates() {
    // No hacer actualizaciones automáticas porque la copa no ha iniciado
    console.log('Copa del Rey 2025-26: Esperando inicio de temporada');
}

// Botón de compartir eliminado

// Inicializar funcionalidades adicionales
setTimeout(() => {
    simulateRealTimeUpdates();
    // setupSocialSharing(); - Eliminado
}, 2000);

// Navegación suave para enlaces internos
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

// Fondo animado eliminado para mejor rendimiento
