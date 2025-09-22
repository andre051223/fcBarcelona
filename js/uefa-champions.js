// UEFA Champions League 2025-26 - Sistema dinámico de clasificación
class UEFAChampionsManager {
    constructor() {
        this.teamsData = [
            {
                id: 1,
                name: "Ajax",
                logo: "https://img.uefa.com/imgml/TP/teams/logos/64x64/50143.png",
                stats: { pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 }
            },
            {
                id: 2,
                name: "Arsenal",
                logo: "https://img.uefa.com/imgml/TP/teams/logos/64x64/52280.png",
                stats: { pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 }
            },
            {
                id: 3,
                name: "Atalanta",
                logo: "https://img.uefa.com/imgml/TP/teams/logos/64x64/52816.png",
                stats: { pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 }
            },
            {
                id: 4,
                name: "Athletic Club",
                logo: "https://img.uefa.com/imgml/TP/teams/logos/64x64/50125.png",
                stats: { pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 }
            },
            {
                id: 5,
                name: "Atletico de Madrid",
                logo: "https://img.uefa.com/imgml/TP/teams/logos/64x64/50124.png",
                stats: { pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 }
            },
            {
                id: 6,
                name: "Borrussia Dortmund",
                logo: "https://img.uefa.com/imgml/TP/teams/logos/64x64/52758.png",
                stats: { pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 } 
            },
            {
                id: 7,
                name: "Barcelona",
                logo: "https://img.uefa.com/imgml/TP/teams/logos/64x64/50080.png",
                stats: { pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 },
            },
            {
                id: 8,
                name: "Bayern Munich",
                logo: "https://img.uefa.com/imgml/TP/teams/logos/64x64/50037.png",
                stats: { pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 }
            },
            {
                id: 9,
                name: "Benfica",
                logo: "https://img.uefa.com/imgml/TP/teams/logos/64x64/50147.png",
                stats: { pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 }
            },
            {
                id: 10,
                name: "Bodo Glimt",
                logo: "https://img.uefa.com/imgml/TP/teams/logos/64x64/59333.png",
                stats: { pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 }
            },
            {
                id: 11,
                name: "Chelsea",
                logo: "https://img.uefa.com/imgml/TP/teams/logos/64x64/52914.png",
                stats: { pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 }
            },
            {
                id: 12,
                name: "Club Brugge",
                logo: "https://img.uefa.com/imgml/TP/teams/logos/64x64/50043.png",
                stats: { pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 }
            },
            {
                id: 13,
                name: "Copenhague",
                logo: "https://img.uefa.com/imgml/TP/teams/logos/64x64/52709.png",
                stats: { pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 }
            },
            {
                id: 14,
                name: "Frankfurt",
                logo: "https://img.uefa.com/imgml/TP/teams/logos/64x64/50072.png",
                stats: { pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 }
            },
            {
                id: 15,
                name: "Galatasaray",
                logo: "https://img.uefa.com/imgml/TP/teams/logos/64x64/50067.png",
                stats: { pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 }
            },
            {
                id: 16,
                name: "Inter de Milán",
                logo: "https://img.uefa.com/imgml/TP/teams/logos/64x64/50138.png",
                stats: { pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 }
            },
            {
                id: 17,
                name: "Juventus",
                logo: "https://img.uefa.com/imgml/TP/teams/logos/64x64/50139.png",
                stats: { pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 }
            },
            {
                id: 18,
                name: "Kairat Almaty",
                logo: "https://img.uefa.com/imgml/TP/teams/logos/64x64/79970.png",
                stats: { pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 }
            },
            {
                id: 19,
                name: "Leverkusen",
                logo: "https://img.uefa.com/imgml/TP/teams/logos/64x64/50109.png",
                stats: { pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 }
            },
            {
                id: 20,
                name: "Liverpool",
                logo: "https://img.uefa.com/imgml/TP/teams/logos/64x64/7889.png",
                stats: { pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 }
            },
            {
                id: 21,
                name: "Manchester City",
                logo: "https://img.uefa.com/imgml/TP/teams/logos/64x64/52919.png",
                stats: { pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 }
            },
            {
                id: 22,
                name: "Marsella",
                logo: "https://img.uefa.com/imgml/TP/teams/logos/64x64/52748.png",
                stats: { pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 }
            },
            {
                id: 23,
                name: "Monaco",
                logo: "https://img.uefa.com/imgml/TP/teams/logos/64x64/50023.png",
                stats: { pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 }
            },
            {
                id: 24,
                name: "Napoli",
                logo: "https://img.uefa.com/imgml/TP/teams/logos/64x64/50136.png",
                stats: { pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 }
            },
            {
                id: 25,
                name: "Newcastle",
                logo: "https://img.uefa.com/imgml/TP/teams/logos/64x64/59324.png",
                stats: { pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 }
            },
            {
                id: 26,
                name: "Olympiacos",
                logo: "https://img.uefa.com/imgml/TP/teams/logos/64x64/2610.png",
                stats: { pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 }
            },
            {
                id: 27,
                name: "Pafos",
                logo: "https://img.uefa.com/imgml/TP/teams/logos/64x64/2609532.png",
                stats: { pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 }
            },
            {
                id: 28,
                name: "PSG",
                logo: "https://img.uefa.com/imgml/TP/teams/logos/64x64/52747.png",
                stats: { pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 }
            },
            {
                id: 29,
                name: "PSV Eindhoven",
                logo: "https://img.uefa.com/imgml/TP/teams/logos/64x64/50062.png",
                stats: { pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 }
            },
            {
                id: 30,
                name: "Qarabag",
                logo: "https://img.uefa.com/imgml/TP/teams/logos/64x64/60609.png",
                stats: { pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 }
            },
            {
                id: 31,
                name: "Real Madrid",
                logo: "https://img.uefa.com/imgml/TP/teams/logos/64x64/50051.png",
                stats: { pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 }
            },
            {
                id: 32,
                name: "Slavia Praha",
                logo: "https://img.uefa.com/imgml/TP/teams/logos/64x64/52498.png",
                stats: { pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 }
            },
            {
                id: 33,
                name: "Sporting CP",
                logo: "https://img.uefa.com/imgml/TP/teams/logos/64x64/50149.png",
                stats: { pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 }
            },
            {
                id: 34,
                name: "Tottenham",
                logo: "https://img.uefa.com/imgml/TP/teams/logos/64x64/1652.png",
                stats: { pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 }
            },
            {
                id: 35,
                name: "Union SG",
                logo: "https://img.uefa.com/imgml/TP/teams/logos/64x64/64125.png",
                stats: { pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 }
            },
            {
                id: 36,
                name: "Villarreal",
                logo: "https://img.uefa.com/imgml/TP/teams/logos/64x64/70691.png",
                stats: { pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 }
            }

        ];
    }

