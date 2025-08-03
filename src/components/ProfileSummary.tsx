"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Award, 
  CheckCircle2, 
  AlertTriangle,
  MapPin,
  Calendar,
  GraduationCap,
  Edit
} from "lucide-react";

interface ProfileSummaryProps {
  userVerified: boolean;
}

const mockUserProfile = {
  name: "Alex Johnson",
  email: "alex.johnson@email.com",
  role: "Student",
  joinDate: "2023-09-15",
  location: "Boston, MA",
  university: "Massachusetts Institute of Technology",
  major: "Computer Science",
  year: "Senior",
  mintedCredentials: 3,
  pendingRequests: 2,
  verificationLevel: "Verified" as const
};

export default function ProfileSummary({ userVerified }: ProfileSummaryProps) {
  const [isEditing, setIsEditing] = useState(false);
  const profile = mockUserProfile;

  return (
    <Card className="bg-gradient-card border-primary/20">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground text-xl font-bold"
            >
              {profile.name.split(' ').map(n => n[0]).join('')}
            </motion.div>
            <div>
              <h3 className="text-xl font-bold">{profile.name}</h3>
              <p className="text-muted-foreground text-sm">{profile.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className="bg-primary/20 text-primary">
                  {profile.role}
                </Badge>
                <Badge 
                  className={`text-xs ${
                    userVerified 
                      ? "bg-green-500/20 text-green-400 border-green-500/30" 
                      : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                  }`}
                >
                  {userVerified ? (
                    <>
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Verified
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Unverified
                    </>
                  )}
                </Badge>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <GraduationCap className="h-4 w-4" />
            <span>{profile.major} • {profile.year}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{profile.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Joined {new Date(profile.joinDate).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="text-center p-3 bg-primary/10 rounded-lg border border-primary/20"
          >
            <div className="text-2xl font-bold text-primary">{profile.mintedCredentials}</div>
            <div className="text-sm text-muted-foreground">Minted NFTs</div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="text-center p-3 bg-accent/10 rounded-lg border border-accent/20"
          >
            <div className="text-2xl font-bold text-accent-foreground">{profile.pendingRequests}</div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </motion.div>
        </div>

        {isEditing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-4 pt-4 border-t border-border"
          >
            <Button variant="outline" size="sm" className="w-full">
              <User className="h-4 w-4 mr-2" />
              Edit Profile Details
            </Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}