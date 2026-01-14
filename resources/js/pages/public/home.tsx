import { PublicFeaturesSection } from '@/components/public/public-features-section';
import { PublicHeroSection } from '@/components/public/public-hero-section';
import { PublicImpactSection } from '@/components/public/public-impact-section';
import { PublicLayout } from '@/layouts/public-layout';
import { Head } from '@inertiajs/react';

export default function HomePage({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    return (
        <>
            <Head title="Home">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            <PublicLayout canRegister={canRegister}>
                <PublicHeroSection />
                <PublicFeaturesSection />
                <PublicImpactSection />
            </PublicLayout>
        </>
    );
}
