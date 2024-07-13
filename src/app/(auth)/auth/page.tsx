'use client';
import { BsSlack } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { RxGithubLogo } from 'react-icons/rx';

import { Button } from '@/components/ui/button';
import Typography from '@/components/ui/typography';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { MdOutlineAutoAwesome } from 'react-icons/md';
import { useState } from 'react';
import { Provider } from '@supabase/supabase-js';
import { supabaseBrowserClient } from '@/supabase/supabaseClient';

const AuthPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const formSchema = z.object({
    email: z
      .string()
      .email({ message: 'Please provide a valid email.' })
      .min(5, { message: 'Email is too short' }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  async function socialAuth(provider: Provider) {
    setIsAuthenticated(true);
    const { error } = await supabaseBrowserClient.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    setIsAuthenticated(false);
  }

  return (
    <div className=' min-h-screen p-5 grid text-center place-content-center bg-white '>
      <div className=' max-w-[450px]'>
        <div className=' flex justify-center items-center gap-3 mb-4'>
          <BsSlack size={30} />
          <Typography variant='h2' text='Slackzz' />
        </div>
        <Typography
          variant='h2'
          text='Sign in to your Slackzz'
          className='mb-3'
        />

        <Typography
          text='We suggest using the email address associated with your work or school account.'
          variant='p'
          className='opacity-90 mb-7'
        />
        <div className=' flex flex-col space-y-4'>
          <Button
            disabled={isAuthenticated}
            variant={'outline'}
            className='py-6 border-2 flex space-x-3'
            onClick={() => socialAuth('google')}
          >
            <FcGoogle size={30} />
            <Typography
              text='Sign in with Google'
              variant='p'
              className='text-xl'
            />
          </Button>
          <Button
            disabled={isAuthenticated}
            variant={'outline'}
            className='py-6 border-2 flex space-x-3'
            onClick={() => socialAuth('github')}
          >
            <RxGithubLogo size={30} />
            <Typography
              text='Sign in with Google'
              variant='p'
              className='text-xl'
            />
          </Button>
        </div>
        <div>
          <div className=' flex items-center my-6'>
            <div className='mr-[10px] flex-1 border-t bg-neutral-300' />
            <Typography text='OR' variant='p' />
            <div className='ml-[10px] flex-1 border-t bg-neutral-300' />
          </div>
          {/* FORM */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <fieldset disabled={isAuthenticated}>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder='name@work-email.com' />
                      </FormControl>
                      <FormMessage {...field} />
                    </FormItem>
                  )}
                />
                <Button
                  variant={'secondary'}
                  className=' bg-primary-dark hover:bg-primary-dark/90 w-full my-5 text-white'
                  type='submit'
                >
                  <Typography text='Sign-in with Email' variant='p' />
                </Button>
                <div className=' px-5 py4 bg-gray-100 rounded-sm'>
                  <div className=' text-gray-500 flex items-center space-x-3'>
                    <MdOutlineAutoAwesome size={20} />
                    <Typography
                      text='We will email magic link for a password-free sing-in.'
                      variant='p'
                    />
                  </div>
                </div>
              </fieldset>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
