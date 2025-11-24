"use client";

import Link from "next/link";
import {
  Home,
  BookOpen,
  Heart,
  Users,
  Sparkles,
  Settings,
  Target,
} from "lucide-react";

const navItems = [
  { label: "Home", href: "/", icon: Home, active: true },
  { label: "Faith", href: "/faith", icon: BookOpen },
  { label: "Prayer", href: "/prayer", icon: Heart },
  { label: "Community", href: "/community", icon: Users },
  { label: "Inspiration", href: "/inspiration", icon: Sparkles },
];

export function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col h-screen w-[280px] bg-background border-l fixed right-0 top-0">
      {/* Logo */}
      <div className="p-6">
        <Link
          href="/"
          className="block bg-primary text-primary-foreground font-bold text-lg py-3 px-6 rounded-lg text-center"
        >
          SuperBlessed
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  item.active
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom section */}
      <div className="p-4 space-y-4">
        {/* Settings */}
        <Link
          href="/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors"
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </Link>

        {/* Daily Progress Widget */}
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Daily Progress</span>
            <Target className="w-5 h-5 text-primary" />
          </div>
          <div className="w-full bg-background rounded-full h-2 mb-2">
            <div className="bg-primary h-2 rounded-full w-3/4" />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>3 of 4 completed</span>
            <span>75%</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
