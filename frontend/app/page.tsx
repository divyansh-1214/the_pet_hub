'use client'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Search,
  PlusCircle,
  Users,
  Activity,
  MapPin,
  Clock,
  Star,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
export default function HomePage() {
  const [users, setUsers] = useState();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/user/2") // Django API endpoint
      .then((response) => {
        setUsers(response.data); // Save response in state
      })
      .catch((error) => {
        console.error("There was an error fetching users!", error);
      });
    }, []);
    console.log(users)
  const quickActions = [
    {
      title: "Find a Vet",
      description: "Locate nearby veterinarians and book appointments",
      icon: Search,
      href: "/vet-finder",
      color: "bg-blue-50 text-blue-600 hover:bg-blue-100",
    },
    {
      title: "Report Stray",
      description: "Help injured or lost animals in your area",
      icon: PlusCircle,
      href: "/stray-help",
      color: "bg-green-50 text-green-600 hover:bg-green-100",
    },
    {
      title: "Adopt a Pet",
      description: "Find your perfect companion from local shelters",
      icon: Heart,
      href: "/adoption",
      color: "bg-pink-50 text-pink-600 hover:bg-pink-100",
    },
    {
      title: "Community",
      description: "Connect with other pet owners and share experiences",
      icon: Users,
      href: "/community",
      color: "bg-purple-50 text-purple-600 hover:bg-purple-100",
    },
  ];

  const upcomingReminders = [
    { pet: "Buddy", task: "Vaccination", date: "Tomorrow", time: "2:00 PM" },
    { pet: "Luna", task: "Grooming", date: "Friday", time: "10:00 AM" },
    { pet: "Max", task: "Vet Checkup", date: "Next Week", time: "3:30 PM" },
  ];

  const nearbyVets = [
    {
      name: "Happy Paws Clinic",
      specialty: "General Care",
      rating: 4.8,
      distance: "0.5 miles",
    },
    {
      name: "Pet Care Center",
      specialty: "Emergency",
      rating: 4.9,
      distance: "1.2 miles",
    },
    {
      name: "Animal Hospital",
      specialty: "Surgery",
      rating: 4.7,
      distance: "2.1 miles",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Hero Section */}
      <section className="text-center space-y-4 py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-balance">
          Welcome to <span className="text-primary">PetHub</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
          Your one-stop platform for pet care, adoption, community support, and
          emergency assistance
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link href="/vet-finder">
            <Button size="lg" className="w-full sm:w-auto">
              Find a Vet Near You
            </Button>
          </Link>
          <Link href="/adoption">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto bg-transparent"
            >
              Browse Pets for Adoption
            </Button>
          </Link>
        </div>
      </section>

      {/* Quick Actions Grid */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-center">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.href} href={action.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader className="text-center">
                    <div
                      className={`w-12 h-12 rounded-full ${action.color} flex items-center justify-center mx-auto mb-2`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg">{action.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      {action.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Reminders */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Upcoming Reminders
            </h2>
            <Link href="/health">
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </div>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {upcomingReminders.map((reminder, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  >
                    <div>
                      <p className="font-medium">
                        {reminder.pet} - {reminder.task}
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {reminder.date} at {reminder.time}
                      </p>
                    </div>
                    <Badge variant="outline">{reminder.date}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Nearby Vets */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Nearby Veterinarians
            </h2>
            <Link href="/vet-finder">
              <Button variant="ghost" size="sm">
                Find More
              </Button>
            </Link>
          </div>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {nearbyVets.map((vet, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{vet.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {vet.specialty}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs">{vet.rating}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          • {vet.distance}
                        </span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Book
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Community Highlights */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-center">
          Community Highlights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Success Stories</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                "Thanks to PetHub, I found the perfect vet for my rescue dog.
                The community support has been amazing!"
              </p>
              <p className="text-sm font-medium mt-2">- Sarah M.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Adoptions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                15 pets found their forever homes this week through our adoption
                program.
              </p>
              <Link href="/adoption">
                <Button variant="link" className="p-0 mt-2">
                  View available pets →
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Stray Animals Helped</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our community has helped rescue and care for 47 stray animals
                this month.
              </p>
              <Link href="/stray-help">
                <Button variant="link" className="p-0 mt-2">
                  Report a stray →
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
