import AppLayout from '@/layouts/app-layout';
import { create, destroy, edit, index } from '@/routes/permissions';
import { Permission, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Edit, Plus, Trash } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Permissions',
        href: index().url,
    },
];

export default function PermissionsIndex({
    permissions,
}: {
    permissions: Permission[];
}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Permissions" />
            <div className="flex justify-end">
                <Link
                    href={create()}
                    className="inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-indigo-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-200 ease-in-out hover:from-indigo-500 hover:to-purple-500 hover:shadow-lg focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none active:scale-[0.97] sm:px-5 sm:py-2.5 dark:from-indigo-500 dark:to-fuchsia-500 dark:shadow-indigo-900/30 dark:hover:from-indigo-400 dark:hover:to-fuchsia-400 dark:focus:ring-offset-gray-900"
                >
                    <Plus className="h-4 w-4 shrink-0" />

                    {/* Texto oculto en mobile */}
                    <span className="hidden sm:inline">Create Permission</span>
                </Link>
            </div>
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Table>
                    <TableCaption>
                        Lista de permisos recibidos por Inertia
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Guard Name</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead className="text-right">
                                Acciones
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {permissions.map((permission) => (
                            <TableRow key={permission.id}>
                                <TableCell className="font-medium">
                                    {permission.name}
                                </TableCell>
                                <TableCell>{permission.guard_name}</TableCell>
                                <TableCell>
                                    {permission.roles &&
                                    permission.roles.length > 0 ? (
                                        <div className="flex flex-wrap items-center gap-2">
                                            {permission.roles
                                                .slice(0, 3)
                                                .map((r) => (
                                                    <span
                                                        key={r.name}
                                                        className="inline-flex items-center rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-200"
                                                    >
                                                        {r.name}
                                                    </span>
                                                ))}
                                            {permission.roles.length > 3 && (
                                                <span
                                                    title={permission.roles
                                                        .map((r) => r.name)
                                                        .join(', ')}
                                                    className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                                                >
                                                    +
                                                    {permission.roles.length -
                                                        3}
                                                </span>
                                            )}
                                        </div>
                                    ) : (
                                        <span className="text-sm text-gray-500">
                                            —
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Link
                                        href={edit(permission)}
                                        className="inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm text-indigo-600 hover:bg-indigo-50"
                                        aria-label={`Editar ${permission.name}`}
                                    >
                                        <Edit className="h-4 w-4" />
                                        <span className="sr-only">Editar</span>
                                    </Link>
                                    <Link
                                        href={destroy(permission)}
                                        method="delete"
                                        as="button"
                                        className="ml-2 inline-flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-sm text-red-600 hover:bg-red-50"
                                        aria-label={`Eliminar ${permission.name}`}
                                    >
                                        <Trash className="h-4 w-4" />
                                        <span className="sr-only">
                                            Eliminar
                                        </span>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
