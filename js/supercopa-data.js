/**
 * Supercopa de España Data Manager
 * Gestiona la visualización del formato de semifinales y final
 */

class SupercopaDataManager {
  constructor() {
    this.competition = 'supercopa';
    
    // Partidos de la Supercopa 2025 según las instrucciones
    this.supercopaMatches = [
      { round: 'semifinal', date: '07/01/2026', homeTeam: 'Real Madrid', awayTeam: 'Atlético de Madrid', location: 'Arabia Saudita', matchNumber: 1 },
      { round: 'semifinal', date: '08/01/2026', homeTeam: 'FC Barcelona', awayTeam: 'Athletic Club Bilbao', location: 'Arabia Saudita', matchNumber: 2 },
      { round: 'final', date: '12/01/2026', homeTeam: 'Ganador Semifinal 1', awayTeam: 'Ganador Semifinal 2', location: 'Arabia Saudita' }
    ];

    this.init();
  }

  /**
   * Inicializar el gestor
   */
  init() {
    if (typeof matchManager === 'undefined') {
      console.error('MatchManager no está disponible');
      return;
    }

    // Cargar partidos iniciales
    this.loadInitialMatches();

    // Renderizar datos
    this.renderBracket();
    this.renderStats();

    // Escuchar actualizaciones de datos
    window.addEventListener('barcelonaDataUpdated', (event) => {
      if (event.detail === 'supercopa' || event.detail === 'all') {
        this.renderBracket();
        this.renderStats();
      }
    });
  }

  /**
   * Cargar partidos iniciales
   */
  loadInitialMatches() {
    const existingMatches = matchManager.getMatches(this.competition);
    
    if (existingMatches.length === 0) {
      this.supercopaMatches.forEach(match => {
        matchManager.addMatch({
          competition: this.competition,
          ...match
        });
      });
    }
  }

  /**
   * Renderizar cuadro de la competición
   */
  renderBracket() {
    const matches = matchManager.getMatches(this.competition);
    
    // Obtener partidos
    const semifinals = matches.filter(m => m.round === 'semifinal').sort((a, b) => 
      (a.matchNumber || 0) - (b.matchNumber || 0)
    );
    const final = matches.find(m => m.round === 'final');

    // Renderizar semifinales
    if (semifinals.length > 0) {
      semifinals.forEach((match, index) => {
        const matchElement = document.getElementById(`semifinal-${index + 1}`);
        if (matchElement) {
          this.updateBracketMatch(matchElement, match);
        }
      });
    }

    // Renderizar final
    if (final) {
      const finalElement = document.getElementById('final');
      if (finalElement) {
        this.updateBracketMatch(finalElement, final, true);
      }
    }

    // Actualizar equipos en la final basado en ganadores de semifinales
    this.updateFinalTeams(semifinals);
  }

  /**
   * Actualizar elemento del cuadro
   */
  updateBracketMatch(element, match, isFinal = false) {
    const teams = element.querySelectorAll('.bracket-team');
    const dateLabel = element.querySelector('.match-date-label');

    if (!teams.length) return;

    // Actualizar fecha
    if (dateLabel && match.date) {
      dateLabel.textContent = this.formatDate(this.parseDate(match.date));
    }

    // Actualizar equipos y marcadores
    if (teams[0]) {
      const teamName = teams[0].querySelector('.team-name');
      const teamScore = teams[0].querySelector('.team-score');
      
      if (teamName) teamName.textContent = match.homeTeam;
      if (teamScore && match.played) {
        teamScore.textContent = match.homeScore;
      }
    }

    if (teams[1]) {
      const teamName = teams[1].querySelector('.team-name');
      const teamScore = teams[1].querySelector('.team-score');
      
      if (teamName) teamName.textContent = match.awayTeam;
      if (teamScore && match.played) {
        teamScore.textContent = match.awayScore;
      }
    }

    // Si es la final y está jugada, mostrar campeón
    if (isFinal && match.played) {
      this.showChampion(element, match);
    }
  }

