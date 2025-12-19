import { SlideshowBackground } from "@/components/slideshow-background"
import { VerificationProcess } from "@/components/verification-process"
import { TrustedSection } from "@/components/trusted-section"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      <SlideshowBackground />
      <div className="relative z-10">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center min-h-[80vh] gap-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
                India Post Identity Verification
              </h1>
              <p className="text-lg text-white/80 max-w-2xl mx-auto text-pretty">
                Secure and seamless verification process powered by advanced face recognition and OTP authentication for
                postal services across India.
              </p>
            </div>
            <VerificationProcess />
          </div>
        </div>
        <TrustedSection />
        <Footer />
      </div>
    </main>
  )
}
