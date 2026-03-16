// AuthForm.tsx
'use client';
import { useState } from 'react';

import styles from './AuthForm.module.scss';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

export const AuthForm = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {mode === 'login' ? (
          <LoginForm onSwitch={() => setMode('register')} />
        ) : (
          <RegisterForm onSwitch={() => setMode('login')} />
        )}
      </div>
    </div>
  );
};

export default AuthForm;
