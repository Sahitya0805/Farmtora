'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Leaf, CloudRain, ShieldAlert, Search, Info, Sprout, Droplets, Sun } from 'lucide-react';
import { useLanguage } from './language-provider';

export function Navbar() {
    const pathname = usePathname();
    const { t } = useLanguage();

    const navLinks = [
        {
            href: '/weather',
            label: t('nav.weather'),
            icon: <CloudRain className="w-5 h-5 mr-2 group-hover:animate-float-fast" />,
            activePattern: /^\/weather/,
            color: 'text-blue-500',
        },
        {
            href: '/crops',
            label: t('nav.crops'),
            icon: <Leaf className="w-5 h-5 mr-2 group-hover:animate-spin-slow" />,
            activePattern: /^\/crops/,
            color: 'text-emerald-500',
        },
        {
            href: '/cattle',
            label: t('nav.cattle'),
            icon: <ShieldAlert className="w-5 h-5 mr-2 group-hover:animate-pulse-slow font-bold" />,
            activePattern: /^\/cattle/,
            color: 'text-rose-500',
        },
        {
            href: '/soil',
            label: t('nav.soil'),
            icon: <Search className="w-5 h-5 mr-2 group-hover:scale-125 transition-transform" />,
            activePattern: /^\/soil/,
            color: 'text-amber-500',
        },
        {
            href: '/dashboard',
            label: t('nav.dashboard'),
            icon: <Info className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />,
            activePattern: /^\/dashboard/,
            color: 'text-primary',
        },
    ];

    // Show navbar on all pages including landing page

    return (
        <nav className="sticky top-0 z-50 w-full glass border-b-0 backdrop-blur-2xl transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
            <div className="absolute inset-0 bg-background/50 pointer-events-none z-0"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex items-center justify-between h-16 w-full">
                    {/* Logo */}
                    <div className="flex-1 flex items-center justify-start">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(16,185,129,0.3)] group-hover:shadow-[0_0_35px_rgba(16,185,129,0.5)] transition-all duration-500 group-hover:rotate-[10deg] group-hover:scale-110">
                                <img src="/farmtora_logo.png" alt="FarmTora Logo" className="w-full h-full object-cover" />
                            </div>
                            <span className="font-black text-2xl text-foreground tracking-tighter group-hover:text-primary transition-colors">FarmTora</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden lg:flex flex-1 items-center justify-center space-x-2">
                        {navLinks.map((link) => {
                            const isActive = link.activePattern.test(pathname);
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`
                                        group px-5 py-2.5 rounded-2xl text-sm font-black flex items-center transition-all duration-500
                                        ${isActive
                                            ? 'bg-primary text-primary-foreground shadow-[0_10px_25px_-5px_rgba(16,185,129,0.4)] scale-105'
                                            : 'text-muted-foreground hover:bg-primary/10 hover:text-primary hover:shadow-[0_10px_20px_-5px_rgba(16,185,129,0.2)] hover:-translate-y-1'
                                        }
                                    `}
                                >
                                    <span className={`${isActive ? 'text-white' : (link as any).color}`}>
                                        {link.icon}
                                    </span>
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Empty flex spacer for right side to ensure perfect centering */}
                    <div className="flex-1 hidden lg:block"></div>
                </div>
            </div>

            {/* Mobile Navigation Bar */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-border pb-safe shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">
                <div className="absolute inset-0 bg-background/50 pointer-events-none z-0"></div>
                <div className="flex justify-around items-center h-16 px-2 relative z-10">
                    {navLinks.map((link) => {
                        const isActive = link.activePattern.test(pathname);
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                <div className={`p-1.5 rounded-full transition-all duration-300 ${isActive ? 'bg-primary/10 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : ''}`}>
                                    <div className="[&>svg]:w-5 [&>svg]:h-5 [&>svg]:mr-0">{link.icon}</div>
                                </div>
                                <span className="text-[10px] font-bold leading-none truncate w-[60px] text-center">{link.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
