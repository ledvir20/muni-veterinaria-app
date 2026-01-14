import {
    Clock,
    Facebook,
    Instagram,
    Mail,
    MapPin,
    PawPrint,
    Phone,
    Youtube,
} from 'lucide-react';

export const PublicFooter = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            id="contacto"
            /* CAMBIO CLAVE:
               - Light: Usa bg-foreground (Azul oscuro) y texto blanco.
               - Dark: Usa bg-card (Gris oscuro/negro) con un borde superior sutil.
            */
            className="bg-foreground text-background transition-colors duration-300 dark:border-t dark:border-white/10 dark:bg-card dark:text-foreground"
        >
            {/* Main Footer */}
            <div className="container mx-auto py-12 md:py-16">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <div className="mb-5 flex items-center gap-3">
                            <div className="gradient-primary flex h-11 w-11 items-center justify-center rounded-xl shadow-lg">
                                <PawPrint className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <p className="text-lg font-bold">
                                    VetMunicipal
                                </p>
                                <p className="text-xs opacity-70">Huamanga</p>
                            </div>
                        </div>
                        {/* Usamos opacity en lugar de colores fijos para que funcione en ambos modos */}
                        <p className="mb-6 text-sm leading-relaxed opacity-80">
                            Sistema integral de gestión veterinaria al servicio
                            de la comunidad huamanguina. Cuidamos a tus mascotas
                            con amor y profesionalismo.
                        </p>
                        {/* Social Links */}
                        <div className="flex items-center gap-3">
                            {/* Array de iconos para no repetir código */}
                            {[
                                { icon: Facebook, label: 'Facebook' },
                                { icon: Instagram, label: 'Instagram' },
                                { icon: Youtube, label: 'YouTube' },
                            ].map(({ icon: Icon, label }) => (
                                <a
                                    key={label}
                                    href="#"
                                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-background/10 transition-all duration-200 hover:-translate-y-1 hover:bg-primary hover:text-white dark:bg-white/5"
                                    aria-label={label}
                                >
                                    <Icon className="h-5 w-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="mb-5 text-base font-bold">
                            Enlaces Rápidos
                        </h4>
                        <ul className="space-y-3">
                            {[
                                'Inicio',
                                'Registrar Mascota',
                                'Agendar Cita',
                                'Historial Médico',
                                'Preguntas Frecuentes',
                            ].map((link) => (
                                <li key={link}>
                                    <a
                                        href="#"
                                        className="text-sm opacity-70 transition-colors duration-200 hover:text-primary hover:opacity-100"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="mb-5 text-base font-bold">Servicios</h4>
                        <ul className="space-y-3">
                            {[
                                'Vacunación',
                                'Esterilización',
                                'Desparasitación',
                                'Consultas Generales',
                                'Campañas de Salud',
                            ].map((service) => (
                                <li key={service}>
                                    <a
                                        href="#"
                                        className="text-sm opacity-70 transition-colors duration-200 hover:text-primary hover:opacity-100"
                                    >
                                        {service}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="mb-5 text-base font-bold">Contacto</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                                <span className="text-sm opacity-70">
                                    Jr. 28 de Julio N° 100, Plaza de Armas,
                                    Huamanga - Ayacucho
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-5 w-5 shrink-0 text-primary" />
                                <span className="text-sm opacity-70">
                                    (066) 312-845
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-5 w-5 shrink-0 text-primary" />
                                <span className="text-sm opacity-70">
                                    veterinaria@munihuamanga.gob.pe
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Clock className="h-5 w-5 shrink-0 text-primary" />
                                <span className="text-sm opacity-70">
                                    Lun - Vie: 8:00 AM - 5:00 PM
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            {/* Dark:border-white/10 para separar sutilmente */}
            <div className="border-t border-background/10 dark:border-white/10">
                <div className="container mx-auto py-6">
                    <div className="flex flex-col items-center justify-between gap-4 text-sm opacity-60 md:flex-row">
                        <p>
                            © {currentYear} Municipalidad Provincial de
                            Huamanga. Todos los derechos reservados.
                        </p>
                        <div className="flex items-center gap-6">
                            <a
                                href="#"
                                className="transition-colors duration-200 hover:text-primary hover:opacity-100"
                            >
                                Política de Privacidad
                            </a>
                            <a
                                href="#"
                                className="transition-colors duration-200 hover:text-primary hover:opacity-100"
                            >
                                Términos de Uso
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
