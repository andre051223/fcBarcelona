// Sistema avanzado de funcionalidades para La Liga
class LaLigaAdvanced {
    constructor() {
        this.filtros = {
            equipo: 'todos',
            resultado: 'todos',
            mes: 'todos'
        };
        this.ordenTabla = 'puntos';
        this.datosOriginales = null;
    }

    // Inicializar funcionalidades avanzadas
    inicializar() {
        this.crearFiltrosResultados();
        this.crearControladorTabla();
        this.agregarAnimaciones();
        this.configurarTooltips();
        this.crearModoOscuroClaro();
    }

    // Crear sistema de filtros para resultados
    crearFiltrosResultados() {
        const resultadosSection = document.querySelector('.resultados-section');
        if (!resultadosSection) return;

        const filtrosHTML = `
            <div class="filtros-container">
                <h4>Filtrar Resultados</h4>
                <div class="filtros-grid">
                    <select id="filtro-resultado" class="filtro-select">
                        <option value="todos">Todos los resultados</option>
                        <option value="victoria">Solo victorias</option>
                        <option value="empate">Solo empates</option>
                        <option value="derrota">Solo derrotas</option>
                    </select>
                    
                    <select id="filtro-mes" class="filtro-select">
                        <option value="todos">Todos los meses</option>
                        <option value="agosto">Agosto 2025</option>
                        <option value="septiembre">Septiembre 2025</option>
                        <option value="octubre">Octubre 2025</option>
                    </select>
                    
                    <button id="limpiar-filtros" class="btn-filtro">Limpiar Filtros</button>
                </div>
            </div>
        `;

        resultadosSection.insertAdjacentHTML('afterbegin', filtrosHTML);

        // Event listeners para filtros
        document.getElementById('filtro-resultado').addEventListener('change', (e) => {
            this.filtros.resultado = e.target.value;
            this.aplicarFiltros();
        });

        document.getElementById('filtro-mes').addEventListener('change', (e) => {
            this.filtros.mes = e.target.value;
            this.aplicarFiltros();
        });

        document.getElementById('limpiar-filtros').addEventListener('click', () => {
            this.limpiarFiltros();
        });

        this.agregarEstilosFiltros();
    }

