"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface WalletGuardProps {
  children: React.ReactNode;
}

export default function WalletGuard({ children }: WalletGuardProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if wallet is connected (mock check)
    const checkWalletConnection = () => {
      const walletData = localStorage.getItem("vericred_wallet");
      if (walletData) {
        try {
          const parsed = JSON.parse(walletData);
          setIsConnected(parsed.isConnected || false);
        } catch {
          setIsConnected(false);
        }
      } else {
        setIsConnected(false);
      }
      setIsLoading(false);
    };

    checkWalletConnection();
  }, []);

  useEffect(() => {
    if (!isLoading && !isConnected) {
      navigate("/");
    }
  }, [isLoading, isConnected, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Checking wallet connection...</p>
        </div>
      </div>
    );
  }

  if (!isConnected) {
    return null; // Will redirect
  }

  return <>{children}</>;
}