"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, MapPin, Star, Clock, Phone, Calendar } from "lucide-react"

interface Vet {
  id: string
  name: string
  specialty: string
  rating: number
  reviews: number
  distance: string
  address: string
  phone: string
  image: string
  availableSlots: string[]
  services: string
  emergencyAvailable: boolean
}

// No mockVets, will fetch from API

export default function VetFinderPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("all")
  const [selectedDistance, setSelectedDistance] = useState("all")
  const [allVets, setAllVets] = useState<Vet[]>([]) // <-- new state for all vets
  const [filteredVets, setFilteredVets] = useState<Vet[]>([])
  useEffect(() => {
    const fetchVets = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/vet/findvet/");
        const apiVets = Array.isArray(response.data)
          ? response.data.map((item: any, idx: number) => ({
              id: item.id?.toString() || idx.toString(),
              name: item.name || "Unknown Vet",
              specialty: item.Specialties || item.specialty || "General Practice",
              rating: item.rating || 0,
              reviews: item.reviews || 0,
              distance: item.distance || "-",
              address: item.address || "-",
              phone: item.phone || "-",
              image: item.image || "/placeholder.svg",
              availableSlots: typeof item.availableSlots === "string"
                ? item.availableSlots.split(",").map((s: string) => s.trim())
                : item.availableSlots || [],
              services: item.services || "unavalable",
              emergencyAvailable: item.emergencyAvailable === true || item.emergencyAvailable === "true" || false,
            }))
          : [];
        setAllVets(apiVets) 
        setFilteredVets(apiVets) // <-- initialize filtered list
      } catch (error) {
        console.error("Failed to fetch vets from API", error);
      }
    };
    fetchVets();
  }, []);
  console.log(allVets)

  const handleSearch = () => {
    let filtered = allVets // <-- always filter from allVets

    if (searchQuery) {
      filtered = filtered.filter(
        (vet) =>
          vet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          vet.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
          // Fix: split services string and use .some on the array, with explicit typing
          vet.services
            .split(',')
            .map((s: string) => s.trim())
            .some((service: string) => service.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    if (selectedSpecialty !== "all") {
      filtered = filtered.filter((vet) => vet.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase()))
    }

    if (selectedDistance !== "all") {
      const maxDistance = Number.parseFloat(selectedDistance)
      filtered = filtered.filter((vet) => Number.parseFloat(vet.distance) <= maxDistance)
    }

    setFilteredVets(filtered)
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-balance">Find Veterinarians Near You</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
          Locate trusted veterinarians in your area and book appointments for your beloved pets
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="search">Search by name, specialty, or service</Label>
              <Input
                id="search"
                placeholder="e.g., Happy Paws, Emergency Care, Vaccinations"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="specialty">Specialty</Label>
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger>
                  <SelectValue placeholder="All Specialties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  <SelectItem value="general">General Practice</SelectItem>
                  <SelectItem value="emergency">Emergency Care</SelectItem>
                  <SelectItem value="exotic">Exotic Animals</SelectItem>
                  <SelectItem value="surgery">Surgery</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="distance">Distance</Label>
              <Select value={selectedDistance} onValueChange={setSelectedDistance}>
                <SelectTrigger>
                  <SelectValue placeholder="Any Distance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Distance</SelectItem>
                  <SelectItem value="1">Within 1 mile</SelectItem>
                  <SelectItem value="5">Within 5 miles</SelectItem>
                  <SelectItem value="10">Within 10 miles</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleSearch} className="w-full md:w-auto">
            <Search className="h-4 w-4 mr-2" />
            Search Veterinarians
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {filteredVets.length} Veterinarian{filteredVets.length !== 1 ? "s" : ""} Found
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredVets.map((vet) => (
            
            <Card key={vet.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-lg">{vet.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Badge variant="secondary">{vet.specialty}</Badge>
                      {vet.emergencyAvailable && <Badge variant="destructive">24/7 Emergency</Badge>}
                    </CardDescription>
                  </div>
                  <img
                    src={vet.image || "/placeholder.svg"}
                    alt={vet.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{vet.rating}</span>
                    <span className="text-muted-foreground">({vet.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{vet.distance}</span>
                  </div>
                </div>

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
                  <p className="text-sm font-medium">Services:</p>
                  <div className="flex flex-wrap gap-1">
                    {/* Fix: map over services and render a Badge for each */}
                    {vet.services
                      .split(',')
                      .map((service: string, idx: number) => (
                        <Badge key={idx} variant="outline">
                          {service.trim()}
                        </Badge>
                      ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="flex-1">
                        <Calendar className="h-4 w-4 mr-2" />
                        Book Appointment
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Book Appointment</DialogTitle>
                        <DialogDescription>Schedule an appointment with {vet.name}</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Available Time Slots</Label>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            {vet.availableSlots.map((slot) => (
                              <Button key={slot} variant="outline" size="sm">
                                <Clock className="h-3 w-3 mr-1" />
                                {slot}
                              </Button>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="petName">Pet Name</Label>
                          <Input id="petName" placeholder="Enter your pet's name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reason">Reason for Visit</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select reason" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="checkup">Regular Checkup</SelectItem>
                              <SelectItem value="vaccination">Vaccination</SelectItem>
                              <SelectItem value="emergency">Emergency</SelectItem>
                              <SelectItem value="grooming">Grooming</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button className="w-full">Confirm Booking</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}