    // Aplicar filtros a los resultados
    aplicarFiltros() {
        const resultadosCards = document.querySelectorAll('.resultado-card');
        
        resultadosCards.forEach(card => {
            let mostrar = true;

            // Filtro por resultado
            if (this.filtros.resultado !== 'todos') {
                const tieneClase = card.classList.contains(`resultado-${this.filtros.resultado}`);
                if (!tieneClase) mostrar = false;
            }

            // Filtro por mes (simplificado)
            if (this.filtros.mes !== 'todos') {
                const fechaTexto = card.querySelector('.fecha').textContent.toLowerCase();
                if (this.filtros.mes === 'agosto' && !fechaTexto.includes('agosto')) {
                    mostrar = false;
                } else if (this.filtros.mes === 'septiembre' && !fechaTexto.includes('septiembre')) {
                    mostrar = false;
                } else if (this.filtros.mes === 'octubre' && !fechaTexto.includes('octubre')) {
                    mostrar = false;
                }
            }

            // Mostrar/ocultar con animación
            if (mostrar) {
                card.style.display = 'block';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    // Limpiar todos los filtros
    limpiarFiltros() {
        this.filtros = { equipo: 'todos', resultado: 'todos', mes: 'todos' };
        
        document.getElementById('filtro-resultado').value = 'todos';
        document.getElementById('filtro-mes').value = 'todos';
        
        const resultadosCards = document.querySelectorAll('.resultado-card');
        resultadosCards.forEach(card => {
            card.style.display = 'block';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    }

    // Crear controlador para ordenar tabla
    crearControladorTabla() {
        const tablaContainer = document.querySelector('.tabla-container');
        if (!tablaContainer) return;

        const controlHTML = `
            <div class="tabla-controls">
                <div class="ordenar-container">
                    <label for="ordenar-tabla">Ordenar por:</label>
                    <select id="ordenar-tabla" class="filtro-select">
                        <option value="puntos">Puntos</option>
                        <option value="goles">Goles a favor</option>
                        <option value="diferencia">Diferencia de goles</option>
                        <option value="nombre">Nombre</option>
                    </select>
                </div>
                
                <div class="buscar-container">
                    <input type="text" id="buscar-equipo" placeholder="Buscar equipo..." class="buscar-input">
                    <button id="btn-buscar" class="btn-buscar">🔍</button>
                </div>
            </div>
        `;

        tablaContainer.insertAdjacentHTML('beforebegin', controlHTML);

        // Event listeners
        document.getElementById('ordenar-tabla').addEventListener('change', (e) => {
            this.ordenarTabla(e.target.value);
        });

        document.getElementById('buscar-equipo').addEventListener('input', (e) => {
            this.buscarEnTabla(e.target.value);
        });

        document.getElementById('btn-buscar').addEventListener('click', () => {
            const valor = document.getElementById('buscar-equipo').value;
            this.buscarEnTabla(valor);
        });
    }

    // Ordenar tabla por diferentes criterios
    ordenarTabla(criterio) {
        const tabla = document.querySelector('.tabla-laliga tbody');
        if (!tabla) return;

        const filas = Array.from(tabla.querySelectorAll('tr'));
        
        filas.sort((a, b) => {
            let valorA, valorB;
            
            switch (criterio) {
                case 'puntos':
                    valorA = parseInt(a.cells[9].textContent);
                    valorB = parseInt(b.cells[9].textContent);
                    return valorB - valorA;
                    
                case 'goles':
                    valorA = parseInt(a.cells[6].textContent);
                    valorB = parseInt(b.cells[6].textContent);
                    return valorB - valorA;
                    
                case 'diferencia':
                    valorA = parseInt(a.cells[8].textContent);
                    valorB = parseInt(b.cells[8].textContent);
                    return valorB - valorA;
                    
                case 'nombre':
                    valorA = a.cells[1].textContent.trim();
                    valorB = b.cells[1].textContent.trim();
                    return valorA.localeCompare(valorB);
                    
                default:
                    return 0;
            }
        });

        // Reordenar filas en el DOM
        filas.forEach((fila, index) => {
            fila.cells[0].textContent = index + 1; // Actualizar posición
            tabla.appendChild(fila);
        });

        // Animar reordenamiento
        this.animarTabla();
    }

    // Buscar equipos en la tabla
    buscarEnTabla(termino) {
        const filas = document.querySelectorAll('.tabla-laliga tbody tr');
        
        filas.forEach(fila => {
            const nombreEquipo = fila.cells[1].textContent.toLowerCase();
            const coincide = nombreEquipo.includes(termino.toLowerCase());
            
            if (coincide || termino === '') {
                fila.style.display = 'table-row';
                fila.style.opacity = '1';
            } else {
                fila.style.opacity = '0.3';
                fila.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
            }
        });

        // Destacar término de búsqueda
        if (termino) {
            setTimeout(() => this.destacarTermino(termino), 300);
        }
    }

    // Destacar término de búsqueda
    destacarTermino(termino) {
        const filas = document.querySelectorAll('.tabla-laliga tbody tr');
        
        filas.forEach(fila => {
            const celda = fila.cells[1];
            const texto = celda.textContent;
            const regex = new RegExp(`(${termino})`, 'gi');
            const textoDestacado = texto.replace(regex, '<mark style="background: #ffcc00; color: #000;">$1</mark>');
            
            if (texto.toLowerCase().includes(termino.toLowerCase())) {
                celda.innerHTML = celda.innerHTML.replace(texto, textoDestacado);
            }
        });
    }

    // Agregar animaciones de entrada
    agregarAnimaciones() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        // Observar elementos para animación
        document.querySelectorAll('.stat-card, .resultado-card, .proximo-card, .stat-category').forEach(el => {
            observer.observe(el);
        });
    }

    // Configurar tooltips informativos
    configurarTooltips() {
        // Tooltips para estadísticas
        const statsItems = document.querySelectorAll('.stat-item');
        statsItems.forEach(item => {
            const label = item.querySelector('.stat-label').textContent;
            const value = item.querySelector('.stat-value').textContent;
            
            item.setAttribute('title', `${label}: ${value}`);
            item.addEventListener('mouseenter', this.mostrarTooltip);
            item.addEventListener('mouseleave', this.ocultarTooltip);
        });

        // Tooltips para tabla
        const filasTabla = document.querySelectorAll('.tabla-laliga tbody tr');
        filasTabla.forEach(fila => {
            const equipo = fila.cells[1].textContent.trim();
            const puntos = fila.cells[9].textContent;
            const goles = fila.cells[6].textContent;
            
            fila.setAttribute('title', `${equipo} - ${puntos} puntos, ${goles} goles`);
        });
    }

    // Mostrar tooltip personalizado
    mostrarTooltip(e) {
        const tooltip = document.createElement('div');
        tooltip.className = 'custom-tooltip';
        tooltip.textContent = e.target.getAttribute('title');
        tooltip.style.cssText = `
            position: absolute;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 0.8rem;
            z-index: 1000;
            pointer-events: none;
            left: ${e.pageX + 10}px;
            top: ${e.pageY - 30}px;
        `;
        
        document.body.appendChild(tooltip);
        e.target.tooltipElement = tooltip;
    }

    // Ocultar tooltip
    ocultarTooltip(e) {
        if (e.target.tooltipElement) {
            e.target.tooltipElement.remove();
            e.target.tooltipElement = null;
        }
    }

    // Crear modo oscuro/claro
    crearModoOscuroClaro() {
        const nav = document.querySelector('nav');
        if (!nav) return;

        const themeToggle = document.createElement('button');
        themeToggle.innerHTML = '🌙';
        themeToggle.className = 'theme-toggle';
        themeToggle.setAttribute('title', 'Cambiar tema');
        
        themeToggle.addEventListener('click', this.toggleTheme);
        nav.appendChild(themeToggle);

        this.agregarEstilosTema();
    }

    // Alternar tema
    toggleTheme() {
        const body = document.body;
        const isLight = body.classList.contains('light-theme');
        
        if (isLight) {
            body.classList.remove('light-theme');
            document.querySelector('.theme-toggle').innerHTML = '🌙';
        } else {
            body.classList.add('light-theme');
            document.querySelector('.theme-toggle').innerHTML = '☀️';
        }
    }

    // Animar tabla
    animarTabla() {
        const filas = document.querySelectorAll('.tabla-laliga tbody tr');
        filas.forEach((fila, index) => {
            fila.style.transform = 'translateX(-20px)';
            fila.style.opacity = '0.5';
            
            setTimeout(() => {
                fila.style.transform = 'translateX(0)';
                fila.style.opacity = '1';
            }, index * 50);
        });
    }

    // Agregar estilos para filtros
    agregarEstilosFiltros() {
        const style = document.createElement('style');
        style.textContent = `
            .filtros-container {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 10px;
                padding: 20px;
                margin-bottom: 20px;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .filtros-container h4 {
                color: #ffcc00;
                margin-bottom: 15px;
                font-size: 1.1rem;
            }
            
            .filtros-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
                align-items: center;
            }
            
            .filtro-select, .buscar-input {
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.3);
                border-radius: 5px;
                padding: 8px 12px;
                color: white;
                font-size: 0.9rem;
            }
            
            .filtro-select:focus, .buscar-input:focus {
                outline: none;
                border-color: #ffcc00;
                box-shadow: 0 0 5px rgba(255, 204, 0, 0.3);
            }
            
            .btn-filtro, .btn-buscar {
                background: linear-gradient(135deg, #004d98, #ffcc00);
                border: none;
                border-radius: 5px;
                padding: 8px 16px;
                color: white;
                font-weight: bold;
                cursor: pointer;
                transition: transform 0.3s ease;
            }
            
            .btn-filtro:hover, .btn-buscar:hover {
                transform: translateY(-2px);
            }
            
            .tabla-controls {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                flex-wrap: wrap;
                gap: 15px;
            }
            
            .ordenar-container, .buscar-container {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .buscar-container {
                position: relative;
            }
            
            .theme-toggle {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 5px;
                border-radius: 50%;
                transition: background 0.3s ease;
            }
            
            .theme-toggle:hover {
                background: rgba(255, 255, 255, 0.1);
            }
            
            .animate-in {
                animation: slideInUp 0.6s ease-out;
            }
            
            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            /* Tema claro */
            .light-theme {
                background: linear-gradient(75deg, #e3f2fd, #f5f5f5, #e8eaf6) !important;
                color: #333 !important;
            }
            
            .light-theme .tabla-laliga,
            .light-theme .resultado-card,
            .light-theme .proximo-card,
            .light-theme .stat-category,
            .light-theme .filtros-container {
                background: rgba(255, 255, 255, 0.8) !important;
                color: #333 !important;
            }
            
            .light-theme .tabla-laliga th {
                background: linear-gradient(135deg, #1976d2, #303f9f) !important;
                color: white !important;
            }
            
            @media (max-width: 768px) {
                .tabla-controls {
                    flex-direction: column;
                    align-items: stretch;
                }
                
                .filtros-grid {
                    grid-template-columns: 1fr;
                }
            }
        `;
        
        if (!document.head.querySelector('style[data-advanced-styles]')) {
            style.setAttribute('data-advanced-styles', 'true');
            document.head.appendChild(style);
        }
    }

    // Agregar estilos para temas
    agregarEstilosTema() {
        const style = document.createElement('style');
        style.textContent = `
            .light-theme .hero-laliga {
                background: linear-gradient(135deg, #1976d2, #d32f2f) !important;
            }
            
            .light-theme .stat-card h3,
            .light-theme .stat-value,
            .light-theme h2,
            .light-theme h3 {
                color: #1976d2 !important;
            }
            
            .light-theme a {
                color: #333 !important;
            }
            
            .light-theme a:hover {
                color: #1976d2 !important;
            }
        `;
        
        if (!document.head.querySelector('style[data-theme-styles]')) {
            style.setAttribute('data-theme-styles', 'true');
            document.head.appendChild(style);
        }
    }
}

// Inicializar funcionalidades avanzadas
document.addEventListener('DOMContentLoaded', function() {
    // Esperar a que se carguen los datos principales
    setTimeout(() => {
        const advanced = new LaLigaAdvanced();
        advanced.inicializar();
        
        // Hacer disponible globalmente
        window.laLigaAdvanced = advanced;
    }, 2000);
});
