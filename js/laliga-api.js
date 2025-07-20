// API simulada para datos de La Liga en tiempo real
class LaLigaAPI {
    constructor() {
        this.baseURL = 'https://api.laliga.es/v3'; // URL simulada
        this.cache = new Map();
        this.cacheTimeout = 5 * 60 * 1000; // 5 minutos
    }

    // Simular llamada a API para tabla de posiciones
    async obtenerTablaLiga() {
        const cacheKey = 'tabla-liga';
        
        if (this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (Date.now() - cached.timestamp < this.cacheTimeout) {
                return cached.data;
            }
        }

        // Simular delay de red
        await this.delay(500);

        const data = {
            temporada: '2025-26',
            jornada: 19,
            equipos: [
                {
                    posicion: 1,
                    equipo: 'Real Madrid',
                    puntos: 51,
                    partidos: 19,
                    victorias: 16,
                    empates: 3,
                    derrotas: 0,
                    golesFavor: 48,
                    golesContra: 12,
                    diferencia: 36,
                    forma: ['V', 'V', 'V', 'E', 'V'],
                    racha: 'Invicto en 19 partidos'
                },
                {
                    posicion: 2,
                    equipo: 'FC Barcelona',
                    puntos: 48,
                    partidos: 19,
                    victorias: 15,
                    empates: 3,
                    derrotas: 1,
                    golesFavor: 52,
                    golesContra: 18,
                    diferencia: 34,
                    forma: ['V', 'V', 'V', 'E', 'V'],
                    racha: '2 victorias consecutivas'
                }
                // ... más equipos
            ],
            ultimaActualizacion: new Date().toISOString()
        };

        // Guardar en cache
        this.cache.set(cacheKey, {
            data: data,
            timestamp: Date.now()
        });

        return data;
    }

    // Simular llamada para resultados recientes
    async obtenerResultadosRecientes(equipoId = 2) { // 2 = Barcelona
        const cacheKey = `resultados-${equipoId}`;
        
        if (this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (Date.now() - cached.timestamp < this.cacheTimeout) {
                return cached.data;
            }
        }

        await this.delay(300);

        const data = {
            equipo: 'FC Barcelona',
            resultados: [
                {
                    fecha: '2025-01-12',
                    jornada: 19,
                    local: 'FC Barcelona',
                    visitante: 'Real Betis',
                    marcador: '3-1',
                    resultado: 'V',
                    estadio: 'Camp Nou',
                    asistencia: 85432,
                    goleadores: ['Lewandowski 23\'', 'Yamal 45\'', 'Pedri 78\'']
                },
                {
                    fecha: '2025-01-05',
                    jornada: 18,
                    local: 'Atlético Madrid',
                    visitante: 'FC Barcelona',
                    marcador: '1-2',
                    resultado: 'V',
                    estadio: 'Metropolitano',
                    asistencia: 68000,
                    goleadores: ['Raphinha 34\'', 'Gavi 67\'']
                }
            ],
            estadisticas: {
                ultimosPartidos: 6,
                victorias: 4,
                empates: 1,
                derrotas: 1,
                golesAFavor: 12,
                golesEnContra: 5
            }
        };

        this.cache.set(cacheKey, {
            data: data,
            timestamp: Date.now()
        });

        return data;
    }

    // Simular llamada para próximos partidos
    async obtenerProximosPartidos(equipoId = 2) {
        const cacheKey = `proximos-${equipoId}`;
        
        await this.delay(200);

        const data = {
            equipo: 'FC Barcelona',
            proximosPartidos: [
                {
                    fecha: '2025-01-19',
                    hora: '21:00',
                    jornada: 20,
                    local: 'Villarreal CF',
                    visitante: 'FC Barcelona',
                    estadio: 'Estadio de la Cerámica',
                    television: 'DAZN',
                    prediccion: {
                        probabilidadVictoria: 65,
                        cuotas: { '1': 2.80, 'X': 3.40, '2': 2.45 }
                    }
                },
                {
                    fecha: '2025-01-26',
                    hora: '16:15',
                    jornada: 21,
                    local: 'FC Barcelona',
                    visitante: 'Athletic Bilbao',
                    estadio: 'Camp Nou',
                    television: 'Movistar LaLiga',
                    prediccion: {
                        probabilidadVictoria: 75,
                        cuotas: { '1': 1.85, 'X': 3.60, '2': 4.20 }
                    }
                }
            ]
        };

        this.cache.set(cacheKey, {
            data: data,
            timestamp: Date.now()
        });

        return data;
    }

