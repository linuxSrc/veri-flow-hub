"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  FileText,
  Camera,
  User
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type VerificationStatus = "unverified" | "pending" | "verified" | "rejected";

interface ProfileVerificationProps {
  onStatusChange?: (status: VerificationStatus) => void;
}

const getStatusConfig = (status: VerificationStatus) => {
  switch (status) {
    case "unverified":
      return {
        icon: AlertCircle,
        color: "text-yellow-500",
        bgColor: "bg-yellow-500/20",
        borderColor: "border-yellow-500/30",
        label: "Unverified",
        description: "Complete verification to access full features"
      };
    case "pending":
      return {
        icon: Clock,
        color: "text-blue-500",
        bgColor: "bg-blue-500/20",
        borderColor: "border-blue-500/30",
        label: "Under Review",
        description: "Your documents are being reviewed"
      };
    case "verified":
      return {
        icon: CheckCircle2,
        color: "text-green-500",
        bgColor: "bg-green-500/20",
        borderColor: "border-green-500/30",
        label: "Verified",
        description: "Profile successfully verified"
      };
    case "rejected":
      return {
        icon: XCircle,
        color: "text-red-500",
        bgColor: "bg-red-500/20",
        borderColor: "border-red-500/30",
        label: "Rejected",
        description: "Verification failed. Please resubmit"
      };
  }
};

export default function ProfileVerification({ onStatusChange }: ProfileVerificationProps) {
  const [status, setStatus] = useState<VerificationStatus>("unverified");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const config = getStatusConfig(status);
  const Icon = config.icon;

  const startVerification = async () => {
    setIsProcessing(true);
    setProgress(0);
    
    // Simulate verification process
    const steps = [
      { message: "Uploading documents...", progress: 25 },
      { message: "Verifying identity...", progress: 50 },
      { message: "Cross-checking records...", progress: 75 },
      { message: "Finalizing verification...", progress: 100 }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress(step.progress);
      toast({
        title: "Verification Progress",
        description: step.message,
      });
    }

    setStatus("pending");
    onStatusChange?.("pending");
    setIsProcessing(false);
    
    toast({
      title: "Verification Submitted",
      description: "Your profile has been submitted for verification",
    });

    // Auto-approve after delay (for demo)
    setTimeout(() => {
      setStatus("verified");
      onStatusChange?.("verified");
      toast({
        title: "Profile Verified!",
        description: "Your profile has been successfully verified",
      });
    }, 8000);
  };

  const retryVerification = () => {
    setStatus("unverified");
    onStatusChange?.("unverified");
  };

  return (
    <Card className="bg-gradient-card border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Profile Verification
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg border ${config.bgColor} ${config.borderColor}`}
        >
          <div className="flex items-center gap-3 mb-3">
            <Icon className={`h-5 w-5 ${config.color}`} />
            <div>
              <h4 className={`font-medium ${config.color}`}>{config.label}</h4>
              <p className="text-sm text-muted-foreground">{config.description}</p>
            </div>
          </div>

          {status === "pending" && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Review Progress</span>
                <span>Processing...</span>
              </div>
              <Progress value={33} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Average review time: 2-3 business days
              </p>
            </div>
          )}
        </motion.div>

        {isProcessing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="space-y-3"
          >
            <div className="flex justify-between text-sm">
              <span>Upload Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </motion.div>
        )}

        {status === "unverified" && (
          <div className="space-y-3">
            <div className="text-sm text-muted-foreground">
              <h5 className="font-medium mb-2">Required Documents:</h5>
              <ul className="space-y-1">
                <li className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Government-issued ID
                </li>
                <li className="flex items-center gap-2">
                  <Camera className="h-4 w-4" />
                  Selfie for verification
                </li>
                <li className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Academic transcripts
                </li>
              </ul>
            </div>
            <Button 
              onClick={startVerification}
              disabled={isProcessing}
              className="w-full"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4 mr-2" />
                  Start Verification Process
                </>
              )}
            </Button>
          </div>
        )}

        {status === "verified" && (
          <div className="text-center py-2">
            <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-sm text-green-400 font-medium">
              All features unlocked!
            </p>
          </div>
        )}

        {status === "rejected" && (
          <div className="space-y-3">
            <div className="text-sm text-red-400">
              <p className="mb-2">Verification failed due to:</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Document quality issues</li>
                <li>Information mismatch</li>
              </ul>
            </div>
            <Button 
              onClick={retryVerification}
              variant="outline"
              className="w-full"
            >
              Retry Verification
            </Button>
          </div>
        )}

        {status === "pending" && (
          <div className="text-center">
            <Button variant="outline" size="sm" disabled>
              <Clock className="h-4 w-4 mr-2" />
              Review in Progress
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}