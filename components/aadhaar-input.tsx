"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, ArrowRight, AlertCircle } from "lucide-react"

interface AadhaarInputProps {
  onSubmit: (aadhaar: string) => void
}

export function AadhaarInput({ onSubmit }: AadhaarInputProps) {
  const [aadhaar, setAadhaar] = useState("")
  const [error, setError] = useState("")

  const formatAadhaar = (value: string) => {
    const digits = value.replace(/\D/g, "")
    const limited = digits.slice(0, 12)
    const formatted = limited.replace(/(\d{4})(?=\d)/g, "$1 ")
    return formatted
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatAadhaar(e.target.value)
    setAadhaar(formatted)
    setError("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const digits = aadhaar.replace(/\s/g, "")

    if (digits.length !== 12) {
      setError("Please enter a valid 12-digit Aadhaar number")
      return
    }

    onSubmit(digits)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-[#E31837]/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-[#E31837]" />
        </div>
        <h2 className="text-xl font-semibold text-white">Enter Aadhaar Number</h2>
        <p className="text-white/60 text-sm mt-2">Please enter your 12-digit Aadhaar number to begin verification</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="aadhaar" className="text-white/80">
          Aadhaar Number
        </Label>
        <Input
          id="aadhaar"
          type="text"
          placeholder="XXXX XXXX XXXX"
          value={aadhaar}
          onChange={handleChange}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/40 text-center text-lg tracking-widest"
          maxLength={14}
        />
        {error && (
          <div className="flex items-center gap-2 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-[#E31837] hover:bg-[#c71530] text-white"
        disabled={aadhaar.replace(/\s/g, "").length !== 12}
      >
        Send OTP
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>

      <p className="text-white/40 text-xs text-center">Your Aadhaar details are secured with end-to-end encryption</p>
    </form>
  )
}
