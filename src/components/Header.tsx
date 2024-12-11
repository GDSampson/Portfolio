'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
    let pathname = '';
    try {
        pathname = usePathname() || '';
    } catch (e) {
        console.error('Error getting pathname:', e);
    }

    const isActive = (path: string): boolean => {
        return pathname === path;
    };

    return (
        <header className="w-full bg-[#1E1E1E] px-4 py-2 fixed top-0 left-0 right-0">
            <nav className="flex justify-end gap-6 max-w-7xl mx-auto">
                <Link
                    href="/"
                    className={`text-lg ${isActive('/') ? 'text-emerald-400' : 'text-white'
                        } hover:text-emerald-400 transition-colors duration-200`}
                >
                    Home
                </Link>
                <Link
                    href="/about"
                    className={`text-lg ${isActive('/about') ? 'text-emerald-400' : 'text-white'
                        } hover:text-emerald-400 transition-colors duration-200`}
                >
                    About
                </Link>
                <Link
                    href="/projects"
                    className={`text-lg ${isActive('/projects') ? 'text-emerald-400' : 'text-white'
                        } hover:text-emerald-400 transition-colors duration-200`}
                >
                    Projects
                </Link>
                <Link
                    href="https://github.com/GDSampson"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-white hover:text-emerald-400 transition-colors duration-200"
                >
                    GitHub
                </Link>
            </nav>
        </header>
    );
}