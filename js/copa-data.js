/**
 * Copa del Rey Data Manager
 * Gestiona la visualización de datos específicos de Copa del Rey
 */

class CopaDataManager {
  constructor() {
    this.competition = 'copa';
    this.currentRound = 'all';
    
    // Estructura de rondas de la Copa del Rey
    this.rounds = {
      primera: '1ª Ronda',
      segunda: '2ª Ronda',
      tercera: '3ª Ronda',
      octavos: 'Octavos de Final',
      cuartos: 'Cuartos de Final',
      semifinales: 'Semifinales',
      final: 'Final'
    };

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

    // Renderizar datos iniciales
    this.renderBracket();
    this.renderStats();

    // Configurar event listeners
    this.setupEventListeners();

    // Escuchar actualizaciones de datos
    window.addEventListener('barcelonaDataUpdated', (event) => {
      if (event.detail === 'copa' || event.detail === 'all') {
        this.renderBracket();
        this.renderStats();
      }
    });
  }

  /**
   * Renderizar cuadro de eliminatorias
   */
  renderBracket() {
    const matches = matchManager.getMatches(this.competition);
    const container = document.getElementById('bracket-container');
    const noMatchesMsg = document.querySelector('.no-matches-message');

    if (!container) return;

    container.innerHTML = '';

    if (matches.length === 0) {
      container.style.display = 'none';
      if (noMatchesMsg) noMatchesMsg.style.display = 'block';
      return;
    }

    container.style.display = 'grid';
    if (noMatchesMsg) noMatchesMsg.style.display = 'none';

    // Agrupar partidos por ronda
    const matchesByRound = this.groupMatchesByRound(matches);

    // Filtrar por ronda seleccionada
    const roundsToShow = this.currentRound === 'all' 
      ? Object.keys(this.rounds)
      : [this.currentRound];

    roundsToShow.forEach(roundKey => {
      if (matchesByRound[roundKey] && matchesByRound[roundKey].length > 0) {
        const roundGroup = this.createRoundGroup(roundKey, matchesByRound[roundKey]);
        container.appendChild(roundGroup);
      }
    });
  }

  /**
   * Agrupar partidos por ronda
   */
  groupMatchesByRound(matches) {
    const grouped = {};

    Object.keys(this.rounds).forEach(key => {
      grouped[key] = [];
    });

    matches.forEach(match => {
      const roundKey = match.round || 'primera';
      if (grouped[roundKey]) {
        grouped[roundKey].push(match);
      }
    });

    return grouped;
  }

  /**
   * Crear grupo de ronda
   */
  createRoundGroup(roundKey, matches) {
    const group = document.createElement('div');
    group.className = 'round-group';

    group.innerHTML = `
      <div class="round-header">
        <h3 class="round-name">${this.rounds[roundKey]}</h3>
      </div>
      <div class="round-matches" id="round-matches-${roundKey}"></div>
    `;

    const matchesContainer = group.querySelector(`#round-matches-${roundKey}`);

    // Agrupar eliminatorias (ida y vuelta)
    const ties = this.groupTies(matches);

    ties.forEach(tie => {
      const tieCard = this.createTieCard(tie, roundKey);
      matchesContainer.appendChild(tieCard);
    });

    return group;
  }

  /**
   * Agrupar partidos en eliminatorias (ida y vuelta)
   */
  groupTies(matches) {
    const ties = [];
    const processed = new Set();

    matches.forEach((match, index) => {
      if (processed.has(index)) return;

      // Buscar partido de vuelta
      const returnMatch = matches.find((m, i) => 
        i !== index &&
        !processed.has(i) &&
        ((m.homeTeam === match.awayTeam && m.awayTeam === match.homeTeam) ||
         (m.homeTeam === match.homeTeam && m.awayTeam === match.awayTeam))
      );

      const tie = {
        firstLeg: match,
        secondLeg: returnMatch || null,
        teams: [match.homeTeam, match.awayTeam]
      };

      ties.push(tie);
      processed.add(index);

      if (returnMatch) {
        const returnIndex = matches.indexOf(returnMatch);
        processed.add(returnIndex);
      }
    });

    return ties;
  }

