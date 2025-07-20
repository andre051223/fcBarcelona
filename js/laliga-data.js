// Datos de La Liga 2025-26
class LaLigaDataManager {
    constructor() {
        this.temporada = '2025-26';
        this.equipos = this.inicializarEquipos();
        this.resultados = this.generarResultados();
        this.proximosPartidos = this.generarProximosPartidos();
        this.estadisticasBarcelona = this.obtenerEstadisticasBarcelona();
    }

    inicializarEquipos() {
        return [
            {
                id: 1,
                nombre: 'FC Barcelona',
                escudo: 'https://assets.laliga.com/assets/2019/06/07/small/barcelona.png',
                puntos: 0,
                partidos: 0,
                victorias: 0,
                empates: 0,
                derrotas: 0,
                golesFavor: 0,
                golesContra: 0,
                diferencia: 0
            },
            {
                id: 2,
                nombre: 'Real Madrid',
                escudo: 'https://assets.laliga.com/assets/2019/06/07/small/real-madrid.png',
                puntos: 0,
                partidos: 0,
                victorias: 0,
                empates: 0,
                derrotas: 0,
                golesFavor: 0,
                golesContra: 0,
                diferencia: 0
            },
            {
                id: 3,
                nombre: 'Atlético Madrid',
                escudo: 'https://assets.laliga.com/assets/2024/06/17/small/cbc5c8cc8c3e8abd0e175c00ee53b723.png',
                puntos: 0,
                partidos: 0,
                victorias: 0,
                empates: 0,
                derrotas: 0,
                golesFavor: 0,
                golesContra: 0,
                diferencia: 0
            },
            {
                id: 4,
                nombre: 'Real Sociedad',
                escudo: 'https://assets.laliga.com/assets/2019/06/07/small/real-sociedad.png',
                puntos: 0,
                partidos: 0,
                victorias: 0,
                empates: 0,
                derrotas: 0,
                golesFavor: 0,
                golesContra: 0,
                diferencia: 0
            },
            {
                id: 5,
                nombre: 'Real Betis',
                escudo: 'https://assets.laliga.com/assets/2022/09/15/small/e4a09419d3bd115b8f3dab73d480e146.png',
                puntos: 0,
                partidos: 0,
                victorias: 0,
                empates: 0,
                derrotas: 0,
                golesFavor: 0,
                golesContra: 0,
                diferencia: 0
            },
            {
                id: 6,
                nombre: 'Valencia CF',
                escudo: 'https://assets.laliga.com/assets/2019/06/07/small/valencia.png',
                puntos: 0,
                partidos: 0,
                victorias: 0,
                empates: 0,
                derrotas: 0,
                golesFavor: 0,
                golesContra: 0,
                diferencia: 0
            },
            {
                id: 7,
                nombre: 'Athletic Bilbao',
                escudo: 'https://assets.laliga.com/assets/2019/06/07/small/athletic.png',
                puntos: 0,
                partidos: 0,
                victorias: 0,
                empates: 0,
                derrotas: 0,
                golesFavor: 0,
                golesContra: 0,
                diferencia: 0
            },
            {
                id: 8,
                nombre: 'Sevilla FC',
                escudo: 'https://assets.laliga.com/assets/2019/06/07/small/sevilla.png',
                puntos: 0,
                partidos: 0,
                victorias: 0,
                empates: 0,
                derrotas: 0,
                golesFavor: 0,
                golesContra: 0,
                diferencia: 0
            },
            {
                id: 9,
                nombre: 'Villarreal CF',
                escudo: 'https://assets.laliga.com/assets/2019/06/07/small/villarreal.png',
                puntos: 0,
                partidos: 0,
                victorias: 0,
                empates: 0,
                derrotas: 0,
                golesFavor: 0,
                golesContra: 0,
                diferencia: 0
            },
            {
                id: 10,
                nombre: 'Girona FC',
                escudo: 'https://assets.laliga.com/assets/2022/06/22/small/8f43addbb29e4a72f5e90b6edfe4728f.png',
                puntos: 0,
                partidos: 0,
                victorias: 0,
                empates: 0,
                derrotas: 0,
                golesFavor: 0,
                golesContra: 0,
                diferencia: 0
            },
            {
                id: 11,
                nombre: 'CA Osasuna',
                escudo: 'https://assets.laliga.com/assets/2019/06/07/small/osasuna.png',
                puntos: 0,
                partidos: 0,
                victorias: 0,
                empates: 0,
                derrotas: 0,
                golesFavor: 0,
                golesContra: 0,
                diferencia: 0
            },
            {
                id: 12,
                nombre: 'Celta de Vigo',
                escudo: 'https://assets.laliga.com/assets/2025/07/11/small/0a796827f9e758d7d750db805adde7c5.png',
                puntos: 0,
                partidos: 0,
                victorias: 0,
                empates: 0,
                derrotas: 0,
                golesFavor: 0,
                golesContra: 0,
                diferencia: 0
            },
            {
                id: 13,
                nombre: 'Rayo Vallecano',
                escudo: 'https://assets.laliga.com/assets/2023/04/27/small/57d9950a8745ead226c04d37235c0786.png',
                puntos: 0,
                partidos: 0,
                victorias: 0,
                empates: 0,
                derrotas: 0,
                golesFavor: 0,
                golesContra: 0,
                diferencia: 0
            },
            {
                id: 14,
                nombre: 'Elche CF',
                escudo: 'https://assets.laliga.com/assets/2019/06/07/small/elche.png',
                puntos: 0,
                partidos: 0,
                victorias: 0,
                empates: 0,
                derrotas: 0,
                golesFavor: 0,
                golesContra: 0,
                diferencia: 0
            },
            {
                id: 15,
                nombre: 'Getafe CF',
                escudo: 'https://assets.laliga.com/assets/2023/05/12/small/dc59645c96bc2c9010341c16dd6d4bfa.png',
                puntos: 0,
                partidos: 0,
                victorias: 0,
                empates: 0,
                derrotas: 0,
                golesFavor: 0,
                golesContra: 0,
                diferencia: 0
            },
            {
                id: 16,
                nombre: 'Deportivo Alavés',
                escudo: 'https://assets.laliga.com/assets/2020/09/01/small/27002754a98bf535807fe49a24cc63ea.png',
                puntos: 0,
                partidos: 0,
                victorias: 0,
                empates: 0,
                derrotas: 0,
                golesFavor: 0,
                golesContra: 0,
                diferencia: 0
            },
            {
                id: 17,
                nombre: 'RCD Espanyol',
                escudo: 'https://assets.laliga.com/assets/2025/07/02/small/e9177f6edd72c6360602adbca85e442f.png',
                puntos: 0,
                partidos: 0,
                victorias: 0,
                empates: 0,
                derrotas: 0,
                golesFavor: 0,
                golesContra: 0,
                diferencia: 0
            },
            {
                id: 18,
                nombre: 'Real Oviedo',
                escudo: 'https://assets.laliga.com/assets/2019/06/07/small/oviedo.png',
                puntos: 0,
                partidos: 0,
                victorias: 0,
                empates: 0,
                derrotas: 0,
                golesFavor: 0,
                golesContra: 0,
                diferencia: 0
            },
            {
                id: 19,
                nombre: 'Levante UD',
                escudo: 'https://assets.laliga.com/assets/2019/06/07/small/levante.png',
                puntos: 0,
                partidos: 0,
                victorias: 0,
                empates: 0,
                derrotas: 0,
                golesFavor: 0,
                golesContra: 0,
                diferencia: 0
            },
            {
                id: 20,
                nombre: 'RCD Mallorca',
                escudo: 'https://assets.laliga.com/assets/2023/03/22/small/013ae97735bc8e519dcf30f6826168ca.png',
                puntos: 0,
                partidos: 0,
                victorias: 0,
                empates: 0,
                derrotas: 0,
                golesFavor: 0,
                golesContra: 0,
                diferencia: 0
            }
        ];
    }

