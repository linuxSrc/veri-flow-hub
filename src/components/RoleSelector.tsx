"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Building2, Users, Award } from "lucide-react";

interface RoleSelectorProps {
  onRoleSelect: (role: "student" | "university") => void;
  walletAddress?: string;
}

export default function RoleSelector({ onRoleSelect, walletAddress }: RoleSelectorProps) {
  const roles = [
    {
      id: "student",
      title: "Individual Student",
      description: "Manage your credentials, request verifications, and showcase your achievements",
      icon: GraduationCap,
      features: ["Collect NFT Credentials", "Verify Academic Records", "Showcase Achievements", "Portfolio Management"],
      color: "from-primary to-primary-glow",
    },
    {
      id: "university",
      title: "University Admin",
      description: "Issue credentials, manage students, and maintain institutional credibility",
      icon: Building2,
      features: ["Issue NFT Credentials", "Manage Students", "Verification Dashboard", "Analytics & Reports"],
      color: "from-accent to-primary",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center p-6">
      <div className="w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Choose Your Role
          </h1>
          <p className="text-xl text-muted-foreground">
            Select how you want to use VeriCred's credential platform
          </p>
          {walletAddress && (
            <Badge variant="outline" className="mt-4">
              Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </Badge>
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {roles.map((role, index) => {
            const Icon = role.icon;
            return (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onRoleSelect(role.id as "student" | "university")}
                className="cursor-pointer"
              >
                <Card className="h-full bg-gradient-card border-primary/20 hover:border-primary/50 hover:shadow-purple transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex flex-col h-full">
                      <div className="text-center mb-6">
                        <motion.div
                          whileHover={{ rotate: 5, scale: 1.1 }}
                          className={`w-20 h-20 rounded-full bg-gradient-to-br ${role.color} flex items-center justify-center mx-auto mb-4 shadow-glow`}
                        >
                          <Icon className="h-10 w-10 text-white" />
                        </motion.div>
                        <h3 className="text-2xl font-bold mb-2">{role.title}</h3>
                        <p className="text-muted-foreground">{role.description}</p>
                      </div>

                      <div className="flex-1">
                        <h4 className="font-semibold mb-4 text-primary">Key Features:</h4>
                        <ul className="space-y-3">
                          {role.features.map((feature, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 + idx * 0.1 }}
                              className="flex items-center gap-3"
                            >
                              <div className="w-2 h-2 bg-primary rounded-full" />
                              <span className="text-sm">{feature}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      <motion.div
                        className="mt-8 p-4 bg-primary/10 rounded-lg border border-primary/20"
                        whileHover={{ backgroundColor: "hsl(var(--primary) / 0.15)" }}
                      >
                        <div className="flex items-center justify-center gap-2 text-primary font-medium">
                          {role.id === "student" ? <Users className="h-5 w-5" /> : <Award className="h-5 w-5" />}
                          <span>Select {role.title}</span>
                        </div>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}