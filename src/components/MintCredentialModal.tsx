import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, User, Building, Sparkles, X, Calendar, Hash, Globe, Play, Palette } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface CredentialFormData {
  name: string;
  description: string;
  image: string;
  external_url: string;
  credentialType: string;
  major: string;
  gpa: string;
  issueDate: string;
  graduationDate: string;
  credentialId: string;
  verificationUrl: string;
  accreditationBody: string;
  programDetails: string;
  animation_url: string;
  youtube_url: string;
  background_color: string;
}

interface MintCredentialModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: any;
  university: any;
  onSuccess: () => void;
}

export function MintCredentialModal({ isOpen, onClose, student, university, onSuccess }: MintCredentialModalProps) {
  const [currentTab, setCurrentTab] = useState('basic');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CredentialFormData>({
    name: '',
    description: '',
    image: '',
    external_url: '',
    credentialType: '',
    major: '',
    gpa: '',
    issueDate: new Date().toISOString().split('T')[0],
    graduationDate: '',
    credentialId: '',
    verificationUrl: '',
    accreditationBody: '',
    programDetails: '',
    animation_url: '',
    youtube_url: '',
    background_color: '#6366f1'
  });
  const { toast } = useToast();

  React.useEffect(() => {
    if (student && university) {
      setFormData(prev => ({
        ...prev,
        major: student.major || '',
        gpa: student.gpa?.toString() || '',
        graduationDate: `${student.graduationYear}-06-15`,
        credentialId: `${university.id}_${student.universityId}_${Date.now()}`,
        verificationUrl: `https://vericred.app/verify/${university.id}/${student.id}`,
        accreditationBody: university.name
      }));
    }
  }, [student, university]);

  const handleMint = async () => {
    if (!formData.name || !formData.description || !formData.credentialType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate minting process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsLoading(false);
    onSuccess();
  };

  const formatWalletAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Animated particles for the header
  const particles = Array.from({ length: 12 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute w-1 h-1 bg-primary/30 rounded-full"
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        x: [0, Math.random() * 200 - 100],
        y: [0, Math.random() * 200 - 100],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        delay: i * 0.2,
        ease: "easeInOut"
      }}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
    />
  ));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden bg-background/95 backdrop-blur-sm border-border/40">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Animated Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="relative overflow-hidden bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 p-6 rounded-t-lg border-b border-border/40"
          >
            {/* Animated particles */}
            <div className="absolute inset-0 overflow-hidden">
              {particles}
            </div>

            {/* Floating sparkles */}
            <motion.div
              className="absolute top-4 right-16"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="h-6 w-6 text-accent" />
            </motion.div>

            <DialogHeader className="relative z-10">
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Mint New Credential
              </DialogTitle>
              <div className="flex items-center space-x-4 mt-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>Student: <span className="font-medium text-foreground">{student?.name}</span></span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Building className="h-4 w-4" />
                  <span>University: <span className="font-medium text-foreground">{university?.name}</span></span>
                </div>
              </div>
            </DialogHeader>

            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          </motion.div>

          {/* Form Content */}
          <div className="p-6 max-h-[calc(90vh-180px)] overflow-y-auto">
            <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-card/50 backdrop-blur-sm border border-border/40">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="academic">Academic Details</TabsTrigger>
                <TabsTrigger value="metadata">Metadata & URLs</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <TabsContent value="basic" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Credential Name *</Label>
                        <Input
                          id="name"
                          placeholder="e.g., Bachelor of Science in Computer Science"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="bg-background/50 border-border/40"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="credentialType">Credential Type *</Label>
                        <Select value={formData.credentialType} onValueChange={(value) => setFormData({ ...formData, credentialType: value })}>
                          <SelectTrigger className="bg-background/50 border-border/40">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Degree">🎓 Degree</SelectItem>
                            <SelectItem value="Certificate">📜 Certificate</SelectItem>
                            <SelectItem value="Diploma">🏅 Diploma</SelectItem>
                            <SelectItem value="Course">📚 Course</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe the credential and its significance..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="bg-background/50 border-border/40 min-h-[100px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="image">Credential Image URL</Label>
                      <Input
                        id="image"
                        placeholder="https://example.com/credential-image.png"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="bg-background/50 border-border/40"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="academic" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="major">Major/Program</Label>
                        <Input
                          id="major"
                          placeholder="e.g., Computer Science"
                          value={formData.major}
                          onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                          className="bg-background/50 border-border/40"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gpa">GPA</Label>
                        <Input
                          id="gpa"
                          placeholder="e.g., 3.8"
                          value={formData.gpa}
                          onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                          className="bg-background/50 border-border/40"
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="issueDate">Issue Date</Label>
                        <Input
                          id="issueDate"
                          type="date"
                          value={formData.issueDate}
                          onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                          className="bg-background/50 border-border/40"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="graduationDate">Graduation Date</Label>
                        <Input
                          id="graduationDate"
                          type="date"
                          value={formData.graduationDate}
                          onChange={(e) => setFormData({ ...formData, graduationDate: e.target.value })}
                          className="bg-background/50 border-border/40"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="programDetails">Program Details</Label>
                      <Textarea
                        id="programDetails"
                        placeholder="Additional program information..."
                        value={formData.programDetails}
                        onChange={(e) => setFormData({ ...formData, programDetails: e.target.value })}
                        className="bg-background/50 border-border/40"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="metadata" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="credentialId">Credential ID</Label>
                        <Input
                          id="credentialId"
                          value={formData.credentialId}
                          onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
                          className="bg-background/50 border-border/40 font-mono text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="accreditationBody">Accreditation Body</Label>
                        <Input
                          id="accreditationBody"
                          value={formData.accreditationBody}
                          onChange={(e) => setFormData({ ...formData, accreditationBody: e.target.value })}
                          className="bg-background/50 border-border/40"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="verificationUrl">Verification URL</Label>
                      <Input
                        id="verificationUrl"
                        value={formData.verificationUrl}
                        onChange={(e) => setFormData({ ...formData, verificationUrl: e.target.value })}
                        className="bg-background/50 border-border/40 font-mono text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="external_url">External URL</Label>
                      <Input
                        id="external_url"
                        placeholder="https://university.edu/credentials"
                        value={formData.external_url}
                        onChange={(e) => setFormData({ ...formData, external_url: e.target.value })}
                        className="bg-background/50 border-border/40"
                      />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="animation_url">Animation URL</Label>
                        <Input
                          id="animation_url"
                          placeholder="https://example.com/animation.mp4"
                          value={formData.animation_url}
                          onChange={(e) => setFormData({ ...formData, animation_url: e.target.value })}
                          className="bg-background/50 border-border/40"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="youtube_url">YouTube URL</Label>
                        <Input
                          id="youtube_url"
                          placeholder="https://youtube.com/watch?v=..."
                          value={formData.youtube_url}
                          onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
                          className="bg-background/50 border-border/40"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="background_color">Background Color</Label>
                      <div className="flex items-center space-x-3">
                        <Input
                          id="background_color"
                          type="color"
                          value={formData.background_color}
                          onChange={(e) => setFormData({ ...formData, background_color: e.target.value })}
                          className="w-16 h-10 bg-background/50 border-border/40"
                        />
                        <Input
                          placeholder="#6366f1"
                          value={formData.background_color}
                          onChange={(e) => setFormData({ ...formData, background_color: e.target.value })}
                          className="bg-background/50 border-border/40 font-mono text-sm"
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="preview" className="space-y-4">
                    <Card className="bg-gradient-to-br from-card/80 to-accent/5 border-border/40">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Award className="h-5 w-5 mr-2 text-primary" />
                          NFT Credential Preview
                        </CardTitle>
                        <CardDescription>
                          Preview of the credential that will be minted
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid gap-6 md:grid-cols-2">
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold text-foreground mb-2">{formData.name || 'Credential Name'}</h4>
                              <p className="text-sm text-muted-foreground">
                                {formData.description || 'Credential description will appear here...'}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10">
                                {formData.credentialType || 'Type'}
                              </Badge>
                              {formData.major && (
                                <Badge variant="secondary">{formData.major}</Badge>
                              )}
                            </div>
                            <div className="space-y-2 text-sm">
                              {formData.gpa && (
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">GPA:</span>
                                  <span className="font-medium">{formData.gpa}</span>
                                </div>
                              )}
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Issue Date:</span>
                                <span className="font-medium">{formData.issueDate}</span>
                              </div>
                              {formData.graduationDate && (
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Graduation:</span>
                                  <span className="font-medium">{formData.graduationDate}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div className="aspect-square rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-dashed border-border/40 flex items-center justify-center">
                              {formData.image ? (
                                <img src={formData.image} alt="Credential" className="max-w-full max-h-full object-contain rounded-lg" />
                              ) : (
                                <div className="text-center">
                                  <Award className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                                  <p className="text-sm text-muted-foreground">Credential Image</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="border-t border-border/40 pt-4">
                          <div className="grid gap-2 text-xs text-muted-foreground">
                            <div className="flex justify-between">
                              <span>Credential ID:</span>
                              <code className="font-mono">{formData.credentialId || 'Auto-generated'}</code>
                            </div>
                            <div className="flex justify-between">
                              <span>Issued by:</span>
                              <span>{university?.name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Recipient:</span>
                              <span>{student?.name}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </motion.div>
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-border/40">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <div className="flex items-center space-x-3">
                  {currentTab !== 'preview' && (
                    <Button 
                      variant="ghost" 
                      onClick={() => {
                        const tabs = ['basic', 'academic', 'metadata', 'preview'];
                        const nextIndex = tabs.indexOf(currentTab) + 1;
                        if (nextIndex < tabs.length) {
                          setCurrentTab(tabs[nextIndex]);
                        }
                      }}
                    >
                      Next Step
                    </Button>
                  )}
                  <Button 
                    onClick={handleMint}
                    disabled={isLoading || !formData.name || !formData.description || !formData.credentialType}
                    className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent mr-2" />
                        Minting NFT...
                      </>
                    ) : (
                      <>
                        <Award className="h-4 w-4 mr-2" />
                        Mint NFT
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Tabs>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}