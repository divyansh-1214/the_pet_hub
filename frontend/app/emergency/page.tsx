"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, MapPin, Clock, AlertTriangle, Heart, Navigation } from "lucide-react"

interface EmergencyVet {
  id: string
  name: string
  phone: string
  address: string
  distance: string
  isOpen24h: boolean
  specialties: string[]
  rating: number
}

const emergencyVets: EmergencyVet[] = [
  {
    id: "1",
    name: "24/7 Pet Emergency Center",
    phone: "(555) 911-PETS",
    address: "123 Emergency Ave, Petville, PV 12345",
    distance: "0.8 miles",
    isOpen24h: true,
    specialties: ["Critical Care", "Surgery", "Trauma"],
    rating: 4.9,
  },
  {
    id: "2",
    name: "Animal Emergency Hospital",
    phone: "(555) 123-HELP",
    address: "456 Urgent Care Blvd, Petville, PV 12346",
    distance: "1.2 miles",
    isOpen24h: true,
    specialties: ["Emergency Medicine", "ICU", "Diagnostics"],
    rating: 4.8,
  },
  {
    id: "3",
    name: "VetCare Emergency Clinic",
    phone: "(555) 999-CARE",
    address: "789 Rescue Road, Petville, PV 12347",
    distance: "2.1 miles",
    isOpen24h: false,
    specialties: ["Emergency Care", "Surgery"],
    rating: 4.7,
  },
]

const emergencyContacts = [
  {
    name: "Animal Poison Control",
    phone: "(888) 426-4435",
    description: "24/7 hotline for pet poisoning emergencies",
    cost: "$95 consultation fee",
  },
  {
    name: "Pet Emergency Hotline",
    phone: "(855) VET-HELP",
    description: "Free guidance for pet emergencies",
    cost: "Free",
  },
  {
    name: "Local Animal Control",
    phone: "(555) 311-PETS",
    description: "For stray or dangerous animals",
    cost: "Free",
  },
]

const emergencySymptoms = [
  "Difficulty breathing or choking",
  "Unconsciousness or collapse",
  "Severe bleeding that won't stop",
  "Suspected poisoning",
  "Seizures or convulsions",
  "Severe trauma (hit by car, fall)",
  "Bloated or distended abdomen",
  "Inability to urinate or defecate",
  "Eye injuries",
  "Heatstroke symptoms",
]

export default function EmergencyPage() {
  const [selectedVet, setSelectedVet] = useState<EmergencyVet | null>(null)
  const [userLocation, setUserLocation] = useState<string>("")

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setUserLocation(`${latitude}, ${longitude}`)
        },
        (error) => {
          console.error("Error getting location:", error)
          alert("Unable to get your location. Please enter your address manually.")
        },
      )
    } else {
      alert("Geolocation is not supported by this browser.")
    }
  }

  const handleCallVet = (phone: string) => {
    window.location.href = `tel:${phone}`
  }

  const handleGetDirections = (address: string) => {
    const encodedAddress = encodeURIComponent(address)
    window.open(`https://maps.google.com/?q=${encodedAddress}`, "_blank")
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Emergency Header */}
      <div className="text-center space-y-4 bg-destructive/10 p-6 rounded-lg border border-destructive/20">
        <div className="flex items-center justify-center gap-2">
          <AlertTriangle className="h-8 w-8 text-destructive" />
          <h1 className="text-3xl md:text-4xl font-bold text-destructive">Pet Emergency</h1>
        </div>
        <p className="text-lg text-destructive/80 max-w-2xl mx-auto text-pretty">
          If your pet is experiencing a life-threatening emergency, call the nearest emergency vet immediately
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-destructive/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <Phone className="h-5 w-5" />
              Emergency Hotlines
            </CardTitle>
            <CardDescription>Call these numbers for immediate assistance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-sm text-muted-foreground">{contact.description}</p>
                  <p className="text-xs text-muted-foreground">{contact.cost}</p>
                </div>
                <Button
                  size="sm"
                  className="bg-destructive hover:bg-destructive/90"
                  onClick={() => handleCallVet(contact.phone)}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600">
              <MapPin className="h-5 w-5" />
              Share Your Location
            </CardTitle>
            <CardDescription>Help emergency responders find you quickly</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleGetLocation} className="w-full bg-transparent" variant="outline">
              <Navigation className="h-4 w-4 mr-2" />
              Get My Location
            </Button>
            {userLocation && (
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm font-medium text-green-800">Location captured:</p>
                <p className="text-xs text-green-600 font-mono">{userLocation}</p>
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              Your location will be shared with emergency services when you call
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Symptoms */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            When to Seek Emergency Care
          </CardTitle>
          <CardDescription>Call an emergency vet immediately if your pet shows any of these symptoms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {emergencySymptoms.map((symptom, index) => (
              <div key={index} className="flex items-center gap-2 p-2">
                <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0" />
                <span className="text-sm">{symptom}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Nearest Emergency Vets */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <MapPin className="h-6 w-6 text-primary" />
          Nearest Emergency Veterinarians
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {emergencyVets.map((vet) => (
            <Card key={vet.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-destructive">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-lg">{vet.name}</CardTitle>
                    <div className="flex gap-2">
                      {vet.isOpen24h && (
                        <Badge className="bg-green-100 text-green-800">
                          <Clock className="h-3 w-3 mr-1" />
                          24/7 Open
                        </Badge>
                      )}
                      <Badge variant="outline">{vet.distance}</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {vet.address}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {vet.phone}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Specialties:</p>
                  <div className="flex flex-wrap gap-1">
                    {vet.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-destructive hover:bg-destructive/90"
                    onClick={() => handleCallVet(vet.phone)}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => handleGetDirections(vet.address)}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Directions
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* First Aid Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            Basic First Aid While Waiting for Help
          </CardTitle>
          <CardDescription>Important steps to take while transporting your pet to emergency care</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-medium text-green-600">Do:</h3>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Keep your pet calm and warm</li>
                <li>• Apply direct pressure to bleeding wounds</li>
                <li>• Keep airways clear</li>
                <li>• Transport carefully in a carrier or blanket</li>
                <li>• Call ahead to the emergency vet</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium text-red-600">Don't:</h3>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Give food, water, or medication</li>
                <li>• Move pets with suspected spinal injuries</li>
                <li>• Induce vomiting unless instructed</li>
                <li>• Leave your pet unattended</li>
                <li>• Panic - stay calm for your pet</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
