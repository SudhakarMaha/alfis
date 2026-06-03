import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { HeroSlider } from "@/components/site/HeroSlider";
import { Categories } from "@/components/site/Categories";
import { FeaturedProducts } from "@/components/site/FeaturedProducts";
import { VillageStory } from "@/components/site/VillageStory";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";
import { Testimonials } from "@/components/site/Testimonials";
import { ShortsSection } from "@/components/site/ShortsSection";
import { Newsletter } from "@/components/site/Newsletter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Angalaman — Village Heritage Foods, Masalas & Millets" },
      { name: "description", content: "Traditional, handmade village foods, masalas, pickles and millet mixes — 100% natural, chemical-free, delivered fresh across India." },
      { property: "og:title", content: "Angalaman — Village Heritage Foods" },
      { property: "og:description", content: "Handmade masalas, pickles, millet mixes and traditional foods from our village to your kitchen." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <Layout>
      <HeroSlider />
      <Categories />
      <FeaturedProducts />
      <VillageStory />
      <ShortsSection />
      <WhyChooseUs />
      <Testimonials />
      <Newsletter />
    </Layout>
  );
}
