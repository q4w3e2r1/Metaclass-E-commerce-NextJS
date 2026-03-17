// ThemeToggle.tsx
'use client';
import { useEffect, useState } from 'react';

import { useTheme } from 'next-themes';

import styles from './ThemeToggle.module.scss';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // избегаем гидрации
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className={styles.placeholder} />;

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      <span className={styles.icon}>{isDark ? '☀️' : '🌙'}</span>
    </button>
  );
};

export default ThemeToggle;
