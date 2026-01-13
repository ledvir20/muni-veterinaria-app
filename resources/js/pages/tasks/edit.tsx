import TaskController from '@/actions/App/Http/Controllers/TaskController';
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
import { Switch } from '@/components/ui/switch'; // Importamos el Switch
import AppLayout from '@/layouts/app-layout';
import { edit, index } from '@/routes/tasks';
import type { BreadcrumbItem, Task } from '@/types';
import { Form, Head, Link } from '@inertiajs/react'; // Form de Inertia v2
import { Activity, ArrowLeft, Calendar, FileText, Save } from 'lucide-react';
import { toast } from 'sonner';

export default function TaskEdit({ task }: { task: Task }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Tasks', href: index().url },
        { title: 'Edit Task', href: edit(task).url },
    ];

    const handleSuccess = () => {
        toast.success('Task updated successfully!');
    };

    const handleError = () => {
        toast.error('Failed to update task. Please check the form.');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${task.title}`} />

            <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Encabezado */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">
                            Editar Tarea
                        </h1>
                        <p className="mt-1 text-muted-foreground">
                            Actualiza la información y configuración de la
                            tarea.
                        </p>
                    </div>
                    <Button variant="outline" asChild size="sm">
                        <Link href={index().url}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Volver al listado
                        </Link>
                    </Button>
                </div>

                {/* INERTIA V2 FORM:
                    Ya no necesitamos destructurar { data, setData } dentro.
                    Los inputs usarán 'name' y 'defaultValue'.
                */}
                <Form
                    {...TaskController.update.form(task)} // Asumo que esto pasa action, method, etc.
                    disableWhileProcessing
                    onSuccess={handleSuccess}
                    onError={handleError}
                    className="space-y-8"
                >
                    {({ processing, errors }) => (
                        <div className="grid gap-8 md:grid-cols-3">
                            {/* --- COLUMNA PRINCIPAL (Izquierda) --- */}
                            <div className="space-y-6 md:col-span-2">
                                <Card className="border-border/60 shadow-sm">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-xl">
                                            <div className="rounded-md bg-blue-100 p-2 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                                <FileText className="h-5 w-5" />
                                            </div>
                                            Detalles de la Tarea
                                        </CardTitle>
                                        <CardDescription>
                                            Información descriptiva básica.
                                        </CardDescription>
                                    </CardHeader>
                                    <Separator />
                                    <CardContent className="grid gap-6 p-6">
                                        {/* Título */}
                                        <div className="space-y-2">
                                            <Label htmlFor="title">
                                                Nombre de la Tarea{' '}
                                                <span className="text-destructive">
                                                    *
                                                </span>
                                            </Label>
                                            <Input
                                                id="title"
                                                name="title"
                                                defaultValue={task.title} // Inertia v2: Usamos defaultValue
                                                placeholder="Ej. Realizar backup de base de datos"
                                                className="h-11"
                                                autoFocus
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
                                            <textarea
                                                id="description"
                                                name="description"
                                                defaultValue={
                                                    task.description ?? ''
                                                }
                                                className="flex min-h-30 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                                placeholder="Describe los pasos necesarios..."
                                            />
                                            <InputError
                                                message={errors.description}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* --- COLUMNA LATERAL (Derecha) --- */}
                            <div className="space-y-6">
                                <Card className="h-fit border-border/60 shadow-sm">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-lg">
                                            <Activity className="h-5 w-5 text-muted-foreground" />
                                            Configuración
                                        </CardTitle>
                                    </CardHeader>
                                    <Separator />
                                    <CardContent className="space-y-6 p-6">
                                        {/* SWITCH con truco para Formulario Nativo:
                                            El Switch de Shadcn visualmente es bonito, pero para que envíe
                                            datos en un form nativo sin setData, necesitamos asegurarnos
                                            de que haya un input asociado.

                                            Radix UI (base de Shadcn) suele inyectar un input hidden si pasas 'name',
                                            pero para asegurar que Laravel reciba un '0' cuando está apagado,
                                            agregamos un input hidden manual antes.
                                        */}
                                        <div className="flex flex-row items-center justify-between rounded-lg border bg-muted/20 p-4 shadow-sm">
                                            <div className="space-y-0.5">
                                                <Label
                                                    htmlFor="is_active"
                                                    className="text-base font-medium"
                                                >
                                                    Estado Activo
                                                </Label>
                                                <p className="text-xs text-muted-foreground">
                                                    Habilitar tarea en el
                                                    sistema
                                                </p>
                                            </div>

                                            {/* Input Hidden para valor False (0) por defecto */}
                                            <input
                                                type="hidden"
                                                name="is_active"
                                                value="0"
                                            />

                                            <Switch
                                                id="is_active"
                                                name="is_active"
                                                value="1"
                                                defaultChecked={
                                                    !!task.is_active
                                                }
                                            />
                                        </div>
                                        <InputError
                                            message={errors.is_active}
                                        />

                                        {/* Fecha de Creación (Solo lectura, decorativo) */}
                                        <div className="flex items-center gap-2 pt-2 text-xs text-muted-foreground">
                                            <Calendar className="h-3 w-3" />
                                            Creado el:{' '}
                                            {new Date(
                                                task.created_at || '',
                                            ).toLocaleDateString()}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Botones de Acción Fuera del Card para fácil acceso */}
                                <div className="flex flex-col gap-3">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="h-11 w-full text-base font-medium shadow-md"
                                    >
                                        {processing ? (
                                            <>
                                                <Spinner className="mr-2 h-4 w-4" />{' '}
                                                Guardando...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="mr-2 h-4 w-4" />{' '}
                                                Guardar Cambios
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
