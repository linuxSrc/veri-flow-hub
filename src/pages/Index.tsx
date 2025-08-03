"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ParticleBackground from "@/components/ParticleBackground";
import WalletConnection from "@/components/WalletConnection";
import RoleSelector from "@/components/RoleSelector";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Zap, Globe, Award } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

interface WalletData {
  address: string;
  chainId: number;
  isConnected: boolean;
  role?: "student" | "university";
}

const Index = () => {
  const navigate = useNavigate();
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [currentStep, setCurrentStep] = useState<"connect" | "role" | "dashboard">("connect");

  const handleWalletConnected = (wallet: WalletData) => {
    setWalletData(wallet);
    // Store in localStorage for persistence
    localStorage.setItem("vericred_wallet", JSON.stringify(wallet));
    setCurrentStep("role");
  };

  const handleRoleSelected = (role: "student" | "university") => {
    if (walletData) {
      const updatedWallet = { ...walletData, role };
      setWalletData(updatedWallet);
      
      // Store in localStorage for persistence
      localStorage.setItem("vericred_wallet", JSON.stringify(updatedWallet));
      
      setCurrentStep("dashboard");
      
      // Redirect based on role
      if (role === "student") {
        navigate("/dashboard");
      } else {
        navigate("/university"); // Will create this later
      }
    }
  };

  if (currentStep === "role" && walletData) {
    return (
      <>
        <ParticleBackground />
        <RoleSelector 
          onRoleSelect={handleRoleSelected} 
          walletAddress={walletData.address}
        />
      </>
    );
  }

  if (currentStep === "dashboard") {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Welcome to VeriCred!
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Redirecting to your {walletData?.role} dashboard...
          </p>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full mx-auto"
          />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dark relative overflow-hidden">
      <ParticleBackground />
      
      {/* Hero Section */}
      <div className="relative z-10">
        <div className="container mx-auto px-6 py-12">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-16"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                VeriCred
              </span>
            </div>
            <Badge variant="outline" className="border-primary/50 text-primary">
              Decentralized Platform
            </Badge>
          </motion.header>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-5xl lg:text-6xl font-bold leading-tight mb-6"
                >
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    Verified
                  </span>{" "}
                  <br />
                  Credentials
                  <br />
                  <span className="text-foreground">On-Chain</span>
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-xl text-muted-foreground mb-8 leading-relaxed"
                >
                  Secure, verifiable, and permanent academic credentials powered by blockchain technology. 
                  Join the future of digital identity and credential verification.
                </motion.p>
              </div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="grid sm:grid-cols-3 gap-6"
              >
                {[
                  { icon: Shield, title: "Secure", desc: "Blockchain-verified credentials" },
                  { icon: Zap, title: "Instant", desc: "Real-time verification" },
                  { icon: Globe, title: "Global", desc: "Universally accepted" },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center text-center p-4 rounded-lg bg-card/50 border border-border/50 backdrop-blur-sm"
                  >
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-3">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Column - Wallet Connection */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center"
            >
              <WalletConnection 
                onWalletConnected={handleWalletConnected}
                className="w-full max-w-md"
              />
            </motion.div>
          </div>

          {/* Bottom Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-16 grid sm:grid-cols-4 gap-8 text-center"
          >
            {[
              { number: "10K+", label: "Credentials Issued" },
              { number: "500+", label: "Universities" },
              { number: "50K+", label: "Students" },
              { number: "99.9%", label: "Verification Rate" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="p-4"
              >
                <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Background Image */}
      <div 
        className="absolute inset-0 opacity-5 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
    </div>
  );
};

export default Index;
