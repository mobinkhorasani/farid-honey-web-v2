import Logo from './Logo'
import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'

export default function Header() {
  return (
    <header 
      className="sticky top-0 z-40 w-full bg-white border-b border-gray-100" 
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo - Right side in RTL */}
          <Logo />

          {/* Desktop Navigation - Left side in RTL */}
          <DesktopNav />

          {/* Mobile Navigation - Left side in RTL */}
          <MobileNav />
        </div>
      </div>
    </header>
  )
}