# Sitio Web FC Barcelona - Instrucciones de Codificación IA

## Descripción del Proyecto
Este es un sitio web integral del FC Barcelona para la temporada 2025-26 que incluye un **sistema de gestión de partidos** que rastrea resultados a través de múltiples competiciones (La Liga, Copa del Rey, UEFA Champions League, Supercopa). El sitio utiliza JavaScript vanilla con clases ES6+ y localStorage para la persistencia de datos.

## Arquitectura Principal

### Patrón de Gestión de Datos
- **MatchManager** (`js/match-manager.js`) es el controlador central de datos que almacena todos los partidos, clasificaciones y estadísticas en localStorage con la clave `fcbarcelona_2025-26`
- **Gestores específicos de competición** (LaLigaDataManager, etc.) escuchan eventos `barcelonaDataUpdated` y actualizan automáticamente sus visualizaciones
- Todos los datos fluyen a través de MatchManager - nunca manipules directamente localStorage desde otros componentes

```javascript
// Patrón estándar para actualizaciones de datos
matchManager.addMatch(matchData);
window.dispatchEvent(new CustomEvent('barcelonaDataUpdated', { detail: competition }));
```

### Estructura Multi-Página
- `index.html` - Página principal con navegación y cargador de datos de demostración
- `01_laLiga.html` - Clasificaciones y resultados de La Liga

    - Implementa el formato de La Liga con 20 equipos, 38 jornadas
    - Clasificación actualizada automáticamente al agregar resultados
    - Equipos participantes:
        - FC Barcelona
        - Real Madrid
        - Atlético de Madrid
        - Sevilla FC
        - Valencia CF
        - Real Sociedad
        - Villarreal CF
        - Athletic Club Bilbao
        - Real Betis
        - Celta de Vigo
        - RCD Espanyol
        - Alavés
        - CA Osasuna
        - Rayo Vallecano
        - Levante UD
        - Getafe CF
        - Elche CF
        - Real Oviedo
        - Girona FC
        - Mallorca
    
    - Partidos del FC Barcelona:
        - Jornada 1: Mallorca vs. FC Barcelona - 16/08/2025 (Resultado: 0-3)
        - Jornada 2: Levante UD vs FC Barcelona - 23/08/2025 (Resultado: 2-3)
        - Jornada 3: Rayo Vallecano vs. FC Barcelona - 31/08/2025 (Resultado: 1-1)
        - Jornada 4: FC Barcelona vs. Valencia CF - 14/09/2025 (Resultado: 6-0)
        - Jornada 5: FC Barcelona vs. Getafe CF - 21/09/2025 (Resultado: 3-0)
        - Jornada 6: Real Oviedo vs. FC Barcelona - 25/09/2025
        - Jornada 7: FC Barcelona vs. Real Sociedad - 28/09/2025
        - Jornada 8: Sevilla vs FC Barcelona - 05/10/2025
        - Jornada 9: FC Barcelona vs Girona - 18/10/2025
        - Jornada 10: Real Madrid vs FC Barcelona - 26/10/2025
        - Jornada 11: FC Barcelona vs Elche C.F - 02/11/2025
        - Jornada 12: FC Barcelona vs Celta de Vigo - 09/11/2025
        - Jornada 13: FC Barcelona vs Athletic Club Bilbao - 23/11/2025
        - Jornada 14: FC Barcelona vs Alavés - 30/11/2025
        - Jornada 15: FC Barcelona vs Real Betis - 07/12/2025
        - Jornada 16: FC Barcelona vs CA Osasuna - 14/12/2025
        - Jornada 17: FC Barcelona vs Villarreal - 21/12/2025
        - Jornada 18: FC Barcelona vs RCD Espanyol - 04/01/2026
        - Jornada 19: FC Barcelona vs Atlético de Madrid - 11/01/2026
        - Jornada 20: FC Barcelona vs Mallorca - 16/01/2026


- `02_copaDelRey.html` - Sistema de eliminatorias de Copa del Rey

    - Implementa el formato de Copa del Rey con rondas de eliminación directa
    - Rondas: 1ª Ronda, 2ª Ronda, 3ª Ronda, Octavos, Cuartos, Semifinales, Final
    - Nota: La Copa del Rey 2025-26 comienza en noviembre de 2025, por lo que no hay partidos confirmados aún para el FC Barcelona


- `03_uefa.html` 
    - Implementación del nuevo formato de UEFA Champions League, el cual incluye:
        - Fase de formato de liga suizo con 36 equipos participantes
            - Cada equipo juega 8 partidos en esta fase
            - Los 8 primeros equipos avanzan a la fase eliminatoria de octavos de final
            - los equipos posicionados en la casilla 9° al 24° avanzan a la fase eliminatoria de play-off donde enfrentan por los 8 cupos restantes para los octavos de final
        - Desde octavos de final en adelante, el formato es de eliminación directa tradicional (partido de ida y vuelta)
        - La final es a partido único en una sede neutral
        
        - Partidos confirmados del FC Barcelona:
            Fase de liga suiza:
            - Newcastle United (V) - 18/09/2025 (Resultado: 1-2)
            - Paris Saint-Germain (L) - 01/10/2025 (Resultado: 2-2)
            - Olympiacos (V) - 21/10/2025 (Resultado: 3-1)
            - Brugge (V) - 05/11/2025
            - Chelsea (V) - 25/11/2025
            - Frankfurt (L) - 9/12/2025
            - Slavia Praga (V) - 21/01/2026
            - Kobenhavn (L) - 28/01/2026

    
