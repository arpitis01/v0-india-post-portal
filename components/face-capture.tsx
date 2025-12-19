"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ScanFace, Camera, ArrowLeft, RefreshCw, CheckCircle2, AlertCircle } from "lucide-react"

interface FaceCaptureProps {
  onVerified: () => void
  onBack: () => void
}

export function FaceCapture({ onVerified, onBack }: FaceCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cameraReady, setCameraReady] = useState(false)

  const startCamera = useCallback(async () => {
    try {
      setError(null)
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 640, height: 480 },
      })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        videoRef.current.onloadedmetadata = () => {
          setCameraReady(true)
        }
      }
    } catch (err) {
      setError("Unable to access camera. Please ensure camera permissions are granted.")
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
      setCameraReady(false)
    }
  }, [stream])

  useEffect(() => {
    startCamera()
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.drawImage(video, 0, 0)
        const imageData = canvas.toDataURL("image/jpeg", 0.8)
        setCapturedImage(imageData)
        stopCamera()
      }
    }
  }

  const retakePhoto = () => {
    setCapturedImage(null)
    startCamera()
  }

  const handleVerify = async () => {
    if (!capturedImage) return

    setIsVerifying(true)
    // Simulate face verification
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsVerifying(false)
    onVerified()
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <div className="w-16 h-16 bg-[#E31837]/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <ScanFace className="w-8 h-8 text-[#E31837]" />
        </div>
        <h2 className="text-xl font-semibold text-white">Face Verification</h2>
        <p className="text-white/60 text-sm mt-2">Position your face within the frame and capture a clear photo</p>
      </div>

      <div className="relative aspect-[4/3] bg-black/50 rounded-xl overflow-hidden">
        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white/60">
            <AlertCircle className="w-12 h-12 mb-4 text-red-400" />
            <p className="text-sm text-center px-4">{error}</p>
            <Button
              onClick={startCamera}
              variant="outline"
              className="mt-4 bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </div>
        ) : capturedImage ? (
          <img src={capturedImage || "/placeholder.svg"} alt="Captured face" className="w-full h-full object-cover" />
        ) : (
          <>
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
            {/* Face guide overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-48 h-60 border-2 border-dashed border-white/50 rounded-[50%]" />
            </div>
          </>
        )}
        <canvas ref={canvasRef} className="hidden" />
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

        {capturedImage ? (
          <>
            <Button
              variant="outline"
              onClick={retakePhoto}
              className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Retake
            </Button>
            <Button
              onClick={handleVerify}
              disabled={isVerifying}
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
          </>
        ) : (
          <Button
            onClick={captureImage}
            disabled={!cameraReady}
            className="flex-1 bg-[#E31837] hover:bg-[#c71530] text-white"
          >
            <Camera className="w-4 h-4 mr-2" />
            Capture
          </Button>
        )}
      </div>
    </div>
  )
}
