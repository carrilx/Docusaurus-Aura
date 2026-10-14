import React, {useEffect, useState} from 'react';
import styles from './styles.module.css';

type Phase = {label: string; secs: number; scale: number};
type Technique = {id: string; name: string; desc: string; phases: Phase[]};

const TECHNIQUES: Technique[] = [
  {
    id: '478',
    name: '4-7-8',
    desc: 'Para conciliar el sueño y bajar la ansiedad',
    phases: [
      {label: 'Inhala', secs: 4, scale: 1},
      {label: 'Mantén', secs: 7, scale: 1},
      {label: 'Exhala', secs: 8, scale: 0.55},
    ],
  },
  {
    id: 'box',
    name: 'Respiración cuadrada',
    desc: 'Para recuperar el foco antes de una tarea',
    phases: [
      {label: 'Inhala', secs: 4, scale: 1},
      {label: 'Mantén', secs: 4, scale: 1},
      {label: 'Exhala', secs: 4, scale: 0.55},
      {label: 'Pausa', secs: 4, scale: 0.55},
    ],
  },
  {
    id: 'calm',
    name: 'Calma rápida',
    desc: 'Dos minutos para un pico de estrés',
    phases: [
      {label: 'Inhala', secs: 4, scale: 1},
      {label: 'Exhala', secs: 6, scale: 0.55},
    ],
  },
];

type Props = {onSessionDone?: (cycles: number) => void};

export default function Breathing({onSessionDone}: Props) {
  const [techId, setTechId] = useState('478');
  const [running, setRunning] = useState(false);
  const [state, setState] = useState({idx: 0, remaining: 0, cycles: 0});

  const tech = TECHNIQUES.find((t) => t.id === techId)!;
  const {idx, remaining, cycles} = state;
  const phase = tech.phases[idx];

  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      setState((s) => {
        if (s.remaining > 1) return {...s, remaining: s.remaining - 1};
        const next = (s.idx + 1) % tech.phases.length;
        return {
          idx: next,
          remaining: tech.phases[next].secs,
          cycles: next === 0 ? s.cycles + 1 : s.cycles,
        };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [running, tech]);

  const start = () => {
    setState({idx: 0, remaining: tech.phases[0].secs, cycles: 0});
    setRunning(true);
  };

  const stop = () => {
    setRunning(false);
    if (cycles > 0) onSessionDone?.(cycles);
    setState({idx: 0, remaining: 0, cycles: 0});
  };

  const scale = running ? phase.scale : 0.55;
  const duration = running ? phase.secs : 0.6;

  return (
    <div className={styles.screenBody}>
      <h3 className={styles.screenTitle}>Respirar</h3>

      <div className={styles.chips}>
        {TECHNIQUES.map((t) => (
          <button
            key={t.id}
            className={`${styles.chip} ${t.id === techId ? styles.chipActive : ''}`}
            onClick={() => !running && setTechId(t.id)}
            disabled={running}>
            {t.name}
          </button>
        ))}
      </div>
      <p className={styles.muted}>{tech.desc}</p>

      <div className={styles.breathStage}>
        <div
          className={styles.breathCircle}
          style={{
            transform: `scale(${scale})`,
            transition: `transform ${duration}s ease-in-out`,
          }}
        />
        <div className={styles.breathText}>
          {running ? (
            <>
              <strong>{phase.label}</strong>
              <span>{remaining}</span>
            </>
          ) : (
            <strong>Listo</strong>
          )}
        </div>
      </div>

      <p className={styles.muted} aria-live="polite">
        {running ? `Ciclos completados: ${cycles}` : 'Siéntate cómodo y pulsa empezar.'}
      </p>

      <button className={styles.primaryBtn} onClick={running ? stop : start}>
        {running ? 'Terminar sesión' : 'Empezar'}
      </button>
    </div>
  );
}