- `04_supercopa.html` - Supercopa de España
    - Formato de semifinal y final a partido único
    - Equipos participantes:
        - FC Barcelona
        - Real Madrid
        - Atlético de Madrid
        - Athletic Club Bilbao

    - Nota: La Supercopa de España 2025 se jugará en enero de 2026
        - Semifinal 1: Real Madrid vs Atlético de Madrid - 07/01/2026
        - Semifinal 2: FC Barcelona vs Athletic Club Bilbao - 08/01/2026


- `admin.html` - Panel de gestión de partidos

### Componentes Basados en Clases
Cada funcionalidad principal utiliza clases ES6:
- `MatchManager` - Gestión central de datos
- `AdminPanel` - Operaciones CRUD de partidos
- `LaLigaDataManager` - Lógica específica de La Liga
- `DemoDataLoader` - Inyección de datos de muestra

## Flujo de Trabajo de Desarrollo

### Desarrollo Local
```bash
# Iniciar servidor de desarrollo (preferido)
npm run start

# O usar servidor Python
python -m http.server 8000

# O usar tarea de VS Code
# Ctrl+Shift+P -> "Run Task" -> "Servir FC Barcelona Website"
```

### Sistema de Compilación
- Configuración de Webpack con configs dev/prod
- Punto de entrada: `js/app.js` para funcionalidad global
- Archivos estáticos servidos desde directorio raíz
- Sin transpilación - usa características de navegadores modernos directamente

## Convenciones Clave

### Arquitectura CSS
- `css/style.css` - Estilos globales y colores del tema Barcelona
- `css/[page].css` - Estilos específicos de página (ej., `01_laLiga.css`)
- `css/admin-panel.css` - Estilos de interfaz de administración
- Usa CSS Grid y Flexbox extensivamente, dependencias externas mínimas

### Sistema de Eventos
```javascript
// Escuchar cambios de datos
window.addEventListener('barcelonaDataUpdated', (event) => {
    // event.detail contiene el nombre de la competición
    this.updateDisplay();
});

// Disparar actualizaciones después de cambios de datos
window.dispatchEvent(new CustomEvent('barcelonaDataUpdated', { 
    detail: 'laliga' 
}));
```

### Estructura de Datos
```javascript
// Formato de datos de MatchManager
{
    matches: { laliga: [], copa: [], uefa: [], supercopa: [] },
    standings: { laliga: [...teams], uefa: [...groups] },
    stats: { barcelona: { laliga: {...stats}, copa: {...stats} } }
}
```

## Patrones Específicos

### Agregar Nuevas Competiciones
1. Agregar competición al objeto `MatchManager.competitions`
2. Crear página HTML siguiendo el patrón `0X_competition.html`
3. Crear archivo CSS en directorio `css/`
4. Implementar clase gestora específica de competición
5. Agregar enlaces de navegación en secciones de header

### Gestión de Partidos
- Siempre usar `MatchManager.addMatch()` para consistencia
- La validación de competición ocurre automáticamente
- Las clasificaciones se recalculan en cada adición de partido
- Datos de demostración disponibles vía `DemoDataLoader.loadDemoData()`

### Componentes UI
- El dropdown de admin usa clase `admin-dropdown` con toggle de JavaScript
- Navegación de scroll suave para enlaces de ancla
- Intersection Observer para animaciones de scroll
- Diseño responsivo con enfoque mobile-first

## Nomenclatura de Archivos
- Páginas HTML: `0X_competition.html` (numeradas para orden de visualización)
- Archivos CSS: Coinciden con nombre de archivo HTML (`01_laLiga.css`)
- Archivos JS: Nombres descriptivos (`match-manager.js`, `laliga-data.js`)
- Assets en directorio `img/` con branding de Barcelona

## Tareas Comunes
- **Agregar resultado de partido**: Usar panel de admin o `matchManager.addMatch()`
- **Actualizar clasificaciones**: Automático cuando se agregan partidos
- **Agregar nuevo equipo**: Actualizar listas de equipos en gestores respectivos  
- **Modo demostración**: Usar `DemoDataLoader` para pruebas con datos de muestra
- **Exportar datos**: Panel de admin proporciona funcionalidad de respaldo/restauración

Al modificar este proyecto, mantén la arquitectura dirigida por eventos y siempre actualiza a través de MatchManager para asegurar consistencia de datos en todas las páginas.