"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Building2,
  DollarSign,
  Activity,
  Target,
  Home,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics & Insights</h1>
          <p className="text-muted-foreground">
            Platform performance and business metrics
          </p>
        </div>
        <Select defaultValue="30">
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
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2.4M</div>
            <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3" />
              <span>+12.5% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
            <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3" />
              <span>+8.2% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Properties Listed</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">847</div>
            <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3" />
              <span>+5.3% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Occupancy Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.3%</div>
            <div className="flex items-center gap-1 text-xs text-red-600 mt-1">
              <TrendingDown className="h-3 w-3" />
              <span>-2.1% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* User Growth */}
            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>New user registrations over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Owners</span>
                    <span className="text-sm text-muted-foreground">+142 this month</span>
                  </div>
                  <Progress value={68} />

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Renters</span>
                    <span className="text-sm text-muted-foreground">+289 this month</span>
                  </div>
                  <Progress value={85} />

                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Total Growth</span>
                      <Badge className="bg-green-100 text-green-800">+431 users</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Platform Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Platform Activity</CardTitle>
                <CardDescription>Daily active users and engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Daily Active Users</span>
                    <span className="text-2xl font-bold">892</span>
                  </div>
                  <Progress value={72} />

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Avg Session</p>
                      <p className="text-lg font-bold">12.4 min</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Bounce Rate</p>
                      <p className="text-lg font-bold">23.5%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
              <CardDescription>Income sources for the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-100 text-blue-800">Pro Plan</Badge>
                      <span className="text-sm text-muted-foreground">128 subscriptions</span>
                    </div>
                    <span className="text-sm font-medium">$158,000</span>
                  </div>
                  <Progress value={65} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800">Basic Plan</Badge>
                      <span className="text-sm text-muted-foreground">312 subscriptions</span>
                    </div>
                    <span className="text-sm font-medium">$54,000</span>
                  </div>
                  <Progress value={35} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-orange-100 text-orange-800">Enterprise</Badge>
                      <span className="text-sm text-muted-foreground">8 subscriptions</span>
                    </div>
                    <span className="text-sm font-medium">$28,000</span>
                  </div>
                  <Progress value={18} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,245</div>
                <Progress value={100} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Property Owners</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">423</div>
                <Progress value={34} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">34% of total users</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Renters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">822</div>
                <Progress value={66} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">66% of total users</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>User Retention</CardTitle>
              <CardDescription>Monthly retention rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Month 1</span>
                  <span className="text-sm font-medium">95%</span>
                </div>
                <Progress value={95} />

                <div className="flex items-center justify-between">
                  <span className="text-sm">Month 3</span>
                  <span className="text-sm font-medium">82%</span>
                </div>
                <Progress value={82} />

                <div className="flex items-center justify-between">
                  <span className="text-sm">Month 6</span>
                  <span className="text-sm font-medium">74%</span>
                </div>
                <Progress value={74} />

                <div className="flex items-center justify-between">
                  <span className="text-sm">Month 12</span>
                  <span className="text-sm font-medium">68%</span>
                </div>
                <Progress value={68} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="properties" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Total Properties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">847</div>
                <p className="text-xs text-muted-foreground mt-1">Listed properties</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Occupied</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">739</div>
                <p className="text-xs text-muted-foreground mt-1">87.2% occupancy</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Available</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">98</div>
                <p className="text-xs text-muted-foreground mt-1">11.6% available</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Maintenance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">10</div>
                <p className="text-xs text-muted-foreground mt-1">1.2% in maintenance</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Property Types</CardTitle>
              <CardDescription>Distribution by property type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { type: "Apartments", count: 512, percentage: 60 },
                  { type: "Houses", count: 203, percentage: 24 },
                  { type: "Studios", count: 85, percentage: 10 },
                  { type: "Penthouses", count: 34, percentage: 4 },
                  { type: "Offices", count: 13, percentage: 2 },
                ].map((item) => (
                  <div key={item.type} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{item.type}</span>
                      <span className="text-sm text-muted-foreground">{item.count} properties</span>
                    </div>
                    <Progress value={item.percentage} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Avg Rent by Type</CardTitle>
              <CardDescription>Average monthly rent prices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { type: "Penthouse", rent: "3.2M" },
                  { type: "House", rent: "2.5M" },
                  { type: "Apartment", rent: "1.8M" },
                  { type: "Studio", rent: "1.2M" },
                  { type: "Office", rent: "2.8M" },
                ].map((item) => (
                  <div key={item.type} className="flex items-center justify-between p-2 rounded-lg border">
                    <span className="text-sm font-medium">{item.type}</span>
                    <Badge variant="secondary">${item.rent}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Monthly Recurring</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$240K</div>
                <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>+8.5% growth</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Avg Revenue per User</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$56K</div>
                <p className="text-xs text-muted-foreground mt-1">Per active subscription</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Churn Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.2%</div>
                <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                  <TrendingDown className="h-3 w-3" />
                  <span>-1.2% improvement</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Revenue by Plan</CardTitle>
              <CardDescription>Monthly subscription revenue breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Pro Plan</p>
                      <p className="text-sm text-muted-foreground">128 active subscriptions</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">$158K</p>
                      <p className="text-xs text-green-600">+12% MoM</p>
                    </div>
                  </div>
                  <Progress value={66} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Basic Plan</p>
                      <p className="text-sm text-muted-foreground">312 active subscriptions</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">$54K</p>
                      <p className="text-xs text-green-600">+5% MoM</p>
                    </div>
                  </div>
                  <Progress value={23} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Enterprise Plan</p>
                      <p className="text-sm text-muted-foreground">8 active subscriptions</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">$28K</p>
                      <p className="text-xs text-green-600">+18% MoM</p>
                    </div>
                  </div>
                  <Progress value={11} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
