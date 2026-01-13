import InputError from '@/components/input-error';
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
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { Switch } from '@/components/ui/switch'; // Usamos Switch
import { Textarea } from '@/components/ui/textarea'; // Usamos tu componente Textarea
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Form, Head, Link } from '@inertiajs/react';

import TaskController from '@/actions/App/Http/Controllers/TaskController';
import { create, index } from '@/routes/tasks';
import { Activity, ArrowLeft, FilePlus2, FileText } from 'lucide-react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Tasks', href: index().url },
    { title: 'Create', href: create().url },
];

export default function TasksCreate() {
    const handleSuccess = () => {
        toast.success('¡Tarea creada con éxito!');
    };

    const handleError = () => {
        toast.error('Error al crear la tarea. Verifica los campos.');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Tarea" />

            <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Encabezado de Página */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">
                            Crear nueva tarea
                        </h1>
                        <p className="mt-1 text-muted-foreground">
                            Define los detalles para añadir una nueva tarea al
                            sistema.
                        </p>
                    </div>

                    <Button variant="outline" asChild size="sm">
                        <Link href={index().url}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Volver al listado
                        </Link>
                    </Button>
                </div>

                {/* Formulario Inertia v2 */}
                <Form
                    {...TaskController.store.form()}
                    disableWhileProcessing
                    onSuccess={handleSuccess}
                    onError={handleError}
                    className="space-y-8"
                >
                    {({ processing, errors }) => (
                        <div className="grid gap-8 md:grid-cols-3">
                            {/* --- COLUMNA PRINCIPAL (Izquierda - Detalles) --- */}
                            <div className="space-y-6 md:col-span-2">
                                <Card className="border-border/60 shadow-sm">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-xl">
                                            <div className="rounded-md bg-blue-100 p-2 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                                <FileText className="h-5 w-5" />
                                            </div>
                                            Información General
                                        </CardTitle>
                                        <CardDescription>
                                            Detalles descriptivos de la tarea a
                                            realizar.
                                        </CardDescription>
                                    </CardHeader>
                                    <Separator />
                                    <CardContent className="grid gap-6 p-6">
                                        {/* Título */}
                                        <div className="space-y-2">
                                            <Label htmlFor="title">
                                                Título{' '}
                                                <span className="text-destructive">
                                                    *
                                                </span>
                                            </Label>
                                            <Input
                                                id="title"
                                                name="title"
                                                placeholder="Ej. Realizar mantenimiento del servidor"
                                                autoFocus
                                                className="h-11"
                                            />
                                            <InputError
                                                message={errors.title}
                                            />
                                        </div>

                                        {/* Descripción */}
                                        <div className="space-y-2">
                                            <Label htmlFor="description">
                                                Descripción
                                            </Label>
                                            <Textarea
                                                id="description"
                                                name="description"
                                                placeholder="Detalla los pasos necesarios para completar esta tarea..."
                                                className="min-h-37.5 resize-y"
                                            />
                                            <InputError
                                                message={errors.description}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* --- COLUMNA LATERAL (Derecha - Configuración) --- */}
                            <div className="space-y-6">
                                <Card className="h-fit border-border/60 shadow-sm">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-lg">
                                            <Activity className="h-5 w-5 text-muted-foreground" />
                                            Configuración
                                        </CardTitle>
                                    </CardHeader>
                                    <Separator />
                                    <CardContent className="p-6">
                                        {/* Switch Activo */}
                                        <div className="flex flex-row items-center justify-between rounded-lg border bg-muted/20 p-4 shadow-sm">
                                            <div className="space-y-0.5">
                                                <Label
                                                    htmlFor="is_active"
                                                    className="cursor-pointer text-base font-medium"
                                                >
                                                    Activar Tarea
                                                </Label>
                                                <p className="text-xs text-muted-foreground">
                                                    Visible inmediatamente
                                                </p>
                                            </div>

                                            {/* Input Hidden para enviar '0' si el switch está apagado */}
                                            <input
                                                type="hidden"
                                                name="is_active"
                                                value="0"
                                            />

                                            <Switch
                                                id="is_active"
                                                name="is_active"
                                                value="1"
                                                defaultChecked={true} // Por defecto activado al crear
                                            />
                                        </div>
                                        <InputError
                                            message={errors.is_active}
                                            className="mt-2"
                                        />
                                    </CardContent>
                                </Card>

                                {/* Botones de Acción */}
                                <div className="flex flex-col gap-3">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="h-11 w-full text-base font-medium shadow-md transition-all hover:shadow-lg"
                                    >
                                        {processing ? (
                                            <>
                                                <Spinner className="mr-2 h-4 w-4" />{' '}
                                                Creando...
                                            </>
                                        ) : (
                                            <>
                                                <FilePlus2 className="mr-2 h-4 w-4" />{' '}
                                                Crear Tarea
                                            </>
                                        )}
                                    </Button>

                                    <Button
                                        variant="ghost"
                                        asChild
                                        className="w-full"
                                    >
                                        <Link href={index().url}>Cancelar</Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </Form>
            </div>
        </AppLayout>
    );
}
