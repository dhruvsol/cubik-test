import Image from "next/image";
import styles from "./page.module.css";
import { Button } from "ui-components";

function Gradient({
  conic,
  className,
  small,
}: {
  small?: boolean;
  conic?: boolean;
  className?: string;
}): JSX.Element {
  return (
    <span
      className={[
        styles.gradient,
        conic ? styles.glowConic : undefined,
        small ? styles.gradientSmall : styles.gradientLarge,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

export default function Page(): JSX.Element {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          my&nbsp;
          <code className={styles.code}>Repo</code>
        </p>
        <div className="space-x-4">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
        </div>
      </div>

      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <Gradient className={styles.backgroundGradient} conic />
        </div>
      </div>

      <div className={styles.grid}></div>
    </main>
  );
}
