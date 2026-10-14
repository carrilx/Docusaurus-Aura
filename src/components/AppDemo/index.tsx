import React, {useState} from 'react';
import Breathing from './Breathing';
import styles from './styles.module.css';

type Tab = 'home' | 'breathe' | 'journal' | 'progress' | 'sos';
type MoodEntry = {day: string; mood: number; tags: string[]};
type JournalEntry = {id: number; text: string; flags: string[]};

const MOODS = [
  {value: 1, emoji: '😞', label: 'Muy mal'},
  {value: 2, emoji: '😕', label: 'Mal'},
  {value: 3, emoji: '😐', label: 'Regular'},
  {value: 4, emoji: '🙂', label: 'Bien'},
  {value: 5, emoji: '😄', label: 'Genial'},
];

const TAGS = ['Sueño', 'Trabajo', 'Familia', 'Ejercicio', 'Amistades', 'Ansiedad'];

// Datos de ejemplo para que la gráfica no empiece vacía.
const SEED: MoodEntry[] = [
  {day: 'L', mood: 3, tags: ['Trabajo']},
  {day: 'M', mood: 2, tags: ['Sueño', 'Ansiedad']},
  {day: 'X', mood: 3, tags: []},
  {day: 'J', mood: 4, tags: ['Ejercicio']},
  {day: 'V', mood: 4, tags: ['Amistades']},
  {day: 'S', mood: 5, tags: ['Familia']},
];

// Detector (muy simplificado) de distorsiones cognitivas por palabras clave.
const DISTORTIONS: {re: RegExp; name: string; tip: string}[] = [
  {
    re: /\b(siempre|nunca|jam[aá]s)\b/i,
    name: 'Pensamiento todo o nada',
    tip: '¿Hay alguna ocasión en que no haya sido así? Busca un contraejemplo.',
  },
  {
    re: /\b(todo|nada|nadie)\b/i,
    name: 'Generalización',
    tip: 'Intenta sustituir "todo/nadie" por algo concreto: ¿quién? ¿qué?',
  },
  {
    re: /\b(fracaso|in[uú]til|est[uú]pido|in[uú]til)\b/i,
    name: 'Etiquetado',
    tip: 'Una etiqueta no te define. Describe lo que pasó, no lo que eres.',
  },
  {
    re: /\b(seguro que|va a salir mal|catastrofe|cat[aá]strofe|desastre)\b/i,
    name: 'Catastrofismo',
    tip: '¿Cuál es el resultado más probable? ¿Y el peor que podrías afrontar?',
  },
];

const PROMPTS = [
  '¿Qué ha sido lo mejor de hoy?',
  '¿Qué me preocupa ahora mismo?',
  'Una cosa por la que estoy agradecido…',
];

const GROUNDING = [
  '5 cosas que puedes VER',
  '4 cosas que puedes TOCAR',
  '3 cosas que puedes OÍR',
  '2 cosas que puedes OLER',
  '1 cosa que puedes SABOREAR',
];

function recommendation(mood: number): {text: string; goTo: Tab; cta: string} {
  if (mood <= 2)
    return {
      text: 'Parece un día duro. Probemos con unos minutos de respiración guiada.',
      goTo: 'breathe',
      cta: 'Ir a respirar',
    };
  if (mood === 3)
    return {
      text: 'Un día neutro. Escribir un par de líneas puede ayudarte a ordenar ideas.',
      goTo: 'journal',
      cta: 'Abrir diario',
    };
  return {
    text: '¡Qué bien! Anota qué ha ayudado hoy para repetirlo.',
    goTo: 'journal',
    cta: 'Anotarlo en el diario',
  };
}

