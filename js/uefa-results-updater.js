/**
 * ARCHIVO DE ACTUALIZACIÓN DE RESULTADOS UEFA CHAMPIONS LEAGUE 2025-26
 * 
 * Instrucciones para actualizar resultados:
 * 1. Modifica los valores en las funciones de abajo
 * 2. Guarda el archivo
 * 3. Recarga la página
 * 
 * Ejemplo de uso:
 * actualizarResultadoJornada1(); // Para aplicar resultados de la primera jornada
 */

// ===== FUNCIONES DE ACTUALIZACIÓN POR JORNADA =====

function actualizarResultadoJornada1() {
    // Ejemplo: Barcelona 3-1 Real Madrid, Manchester City 2-0 PSG, etc.
    uefaManager.updateTeamStats(5, { // Barcelona
        pj: 1, g: 1, e: 0, p: 0, gf: 3, gc: 1, pts: 3
    });
    
    uefaManager.updateTeamStats(2, { // Real Madrid
        pj: 1, g: 0, e: 0, p: 1, gf: 1, gc: 3, pts: 0
    });
    
    uefaManager.updateTeamStats(1, { // Manchester City
        pj: 1, g: 1, e: 0, p: 0, gf: 2, gc: 0, pts: 3
    });
    
    uefaManager.updateTeamStats(4, { // PSG
        pj: 1, g: 0, e: 0, p: 1, gf: 0, gc: 2, pts: 0
    });
    
    // Agregar más resultados aquí...
}

function actualizarResultadoJornada2() {
    // Agregar resultados de la segunda jornada
    // Importante: Estos valores son ACUMULATIVOS (suma total de todas las jornadas)
    
    uefaManager.updateTeamStats(5, { // Barcelona - Ejemplo: 2 partidos, 1 victoria 1 empate
        pj: 2, g: 1, e: 1, p: 0, gf: 4, gc: 2, pts: 4
    });
    
    // Agregar más equipos...
}

function actualizarResultadoJornada3() {
    // Resultados de la tercera jornada...
}

function actualizarResultadoJornada4() {
    // Resultados de la cuarta jornada...
}

function actualizarResultadoJornada5() {
    // Resultados de la quinta jornada...
}

function actualizarResultadoJornada6() {
    // Resultados de la sexta jornada...
}

function actualizarResultadoJornada7() {
    // Resultados de la séptima jornada...
}

function actualizarResultadoJornada8() {
    // Resultados de la octava jornada (final de fase de liga)...
}

// ===== FUNCIÓN DE APLICACIÓN AUTOMÁTICA =====

function aplicarResultadosActuales() {
    // Descomenta la jornada que quieres aplicar:
    
    // actualizarResultadoJornada1();
    // actualizarResultadoJornada2();
    // actualizarResultadoJornada3();
    // actualizarResultadoJornada4();
    // actualizarResultladoJornada5();
    // actualizarResultadoJornada6();
    // actualizarResultadoJornada7();
    // actualizarResultadoJornada8();
}

// ===== FUNCIONES DE UTILIDAD =====

// Función para actualizar rápidamente un resultado específico
function actualizarEquipo(nombre, stats) {
    const equipos = {
        'Barcelona': 5,
        'Real Madrid': 2,
        'Manchester City': 1,
        'Bayern Múnich': 3,
        'PSG': 4,
        'Liverpool': 6,
        'Inter': 7,
        'Dortmund': 8,
        'Atlético': 9,
        'Arsenal': 10,
        'Atalanta': 11,
        'Ajax': 12
        // Agregar más IDs si necesitas
    };
    
    const id = equipos[nombre];
    if (id) {
        uefaManager.updateTeamStats(id, stats);
        console.log(`✅ ${nombre} actualizado:`, stats);
    } else {
        console.error(`❌ Equipo "${nombre}" no encontrado`);
    }
}

// Función para resetear completamente
function resetearTodo() {
    uefaManager.resetTable();
    console.log('🔄 Tabla reseteada completamente');
}

// ===== AUTO-EJECUCIÓN =====

// Aplicar resultados automáticamente cuando se carga el archivo
document.addEventListener('DOMContentLoaded', function() {
    // Esperar un poco para que se inicialice el uefaManager
    setTimeout(() => {
        aplicarResultadosActuales();
    }, 500);
});

// ===== INSTRUCCIONES DE USO =====

console.log(`
📋 INSTRUCCIONES PARA ACTUALIZAR RESULTADOS:

1. MÉTODO RÁPIDO - Para un equipo específico:
   actualizarEquipo('Barcelona', { pj: 2, g: 1, e: 1, p: 0, gf: 4, gc: 2, pts: 4 });

2. MÉTODO POR JORNADAS - Actualizar una jornada completa:
   - Modifica la función actualizarResultadoJornada1() (o la jornada correspondiente)
   - Descomenta la línea en aplicarResultladosActuales()
   - Guarda el archivo y recarga la página

3. MÉTODO DIRECTO - Para actualizaciones inmediatas:
   uefaManager.updateTeamStats(5, { pj: 1, g: 1, e: 0, p: 0, gf: 2, gc: 0, pts: 3 });

4. PANEL DE ADMINISTRACIÓN:
   - Presiona Alt + A para abrir el panel
   - Usa 'Simular Jornada' para generar resultados aleatorios
   - Usa 'Resetear' para volver todo a cero

📊 ESTADÍSTICAS:
- pj: Partidos Jugados
- g: Ganados  
- e: Empatados
- p: Perdidos
- gf: Goles a Favor
- gc: Goles en Contra  
- pts: Puntos (3 por victoria, 1 por empate)

🎯 El sistema ordenará automáticamente por:
1. Puntos → 2. Diferencia de goles → 3. Goles a favor → 4. Victorias
`);
