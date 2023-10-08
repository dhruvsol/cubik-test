"use client";
import React, { useState } from "react";
import AssetList from "./asset-list";
import styles from "./page.module.css";
import { Button } from "ui-components";

function Gradient({
  className,
  conic,
  small,
}: {
  className?: string;
  conic?: boolean;
  small?: boolean;
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
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
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

      <div className={styles.grid}>
        <AssetList page={currentPage} />
        <div className={styles.pagination}>
          <button
            disabled={currentPage === 1}
            onClick={() => {
              setCurrentPage((prev) => prev - 1);
            }}
            type="button"
          >
            Previous
          </button>
          <button
            onClick={() => {
              setCurrentPage((prev) => prev + 1);
            }}
            type="button"
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}