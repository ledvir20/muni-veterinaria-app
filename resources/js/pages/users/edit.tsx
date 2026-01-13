import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, Role, User } from '@/types';
import { Form, Head } from '@inertiajs/react';

import UserController from '@/actions/App/Http/Controllers/UserController';
import { Checkbox } from '@/components/ui/checkbox';
import { edit, index } from '@/routes/users';

interface UsersEditProps {
    user: User;
    roles: Role[];
}
export default function UsersEdit({ user, roles }: UsersEditProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Users',
            href: index().url,
        },
        {
            title: 'Edit',
            href: edit(user).url,
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit User" />
            <div className="flex flex-col items-center px-4 py-8">
                <div className="w-full max-w-lg space-y-6">
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Edit user
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Edit a user to your organization. They'll receive an
                            email to set up their account.
                        </p>
                    </div>

                    <div className="rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
                        <div className="p-8">
                            <Form
                                {...UserController.update.form(user)}
                                resetOnSuccess={['password']}
                                disableWhileProcessing
                                className="space-y-6"
                            >
                                {({ processing, errors }) => (
                                    <>
                                        <div className="space-y-5">
                                            <div className="grid gap-2">
                                                <Label
                                                    htmlFor="name"
                                                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    Full Name
                                                </Label>
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    required
                                                    autoFocus
                                                    tabIndex={1}
                                                    autoComplete="name"
                                                    name="name"
                                                    placeholder="John Doe"
                                                    className="h-11 transition-all"
                                                    defaultValue={user.name}
                                                />
                                                <InputError
                                                    message={errors.name}
                                                />
                                            </div>

                                            <div className="grid gap-2">
                                                <Label
                                                    htmlFor="email"
                                                    className="text-sm leading-none font-medium"
                                                >
                                                    Email address
                                                </Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    required
                                                    tabIndex={2}
                                                    autoComplete="email"
                                                    name="email"
                                                    placeholder="name@example.com"
                                                    className="h-11 transition-all"
                                                    defaultValue={user.email}
                                                />
                                                <InputError
                                                    message={errors.email}
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                                <div className="grid gap-2">
                                                    <Label htmlFor="password">
                                                        Password
                                                    </Label>
                                                    <Input
                                                        id="password"
                                                        type="password"
                                                        tabIndex={3}
                                                        autoComplete="new-password"
                                                        name="password"
                                                        placeholder="••••••••"
                                                        className="h-11 transition-all"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.password
                                                        }
                                                    />
                                                </div>
                                            </div>

                                            {/* Roles */}
                                            <div className="grid gap-2">
                                                <Label htmlFor="roles">
                                                    Roles
                                                </Label>
                                                {roles.length > 0 ? (
                                                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                                        {roles.map((role) => (
                                                            <div
                                                                key={role.name}
                                                                className="flex items-center gap-2"
                                                            >
                                                                <Checkbox
                                                                    id={`role-${role.name}`}
                                                                    name="roles[]"
                                                                    value={
                                                                        role.name
                                                                    }
                                                                    defaultChecked={user.roles?.some(
                                                                        (r) =>
                                                                            r.name ===
                                                                            role.name,
                                                                    )}
                                                                    tabIndex={4}
                                                                />
                                                                <Label
                                                                    htmlFor={`role-${role.name}`}
                                                                    className="text-sm font-medium"
                                                                >
                                                                    {role.name}
                                                                </Label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="text-sm text-muted-foreground">
                                                        No hay roles
                                                        disponibles. Crea roles
                                                        primero.
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="pt-2">
                                            <Button
                                                type="submit"
                                                className="h-11 w-full text-base font-semibold transition-all hover:scale-[1.01] active:scale-[0.99]"
                                                tabIndex={5}
                                                disabled={processing}
                                                data-test="register-user-button"
                                            >
                                                {processing ? (
                                                    <>
                                                        <Spinner className="mr-2 h-4 w-4" />
                                                        Updating...
                                                    </>
                                                ) : (
                                                    'Update user'
                                                )}
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </Form>
                        </div>
                    </div>

                    <div className="text-center text-xs text-muted-foreground">
                        By creating an account, you agree to our terms and
                        conditions.
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