  /**
   * Crear tarjeta de eliminatoria
   */
  createTieCard(tie, roundKey) {
    const card = document.createElement('div');
    const isBarcaTie = tie.teams.includes('FC Barcelona');
    card.className = `tie-card ${isBarcaTie ? 'barcelona-tie' : ''}`;

    const tieLabel = roundKey === 'final' ? 'Partido Único' : 'Eliminatoria';

    let matchesHTML = '';
    let aggregateHTML = '';
    let winnerHTML = '';

    // Partido de ida
    if (tie.firstLeg) {
      const firstLegScore = tie.firstLeg.played 
        ? `<span>${tie.firstLeg.homeScore}</span><span>-</span><span>${tie.firstLeg.awayScore}</span>`
        : '<span>-</span><span>:</span><span>-</span>';

      matchesHTML += `
        <div class="tie-match">
          <div class="tie-match-info">
            <div class="tie-team home">
              <span class="tie-team-name">${tie.firstLeg.homeTeam}</span>
            </div>
            <div class="tie-score">${firstLegScore}</div>
            <div class="tie-team away">
              <span class="tie-team-name">${tie.firstLeg.awayTeam}</span>
            </div>
          </div>
        </div>
        ${tie.firstLeg.date ? `<div class="tie-date">Ida: ${this.formatDate(tie.firstLeg.date)}</div>` : ''}
      `;
    }

    // Partido de vuelta (si no es final)
    if (roundKey !== 'final' && tie.secondLeg) {
      const secondLegScore = tie.secondLeg.played 
        ? `<span>${tie.secondLeg.homeScore}</span><span>-</span><span>${tie.secondLeg.awayScore}</span>`
        : '<span>-</span><span>:</span><span>-</span>';

      matchesHTML += `
        <div class="tie-match">
          <div class="tie-match-info">
            <div class="tie-team home">
              <span class="tie-team-name">${tie.secondLeg.homeTeam}</span>
            </div>
            <div class="tie-score">${secondLegScore}</div>
            <div class="tie-team away">
              <span class="tie-team-name">${tie.secondLeg.awayTeam}</span>
            </div>
          </div>
        </div>
        ${tie.secondLeg.date ? `<div class="tie-date">Vuelta: ${this.formatDate(tie.secondLeg.date)}</div>` : ''}
      `;

      // Calcular agregado si ambos partidos están jugados
      if (tie.firstLeg.played && tie.secondLeg.played) {
        const aggregate = this.calculateAggregate(tie);
        aggregateHTML = `
          <div class="tie-aggregate">
            <div class="aggregate-label">Resultado Global</div>
            <div class="aggregate-score">${aggregate.home} - ${aggregate.away}</div>
          </div>
        `;

        // Determinar ganador
        const winner = this.determineWinner(tie, aggregate);
        if (winner) {
          winnerHTML = `
            <div class="tie-winner">
              <div class="winner-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Clasifica: ${winner}
              </div>
            </div>
          `;
        }
      }
    } else if (roundKey === 'final' && tie.firstLeg.played) {
      // Para la final, solo determinar ganador
      const winner = tie.firstLeg.homeScore > tie.firstLeg.awayScore 
        ? tie.firstLeg.homeTeam 
        : tie.firstLeg.awayTeam;
      
      winnerHTML = `
        <div class="tie-winner">
          <div class="winner-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
              <path d="M4 22h16"/>
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/>
            </svg>
            Campeón: ${winner}
          </div>
        </div>
      `;
    }

    card.innerHTML = `
      <div class="tie-header">${tieLabel}</div>
      <div class="tie-matches">
        ${matchesHTML}
      </div>
      ${aggregateHTML}
      ${winnerHTML}
    `;

    return card;
  }

