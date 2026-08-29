import BonsaiMark from "./BonsaiMark";
import { ReactNode } from "react";
import BackToTop from "./BackToTop";
import Footer from "./Footer";
import SkipLink from "./SkipLink";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <SkipLink />
      <BonsaiMark className="fixed right-6 top-6 z-40 hidden lg:block" />
      <main id="main-content">{children}</main>
      <Footer />
      <BackToTop />
    </div>
  );
}