export default function AppDemo() {
  const [tab, setTab] = useState<Tab>('home');
  const [moods, setMoods] = useState<MoodEntry[]>(SEED);
  const [selected, setSelected] = useState<number | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [lastRec, setLastRec] = useState<ReturnType<typeof recommendation> | null>(null);
  const [sessions, setSessions] = useState(0);

  const [draft, setDraft] = useState('');
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [grounded, setGrounded] = useState<boolean[]>(GROUNDING.map(() => false));

  const toggleTag = (t: string) =>
    setTags((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]));

  const saveMood = () => {
    if (selected === null) return;
    setMoods((m) => [...m, {day: `D${m.length - SEED.length + 1}`, mood: selected, tags}]);
    setLastRec(recommendation(selected));
    setSelected(null);
    setTags([]);
  };

  const flags = DISTORTIONS.filter((d) => d.re.test(draft));

  const saveEntry = () => {
    if (!draft.trim()) return;
    setEntries((e) => [{id: Date.now(), text: draft.trim(), flags: flags.map((f) => f.name)}, ...e]);
    setDraft('');
  };

  const avg = moods.reduce((a, m) => a + m.mood, 0) / moods.length;
  const visible = moods.slice(-8);

  const tabs: {id: Tab; icon: string; label: string}[] = [
    {id: 'home', icon: '🏠', label: 'Inicio'},
    {id: 'breathe', icon: '🌬️', label: 'Respirar'},
    {id: 'journal', icon: '📓', label: 'Diario'},
    {id: 'progress', icon: '📈', label: 'Progreso'},
    {id: 'sos', icon: '🆘', label: 'SOS'},
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.phone} role="application" aria-label="Demo interactiva de la app Aura">
        <div className={styles.notch} />

        <div className={styles.screen}>
          {tab === 'home' && (
            <div className={styles.screenBody}>
              <p className={styles.hello}>Buenos días 👋</p>
              <h3 className={styles.screenTitle}>¿Cómo te sientes ahora?</h3>

              <div className={styles.moodRow}>
                {MOODS.map((m) => (
                  <button
                    key={m.value}
                    className={`${styles.mood} ${selected === m.value ? styles.moodActive : ''}`}
                    onClick={() => setSelected(m.value)}
                    aria-label={m.label}
                    aria-pressed={selected === m.value}>
                    {m.emoji}
                  </button>
                ))}
              </div>

              <p className={styles.muted}>¿Qué ha influido?</p>
              <div className={styles.chips}>
                {TAGS.map((t) => (
                  <button
                    key={t}
                    className={`${styles.chip} ${tags.includes(t) ? styles.chipActive : ''}`}
                    onClick={() => toggleTag(t)}>
                    {t}
                  </button>
                ))}
              </div>

              <button className={styles.primaryBtn} onClick={saveMood} disabled={selected === null}>
                Guardar check-in
              </button>

              {lastRec && (
                <div className={styles.card}>
                  <p>{lastRec.text}</p>
                  <button className={styles.linkBtn} onClick={() => setTab(lastRec.goTo)}>
                    {lastRec.cta} →
                  </button>
                </div>
              )}
              {sessions > 0 && (
                <p className={styles.muted}>🌿 Sesiones de respiración completadas: {sessions}</p>
              )}
            </div>
          )}

          {tab === 'breathe' && <Breathing onSessionDone={() => setSessions((s) => s + 1)} />}

          {tab === 'journal' && (
            <div className={styles.screenBody}>
              <h3 className={styles.screenTitle}>Diario</h3>
              <div className={styles.chips}>
                {PROMPTS.map((p) => (
                  <button key={p} className={styles.chip} onClick={() => setDraft(p + ' ')}>
                    {p}
                  </button>
                ))}
              </div>
              <textarea
                className={styles.textarea}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Escribe lo que quieras. Prueba con: «Siempre me sale todo mal»"
                rows={4}
              />
              {flags.length > 0 && (
                <div className={styles.cardWarn}>
                  <strong>💡 Posible patrón: {flags[0].name}</strong>
                  <p>{flags[0].tip}</p>
                </div>
              )}
              <button className={styles.primaryBtn} onClick={saveEntry} disabled={!draft.trim()}>
                Guardar entrada
              </button>
              {entries.map((e) => (
                <div key={e.id} className={styles.entry}>
                  <p>{e.text}</p>
                  {e.flags.length > 0 && <small>🏷️ {e.flags.join(', ')}</small>}
                </div>
              ))}
            </div>
          )}

          {tab === 'progress' && (
            <div className={styles.screenBody}>
              <h3 className={styles.screenTitle}>Tu progreso</h3>
              <div className={styles.bars} role="img" aria-label="Gráfico de estado de ánimo">
                {visible.map((m, i) => (
                  <div key={i} className={styles.barCol}>
                    <div
                      className={styles.bar}
                      style={{height: `${m.mood * 20}%`}}
                      title={`${MOODS[m.mood - 1].label}${m.tags.length ? ' · ' + m.tags.join(', ') : ''}`}
                    />
                    <span>{m.day}</span>
                  </div>
                ))}
              </div>
              <div className={styles.stats}>
                <div>
                  <strong>{avg.toFixed(1)}</strong>
                  <span>media /5</span>
                </div>
                <div>
                  <strong>{moods.length}</strong>
                  <span>check-ins</span>
                </div>
                <div>
                  <strong>{sessions}</strong>
                  <span>respiraciones</span>
                </div>
              </div>
              <p className={styles.muted}>
                Haz más check-ins en «Inicio» y verás cómo crece la gráfica.
              </p>
            </div>
          )}

          {tab === 'sos' && (
            <div className={styles.screenBody}>
              <h3 className={styles.screenTitle}>Necesito ayuda ahora</h3>
              <div className={styles.cardWarn}>
                <strong>Si estás en peligro o piensas en hacerte daño:</strong>
                <p>
                  Llama al <a href="tel:024">024</a> (atención a la conducta suicida, 24 h, gratuito)
                  o al <a href="tel:112">112</a>.
                </p>
              </div>
              <p className={styles.muted}>Técnica de anclaje 5-4-3-2-1</p>
              {GROUNDING.map((g, i) => (
                <label key={g} className={styles.check}>
                  <input
                    type="checkbox"
                    checked={grounded[i]}
                    onChange={() => setGrounded((arr) => arr.map((v, j) => (j === i ? !v : v)))}
                  />
                  {g}
                </label>
              ))}
              {grounded.every(Boolean) && (
                <div className={styles.card}>Bien hecho. Respira hondo: estás aquí y ahora. 🌿</div>
              )}
            </div>
          )}
        </div>

        <nav className={styles.tabbar}>
          {tabs.map((t) => (
            <button
              key={t.id}
              className={`${styles.tab} ${tab === t.id ? styles.tabActive : ''}`}
              onClick={() => setTab(t.id)}>
              <span>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
