"use client";

import Image from "next/image";
import {Input} from "@/components/input";
import {useCallback, useState} from "react";
import axios from "axios";
import { signIn } from 'next-auth/react';
import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";

const PageAuth = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const [variant, setVariant] = useState('login');

    const toggleVariant = useCallback(() => {
        setVariant(variant === 'login' ? 'register' : 'login');
    }, [variant]);

    const login = useCallback(async () => {
        try {
            await signIn('credentials', { email, password, redirect: false, callbackUrl: '/profiles' })
        } catch (error) {
            console.log(error);
        }
    }, [email, password])

    const register = useCallback(async () => {
        try {
            await axios.post('/api/auth/register', {
                email,
                name,
                password
            });

            login();
        } catch (error) {
            console.log(error);
        }
    }, [email, name, password, login]);

    return (
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-cover bg-center bg-no-repeat bg-fixed">
            <div className="bg-black h-full w-full lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <Image src="/images/logo.png" alt="logo" height={100} width={100}/>
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md w-full">
                        <h2 className="text-white text-4xl mb-8 font-semibold">
                            {variant === 'login' ? 'Sign in' : 'Register'}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {variant === 'register' && (
                                <Input
                                    value={name}
                                    label="Name"
                                    onChange={(ev) => setName(ev.target.value)}
                                    id="name"
                                />
                            )}
                            <Input
                                value={email}
                                type="email"
                                label="Email"
                                onChange={(ev) => setEmail(ev.target.value)}
                                id="email"
                            />
                            <Input
                                value={password}
                                type="password"
                                label="Password"
                                onChange={(ev) => setPassword(ev.target.value)}
                                id="password"
                            />
                        </div>
                        <button
                            onClick={variant === 'login' ? login : register}
                            className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                            {variant === 'login' ? 'Sign in' : 'Register'}
                        </button>
                        <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                            <div
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center
                                cursor-pointer hover:opacity-80 transition"
                                onClick={() => signIn('google', { callbackUrl: '/profiles' })}
                            >
                                <FcGoogle size={30}/>
                            </div>
                            <div
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center
                                cursor-pointer hover:opacity-80 transition"
                                onClick={() => signIn('github', { callbackUrl: '/profiles' })}
                            >
                                <FaGithub size={30}/>
                            </div>
                        </div>
                        <p className="text-neutral-500 mt-12">
                            {variant === 'login' ? 'First time using Netflix?' : 'Already have an account?'}
                            <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">
                                {variant === 'login' ? 'Create an account' : 'Login'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageAuth;
