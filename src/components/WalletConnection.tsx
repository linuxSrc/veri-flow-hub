"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WalletData {
  address: string;
  chainId: number;
  isConnected: boolean;
  role?: "student" | "university";
}

interface WalletConnectionProps {
  onWalletConnected: (wallet: WalletData) => void;
  className?: string;
}

export default function WalletConnection({ onWalletConnected, className }: WalletConnectionProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const { toast } = useToast();

  const connectWallet = async () => {
    setIsConnecting(true);
    
    try {
      // Simulate MetaMask connection
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock wallet data
      const mockWallet: WalletData = {
        address: "0x742d35Cc6634C0532925a3b8D4B8f8cf",
        chainId: 1,
        isConnected: true,
      };
      
      setWallet(mockWallet);
      onWalletConnected(mockWallet);
      
      toast({
        title: "Wallet Connected",
        description: "Successfully connected to MetaMask",
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWallet(null);
    toast({
      title: "Wallet Disconnected",
      description: "Successfully disconnected from MetaMask",
    });
  };

  if (wallet?.isConnected) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
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
                  <p className="text-sm font-medium">Wallet Connected</p>
                  <p className="text-xs text-muted-foreground">
                    {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-primary/20 text-primary">
                  Ethereum
                </Badge>
                <Button variant="ghost" size="sm" onClick={disconnectWallet}>
                  Disconnect
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={className}
    >
      <Card className="bg-gradient-card border-primary/20 hover:border-primary/40 transition-all duration-300">
        <CardContent className="p-6 text-center">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-4"
          >
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
              <Wallet className="h-8 w-8 text-primary-foreground" />
            </div>
          </motion.div>
          
          <h3 className="text-xl font-semibold mb-2">Connect Your Wallet</h3>
          <p className="text-muted-foreground mb-6">
            Connect your MetaMask wallet to access VeriCred's decentralized credential platform
          </p>
          
          <Button 
            variant="hero" 
            onClick={connectWallet}
            disabled={isConnecting}
            className="w-full"
          >
            {isConnecting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
              />
            ) : (
              <>
                <Wallet className="h-5 w-5" />
                Connect MetaMask
              </>
            )}
          </Button>
          
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <AlertCircle className="h-4 w-4" />
            <span>Make sure MetaMask is installed in your browser</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}