"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Heart,
  Home,
  Search,
  Users,
  Phone,
  Menu,
  PlusCircle,
  Activity,
} from "lucide-react";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/vet-finder", label: "Find Vet", icon: Search },
    { href: "/adoption", label: "Adopt", icon: Heart },
    { href: "/stray-help", label: "Report Stray", icon: PlusCircle },
    { href: "/community", label: "Community", icon: Users },
    { href: "/health", label: "Health Tracker", icon: Activity },
  ];
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(getCookie("token") as string | null);
    // Listen for cookie changes (optional, for more robust UX)
    const interval = setInterval(() => {
      setToken(getCookie("token") as string | null);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Heart className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-primary">PetHub</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {token ? (
          <div className="border-t pt-4 space-y-2">
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  deleteCookie("token");
                  setToken(null);
                  setIsOpen(false);
                  window.location.href = "/login";
                }}
              >
                Log out
              </Button>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        )}
        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="sm">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col space-y-4 mt-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-3 text-sm font-medium p-2 rounded-md hover:bg-muted transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              {token ? (
                <div className="border-t pt-4 space-y-2">
                  <Button
                    className="w-full justify-start"
                    onClick={() => {
                      deleteCookie("token");
                      setToken(null);
                      setIsOpen(false);
                      window.location.href = "/login";
                    }}
                  >
                    log out
                  </Button>
                </div>
              ) : (
                <div className="border-t pt-4 space-y-2">
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsOpen(false)}>
                    <Button className="w-full justify-start">Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>

        {/* Emergency SOS Button - Always Visible */}
        
      </div>
    </nav>
  );
}
