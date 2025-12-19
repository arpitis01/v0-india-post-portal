import { Shield, Lock, Clock, Award } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Government Authorized",
    description: "Official verification service by Department of Posts, Government of India",
  },
  {
    icon: Lock,
    title: "Secure & Encrypted",
    description: "End-to-end encryption with UIDAI-compliant security standards",
  },
  {
    icon: Clock,
    title: "Instant Verification",
    description: "Complete your identity verification in under 2 minutes",
  },
  {
    icon: Award,
    title: "Trusted by Millions",
    description: "Over 150,000 post offices serving citizens across India",
  },
]

export function TrustedSection() {
  return (
    <section className="py-16 px-4 bg-white/5 backdrop-blur-sm">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Why Trust India Post Verification?</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            India Post has been serving the nation since 1854. Our verification service combines legacy trust with
            modern technology.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-white/20 transition-colors"
              >
                <div className="w-12 h-12 bg-[#E31837]/20 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#E31837]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-white/60 text-sm">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
