import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Users, Eye, Settings, Award, CheckCircle, XCircle, Clock, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock student data
const mockStudents = [
  {
    id: 'STU001',
    name: 'Alice Johnson',
    universityId: 'CS2024001',
    walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
    eligibilityStatus: 'eligible',
    mintingStatus: 'not_minted',
    major: 'Computer Science',
    gpa: 3.8,
    graduationYear: 2024
  },
  {
    id: 'STU002',
    name: 'Bob Smith',
    universityId: 'EE2024002',
    walletAddress: '0x2345678901bcdef12345678901bcdef123456789',
    eligibilityStatus: 'eligible',
    mintingStatus: 'minted',
    major: 'Electrical Engineering',
    gpa: 3.9,
    graduationYear: 2024
  },
  {
    id: 'STU003',
    name: 'Carol Davis',
    universityId: 'BM2025001',
    walletAddress: '0x3456789012cdef123456789012cdef1234567890',
    eligibilityStatus: 'pending',
    mintingStatus: 'not_minted',
    major: 'Business Management',
    gpa: 3.6,
    graduationYear: 2025
  },
  {
    id: 'STU004',
    name: 'David Wilson',
    universityId: 'CS2023001',
    walletAddress: '0x456789023def23456789023def234567890123',
    eligibilityStatus: 'not_eligible',
    mintingStatus: 'not_minted',
    major: 'Computer Science',
    gpa: 2.8,
    graduationYear: 2023
  },
  {
    id: 'STU005',
    name: 'Emma Brown',
    universityId: 'ME2024003',
    walletAddress: '0x56789034ef3456789034ef34567890234567',
    eligibilityStatus: 'eligible',
    mintingStatus: 'pending',
    major: 'Mechanical Engineering',
    gpa: 3.7,
    graduationYear: 2024
  }
];

interface StudentManagementProps {
  onMintCredential: (student: any) => void;
}

export function StudentManagement({ onMintCredential }: StudentManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filteredStudents, setFilteredStudents] = useState(mockStudents);

  React.useEffect(() => {
    let filtered = mockStudents;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(student => 
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.universityId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.walletAddress.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(student => student.eligibilityStatus === filterStatus);
    }

    setFilteredStudents(filtered);
  }, [searchQuery, filterStatus]);

  const formatWalletAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getEligibilityBadge = (status: string) => {
    switch (status) {
      case 'eligible':
        return (
          <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10">
            <CheckCircle className="h-3 w-3 mr-1" />
            Eligible
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="outline" className="border-accent/30 text-accent bg-accent/10">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case 'not_eligible':
        return (
          <Badge variant="outline" className="border-destructive/30 text-destructive bg-destructive/10">
            <XCircle className="h-3 w-3 mr-1" />
            Not Eligible
          </Badge>
        );
      default:
        return null;
    }
  };

  const getMintingStatus = (status: string) => {
    switch (status) {
      case 'minted':
        return (
          <div className="flex items-center text-primary">
            <Award className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">Minted</span>
          </div>
        );
      case 'pending':
        return (
          <div className="flex items-center text-accent">
            <Clock className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">Pending</span>
          </div>
        );
      case 'not_minted':
        return (
          <div className="flex items-center text-muted-foreground">
            <XCircle className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">Not Minted</span>
          </div>
        );
      default:
        return null;
    }
  };

  const canMint = (student: any) => {
    return student.eligibilityStatus === 'eligible' && student.mintingStatus !== 'minted';
  };

  return (
    <Card className="bg-gradient-to-br from-card/80 to-accent/5 border-border/40">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl flex items-center">
              <Users className="h-5 w-5 mr-2 text-primary" />
              Student Management
            </CardTitle>
            <CardDescription>
              Manage student records, eligibility, and credential minting
            </CardDescription>
          </div>
          <Badge variant="outline" className="border-primary/30 text-primary">
            {filteredStudents.length} Students
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Search and Filter Controls */}
        <div className="flex gap-4 flex-col sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, ID, or wallet address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background/50 border-border/40"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-48 bg-background/50 border-border/40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Students</SelectItem>
              <SelectItem value="eligible">Eligible</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="not_eligible">Not Eligible</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Students Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-lg border border-border/40 bg-background/50"
        >
          <Table>
            <TableHeader>
              <TableRow className="border-border/40">
                <TableHead>Student</TableHead>
                <TableHead>University ID</TableHead>
                <TableHead>Wallet Address</TableHead>
                <TableHead>Eligibility</TableHead>
                <TableHead>Minting Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student, index) => (
                <motion.tr
                  key={student.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-border/40 hover:bg-muted/20"
                >
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-full bg-primary/10">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.major}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="text-sm bg-muted/50 px-2 py-1 rounded font-mono">
                      {student.universityId}
                    </code>
                  </TableCell>
                  <TableCell>
                    <code className="text-sm bg-muted/50 px-2 py-1 rounded font-mono">
                      {formatWalletAddress(student.walletAddress)}
                    </code>
                  </TableCell>
                  <TableCell>
                    {getEligibilityBadge(student.eligibilityStatus)}
                  </TableCell>
                  <TableCell>
                    {getMintingStatus(student.mintingStatus)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {canMint(student) && (
                        <Button
                          size="sm"
                          onClick={() => onMintCredential(student)}
                          className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30"
                        >
                          <Award className="h-3 w-3 mr-1" />
                          Mint
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-3 w-3 mr-1" />
                        Manage
                      </Button>
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </motion.div>

        {filteredStudents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No students found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search criteria or filter settings.
            </p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}