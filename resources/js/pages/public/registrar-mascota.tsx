import PetRegistrationForm from '@/components/public/pet-registration-form';
import { Button } from '@/components/ui/button';
import { PublicLayout } from '@/layouts/public-layout';
import { home } from '@/routes';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, PawPrint, ShieldCheck } from 'lucide-react';

export default function RegistrarMascota() {
    return (
        <>
            <Head>
                <title>Registrar Mascota | VetMuni Huamanga</title>
                <meta
                    name="description"
                    content="Registra tu mascota en el Sistema de Gestión Veterinaria Municipal de la Municipalidad Provincial de Huamanga."
                />
            </Head>

            <PublicLayout>
                <main className="flex-1 bg-background">
                    {/* Header Section con Decoración */}
                    <section className="relative overflow-hidden pt-8 pb-12 md:pt-12 md:pb-16">
                        {/* Elementos decorativos de fondo (Igual que el Hero) */}
                        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-50">
                            <div className="absolute top-0 -left-10 h-64 w-64 rounded-full bg-primary/5 blur-3xl dark:bg-primary/10" />
                            <div className="absolute top-10 right-0 h-64 w-64 rounded-full bg-accent/5 blur-3xl dark:bg-accent/10" />
                        </div>

                        <div className="relative z-10 container mx-auto px-4">
                            {/* Botón Volver */}
                            <Link href={home()}>
                                <Button
                                    variant="ghost"
                                    className="group mb-6 pl-0 text-muted-foreground hover:bg-transparent hover:text-primary"
                                >
                                    <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full border border-border/50 bg-background transition-colors group-hover:border-primary">
                                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                                    </div>
                                    Volver al inicio
                                </Button>
                            </Link>

                            {/* Título y Descripción */}
                            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                                <div className="flex items-start gap-5">
                                    <div className="gradient-primary shadow-soft flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl">
                                        <PawPrint className="h-8 w-8 text-primary-foreground" />
                                    </div>
                                    <div>
                                        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                                            Registro de Mascota
                                        </h1>
                                        <p className="mt-2 max-w-xl text-lg text-muted-foreground">
                                            Complete el formulario para obtener
                                            el DNI de su mascota y acceder a los
                                            beneficios municipales.
                                        </p>
                                    </div>
                                </div>

                                {/* Badge informativo */}
                                <div className="hidden rounded-2xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm md:block">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-full bg-accent/10 p-2 text-accent">
                                            <ShieldCheck className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold">
                                                Trámite Gratuito
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Validación inmediata
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Form Section */}
                    <section className="pb-20">
                        <div className="container mx-auto max-w-5xl px-4">
                            <PetRegistrationForm />
                        </div>
                    </section>
                </main>
            </PublicLayout>
        </>
    );
}
