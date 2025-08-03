"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Eye, 
  Shield, 
  User, 
  HelpCircle,
  ExternalLink,
  Settings,
  Download,
  Share
} from "lucide-react";

const quickActions = [
  {
    id: "portfolio",
    title: "View Full Portfolio",
    description: "See all your credentials",
    icon: Eye,
    color: "text-blue-500",
    bgColor: "bg-blue-500/20"
  },
  {
    id: "verify",
    title: "Verify Credential",
    description: "Check authenticity",
    icon: Shield,
    color: "text-green-500",
    bgColor: "bg-green-500/20"
  },
  {
    id: "profile",
    title: "Edit Profile",
    description: "Update your information",
    icon: User,
    color: "text-purple-500",
    bgColor: "bg-purple-500/20"
  },
  {
    id: "download",
    title: "Download Credentials",
    description: "Export as PDF/JSON",
    icon: Download,
    color: "text-orange-500",
    bgColor: "bg-orange-500/20"
  },
  {
    id: "share",
    title: "Share Portfolio",
    description: "Generate shareable link",
    icon: Share,
    color: "text-pink-500",
    bgColor: "bg-pink-500/20"
  },
  {
    id: "help",
    title: "Help & Support",
    description: "Get assistance",
    icon: HelpCircle,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/20"
  }
];

export default function QuickActions() {
  const handleAction = (actionId: string) => {
    console.log(`Quick action: ${actionId}`);
    // Here you would implement the actual functionality
  };

  return (
    <Card className="bg-gradient-card border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-primary" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  onClick={() => handleAction(action.id)}
                  className="h-auto p-3 flex flex-col items-center text-center w-full hover:bg-accent/50 border border-transparent hover:border-primary/20"
                >
                  <div className={`w-10 h-10 rounded-full ${action.bgColor} flex items-center justify-center mb-2`}>
                    <Icon className={`h-5 w-5 ${action.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium leading-tight mb-1">
                      {action.title}
                    </p>
                    <p className="text-xs text-muted-foreground leading-tight">
                      {action.description}
                    </p>
                  </div>
                </Button>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <Button variant="outline" size="sm" className="w-full">
            <ExternalLink className="h-4 w-4 mr-2" />
            View on Blockchain Explorer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}