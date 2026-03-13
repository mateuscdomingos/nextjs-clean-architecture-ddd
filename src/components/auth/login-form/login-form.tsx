'use client';

import { handleLogin } from '@/app/actions/auth-actions';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { startTransition, useActionState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginInput } from '@/lib/schemas/auth';

export function LoginForm() {
  const t = useTranslations('components.auth.loginForm');
  const [state, formAction, isPending] = useActionState(handleLogin, undefined);
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginInput) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));

    startTransition(() => {
      formAction(formData);
    });
  };

  const getGenericMessageError = (genericErrorMessage: string) => {
    if (genericErrorMessage === 'invalidCredentials') {
      return t('invalidCredentials');
    }

    return t('unknownError');
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">{t('email')}</FieldLabel>
              <Input {...field} id="email" aria-invalid={fieldState.invalid} />
              {fieldState.invalid && (
                <FieldError errors={[{ message: t('invalidEmail') }]} />
              )}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password">{t('password')}</FieldLabel>
              <Input
                {...field}
                id="password"
                type="password"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && (
                <FieldError errors={[{ message: t('weakPassword') }]} />
              )}
            </Field>
          )}
        />
        <FieldGroup>
          <Field>
            {state?.error?.generic && (
              <div
                role="alert"
                className="text-destructive text-sm font-normal"
              >
                {getGenericMessageError(state.error.generic)}
              </div>
            )}
            <Button type="submit" loading={isPending}>
              {t('login')}
            </Button>
            <FieldDescription className="px-6 text-center">
              {t.rich('doNotHaveAnAccount', {
                SignUpLink: (chunks) => <Link href="/register">{chunks}</Link>,
              })}
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
}