  /**
   * Calcular resultado agregado
   */
  calculateAggregate(tie) {
    const homeTeam = tie.firstLeg.homeTeam;
    
    // Goles del equipo local en la ida
    const homeFirstLeg = tie.firstLeg.homeScore;
    // Goles del equipo local en la vuelta (cuando juega de visitante)
    const homeSecondLeg = tie.secondLeg.homeTeam === homeTeam 
      ? tie.secondLeg.homeScore 
      : tie.secondLeg.awayScore;
    
    // Goles del equipo visitante en la ida
    const awayFirstLeg = tie.firstLeg.awayScore;
    // Goles del equipo visitante en la vuelta (cuando juega de local)
    const awaySecondLeg = tie.secondLeg.homeTeam === homeTeam 
      ? tie.secondLeg.awayScore 
      : tie.secondLeg.homeScore;

    return {
      home: homeFirstLeg + homeSecondLeg,
      away: awayFirstLeg + awaySecondLeg
    };
  }

  /**
   * Determinar ganador de la eliminatoria
   */
  determineWinner(tie, aggregate) {
    if (aggregate.home > aggregate.away) {
      return tie.firstLeg.homeTeam;
    } else if (aggregate.away > aggregate.home) {
      return tie.firstLeg.awayTeam;
    }
    
    // En caso de empate, considerar goles de visitante
    // (simplificado, en la realidad habría prórroga y penaltis)
    return null;
  }

  /**
   * Renderizar estadísticas
   */
  renderStats() {
    const stats = matchManager.getBarcelonaStats(this.competition);
    const matches = matchManager.getMatches(this.competition);

    document.getElementById('stat-matches').textContent = stats.played || 0;
    document.getElementById('stat-wins').textContent = stats.wins || 0;
    document.getElementById('stat-draws').textContent = stats.draws || 0;
    document.getElementById('stat-losses').textContent = stats.losses || 0;
    document.getElementById('stat-goals-for').textContent = stats.goalsFor || 0;
    document.getElementById('stat-goals-against').textContent = stats.goalsAgainst || 0;
    
    const goalDiff = (stats.goalsFor || 0) - (stats.goalsAgainst || 0);
    document.getElementById('stat-goal-diff').textContent = goalDiff > 0 ? `+${goalDiff}` : goalDiff;

    // Determinar ronda actual
    const currentRound = this.getCurrentRound(matches);
    document.getElementById('stat-round').textContent = currentRound || '-';
  }

  /**
   * Obtener ronda actual del Barcelona
   */
  getCurrentRound(matches) {
    if (matches.length === 0) return null;

    // Buscar el último partido del Barcelona
    const barcaMatches = matches.filter(m => 
      m.homeTeam === 'FC Barcelona' || m.awayTeam === 'FC Barcelona'
    );

    if (barcaMatches.length === 0) return null;

    // Ordenar por ronda
    const roundOrder = Object.keys(this.rounds);
    barcaMatches.sort((a, b) => {
      const aIndex = roundOrder.indexOf(a.round || 'primera');
      const bIndex = roundOrder.indexOf(b.round || 'primera');
      return bIndex - aIndex;
    });

    const lastMatch = barcaMatches[0];
    return this.rounds[lastMatch.round || 'primera'];
  }

  /**
   * Configurar event listeners
   */
  setupEventListeners() {
    // Botones de filtro de ronda
    const roundBtns = document.querySelectorAll('.round-btn');
    roundBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        roundBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        this.currentRound = e.target.dataset.round;
        this.renderBracket();
      });
    });
  }

  /**
   * Formatear fecha
   */
  formatDate(dateStr) {
    if (!dateStr) return '';
    
    const [day, month, year] = dateStr.split('/');
    const date = new Date(year, month - 1, day);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    
    return date.toLocaleDateString('es-ES', options);
  }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new CopaDataManager();
  });
} else {
  new CopaDataManager();
}
