"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, LogOut, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WalletStatusProps {
  className?: string;
}

export default function WalletStatus({ className }: WalletStatusProps) {
  const [walletData, setWalletData] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("vericred_wallet");
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  });
  const { toast } = useToast();

  const disconnectWallet = () => {
    localStorage.removeItem("vericred_wallet");
    setWalletData(null);
    toast({
      title: "Wallet Disconnected",
      description: "Successfully disconnected from MetaMask",
    });
    // Redirect to homepage
    window.location.href = "/";
  };

  if (!walletData?.isConnected) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={className}
    >
      <Card className="bg-gradient-card border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-full">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Wallet className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {walletData.address?.slice(0, 6)}...{walletData.address?.slice(-4)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-primary/20 text-primary text-xs">
                    {walletData.role === "student" ? "Student" : "University"}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Ethereum
                  </Badge>
                </div>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={disconnectWallet}
              className="hover:text-destructive"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}