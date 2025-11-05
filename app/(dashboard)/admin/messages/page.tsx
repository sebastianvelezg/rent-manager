"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Search,
  Send,
  Inbox,
  Archive,
  Trash2,
  Star,
  AlertCircle,
  CheckCircle,
  Clock,
  MessageSquare,
  User,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const mockConversations = [
  {
    id: "1",
    userName: "Carlos Rodríguez",
    userEmail: "carlos@email.com",
    userAvatar: "CR",
    subject: "Payment Issue - Unable to process",
    lastMessage: "I'm having trouble processing my subscription payment...",
    timestamp: "2025-11-05T10:30:00",
    status: "urgent",
    unread: true,
    category: "billing",
  },
  {
    id: "2",
    userName: "María González",
    userEmail: "maria@email.com",
    userAvatar: "MG",
    subject: "Feature Request - Bulk Property Upload",
    lastMessage: "Would it be possible to add a feature to upload multiple properties at once?",
    timestamp: "2025-11-05T09:15:00",
    status: "open",
    unread: true,
    category: "feature",
  },
  {
    id: "3",
    userName: "Jorge Ramírez",
    userEmail: "jorge@email.com",
    userAvatar: "JR",
    subject: "Account Support - Password Reset",
    lastMessage: "Thanks for your help! Issue is resolved.",
    timestamp: "2025-11-04T16:45:00",
    status: "resolved",
    unread: false,
    category: "support",
  },
  {
    id: "4",
    userName: "Ana Martínez",
    userEmail: "ana@email.com",
    userAvatar: "AM",
    subject: "Bug Report - Dashboard not loading",
    lastMessage: "The dashboard page shows a white screen when I try to access it...",
    timestamp: "2025-11-04T14:20:00",
    status: "open",
    unread: false,
    category: "bug",
  },
  {
    id: "5",
    userName: "Luis Fernández",
    userEmail: "luis@email.com",
    userAvatar: "LF",
    subject: "General Inquiry - Trial Extension",
    lastMessage: "Is it possible to extend my trial period for another week?",
    timestamp: "2025-11-04T11:30:00",
    status: "open",
    unread: false,
    category: "general",
  },
];

