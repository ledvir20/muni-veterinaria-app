import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Form, Head } from '@inertiajs/react';

import PermissionController from '@/actions/App/Http/Controllers/PermissionController';
import { create, index } from '@/routes/permissions';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Permissions',
        href: index().url,
    },
    {
        title: 'Create',
        href: create().url,
    },
];

export default function PermissionsCreate() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Permission" />
            <div className="flex flex-col items-center px-4 py-8">
                <div className="w-full max-w-lg space-y-6">
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Create permission
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Add a new permission to your organization.
                        </p>
                    </div>

                    <div className="rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
                        <div className="p-8">
                            <Form
                                {...PermissionController.store.form()}
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
                                                    Name
                                                </Label>
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    autoFocus
                                                    tabIndex={1}
                                                    autoComplete="name"
                                                    name="name"
                                                    placeholder="Permission Name"
                                                    className="h-11 transition-all"
                                                />
                                                <InputError
                                                    message={errors.name}
                                                />
                                            </div>

                                            <div className="grid gap-2">
                                                <Label
                                                    htmlFor="guard_name"
                                                    className="text-sm leading-none font-medium"
                                                >
                                                    Guard
                                                </Label>
                                                <Input
                                                    id="guard_name"
                                                    type="text"
                                                    tabIndex={2}
                                                    autoComplete="guard_name"
                                                    name="guard_name"
                                                    placeholder="Guard Name"
                                                    className="h-11 transition-all"
                                                />
                                                <InputError
                                                    message={errors.guard_name}
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-2">
                                            <Button
                                                type="submit"
                                                className="h-11 w-full text-base font-semibold transition-all hover:scale-[1.01] active:scale-[0.99]"
                                                tabIndex={3}
                                                disabled={processing}
                                                data-test="create-permission-button"
                                            >
                                                {processing ? (
                                                    <>
                                                        <Spinner className="mr-2 h-4 w-4" />
                                                        Creating...
                                                    </>
                                                ) : (
                                                    'Create permission'
                                                )}
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
