"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp"
import { Smartphone, ArrowLeft, RefreshCw, CheckCircle2 } from "lucide-react"

interface OtpVerificationProps {
  aadhaarNumber: string
  onVerified: () => void
  onBack: () => void
}

export function OtpVerification({ aadhaarNumber, onVerified, onBack }: OtpVerificationProps) {
  const [otp, setOtp] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [resendTimer, setResendTimer] = useState(30)
  const [canResend, setCanResend] = useState(false)

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [resendTimer])

  const maskedAadhaar = `XXXX XXXX ${aadhaarNumber.slice(-4)}`

  const handleVerify = async () => {
    if (otp.length !== 6) return

    setIsVerifying(true)
    // Simulate OTP verification
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsVerifying(false)
    onVerified()
  }

  const handleResend = () => {
    setResendTimer(30)
    setCanResend(false)
    setOtp("")
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-[#E31837]/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Smartphone className="w-8 h-8 text-[#E31837]" />
        </div>
        <h2 className="text-xl font-semibold text-white">Verify OTP</h2>
        <p className="text-white/60 text-sm mt-2">
          Enter the 6-digit OTP sent to your mobile number linked with Aadhaar {maskedAadhaar}
        </p>
      </div>

      <div className="flex justify-center">
        <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
          <InputOTPGroup>
            <InputOTPSlot index={0} className="bg-white/10 border-white/20 text-white" />
            <InputOTPSlot index={1} className="bg-white/10 border-white/20 text-white" />
            <InputOTPSlot index={2} className="bg-white/10 border-white/20 text-white" />
          </InputOTPGroup>
          <InputOTPSeparator className="text-white/40" />
          <InputOTPGroup>
            <InputOTPSlot index={3} className="bg-white/10 border-white/20 text-white" />
            <InputOTPSlot index={4} className="bg-white/10 border-white/20 text-white" />
            <InputOTPSlot index={5} className="bg-white/10 border-white/20 text-white" />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <div className="text-center">
        {canResend ? (
          <button
            onClick={handleResend}
            className="text-[#E31837] hover:text-[#c71530] text-sm flex items-center gap-2 mx-auto transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Resend OTP
          </button>
        ) : (
          <p className="text-white/40 text-sm">Resend OTP in {resendTimer}s</p>
        )}
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={handleVerify}
          disabled={otp.length !== 6 || isVerifying}
          className="flex-1 bg-[#E31837] hover:bg-[#c71530] text-white"
        >
          {isVerifying ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Verifying...
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Verify
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
