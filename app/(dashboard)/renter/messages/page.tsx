"use client";

import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MessageSquare,
  Send,
  Paperclip,
  Phone,
  Video,
  MoreVertical,
  Search,
} from "lucide-react";
import {
  renterConversations,
  currentRenter,
  currentProperty,
} from "@/lib/renter-mock-data";
import { RenterMessage } from "@/types/renter";

export default function RenterMessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(
    renterConversations[0]
  );
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(selectedConversation.messages);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: RenterMessage = {
      id: `msg${Date.now()}`,
      senderId: currentRenter.id,
      senderName: currentRenter.name,
      senderType: "renter",
      message: newMessage,
      timestamp: new Date(),
      read: true,
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mensajes</h1>
        <p className="text-muted-foreground">
          Comunícate con tu propietario y administrador
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Conversaciones</CardTitle>
            <div className="relative mt-2">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar mensajes..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[600px]">
              <div className="space-y-2 p-4 pt-0">
                {renterConversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => {
                      setSelectedConversation(conversation);
                      setMessages(conversation.messages);
                    }}
                    className={`w-full text-left p-4 rounded-lg transition-colors ${
                      selectedConversation.id === conversation.id
                        ? "bg-primary/10 border border-primary/20"
                        : "hover:bg-muted border border-transparent"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <Avatar>
                          <AvatarFallback className="bg-primary/10">
                            {conversation.participantName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-sm truncate">
                              {conversation.participantName}
                            </p>
                            {conversation.unreadCount > 0 && (
                              <Badge variant="default" className="h-5 px-1.5">
                                {conversation.unreadCount}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {conversation.participantRole}
                          </p>
                          <p className="text-sm text-muted-foreground truncate mt-1">
                            {conversation.lastMessage}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {format(
                              conversation.lastMessageTime,
                              "d MMM, HH:mm",
                              { locale: es }
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}

                {/* Empty state */}
                {renterConversations.length === 0 && (
                  <div className="text-center py-12">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      No hay conversaciones
                    </p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2 flex flex-col h-[700px]">
          {/* Chat Header */}
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-primary/10">
                    {selectedConversation.participantName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">
                    {selectedConversation.participantName}
                  </CardTitle>
                  <CardDescription>
                    {selectedConversation.participantRole}
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          {/* Messages Area */}
          <CardContent className="flex-1 overflow-hidden p-0">
            <ScrollArea className="h-full">
              <div className="p-4 space-y-4">
                {messages.map((message) => {
                  const isRenter = message.senderType === "renter";
                  return (
                    <div
                      key={message.id}
                      className={`flex ${
                        isRenter ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`flex gap-3 max-w-[80%] ${
                          isRenter ? "flex-row-reverse" : "flex-row"
                        }`}
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarFallback
                            className={
                              isRenter ? "bg-primary/10" : "bg-muted"
                            }
                          >
                            {message.senderName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`flex flex-col ${
                            isRenter ? "items-end" : "items-start"
                          }`}
                        >
                          <div
                            className={`rounded-lg px-4 py-2 ${
                              isRenter
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            <p className="text-sm">{message.message}</p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {format(message.timestamp, "HH:mm", {
                              locale: es,
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>

          {/* Message Input */}
          <div className="p-4 border-t">
            <div className="flex items-end gap-2">
              <Button variant="ghost" size="icon" className="shrink-0">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Textarea
                placeholder="Escribe un mensaje..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                className="min-h-[60px] max-h-[120px] resize-none"
              />
              <Button
                size="icon"
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Presiona Enter para enviar, Shift + Enter para nueva línea
            </p>
          </div>
        </Card>
      </div>

      {/* Contact Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>Información de contacto</CardTitle>
          <CardDescription>
            Información del propietario de tu inmueble
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Nombre
              </p>
              <p className="font-medium">{currentProperty.landlordName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Email
              </p>
              <p className="font-medium">{currentProperty.landlordEmail}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Teléfono
              </p>
              <p className="font-medium">{currentProperty.landlordPhone}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