export default function AdminMessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const filteredConversations = mockConversations.filter((conv) =>
    conv.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.userEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const urgentMessages = filteredConversations.filter((c) => c.status === "urgent");
  const openMessages = filteredConversations.filter((c) => c.status === "open");
  const resolvedMessages = filteredConversations.filter((c) => c.status === "resolved");

  const getStatusBadge = (status: string) => {
    const config: Record<string, { variant: "default" | "secondary" | "destructive"; label: string; icon: any }> = {
      urgent: { variant: "destructive", label: "Urgent", icon: AlertCircle },
      open: { variant: "default", label: "Open", icon: MessageSquare },
      resolved: { variant: "secondary", label: "Resolved", icon: CheckCircle },
    };
    const { variant, label, icon: Icon } = config[status] || config.open;
    return (
      <Badge variant={variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {label}
      </Badge>
    );
  };

  const getCategoryBadge = (category: string) => {
    const colors: Record<string, string> = {
      billing: "bg-blue-100 text-blue-800",
      feature: "bg-purple-100 text-purple-800",
      support: "bg-green-100 text-green-800",
      bug: "bg-red-100 text-red-800",
      general: "bg-gray-100 text-gray-800",
    };
    return <Badge className={colors[category] || ""}>{category}</Badge>;
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return "Yesterday";
    return `${days} days ago`;
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    toast.success("Message sent successfully");
    setNewMessage("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Messages & Support</h1>
          <p className="text-muted-foreground">
            Manage user communications and support tickets
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
            <Inbox className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockConversations.length}</div>
            <p className="text-xs text-muted-foreground">
              {mockConversations.filter(c => c.unread).length} unread
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Urgent</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{urgentMessages.length}</div>
            <p className="text-xs text-muted-foreground">
              Requires immediate attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open</CardTitle>
            <MessageSquare className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openMessages.length}</div>
            <p className="text-xs text-muted-foreground">
              Active conversations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resolvedMessages.length}</div>
            <p className="text-xs text-muted-foreground">
              This week
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="h-[600px]">
        <div className="grid grid-cols-[350px_1fr] h-full">
          {/* Conversations List */}
          <div className="border-r">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <div className="border-b px-4">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                  <TabsTrigger value="urgent" className="flex-1">Urgent</TabsTrigger>
                  <TabsTrigger value="open" className="flex-1">Open</TabsTrigger>
                </TabsList>
              </div>

              <ScrollArea className="h-[calc(600px-120px)]">
                <TabsContent value="all" className="m-0">
                  {filteredConversations.map((conv) => (
                    <div
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv)}
                      className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                        selectedConversation.id === conv.id ? "bg-muted" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarFallback>{conv.userAvatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className={`text-sm font-medium truncate ${conv.unread ? "font-bold" : ""}`}>
                              {conv.userName}
                            </p>
                            {conv.unread && (
                              <div className="h-2 w-2 rounded-full bg-blue-600" />
                            )}
                          </div>
                          <p className="text-sm font-medium truncate mb-1">{conv.subject}</p>
                          <p className="text-xs text-muted-foreground truncate mb-2">
                            {conv.lastMessage}
                          </p>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(conv.status)}
                            {getCategoryBadge(conv.category)}
                            <span className="text-xs text-muted-foreground ml-auto">
                              {formatTime(conv.timestamp)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="urgent" className="m-0">
                  {urgentMessages.map((conv) => (
                    <div
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv)}
                      className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                        selectedConversation.id === conv.id ? "bg-muted" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarFallback>{conv.userAvatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium truncate">{conv.userName}</p>
                          </div>
                          <p className="text-sm font-medium truncate mb-1">{conv.subject}</p>
                          <p className="text-xs text-muted-foreground truncate mb-2">
                            {conv.lastMessage}
                          </p>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(conv.status)}
                            {getCategoryBadge(conv.category)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="open" className="m-0">
                  {openMessages.map((conv) => (
                    <div
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv)}
                      className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                        selectedConversation.id === conv.id ? "bg-muted" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarFallback>{conv.userAvatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium truncate">{conv.userName}</p>
                          </div>
                          <p className="text-sm font-medium truncate mb-1">{conv.subject}</p>
                          <p className="text-xs text-muted-foreground truncate mb-2">
                            {conv.lastMessage}
                          </p>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(conv.status)}
                            {getCategoryBadge(conv.category)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </div>

          {/* Conversation View */}
          <div className="flex flex-col">
            {/* Header */}
            <div className="p-4 border-b">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarFallback>{selectedConversation.userAvatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{selectedConversation.userName}</p>
                    <p className="text-sm text-muted-foreground">{selectedConversation.userEmail}</p>
                    <p className="text-sm font-medium mt-1">{selectedConversation.subject}</p>
                    <div className="flex items-center gap-2 mt-2">
                      {getStatusBadge(selectedConversation.status)}
                      {getCategoryBadge(selectedConversation.category)}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Archive className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarFallback>{selectedConversation.userAvatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">{selectedConversation.userName}</span>
                      <span className="text-xs text-muted-foreground">{formatTime(selectedConversation.timestamp)}</span>
                    </div>
                    <div className="bg-muted rounded-lg p-3 text-sm">
                      {selectedConversation.lastMessage}
                    </div>
                  </div>
                </div>

                {selectedConversation.status === "resolved" && (
                  <div className="flex gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-primary-foreground">AD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">Admin</span>
                        <span className="text-xs text-muted-foreground">2 hours ago</span>
                      </div>
                      <div className="bg-primary/10 rounded-lg p-3 text-sm">
                        Thank you for reaching out. I've resolved your issue. Please let me know if you need any further assistance.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Reply Box */}
            <div className="p-4 border-t">
              <div className="space-y-2">
                <Textarea
                  placeholder="Type your reply..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="min-h-[100px] resize-none"
                />
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Mark as Resolved</Button>
                    <Button variant="outline" size="sm">Assign to</Button>
                  </div>
                  <Button onClick={handleSendMessage}>
                    <Send className="mr-2 h-4 w-4" />
                    Send Reply
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
