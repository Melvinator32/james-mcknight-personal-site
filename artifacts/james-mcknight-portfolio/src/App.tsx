import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ContentEditorProvider } from "@/components/ContentEditorProvider";
import PortfolioEditorToolbar from "@/components/PortfolioEditorToolbar";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import StyleGuide from "./pages/StyleGuide";
import NotFound from "./pages/NotFound";


const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ContentEditorProvider>
        <ThemeProvider defaultTheme="system" storageKey="portfolio-ui-theme">
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter basename={import.meta.env.BASE_URL}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/style-guide" element={<StyleGuide />} />

                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
            <PortfolioEditorToolbar />
          </TooltipProvider>
        </ThemeProvider>
      </ContentEditorProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
