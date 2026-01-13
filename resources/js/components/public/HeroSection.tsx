import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, PawPrint, Shield } from 'lucide-react';

const HeroSection = () => {
    return (
        <section
            id="inicio"
            className="gradient-hero relative min-h-screen overflow-hidden pt-20 md:pt-24"
        >
            {/* Decorative elements */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 -left-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
                <div className="absolute -right-20 bottom-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
                <div className="absolute top-1/2 left-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/30 blur-3xl" />
            </div>

            <div className="relative z-10 container mx-auto">
                <div className="grid min-h-[calc(100vh-6rem)] items-center gap-12 lg:grid-cols-2 lg:gap-8">
                    {/* Content */}
                    <div className="flex flex-col gap-6 pt-8 text-center md:gap-8 lg:pt-0 lg:text-left">
                        {/* Badge */}
                        <div className="animate-fade-in-up mx-auto inline-flex w-fit items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground lg:mx-0">
                            <Shield className="h-4 w-4" />
                            <span>Municipalidad Provincial de Huamanga</span>
                        </div>

                        {/* Heading */}
                        <h1 className="animate-fade-in-up stagger-1 text-3xl leading-tight font-extrabold text-balance text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
                            Cuidamos a tus{' '}
                            <span className="text-primary">mascotas</span> como
                            parte de nuestra{' '}
                            <span className="text-accent">familia</span>
                        </h1>

                        {/* Description */}
                        <p className="animate-fade-in-up stagger-2 mx-auto max-w-xl text-base text-muted-foreground md:text-lg lg:mx-0">
                            Sistema integral de gestión veterinaria municipal.
                            Registra a tu mascota, gestiona citas y accede a
                            servicios de salud animal de calidad para toda la
                            comunidad.
                        </p>

                        {/* CTA Buttons */}
                        <div className="animate-fade-in-up stagger-3 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                            <Button
                                size="lg"
                                className="gradient-primary shadow-soft hover:shadow-glow px-8 text-base text-primary-foreground transition-all duration-300"
                            >
                                <PawPrint className="mr-2 h-5 w-5" />
                                Registrar Mascota
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-2 border-primary/20 px-8 text-base text-foreground hover:border-primary hover:bg-primary/5"
                            >
                                Conocer más
                            </Button>
                        </div>

                        {/* Stats */}
                        <div className="animate-fade-in-up stagger-4 mt-4 grid grid-cols-3 gap-4 border-t border-border/50 pt-8 md:gap-8">
                            <div className="text-center lg:text-left">
                                <p className="text-2xl font-bold text-primary md:text-3xl">
                                    5,000+
                                </p>
                                <p className="text-xs text-muted-foreground md:text-sm">
                                    Mascotas registradas
                                </p>
                            </div>
                            <div className="text-center lg:text-left">
                                <p className="text-2xl font-bold text-primary md:text-3xl">
                                    1,200+
                                </p>
                                <p className="text-xs text-muted-foreground md:text-sm">
                                    Atenciones mensuales
                                </p>
                            </div>
                            <div className="text-center lg:text-left">
                                <p className="text-2xl font-bold text-primary md:text-3xl">
                                    98%
                                </p>
                                <p className="text-xs text-muted-foreground md:text-sm">
                                    Satisfacción
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Hero Image/Illustration */}
                    <div className="relative flex items-center justify-center lg:justify-end">
                        <div className="animate-float relative w-full max-w-lg">
                            {/* Main card */}
                            <div className="relative rounded-3xl border border-border/50 bg-card p-6 shadow-card md:p-8">
                                <div className="gradient-accent shadow-soft animate-pulse-soft absolute -top-4 -right-4 flex h-16 w-16 items-center justify-center rounded-2xl">
                                    <Heart className="h-8 w-8 text-accent-foreground" />
                                </div>

                                <div className="mb-6 flex items-center gap-4">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-secondary md:h-24 md:w-24">
                                        <PawPrint className="h-10 w-10 text-primary md:h-12 md:w-12" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-foreground md:text-xl">
                                            Max
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Golden Retriever
                                        </p>
                                        <span className="mt-1 inline-block rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
                                            Registrado ✓
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between border-b border-border/50 py-2">
                                        <span className="text-sm text-muted-foreground">
                                            Próxima cita
                                        </span>
                                        <span className="text-sm font-medium text-foreground">
                                            15 Ene, 10:00 AM
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between border-b border-border/50 py-2">
                                        <span className="text-sm text-muted-foreground">
                                            Vacunas
                                        </span>
                                        <span className="text-sm font-medium text-accent">
                                            Al día
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between py-2">
                                        <span className="text-sm text-muted-foreground">
                                            Propietario
                                        </span>
                                        <span className="text-sm font-medium text-foreground">
                                            María García
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Floating elements */}
                            <div className="animate-slide-in-up absolute -bottom-6 -left-6 rounded-2xl border border-border/50 bg-card p-4 shadow-card">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                        <Shield className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-foreground">
                                            Servicio gratuito
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Para todos los ciudadanos
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
