import FeaturesSection from '@/components/public/FeaturesSection';
import Footer from '@/components/public/Footer';
import Header from '@/components/public/Header';
import HeroSection from '@/components/public/HeroSection';
import ImpactSection from '@/components/public/ImpactSection';
import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function HomePage({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Home">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            <div className="min-h-screen bg-background">
                <Header auth={auth} canRegister={canRegister} />
                <main>
                    <HeroSection />
                    <FeaturesSection />
                    <ImpactSection />
                </main>
                <Footer />
            </div>
        </>
    );
}
