"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import WalletGuard from "@/components/WalletGuard";
import WalletStatus from "@/components/WalletStatus";
import UniversitySelector from "@/components/UniversitySelector";
import UniversitySpecificView from "@/components/UniversitySpecificView";
import MintedCredentialsSummary from "@/components/MintedCredentialsSummary";
import ProfileVerification from "@/components/ProfileVerification";
import QuickActions from "@/components/QuickActions";
import ProfileSummary from "@/components/ProfileSummary";
import ParticleBackground from "@/components/ParticleBackground";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, CheckCircle, AlertTriangle, Building2 } from "lucide-react";

interface University {
  id: string;
  name: string;
  logo: string;
  isVerified: boolean;
  walletAddress: string;
  description: string;
  credentialsAvailable: number;
}

const StudentDashboard = () => {
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [userVerified, setUserVerified] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleUniversitySelect = (university: University) => {
    setSelectedUniversity(university);
    setSuccessMessage(`Selected ${university.name}`);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleVerificationStatusChange = (status: string) => {
    setUserVerified(status === "verified");
  };

  return (
    <WalletGuard>
      <div className="min-h-screen bg-gradient-dark relative">
        <ParticleBackground />
        
        <div className="relative z-10">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-b border-border/50 bg-card/50 backdrop-blur-sm"
          >
            <div className="container mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  {/* Logo */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <Shield className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                      VeriCred
                    </span>
                  </div>
                  
                  {/* Dashboard Badge */}
                  <Badge className="bg-primary/20 text-primary border-primary/30">
                    Student Dashboard
                  </Badge>
                </div>

                {/* Wallet Status */}
                <WalletStatus />
              </div>
            </div>
          </motion.header>

          {/* Success/Error Messages */}
          {(successMessage || errorMessage) && (
            <div className="container mx-auto px-6 pt-4">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {successMessage && (
                  <Alert className="bg-green-500/20 border-green-500/30 text-green-400">
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>{successMessage}</AlertDescription>
                  </Alert>
                )}
                {errorMessage && (
                  <Alert className="bg-red-500/20 border-red-500/30 text-red-400">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{errorMessage}</AlertDescription>
                  </Alert>
                )}
              </motion.div>
            </div>
          )}

          {/* Main Content */}
          <div className="container mx-auto px-6 py-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - University Selection & Credentials */}
              <div className="lg:col-span-2 space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <UniversitySelector 
                    onUniversitySelect={handleUniversitySelect}
                    selectedUniversity={selectedUniversity}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {selectedUniversity ? (
                    <UniversitySpecificView 
                      university={selectedUniversity}
                      userVerified={userVerified}
                    />
                  ) : (
                    <div className="bg-gradient-card border-primary/20 rounded-lg p-12 text-center border border-dashed">
                      <Building2 className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                      <h3 className="text-xl font-semibold mb-2">Select a University</h3>
                      <p className="text-muted-foreground">
                        Choose a university from the list above to view available credentials and request NFT mints.
                      </p>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Right Column - Summary & Actions */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <ProfileSummary userVerified={userVerified} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <ProfileVerification onStatusChange={handleVerificationStatusChange} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <MintedCredentialsSummary />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <QuickActions />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WalletGuard>
  );
};

export default StudentDashboard;