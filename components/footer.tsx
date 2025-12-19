import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full py-8 px-6 bg-[#1a1a2e]/90 backdrop-blur-md border-t border-white/10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#E31837] rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">India Post</span>
            </div>
            <p className="text-white/60 text-sm">
              Department of Posts, Ministry of Communications, Government of India. Serving the nation since 1854.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
                  Track Consignment
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
                  Calculate Postage
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
                  Find Post Office
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
                  Postal Services
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-white/60 text-sm">
                <Phone className="w-4 h-4" />
                <span>1800-11-2011 (Toll Free)</span>
              </li>
              <li className="flex items-center gap-2 text-white/60 text-sm">
                <Mail className="w-4 h-4" />
                <span>helpdesk@indiapost.gov.in</span>
              </li>
              <li className="flex items-center gap-2 text-white/60 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Dak Bhawan, New Delhi - 110001</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-white/40 text-sm">
            © 2025 India Post. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  )
}