    // Calcular diferencia de goles
    calculateGoalDifference(team) {
        return team.stats.gf - team.stats.gc;
    }

    // Ordenar equipos según criterios UEFA
    sortTeams(teams) {
        return teams.sort((a, b) => {
            // 1. Puntos
            if (b.stats.pts !== a.stats.pts) return b.stats.pts - a.stats.pts;
            
            // 2. Diferencia de goles
            const diffA = this.calculateGoalDifference(a);
            const diffB = this.calculateGoalDifference(b);
            if (diffB !== diffA) return diffB - diffA;
            
            // 3. Goles a favor
            if (b.stats.gf !== a.stats.gf) return b.stats.gf - a.stats.gf;
            
            // 4. Victorias
            if (b.stats.g !== a.stats.g) return b.stats.g - a.stats.g;
            
            // 5. Por nombre (alfabético) como último criterio
            return a.name.localeCompare(b.name);
        });
    }

    // Obtener clase CSS según posición
    getPositionClass(position) {
        if (position <= 8) return 'direct-qualification';
        if (position <= 24) return 'playoff-qualification';
        return 'eliminated';
    }

    // Generar fila de la tabla
    generateTableRow(team, position) {
        const diffGoles = this.calculateGoalDifference(team);
        const positionClass = this.getPositionClass(position);
        const barcelonaClass = team.isBarcelona ? 'barcelona-row' : '';
        
        const logoHTML = team.logo 
            ? `<img src="${team.logo}" width="20" height="20" alt="${team.name} logo" loading="lazy">`
            : '';

        return `
            <tr class="${positionClass} ${barcelonaClass}" data-team-id="${team.id}">
                <td class="position">${position}</td>
                <td class="team-cell">
                    <div class="equipo-cell">
                        ${logoHTML}
                        <span class="team-name">${team.name}</span>
                    </div>
                </td>
                <td class="matches-played">${team.stats.pj}</td>
                <td class="wins">${team.stats.g}</td>
                <td class="draws">${team.stats.e}</td>
                <td class="losses">${team.stats.p}</td>
                <td class="goals-for">${team.stats.gf}</td>
                <td class="goals-against">${team.stats.gc}</td>
                <td class="goal-difference ${diffGoles > 0 ? 'positive' : diffGoles < 0 ? 'negative' : ''}">${diffGoles > 0 ? '+' : ''}${diffGoles}</td>
                <td class="points"><strong>${team.stats.pts}</strong></td>
            </tr>
        `;
    }

