// Gráficos y visualizaciones para La Liga
class LaLigaCharts {
    constructor() {
        this.chartColors = {
            barca: '#004d98',
            rival: '#a50044',
            neutral: '#ffcc00',
            success: '#00ff00',
            warning: '#ff8c00',
            danger: '#ff0000'
        };
    }

    // Crear gráfico simple de evolución de puntos sin bibliotecas externas
    crearGraficoEvolucion() {
        const canvas = document.getElementById('evolucion-chart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        // Datos de evolución de puntos por jornada (temporada no iniciada)
        const jornadas = Array.from({length: 38}, (_, i) => i + 1);
        const puntosBarcelona = Array(38).fill(0); // Todos en 0 porque no ha comenzado
        const puntosRealMadrid = Array(38).fill(0); // Todos en 0 porque no ha comenzado
        
        // Configuración del canvas
        const width = canvas.width;
        const height = canvas.height;
        const padding = 60;
        const chartWidth = width - (padding * 2);
        const chartHeight = height - (padding * 2);
        
        // Limpiar canvas
        ctx.clearRect(0, 0, width, height);
        
        // Fondo del gráfico
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.fillRect(padding, padding, chartWidth, chartHeight);
        
        // Configurar estilo de texto
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        
        // Dibujar título
        ctx.font = 'bold 16px Arial';
        ctx.fillText('Temporada 2025-26 - Próximamente', width / 2, 30);
        
        // Agregar texto indicativo
        ctx.font = '14px Arial';
        ctx.fillStyle = '#ffcc00';
        ctx.fillText('La Liga comenzará el 18 de agosto de 2025', width / 2, 55);
        
        // Restablecer fuente
        ctx.font = '12px Arial';
        
        // Dibujar ejes
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        
        // Eje X (Jornadas)
        ctx.beginPath();
        ctx.moveTo(padding, height - padding);
        ctx.lineTo(width - padding, height - padding);
        ctx.stroke();
        
        // Eje Y (Puntos)
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, height - padding);
        ctx.stroke();
        
        // Etiquetas del eje X
        ctx.textAlign = 'center';
        ctx.fillStyle = '#ffffff';
        for (let i = 0; i < jornadas.length; i += 3) {
            const x = padding + (i * chartWidth) / (jornadas.length - 1);
            ctx.fillText(`J${jornadas[i]}`, x, height - padding + 20);
        }
        
        // Etiquetas del eje Y
        ctx.textAlign = 'right';
        for (let i = 0; i <= 60; i += 10) {
            const y = height - padding - (i * chartHeight) / 60;
            ctx.fillText(i.toString(), padding - 10, y + 4);
            
            // Líneas de cuadrícula horizontales
            if (i > 0) {
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
                ctx.beginPath();
                ctx.moveTo(padding, y);
                ctx.lineTo(width - padding, y);
                ctx.stroke();
            }
        }
        
        // Función para convertir datos a coordenadas del canvas
        const getX = (jornadaIndex) => padding + (jornadaIndex * chartWidth) / (jornadas.length - 1);
        const getY = (puntos) => height - padding - (puntos * chartHeight) / 60;
        
        // Dibujar línea del Barcelona (en 0 porque no ha empezado)
        ctx.strokeStyle = this.chartColors.barca;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(getX(0), getY(puntosBarcelona[0]));
        
        // Solo dibujar punto de inicio en 0
        ctx.lineTo(getX(0), getY(puntosBarcelona[0]));
        ctx.stroke();
        
        // Punto del Barcelona en posición inicial
        ctx.fillStyle = this.chartColors.barca;
        ctx.beginPath();
        ctx.arc(getX(0), getY(puntosBarcelona[0]), 6, 0, 2 * Math.PI);
        ctx.fill();
        
        // Dibujar línea del Real Madrid (también en 0)
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(getX(0), getY(puntosRealMadrid[0]));
        ctx.lineTo(getX(0), getY(puntosRealMadrid[0]));
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Punto del Real Madrid en posición inicial
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(getX(0), getY(puntosRealMadrid[0]), 4, 0, 2 * Math.PI);
        ctx.fill();
        
        // Texto explicativo en el centro
        ctx.font = 'bold 18px Arial';
        ctx.fillStyle = 'rgba(255, 204, 0, 0.8)';
        ctx.textAlign = 'center';
        ctx.fillText('Temporada 2025-26', width / 2, height / 2 - 20);
        ctx.font = '14px Arial';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fillText('¡Próximamente!', width / 2, height / 2 + 5);
        ctx.fillText('Primer partido: 16 de agosto vs Mallorca', width / 2, height / 2 + 25);
        
        // Leyenda
        const legendY = padding + 30;
        
        // Barcelona
        ctx.fillStyle = this.chartColors.barca;
        ctx.fillRect(padding + 20, legendY, 20, 3);
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'left';
        ctx.fillText('FC Barcelona', padding + 50, legendY + 6);
        
        // Real Madrid
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(padding + 150, legendY + 1);
        ctx.lineTo(padding + 170, legendY + 1);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Real Madrid', padding + 180, legendY + 6);
    }

