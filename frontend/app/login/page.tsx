"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { setCookie,getCookie } from "cookies-next";
import { stringify } from "querystring";
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [users, setUsers] = useState<any[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${backendUrl}/user/`); // Django API endpoint
      setUsers(response.data); // Save response in state
      // Filter users with matching email
      const matchedUsers = response.data.filter((user: any) => user.mail === formData.email);
      // Map to get their passwords (if any)
      const matchedPasswords = matchedUsers.map((user: any) => user.password);
      if (matchedUsers.length > 0) {
        if (matchedPasswords.includes(formData.password)) {
          setCookie("token", matchedUsers[0].id);
          console.log("User ID:", matchedUsers[0].id)
          alert("Login successful");
        } else {
          alert("Incorrect password");
        }
      } else {
        alert("User not found");
      }
    } catch (error) {
      console.error("There was an error fetching users!", error);
    }
    console.log("Login attempt:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Heart className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl">Welcome Back to PetHub</CardTitle>
          <CardDescription>
            Sign in to your account to continue caring for your pets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email or Username</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email or username"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/register" className="text-primary hover:underline">
                Sign up here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
