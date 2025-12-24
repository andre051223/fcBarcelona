/**
 * UEFA Champions League Data Manager
 * Gestiona la visualización del nuevo formato de liga suiza
 */

class UEFADataManager {
  constructor() {
    this.competition = 'uefa';
    this.currentPhase = 'liga';
    
    // Partidos confirmados del Barcelona según las instrucciones
    this.barcelonaMatches = [
      { matchday: 1, date: '18/09/2025', homeTeam: 'Newcastle United', awayTeam: 'FC Barcelona', homeScore: 1, awayScore: 2, location: 'St James Park', phase: 'liga' },
      { matchday: 2, date: '01/10/2025', homeTeam: 'FC Barcelona', awayTeam: 'Paris Saint-Germain', homeScore: 2, awayScore: 2, location: 'Camp Nou', phase: 'liga' },
      { matchday: 3, date: '21/10/2025', homeTeam: 'Olympiacos', awayTeam: 'FC Barcelona', homeScore: 3, awayScore: 1, location: 'Karaiskakis Stadium', phase: 'liga' },
      { matchday: 4, date: '05/11/2025', homeTeam: 'Club Brugge', awayTeam: 'FC Barcelona', location: 'Jan Breydel Stadium', phase: 'liga' },
      { matchday: 5, date: '25/11/2025', homeTeam: 'Chelsea FC', awayTeam: 'FC Barcelona', location: 'Stamford Bridge', phase: 'liga' },
      { matchday: 6, date: '09/12/2025', homeTeam: 'FC Barcelona', awayTeam: 'Eintracht Frankfurt', location: 'Camp Nou', phase: 'liga' },
      { matchday: 7, date: '21/01/2026', homeTeam: 'Slavia Praha', awayTeam: 'FC Barcelona', location: 'Fortuna Arena', phase: 'liga' },
      { matchday: 8, date: '28/01/2026', homeTeam: 'FC Barcelona', awayTeam: 'FC København', location: 'Camp Nou', phase: 'liga' }
    ];

    // Equipos de la fase de liga (36 equipos)
    this.leagueTeams = [
      'FC Barcelona', 'Real Madrid', 'Manchester City', 'Bayern München', 'Paris Saint-Germain',
      'Liverpool FC', 'Inter Milan', 'Borussia Dortmund', 'RB Leipzig', 'Atlético de Madrid',
      'Arsenal FC', 'Chelsea FC', 'AC Milan', 'Juventus', 'Manchester United',
      'Benfica', 'Porto', 'Atalanta', 'Napoli', 'Sporting CP',
      'PSV Eindhoven', 'Shakhtar Donetsk', 'RB Salzburg', 'Celtic FC', 'Club Brugge',
      'Dinamo Zagreb', 'Olympiacos', 'Feyenoord', 'Galatasaray', 'FC København',
      'Newcastle United', 'Eintracht Frankfurt', 'AS Roma', 'Slavia Praha', 'Real Sociedad',
      'Sevilla FC'
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
    this.renderStandings();
    this.renderMatches();
    this.renderStats();

    // Configurar event listeners
    this.setupEventListeners();

    // Escuchar actualizaciones de datos
    window.addEventListener('barcelonaDataUpdated', (event) => {
      if (event.detail === 'uefa' || event.detail === 'all') {
        this.renderStandings();
        this.renderMatches();
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
      this.barcelonaMatches.forEach(match => {
        matchManager.addMatch({
          competition: this.competition,
          ...match
        });
      });
    }
  }

  /**
   * Renderizar tabla de clasificación
   */
  renderStandings() {
    const matches = matchManager.getMatches(this.competition);
    const tbody = document.getElementById('standings-tbody');

    if (!tbody) return;

    // Calcular clasificación
    const standings = this.calculateStandings(matches);

    tbody.innerHTML = '';

    standings.forEach((team, index) => {
      const position = index + 1;
      let zoneClass = '';

      if (position <= 8) zoneClass = 'zone-direct';
      else if (position <= 24) zoneClass = 'zone-playoff';
      else zoneClass = 'zone-eliminated';

      const isBarca = team.name === 'FC Barcelona';
      const rowClass = isBarca ? 'barcelona-row' : '';

      const row = `
        <tr class="${rowClass} ${zoneClass}">
          <td class="pos-col">${position}</td>
          <td class="team-col">
            <span class="team-name">${team.name}</span>
          </td>
          <td class="stat-col">${team.played}</td>
          <td class="stat-col">${team.wins}</td>
          <td class="stat-col">${team.draws}</td>
          <td class="stat-col">${team.losses}</td>
          <td class="stat-col">${team.goalsFor}</td>
          <td class="stat-col">${team.goalsAgainst}</td>
          <td class="stat-col">${team.goalDifference > 0 ? '+' : ''}${team.goalDifference}</td>
          <td class="pts-col">${team.points}</td>
        </tr>
      `;

      tbody.innerHTML += row;
    });
  }

  /**
   * Calcular clasificación de la fase de liga
   */
  calculateStandings(matches) {
    const standings = {};

    // Inicializar todos los equipos
    this.leagueTeams.forEach(team => {
      standings[team] = {
        name: team,
        played: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
        points: 0
      };
    });

    // Procesar partidos jugados
    matches.forEach(match => {
      if (!match.played) return;

      const homeTeam = standings[match.homeTeam];
      const awayTeam = standings[match.awayTeam];

      if (!homeTeam || !awayTeam) return;

      // Actualizar estadísticas
      homeTeam.played++;
      awayTeam.played++;
      homeTeam.goalsFor += match.homeScore;
      homeTeam.goalsAgainst += match.awayScore;
      awayTeam.goalsFor += match.awayScore;
      awayTeam.goalsAgainst += match.homeScore;

      if (match.homeScore > match.awayScore) {
        homeTeam.wins++;
        homeTeam.points += 3;
        awayTeam.losses++;
      } else if (match.homeScore < match.awayScore) {
        awayTeam.wins++;
        awayTeam.points += 3;
        homeTeam.losses++;
      } else {
        homeTeam.draws++;
        awayTeam.draws++;
        homeTeam.points++;
        awayTeam.points++;
      }

      homeTeam.goalDifference = homeTeam.goalsFor - homeTeam.goalsAgainst;
      awayTeam.goalDifference = awayTeam.goalsFor - awayTeam.goalsAgainst;
    });

    // Convertir a array y ordenar
    const standingsArray = Object.values(standings);
    standingsArray.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
      if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
      return a.name.localeCompare(b.name);
    });

    return standingsArray;
  }

  /**
   * Renderizar partidos
   */
  renderMatches() {
    const matches = matchManager.getMatches(this.competition);
    const container = document.getElementById('matches-container');

    if (!container) return;

    // Filtrar por fase
    const filteredMatches = matches.filter(m => {
      if (this.currentPhase === 'liga') return m.phase === 'liga' || !m.phase;
      return m.phase === this.currentPhase;
    });

    // Ordenar por jornada
    const sortedMatches = [...filteredMatches].sort((a, b) => {
      const aMatchday = a.matchday || 0;
      const bMatchday = b.matchday || 0;
      return aMatchday - bMatchday;
    });

    container.innerHTML = '';

    if (sortedMatches.length === 0) {
      container.innerHTML = '<p style="text-align: center; padding: 2rem; color: var(--color-gray-500);">No hay partidos en esta fase</p>';
      return;
    }

    sortedMatches.forEach(match => {
      const matchCard = this.createMatchCard(match);
      container.appendChild(matchCard);
    });
  }

  /**
   * Crear tarjeta de partido
   */
  createMatchCard(match) {
    const card = document.createElement('div');
    card.className = `match-card ${match.played ? 'played' : 'upcoming'}`;

    const dateObj = this.parseDate(match.date);
    const formattedDate = this.formatDate(dateObj);

    const isBarcaHome = match.homeTeam === 'FC Barcelona';
    const isBarcaAway = match.awayTeam === 'FC Barcelona';
    const locationLabel = isBarcaHome ? '(L)' : isBarcaAway ? '(V)' : '';

    let resultHTML = '';
    let scoreHTML = '';

    if (match.played) {
      const result = this.getMatchResult(match);
      resultHTML = `
        <div class="match-result">
          <span class="result-badge ${result}">${this.getResultText(result)}</span>
        </div>
      `;
      scoreHTML = `
        <div class="match-score">
          <span>${match.homeScore}</span>
          <span class="match-vs">-</span>
          <span>${match.awayScore}</span>
        </div>
      `;
    } else {
      scoreHTML = `<div class="match-vs">VS</div>`;
    }

    const matchdayLabel = this.currentPhase === 'liga' 
      ? `Jornada ${match.matchday || '-'}`
      : match.round || 'Eliminatoria';

    card.innerHTML = `
      <div class="match-header">
        <span class="match-round">${matchdayLabel}</span>
        <span class="match-location">${locationLabel}</span>
        <span class="match-date">${formattedDate}</span>
      </div>
      <div class="match-teams">
        <div class="match-team home">
          <div class="team-info">
            <span class="team-name-match">${match.homeTeam}</span>
          </div>
        </div>
        ${scoreHTML}
        <div class="match-team away">
          <div class="team-info">
            <span class="team-name-match">${match.awayTeam}</span>
          </div>
        </div>
      </div>
      ${resultHTML}
    `;

    return card;
  }

  /**
   * Obtener resultado del partido para Barcelona
   */
  getMatchResult(match) {
    const isBarcaHome = match.homeTeam === 'FC Barcelona';
    const isBarcaAway = match.awayTeam === 'FC Barcelona';

    if (!isBarcaHome && !isBarcaAway) return '';

    const barcaScore = isBarcaHome ? match.homeScore : match.awayScore;
    const opponentScore = isBarcaHome ? match.awayScore : match.homeScore;

    if (barcaScore > opponentScore) return 'win';
    if (barcaScore < opponentScore) return 'loss';
    return 'draw';
  }

  /**
   * Obtener texto del resultado
   */
  getResultText(result) {
    switch (result) {
      case 'win': return 'Victoria';
      case 'draw': return 'Empate';
      case 'loss': return 'Derrota';
      default: return '';
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
    document.getElementById('stat-draws').textContent = stats.draws || 0;
    document.getElementById('stat-losses').textContent = stats.losses || 0;
    document.getElementById('stat-goals-for').textContent = stats.goalsFor || 0;
    document.getElementById('stat-goals-against').textContent = stats.goalsAgainst || 0;
    
    const goalDiff = (stats.goalsFor || 0) - (stats.goalsAgainst || 0);
    document.getElementById('stat-goal-diff').textContent = goalDiff > 0 ? `+${goalDiff}` : goalDiff;
    
    const points = (stats.wins || 0) * 3 + (stats.draws || 0);
    document.getElementById('stat-points').textContent = points;

    // Estadísticas local/visitante
    const homeAwayStats = this.calculateHomeAwayStats(matches);
    document.getElementById('stat-home').textContent = `${homeAwayStats.home.wins}-${homeAwayStats.home.draws}-${homeAwayStats.home.losses}`;
    document.getElementById('stat-away').textContent = `${homeAwayStats.away.wins}-${homeAwayStats.away.draws}-${homeAwayStats.away.losses}`;

    // Posición actual
    const position = this.getBarcaPosition(matches);
    document.getElementById('stat-position').textContent = position ? `${position}º` : '-';

    // Fase actual
    const phase = this.getCurrentPhase(matches);
    document.getElementById('stat-phase').textContent = phase;
  }

  /**
   * Calcular estadísticas local/visitante
   */
  calculateHomeAwayStats(matches) {
    const stats = {
      home: { wins: 0, draws: 0, losses: 0 },
      away: { wins: 0, draws: 0, losses: 0 }
    };

    matches.forEach(match => {
      if (!match.played) return;

      const isBarcaHome = match.homeTeam === 'FC Barcelona';
      const isBarcaAway = match.awayTeam === 'FC Barcelona';

      if (!isBarcaHome && !isBarcaAway) return;

      const barcaScore = isBarcaHome ? match.homeScore : match.awayScore;
      const opponentScore = isBarcaHome ? match.awayScore : match.homeScore;
      const statsKey = isBarcaHome ? 'home' : 'away';

      if (barcaScore > opponentScore) stats[statsKey].wins++;
      else if (barcaScore < opponentScore) stats[statsKey].losses++;
      else stats[statsKey].draws++;
    });

    return stats;
  }

  /**
   * Obtener posición actual del Barcelona
   */
  getBarcaPosition(matches) {
    const standings = this.calculateStandings(matches);
    const barcaIndex = standings.findIndex(t => t.name === 'FC Barcelona');
    return barcaIndex >= 0 ? barcaIndex + 1 : null;
  }

  /**
   * Obtener fase actual
   */
  getCurrentPhase(matches) {
    const barcaMatches = matches.filter(m => 
      m.homeTeam === 'FC Barcelona' || m.awayTeam === 'FC Barcelona'
    );

    if (barcaMatches.length === 0) return 'Fase de Liga';

    const ligaMatches = barcaMatches.filter(m => m.phase === 'liga' || !m.phase);
    
    if (ligaMatches.length < 8) return 'Fase de Liga';
    
    const playoffMatches = barcaMatches.filter(m => m.phase === 'playoff');
    if (playoffMatches.length > 0) return 'Play-off';
    
    const knockoutMatches = barcaMatches.filter(m => m.phase === 'knockout');
    if (knockoutMatches.length > 0) return 'Fase Eliminatoria';
    
    return 'Fase de Liga';
  }

  /**
   * Configurar event listeners
   */
  setupEventListeners() {
    // Botones de fase
    const phaseTabs = document.querySelectorAll('.phase-tab');
    phaseTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        phaseTabs.forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
        this.currentPhase = e.target.dataset.phase;
        this.renderMatches();
      });
    });

    // Navegación de secciones
    const sectionLinks = document.querySelectorAll('.section-nav-link');
    sectionLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        sectionLinks.forEach(l => l.classList.remove('active'));
        e.target.classList.add('active');
        
        const targetId = e.target.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          const headerOffset = 140;
          const elementPosition = targetSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });

    // Actualizar link activo al hacer scroll
    this.updateActiveSectionOnScroll();
  }

  /**
   * Actualizar sección activa en scroll
   */
  updateActiveSectionOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.section-nav-link');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-150px 0px -50% 0px'
    });

    sections.forEach(section => observer.observe(section));
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
    new UEFADataManager();
  });
} else {
  new UEFADataManager();
}