    generarResultados() {
        // No hay partidos de pre-temporada mostrados en esta sección
        // Solo se muestran partidos oficiales de La Liga 2025-26
        return [];
    }

    generarProximosPartidos() {
        return [
            { jornada: 1, fecha: '2025-08-16', hora: '', local: 'RCD Mallorca', visitante: 'FC Barcelona' },

            { jornada: 2, fecha: '2025-08-23', hora: '', local: 'Levante UD', visitante: 'FC Barcelona' },

            { jornada: 3, fecha: '2025-08-31', hora: '', local: 'Rayo Vallecano', visitante: 'FC Barcelona' },

            { jornada: 4, fecha: '2025-09-14', hora: '', local: 'FC Barcelona', visitante: 'Valencia CF' },

            { jornada: 5, fecha: '2025-09-21', hora: '', local: 'FC Barcelona', visitante: 'Getafe CF' },

            { jornada: 6, fecha: '2025-09-24', hora: '', local: 'Real Oviedo', visitante: 'FC Barcelona' },

            { jornada: 7, fecha: '2025-09-28', hora: '', local: 'FC Barcelona', visitante: 'Real Sociedad' },

            { jornada: 8, fecha: '2025-10-05', hora: '', local: 'Sevilla FC', visitante: 'FC Barcelona' },

            { jornada: 9, fecha: '2025-10-19', hora: '', local: 'FC Barcelona', visitante: 'Girona FC' },
            
            { jornada: 10, fecha: '2025-10-26', hora: '', local: 'Real Madrid', visitante: 'FC Barcelona' },

            { jornada: 11, fecha: '2025-11-02', hora: '', local: 'FC Barcelona', visitante: 'Elche CF' },

            { jornada: 12, fecha: '2025-11-09', hora: '', local: 'Celta de Vigo', visitante: 'FC Barcelona' },

            { jornada: 13, fecha: '2025-11-23', hora: '', local: 'FC Barcelona', visitante: 'Athletic Bilbao' },

            { jornada: 14, fecha: '2025-11-30', hora: '', local: 'FC Barcelona', visitante: 'Deportivo Alavés' },

            { jornada: 15, fecha: '2025-12-07', hora: '', local: 'Real Betis', visitante: 'FC Barcelona' },

            { jornada: 16, fecha: '2025-12-14', hora: '', local: 'FC Barcelona', visitante: 'CA Osasuna' },

            { jornada: 17, fecha: '2025-12-21', hora: '', local: 'Villarreal CF', visitante: 'FC Barcelona' },

            { jornada: 18, fecha: '2026-01-04', hora: '', local: 'RCD Espanyol', visitante: 'FC Barcelona' },

            { jornada: 19, fecha: '2026-01-11', hora: '', local: 'FC Barcelona', visitante: 'Atlético Madrid' },

            { jornada: 20, fecha: '2026-01-18', hora: '', local: 'Real Sociedad', visitante: 'FC Barcelona' },

            { jornada: 21, fecha: '2026-01-25', hora: '', local: 'FC Barcelona', visitante: 'Real Oviedo' },

            { jornada: 22, fecha: '2026-02-01', hora: '', local: 'Elche CF', visitante: 'FC Barcelona' },

            { jornada: 23, fecha: '2026-02-08', hora: '', local: 'FC Barcelona', visitante: 'RCD Mallorca' },

            { jornada: 24, fecha: '2026-02-15', hora: '', local: 'Girona FC', visitante: 'FC Barcelona' },

            { jornada: 25, fecha: '2026-02-22', hora: '', local: 'FC Barcelona', visitante: 'Levante UD' },

            { jornada: 26, fecha: '2026-03-01', hora: '', local: 'FC Barcelona', visitante: 'Villarreal CF' },

            { jornada: 27, fecha: '2026-03-08', hora: '', local: 'Athletic Bilbao', visitante: 'FC Barcelona' },

            { jornada: 28, fecha: '2026-03-15', hora: '', local: 'FC Barcelona', visitante: 'Sevilla FC' },

            { jornada: 29, fecha: '2026-03-22', hora: '', local: 'FC Barcelona', visitante: 'Rayo Vallecano' },

            { jornada: 30, fecha: '2026-04-05', hora: '', local: 'Atlético Madrid', visitante: 'FC Barcelona' },

            { jornada: 31, fecha: '2026-04-12', hora: '', local: 'FC Barcelona', visitante: 'RCD Espanyol' },

            { jornada: 32, fecha: '2026-04-19', hora: '', local: 'Getafe CF', visitante: 'FC Barcelona' },

            { jornada: 33, fecha: '2026-04-22', hora: '', local: 'FC Barcelona', visitante: 'Celta de Vigo' },

            { jornada: 34, fecha: '2026-05-03', hora: '', local: 'CA Osasuna', visitante: 'FC Barcelona' },

            { jornada: 35, fecha: '2026-05-10', hora: '', local: 'FC Barcelona', visitante: 'Real Madrid' },

            { jornada: 36, fecha: '2026-05-13', hora: '', local: 'Deportivo Alavés', visitante: 'FC Barcelona' },

            { jornada: 37, fecha: '2026-05-17', hora: '', local: 'FC Barcelona', visitante: 'Real Betis' },

            { jornada: 38, fecha: '2026-05-24', hora: '', local: 'Valencia CF', visitante: 'FC Barcelona' }
        ];
    }

