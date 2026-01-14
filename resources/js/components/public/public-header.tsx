import { dashboard, login, register } from '@/routes';
import { Auth } from '@/types';
import { Link } from '@inertiajs/react';
import { LogIn, Menu, PawPrint, X } from 'lucide-react';
import { useState } from 'react';

export const PublicHeader = ({
    auth,
    canRegister = true,
}: {
    auth: Auth;
    canRegister?: boolean;
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Inicio', href: '#inicio' },
        { name: 'Servicios', href: '#servicios' },
        { name: 'Nosotros', href: '#nosotros' },
        { name: 'Contacto', href: '#contacto' },
    ];

    return (
        <header className="fixed top-0 right-0 left-0 z-50 border-b border-border bg-card/95 backdrop-blur-md">
            <div className="container mx-auto">
                <div className="flex h-16 items-center justify-between md:h-20">
                    {/* Logo */}
                    <a href="#inicio" className="group flex items-center gap-2">
                        <div className="gradient-primary shadow-soft group-hover:shadow-glow flex h-10 w-10 items-center justify-center rounded-xl transition-shadow duration-300 md:h-12 md:w-12">
                            <PawPrint className="h-5 w-5 text-primary-foreground md:h-6 md:w-6" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm leading-tight font-bold text-foreground md:text-base">
                                VetMunicipal
                            </span>
                            <span className="text-[10px] leading-tight text-muted-foreground md:text-xs">
                                Huamanga
                            </span>
                        </div>
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden items-center gap-8 md:flex">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-primary"
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>

                    {/* Desktop CTA */}
                    <div className="hidden items-center gap-3 md:flex">
                        {auth?.user ? (
                            <Link
                                href={dashboard()}
                                className="inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground border border-border bg-transparent hover:bg-muted hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                {canRegister && (
                                    <Link
                                        href={register()}
                                        className="inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground border border-border bg-transparent hover:bg-muted hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                                        aria-label="Registrarse"
                                    >
                                        Registrarse
                                    </Link>
                                )}
                                <Link
                                    href={login()}
                                    className="inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium gradient-primary shadow-soft text-primary-foreground hover:shadow-glow hover:scale-105 active:scale-95 transition-transform transform focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                                    aria-label="Iniciar sesión"
                                >
                                    <LogIn className="mr-2 h-4 w-4" />
                                    Iniciar Sesión
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="rounded-lg p-2 transition-colors hover:bg-muted md:hidden"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <X className="h-6 w-6 text-foreground" />
                        ) : (
                            <Menu className="h-6 w-6 text-foreground" />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="animate-fade-in border-t border-border py-4 md:hidden">
                        <nav className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <div className="mt-2 flex flex-col gap-2 border-t border-border px-4 pt-4">
                                {auth?.user ? (
                                    <Link
                                        href={dashboard()}
                                        className="w-full inline-flex justify-center items-center rounded-lg px-4 py-3 text-center text-sm font-medium text-muted-foreground border border-border bg-transparent hover:bg-muted hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        {canRegister && (
                                            <Link
                                                href={register()}
                                                className="w-full inline-flex justify-center items-center rounded-lg px-4 py-3 text-center text-sm font-medium text-muted-foreground border border-border bg-transparent hover:bg-muted hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                                            >
                                                Registrarse
                                            </Link>
                                        )}
                                        <Link
                                            href={login()}
                                            className="w-full inline-flex justify-center items-center rounded-lg px-4 py-3 text-center text-sm font-medium gradient-primary text-primary-foreground shadow-soft hover:shadow-glow hover:scale-105 active:scale-95 transition-transform transform focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                                        >
                                            <LogIn className="mr-2 inline-block h-4 w-4" />
                                            Iniciar Sesión
                                        </Link>
                                    </>
                                )}
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};
