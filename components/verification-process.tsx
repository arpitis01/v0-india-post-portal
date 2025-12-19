"use client"

import { useState } from "react"
import { GlassCard } from "./glass-card"
import { FaceCapture } from "./face-capture"
import { OtpVerification } from "./otp-verification"
import { VerificationSuccess } from "./verification-success"
import { AadhaarInput } from "./aadhaar-input"
import { CheckCircle2, User, Smartphone, ScanFace } from "lucide-react"

type Step = "aadhaar" | "otp" | "face" | "success"

export function VerificationProcess() {
  const [currentStep, setCurrentStep] = useState<Step>("aadhaar")
  const [aadhaarNumber, setAadhaarNumber] = useState("")

  const steps = [
    { id: "aadhaar", label: "Aadhaar", icon: User },
    { id: "otp", label: "OTP", icon: Smartphone },
    { id: "face", label: "Face", icon: ScanFace },
    { id: "success", label: "Done", icon: CheckCircle2 },
  ]

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep)

  const handleAadhaarSubmit = (aadhaar: string) => {
    setAadhaarNumber(aadhaar)
    setCurrentStep("otp")
  }

  const handleOtpVerified = () => {
    setCurrentStep("face")
  }

  const handleFaceVerified = () => {
    setCurrentStep("success")
  }

  const handleReset = () => {
    setCurrentStep("aadhaar")
    setAadhaarNumber("")
  }

  return (
    <GlassCard className="w-full max-w-lg p-8">
      {/* Step Indicator */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => {
          const Icon = step.icon
          const isCompleted = index < currentStepIndex
          const isCurrent = index === currentStepIndex

          return (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                    isCompleted
                      ? "bg-green-500 text-white"
                      : isCurrent
                        ? "bg-[#E31837] text-white"
                        : "bg-white/20 text-white/50",
                  )}
                >
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <span className={cn("text-xs mt-2 transition-colors", isCurrent ? "text-white" : "text-white/50")}>
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn("w-12 h-0.5 mx-2 transition-colors", isCompleted ? "bg-green-500" : "bg-white/20")}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Step Content */}
      <div className="min-h-[300px]">
        {currentStep === "aadhaar" && <AadhaarInput onSubmit={handleAadhaarSubmit} />}
        {currentStep === "otp" && (
          <OtpVerification
            aadhaarNumber={aadhaarNumber}
            onVerified={handleOtpVerified}
            onBack={() => setCurrentStep("aadhaar")}
          />
        )}
        {currentStep === "face" && <FaceCapture onVerified={handleFaceVerified} onBack={() => setCurrentStep("otp")} />}
        {currentStep === "success" && <VerificationSuccess onReset={handleReset} />}
      </div>
    </GlassCard>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
