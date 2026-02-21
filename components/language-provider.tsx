'use client';

import React, { createContext, useContext, useState } from 'react';
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
            if (saved && (saved === 'en' || saved === 'kn')) {
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
            <div className="fixed top-4 right-4 z-[9999]">
                <div className="flex items-center gap-1 bg-white border-2 border-slate-200 p-1 rounded-full shadow-sm hover:shadow transition-all">
                    <button
                        onClick={() => switchLanguage('en')}
                        className={`px-3 py-1.5 text-xs transition-all ${language === 'en'
                            ? 'bg-blue-500 text-white rounded-full font-bold shadow-sm'
                            : 'text-slate-500 font-medium hover:text-slate-700'
                            }`}
                    >
                        EN
                    </button>
                    <button
                        onClick={() => switchLanguage('kn')}
                        className={`px-3 py-1.5 text-xs transition-all ${language === 'kn'
                            ? 'bg-orange-500 text-white rounded-full font-bold shadow-sm'
                            : 'text-slate-500 font-medium hover:text-slate-700'
                            }`}
                    >
                        ಕನ್ನಡ
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
