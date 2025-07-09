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
import MetaIcon from '@repo/ui/icons/MetaIcon';
import GoogleIcon from '@repo/ui/icons/GoogleIcon';
import AppleIcon from '@repo/ui/icons/AppleIcon';
import { Separator } from '@repo/ui/components/separator';
import Link from 'next/link';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { schemas } from '@repo/ui/validations/authSchema';
import { useSignupMutation } from '../../../lib/features/services/auth/authApi';

const SignUp = () => {
  const router = useRouter();
  const [signup, { isLoading }] = useSignupMutation();
  const form = useForm<z.infer<typeof schemas.auth.signup>>({
    resolver: zodResolver(schemas.auth.signup),
    mode: 'onChange',
    defaultValues: {
      firstName: 'Robin',
      lastName: 'Mind',
      email: 'robin.rh656@gmail.com',
      password: 'XLrewd875@',
      passwordConfirm: 'XLrewd875@',
    },
  });

  async function onSubmit(data: z.infer<typeof schemas.auth.signup>) {
    await toast.promise(
      signup(data)
        .unwrap()
        .then((res) => {
          router.push('/verify-email');
          return res;
        }),
      {
        loading: 'Signing up...',
        success: (res) =>
          res?.message ||
          'Sign up successful! Please check your email to verify.',
        error: (err) =>
          err?.data?.message || 'Sign up failed. Please try again.',
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
                Create your seller account
              </CardTitle>
              <CardDescription>
                Sign up with your email or continue with a social account to
                start selling.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="grid gap-6">
                    <div className="grid gap-6">
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>LirstName</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>FirstName</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
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
                      <FormField
                        control={form.control}
                        name="passwordConfirm"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading && <Loader className="animate-spin" />}
                        Sign up
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
                      <Button variant="outline" className="w-full">
                        <GoogleIcon />
                        <span className="sr-only">Login with Google</span>
                      </Button>
                      <Button variant="outline" className="w-full">
                        <MetaIcon />
                        <span className="sr-only">Login with Meta</span>
                      </Button>
                    </div>
                    <div className="text-center text-sm">
                      Already have an account?{' '}
                      <Link
                        href="/sign-in"
                        className="underline underline-offset-4"
                      >
                        Sign In
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

export default SignUp;
