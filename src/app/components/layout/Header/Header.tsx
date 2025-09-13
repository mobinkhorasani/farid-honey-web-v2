import { DesktopNav } from "./desktop-nav";
import { Logo } from "./Logo";
import { MobileNav } from "./mobile-nav";




export const  Header = ()=> {
  return (
    <header 
      className="sticky top-0 z-40 w-full bg-white border-b border-gray-100" 
      role="banner"
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between">
          <Logo />
          <DesktopNav />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}