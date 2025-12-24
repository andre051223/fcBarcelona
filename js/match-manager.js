/**
 * Match Manager - Sistema central de gestión de datos
 * Controla todos los partidos, clasificaciones y estadísticas
 * Almacena datos en localStorage con clave 'fcbarcelona_2025-26'
 */

class MatchManager {
  constructor() {
    this.storageKey = 'fcbarcelona_2025-26';
    this.competitions = {
      laliga: 'La Liga',
      copa: 'Copa del Rey',
      uefa: 'UEFA Champions League',
      supercopa: 'Supercopa de España'
    };
    
    this.data = this.loadData();
  }

  /**
   * Cargar datos desde localStorage
   */
  loadData() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Error al cargar datos:', e);
      }
    }
    
    return this.initializeData();
  }

  /**
   * Inicializar estructura de datos vacía
   */
  initializeData() {
    return {
      matches: {
        laliga: [],
        copa: [],
        uefa: [],
        supercopa: []
      },
      standings: {
        laliga: this.initializeLaLigaStandings(),
        uefa: []
      },
      stats: {
        barcelona: {
          laliga: { played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 },
          copa: { played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 },
          uefa: { played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 },
          supercopa: { played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0 }
        }
      }
    };
  }

  /**
   * Inicializar clasificación de La Liga con 20 equipos
   */
  initializeLaLigaStandings() {
    const teams = [
      { name: 'FC Barcelona', logo: 'https://logohistory.net/wp-content/uploads/2023/12/FC-Barcelona-Logo-2018.png' },
      { name: 'Real Madrid', logo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg' },
      { name: 'Atlético de Madrid', logo: 'https://upload.wikimedia.org/wikipedia/en/f/f4/Atletico_Madrid_2017_logo.svg' },
      { name: 'Sevilla FC', logo: 'https://upload.wikimedia.org/wikipedia/en/3/3b/Sevilla_FC_logo.svg' },
      { name: 'Valencia CF', logo: 'https://upload.wikimedia.org/wikipedia/en/c/ce/Valenciacf.svg' },
      { name: 'Real Sociedad', logo: 'https://upload.wikimedia.org/wikipedia/en/f/f1/Real_Sociedad_logo.svg' },
      { name: 'Villarreal CF', logo: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Villarreal_CF_logo-escudo.svg' },
      { name: 'Athletic Club Bilbao', logo: 'https://upload.wikimedia.org/wikipedia/en/9/98/Club_Athletic_Bilbao_logo.svg' },
      { name: 'Real Betis', logo: 'https://upload.wikimedia.org/wikipedia/en/1/13/Real_betis_logo.svg' },
      { name: 'Celta de Vigo', logo: 'https://upload.wikimedia.org/wikipedia/en/1/12/RC_Celta_de_Vigo_logo.svg' },
      { name: 'RCD Espanyol', logo: 'https://upload.wikimedia.org/wikipedia/en/7/7a/RCD_Espanyol_logo.svg' },
      { name: 'Alavés', logo: 'https://upload.wikimedia.org/wikipedia/en/7/7d/Deportivo_Alaves_logo.svg' },
      { name: 'CA Osasuna', logo: 'https://upload.wikimedia.org/wikipedia/en/4/4a/CA_Osasuna_logo.svg' },
      { name: 'Rayo Vallecano', logo: 'https://upload.wikimedia.org/wikipedia/en/6/6f/Rayo_Vallecano_logo.svg' },
      { name: 'Levante UD', logo: 'https://upload.wikimedia.org/wikipedia/en/7/7b/Levante_Uni%C3%B3n_Deportiva%2C_S.A.D._logo.svg' },
      { name: 'Getafe CF', logo: 'https://upload.wikimedia.org/wikipedia/en/4/46/Getafe_logo.svg' },
      { name: 'Elche CF', logo: 'https://upload.wikimedia.org/wikipedia/en/b/b9/Elche_CF_logo.svg' },
      { name: 'Real Oviedo', logo: 'https://upload.wikimedia.org/wikipedia/en/d/d7/Real_Oviedo_logo.svg' },
      { name: 'Girona FC', logo: 'https://upload.wikimedia.org/wikipedia/en/7/79/Girona_FC_logo.svg' },
      { name: 'Mallorca', logo: 'https://upload.wikimedia.org/wikipedia/en/e/e0/RCD_Mallorca.svg' }
    ];

    return teams.map(team => ({
      ...team,
      played: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0
    }));
  }

  /**
   * Guardar datos en localStorage
   */
  saveData() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.data));
      return true;
    } catch (e) {
      console.error('Error al guardar datos:', e);
      return false;
    }
  }

  /**
   * Agregar un partido
   */
  addMatch(matchData) {
    const { competition, round, date, homeTeam, awayTeam, homeScore, awayScore, location } = matchData;
    
    if (!this.competitions[competition]) {
      console.error('Competición no válida:', competition);
      return false;
    }

    const match = {
      id: Date.now(),
      competition,
      round: round || 0,
      date: date || '',
      homeTeam: homeTeam || '',
      awayTeam: awayTeam || '',
      homeScore: homeScore !== undefined ? parseInt(homeScore) : null,
      awayScore: awayScore !== undefined ? parseInt(awayScore) : null,
      location: location || 'Camp Nou',
      played: homeScore !== undefined && awayScore !== undefined
    };

    this.data.matches[competition].push(match);
    
    if (match.played) {
      this.updateStandings(competition, match);
      this.updateStats(competition, match);
    }

    this.saveData();
    return true;
  }

  /**
   * Actualizar clasificaciones
   */
  updateStandings(competition, match) {
    if (competition === 'laliga') {
      this.updateLaLigaStandings(match);
    }
  }

  /**
   * Actualizar clasificación de La Liga
   */
  updateLaLigaStandings(match) {
    const homeTeamData = this.data.standings.laliga.find(t => t.name === match.homeTeam);
    const awayTeamData = this.data.standings.laliga.find(t => t.name === match.awayTeam);

    if (!homeTeamData || !awayTeamData) return;

    // Actualizar estadísticas de equipo local
    homeTeamData.played++;
    homeTeamData.goalsFor += match.homeScore;
    homeTeamData.goalsAgainst += match.awayScore;

    // Actualizar estadísticas de equipo visitante
    awayTeamData.played++;
    awayTeamData.goalsFor += match.awayScore;
    awayTeamData.goalsAgainst += match.homeScore;

    // Determinar resultado
    if (match.homeScore > match.awayScore) {
      homeTeamData.wins++;
      homeTeamData.points += 3;
      awayTeamData.losses++;
    } else if (match.homeScore < match.awayScore) {
      awayTeamData.wins++;
      awayTeamData.points += 3;
      homeTeamData.losses++;
    } else {
      homeTeamData.draws++;
      homeTeamData.points++;
      awayTeamData.draws++;
      awayTeamData.points++;
    }

    // Calcular diferencia de goles
    homeTeamData.goalDifference = homeTeamData.goalsFor - homeTeamData.goalsAgainst;
    awayTeamData.goalDifference = awayTeamData.goalsFor - awayTeamData.goalsAgainst;

    // Ordenar clasificación
    this.sortLaLigaStandings();
  }

  /**
   * Ordenar clasificación de La Liga
   */
  sortLaLigaStandings() {
    this.data.standings.laliga.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
      if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
      return a.name.localeCompare(b.name);
    });
  }

  /**
   * Actualizar estadísticas del Barcelona
   */
  updateStats(competition, match) {
    const isBarcaHome = match.homeTeam === 'FC Barcelona';
    const isBarcaAway = match.awayTeam === 'FC Barcelona';

    if (!isBarcaHome && !isBarcaAway) return;

    const stats = this.data.stats.barcelona[competition];
    stats.played++;

    if (isBarcaHome) {
      stats.goalsFor += match.homeScore;
      stats.goalsAgainst += match.awayScore;
      
      if (match.homeScore > match.awayScore) stats.wins++;
      else if (match.homeScore < match.awayScore) stats.losses++;
      else stats.draws++;
    } else {
      stats.goalsFor += match.awayScore;
      stats.goalsAgainst += match.homeScore;
      
      if (match.awayScore > match.homeScore) stats.wins++;
      else if (match.awayScore < match.homeScore) stats.losses++;
      else stats.draws++;
    }
  }

  /**
   * Obtener todos los partidos de una competición
   */
  getMatches(competition) {
    return this.data.matches[competition] || [];
  }

  /**
   * Obtener clasificación de una competición
   */
  getStandings(competition) {
    return this.data.standings[competition] || [];
  }

  /**
   * Obtener estadísticas del Barcelona
   */
  getBarcelonaStats(competition) {
    return this.data.stats.barcelona[competition] || {};
  }

  /**
   * Limpiar todos los datos
   */
  clearAllData() {
    this.data = this.initializeData();
    this.saveData();
    window.dispatchEvent(new CustomEvent('barcelonaDataUpdated', { detail: 'all' }));
  }

  /**
   * Exportar datos
   */
  exportData() {
    return JSON.stringify(this.data, null, 2);
  }

  /**
   * Importar datos
   */
  importData(jsonData) {
    try {
      this.data = JSON.parse(jsonData);
      this.saveData();
      window.dispatchEvent(new CustomEvent('barcelonaDataUpdated', { detail: 'all' }));
      return true;
    } catch (e) {
      console.error('Error al importar datos:', e);
      return false;
    }
  }
}

// Instancia global
const matchManager = new MatchManager();
