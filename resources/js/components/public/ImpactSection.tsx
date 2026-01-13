import { Award, Heart, MapPin, TrendingUp } from 'lucide-react';

const stats = [
    {
        icon: TrendingUp,
        value: '5,247',
        label: 'Mascotas Registradas',
        description: 'En toda la provincia',
    },
    {
        icon: Heart,
        value: '12,890',
        label: 'Atenciones Realizadas',
        description: 'Durante el último año',
    },
    {
        icon: Award,
        value: '98%',
        label: 'Satisfacción',
        description: 'De los usuarios',
    },
    {
        icon: MapPin,
        value: '15',
        label: 'Distritos Atendidos',
        description: 'Cobertura provincial',
    },
];

const testimonials = [
    {
        quote: 'Gracias al sistema pude registrar a mi perrita Luna y ahora recibo recordatorios de sus vacunas. ¡Excelente servicio!',
        author: 'Ana Quispe',
        role: 'Vecina de San Juan Bautista',
        avatar: 'AQ',
    },
    {
        quote: 'La atención veterinaria municipal ha sido fundamental para cuidar la salud de mis mascotas. Muy agradecida.',
        author: 'Carlos Huamán',
        role: 'Vecino de Ayacucho',
        avatar: 'CH',
    },
    {
        quote: 'El sistema de citas online me ahorra mucho tiempo. Ya no tengo que hacer largas colas para atender a mi gato.',
        author: 'Rosa Mendoza',
        role: 'Vecina de Carmen Alto',
        avatar: 'RM',
    },
];

const ImpactSection = () => {
    return (
        <section
            id="nosotros"
            /* CAMBIO: bg-secondary/20 en lugar de muted para un tono más agradable */
            className="relative overflow-hidden bg-secondary/20 py-20 md:py-28 dark:bg-secondary/5"
        >
            {/* Background pattern */}
            <div className="pointer-events-none absolute inset-0 opacity-50 dark:opacity-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,hsl(var(--primary)/0.15)_1px,transparent_0)] bg-size-[40px_40px]" />
            </div>

            <div className="relative z-10 container mx-auto">
                {/* Section Header */}
                <div className="mx-auto mb-16 max-w-3xl text-center">
                    <span className="mb-4 inline-block rounded-full bg-background px-4 py-1.5 text-sm font-medium text-foreground shadow-sm">
                        Nuestro Impacto
                    </span>
                    <h2 className="mb-6 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
                        Transformando el{' '}
                        <span className="text-primary">bienestar animal</span>{' '}
                        en Huamanga
                    </h2>
                    <p className="text-base text-muted-foreground md:text-lg">
                        Desde su implementación, el Sistema Veterinario
                        Municipal ha marcado la diferencia en la vida de miles
                        de mascotas y sus familias.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="mb-20 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={stat.label}
                                /* CAMBIO: Estilo "Glass" consistente con el resto de la web */
                                className="group hover:shadow-glow rounded-2xl border border-border/50 bg-card p-5 text-center shadow-card transition-all duration-300 hover:-translate-y-1 md:p-6 dark:border-white/10 dark:bg-card/60 dark:backdrop-blur-sm"
                            >
                                <div className="gradient-primary shadow-soft mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110">
                                    <Icon className="h-6 w-6 text-primary-foreground" />
                                </div>
                                <p className="mb-1 text-2xl font-bold text-primary md:text-3xl lg:text-4xl">
                                    {stat.value}
                                </p>
                                <p className="mb-1 text-sm font-semibold text-foreground md:text-base">
                                    {stat.label}
                                </p>
                                <p className="text-xs text-muted-foreground md:text-sm">
                                    {stat.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Testimonials */}
                <div className="mx-auto max-w-5xl">
                    <h3 className="mb-10 text-center text-xl font-bold text-foreground md:text-2xl">
                        Lo que dicen nuestros usuarios
                    </h3>

                    <div className="grid gap-6 md:grid-cols-3">
                        {testimonials.map((testimonial) => (
                            <div
                                key={testimonial.author}
                                /* CAMBIO: Mismo tratamiento Glass para los testimonios */
                                className="rounded-2xl border border-border/50 bg-card p-6 shadow-card transition-all duration-300 hover:border-primary/30 hover:shadow-md dark:border-white/10 dark:bg-card/60 dark:backdrop-blur-sm"
                            >
                                {/* Quote */}
                                <p className="mb-6 text-sm leading-relaxed text-muted-foreground italic md:text-base">
                                    "{testimonial.quote}"
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-3">
                                    <div className="gradient-accent flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-accent-foreground shadow-sm">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-foreground">
                                            {testimonial.author}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {testimonial.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ImpactSection;
