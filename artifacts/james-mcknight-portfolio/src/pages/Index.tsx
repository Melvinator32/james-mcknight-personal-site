import Layout from "@/components/Layout";
import PortfolioSidebar from "@/components/PortfolioSidebar";
import HeaderSection from "@/components/sections/HeaderSection";
import WorkSection from "@/components/sections/WorkSection";
import SideVenturesSection from "@/components/sections/SideVenturesSection";
import EducationSection from "@/components/sections/EducationSection";
import InterestsSection from "@/components/sections/InterestsSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Index() {
  return (
    <Layout>
      <PortfolioSidebar />
      <div className="portfolio-home min-h-screen pt-20 lg:ml-72 lg:pt-0">
        <div className="prof-theme px-6 py-12 md:px-16 md:py-24">
          <div className="mx-auto max-w-4xl space-y-32">
            <HeaderSection />
            <WorkSection />
            <SideVenturesSection />
            <EducationSection />
          </div>
        </div>
        <div className="pers-theme min-h-screen px-6 py-24 md:px-16">
          <div className="mx-auto max-w-4xl space-y-32">
            <div className="mx-auto mb-16 max-w-2xl space-y-4 text-center">
              <span className="inline-block rounded-full bg-[var(--pers-border)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">Beyond the Models</span>
              <h2 className="text-4xl font-semibold text-[var(--pers-text)] md:text-5xl">The Personal Register</h2>
              <p className="text-lg text-black">Underwriting infrastructure projects is my day-to-day profession. Curiosity and a thirst for adventure takes me everywhere else—from the trails of the Rockies out West to the speakeasy jazz clubs of New Orleans and into the deep rabbit hole of Vibe Coding.</p>
            </div>
            <InterestsSection />
            <ContactSection />
          </div>
        </div>
      </div>
    </Layout>
  );
}
