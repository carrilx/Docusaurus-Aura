import React, {useState} from 'react';

const LINES = [
  'function recomendar(animo: number): Ejercicio {',
  '  if (animo <= 2) {',
  '    return "respiracion";',
  '  }',
  '  if (animo === 3) {',
  '    return "diario";',
  '  }',
  '  return "diario_gratitud";',
  '}',
];

// Líneas ejecutadas según el camino
const PATHS: Record<string, {lines: number[]; label: string}> = {
  C1: {lines: [0, 1, 2, 3, 8], label: 'Camino 1: ánimo ≤ 2 → "respiracion"'},
  C2: {lines: [0, 1, 4, 5, 6, 8], label: 'Camino 2: ánimo = 3 → "diario"'},
  C3: {lines: [0, 1, 4, 7, 8], label: 'Camino 3: ánimo ≥ 4 → "diario_gratitud"'},
};

function pathFor(v: number): keyof typeof PATHS {
  if (v <= 2) return 'C1';
  if (v === 3) return 'C2';
  return 'C3';
}

export default function BranchExplorer() {
  const [value, setValue] = useState(3);
  const [covered, setCovered] = useState<Set<string>>(new Set(['C2']));
  const current = pathFor(value);

  const change = (v: number) => {
    setValue(v);
    setCovered((c) => new Set(c).add(pathFor(v)));
  };

  const pct = Math.round((covered.size / 3) * 100);

  return (
    <div
      style={{
        border: '1px solid var(--ifm-color-emphasis-300)',
        borderRadius: 12,
        padding: '1rem',
        margin: '1.5rem 0',
      }}>
      <label>
        <strong>animo = {value}</strong>{' '}
        <input
          type="range"
          min={1}
          max={5}
          value={value}
          onChange={(e) => change(Number(e.target.value))}
        />
      </label>

      <pre style={{margin: '0.8rem 0'}}>
        {LINES.map((l, i) => (
          <div
            key={i}
            style={{
              background: PATHS[current].lines.includes(i) ? 'rgba(63,200,164,0.28)' : 'transparent',
              padding: '0 .4rem',
            }}>
            {l}
          </div>
        ))}
      </pre>

      <p style={{marginBottom: 6}}>{PATHS[current].label}</p>
      <p style={{margin: 0}}>
        Caminos cubiertos: <strong>{[...covered].sort().join(', ')}</strong> · cobertura de caminos{' '}
        <strong>{pct} %</strong> {pct === 100 && '✅'}
      </p>
      <small>Mueve el deslizador hasta cubrir los 3 caminos independientes.</small>
    </div>
  );
}
