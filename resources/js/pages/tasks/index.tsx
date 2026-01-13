import AppLayout from '@/layouts/app-layout';
import { create, destroy, edit, index } from '@/routes/tasks';
import type { BreadcrumbItem, Task } from '@/types';
import { Head, Link, router } from '@inertiajs/react'; // Importamos router para lanzar el delete manual
import { useState } from 'react';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'; // Importar Alert Dialog
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import { useCan } from '@/hooks/useCan';
import { Edit, ListTodo, Plus, SearchX, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tasks',
        href: index().url,
    },
];

export default function TaskIndex({ tasks }: { tasks: Task[] }) {
    // Hook para verificar permisos
    const can = useCan();

    // Estado para controlar qué tarea se va a eliminar
    const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Función que confirma y ejecuta la eliminación
    const confirmDelete = () => {
        if (!taskToDelete) return;

        setIsDeleting(true);

        router.delete(destroy(taskToDelete), {
            onSuccess: () => {
                toast.success('Tarea eliminada correctamente');
                setTaskToDelete(null); // Cerrar modal
            },
            onError: () => {
                toast.error('Ocurrió un error al eliminar la tarea');
            },
            onFinish: () => {
                setIsDeleting(false);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Listado de Tareas" />

            <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
                {/* --- HEADER --- */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">
                            Tareas
                        </h1>
                        <p className="mt-1 text-muted-foreground">
                            Gestiona y organiza tus tareas pendientes.
                        </p>
                    </div>

                    {can('create_tasks') && (
                        <Button asChild>
                            <Link href={create().url}>
                                <Plus className="mr-2 h-4 w-4" />
                                Nueva Tarea
                            </Link>
                        </Button>
                    )}
                </div>

                {/* --- TABLA --- */}
                <Card className="border-border/60 shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ListTodo className="h-5 w-5 text-muted-foreground" />
                            Listado
                        </CardTitle>
                        <CardDescription>
                            Tienes un total de <strong>{tasks.length}</strong>{' '}
                            tareas registradas.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="p-0">
                        {tasks.length === 0 ? (
                            /* Estado Vacío (Empty State) */
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <div className="rounded-full bg-muted/30 p-4">
                                    <SearchX className="h-10 w-10 text-muted-foreground/50" />
                                </div>
                                <h3 className="mt-4 text-lg font-semibold">
                                    No hay tareas creadas
                                </h3>
                                <p className="mb-4 max-w-sm text-muted-foreground">
                                    Comienza creando tu primera tarea para
                                    organizar tu flujo de trabajo.
                                </p>
                                {can('create_tasks') && (
                                    <Button variant="outline" asChild>
                                        <Link href={create().url}>
                                            Crear mi primera tarea
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        ) : (
                            /* Tabla de Datos */
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/5 hover:bg-muted/5">
                                        <TableHead className="w-75">
                                            Título
                                        </TableHead>
                                        <TableHead className="hidden md:table-cell">
                                            Descripción
                                        </TableHead>
                                        <TableHead className="w-25 text-center">
                                            Estado
                                        </TableHead>
                                        <TableHead className="pr-6 text-right">
                                            Acciones
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {tasks.map((task) => (
                                        <TableRow
                                            key={task.id}
                                            className="group"
                                        >
                                            <TableCell className="font-medium">
                                                <div className="flex flex-col">
                                                    {can('update_tasks') ? (
                                                        <Link
                                                            href={edit(task).url}
                                                            className="text-indigo-600 hover:underline"
                                                            aria-label={`Editar ${task.title}`}
                                                        >
                                                            {task.title}
                                                        </Link>
                                                    ) : (
                                                        <span className="font-medium">{task.title}</span>
                                                    )}
                                                    {/* Mostrar descripción en mobile solamente debajo del título */}
                                                    <span className="max-w-50 truncate text-xs text-muted-foreground md:hidden">
                                                        {task.description}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden max-w-md truncate text-muted-foreground md:table-cell">
                                                {task.description || '-'}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {task.is_active ? (
                                                    <Badge
                                                        variant="secondary"
                                                        className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400"
                                                    >
                                                        Activa
                                                    </Badge>
                                                ) : (
                                                    <Badge
                                                        variant="outline"
                                                        className="text-muted-foreground"
                                                    >
                                                        Inactiva
                                                    </Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="pr-6 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
                                                    {/* Botón Editar */}
                                                    {can('update_tasks') && (
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            asChild
                                                            className="h-8 w-8 text-muted-foreground hover:text-indigo-600"
                                                        >
                                                            <Link
                                                                href={
                                                                    edit(task)
                                                                        .url
                                                                }
                                                                aria-label={`Editar ${task.title}`}
                                                            >
                                                                <Edit className="h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                    )}

                                                    {/* Botón Eliminar (Abre Modal) */}
                                                    {can('delete_tasks') && (
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-muted-foreground hover:text-red-600"
                                                            onClick={() =>
                                                                setTaskToDelete(
                                                                    task,
                                                                )
                                                            }
                                                            aria-label={`Eliminar ${task.title}`}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>

                {/* --- MODAL DE CONFIRMACIÓN (ALERT DIALOG) --- */}
                <AlertDialog
                    open={!!taskToDelete}
                    onOpenChange={(open) => !open && setTaskToDelete(null)}
                >
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                ¿Estás completamente seguro?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                Esta acción eliminará permanentemente la tarea{' '}
                                <span className="font-semibold text-foreground">
                                    "{taskToDelete?.title}"
                                </span>
                                . Esta acción no se puede deshacer.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel disabled={isDeleting}>
                                Cancelar
                            </AlertDialogCancel>
                            <AlertDialogAction
                                onClick={(e) => {
                                    e.preventDefault(); // Prevenir cierre automático
                                    confirmDelete();
                                }}
                                className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                                disabled={isDeleting}
                            >
                                {isDeleting ? 'Eliminando...' : 'Sí, eliminar'}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </AppLayout>
    );
}
