"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle2, Download, Home, Sparkles } from "lucide-react"

interface VerificationSuccessProps {
  onReset: () => void
}

export function VerificationSuccess({ onReset }: VerificationSuccessProps) {
  const verificationId = `IPV${Date.now().toString(36).toUpperCase()}`
  const timestamp = new Date().toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  })

  return (
    <div className="space-y-6 text-center">
      <div className="relative">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <Sparkles className="w-6 h-6 text-yellow-400 absolute top-0 right-1/4 animate-pulse" />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Verification Successful!</h2>
        <p className="text-white/60">Your identity has been verified successfully through India Post.</p>
      </div>

      <div className="bg-white/10 rounded-xl p-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-white/60 text-sm">Verification ID</span>
          <span className="text-white font-mono text-sm">{verificationId}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-white/60 text-sm">Timestamp</span>
          <span className="text-white text-sm">{timestamp}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-white/60 text-sm">Status</span>
          <span className="text-green-400 text-sm font-medium">Verified</span>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20">
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
        <Button onClick={onReset} className="flex-1 bg-[#E31837] hover:bg-[#c71530] text-white">
          <Home className="w-4 h-4 mr-2" />
          Start Over
        </Button>
      </div>

      <p className="text-white/40 text-xs">
        Please save your verification ID for future reference. This verification is valid for 30 days.
      </p>
    </div>
  )
}
