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

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer id="contacto" className="bg-foreground text-background">
            {/* Main Footer */}
            <div className="container mx-auto py-12 md:py-16">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <div className="mb-5 flex items-center gap-3">
                            <div className="gradient-primary flex h-11 w-11 items-center justify-center rounded-xl">
                                <PawPrint className="h-6 w-6 text-primary-foreground" />
                            </div>
                            <div>
                                <p className="text-lg font-bold text-background">
                                    VetMunicipal
                                </p>
                                <p className="text-xs text-background/60">
                                    Huamanga
                                </p>
                            </div>
                        </div>
                        <p className="mb-6 text-sm leading-relaxed text-background/70">
                            Sistema integral de gestión veterinaria al servicio
                            de la comunidad huamanguina. Cuidamos a tus mascotas
                            con amor y profesionalismo.
                        </p>
                        {/* Social Links */}
                        <div className="flex items-center gap-3">
                            <a
                                href="#"
                                className="flex h-10 w-10 items-center justify-center rounded-lg bg-background/10 transition-colors duration-200 hover:bg-primary"
                                aria-label="Facebook"
                            >
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                className="flex h-10 w-10 items-center justify-center rounded-lg bg-background/10 transition-colors duration-200 hover:bg-primary"
                                aria-label="Instagram"
                            >
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                className="flex h-10 w-10 items-center justify-center rounded-lg bg-background/10 transition-colors duration-200 hover:bg-primary"
                                aria-label="YouTube"
                            >
                                <Youtube className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="mb-5 text-base font-bold text-background">
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
                                        className="text-sm text-background/70 transition-colors duration-200 hover:text-primary"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="mb-5 text-base font-bold text-background">
                            Servicios
                        </h4>
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
                                        className="text-sm text-background/70 transition-colors duration-200 hover:text-primary"
                                    >
                                        {service}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="mb-5 text-base font-bold text-background">
                            Contacto
                        </h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                                <span className="text-sm text-background/70">
                                    Jr. 28 de Julio N° 100, Plaza de Armas,
                                    Huamanga - Ayacucho
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-5 w-5 shrink-0 text-primary" />
                                <span className="text-sm text-background/70">
                                    (066) 312-845
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-5 w-5 shrink-0 text-primary" />
                                <span className="text-sm text-background/70">
                                    veterinaria@munihuamanga.gob.pe
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Clock className="h-5 w-5 shrink-0 text-primary" />
                                <span className="text-sm text-background/70">
                                    Lun - Vie: 8:00 AM - 5:00 PM
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-background/10">
                <div className="container mx-auto py-6">
                    <div className="flex flex-col items-center justify-between gap-4 text-sm text-background/60 md:flex-row">
                        <p>
                            © {currentYear} Municipalidad Provincial de
                            Huamanga. Todos los derechos reservados.
                        </p>
                        <div className="flex items-center gap-6">
                            <a
                                href="#"
                                className="transition-colors duration-200 hover:text-primary"
                            >
                                Política de Privacidad
                            </a>
                            <a
                                href="#"
                                className="transition-colors duration-200 hover:text-primary"
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

export default Footer;
