// Colour the shared-border graph once so marks keep their colour as visits change.
(function (root) {
  function regionColors(neighbors) {
    const palette = ['#13a89e', '#e77b45', '#8980de', '#d65386', '#469bd0', '#87ab36'];
    const assigned = Array(neighbors.length).fill(-1);
    for (let remaining = neighbors.length; remaining > 0; remaining--) {
      let selected = -1, saturation = -1, degree = -1;
      for (let i = 0; i < neighbors.length; i++) {
        if (assigned[i] !== -1) continue;
        const used = new Set(neighbors[i].map(j => assigned[j]).filter(c => c !== -1));
        if (used.size > saturation || (used.size === saturation && neighbors[i].length > degree)) {
          selected = i; saturation = used.size; degree = neighbors[i].length;
        }
      }
      const used = new Set(neighbors[selected].map(j => assigned[j]));
      let color = 0;
      while (used.has(color)) color++;
      assigned[selected] = color;
    }
    return assigned.map(c => palette[c] || `hsl(${(c * 137.508) % 360} 65% 48%)`);
  }
  root.TravelColors = { regionColors };
})(typeof window === 'undefined' ? globalThis : window);
