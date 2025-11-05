"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FileText,
  Download,
  TrendingUp,
  Users,
  Building2,
  DollarSign,
  Calendar,
  FileBarChart,
  FileSpreadsheet,
  FileJson,
  Eye,
  Clock,
} from "lucide-react";
import { toast } from "sonner";

const reportTypes = [
  {
    id: "revenue",
    name: "Revenue Report",
    description: "Detailed breakdown of subscription revenue",
    icon: DollarSign,
    category: "Financial",
    frequency: "Monthly",
  },
  {
    id: "users",
    name: "User Growth Report",
    description: "User acquisition and retention metrics",
    icon: Users,
    category: "Users",
    frequency: "Weekly",
  },
  {
    id: "properties",
    name: "Properties Report",
    description: "Property listings and occupancy statistics",
    icon: Building2,
    category: "Properties",
    frequency: "Monthly",
  },
  {
    id: "activity",
    name: "Platform Activity Report",
    description: "User engagement and activity metrics",
    icon: TrendingUp,
    category: "Analytics",
    frequency: "Daily",
  },
  {
    id: "billing",
    name: "Billing & Payments Report",
    description: "Payment transactions and billing cycles",
    icon: FileBarChart,
    category: "Financial",
    frequency: "Monthly",
  },
  {
    id: "compliance",
    name: "Compliance Report",
    description: "Regulatory compliance and audit logs",
    icon: FileText,
    category: "Legal",
    frequency: "Quarterly",
  },
];

const recentReports = [
  {
    id: "1",
    name: "Revenue Report - November 2025",
    type: "revenue",
    generatedAt: "2025-11-05T09:00:00",
    generatedBy: "Admin",
    format: "PDF",
    size: "2.4 MB",
    status: "completed",
  },
  {
    id: "2",
    name: "User Growth Report - Week 44",
    type: "users",
    generatedAt: "2025-11-04T15:30:00",
    generatedBy: "System",
    format: "Excel",
    size: "1.8 MB",
    status: "completed",
  },
  {
    id: "3",
    name: "Properties Report - October 2025",
    type: "properties",
    generatedAt: "2025-11-01T10:00:00",
    generatedBy: "Admin",
    format: "PDF",
    size: "3.2 MB",
    status: "completed",
  },
  {
    id: "4",
    name: "Platform Activity - Daily",
    type: "activity",
    generatedAt: "2025-11-05T00:00:00",
    generatedBy: "System",
    format: "CSV",
    size: "856 KB",
    status: "completed",
  },
  {
    id: "5",
    name: "Billing Report - Q3 2025",
    type: "billing",
    generatedAt: "2025-10-01T12:00:00",
    generatedBy: "Admin",
    format: "Excel",
    size: "4.1 MB",
    status: "completed",
  },
];

export default function AdminReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("30");
  const [selectedFormat, setSelectedFormat] = useState("pdf");

  const handleGenerateReport = (reportType: string) => {
    toast.success(`Generating ${reportType} report...`);
  };

  const handleDownloadReport = (reportName: string) => {
    toast.success(`Downloading ${reportName}...`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getFormatIcon = (format: string) => {
    switch (format.toLowerCase()) {
      case "pdf":
        return <FileText className="h-4 w-4" />;
      case "excel":
        return <FileSpreadsheet className="h-4 w-4" />;
      case "csv":
        return <FileBarChart className="h-4 w-4" />;
      case "json":
        return <FileJson className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Exports</h1>
          <p className="text-muted-foreground">
            Generate and download platform reports
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedFormat} onValueChange={setSelectedFormat}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="excel">Excel</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="json">JSON</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Generated This Month</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              +3 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Automated Reports</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Running on schedule
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <FileBarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.8 GB</div>
            <p className="text-xs text-muted-foreground">
              Of 10 GB available
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Report Types */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Available Reports</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reportTypes.map((report) => {
            const Icon = report.icon;
            return (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <Badge variant="secondary">{report.frequency}</Badge>
                  </div>
                  <CardTitle className="text-base mt-3">{report.name}</CardTitle>
                  <CardDescription>{report.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{report.category}</Badge>
                    <Button
                      size="sm"
                      onClick={() => handleGenerateReport(report.name)}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Generate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Reports</CardTitle>
              <CardDescription>Previously generated reports and exports</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Clock className="mr-2 h-4 w-4" />
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Generated</TableHead>
                  <TableHead>Generated By</TableHead>
                  <TableHead>Format</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{report.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {report.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(report.generatedAt)}
                    </TableCell>
                    <TableCell className="text-sm">{report.generatedBy}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getFormatIcon(report.format)}
                        <span className="text-sm">{report.format}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {report.size}
                    </TableCell>
                    <TableCell>
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        {report.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toast.success("Opening report preview...")}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDownloadReport(report.name)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Scheduled Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Scheduled Reports</CardTitle>
          <CardDescription>Automated reports that run on a schedule</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Daily Activity Report", schedule: "Every day at 00:00", next: "Today at 00:00" },
              { name: "Weekly User Growth", schedule: "Every Monday at 09:00", next: "Nov 11 at 09:00" },
              { name: "Monthly Revenue Report", schedule: "1st of each month", next: "Dec 1 at 00:00" },
              { name: "Quarterly Compliance", schedule: "Every 3 months", next: "Jan 1, 2026" },
            ].map((scheduled, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg border"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{scheduled.name}</p>
                    <p className="text-sm text-muted-foreground">{scheduled.schedule}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Next run</p>
                  <p className="text-sm text-muted-foreground">{scheduled.next}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
