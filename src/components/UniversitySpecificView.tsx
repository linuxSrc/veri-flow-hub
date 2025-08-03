"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Award,
  Calendar,
  User,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Credential {
  id: string;
  name: string;
  type: string;
  description: string;
  status: "eligible" | "pending" | "minted" | "rejected";
  issueDate?: string;
  expiryDate?: string;
  gpa?: number;
  major?: string;
}

interface University {
  id: string;
  name: string;
  logo: string;
  isVerified: boolean;
}

interface UniversitySpecificViewProps {
  university: University;
  userVerified: boolean;
}

const mockCredentials: Record<string, Credential[]> = {
  mit: [
    {
      id: "mit-cs-bs",
      name: "Bachelor of Science in Computer Science",
      type: "Degree",
      description: "Undergraduate degree in Computer Science",
      status: "eligible",
      gpa: 3.8,
      major: "Computer Science"
    },
    {
      id: "mit-ai-cert",
      name: "Artificial Intelligence Certificate",
      type: "Certificate",
      description: "Advanced AI and Machine Learning specialization",
      status: "pending",
      gpa: 3.9,
      major: "Computer Science"
    },
    {
      id: "mit-intern",
      name: "Research Internship Completion",
      type: "Experience",
      description: "Summer research program completion",
      status: "minted",
      issueDate: "2024-08-15",
      major: "Computer Science"
    }
  ],
  stanford: [
    {
      id: "stanford-ms",
      name: "Master of Science in Engineering",
      type: "Degree",
      description: "Graduate degree in Engineering",
      status: "eligible",
      gpa: 3.7,
      major: "Engineering"
    },
    {
      id: "stanford-leadership",
      name: "Leadership Excellence Program",
      type: "Certificate",
      description: "Leadership and management skills certification",
      status: "rejected",
      major: "Management"
    }
  ],
  harvard: [
    {
      id: "harvard-law",
      name: "Doctor of Law",
      type: "Degree",
      description: "Professional law degree",
      status: "eligible",
      gpa: 3.9,
      major: "Law"
    }
  ],
  oxford: []
};

const getStatusIcon = (status: Credential["status"]) => {
  switch (status) {
    case "eligible":
      return <Award className="h-5 w-5 text-green-500" />;
    case "pending":
      return <Clock className="h-5 w-5 text-yellow-500" />;
    case "minted":
      return <CheckCircle2 className="h-5 w-5 text-blue-500" />;
    case "rejected":
      return <XCircle className="h-5 w-5 text-red-500" />;
  }
};

const getStatusColor = (status: Credential["status"]) => {
  switch (status) {
    case "eligible":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    case "pending":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    case "minted":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "rejected":
      return "bg-red-500/20 text-red-400 border-red-500/30";
  }
};

export default function UniversitySpecificView({ university, userVerified }: UniversitySpecificViewProps) {
  const [isRequesting, setIsRequesting] = useState<string | null>(null);
  const { toast } = useToast();

  const credentials = mockCredentials[university.id] || [];

  const handleMintRequest = async (credentialId: string) => {
    setIsRequesting(credentialId);
    
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Mint Request Submitted",
      description: "Your NFT credential mint request has been submitted for review",
    });
    
    setIsRequesting(null);
  };

  if (credentials.length === 0) {
    return (
      <Card className="bg-gradient-card border-primary/20">
        <CardContent className="p-8 text-center">
          <GraduationCap className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
          <h3 className="text-lg font-semibold mb-2">No Credentials Available</h3>
          <p className="text-muted-foreground">
            {university.name} hasn't uploaded any credentials yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-card border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <span className="text-2xl">{university.logo}</span>
          <div>
            <h3>{university.name}</h3>
            <p className="text-sm text-muted-foreground font-normal">
              Available Credentials
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!userVerified && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <div>
                <h4 className="font-medium text-yellow-400">Profile Verification Required</h4>
                <p className="text-sm text-yellow-300/80">
                  Complete profile verification to request NFT credentials
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="space-y-4">
          {credentials.map((credential, index) => (
            <motion.div
              key={credential.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 border border-border rounded-lg hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  {getStatusIcon(credential.status)}
                  <div>
                    <h4 className="font-semibold">{credential.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {credential.description}
                    </p>
                  </div>
                </div>
                <Badge className={`text-xs ${getStatusColor(credential.status)}`}>
                  {credential.status.charAt(0).toUpperCase() + credential.status.slice(1)}
                </Badge>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Award className="h-4 w-4" />
                  <span>{credential.type}</span>
                </div>
                {credential.major && (
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{credential.major}</span>
                  </div>
                )}
                {credential.gpa && (
                  <div className="flex items-center gap-1">
                    <GraduationCap className="h-4 w-4" />
                    <span>GPA: {credential.gpa}</span>
                  </div>
                )}
                {credential.issueDate && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Issued: {credential.issueDate}</span>
                  </div>
                )}
              </div>

              {credential.status === "eligible" && (
                <Button
                  onClick={() => handleMintRequest(credential.id)}
                  disabled={!userVerified || isRequesting === credential.id}
                  className="w-full"
                  variant={userVerified ? "default" : "outline"}
                >
                  {isRequesting === credential.id ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                      Processing Request...
                    </>
                  ) : (
                    <>
                      <Award className="h-4 w-4 mr-2" />
                      Request NFT Mint
                    </>
                  )}
                </Button>
              )}

              {credential.status === "pending" && (
                <div className="text-center text-sm text-muted-foreground">
                  Your mint request is being reviewed
                </div>
              )}

              {credential.status === "minted" && (
                <Button variant="outline" className="w-full" disabled>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  NFT Minted
                </Button>
              )}

              {credential.status === "rejected" && (
                <div className="text-center text-sm text-red-400">
                  Request was rejected. Contact university for details.
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}