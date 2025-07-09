'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@repo/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { Input } from '@repo/ui/components/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/components/form';
import GoogleIcon from '@repo/ui/icons/GoogleIcon';
import AppleIcon from '@repo/ui/icons/AppleIcon';
import MetaIcon from '@repo/ui/icons/MetaIcon';
import { Separator } from '@repo/ui/components/separator';
import Link from 'next/link';
import { Loader } from 'lucide-react';
import { toast } from 'sonner';
import { Checkbox } from '@repo/ui/components/checkbox';
import { schemas } from '@repo/ui/validations/authSchema';
import { useSigninMutation } from '../../../lib/features/services/auth/authApi';

const SignIn = () => {
  const [signin, { isLoading }] = useSigninMutation();
  const form = useForm<z.infer<typeof schemas.auth.signin>>({
    resolver: zodResolver(schemas.auth.signin),
    mode: 'onChange',
    defaultValues: {
      email: 'robin.rh656@gmail.com',
      password: 'XLrewd875@',
      remember: false,
    },
  });
  async function onSubmit(data: z.infer<typeof schemas.auth.signin>) {
    await toast.promise(
      signin(data)
        .unwrap()
        .then((res) => res),
      {
        loading: 'Signing in...',
        success: (res) => {
          window.location.reload();
          return res?.message || 'Signed in successfully.';
        },
        error: (err) =>
          err?.data?.message || 'Something went wrong while signing in!',
      },
    );
  }
  return (
    <section className="w-full">
      <div className="container max-w-md ">
        <div className="grid gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-poppins">
                Welcome back
              </CardTitle>
              <CardDescription>
                Sign in to your account or continue with a social provider.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="grid gap-6">
                    <div className="grid gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex items-center justify-between">
                        <FormField
                          control={form.control}
                          name="remember"
                          render={({ field }) => (
                            <FormItem className="flex items-center gap-2 space-y-0">
                              <FormControl>
                                <Checkbox
                                  id="remember"
                                  checked={field.value}
                                  onChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel
                                htmlFor="remember"
                                className="text-sm font-normal"
                              >
                                Remember me
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                        <Link
                          href="/dashboard/forgot-password"
                          className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading && <Loader className="animate-spin" />}
                        Sign in
                      </Button>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Separator className="shrink" />
                      <span className="relative z-10 px-1.5 text-muted-foreground whitespace-nowrap">
                        Or continue with
                      </span>
                      <Separator className="shrink" />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <Button variant="outline" className="w-full">
                        <AppleIcon />
                        <span className="sr-only">Login with Apple</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        type="button"
                        onClick={() => {
                          window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/dashboard/user/auth/google`;
                        }}
                      >
                        <GoogleIcon />
                        <span className="sr-only">Login with Google</span>
                      </Button>
                      <Button variant="outline" className="w-full">
                        <MetaIcon />
                        <span className="sr-only">Login with Meta</span>
                      </Button>
                    </div>
                    <div className="text-center text-sm">
                      Don&apos;t have an account?{' '}
                      <Link
                        href="/sign-up"
                        className="underline underline-offset-4"
                      >
                        Sign up
                      </Link>
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
