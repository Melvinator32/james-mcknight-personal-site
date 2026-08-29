import { Link } from "react-router-dom";

export default function BonsaiMark({ className = "" }: { className?: string }) {
  return (
    <Link to="/" aria-label="James McKnight home" className={`block h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-[#b6bbae] bg-[#E1E2D8] shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${className}`}>
      <img src={`${import.meta.env.BASE_URL}bonsai-logo.png`} alt="Bonsai logo" className="h-full w-full object-contain" width={44} height={44} />
    </Link>
  );
}