    // Simular llamada para estadísticas detalladas
    async obtenerEstadisticasDetalladas(equipoId = 2) {
        const cacheKey = `estadisticas-${equipoId}`;
        
        await this.delay(400);

        const data = {
            equipo: 'FC Barcelona',
            temporada: '2025-26',
            estadisticas: {
                generales: {
                    partidos: 19,
                    victorias: 15,
                    empates: 3,
                    derrotas: 1,
                    puntos: 48,
                    posicion: 2
                },
                ataque: {
                    goles: 52,
                    golesPorPartido: 2.74,
                    disparos: 308,
                    disparosAPuerta: 187,
                    conversion: 16.9,
                    posesion: 68.5,
                    pasesCompletados: 12847,
                    precisionPases: 89.2
                },
                defensa: {
                    golesRecibidos: 18,
                    golesRecibidosPorPartido: 0.95,
                    porteriasACero: 8,
                    interceptaciones: 189,
                    recuperaciones: 267,
                    tacklesGanados: 145
                },
                disciplina: {
                    tarjetasAmarillas: 32,
                    tarjetasRojas: 2,
                    faltas: 203,
                    faltasRecibidas: 245
                },
                jugadores: {
                    maxGoleador: { nombre: 'Lewandowski', goles: 15 },
                    maxAsistente: { nombre: 'Pedri', asistencias: 8 },
                    maxMinutos: { nombre: 'Ter Stegen', minutos: 1710 }
                }
            },
            comparativaLiga: {
                ranking: {
                    ataque: 1,
                    defensa: 3,
                    posesion: 1,
                    pasesCompletados: 1
                }
            }
        };

        this.cache.set(cacheKey, {
            data: data,
            timestamp: Date.now()
        });

        return data;
    }

    // Simular llamada para noticias relacionadas
    async obtenerNoticiasRecientes(limite = 5) {
        await this.delay(300);

        return {
            noticias: [
                {
                    titulo: 'Barcelona sigue firme en la lucha por La Liga',
                    resumen: 'El equipo culé mantiene el segundo puesto con una diferencia de 3 puntos respecto al líder.',
                    fecha: '2025-01-13',
                    categoria: 'La Liga',
                    imagen: 'https://example.com/noticia1.jpg'
                },
                {
                    titulo: 'Lewandowski llega a los 15 goles en La Liga',
                    resumen: 'El delantero polaco sigue siendo el máximo goleador del equipo en la competición doméstica.',
                    fecha: '2025-01-12',
                    categoria: 'Jugadores',
                    imagen: 'https://example.com/noticia2.jpg'
                }
            ]
        };
    }

    // Utilidad para simular delay de red
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Limpiar cache
    limpiarCache() {
        this.cache.clear();
    }

    // Obtener estado del cache
    obtenerEstadoCache() {
        const entradas = Array.from(this.cache.entries()).map(([key, value]) => ({
            clave: key,
            edad: Date.now() - value.timestamp,
            expira: value.timestamp + this.cacheTimeout - Date.now()
        }));

        return {
            entradas: entradas.length,
            detalles: entradas
        };
    }
}

// Gestor de actualizaciones automáticas
class LaLigaUpdater {
    constructor() {
        this.api = new LaLigaAPI();
        this.intervalos = new Map();
        this.actualizandose = false;
    }

    // Iniciar actualizaciones automáticas
    iniciarActualizacionAutomatica() {
        // Actualizar tabla cada 10 minutos
        this.intervalos.set('tabla', setInterval(() => {
            this.actualizarTabla();
        }, 10 * 60 * 1000));

        // Actualizar resultados cada 5 minutos
        this.intervalos.set('resultados', setInterval(() => {
            this.actualizarResultados();
        }, 5 * 60 * 1000));

        console.log('🔄 Actualizaciones automáticas iniciadas');
    }

    // Detener actualizaciones automáticas
    detenerActualizacionAutomatica() {
        this.intervalos.forEach((interval, key) => {
            clearInterval(interval);
            this.intervalos.delete(key);
        });
        
        console.log('⏹️ Actualizaciones automáticas detenidas');
    }

