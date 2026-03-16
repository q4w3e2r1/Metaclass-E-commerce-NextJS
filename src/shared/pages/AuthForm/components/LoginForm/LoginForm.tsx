'use client';
import { login } from '@api/auth/auth';
import { saveToken } from '@api/auth/store';
import { Button, Input } from '@components';
import { routes } from '@config/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Controller, useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import styles from './LoginForm.module.scss';

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginData = z.infer<typeof loginSchema>;

type LoginFormProps = {
  onSwitch: () => void;
};

export const LoginForm = ({ onSwitch }: LoginFormProps) => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginData) => {
    try {
      const res = await login({
        identifier: data.email,
        password: data.password,
      });
      saveToken(res.jwt);
      const params = new URLSearchParams(window.location.search);
      const redirect = params.get('redirect');
      router.push(redirect ?? routes.products.getRoute());
    } catch {
      setError('password', { message: 'Invalid email or password' });
    }
  };

  return (
    <>
      <h1 className={styles.title}>Sign in</h1>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.field}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                value={field.value}
                onChange={field.onChange}
                placeholder="Email"
                type="email"
              />
            )}
          />
          {errors.email && (
            <span className={styles.error}>{errors.email.message}</span>
          )}
        </div>

        <div className={styles.field}>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                value={field.value}
                onChange={field.onChange}
                placeholder="Password"
                type="password"
              />
            )}
          />
          {errors.password && (
            <span className={styles.error}>{errors.password.message}</span>
          )}
        </div>

        <Button type="submit" loading={isSubmitting}>
          Sign in
        </Button>
      </form>

      <div className={styles.switch}>
        Don't have an account?
        <button type="button" className={styles.switchBtn} onClick={onSwitch}>
          Register
        </button>
      </div>
    </>
  );
};

export default LoginForm;
