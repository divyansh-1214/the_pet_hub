"use client"

import type React from "react"

import { useState, useEffect } from "react"
import axios from "axios"
import Link from "next/link"
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
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Heart, Search, MapPin, Calendar } from "lucide-react"

interface Pet {
  id: string
  name: string
  type: "dog" | "cat" | "bird" | "rabbit" | "other"
  breed: string
  age: string
  gender: "male" | "female"
  size: "small" | "medium" | "large"
  color: string
  location: string
  shelter: string
  description: string
  personality: string[]
  goodWith: string[]
  specialNeeds: string[]
  adoptionFee: number
  images: string[]
  vaccinated: boolean
  spayedNeutered: boolean
  houseTrained: boolean
  datePosted: string
}

// No mockPets, will fetch from API

export default function AdoptionPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedSize, setSelectedSize] = useState("all")
  const [selectedAge, setSelectedAge] = useState("all")
  const [filteredPets, setFilteredPets] = useState<Pet[]>([])
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/adopt/pet/");
        const apiPets = Array.isArray(response.data)
          ? response.data.map((item: any, idx: number) => ({
              id: item.id?.toString() || idx.toString(),
              name: item.name || "Unknown",
              type: item.type || "other",
              breed: item.breed || "",
              age: item.age || "",
              gender: item.gender || "male",
              size: item.size || "medium",
              color: item.color || "",
              location: item.location || "",
              shelter: item.shelter || "",
              description: item.description || "",
              personality: typeof item.personality === "string"
                ? item.personality.split(",").map((t: string) => t.trim())
                : item.personality || [],
              goodWith: typeof item.goodWith === "string"
                ? item.goodWith.split(",").map((t: string) => t.trim())
                : item.goodWith || [],
              specialNeeds: typeof item.specialNeeds === "string"
                ? item.specialNeeds.split(",").map((t: string) => t.trim())
                : item.specialNeeds || [],
              adoptionFee: item.adoptionFee || 0,
              images: typeof item.images === "string"
                ? item.images.split(",").map((img: string) => img.trim())
                : item.images || ["/placeholder.svg"],
              vaccinated: item.vaccinated === true || item.vaccinated === "true" || false,
              spayedNeutered: item.spayedNeutered === true || item.spayedNeutered === "true" || false,
              houseTrained: item.houseTrained === true || item.houseTrained === "true" || false,
              datePosted: item.datePosted || "",
            }))
          : [];
        setFilteredPets(apiPets);
      } catch (error) {
        console.error("Failed to fetch pets from API", error);
      }
    };
    fetchPets();
  }, []);
  const [applicationData, setApplicationData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    housingType: "",
    hasYard: false,
    hasOtherPets: false,
    otherPetsDetails: "",
    experience: "",
    reason: "",
    agreeToTerms: false,
  })

  const handleSearch = () => {
  let filtered = filteredPets

    if (searchQuery) {
      filtered = filtered.filter(
        (pet) =>
          pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pet.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pet.personality.some((trait) => trait.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    if (selectedType !== "all") {
      filtered = filtered.filter((pet) => pet.type === selectedType)
    }

    if (selectedSize !== "all") {
      filtered = filtered.filter((pet) => pet.size === selectedSize)
    }

    if (selectedAge !== "all") {
      if (selectedAge === "young") {
        filtered = filtered.filter((pet) => pet.age.includes("month") || Number.parseInt(pet.age) <= 2)
      } else if (selectedAge === "adult") {
        filtered = filtered.filter((pet) => Number.parseInt(pet.age) >= 3 && Number.parseInt(pet.age) <= 7)
      } else if (selectedAge === "senior") {
        filtered = filtered.filter((pet) => Number.parseInt(pet.age) >= 8)
      }
    }

    setFilteredPets(filtered)
  }

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Adoption application submitted:", applicationData)
    // Handle application submission
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-balance">Find Your Perfect Companion</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
          Browse adoptable pets from local shelters and rescue organizations. Give a loving animal a forever home.
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search & Filter Pets
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="search">Search by name, breed, or personality</Label>
              <Input
                id="search"
                placeholder="e.g., Buddy, Golden Retriever, Friendly"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="type">Pet Type</Label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="dog">Dogs</SelectItem>
                  <SelectItem value="cat">Cats</SelectItem>
                  <SelectItem value="bird">Birds</SelectItem>
                  <SelectItem value="rabbit">Rabbits</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="size">Size</Label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger>
                  <SelectValue placeholder="All Sizes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sizes</SelectItem>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="age">Age</Label>
              <Select value={selectedAge} onValueChange={setSelectedAge}>
                <SelectTrigger>
                  <SelectValue placeholder="All Ages" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ages</SelectItem>
                  <SelectItem value="young">Young (0-2 years)</SelectItem>
                  <SelectItem value="adult">Adult (3-7 years)</SelectItem>
                  <SelectItem value="senior">Senior (8+ years)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleSearch} className="w-full md:w-auto">
            <Search className="h-4 w-4 mr-2" />
            Search Pets
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {filteredPets.length} Pet{filteredPets.length !== 1 ? "s" : ""} Available for Adoption
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPets.map((pet) => (
            <Card key={pet.id} className="hover:shadow-lg transition-shadow overflow-hidden">
              <div className="aspect-video relative">
                <img src={pet.images[0] || "/placeholder.svg"} alt={pet.name} className="w-full h-full object-cover" />
                <Badge className="absolute top-2 right-2 bg-primary">${pet.adoptionFee}</Badge>
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{pet.name}</CardTitle>
                    <CardDescription>
                      {pet.breed} • {pet.age} • {pet.gender}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {pet.size}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {pet.location}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Posted {pet.datePosted}
                  </p>
                </div>

                <p className="text-sm line-clamp-2">{pet.description}</p>

                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {pet.personality.slice(0, 3).map((trait) => (
                      <Badge key={trait} variant="secondary" className="text-xs">
                        {trait}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    {pet.vaccinated && <span>✓ Vaccinated</span>}
                    {pet.spayedNeutered && <span>✓ Spayed/Neutered</span>}
                    {pet.houseTrained && <span>✓ House Trained</span>}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link href={`/adoption/${pet.id}`} className="flex-1">
                    <Button variant="outline" className="w-full bg-transparent">
                      View Details
                    </Button>
                  </Link>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="flex-1">
                        <Heart className="h-4 w-4 mr-2" />
                        Adopt
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Adoption Application for {pet.name}</DialogTitle>
                        <DialogDescription>
                          Please fill out this application to start the adoption process
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleApplicationSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name *</Label>
                            <Input
                              id="fullName"
                              value={applicationData.fullName}
                              onChange={(e) => setApplicationData({ ...applicationData, fullName: e.target.value })}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={applicationData.email}
                              onChange={(e) => setApplicationData({ ...applicationData, email: e.target.value })}
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number *</Label>
                            <Input
                              id="phone"
                              type="tel"
                              value={applicationData.phone}
                              onChange={(e) => setApplicationData({ ...applicationData, phone: e.target.value })}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="housingType">Housing Type *</Label>
                            <Select
                              value={applicationData.housingType}
                              onValueChange={(value) => setApplicationData({ ...applicationData, housingType: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select housing type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="house">House</SelectItem>
                                <SelectItem value="apartment">Apartment</SelectItem>
                                <SelectItem value="condo">Condo</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="address">Address *</Label>
                          <Textarea
                            id="address"
                            value={applicationData.address}
                            onChange={(e) => setApplicationData({ ...applicationData, address: e.target.value })}
                            required
                          />
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="hasYard"
                              checked={applicationData.hasYard}
                              onCheckedChange={(checked) =>
                                setApplicationData({ ...applicationData, hasYard: checked as boolean })
                              }
                            />
                            <Label htmlFor="hasYard">I have a yard or outdoor space</Label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="hasOtherPets"
                              checked={applicationData.hasOtherPets}
                              onCheckedChange={(checked) =>
                                setApplicationData({ ...applicationData, hasOtherPets: checked as boolean })
                              }
                            />
                            <Label htmlFor="hasOtherPets">I have other pets</Label>
                          </div>

                          {applicationData.hasOtherPets && (
                            <div className="space-y-2">
                              <Label htmlFor="otherPetsDetails">Please describe your other pets</Label>
                              <Textarea
                                id="otherPetsDetails"
                                value={applicationData.otherPetsDetails}
                                onChange={(e) =>
                                  setApplicationData({ ...applicationData, otherPetsDetails: e.target.value })
                                }
                              />
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="experience">Pet ownership experience</Label>
                          <Textarea
                            id="experience"
                            placeholder="Tell us about your experience with pets..."
                            value={applicationData.experience}
                            onChange={(e) => setApplicationData({ ...applicationData, experience: e.target.value })}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="reason">Why do you want to adopt {pet.name}? *</Label>
                          <Textarea
                            id="reason"
                            placeholder="Tell us why you're interested in adopting this pet..."
                            value={applicationData.reason}
                            onChange={(e) => setApplicationData({ ...applicationData, reason: e.target.value })}
                            required
                          />
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="agreeToTerms"
                            checked={applicationData.agreeToTerms}
                            onCheckedChange={(checked) =>
                              setApplicationData({ ...applicationData, agreeToTerms: checked as boolean })
                            }
                          />
                          <Label htmlFor="agreeToTerms" className="text-sm">
                            I agree to the adoption terms and conditions and understand that this application will be
                            reviewed by the shelter *
                          </Label>
                        </div>

                        <Button type="submit" className="w-full" disabled={!applicationData.agreeToTerms}>
                          Submit Application
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