    obtenerEstadisticasBarcelona() {
        return {
            golesPorPartido: '0.0',
            disparosPorPartido: '0.0',
            precisionPases: '0',
            golesContra: 0,
            porteriasACero: 0,
            recuperaciones: 0,
            tarjetasAmarillas: 0,
            tarjetasRojas: 0,
            faltasCometidas: 0,
            posesion: '0.0',
            duelos: '0.0',
            centros: 0,
            corners: 0
        };
    }

    obtenerEquipoPorNombre(nombre) {
        return this.equipos.find(equipo => equipo.nombre === nombre);
    }

    obtenerBarcelona() {
        return this.equipos.find(equipo => equipo.nombre === 'FC Barcelona');
    }

    obtenerTablaCompleta() {
        // Al inicio de temporada, orden alfabético por defecto
        return [...this.equipos].sort((a, b) => a.nombre.localeCompare(b.nombre));
    }

    // Métodos para cargar datos en el DOM
    cargarTabla() {
        const tablaBody = document.getElementById('tabla-body');
        if (!tablaBody) return;

        const tabla = this.obtenerTablaCompleta();
        
        tablaBody.innerHTML = tabla.map((equipo, index) => {
            const posicion = index + 1;
            let claseEquipo = '';
            
            // Asignar clases según posición
            if (posicion <= 4) claseEquipo = 'champions';
            else if (posicion <= 6) claseEquipo = 'europa-league';
            else if (posicion >= 18) claseEquipo = 'descenso';
            
            // Destacar Barcelona
            if (equipo.nombre === 'FC Barcelona') claseEquipo += ' barcelona';
            
            return `
                <tr class="${claseEquipo}">
                    <td>${posicion}</td>
                    <td class="equipo">
                        <img src="${equipo.escudo}" alt="${equipo.nombre}" onerror="this.style.display='none'">
                        ${equipo.nombre}
                    </td>
                    <td>${equipo.partidos}</td>
                    <td>${equipo.victorias}</td>
                    <td>${equipo.empates}</td>
                    <td>${equipo.derrotas}</td>
                    <td>${equipo.golesFavor}</td>
                    <td>${equipo.golesContra}</td>
                    <td>${equipo.diferencia > 0 ? '+' : ''}${equipo.diferencia}</td>
                    <td><strong>${equipo.puntos}</strong></td>
                </tr>
            `;
        }).join('');
    }

