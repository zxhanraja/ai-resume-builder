import React from 'react';
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton } from "@clerk/clerk-react";
import ThemeToggle from './ThemeToggle';
import type { View } from '../../types';

const LogoIcon = () => (
  <div className="flex items-center justify-center w-10 h-10 bg-black text-white font-bold text-xl rounded-lg dark:bg-brand-yellow dark:text-black">
    RB
  </div>
);

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="dark:text-white"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
);


interface NavbarProps {
    onHomeClick: () => void;
    view: View;
    onNavigate: (view: View) => void;
}

const NavLink: React.FC<{ view: View; currentView: View; onNavigate: (view: View) => void; children: React.ReactNode }> = ({ view, currentView, onNavigate, children }) => {
    const isActive = view === currentView;
    return (
        <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); onNavigate(view); }} 
            className={`font-semibold px-3 py-1.5 rounded-lg transition-colors text-sm sm:text-base ${isActive ? 'bg-gray-100 dark:bg-slate-800 text-black dark:text-white' : 'text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800'}`}
        >
            {children}
        </a>
    );
};


const Navbar: React.FC<NavbarProps> = ({ onHomeClick, view, onNavigate }) => {
    return (
        <>
            <div className="bg-brand-yellow text-center py-2 px-4 text-sm font-semibold text-black">
                <span>✨ Create your perfect resume with the power of AI. </span>
                 <SignedOut>
                    <SignUpButton mode="modal">
                        <a href="#" onClick={(e) => e.preventDefault()} className="underline font-bold hover:opacity-80 transition-opacity">
                            Start Now!
                        </a>
                    </SignUpButton>
                </SignedOut>
                 <SignedIn>
                    {view === 'dashboard' ? (
                        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('landing'); }} className="underline font-bold hover:opacity-80 transition-opacity">
                            View Home Page
                        </a>
                    ) : (
                        <a href="#" onClick={(e) => { e.preventDefault(); onHomeClick(); }} className="underline font-bold hover:opacity-80 transition-opacity">
                            Go to Dashboard
                        </a>
                    )}
                </SignedIn>
            </div>
            <header className="py-4 px-4 sm:px-6 md:px-12 bg-white/80 backdrop-blur-sm sticky top-0 z-40 dark:bg-slate-900/80 border-b border-gray-200 dark:border-slate-800">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-2 sm:gap-4">
                        <div className="flex items-center gap-3 cursor-pointer" onClick={onHomeClick}>
                            <LogoIcon />
                            <span className="font-bold text-xl sm:text-2xl dark:text-white hidden md:inline">AI Resume Builder</span>
                        </div>
                        <nav className="hidden md:flex items-center gap-1 border-l border-gray-200 dark:border-slate-700 ml-2 pl-2">
                           <NavLink view="features" currentView={view} onNavigate={onNavigate}>Features</NavLink>
                           <NavLink view="blog" currentView={view} onNavigate={onNavigate}>Blog</NavLink>
                        </nav>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4">
                        <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 hidden md:block"><WhatsAppIcon /></a>
                        <ThemeToggle />
                        <SignedIn>
                            <UserButton afterSignOutUrl="/" />
                        </SignedIn>
                        <SignedOut>
                            <SignInButton mode="modal">
                                <button className="font-semibold text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 px-3 py-1.5 sm:px-5 sm:py-2 rounded-lg transition-colors">Sign In</button>
                            </SignInButton>
                            <SignUpButton mode="modal">
                                <button className="font-bold bg-black text-white px-3 py-1.5 sm:px-5 sm:py-2 rounded-lg hover:bg-gray-800 dark:bg-brand-yellow dark:text-black dark:hover:brightness-95 transition-colors">Sign Up</button>
                            </SignUpButton>
                        </SignedOut>
                    </div>
                </div>
            </header>
        </>
    )
};

export default Navbar;