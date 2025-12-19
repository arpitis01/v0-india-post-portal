import { Mail } from "lucide-react"

export function Header() {
  return (
    <header className="w-full py-4 px-6 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#E31837] rounded-full flex items-center justify-center">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">India Post</h1>
            <p className="text-xs text-white/70">Department of Posts, Government of India</p>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-white/80 hover:text-white transition-colors text-sm">
            Home
          </a>
          <a href="#" className="text-white/80 hover:text-white transition-colors text-sm">
            Services
          </a>
          <a href="#" className="text-white/80 hover:text-white transition-colors text-sm">
            Track
          </a>
          <a href="#" className="text-white/80 hover:text-white transition-colors text-sm">
            Support
          </a>
        </nav>
      </div>
    </header>
  )
}
