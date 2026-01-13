import {
    Bell,
    Calendar,
    ClipboardList,
    PawPrint,
    Stethoscope,
    Users,
} from 'lucide-react';

const features = [
    {
        icon: PawPrint,
        title: 'Registro de Mascotas',
        description:
            'Registra a tus mascotas con información completa: raza, edad, vacunas y datos del propietario en un solo lugar.',
        color: 'primary',
    },
    {
        icon: ClipboardList,
        title: 'Historial Veterinario',
        description:
            'Accede al historial médico completo de tu mascota: consultas, tratamientos, vacunas y cirugías.',
        color: 'accent',
    },
    {
        icon: Calendar,
        title: 'Gestión de Citas',
        description:
            'Programa citas veterinarias fácilmente. Recibe recordatorios y gestiona tus reservas en línea.',
        color: 'primary',
    },
    {
        icon: Users,
        title: 'Administración de Usuarios',
        description:
            'Portal para propietarios con acceso seguro a información de mascotas y servicios municipales.',
        color: 'accent',
    },
    {
        icon: Stethoscope,
        title: 'Atención Veterinaria',
        description:
            'Consultas veterinarias profesionales con seguimiento personalizado para cada mascota.',
        color: 'primary',
    },
    {
        icon: Bell,
        title: 'Notificaciones',
        description:
            'Alertas automáticas para vacunas pendientes, citas próximas y campañas de salud animal.',
        color: 'accent',
    },
];

const FeaturesSection = () => {
    return (
        <section
            id="servicios"
            className="relative bg-background py-20 md:py-28"
        >
            {/* Decorative background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-primary/3 blur-3xl" />
                <div className="absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-accent/3 blur-3xl" />
            </div>

            <div className="relative z-10 container mx-auto">
                {/* Section Header */}
                <div className="mx-auto mb-16 max-w-3xl text-center">
                    <span className="mb-4 inline-block rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">
                        Nuestros Servicios
                    </span>
                    <h2 className="mb-6 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
                        Todo lo que necesitas para el{' '}
                        <span className="text-primary">
                            cuidado de tu mascota
                        </span>
                    </h2>
                    <p className="text-base text-muted-foreground md:text-lg">
                        El Sistema de Gestión Veterinaria Municipal ofrece
                        herramientas completas para el bienestar animal en
                        Huamanga.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        const isPrimary = feature.color === 'primary';

                        return (
                            <div
                                key={feature.title}
                                className="group hover:shadow-glow relative rounded-2xl border border-border/50 bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 md:p-8"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* Icon */}
                                <div
                                    className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${
                                        isPrimary
                                            ? 'gradient-primary shadow-soft'
                                            : 'gradient-accent shadow-soft'
                                    }`}
                                >
                                    <Icon className="h-7 w-7 text-primary-foreground" />
                                </div>

                                {/* Content */}
                                <h3 className="mb-3 text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                                    {feature.title}
                                </h3>
                                <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                                    {feature.description}
                                </p>

                                {/* Hover indicator */}
                                <div className="absolute right-0 bottom-0 left-0 h-1 rounded-b-2xl bg-linear-to-r from-primary to-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
