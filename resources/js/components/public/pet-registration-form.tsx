import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
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
    Camera,
    CheckCircle2,
    Heart,
    Mail,
    MapPin,
    PawPrint,
    Phone,
    Shield,
    Trash2,
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

    const removePhoto = () => {
        setFormData((prev) => ({ ...prev, photo: null }));
        setPhotoPreview(null);
    };

    return (
        <form onSubmit={handleSubmit} className="animate-fade-in-up space-y-8">
            {/* --- SECCIÓN 1: DATOS DE LA MASCOTA --- */}
            <Card className="overflow-hidden border border-border/50 bg-card shadow-card dark:border-white/10 dark:bg-card/60 dark:backdrop-blur-sm">
                <div className="border-b border-border/50 bg-muted/20 p-6">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <PawPrint className="h-6 w-6" />
                        </div>
                        <div>
                            <CardTitle className="text-xl">
                                Datos de la Mascota
                            </CardTitle>
                            <CardDescription>
                                Información clínica y general
                            </CardDescription>
                        </div>
                    </div>
                </div>

                <CardContent className="p-6 md:p-8">
                    <div className="grid gap-8 md:grid-cols-12">
                        {/* Columna Izquierda: Foto (Ocupa 4 columnas en desktop) */}
                        <div className="md:col-span-4 lg:col-span-3">
                            <Label className="mb-3 block text-sm font-medium">
                                Foto de perfil
                            </Label>
                            <div className="group relative">
                                <label
                                    htmlFor="photo-upload"
                                    className={`relative flex aspect-square w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 ${
                                        photoPreview
                                            ? 'border-primary/50'
                                            : 'border-muted-foreground/20 hover:border-primary hover:bg-primary/5'
                                    }`}
                                >
                                    {photoPreview ? (
                                        <>
                                            <img
                                                src={photoPreview}
                                                alt="Preview"
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                                                <div className="flex items-center gap-2 font-medium text-white">
                                                    <Camera className="h-5 w-5" />
                                                    <span>Cambiar</span>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex flex-col items-center gap-3 p-4 text-center text-muted-foreground">
                                            <div className="rounded-full bg-background p-3 shadow-sm">
                                                <Upload className="h-6 w-6 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-foreground">
                                                    Sube una foto
                                                </p>
                                                <p className="mt-1 text-xs">
                                                    PNG, JPG (máx. 5MB)
                                                </p>
                                            </div>
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

                                {photoPreview && (
                                    <button
                                        type="button"
                                        onClick={removePhoto}
                                        className="absolute -top-2 -right-2 rounded-full bg-destructive p-1.5 text-white shadow-md transition-colors hover:bg-destructive/90"
                                        title="Eliminar foto"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Columna Derecha: Campos (Ocupa 8 columnas en desktop) */}
                        <div className="grid gap-6 sm:grid-cols-2 md:col-span-8 lg:col-span-9">
                            {/* Nombre */}
                            <div className="space-y-2 sm:col-span-2">
                                <Label htmlFor="petName">
                                    Nombre de la mascota{' '}
                                    <span className="text-primary">*</span>
                                </Label>
                                <Input
                                    id="petName"
                                    placeholder="Ej: Max"
                                    value={formData.petName}
                                    onChange={(e) =>
                                        handleInputChange(
                                            'petName',
                                            e.target.value,
                                        )
                                    }
                                    className="h-11 bg-background/50 focus:bg-background"
                                />
                            </div>

                            {/* Especie */}
                            <div className="space-y-2">
                                <Label>
                                    Especie{' '}
                                    <span className="text-primary">*</span>
                                </Label>
                                <Select
                                    value={formData.species}
                                    onValueChange={(v) =>
                                        handleInputChange('species', v)
                                    }
                                >
                                    <SelectTrigger className="h-11 bg-background/50 focus:bg-background">
                                        <SelectValue placeholder="Seleccionar" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="perro">
                                            🐕 Perro
                                        </SelectItem>
                                        <SelectItem value="gato">
                                            🐈 Gato
                                        </SelectItem>
                                        <SelectItem value="otro">
                                            🐾 Otro
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Raza */}
                            <div className="space-y-2">
                                <Label>Raza</Label>
                                <Select
                                    value={formData.breed}
                                    onValueChange={(v) =>
                                        handleInputChange('breed', v)
                                    }
                                    disabled={!formData.species}
                                >
                                    <SelectTrigger className="h-11 bg-background/50 focus:bg-background">
                                        <SelectValue placeholder="Seleccionar" />
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

                            {/* Edad (Input + Select combinados) */}
                            <div className="space-y-2">
                                <Label>Edad</Label>
                                <div className="flex gap-2">
                                    <Input
                                        type="number"
                                        placeholder="0"
                                        min="0"
                                        value={formData.age}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'age',
                                                e.target.value,
                                            )
                                        }
                                        className="h-11 bg-background/50 focus:bg-background"
                                    />
                                    <Select
                                        value={formData.ageUnit}
                                        onValueChange={(v) =>
                                            handleInputChange('ageUnit', v)
                                        }
                                    >
                                        <SelectTrigger className="h-11 w-28 bg-background/50">
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

                            {/* Sexo */}
                            <div className="space-y-2">
                                <Label>Sexo</Label>
                                <Select
                                    value={formData.gender}
                                    onValueChange={(v) =>
                                        handleInputChange('gender', v)
                                    }
                                >
                                    <SelectTrigger className="h-11 bg-background/50 focus:bg-background">
                                        <SelectValue placeholder="Seleccionar" />
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

                            {/* Chips de Detalles (Color, Peso, Microchip) */}
                            <div className="grid grid-cols-1 gap-4 pt-2 sm:col-span-2 sm:grid-cols-3">
                                <div className="space-y-2">
                                    <Label htmlFor="color">Color</Label>
                                    <Input
                                        id="color"
                                        placeholder="Ej: Negro"
                                        value={formData.color}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'color',
                                                e.target.value,
                                            )
                                        }
                                        className="bg-background/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="weight">Peso (kg)</Label>
                                    <Input
                                        id="weight"
                                        type="number"
                                        step="0.1"
                                        placeholder="0.0"
                                        value={formData.weight}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'weight',
                                                e.target.value,
                                            )
                                        }
                                        className="bg-background/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="microchip">Microchip</Label>
                                    <Input
                                        id="microchip"
                                        placeholder="Opcional"
                                        value={formData.microchip}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'microchip',
                                                e.target.value,
                                            )
                                        }
                                        className="bg-background/50"
                                    />
                                </div>
                            </div>

                            {/* Estado de Salud */}
                            <div className="grid grid-cols-1 gap-4 rounded-xl border border-border/50 bg-background/30 p-4 sm:col-span-2 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2">
                                        <Heart className="h-4 w-4 text-primary" />{' '}
                                        Esterilizado
                                    </Label>
                                    <Select
                                        value={formData.sterilized}
                                        onValueChange={(v) =>
                                            handleInputChange('sterilized', v)
                                        }
                                    >
                                        <SelectTrigger className="bg-background">
                                            <SelectValue placeholder="Seleccionar" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="si">
                                                Sí
                                            </SelectItem>
                                            <SelectItem value="no">
                                                No
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2">
                                        <Shield className="h-4 w-4 text-accent" />{' '}
                                        Vacunación
                                    </Label>
                                    <Select
                                        value={formData.vaccinated}
                                        onValueChange={(v) =>
                                            handleInputChange('vaccinated', v)
                                        }
                                    >
                                        <SelectTrigger className="bg-background">
                                            <SelectValue placeholder="Seleccionar" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="si">
                                                Completa
                                            </SelectItem>
                                            <SelectItem value="parcial">
                                                Parcial
                                            </SelectItem>
                                            <SelectItem value="no">
                                                No
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Observaciones */}
                            <div className="space-y-2 sm:col-span-2">
                                <Label htmlFor="observations">
                                    Observaciones
                                </Label>
                                <Textarea
                                    id="observations"
                                    placeholder="Detalles médicos, alergias, comportamiento..."
                                    className="min-h-25 resize-y bg-background/50"
                                    value={formData.observations}
                                    onChange={(e) =>
                                        handleInputChange(
                                            'observations',
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* --- SECCIÓN 2: DATOS DEL PROPIETARIO --- */}
            <Card className="overflow-hidden border border-border/50 bg-card shadow-card dark:border-white/10 dark:bg-card/60 dark:backdrop-blur-sm">
                <div className="border-b border-border/50 bg-muted/20 p-6">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary-foreground">
                            <User className="h-6 w-6" />
                        </div>
                        <div>
                            <CardTitle className="text-xl">
                                Datos del Propietario
                            </CardTitle>
                            <CardDescription>
                                Responsable legal de la mascota
                            </CardDescription>
                        </div>
                    </div>
                </div>

                <CardContent className="p-6 md:p-8">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {/* Nombre */}
                        <div className="space-y-2 lg:col-span-2">
                            <Label htmlFor="ownerName">
                                Nombre Completo{' '}
                                <span className="text-primary">*</span>
                            </Label>
                            <div className="relative">
                                <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    id="ownerName"
                                    className="h-11 bg-background/50 pl-10"
                                    placeholder="Nombres y Apellidos"
                                    value={formData.ownerName}
                                    onChange={(e) =>
                                        handleInputChange(
                                            'ownerName',
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                        </div>

                        {/* DNI */}
                        <div className="space-y-2">
                            <Label htmlFor="ownerDni">
                                DNI <span className="text-primary">*</span>
                            </Label>
                            <div className="relative">
                                <Shield className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    id="ownerDni"
                                    maxLength={8}
                                    className="h-11 bg-background/50 pl-10"
                                    placeholder="8 dígitos"
                                    value={formData.ownerDni}
                                    onChange={(e) =>
                                        handleInputChange(
                                            'ownerDni',
                                            e.target.value.replace(/\D/g, ''),
                                        )
                                    }
                                />
                            </div>
                        </div>

                        {/* Teléfono */}
                        <div className="space-y-2">
                            <Label htmlFor="ownerPhone">Teléfono</Label>
                            <div className="relative">
                                <Phone className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    id="ownerPhone"
                                    className="h-11 bg-background/50 pl-10"
                                    placeholder="999 999 999"
                                    value={formData.ownerPhone}
                                    onChange={(e) =>
                                        handleInputChange(
                                            'ownerPhone',
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="ownerEmail">
                                Correo Electrónico
                            </Label>
                            <div className="relative">
                                <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    id="ownerEmail"
                                    type="email"
                                    className="h-11 bg-background/50 pl-10"
                                    placeholder="ejemplo@correo.com"
                                    value={formData.ownerEmail}
                                    onChange={(e) =>
                                        handleInputChange(
                                            'ownerEmail',
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                        </div>

                        {/* Distrito */}
                        <div className="space-y-2">
                            <Label>Distrito</Label>
                            <Select
                                value={formData.ownerDistrict}
                                onValueChange={(v) =>
                                    handleInputChange('ownerDistrict', v)
                                }
                            >
                                <SelectTrigger className="relative h-11 bg-background/50 pl-10">
                                    <MapPin className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <SelectValue placeholder="Seleccionar" />
                                </SelectTrigger>
                                <SelectContent>
                                    {districts.map((d) => (
                                        <SelectItem
                                            key={d}
                                            value={d.toLowerCase()}
                                        >
                                            {d}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Dirección */}
                        <div className="space-y-2 md:col-span-2 lg:col-span-3">
                            <Label htmlFor="ownerAddress">Dirección</Label>
                            <Input
                                id="ownerAddress"
                                className="h-11 bg-background/50"
                                placeholder="Av. Principal 123, Referencia..."
                                value={formData.ownerAddress}
                                onChange={(e) =>
                                    handleInputChange(
                                        'ownerAddress',
                                        e.target.value,
                                    )
                                }
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* --- BOTONES --- */}
            <div className="flex flex-col-reverse justify-end gap-4 pt-4 sm:flex-row">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                        setFormData(initialFormData);
                        setPhotoPreview(null);
                    }}
                    className="h-12 border-border/50 px-8"
                >
                    Limpiar
                </Button>
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="gradient-primary shadow-soft hover:shadow-glow h-12 px-8 text-white transition-all"
                >
                    {isSubmitting ? (
                        <>
                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                            Procesando...
                        </>
                    ) : (
                        <>
                            <CheckCircle2 className="mr-2 h-5 w-5" />
                            Registrar Mascota
                        </>
                    )}
                </Button>
            </div>
        </form>
    );
}
