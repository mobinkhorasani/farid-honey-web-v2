import { DesktopNav } from "./desktop-nav";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";

export const Header = () => {
  return (
    <header
      role="banner"
      className="sticky top-0 z-40 w-full border-b border-gray-100
                 bg-gradient-to-r from-[#F6D27A] to-white"
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-14 items-center justify-between">
          <Logo />
          <DesktopNav />
          <MobileNav />
        </div>
      </div>
    </header>
  );
};
