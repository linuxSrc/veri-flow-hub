import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Globe, Building, Mail, Wallet } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface University {
  id: string;
  name: string;
  website: string;
  description: string;
  logo: string;
  banner: string;
  walletAddress: string;
  verificationStatus: 'verified' | 'pending' | 'unverified';
  adminName: string;
  adminEmail: string;
  adminWallet: string;
}

interface UniversityProfileProps {
  university: University;
}

export function UniversityProfile({ university }: UniversityProfileProps) {
  const formatWalletAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'border-primary/30 text-primary bg-primary/10';
      case 'pending':
        return 'border-accent/30 text-accent bg-accent/10';
      default:
        return 'border-muted-foreground/30 text-muted-foreground bg-muted/10';
    }
  };

  return (
    <Card className="bg-gradient-to-br from-card/80 to-accent/5 border-border/40 overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16 border-2 border-primary/20">
              <AvatarImage src={university.logo} alt={university.name} />
              <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                {university.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl">{university.name}</CardTitle>
              <CardDescription className="flex items-center space-x-2 mt-1">
                <Globe className="h-3 w-3" />
                <span>{university.website}</span>
              </CardDescription>
            </div>
          </div>
          <Badge variant="outline" className={getStatusColor(university.verificationStatus)}>
            <Shield className="h-3 w-3 mr-1" />
            {university.verificationStatus === 'verified' ? 'Verified' : 'Pending'}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Description */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-2">About</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {university.description}
          </p>
        </div>

        {/* Institution Details */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground flex items-center">
              <Building className="h-4 w-4 mr-2 text-primary" />
              Institution Details
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Official Wallet</span>
                <code className="text-xs bg-muted/50 px-2 py-1 rounded font-mono">
                  {formatWalletAddress(university.walletAddress)}
                </code>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Verification</span>
                <Badge variant="outline" className={getStatusColor(university.verificationStatus)}>
                  {university.verificationStatus}
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground flex items-center">
              <Mail className="h-4 w-4 mr-2 text-primary" />
              Administrator
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Name</span>
                <span className="font-medium">{university.adminName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Email</span>
                <span className="font-medium">{university.adminEmail}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Wallet</span>
                <code className="text-xs bg-muted/50 px-2 py-1 rounded font-mono">
                  {formatWalletAddress(university.adminWallet)}
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Integration Status */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4 border border-primary/20"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-primary/20">
                <Wallet className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Platform Integration</p>
                <p className="text-xs text-muted-foreground">
                  Fully integrated with VeriCred blockchain network
                </p>
              </div>
            </div>
            <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10">
              Active
            </Badge>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}