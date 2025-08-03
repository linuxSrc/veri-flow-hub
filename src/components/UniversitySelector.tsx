"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Building2, CheckCircle, AlertTriangle, ExternalLink } from "lucide-react";

interface University {
  id: string;
  name: string;
  logo: string;
  isVerified: boolean;
  walletAddress: string;
  description: string;
  credentialsAvailable: number;
}

interface UniversitySelectorProps {
  onUniversitySelect: (university: University) => void;
  selectedUniversity: University | null;
}

const mockUniversities: University[] = [
  {
    id: "mit",
    name: "Massachusetts Institute of Technology",
    logo: "🏛️",
    isVerified: true,
    walletAddress: "0x1234567890abcdef1234567890abcdef12345678",
    description: "Premier institution for technology and innovation",
    credentialsAvailable: 12
  },
  {
    id: "stanford",
    name: "Stanford University",
    logo: "🌲",
    isVerified: true,
    walletAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
    description: "Leading research university in California",
    credentialsAvailable: 8
  },
  {
    id: "harvard",
    name: "Harvard University",
    logo: "🎓",
    isVerified: true,
    walletAddress: "0x567890abcdef1234567890abcdef1234567890ab",
    description: "Ivy League institution with rich history",
    credentialsAvailable: 15
  },
  {
    id: "oxford",
    name: "University of Oxford",
    logo: "🏫",
    isVerified: false,
    walletAddress: "0xcdef1234567890abcdef1234567890abcdef1234",
    description: "Historic university in the United Kingdom",
    credentialsAvailable: 6
  }
];

export default function UniversitySelector({ onUniversitySelect, selectedUniversity }: UniversitySelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const filteredUniversities = mockUniversities.filter(uni =>
    uni.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAccessByWallet = async () => {
    if (!walletAddress.trim()) return;
    
    setIsLoading(true);
    // Mock wallet lookup
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUniversity = mockUniversities.find(
      uni => uni.walletAddress.toLowerCase() === walletAddress.toLowerCase()
    );
    
    if (foundUniversity) {
      onUniversitySelect(foundUniversity);
    }
    setIsLoading(false);
  };

  return (
    <Card className="bg-gradient-card border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-primary" />
          Select University
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search universities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Wallet Address Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Or access by wallet address:
          </label>
          <div className="flex gap-2">
            <Input
              placeholder="0x..."
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleAccessByWallet}
              disabled={!walletAddress.trim() || isLoading}
              variant="outline"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              ) : (
                <ExternalLink className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* University List */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredUniversities.map((university, index) => (
            <motion.div
              key={university.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onUniversitySelect(university)}
              className={`cursor-pointer p-4 rounded-lg border transition-all duration-300 ${
                selectedUniversity?.id === university.id
                  ? "border-primary bg-primary/10 shadow-purple"
                  : "border-border hover:border-primary/50 hover:bg-accent/50"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">{university.logo}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold truncate">{university.name}</h3>
                    {university.isVerified ? (
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {university.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {university.credentialsAvailable} credentials
                    </Badge>
                    <Badge variant={university.isVerified ? "default" : "outline"} className="text-xs">
                      {university.isVerified ? "Verified" : "Pending"}
                    </Badge>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {filteredUniversities.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No universities found matching "{searchTerm}"</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}