    cargarResultados() {
        const resultadosGrid = document.getElementById('resultados-grid');
        if (!resultadosGrid) return;

        if (this.resultados.length === 0) {
            resultadosGrid.innerHTML = `
                <div class="no-resultados">
                    <div class="no-resultados-icon">⚽</div>
                    <h3>Temporada no iniciada</h3>
                    <p>Los partidos oficiales de La Liga 2025-26 comenzarán el 18 de agosto de 2025.</p>
                    <div class="temporada-info">
                        <span>🗓️ Inicio: 18 de agosto de 2025</span>
                        <span>🏆 38 jornadas por delante</span>
                    </div>
                </div>
            `;
            return;
        }

        resultadosGrid.innerHTML = this.resultados.map(partido => {
            const fecha = new Date(partido.fecha).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long'
            });

            const claseResultado = `resultado-${partido.resultado}`;
            
            return `
                <div class="resultado-card ${claseResultado}">
                    <div class="resultado-header">
                        <span class="fecha">${fecha}</span>
                        <span class="jornada">Jornada ${partido.jornada}</span>
                    </div>
                    <div class="resultado-partido">
                        <div class="equipo-info">
                            <img src="${this.obtenerEscudoPorNombre(partido.local)}" alt="${partido.local}" onerror="this.style.display='none'">
                            <span class="equipo-nombre">${partido.local}</span>
                        </div>
                        <div class="marcador">
                            ${partido.golesLocal} - ${partido.golesVisitante}
                        </div>
                        <div class="equipo-info">
                            <span class="equipo-nombre">${partido.visitante}</span>
                            <img src="${this.obtenerEscudoPorNombre(partido.visitante)}" alt="${partido.visitante}" onerror="this.style.display='none'">
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    cargarProximosPartidos() {
        const proximosGrid = document.getElementById('proximos-grid');
        if (!proximosGrid) return;

        proximosGrid.innerHTML = this.proximosPartidos.map(partido => {
            // Manejar fecha vacía
            let fechaTexto = 'Fecha por confirmar';
            if (partido.fecha) {
                // Crear fecha en zona horaria local para evitar problemas de UTC
                const fechaParts = partido.fecha.split('-');
                const fecha = new Date(fechaParts[0], fechaParts[1] - 1, fechaParts[2]);
                
                fechaTexto = fecha.toLocaleDateString('es-ES', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long'
                });
            }

            return `
                <div class="proximo-card">
                    <div class="jornada-numero">Jornada ${partido.jornada}</div>
                    <div class="partido-fecha">${fechaTexto}</div>
                    <div class="partido-hora">${partido.hora || 'Hora por confirmar'}</div>
                    <div class="vs-equipos">
                        <div class="vs-equipo">
                            <img src="${this.obtenerEscudoPorNombre(partido.local)}" alt="${partido.local}" onerror="this.style.display='none'" style="${partido.local ? '' : 'display:none'}">
                            <div>${partido.local || 'Rival por confirmar'}</div>
                        </div>
                        <div class="vs-vs">VS</div>
                        <div class="vs-equipo">
                            <img src="${this.obtenerEscudoPorNombre(partido.visitante)}" alt="${partido.visitante}" onerror="this.style.display='none'" style="${partido.visitante ? '' : 'display:none'}">
                            <div>${partido.visitante || 'Rival por confirmar'}</div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    obtenerEscudoPorNombre(nombre) {
        const equipo = this.obtenerEquipoPorNombre(nombre);
        return equipo ? equipo.escudo : 'https://via.placeholder.com/30x30?text=?';
    }

    actualizarEstadisticasHero() {
        const barcelona = this.obtenerBarcelona();
        if (!barcelona) return;

        // Al inicio de temporada, todos los equipos están empatados en posición
        const posicion = '1º*'; // Asterisco indica empate inicial
        
        // Actualizar elementos del hero con datos de temporada oficial
        this.actualizarElemento('posicion-actual', posicion);
        this.actualizarElemento('puntos-totales', barcelona.puntos);
        this.actualizarElemento('partidos-jugados', barcelona.partidos);
        this.actualizarElemento('partidos-ganados', barcelona.victorias);
        this.actualizarElemento('partidos-empatados', barcelona.empates);
        this.actualizarElemento('partidos-perdidos', barcelona.derrotas);
        this.actualizarElemento('goles-favor', barcelona.golesFavor);
        
        // Agregar nota explicativa si existe el elemento
        const notaElement = document.getElementById('nota-temporada');
        if (notaElement) {
            notaElement.textContent = '*Temporada 2025-26 no iniciada oficialmente';
        }
    }

    cargarEstadisticasDetalladas() {
        const stats = this.estadisticasBarcelona;
        
        // Actualizar estadísticas de ataque
        this.actualizarElemento('goles-por-partido', stats.golesPorPartido);
        this.actualizarElemento('disparos-partido', stats.disparosPorPartido);
        this.actualizarElemento('precision-pases', `${stats.precisionPases}%`);
        
        // Actualizar estadísticas de defensa
        this.actualizarElemento('goles-contra', stats.golesContra);
        this.actualizarElemento('porterias-cero', stats.porteriasACero);
        this.actualizarElemento('recuperaciones', stats.recuperaciones);
        
        // Actualizar estadísticas de disciplina
        this.actualizarElemento('tarjetas-amarillas', stats.tarjetasAmarillas);
        this.actualizarElemento('tarjetas-rojas', stats.tarjetasRojas);
        this.actualizarElemento('faltas-cometidas', stats.faltasCometidas);
    }

    actualizarElemento(id, valor) {
        const elemento = document.getElementById(id);
        if (elemento) {
            elemento.textContent = valor;
        }
    }

    // Inicializar todos los datos
    inicializar() {
        this.cargarTabla();
        this.cargarResultados();
        this.cargarProximosPartidos();
        this.actualizarEstadisticasHero();
        this.cargarEstadisticasDetalladas();
        this.iniciarCountdown();
    }

    // Countdown hasta el primer partido oficial
    iniciarCountdown() {
        const primerPartido = new Date('2025-08-16T21:00:00'); // RCD Mallorca vs FC Barcelona
        
        const actualizarCountdown = () => {
            const ahora = new Date();
            const diferencia = primerPartido - ahora;
            
            if (diferencia > 0) {
                const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
                const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
                const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
                
                this.actualizarElemento('days', dias.toString().padStart(2, '0'));
                this.actualizarElemento('hours', horas.toString().padStart(2, '0'));
                this.actualizarElemento('minutes', minutos.toString().padStart(2, '0'));
                this.actualizarElemento('seconds', segundos.toString().padStart(2, '0'));
            } else {
                // La temporada ya comenzó
                const countdownContainer = document.querySelector('.countdown-container');
                if (countdownContainer) {
                    countdownContainer.innerHTML = '<h4>🏆 ¡La temporada 2025-26 ya comenzó!</h4>';
                }
            }
        };
        
        // Actualizar inmediatamente y luego cada segundo
        actualizarCountdown();
        setInterval(actualizarCountdown, 1000);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    const laLigaManager = new LaLigaDataManager();
    laLigaManager.inicializar();
    
    // Hacer disponible globalmente para otros scripts
    window.laLigaManager = laLigaManager;
});