    // Actualizar tabla desde API
    async actualizarTabla() {
        if (this.actualizandose) return;
        
        try {
            this.actualizandose = true;
            this.mostrarIndicadorCarga('tabla');
            
            const datos = await this.api.obtenerTablaLiga();
            
            if (window.laLigaManager) {
                // Actualizar datos en el manager existente
                window.laLigaManager.equipos = datos.equipos;
                window.laLigaManager.cargarTabla();
            }
            
            this.ocultarIndicadorCarga('tabla');
            this.mostrarNotificacion('Tabla actualizada', 'success');
            
        } catch (error) {
            console.error('Error actualizando tabla:', error);
            this.mostrarNotificacion('Error al actualizar tabla', 'error');
        } finally {
            this.actualizandose = false;
        }
    }

    // Actualizar resultados desde API
    async actualizarResultados() {
        try {
            this.mostrarIndicadorCarga('resultados');
            
            const datos = await this.api.obtenerResultadosRecientes();
            
            if (window.laLigaManager) {
                window.laLigaManager.resultados = datos.resultados;
                window.laLigaManager.cargarResultados();
            }
            
            this.ocultarIndicadorCarga('resultados');
            
        } catch (error) {
            console.error('Error actualizando resultados:', error);
        }
    }

    // Mostrar indicador de carga
    mostrarIndicadorCarga(seccion) {
        const elemento = document.getElementById(`${seccion}-section`) || 
                        document.querySelector(`.${seccion}-section`);
        
        if (elemento) {
            const loader = document.createElement('div');
            loader.className = 'update-loader';
            loader.innerHTML = '🔄 Actualizando...';
            loader.style.cssText = `
                position: absolute;
                top: 10px;
                right: 10px;
                background: rgba(255, 204, 0, 0.9);
                color: #000;
                padding: 5px 10px;
                border-radius: 15px;
                font-size: 0.8rem;
                font-weight: bold;
                z-index: 100;
                animation: pulse 1s infinite;
            `;
            
            elemento.style.position = 'relative';
            elemento.appendChild(loader);
        }
    }

    // Ocultar indicador de carga
    ocultarIndicadorCarga(seccion) {
        const elemento = document.getElementById(`${seccion}-section`) || 
                        document.querySelector(`.${seccion}-section`);
        
        if (elemento) {
            const loader = elemento.querySelector('.update-loader');
            if (loader) loader.remove();
        }
    }

    // Mostrar notificación
    mostrarNotificacion(mensaje, tipo = 'info') {
        const notificacion = document.createElement('div');
        notificacion.className = `notificacion notificacion-${tipo}`;
        notificacion.textContent = mensaje;
        notificacion.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${tipo === 'success' ? '#4caf50' : tipo === 'error' ? '#f44336' : '#2196f3'};
            color: white;
            padding: 12px 20px;
            border-radius: 5px;
            font-weight: bold;
            z-index: 1000;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            animation: slideIn 0.3s ease-out;
        `;

        document.body.appendChild(notificacion);

        // Auto-remover después de 3 segundos
        setTimeout(() => {
            notificacion.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => notificacion.remove(), 300);
        }, 3000);

        // Agregar estilos de animación si no existen
        this.agregarEstilosNotificacion();
    }

    // Agregar estilos para notificaciones
    agregarEstilosNotificacion() {
        if (document.head.querySelector('style[data-notification-styles]')) return;

        const style = document.createElement('style');
        style.setAttribute('data-notification-styles', 'true');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.7; }
            }
        `;
        
        document.head.appendChild(style);
    }

    // Forzar actualización manual
    async actualizarTodo() {
        await Promise.all([
            this.actualizarTabla(),
            this.actualizarResultados()
        ]);
    }
}

// Inicializar API y updater
document.addEventListener('DOMContentLoaded', function() {
    // Crear instancias globales
    window.laLigaAPI = new LaLigaAPI();
    window.laLigaUpdater = new LaLigaUpdater();

    // Iniciar actualizaciones automáticas después de cargar la página
    setTimeout(() => {
        window.laLigaUpdater.iniciarActualizacionAutomatica();
    }, 5000);

    // Detener actualizaciones cuando se abandone la página
    window.addEventListener('beforeunload', () => {
        window.laLigaUpdater.detenerActualizacionAutomatica();
    });
});
