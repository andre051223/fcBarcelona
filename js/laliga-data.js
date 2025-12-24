/**
 * La Liga Data Manager
 * Gestiona la visualización de datos específicos de La Liga
 */

class LaLigaDataManager {
  constructor() {
    this.competition = 'laliga';
    this.currentFilter = 'all';
    
    // Datos de partidos del Barcelona según las instrucciones
    this.barcelonaMatches = [
      { round: 1, date: '16/08/2025', homeTeam: 'Mallorca', awayTeam: 'FC Barcelona', homeScore: 0, awayScore: 3, location: 'Son Moix' },
      { round: 2, date: '23/08/2025', homeTeam: 'Levante UD', awayTeam: 'FC Barcelona', homeScore: 2, awayScore: 3, location: 'Ciudad de Valencia' },
      { round: 3, date: '31/08/2025', homeTeam: 'Rayo Vallecano', awayTeam: 'FC Barcelona', homeScore: 1, awayScore: 1, location: 'Vallecas' },
      { round: 4, date: '14/09/2025', homeTeam: 'FC Barcelona', awayTeam: 'Valencia CF', homeScore: 6, awayScore: 0, location: 'Camp Nou' },
      { round: 5, date: '21/09/2025', homeTeam: 'FC Barcelona', awayTeam: 'Getafe CF', homeScore: 3, awayScore: 0, location: 'Camp Nou' },
      { round: 6, date: '25/09/2025', homeTeam: 'Real Oviedo', awayTeam: 'FC Barcelona', location: 'Carlos Tartiere' },
      { round: 7, date: '28/09/2025', homeTeam: 'FC Barcelona', awayTeam: 'Real Sociedad', location: 'Camp Nou' },
      { round: 8, date: '05/10/2025', homeTeam: 'Sevilla FC', awayTeam: 'FC Barcelona', location: 'Ramón Sánchez-Pizjuán' },
      { round: 9, date: '18/10/2025', homeTeam: 'FC Barcelona', awayTeam: 'Girona FC', location: 'Camp Nou' },
      { round: 10, date: '26/10/2025', homeTeam: 'Real Madrid', awayTeam: 'FC Barcelona', location: 'Santiago Bernabéu' },
      { round: 11, date: '02/11/2025', homeTeam: 'FC Barcelona', awayTeam: 'Elche CF', location: 'Camp Nou' },
      { round: 12, date: '09/11/2025', homeTeam: 'FC Barcelona', awayTeam: 'Celta de Vigo', location: 'Camp Nou' },
      { round: 13, date: '23/11/2025', homeTeam: 'FC Barcelona', awayTeam: 'Athletic Club Bilbao', location: 'Camp Nou' },
      { round: 14, date: '30/11/2025', homeTeam: 'FC Barcelona', awayTeam: 'Alavés', location: 'Camp Nou' },
      { round: 15, date: '07/12/2025', homeTeam: 'FC Barcelona', awayTeam: 'Real Betis', location: 'Camp Nou' },
      { round: 16, date: '14/12/2025', homeTeam: 'FC Barcelona', awayTeam: 'CA Osasuna', location: 'Camp Nou' },
      { round: 17, date: '21/12/2025', homeTeam: 'FC Barcelona', awayTeam: 'Villarreal CF', location: 'Camp Nou' },
      { round: 18, date: '04/01/2026', homeTeam: 'FC Barcelona', awayTeam: 'RCD Espanyol', location: 'Camp Nou' },
      { round: 19, date: '11/01/2026', homeTeam: 'FC Barcelona', awayTeam: 'Atlético de Madrid', location: 'Camp Nou' },
      { round: 20, date: '16/01/2026', homeTeam: 'FC Barcelona', awayTeam: 'Mallorca', location: 'Camp Nou' }
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
      if (event.detail === 'laliga' || event.detail === 'all') {
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
    const standings = matchManager.getStandings(this.competition);
    const tbody = document.getElementById('standings-tbody');

    if (!tbody) return;

    tbody.innerHTML = '';

    standings.forEach((team, index) => {
      const position = index + 1;
      let zoneClass = '';

      if (position <= 4) zoneClass = 'zone-ucl';
      else if (position === 5) zoneClass = 'zone-uel';
      else if (position === 6) zoneClass = 'zone-uecl';
      else if (position >= 18) zoneClass = 'zone-relegation';

      const isBarca = team.name === 'FC Barcelona';
      const rowClass = isBarca ? 'barcelona-row' : '';

      const row = `
        <tr class="${rowClass} ${zoneClass}">
          <td class="pos-col">${position}</td>
          <td class="team-col">
            <img src="${team.logo}" alt="${team.name}" class="team-logo" onerror="this.style.display='none'">
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
   * Renderizar partidos
   */
  renderMatches() {
    const matches = matchManager.getMatches(this.competition);
    const container = document.getElementById('matches-container');

    if (!container) return;

    // Ordenar por jornada
    const sortedMatches = [...matches].sort((a, b) => a.round - b.round);

    // Filtrar según selección
    const filteredMatches = this.filterMatches(sortedMatches);

    container.innerHTML = '';

    if (filteredMatches.length === 0) {
      container.innerHTML = '<p style="text-align: center; padding: 2rem; color: var(--color-gray-500);">No hay partidos para mostrar</p>';
      return;
    }

    filteredMatches.forEach(match => {
      const matchCard = this.createMatchCard(match);
      container.appendChild(matchCard);
    });
  }

  /**
   * Filtrar partidos según criterio
   */
  filterMatches(matches) {
    switch (this.currentFilter) {
      case 'played':
        return matches.filter(m => m.played);
      case 'upcoming':
        return matches.filter(m => !m.played);
      default:
        return matches;
    }
  }

  /**
   * Crear tarjeta de partido
   */
  createMatchCard(match) {
    const card = document.createElement('div');
    card.className = `match-card ${match.played ? 'played' : 'upcoming'}`;

    const dateObj = this.parseDate(match.date);
    const formattedDate = this.formatDate(dateObj);

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

    card.innerHTML = `
      <div class="match-header">
        <span class="match-round">Jornada ${match.round}</span>
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
  }

  /**
   * Configurar event listeners
   */
  setupEventListeners() {
    // Botones de filtro
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        this.currentFilter = e.target.dataset.filter;
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
    new LaLigaDataManager();
  });
} else {
  new LaLigaDataManager();
}
