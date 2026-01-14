import PetRegistrationForm from '@/components/public/pet-registration-form';
import { Button } from '@/components/ui/button';
import { PublicLayout } from '@/layouts/public-layout';
import { home } from '@/routes';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, PawPrint } from 'lucide-react';

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
                <main className="flex-1">
                    {/* Hero Section */}
                    <section className="bg-linear-to-br from-primary/10 via-background to-secondary/10 py-8 md:py-12">
                        <div className="container mx-auto px-4">
                            <Link href={home()}>
                                <Button
                                    variant="ghost"
                                    className="mb-4 gap-2 text-muted-foreground hover:text-foreground"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Volver al inicio
                                </Button>
                            </Link>
                            <div className="mb-2 flex items-center gap-4">
                                <div className="rounded-xl bg-primary/10 p-3">
                                    <PawPrint className="h-8 w-8 text-primary" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
                                        Registro de Nueva Mascota
                                    </h1>
                                    <p className="mt-1 text-muted-foreground">
                                        Complete el formulario para registrar a
                                        su mascota en el sistema municipal
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Form Section */}
                    <section className="py-8 md:py-12">
                        <div className="container mx-auto max-w-5xl px-4">
                            <PetRegistrationForm />
                        </div>
                    </section>
                </main>
            </PublicLayout>
        </>
    );
}
