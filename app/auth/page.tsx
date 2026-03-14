'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, User, Lock, Mail, Github, Chrome } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const router = useRouter();
    const { t } = useLanguage();

    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-6 relative overflow-hidden bg-background">
            {/* Background elements to match the site aesthetic */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-farm-emerald/10 rounded-full blur-[120px] animate-blob" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-farm-sun/10 rounded-full blur-[120px] animate-blob animation-delay-2000" />
            </div>

            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="relative z-10 w-full max-w-xl"
            >
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-bold">Back to Platform</span>
                </button>

                <div className="glass rounded-[3rem] p-10 md:p-16 border border-white/10 shadow-2xl relative overflow-hidden">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-black mb-4 tracking-tighter">
                            {isLogin ? t('auth.login') : t('auth.signup')}
                        </h1>
                        <p className="text-muted-foreground font-medium text-lg">
                            {isLogin
                                ? "Welcome back to the future of farming."
                                : "Join the world's most advanced AI ecosystem."}
                        </p>
                    </div>

                    <div className="space-y-6">
                        {!isLogin && (
                            <div className="space-y-2">
                                <label className="text-sm font-black uppercase tracking-wider ml-4 text-muted-foreground">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-farm-emerald" />
                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-6 focus:outline-none focus:border-farm-emerald/50 transition-all font-bold"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-black uppercase tracking-wider ml-4 text-muted-foreground">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-farm-emerald" />
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-6 focus:outline-none focus:border-farm-emerald/50 transition-all font-bold"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-black uppercase tracking-wider ml-4 text-muted-foreground">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-farm-emerald" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-6 focus:outline-none focus:border-farm-emerald/50 transition-all font-bold"
                                />
                            </div>
                        </div>

                        <button className="w-full py-6 bg-farm-emerald text-white rounded-2xl font-black text-xl shadow-[0_15px_30px_-5px_rgba(16,185,129,0.4)] hover:shadow-[0_20px_40px_-5px_rgba(16,185,129,0.6)] transition-all hover:scale-[1.02] active:scale-[0.98]">
                            {isLogin ? "Access Repository" : "Create Account"}
                        </button>

                        <div className="relative py-6">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                            <div className="relative flex justify-center text-xs uppercase"><span className="bg-background/80 backdrop-blur px-2 text-muted-foreground font-black tracking-widest">Or continue with</span></div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex items-center justify-center gap-3 py-4 glass border-white/10 rounded-2xl hover:bg-white/5 transition-all font-bold">
                                <Chrome className="w-5 h-5" /> Google
                            </button>
                            <button className="flex items-center justify-center gap-3 py-4 glass border-white/10 rounded-2xl hover:bg-white/5 transition-all font-bold">
                                <Github className="w-5 h-5" /> GitHub
                            </button>
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-muted-foreground hover:text-farm-emerald transition-colors font-bold"
                        >
                            {isLogin
                                ? "Don't have an account? Sign up"
                                : "Already have an account? Log in"}
                        </button>
                    </div>

                    {/* Aesthetic gradient corner */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-farm-emerald/20 to-transparent pointer-events-none" />
                </div>
            </motion.div>
        </div>
    );
}
