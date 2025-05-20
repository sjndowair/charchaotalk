import { Home, Bell, User, MessageCircle } from "lucide-react";

export const HEADER_DATA: string[] = ["CharChaoTalk"]

export const NAVIGATION_DATA = [
    {
      key: "message",
      icon: <MessageCircle className="h-6 w-6" />,
      path: "/chat",
    },
    { key: "home", icon: <Home className="h-6 w-6" />, path: "/" },
    { key: "bell", icon: <Bell className="h-6 w-6" /> },
    {
      key: "user",
      icon: (
        <User
          className="h-6 w-6 relative z-100"
          
        />
      ),
    },
  ];