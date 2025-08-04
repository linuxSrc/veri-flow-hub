import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Plus, Edit, BarChart3, CheckCircle, XCircle, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

// Mock credential types data
const mockCredentialTypes = [
  {
    id: 'CRED001',
    name: 'Bachelor of Science in Computer Science',
    type: 'Degree',
    description: 'Four-year undergraduate degree in Computer Science with focus on software engineering, algorithms, and data structures.',
    totalIssued: 145,
    status: 'active',
    createdAt: '2023-01-15',
    lastUpdated: '2023-12-01'
  },
  {
    id: 'CRED002',
    name: 'Master of Business Administration',
    type: 'Degree',
    description: 'Graduate degree focusing on business administration, leadership, and strategic management.',
    totalIssued: 67,
    status: 'active',
    createdAt: '2022-08-20',
    lastUpdated: '2023-11-15'
  },
  {
    id: 'CRED003',
    name: 'Certificate in Data Science',
    type: 'Certificate',
    description: 'Professional certificate program covering machine learning, statistics, and data visualization.',
    totalIssued: 89,
    status: 'active',
    createdAt: '2023-03-10',
    lastUpdated: '2023-12-10'
  },
  {
    id: 'CRED004',
    name: 'Diploma in Digital Marketing',
    type: 'Diploma',
    description: 'Comprehensive diploma program covering digital marketing strategies, SEO, and social media marketing.',
    totalIssued: 23,
    status: 'inactive',
    createdAt: '2023-06-01',
    lastUpdated: '2023-10-05'
  }
];

export function CredentialManagement() {
  const [credentialTypes, setCredentialTypes] = useState(mockCredentialTypes);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: ''
  });
  const { toast } = useToast();

  const handleCreateCredential = () => {
    if (!formData.name || !formData.type || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const newCredential = {
      id: `CRED${String(credentialTypes.length + 1).padStart(3, '0')}`,
      name: formData.name,
      type: formData.type,
      description: formData.description,
      totalIssued: 0,
      status: 'active' as const,
      createdAt: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    setCredentialTypes([...credentialTypes, newCredential]);
    setFormData({ name: '', type: '', description: '' });
    setIsCreateDialogOpen(false);

    toast({
      title: "Credential Type Created",
      description: `${formData.name} has been added to your credential types.`
    });
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' ? (
      <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10">
        <CheckCircle className="h-3 w-3 mr-1" />
        Active
      </Badge>
    ) : (
      <Badge variant="outline" className="border-muted-foreground/30 text-muted-foreground bg-muted/10">
        <XCircle className="h-3 w-3 mr-1" />
        Inactive
      </Badge>
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'degree':
        return '🎓';
      case 'certificate':
        return '📜';
      case 'diploma':
        return '🏅';
      default:
        return '📋';
    }
  };

  return (
    <Card className="bg-gradient-to-br from-card/80 to-accent/5 border-border/40">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl flex items-center">
              <Award className="h-5 w-5 mr-2 text-primary" />
              Credential Management
            </CardTitle>
            <CardDescription>
              Create and manage credential types that your university can issue
            </CardDescription>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30">
                <Plus className="h-4 w-4 mr-2" />
                New Credential Type
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px] bg-background/95 backdrop-blur-sm border-border/40">
              <DialogHeader>
                <DialogTitle className="flex items-center text-foreground">
                  <Award className="h-5 w-5 mr-2 text-primary" />
                  Create New Credential Type
                </DialogTitle>
                <DialogDescription>
                  Define a new type of credential that your university can issue to students.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
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
                  <Label htmlFor="type">Credential Type *</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger className="bg-background/50 border-border/40">
                      <SelectValue placeholder="Select credential type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Degree">🎓 Degree</SelectItem>
                      <SelectItem value="Certificate">📜 Certificate</SelectItem>
                      <SelectItem value="Diploma">🏅 Diploma</SelectItem>
                      <SelectItem value="Course">📚 Course</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what this credential represents and its requirements..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="bg-background/50 border-border/40 min-h-[100px]"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateCredential} className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30">
                  Create Credential Type
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4">
          {credentialTypes.map((credential, index) => (
            <motion.div
              key={credential.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-background/50 border-border/40 hover:bg-background/70 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="text-2xl">{getTypeIcon(credential.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-foreground truncate">
                            {credential.name}
                          </h3>
                          {getStatusBadge(credential.status)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                          {credential.description}
                        </p>
                        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Badge variant="secondary" className="bg-primary/10 text-primary">
                              {credential.type}
                            </Badge>
                          </div>
                          <div>
                            <span className="font-medium text-primary">{credential.totalIssued}</span> issued
                          </div>
                          <div>
                            Created {credential.createdAt}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                        <BarChart3 className="h-4 w-4 mr-1" />
                        Stats
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {credentialTypes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No credential types found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Create your first credential type to start issuing NFT credentials to students.
            </p>
            <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30">
              <Plus className="h-4 w-4 mr-2" />
              Create First Credential Type
            </Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}