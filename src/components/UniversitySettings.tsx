import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, User, Globe, Upload, Wallet, Shield, Save, Camera } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

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

interface UniversitySettingsProps {
  university: University;
}

export function UniversitySettings({ university }: UniversitySettingsProps) {
  const [formData, setFormData] = useState({
    name: university.name,
    website: university.website,
    description: university.description,
    adminName: university.adminName,
    adminEmail: university.adminEmail
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    toast({
      title: "Settings Updated",
      description: "Your university profile has been successfully updated."
    });
  };

  const handleFileUpload = (type: 'logo' | 'banner') => {
    toast({
      title: `${type === 'logo' ? 'Logo' : 'Banner'} Upload`,
      description: "File upload functionality would be implemented here."
    });
  };

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
    <div className="space-y-6">
      {/* Profile Settings */}
      <Card className="bg-gradient-to-br from-card/80 to-accent/5 border-border/40">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <User className="h-5 w-5 mr-2 text-primary" />
            Profile Settings
          </CardTitle>
          <CardDescription>
            Update your university's public profile information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Logo and Banner Upload */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <Label className="text-sm font-medium">University Logo</Label>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-lg bg-muted/50 border-2 border-dashed border-border/40 flex items-center justify-center">
                  <Camera className="h-6 w-6 text-muted-foreground" />
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleFileUpload('logo')}
                  className="border-primary/30 text-primary hover:bg-primary/10"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Logo
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Banner Image</Label>
              <div className="flex items-center space-x-4">
                <div className="w-24 h-12 rounded-lg bg-muted/50 border-2 border-dashed border-border/40 flex items-center justify-center">
                  <Camera className="h-4 w-4 text-muted-foreground" />
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleFileUpload('banner')}
                  className="border-primary/30 text-primary hover:bg-primary/10"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Banner
                </Button>
              </div>
            </div>
          </div>

          <Separator className="bg-border/40" />

          {/* Basic Information */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">University Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-background/50 border-border/40"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website URL</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="bg-background/50 border-border/40"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-background/50 border-border/40 min-h-[120px]"
              placeholder="Describe your university..."
            />
          </div>

          <Separator className="bg-border/40" />

          {/* Administrator Information */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-foreground">Administrator Information</h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="adminName">Administrator Name</Label>
                <Input
                  id="adminName"
                  value={formData.adminName}
                  onChange={(e) => setFormData({ ...formData, adminName: e.target.value })}
                  className="bg-background/50 border-border/40"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="adminEmail">Administrator Email</Label>
                <Input
                  id="adminEmail"
                  type="email"
                  value={formData.adminEmail}
                  onChange={(e) => setFormData({ ...formData, adminEmail: e.target.value })}
                  className="bg-background/50 border-border/40"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button 
              onClick={handleSave}
              disabled={isLoading}
              className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Wallet Management */}
      <Card className="bg-gradient-to-br from-card/80 to-accent/5 border-border/40">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Wallet className="h-5 w-5 mr-2 text-primary" />
            Wallet Management
          </CardTitle>
          <CardDescription>
            Manage your official minting wallet and verification status
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/40">
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-full bg-primary/10">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Official Minting Wallet</p>
                <code className="text-sm text-muted-foreground font-mono">
                  {formatWalletAddress(university.walletAddress)}
                </code>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className={getStatusColor(university.verificationStatus)}>
                <Shield className="h-3 w-3 mr-1" />
                Verified
              </Badge>
              <Button variant="outline" size="sm">
                Update
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/40">
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-full bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Platform Verification</p>
                <p className="text-sm text-muted-foreground">
                  Your university is verified on the VeriCred platform
                </p>
              </div>
            </div>
            <Badge variant="outline" className={getStatusColor(university.verificationStatus)}>
              <Shield className="h-3 w-3 mr-1" />
              {university.verificationStatus === 'verified' ? 'Verified' : 'Pending'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="bg-gradient-to-br from-card/80 to-accent/5 border-border/40">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Shield className="h-5 w-5 mr-2 text-primary" />
            Security & Verification
          </CardTitle>
          <CardDescription>
            Security settings and verification status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6 border border-primary/20"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/20">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    University Verification Complete
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Your university has been fully verified on the VeriCred platform. You can now issue official NFT credentials to your students.
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div>✅ Identity Verified</div>
                    <div>✅ Wallet Verified</div>
                    <div>✅ Accreditation Confirmed</div>
                  </div>
                </div>
              </div>
              <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10">
                Verified
              </Badge>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}