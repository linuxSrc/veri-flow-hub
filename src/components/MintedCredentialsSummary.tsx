"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Calendar, ExternalLink, Eye } from "lucide-react";

interface MintedCredential {
  id: string;
  name: string;
  university: string;
  type: string;
  mintDate: string;
  tokenId: string;
  imageUrl?: string;
}

const mockMintedCredentials: MintedCredential[] = [
  {
    id: "cred-1",
    name: "Research Internship Completion",
    university: "MIT",
    type: "Experience",
    mintDate: "2024-08-15",
    tokenId: "#1337",
    imageUrl: "🏆"
  },
  {
    id: "cred-2",
    name: "Blockchain Development Certificate",
    university: "Stanford",
    type: "Certificate",
    mintDate: "2024-07-22",
    tokenId: "#1521",
    imageUrl: "⛓️"
  },
  {
    id: "cred-3",
    name: "Dean's List Recognition",
    university: "Harvard",
    type: "Achievement",
    mintDate: "2024-06-10",
    tokenId: "#2048",
    imageUrl: "🌟"
  }
];

export default function MintedCredentialsSummary() {
  const latestCredentials = mockMintedCredentials.slice(0, 3);

  return (
    <Card className="bg-gradient-card border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            <span>My Credentials</span>
          </div>
          <Badge variant="secondary" className="bg-primary/20 text-primary">
            {mockMintedCredentials.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {latestCredentials.map((credential, index) => (
          <motion.div
            key={credential.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-3 border border-border rounded-lg hover:border-primary/50 transition-all duration-300 group"
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">{credential.imageUrl}</div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm line-clamp-2 mb-1">
                  {credential.name}
                </h4>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <span>{credential.university}</span>
                  <span>•</span>
                  <span>{credential.type}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{credential.mintDate}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {credential.tokenId}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="mt-3 flex gap-2">
              <Button size="sm" variant="ghost" className="h-8 text-xs flex-1">
                <Eye className="h-3 w-3 mr-1" />
                View
              </Button>
              <Button size="sm" variant="ghost" className="h-8 text-xs flex-1">
                <ExternalLink className="h-3 w-3 mr-1" />
                Share
              </Button>
            </div>
          </motion.div>
        ))}

        {mockMintedCredentials.length === 0 && (
          <div className="text-center py-6 text-muted-foreground">
            <Award className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No credentials minted yet</p>
            <p className="text-xs">Start by requesting credentials from universities</p>
          </div>
        )}

        {mockMintedCredentials.length > 3 && (
          <Button variant="outline" className="w-full" size="sm">
            View All Credentials ({mockMintedCredentials.length})
          </Button>
        )}
      </CardContent>
    </Card>
  );
}