    // Renderizar tabla completa
    renderTable() {
        const tableBody = document.getElementById('tabla-champions-body');
        if (!tableBody) {
            console.error('No se encontró el elemento tabla-champions-body');
            return;
        }

        const sortedTeams = this.sortTeams([...this.teamsData]);
        
        const tableHTML = sortedTeams
            .map((team, index) => this.generateTableRow(team, index + 1))
            .join('');

        tableBody.innerHTML = tableHTML;
        
        // Actualizar estadísticas del Barcelona en hero
        this.updateBarcelonaStats();
    }

    // Actualizar estadísticas del Barcelona en la sección hero
    updateBarcelonaStats() {
        const barcelona = this.teamsData.find(team => team.isBarcelona);
        if (!barcelona) return;

        const position = this.sortTeams([...this.teamsData])
            .findIndex(team => team.isBarcelona) + 1;

        // Actualizar elementos del hero
        const updates = {
            'posicion-liga': position === 1 ? '1º' : `${position}º`,
            'partidos-jugados-ucl': barcelona.stats.pj,
            'partidos-ganados-ucl': barcelona.stats.g,
            'partidos-empatados-ucl': barcelona.stats.e,
            'partidos-perdidos-ucl': barcelona.stats.p,
            'puntos-champions': barcelona.stats.pts,
            // Para la sección de estadísticas
            'victorias-ucl': barcelona.stats.g,
            'empates-ucl': barcelona.stats.e,
            'derrotas-ucl': barcelona.stats.p,
            'gf-ucl': barcelona.stats.gf,
            'gc-ucl': barcelona.stats.gc,
            'dif-goles-ucl': this.calculateGoalDifference(barcelona)
        };

        Object.entries(updates).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            }
        });
    }

    // Actualizar estadísticas de un equipo
    updateTeamStats(teamId, newStats) {
        const team = this.teamsData.find(t => t.id === teamId);
        if (team) {
            Object.assign(team.stats, newStats);
            this.renderTable();
        }
    }

    // Simular resultados de una jornada (para testing)
    simulateMatchday() {
        this.teamsData.forEach(team => {
            // Simular partidos aleatorios
            if (Math.random() > 0.3 && team.stats.pj < 8) {
                const goalsFor = Math.floor(Math.random() * 4);
                const goalsAgainst = Math.floor(Math.random() * 3);
                
                team.stats.pj += 1;
                team.stats.gf += goalsFor;
                team.stats.gc += goalsAgainst;
                
                if (goalsFor > goalsAgainst) {
                    team.stats.g += 1;
                    team.stats.pts += 3;
                } else if (goalsFor === goalsAgainst) {
                    team.stats.e += 1;
                    team.stats.pts += 1;
                } else {
                    team.stats.p += 1;
                }
            }
        });
        
        this.renderTable();
    }

    // Resetear todos los datos
    resetTable() {
        this.teamsData.forEach(team => {
            team.stats = { pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 };
        });
        this.renderTable();
    }

    // Inicializar
    init() {
        // Esperar a que el DOM esté cargado
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.renderTable();
            });
        } else {
            this.renderTable();
        }
    }
}

// Instancia global
const uefaManager = new UEFAChampionsManager();

// Inicializar cuando se cargue el script
uefaManager.init();

// Funciones globales para el panel de administración (si se necesita)
window.updateTeam = (teamId, stats) => uefaManager.updateTeamStats(teamId, stats);
window.simulateMatchday = () => uefaManager.simulateMatchday();
window.resetTable = () => uefaManager.resetTable();
