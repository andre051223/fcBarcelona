# FC Barcelona - Sistema de Seguimiento La Liga 2025-26

## 📋 Descripción

Este proyecto es una aplicación web completa para seguir el desempeño del FC Barcelona en La Liga 2025-26. Incluye tabla de posiciones, resultados, próximos partidos, estadísticas detalladas y visualizaciones interactivas.

## 🚀 Características Principales

### 📊 Tabla de Posiciones
- Clasificación completa de La Liga en tiempo real
- Destacado especial para el FC Barcelona
- Indicadores visuales para posiciones de Champions, Europa League y descenso
- Sistema de ordenación por diferentes criterios (puntos, goles, diferencia)
- Funcionalidad de búsqueda de equipos

### 🏆 Resultados y Partidos
- Últimos resultados del FC Barcelona con detalles completos
- Próximos partidos con información de horarios y televisión
- Sistema de filtros por resultado y fecha
- Tendencia visual de los últimos resultados

### 📈 Estadísticas Avanzadas
- Estadísticas detalladas de ataque, defensa y disciplina
- Gráficos de evolución de puntos durante la temporada
- Comparativas de rendimiento
- Métricas clave del equipo

### 🎨 Interfaz Moderna
- Diseño responsivo para todos los dispositivos
- Tema oscuro/claro intercambiable
- Animaciones y transiciones suaves
- Tooltips informativos
- Indicadores de carga en tiempo real

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica moderna
- **CSS3**: Diseño responsivo con Grid y Flexbox
- **JavaScript ES6+**: Funcionalidad interactiva
- **Canvas API**: Gráficos personalizados
- **Local Storage**: Persistencia de preferencias
- **Intersection Observer**: Animaciones de scroll

## 📁 Estructura del Proyecto

```
fcBarcelona/
├── 01_laLiga.html          # Página principal de La Liga
├── css/
│   ├── style.css           # Estilos globales
│   └── 01_laLiga.css       # Estilos específicos de La Liga
├── js/
│   ├── app.js              # Funcionalidades principales
│   ├── laliga-data.js      # Gestión de datos
│   ├── laliga-charts.js    # Gráficos y visualizaciones
│   ├── laliga-advanced.js  # Funcionalidades avanzadas
│   └── laliga-api.js       # API simulada y actualizaciones
└── img/                    # Recursos gráficos
```

## 🚦 Instalación y Uso

### Requisitos
- Python 3.x (para el servidor local)
- Navegador web moderno

### Pasos de Instalación

1. **Clonar o descargar el proyecto**
   ```bash
   git clone https://github.com/tu-usuario/fcBarcelona.git
   cd fcBarcelona
   ```

2. **Iniciar el servidor local**
   ```bash
   python -m http.server 8000
   ```

3. **Abrir en el navegador**
   ```
   http://localhost:8000/01_laLiga.html
   ```

## 🎯 Funcionalidades Detalladas

### Sistema de Datos
- **LaLigaDataManager**: Gestiona todos los datos de equipos, resultados y estadísticas
- **Datos simulados**: Información realista basada en la temporada actual
- **Cache inteligente**: Optimización de rendimiento

### Visualizaciones
- **Gráfico de evolución**: Muestra la progresión de puntos durante la temporada
- **Barras de rendimiento**: Comparativas visuales de estadísticas
- **Tendencia de resultados**: Vista rápida de los últimos partidos

### Filtros y Búsqueda
- **Filtros de resultados**: Por tipo de resultado y fecha
- **Ordenación de tabla**: Múltiples criterios de ordenación
- **Búsqueda de equipos**: Localización rápida en la tabla

### Actualizaciones en Tiempo Real
- **API simulada**: Sistema de actualización automática
- **Notificaciones**: Avisos de nuevos datos
- **Indicadores de carga**: Feedback visual durante actualizaciones

## 🎨 Personalización

### Temas
El sistema incluye soporte para temas claro y oscuro:
- **Tema oscuro**: Diseño por defecto con colores del Barcelona
- **Tema claro**: Alternativa clara para mejor legibilidad

### Colores del Barcelona
```css
:root {
  --barca-azul: #004d98;
  --barca-granate: #a50044;
  --barca-dorado: #ffcc00;
}
```

## 📱 Diseño Responsivo

El proyecto está optimizado para:
- **Desktop**: Experiencia completa con todas las funcionalidades
- **Tablet**: Adaptación del layout para pantallas medianas
- **Mobile**: Interfaz optimizada para dispositivos móviles

### Breakpoints
- Desktop: > 1024px
- Tablet: 768px - 1024px
- Mobile: < 768px

## 🔧 Configuración Avanzada

### Actualizaciones Automáticas
```javascript
// Configurar intervalos de actualización
const updater = new LaLigaUpdater();
updater.iniciarActualizacionAutomatica();

// Personalizar intervalos
updater.configurarIntervalos({
  tabla: 10 * 60 * 1000,    // 10 minutos
  resultados: 5 * 60 * 1000  // 5 minutos
});
```

### Cache
```javascript
// Limpiar cache manualmente
laLigaAPI.limpiarCache();

// Verificar estado del cache
const estado = laLigaAPI.obtenerEstadoCache();
console.log('Entradas en cache:', estado.entradas);
```

## 🚀 Próximas Mejoras

### Funcionalidades Planificadas
- [ ] Integración con API real de La Liga
- [ ] Sistema de notificaciones push
- [ ] Análisis predictivo de resultados
- [ ] Comparativas históricas
- [ ] Exportación de datos a PDF
- [ ] Widget embebible
- [ ] Modo offline con Service Worker

### Optimizaciones Técnicas
- [ ] Lazy loading de imágenes
- [ ] Compresión de assets
- [ ] CDN para recursos estáticos
- [ ] Progressive Web App (PWA)

## 🤝 Contribución

### Cómo Contribuir
1. Fork del repositorio
2. Crear rama para nueva funcionalidad
3. Implementar cambios con tests
4. Crear Pull Request

### Estándares de Código
- ES6+ para JavaScript
- CSS moderno con variables
- Comentarios en español
- Documentación actualizada

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE.txt` para más detalles.

## 🎯 Créditos

- **Diseño**: Inspirado en la identidad visual del FC Barcelona
- **Datos**: Simulados basados en temporadas reales
- **Iconos**: Emojis nativos del sistema
- **Fuentes**: Arial, sans-serif para compatibilidad

## 📞 Soporte

Para reportar problemas o sugerir mejoras:
- 📧 Email: soporte@fcbarcelona-app.com
- 🐛 Issues: GitHub Issues
- 💬 Discusiones: GitHub Discussions

---

**Visca el Barça! 🔴🔵**

> "Més que un club" - Este proyecto celebra la pasión por el FC Barcelona y el fútbol español.
