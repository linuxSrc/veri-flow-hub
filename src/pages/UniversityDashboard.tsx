import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Award, Settings, LogOut, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UniversityProfile } from '@/components/UniversityProfile';
import { StudentManagement } from '@/components/StudentManagement';
import { CredentialManagement } from '@/components/CredentialManagement';
import { UniversitySettings } from '@/components/UniversitySettings';
import { MintCredentialModal } from '@/components/MintCredentialModal';
import { useToast } from '@/hooks/use-toast';

// Mock university data
const mockUniversity = {
  id: 'univ_001',
  name: 'Stanford University',
  website: 'https://stanford.edu',
  description: 'A leading research university dedicated to finding solutions to the great challenges of the day and to preparing our students for leadership in an increasingly complex world.',
  logo: '/placeholder.svg',
  banner: '/placeholder.svg',
  walletAddress: '0x742d35Cc6567C6532c7D22C4a6d8b8E7e8B85b3d',
  verificationStatus: 'verified' as const,
  adminName: 'Dr. Sarah Johnson',
  adminEmail: 'admin@stanford.edu',
  adminWallet: '0x742d35Cc6567C6532c7D22C4a6d8b8E7e8B85b3d'
};

const mockQuickStats = {
  totalStudents: 1247,
  credentialsIssued: 3891,
  pendingRequests: 23
};

const mockRecentActivity = [
  { id: 1, action: 'Credential minted for John Doe', timestamp: '2 hours ago' },
  { id: 2, action: 'New student registered: Jane Smith', timestamp: '4 hours ago' },
  { id: 3, action: 'Profile verification completed', timestamp: '1 day ago' },
  { id: 4, action: 'Bulk credential update processed', timestamp: '2 days ago' }
];

export function UniversityDashboard() {
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isMintModalOpen, setIsMintModalOpen] = useState(false);
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem('walletConnection');
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your university account."
    });
    window.location.href = '/';
  };

  const handleMintCredential = (student: any) => {
    setSelectedStudent(student);
    setIsMintModalOpen(true);
  };

  const handleMintSuccess = () => {
    setIsMintModalOpen(false);
    setSelectedStudent(null);
    toast({
      title: "Credential Minted Successfully",
      description: `NFT credential has been minted for ${selectedStudent?.name}`
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-accent/5">
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-40"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <Shield className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  VeriCred
                </h1>
              </div>
              <Badge variant="secondary" className="bg-accent/20 text-accent-foreground border-accent/30">
                <Building className="h-3 w-3 mr-1" />
                University Admin
              </Badge>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{mockUniversity.name}</p>
                <div className="flex items-center space-x-1">
                  <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                    <Shield className="h-2 w-2 mr-1" />
                    Verified
                  </Badge>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="border-destructive/30 text-destructive hover:bg-destructive/10"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-card/50 backdrop-blur-sm border border-border/40">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <Building className="h-4 w-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="students" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Students</span>
            </TabsTrigger>
            <TabsTrigger value="credentials" className="flex items-center space-x-2">
              <Award className="h-4 w-4" />
              <span>Credentials</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="grid gap-6 lg:grid-cols-3"
            >
              {/* University Profile */}
              <div className="lg:col-span-2">
                <UniversityProfile university={mockUniversity} />
              </div>

              {/* Quick Stats & Activity */}
              <div className="space-y-6">
                {/* Quick Stats */}
                <Card className="bg-gradient-to-br from-card/80 to-accent/5 border-border/40">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Students</span>
                      <span className="font-semibold text-primary">{mockQuickStats.totalStudents}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Credentials Issued</span>
                      <span className="font-semibold text-primary">{mockQuickStats.credentialsIssued}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Pending Requests</span>
                      <span className="font-semibold text-accent">{mockQuickStats.pendingRequests}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="bg-gradient-to-br from-card/80 to-accent/5 border-border/40">
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockRecentActivity.map((activity) => (
                        <div key={activity.id} className="flex justify-between items-start">
                          <span className="text-sm text-foreground">{activity.action}</span>
                          <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                            {activity.timestamp}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="students">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <StudentManagement onMintCredential={handleMintCredential} />
            </motion.div>
          </TabsContent>

          <TabsContent value="credentials">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <CredentialManagement />
            </motion.div>
          </TabsContent>

          <TabsContent value="settings">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <UniversitySettings university={mockUniversity} />
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Mint Credential Modal */}
      <MintCredentialModal
        isOpen={isMintModalOpen}
        onClose={() => setIsMintModalOpen(false)}
        student={selectedStudent}
        university={mockUniversity}
        onSuccess={handleMintSuccess}
      />
    </div>
  );
}