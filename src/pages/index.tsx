import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import AppDemo from '@site/src/components/AppDemo';
import styles from './index.module.css';

const FEATURES = [
  {
    icon: '🙂',
    title: 'Check-in emocional',
    text: 'Registro diario del estado de ánimo en 10 segundos, con los factores que influyen.',
  },
  {
    icon: '🌬️',
    title: 'Respiración guiada',
    text: 'Técnicas 4-7-8, cuadrada y calma rápida con animación y temporizador.',
  },
  {
    icon: '📓',
    title: 'Diario con apoyo TCC',
    text: 'Detecta patrones de pensamiento poco útiles y sugiere cómo reformularlos.',
  },
  {
    icon: '🆘',
    title: 'Botón SOS',
    text: 'Acceso inmediato a teléfonos de ayuda y a un ejercicio de anclaje 5-4-3-2-1.',
  },
];

export default function Home(): React.JSX.Element {
  return (
    <Layout
      title="Aura"
      description="Documentación técnica y demo interactiva de Aura, una app de bienestar emocional.">
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <div>
            <h1 className={styles.title}>Aura</h1>
            <p className={styles.lead}>
              Una app de salud mental para entender cómo te sientes, respirar y encontrar apoyo.
              Esta web documenta cómo se diseña y construye, y te deja <strong>probarla aquí mismo</strong>.
            </p>
            <div className={styles.buttons}>
              <Link className="button button--secondary button--lg" to="/docs/intro">
                Leer la documentación
              </Link>
              <Link className="button button--outline button--lg" style={{color: '#fff', borderColor: '#fff'}} to="/demo">
                Demo a pantalla completa
              </Link>
            </div>
          </div>
          <AppDemo />
        </div>
      </header>

      <main>
        <section className={styles.features}>
          {FEATURES.map((f) => (
            <div key={f.title} className={styles.feature}>
              <h3>
                {f.icon} {f.title}
              </h3>
              <p>{f.text}</p>
            </div>
          ))}
        </section>
      </main>
    </Layout>
  );
}
