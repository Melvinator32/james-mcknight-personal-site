import type { ReactNode } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface PhotoLightboxProps {
  src: string;
  alt: string;
  children: ReactNode;
  className?: string;
}

export default function PhotoLightbox({ src, alt, children, className = "block w-full" }: PhotoLightboxProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label={`Enlarge photo: ${alt || "Photo"}`}
          className={`${className} cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current`}
        >
          {children}
        </button>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className="w-[94vw] max-w-[1400px] max-h-[94dvh] gap-3 overflow-y-auto rounded-xl border-0 bg-[#18211b] px-3 pb-4 pt-14 text-white shadow-2xl sm:rounded-xl [&>button]:right-3 [&>button]:top-3 [&>button]:bg-white [&>button]:p-2 [&>button]:text-slate-900 [&>button]:opacity-100"
      >
        <img src={src} alt={alt} className="mx-auto block max-h-[75dvh] w-auto max-w-full object-contain" />
        <DialogTitle className="sr-only">{alt || "Photo"}</DialogTitle>
      </DialogContent>
    </Dialog>
  );
}
