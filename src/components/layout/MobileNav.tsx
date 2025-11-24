"use client";

import Link from "next/link";
import {
  Home,
  BookOpen,
  Heart,
  Users,
  Sparkles,
  X,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const navItems = [
  { label: "Home", href: "/", icon: Home, active: true },
  { label: "Faith", href: "/faith", icon: BookOpen },
  { label: "Prayer", href: "/prayer", icon: Heart },
  { label: "Community", href: "/community", icon: Users },
  { label: "Inspiration", href: "/inspiration", icon: Sparkles },
];

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="w-6 h-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full sm:w-[300px] p-0">
        <SheetHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <SheetClose asChild>
              <Button variant="ghost" size="icon">
                <X className="w-6 h-6" />
              </Button>
            </SheetClose>
            <SheetTitle className="font-bold text-lg">SuperBlessed</SheetTitle>
            <div className="w-10" /> {/* Spacer for alignment */}
          </div>
        </SheetHeader>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.label}>
                <SheetClose asChild>
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
                </SheetClose>
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
