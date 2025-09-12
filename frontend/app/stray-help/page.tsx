"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Camera, AlertTriangle, Heart, Clock, User, Phone } from "lucide-react"

interface StrayReport {
  id: string
  animalType: string
  condition: string
  location: string
  description: string
  reportedBy: string
  reportedAt: string
  status: "pending" | "in-progress" | "rescued" | "closed"
  urgency: "low" | "medium" | "high" | "critical"
  image?: string
  assignedTo?: string
}

const mockReports: StrayReport[] = [
  {
    id: "1",
    animalType: "Dog",
    condition: "Injured - limping",
    location: "Main Street & 5th Ave",
    description: "Small brown dog with a limp, appears friendly but scared. Has a collar but no visible tags.",
    reportedBy: "Sarah M.",
    reportedAt: "2 hours ago",
    status: "in-progress",
    urgency: "high",
    image: "/placeholder.svg?height=200&width=300&text=Injured+Dog",
    assignedTo: "Animal Rescue Team A",
  },
  {
    id: "2",
    animalType: "Cat",
    condition: "Healthy but lost",
    location: "Central Park, near pond",
    description: "Orange tabby cat, very friendly, appears well-fed. Might be someone's lost pet.",
    reportedBy: "Mike R.",
    reportedAt: "5 hours ago",
    status: "pending",
    urgency: "medium",
    image: "/placeholder.svg?height=200&width=300&text=Orange+Cat",
  },
  {
    id: "3",
    animalType: "Dog",
    condition: "Severely injured",
    location: "Highway 101, Mile Marker 15",
    description: "Large dog hit by vehicle, conscious but unable to move. Needs immediate medical attention.",
    reportedBy: "Emergency Services",
    reportedAt: "30 minutes ago",
    status: "in-progress",
    urgency: "critical",
    assignedTo: "Emergency Vet Team",
  },
]

const nearbyNGOs = [
  {
    name: "City Animal Rescue",
    distance: "0.8 miles",
    phone: "(555) 123-4567",
    specialties: ["Emergency Care", "Rehabilitation"],
  },
  {
    name: "Paws & Hearts Shelter",
    distance: "1.5 miles",
    phone: "(555) 987-6543",
    specialties: ["Adoption", "Foster Care"],
  },
  {
    name: "Wildlife Protection Society",
    distance: "2.3 miles",
    phone: "(555) 456-7890",
    specialties: ["Wildlife", "Exotic Animals"],
  },
]

export default function StrayHelpPage() {
  const [formData, setFormData] = useState({
    animalType: "",
    condition: "",
    location: "",
    description: "",
    urgency: "",
    contactName: "",
    contactPhone: "",
    image: null as File | null,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Stray report submitted:", formData)
    // Handle form submission
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, image: file })
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "rescued":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "closed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-balance">Help Stray Animals</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
          Report injured or lost animals in your area and help connect them with rescue organizations
        </p>
      </div>

      <Tabs defaultValue="report" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="report">Report a Stray</TabsTrigger>
          <TabsTrigger value="active">Active Reports</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        {/* Report Form */}
        <TabsContent value="report" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Report a Stray Animal
              </CardTitle>
              <CardDescription>
                Provide as much detail as possible to help rescue teams locate and assist the animal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="animalType">Animal Type *</Label>
                    <Select
                      value={formData.animalType}
                      onValueChange={(value) => setFormData({ ...formData, animalType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select animal type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dog">Dog</SelectItem>
                        <SelectItem value="cat">Cat</SelectItem>
                        <SelectItem value="bird">Bird</SelectItem>
                        <SelectItem value="rabbit">Rabbit</SelectItem>
                        <SelectItem value="wildlife">Wildlife</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="condition">Animal Condition *</Label>
                    <Select
                      value={formData.condition}
                      onValueChange={(value) => setFormData({ ...formData, condition: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="healthy">Appears healthy</SelectItem>
                        <SelectItem value="minor-injury">Minor injury</SelectItem>
                        <SelectItem value="major-injury">Major injury</SelectItem>
                        <SelectItem value="sick">Appears sick</SelectItem>
                        <SelectItem value="malnourished">Malnourished</SelectItem>
                        <SelectItem value="critical">Critical condition</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Main Street & 5th Ave, or use GPS coordinates"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the animal's appearance, behavior, and any other relevant details..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="urgency">Urgency Level *</Label>
                  <Select
                    value={formData.urgency}
                    onValueChange={(value) => setFormData({ ...formData, urgency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select urgency level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - Animal appears safe</SelectItem>
                      <SelectItem value="medium">Medium - Needs attention soon</SelectItem>
                      <SelectItem value="high">High - Injured or in distress</SelectItem>
                      <SelectItem value="critical">Critical - Life-threatening situation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Photo (Optional)</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                    />
                    <Camera className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    A photo helps rescue teams identify and locate the animal
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="contactName">Your Name *</Label>
                    <Input
                      id="contactName"
                      placeholder="Enter your name"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Phone Number *</Label>
                    <Input
                      id="contactPhone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Submit Report
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Active Reports */}
        <TabsContent value="active" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Active Stray Animal Reports</h2>
            <Badge variant="outline">{mockReports.length} Active Reports</Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockReports.map((report) => (
              <Card key={report.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-lg">
                        {report.animalType} - {report.condition}
                      </CardTitle>
                      <div className="flex gap-2">
                        <Badge className={getUrgencyColor(report.urgency)}>{report.urgency.toUpperCase()}</Badge>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status.replace("-", " ").toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    {report.image && (
                      <img
                        src={report.image || "/placeholder.svg"}
                        alt="Stray animal"
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {report.location}
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Reported {report.reportedAt}
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Reported by {report.reportedBy}
                    </p>
                    {report.assignedTo && (
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Heart className="h-4 w-4" />
                        Assigned to {report.assignedTo}
                      </p>
                    )}
                  </div>

                  <p className="text-sm">{report.description}</p>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      View Details
                    </Button>
                    {report.status === "pending" && (
                      <Button size="sm" className="flex-1">
                        Volunteer to Help
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Resources */}
        <TabsContent value="resources" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Nearby NGOs */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Nearby Animal Rescue Organizations
              </h2>
              <div className="space-y-4">
                {nearbyNGOs.map((ngo, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{ngo.name}</h3>
                          <p className="text-sm text-muted-foreground">{ngo.distance} away</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {ngo.specialties.map((specialty) => (
                              <Badge key={specialty} variant="outline" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Phone className="h-4 w-4 mr-2" />
                          {ngo.phone}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Emergency Guidelines */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Emergency Guidelines
              </h2>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-3">
                    <h3 className="font-medium text-red-600">Critical Situations - Call Immediately:</h3>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Animal hit by vehicle</li>
                      <li>• Severe bleeding or visible fractures</li>
                      <li>• Unconscious or unresponsive animal</li>
                      <li>• Animal in immediate danger (traffic, etc.)</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-medium text-orange-600">Safety First:</h3>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Approach slowly and calmly</li>
                      <li>• Never corner a scared animal</li>
                      <li>• Use towels or blankets for handling</li>
                      <li>• Call professionals for aggressive animals</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-medium text-blue-600">What to Do:</h3>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Take photos if safe to do so</li>
                      <li>• Note exact location and time</li>
                      <li>• Provide fresh water if animal is conscious</li>
                      <li>• Stay with animal until help arrives</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
