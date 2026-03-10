'use client';
import styles from './error.module.scss';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.icon}>✦</div>
        <h1 className={styles.title}>Что-то пошло не так</h1>
        <p className={styles.description}>
          Произошла непредвиденная ошибка. Мы уже знаем о проблеме и работаем над её устранением.
        </p>
        {error.message && (
          <div className={styles.errorMessage}>
            {error.message}
          </div>
        )}
        <div className={styles.buttons}>
          <button onClick={reset} className={styles.buttonPrimary}>
            Попробовать снова
          </button>
          <a href="/products" className={styles.buttonSecondary}>
            На главную
          </a>
        </div>
      </div>
    </div>
  );
}