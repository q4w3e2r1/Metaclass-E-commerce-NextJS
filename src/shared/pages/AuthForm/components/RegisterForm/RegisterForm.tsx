'use client';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Input, Button } from '@components';
import { register } from '@api/auth/auth';
import { saveToken } from '@api/auth/store';
import { routes } from '@config/routes';
import styles from './RegisterForm.module.scss';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type RegisterData = z.infer<typeof registerSchema>;

type RegisterFormProps = {
  onSwitch: () => void;
};

export const RegisterForm = ({ onSwitch }: RegisterFormProps) => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  const onSubmit = async (data: RegisterData) => {
    try {
      const res = await register({
        username: data.name,
        email: data.email,
        password: data.password,
      });
      saveToken(res.jwt);
      const params = new URLSearchParams(window.location.search);
      const redirect = params.get('redirect');
      router.push(redirect ?? routes.products.getRoute());
    } catch {
      setError('email', { message: 'Email already taken or invalid' });
    }
  };

  return (
    <>
      <h1 className={styles.title}>Create account</h1>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.field}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                value={field.value}
                onChange={field.onChange}
                placeholder="Name"
              />
            )}
          />
          {errors.name && (
            <span className={styles.error}>{errors.name.message}</span>
          )}
        </div>

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

        <div className={styles.field}>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <Input
                value={field.value}
                onChange={field.onChange}
                placeholder="Confirm password"
                type="password"
              />
            )}
          />
          {errors.confirmPassword && (
            <span className={styles.error}>{errors.confirmPassword.message}</span>
          )}
        </div>

        <Button type="submit" loading={isSubmitting}>
          Register
        </Button>
      </form>

      <div className={styles.switch}>
        Already have an account?
        <button type="button" className={styles.switchBtn} onClick={onSwitch}>
          Sign in
        </button>
      </div>
    </>
  );
};

export default RegisterForm;