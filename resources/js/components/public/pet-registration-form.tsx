import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import {
    CheckCircle2,
    FileText,
    Heart,
    Mail,
    MapPin,
    PawPrint,
    Phone,
    Shield,
    Upload,
    User,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface PetFormData {
    // Datos de la mascota
    petName: string;
    species: string;
    breed: string;
    age: string;
    ageUnit: string;
    gender: string;
    color: string;
    weight: string;
    microchip: string;
    sterilized: string;
    vaccinated: string;
    observations: string;
    photo: File | null;

    // Datos del propietario
    ownerName: string;
    ownerDni: string;
    ownerPhone: string;
    ownerEmail: string;
    ownerAddress: string;
    ownerDistrict: string;
}

const initialFormData: PetFormData = {
    petName: '',
    species: '',
    breed: '',
    age: '',
    ageUnit: 'años',
    gender: '',
    color: '',
    weight: '',
    microchip: '',
    sterilized: '',
    vaccinated: '',
    observations: '',
    photo: null,
    ownerName: '',
    ownerDni: '',
    ownerPhone: '',
    ownerEmail: '',
    ownerAddress: '',
    ownerDistrict: '',
};

const districts = [
    'Ayacucho',
    'Carmen Alto',
    'San Juan Bautista',
    'Jesús Nazareno',
    'Andrés Avelino Cáceres',
    'Pacaycasa',
    'Quinua',
    'Acos Vinchos',
    'Tambillo',
    'Chiara',
    'Socos',
    'Ocros',
    'Santiago de Pischa',
    'San José de Ticllas',
    'Acocro',
    'Vinchos',
];

const dogBreeds = [
    'Mestizo',
    'Labrador Retriever',
    'Pastor Alemán',
    'Golden Retriever',
    'Bulldog',
    'Poodle',
    'Chihuahua',
    'Husky Siberiano',
    'Rottweiler',
    'Boxer',
    'Otro',
];

const catBreeds = [
    'Mestizo',
    'Persa',
    'Siamés',
    'Maine Coon',
    'Angora',
    'Británico de Pelo Corto',
    'Bengalí',
    'Ragdoll',
    'Otro',
];

export default function PetRegistrationForm() {
    const [formData, setFormData] = useState<PetFormData>(initialFormData);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (field: keyof PetFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error('La imagen no debe superar los 5MB');
                return;
            }
            setFormData((prev) => ({ ...prev, photo: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validación básica
        if (
            !formData.petName ||
            !formData.species ||
            !formData.ownerName ||
            !formData.ownerDni
        ) {
            toast.error('Por favor, completa los campos obligatorios.');
            return;
        }

        setIsSubmitting(true);

        // Simular envío
        await new Promise((resolve) => setTimeout(resolve, 1500));

        toast.success('¡Mascota registrada con éxito!');

        setFormData(initialFormData);
        setPhotoPreview(null);
        setIsSubmitting(false);
    };

    const getBreeds = () => {
        switch (formData.species) {
            case 'perro':
                return dogBreeds;
            case 'gato':
                return catBreeds;
            default:
                return ['Mestizo', 'Otro'];
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Datos de la Mascota */}
            <Card className="shadow-elegant border-primary/20">
                <CardHeader className="rounded-t-lg bg-linear-to-r from-primary/5 to-secondary/5">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-primary/10 p-2">
                            <PawPrint className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <CardTitle className="text-xl text-foreground">
                                Datos de la Mascota
                            </CardTitle>
                            <CardDescription>
                                Información general de la mascota a registrar
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {/* Foto */}
                        <div className="md:col-span-2 lg:col-span-1 lg:row-span-3">
                            <Label className="text-sm font-medium text-foreground">
                                Foto de la mascota
                            </Label>
                            <div className="mt-2">
                                <label
                                    htmlFor="photo-upload"
                                    className="flex h-48 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-muted-foreground/25 transition-all duration-300 hover:border-primary/50 hover:bg-primary/5"
                                >
                                    {photoPreview ? (
                                        <img
                                            src={photoPreview}
                                            alt="Preview"
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                            <Upload className="h-10 w-10" />
                                            <span className="text-sm">
                                                Subir imagen
                                            </span>
                                            <span className="text-xs">
                                                PNG, JPG (máx. 5MB)
                                            </span>
                                        </div>
                                    )}
                                </label>
                                <input
                                    id="photo-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhotoChange}
                                    className="hidden"
                                />
                            </div>
                        </div>

                        {/* Nombre */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="petName"
                                className="text-sm font-medium text-foreground"
                            >
                                Nombre de la mascota{' '}
                                <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="petName"
                                placeholder="Ej: Max, Luna, Pelusa..."
                                value={formData.petName}
                                onChange={(e) =>
                                    handleInputChange('petName', e.target.value)
                                }
                                className="border-muted-foreground/25 focus:border-primary"
                            />
                        </div>

                        {/* Especie */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-foreground">
                                Especie{' '}
                                <span className="text-destructive">*</span>
                            </Label>
                            <Select
                                value={formData.species}
                                onValueChange={(v) =>
                                    handleInputChange('species', v)
                                }
                            >
                                <SelectTrigger className="border-muted-foreground/25 focus:border-primary">
                                    <SelectValue placeholder="Seleccionar especie" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="perro">
                                        🐕 Perro
                                    </SelectItem>
                                    <SelectItem value="gato">
                                        🐈 Gato
                                    </SelectItem>
                                    <SelectItem value="ave">🐦 Ave</SelectItem>
                                    <SelectItem value="roedor">
                                        🐹 Roedor
                                    </SelectItem>
                                    <SelectItem value="otro">
                                        📋 Otro
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Raza */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-foreground">
                                Raza
                            </Label>
                            <Select
                                value={formData.breed}
                                onValueChange={(v) =>
                                    handleInputChange('breed', v)
                                }
                                disabled={!formData.species}
                            >
                                <SelectTrigger className="border-muted-foreground/25 focus:border-primary">
                                    <SelectValue placeholder="Seleccionar raza" />
                                </SelectTrigger>
                                <SelectContent>
                                    {getBreeds().map((breed) => (
                                        <SelectItem
                                            key={breed}
                                            value={breed.toLowerCase()}
                                        >
                                            {breed}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Edad */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-foreground">
                                Edad
                            </Label>
                            <div className="flex gap-2">
                                <Input
                                    type="number"
                                    placeholder="Edad"
                                    min="0"
                                    value={formData.age}
                                    onChange={(e) =>
                                        handleInputChange('age', e.target.value)
                                    }
                                    className="flex-1 border-muted-foreground/25 focus:border-primary"
                                />
                                <Select
                                    value={formData.ageUnit}
                                    onValueChange={(v) =>
                                        handleInputChange('ageUnit', v)
                                    }
                                >
                                    <SelectTrigger className="w-24 border-muted-foreground/25">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="meses">
                                            Meses
                                        </SelectItem>
                                        <SelectItem value="años">
                                            Años
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Género */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-foreground">
                                Sexo
                            </Label>
                            <Select
                                value={formData.gender}
                                onValueChange={(v) =>
                                    handleInputChange('gender', v)
                                }
                            >
                                <SelectTrigger className="border-muted-foreground/25 focus:border-primary">
                                    <SelectValue placeholder="Seleccionar sexo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="macho">
                                        ♂ Macho
                                    </SelectItem>
                                    <SelectItem value="hembra">
                                        ♀ Hembra
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Color */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="color"
                                className="text-sm font-medium text-foreground"
                            >
                                Color
                            </Label>
                            <Input
                                id="color"
                                placeholder="Ej: Blanco, Negro, Marrón..."
                                value={formData.color}
                                onChange={(e) =>
                                    handleInputChange('color', e.target.value)
                                }
                                className="border-muted-foreground/25 focus:border-primary"
                            />
                        </div>

                        {/* Peso */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="weight"
                                className="text-sm font-medium text-foreground"
                            >
                                Peso (kg)
                            </Label>
                            <Input
                                id="weight"
                                type="number"
                                step="0.1"
                                min="0"
                                placeholder="Ej: 5.5"
                                value={formData.weight}
                                onChange={(e) =>
                                    handleInputChange('weight', e.target.value)
                                }
                                className="border-muted-foreground/25 focus:border-primary"
                            />
                        </div>

                        {/* Microchip */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="microchip"
                                className="text-sm font-medium text-foreground"
                            >
                                Nº Microchip
                            </Label>
                            <Input
                                id="microchip"
                                placeholder="Código de microchip (si tiene)"
                                value={formData.microchip}
                                onChange={(e) =>
                                    handleInputChange(
                                        'microchip',
                                        e.target.value,
                                    )
                                }
                                className="border-muted-foreground/25 focus:border-primary"
                            />
                        </div>

                        {/* Esterilizado */}
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                                <Heart className="h-4 w-4 text-primary" />
                                ¿Está esterilizado/a?
                            </Label>
                            <Select
                                value={formData.sterilized}
                                onValueChange={(v) =>
                                    handleInputChange('sterilized', v)
                                }
                            >
                                <SelectTrigger className="border-muted-foreground/25 focus:border-primary">
                                    <SelectValue placeholder="Seleccionar" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="si">Sí</SelectItem>
                                    <SelectItem value="no">No</SelectItem>
                                    <SelectItem value="desconocido">
                                        Desconocido
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Vacunado */}
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2 text-sm font-medium text-foreground">
                                <Shield className="h-4 w-4 text-secondary" />
                                ¿Vacunas al día?
                            </Label>
                            <Select
                                value={formData.vaccinated}
                                onValueChange={(v) =>
                                    handleInputChange('vaccinated', v)
                                }
                            >
                                <SelectTrigger className="border-muted-foreground/25 focus:border-primary">
                                    <SelectValue placeholder="Seleccionar" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="si">Sí</SelectItem>
                                    <SelectItem value="no">No</SelectItem>
                                    <SelectItem value="parcial">
                                        Parcialmente
                                    </SelectItem>
                                    <SelectItem value="desconocido">
                                        Desconocido
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Observaciones */}
                        <div className="space-y-2 md:col-span-2 lg:col-span-3">
                            <Label
                                htmlFor="observations"
                                className="flex items-center gap-2 text-sm font-medium text-foreground"
                            >
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                Observaciones adicionales
                            </Label>
                            <Textarea
                                id="observations"
                                placeholder="Información adicional sobre la mascota: condiciones médicas, comportamiento, necesidades especiales..."
                                value={formData.observations}
                                onChange={(e) =>
                                    handleInputChange(
                                        'observations',
                                        e.target.value,
                                    )
                                }
                                className="min-h-25 border-muted-foreground/25 focus:border-primary"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Datos del Propietario */}
            <Card className="shadow-elegant border-secondary/20">
                <CardHeader className="rounded-t-lg bg-linear-to-r from-secondary/5 to-primary/5">
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-secondary/10 p-2">
                            <User className="h-6 w-6 text-secondary" />
                        </div>
                        <div>
                            <CardTitle className="text-xl text-foreground">
                                Datos del Propietario
                            </CardTitle>
                            <CardDescription>
                                Información de contacto del responsable de la
                                mascota
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {/* Nombre completo */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="ownerName"
                                className="text-sm font-medium text-foreground"
                            >
                                Nombre completo{' '}
                                <span className="text-destructive">*</span>
                            </Label>
                            <div className="relative">
                                <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    id="ownerName"
                                    placeholder="Nombres y apellidos"
                                    value={formData.ownerName}
                                    onChange={(e) =>
                                        handleInputChange(
                                            'ownerName',
                                            e.target.value,
                                        )
                                    }
                                    className="border-muted-foreground/25 pl-10 focus:border-secondary"
                                />
                            </div>
                        </div>

                        {/* DNI */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="ownerDni"
                                className="text-sm font-medium text-foreground"
                            >
                                DNI <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="ownerDni"
                                placeholder="Número de DNI"
                                maxLength={8}
                                value={formData.ownerDni}
                                onChange={(e) =>
                                    handleInputChange(
                                        'ownerDni',
                                        e.target.value.replace(/\D/g, ''),
                                    )
                                }
                                className="border-muted-foreground/25 focus:border-secondary"
                            />
                        </div>

                        {/* Teléfono */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="ownerPhone"
                                className="text-sm font-medium text-foreground"
                            >
                                Teléfono de contacto
                            </Label>
                            <div className="relative">
                                <Phone className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    id="ownerPhone"
                                    placeholder="Ej: 987 654 321"
                                    value={formData.ownerPhone}
                                    onChange={(e) =>
                                        handleInputChange(
                                            'ownerPhone',
                                            e.target.value,
                                        )
                                    }
                                    className="border-muted-foreground/25 pl-10 focus:border-secondary"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="ownerEmail"
                                className="text-sm font-medium text-foreground"
                            >
                                Correo electrónico
                            </Label>
                            <div className="relative">
                                <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    id="ownerEmail"
                                    type="email"
                                    placeholder="correo@ejemplo.com"
                                    value={formData.ownerEmail}
                                    onChange={(e) =>
                                        handleInputChange(
                                            'ownerEmail',
                                            e.target.value,
                                        )
                                    }
                                    className="border-muted-foreground/25 pl-10 focus:border-secondary"
                                />
                            </div>
                        </div>

                        {/* Distrito */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-foreground">
                                Distrito
                            </Label>
                            <Select
                                value={formData.ownerDistrict}
                                onValueChange={(v) =>
                                    handleInputChange('ownerDistrict', v)
                                }
                            >
                                <SelectTrigger className="border-muted-foreground/25 focus:border-secondary">
                                    <SelectValue placeholder="Seleccionar distrito" />
                                </SelectTrigger>
                                <SelectContent>
                                    {districts.map((district) => (
                                        <SelectItem
                                            key={district}
                                            value={district.toLowerCase()}
                                        >
                                            {district}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Dirección */}
                        <div className="space-y-2 md:col-span-2 lg:col-span-1">
                            <Label
                                htmlFor="ownerAddress"
                                className="text-sm font-medium text-foreground"
                            >
                                Dirección
                            </Label>
                            <div className="relative">
                                <MapPin className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    id="ownerAddress"
                                    placeholder="Calle, número, referencia..."
                                    value={formData.ownerAddress}
                                    onChange={(e) =>
                                        handleInputChange(
                                            'ownerAddress',
                                            e.target.value,
                                        )
                                    }
                                    className="border-muted-foreground/25 pl-10 focus:border-secondary"
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Botones de acción */}
            <div className="flex flex-col justify-end gap-4 sm:flex-row">
                <Button
                    type="button"
                    variant="outline"
                    className="sm:w-auto"
                    onClick={() => {
                        setFormData(initialFormData);
                        setPhotoPreview(null);
                    }}
                >
                    Limpiar formulario
                </Button>
                <Button
                    type="submit"
                    className="bg-gradient-primary gap-2 text-white hover:opacity-90 sm:w-auto"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                            Registrando...
                        </>
                    ) : (
                        <>
                            <CheckCircle2 className="h-4 w-4" />
                            Registrar Mascota
                        </>
                    )}
                </Button>
            </div>
        </form>
    );
}