  /**
   * Actualizar equipos en la final según ganadores de semifinales
   */
  updateFinalTeams(semifinals) {
    const finalElement = document.getElementById('final');
    if (!finalElement) return;

    const teams = finalElement.querySelectorAll('.bracket-team');
    if (!teams.length) return;

    // Verificar si hay ganadores de semifinales
    if (semifinals.length === 2) {
      const winner1 = this.getWinner(semifinals[0]);
      const winner2 = this.getWinner(semifinals[1]);

      if (winner1) {
        const teamName = teams[0].querySelector('.team-name');
        if (teamName) teamName.textContent = winner1;
      }

      if (winner2) {
        const teamName = teams[1].querySelector('.team-name');
        if (teamName) teamName.textContent = winner2;
      }
    }
  }

  /**
   * Obtener ganador de un partido
   */
  getWinner(match) {
    if (!match.played) return null;

    if (match.homeScore > match.awayScore) {
      return match.homeTeam;
    } else if (match.awayScore > match.homeScore) {
      return match.awayTeam;
    }

    return null;
  }

  /**
   * Mostrar campeón
   */
  showChampion(element, match) {
    const champion = this.getWinner(match);
    if (!champion) return;

    const crownElement = element.querySelector('.champion-crown');
    if (crownElement) {
      crownElement.style.display = 'block';
      
      // Agregar nombre del campeón
      const championName = document.createElement('div');
      championName.className = 'champion-name';
      championName.style.cssText = `
        font-family: var(--font-primary);
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--barca-gold);
        margin-top: var(--spacing-md);
      `;
      championName.textContent = champion;
      
      if (!crownElement.querySelector('.champion-name')) {
        crownElement.appendChild(championName);
      }
    }
  }

  /**
   * Renderizar estadísticas
   */
  renderStats() {
    const stats = matchManager.getBarcelonaStats(this.competition);
    const matches = matchManager.getMatches(this.competition);

    document.getElementById('stat-matches').textContent = stats.played || 0;
    document.getElementById('stat-wins').textContent = stats.wins || 0;
    document.getElementById('stat-losses').textContent = stats.losses || 0;
    document.getElementById('stat-goals-for').textContent = stats.goalsFor || 0;
    document.getElementById('stat-goals-against').textContent = stats.goalsAgainst || 0;
    
    const goalDiff = (stats.goalsFor || 0) - (stats.goalsAgainst || 0);
    document.getElementById('stat-goal-diff').textContent = goalDiff > 0 ? `+${goalDiff}` : goalDiff;

    // Ronda actual
    const currentRound = this.getCurrentRound(matches);
    document.getElementById('stat-round').textContent = currentRound;

    // Campeón
    const champion = this.getChampion(matches);
    document.getElementById('stat-champion').textContent = champion || '-';
  }

  /**
   * Obtener ronda actual del Barcelona
   */
  getCurrentRound(matches) {
    const barcaMatches = matches.filter(m => 
      m.homeTeam === 'FC Barcelona' || m.awayTeam === 'FC Barcelona'
    );

    if (barcaMatches.length === 0) return 'Semifinal';

    // Buscar partido en final
    const finalMatch = barcaMatches.find(m => m.round === 'final');
    if (finalMatch) {
      return finalMatch.played ? 'Finalizado' : 'Final';
    }

    // Buscar partido en semifinal
    const semifinalMatch = barcaMatches.find(m => m.round === 'semifinal');
    if (semifinalMatch) {
      if (semifinalMatch.played) {
        const winner = this.getWinner(semifinalMatch);
        return winner === 'FC Barcelona' ? 'Clasificado a Final' : 'Eliminado';
      }
      return 'Semifinal';
    }

    return 'Semifinal';
  }

  /**
   * Obtener campeón del torneo
   */
  getChampion(matches) {
    const finalMatch = matches.find(m => m.round === 'final');
    
    if (!finalMatch || !finalMatch.played) {
      return null;
    }

    const winner = this.getWinner(finalMatch);
    
    if (winner === 'FC Barcelona') {
      return 'FC Barcelona';
    } else if (winner) {
      return winner;
    }

    return null;
  }

  /**
   * Parsear fecha
   */
  parseDate(dateStr) {
    if (!dateStr) return new Date();
    const [day, month, year] = dateStr.split('/');
    return new Date(year, month - 1, day);
  }

  /**
   * Formatear fecha
   */
  formatDate(date) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
  }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new SupercopaDataManager();
  });
} else {
  new SupercopaDataManager();
}
