import { PublicFooter } from '@/components/public/public-footer';
import { PublicHeader } from '@/components/public/public-header';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

interface PublicLayoutProps {
    children?: React.ReactNode;
    canRegister?: boolean;
}

export const PublicLayout = ({
    children,
    canRegister = true,
}: PublicLayoutProps) => {
    const { auth } = usePage<SharedData>().props;
    return (
        <div className="min-h-screen bg-background">
            <PublicHeader auth={auth} canRegister={canRegister} />
            <main>{children}</main>
            <PublicFooter />
        </div>
    );
};