    // Crear gráfico de estadísticas de rendimiento
    crearGraficoRendimiento() {
        const container = document.querySelector('.stats-container');
        if (!container) return;

        // Crear elemento para gráfico de barras de estadísticas clave
        const chartDiv = document.createElement('div');
        chartDiv.className = 'performance-chart';
        chartDiv.innerHTML = `
            <h3>Estadísticas Temporada 2025-26</h3>
            <div class="chart-bars">
                <div class="chart-bar">
                    <div class="bar-label">Partidos jugados</div>
                    <div class="bar-container">
                        <div class="bar barca-bar" data-percentage="0" style="width: 0%;">
                            <span class="bar-value">0/38</span>
                        </div>
                    </div>
                </div>
                <div class="chart-bar">
                    <div class="bar-label">Victorias</div>
                    <div class="bar-container">
                        <div class="bar barca-bar" data-percentage="0" style="width: 0%;">
                            <span class="bar-value">0</span>
                        </div>
                    </div>
                </div>
                <div class="chart-bar">
                    <div class="bar-label">Goles anotados</div>
                    <div class="bar-container">
                        <div class="bar barca-bar" data-percentage="0" style="width: 0%;">
                            <span class="bar-value">0</span>
                        </div>
                    </div>
                </div>
                <div class="chart-bar">
                    <div class="bar-label">Puntos obtenidos</div>
                    <div class="bar-container">
                        <div class="bar barca-bar" data-percentage="0" style="width: 0%;">
                            <span class="bar-value">0/114</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="next-match-info">
                <h4>📅 Próximo partido:</h4>
                <p>RCD Mallorca vs FC Barcelona</p>
                <p>18 de agosto, 2025</p>
            </div>
        `;

        // Agregar estilos para el gráfico de barras
        const style = document.createElement('style');
        style.textContent = `
            .performance-chart {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 10px;
                padding: 25px;
                margin-top: 30px;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .performance-chart h3 {
                color: #ffcc00;
                margin-bottom: 15px;
                text-align: center;
                font-size: 1.3rem;
                border-bottom: 2px solid rgba(255, 204, 0, 0.3);
                padding-bottom: 10px;
            }
            
            .season-status {
                text-align: center;
                color: #ffcc00;
                font-size: 1rem;
                margin-bottom: 20px;
                padding: 10px;
                background: rgba(255, 204, 0, 0.1);
                border-radius: 5px;
                border: 1px solid rgba(255, 204, 0, 0.3);
            }
            
            .next-match-info {
                margin-top: 20px;
                padding: 15px;
                background: rgba(0, 77, 152, 0.2);
                border-radius: 8px;
                border: 1px solid rgba(0, 77, 152, 0.4);
                text-align: center;
            }
            
            .next-match-info h4 {
                color: #004d98;
                margin-bottom: 10px;
                font-size: 1.1rem;
            }
            
            .next-match-info p {
                margin: 5px 0;
                color: #ffffff;
                font-size: 0.95rem;
            }
            
            .chart-bars {
                display: flex;
                flex-direction: column;
                gap: 15px;
            }
            
            .chart-bar {
                display: flex;
                align-items: center;
                gap: 15px;
            }
            
            .bar-label {
                flex: 0 0 150px;
                font-size: 0.9rem;
                text-align: right;
            }
            
            .bar-container {
                flex: 1;
                height: 25px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                position: relative;
                overflow: hidden;
            }
            
            .bar {
                height: 100%;
                border-radius: 12px;
                position: relative;
                transition: width 1s ease-in-out;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                padding-right: 10px;
            }
            
            .barca-bar {
                background: linear-gradient(90deg, #004d98, #ffcc00);
            }
            
            .bar-value {
                font-size: 0.8rem;
                font-weight: bold;
                color: white;
                text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
            }
            
            @media (max-width: 768px) {
                .chart-bar {
                    flex-direction: column;
                    align-items: stretch;
                    gap: 5px;
                }
                
                .bar-label {
                    flex: none;
                    text-align: center;
                }
            }
        `;
        
        if (!document.head.querySelector('style[data-chart-styles]')) {
            style.setAttribute('data-chart-styles', 'true');
            document.head.appendChild(style);
        }

        container.appendChild(chartDiv);

        // Solo animar las barras si tienen valor > 0
        setTimeout(() => {
            const bars = chartDiv.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                const percentage = parseInt(bar.dataset.percentage);
                if (percentage > 0) {
                    setTimeout(() => {
                        bar.style.width = percentage + '%';
                    }, index * 200);
                } else {
                    // Para barras en 0%, mantener un pequeño indicador visual
                    bar.style.width = '2px';
                    bar.style.background = 'rgba(255, 204, 0, 0.3)';
                }
            });
        }, 500);
    }

    // Crear mensaje de tendencia para temporada no iniciada
    crearTendenciaResultados() {
        const resultadosSection = document.querySelector('.resultados-section');
        if (!resultadosSection) return;

        const tendenciaDiv = document.createElement('div');
        tendenciaDiv.className = 'tendencia-resultados';
        tendenciaDiv.innerHTML = `
            <h3>🏆 Temporada 2025-26</h3>
            <div class="season-countdown">
                <div class="countdown-info">
                    <span class="countdown-label">Días para el inicio:</span>
                    <span class="countdown-value" id="dias-restantes">--</span>
                </div>
            </div>
            <div class="season-expectations">
                <p>✨ <strong>Expectativas altas</strong> para la nueva temporada</p>
                <p>🎯 <strong>Objetivo:</strong> Ganar La Liga y competir en Champions</p>
                <p>⚽ <strong>Primer rival:</strong> RCD Mallorca (Jornada 1)</p>
            </div>
        `;

        // Agregar estilos para la nueva tendencia
        const style = document.createElement('style');
        style.textContent = `
            .tendencia-resultados {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 10px;
                padding: 20px;
                margin: 20px 0;
                text-align: center;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .tendencia-resultados h3 {
                color: #ffcc00;
                margin-bottom: 15px;
                font-size: 1.4rem;
            }
            
            .season-countdown {
                margin: 20px 0;
                padding: 15px;
                background: rgba(255, 204, 0, 0.1);
                border-radius: 8px;
            }
            
            .countdown-info {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 10px;
                flex-wrap: wrap;
            }
            
            .countdown-label {
                font-size: 1rem;
                color: #ffffff;
            }
            
            .countdown-value {
                font-size: 2rem;
                font-weight: bold;
                color: #ffcc00;
                min-width: 60px;
                display: inline-block;
            }
            
            .season-expectations {
                display: flex;
                flex-direction: column;
                gap: 10px;
                margin-top: 15px;
            }
            
            .season-expectations p {
                font-size: 0.95rem;
                color: #e0e0e0;
                margin: 0;
                padding: 8px;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 5px;
            }
            
            @media (max-width: 480px) {
                .countdown-info {
                    flex-direction: column;
                    gap: 5px;
                }
                
                .countdown-value {
                    font-size: 1.5rem;
                }
            }
        `;

        if (!document.head.querySelector('style[data-tendencia-styles]')) {
            style.setAttribute('data-tendencia-styles', 'true');
            document.head.appendChild(style);
        }

        resultadosSection.appendChild(tendenciaDiv);
        
        // Calcular días restantes hasta el inicio de temporada
        this.actualizarDiasRestantes();
    }

    // Calcular y mostrar días restantes hasta el inicio de temporada
    actualizarDiasRestantes() {
        const inicioTemporada = new Date('2025-08-16');
        const hoy = new Date();
        const diferencia = inicioTemporada - hoy;
        const diasRestantes = Math.ceil(diferencia / (1000 * 60 * 60 * 24));
        
        const elementoDias = document.getElementById('dias-restantes');
        if (elementoDias) {
            if (diasRestantes > 0) {
                elementoDias.textContent = diasRestantes;
            } else {
                elementoDias.textContent = '🏆';
                elementoDias.parentElement.innerHTML = '<span class="countdown-label">¡La temporada ya comenzó!</span>';
            }
        }
    }

    // Inicializar todos los gráficos
    inicializar() {
        // Esperar a que el DOM esté completamente cargado
        setTimeout(() => {
            this.crearGraficoEvolucion();
            this.crearGraficoRendimiento();
            this.crearTendenciaResultados();
        }, 1000);
    }

    // Actualizar gráficos cuando cambien los datos
    actualizar() {
        this.crearGraficoEvolucion();
    }

    // Hacer el canvas responsive
    ajustarCanvas() {
        const canvas = document.getElementById('evolucion-chart');
        if (!canvas) return;

        const container = canvas.parentElement;
        const containerWidth = container.offsetWidth;
        
        if (containerWidth < 600) {
            canvas.width = containerWidth - 40;
            canvas.height = 300;
        } else {
            canvas.width = 800;
            canvas.height = 400;
        }
        
        this.crearGraficoEvolucion();
    }
}

// Inicializar gráficos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    const chartsManager = new LaLigaCharts();
    
    // Inicializar después de que se carguen los datos
    setTimeout(() => {
        chartsManager.inicializar();
    }, 1500);
    
    // Ajustar canvas en redimensionamiento
    window.addEventListener('resize', () => {
        chartsManager.ajustarCanvas();
    });
    
    // Hacer disponible globalmente
    window.laLigaCharts = chartsManager;
});
