import { Hero } from '@/components/home/Hero';
import { PopularServices } from '@/components/home/PopularServices';
import { HowItWorks } from '@/components/home/HowItWorks';
import { TrustedProfessionals } from '@/components/home/TrustedProfessionals';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { ReviewsSection } from '@/components/home/ReviewsSection';
import { CTASection } from '@/components/home/CTASection';
import { HomeHighlights } from '@/components/home/HomeHighlights';
import { useServices, useProfessionals, useReviews } from '@/hooks/useData';

export function HomePage() {
  const { data: services, isLoading: servicesLoading } = useServices();
  const { data: professionals } = useProfessionals();
  const { data: reviews } = useReviews();

  return (
    <>
      <Hero />
      <HomeHighlights services={services || []} professionals={professionals || []} />
      <PopularServices services={services || []} loading={servicesLoading} />
      <HowItWorks />
      <TrustedProfessionals professionals={professionals || []} />
      <WhyChooseUs />
      <ReviewsSection reviews={reviews || []} />
      <CTASection />
    </>
  );
}
