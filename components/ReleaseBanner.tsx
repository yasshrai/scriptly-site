import Link from "next/link";
import { VscMegaphone } from "react-icons/vsc";

// UPDATE THIS CONFIGURATION TO ANNOUNCE NEW RELEASES
export const RELEASE_CONFIG = {
  isVisible: true,
  text: "🚀 Antigravity 2.1.4 and cursor 3.7 is now live in Scriptly! Install it today.",
  link: "/install",
};

export default function ReleaseBanner() {
  if (!RELEASE_CONFIG.isVisible) {
    return null;
  }

  return (
    <div className="relative z-[100] flex w-full justify-center">
      <div className="flex w-full items-center justify-center rounded-b-2xl bg-gradient-to-r from-purple-800 to-blue-500 px-4 py-2 shadow-md shadow-blue-900/20">
        <p className="text-xs sm:text-[13px] leading-relaxed text-blue-50 font-sans truncate max-w-5xl text-center">
          <Link
            href={RELEASE_CONFIG.link}
            className="flex items-center justify-center gap-1.5 hover:text-white transition-colors"
          >
            <VscMegaphone className="h-3.5 w-3.5 shrink-0" />
            <strong className="font-semibold text-white shrink-0">
              New Release
            </strong>
            <svg
              viewBox="0 0 2 2"
              className="mx-1 shrink-0 h-0.5 w-0.5 fill-current"
              aria-hidden="true"
            >
              <circle cx="1" cy="1" r="1" />
            </svg>
            <span className="truncate">{RELEASE_CONFIG.text}</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
