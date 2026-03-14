'use client';

import React, { createContext, useContext, useState } from 'react';
import Link from 'next/link';
import { translations, Language } from '@/lib/translations';

type LanguageContextType = {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: keyof typeof translations['en']) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    // Check if user has manually saved a preference previously
    const getInitialLanguage = (): Language => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('farmerApp_lang') as Language;
            if (saved && (saved === 'en' || saved === 'kn' || saved === 'hi')) {
                return saved;
            }
        }
        return 'en';
    };

    const [language, setLanguage] = useState<Language>(getInitialLanguage);

    const t = (key: keyof typeof translations['en']): string => {
        const dict = translations[language as keyof typeof translations];
        return dict?.[key] || translations['en'][key] || key;
    };

    // Helper to switch language and save preference manually
    const switchLanguage = (lang: Language) => {
        setLanguage(lang);
        if (typeof window !== 'undefined') {
            localStorage.setItem('farmerApp_lang', lang);
        }
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {/* Top Right Fixed Toggle Buttons */}
            <div className="fixed top-4 right-4 z-[9999] flex items-center gap-3">
                <div className="flex items-center gap-2">
                    <Link
                        href="/auth"
                        className="px-6 py-2.5 text-xs font-black uppercase tracking-widest glass border-farm-emerald/30 text-farm-emerald rounded-full hover:bg-farm-emerald/20 transition-all duration-300 shadow-lg"
                    >
                        ACCOUNT
                    </Link>
                </div>
                <div className="flex items-center gap-1 bg-slate-900/5 backdrop-blur-md border border-slate-200/50 p-1 rounded-full shadow-lg">
                    <button
                        onClick={() => switchLanguage('en')}
                        className={`px-3 py-1.5 text-xs transition-all ${language === 'en'
                            ? 'bg-farm-emerald text-black rounded-full font-bold shadow-sm'
                            : 'text-slate-600 font-medium hover:bg-farm-emerald/10 hover:text-farm-emerald rounded-full'
                            }`}
                    >
                        EN
                    </button>
                    <button
                        onClick={() => switchLanguage('kn')}
                        className={`px-3 py-1.5 text-xs transition-all ${language === 'kn'
                            ? 'bg-farm-emerald text-black rounded-full font-bold shadow-sm'
                            : 'text-slate-600 font-medium hover:bg-farm-emerald/10 hover:text-farm-emerald rounded-full'
                            }`}
                    >
                        ಕನ್ನಡ
                    </button>
                    <button
                        onClick={() => switchLanguage('hi')}
                        className={`px-3 py-1.5 text-xs transition-all ${language === 'hi'
                            ? 'bg-farm-emerald text-black rounded-full font-bold shadow-sm'
                            : 'text-slate-600 font-medium hover:bg-farm-emerald/10 hover:text-farm-emerald rounded-full'
                            }`}
                    >
                        हिंदी
                    </button>
                </div>
            </div>
            {children}
        </LanguageContext.Provider>
    );
};

// Custom hook to use the language context easily
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
