"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Plus, Activity, Syringe, Pill, FileText, AlertCircle } from "lucide-react"

interface HealthRecord {
  id: string
  petName: string
  type: "vaccination" | "checkup" | "medication" | "surgery" | "other"
  title: string
  date: string
  vet: string
  notes: string
  nextDue?: string
}

interface Pet {
  id: string
  name: string
  type: string
  breed: string
  age: string
  image: string
}

const mockPets: Pet[] = [
  {
    id: "1",
    name: "Buddy",
    type: "Dog",
    breed: "Golden Retriever",
    age: "3 years",
    image: "/placeholder.svg?height=100&width=100&text=Buddy",
  },
  {
    id: "2",
    name: "Luna",
    type: "Cat",
    breed: "Domestic Shorthair",
    age: "2 years",
    image: "/placeholder.svg?height=100&width=100&text=Luna",
  },
]

const mockRecords: HealthRecord[] = [
  {
    id: "1",
    petName: "Buddy",
    type: "vaccination",
    title: "Annual Vaccination",
    date: "2024-01-15",
    vet: "Dr. Smith - Happy Paws Clinic",
    notes: "Received DHPP and Rabies vaccines. No adverse reactions observed.",
    nextDue: "2025-01-15",
  },
  {
    id: "2",
    petName: "Luna",
    type: "checkup",
    title: "Routine Checkup",
    date: "2024-02-10",
    vet: "Dr. Johnson - Pet Care Center",
    notes: "Overall health excellent. Weight: 8.5 lbs. Dental cleaning recommended.",
  },
  {
    id: "3",
    petName: "Buddy",
    type: "medication",
    title: "Flea Prevention",
    date: "2024-03-01",
    vet: "Dr. Smith - Happy Paws Clinic",
    notes: "Started monthly flea prevention treatment.",
    nextDue: "2024-04-01",
  },
]

const upcomingReminders = [
  { pet: "Buddy", task: "Flea Prevention", date: "2024-04-01", daysUntil: 5 },
  { pet: "Luna", task: "Dental Cleaning", date: "2024-04-15", daysUntil: 19 },
  { pet: "Buddy", task: "Annual Vaccination", date: "2025-01-15", daysUntil: 295 },
]

export default function HealthTrackerPage() {
  const [records, setRecords] = useState(mockRecords)
  const [selectedPet, setSelectedPet] = useState("all")
  const [newRecord, setNewRecord] = useState({
    petName: "",
    type: "checkup" as const,
    title: "",
    date: "",
    vet: "",
    notes: "",
    nextDue: "",
  })

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault()
    const record: HealthRecord = {
      id: Date.now().toString(),
      ...newRecord,
    }
    setRecords([record, ...records])
    setNewRecord({
      petName: "",
      type: "checkup",
      title: "",
      date: "",
      vet: "",
      notes: "",
      nextDue: "",
    })
  }

  const filteredRecords = selectedPet === "all" ? records : records.filter((record) => record.petName === selectedPet)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "vaccination":
        return <Syringe className="h-4 w-4" />
      case "medication":
        return <Pill className="h-4 w-4" />
      case "checkup":
        return <Activity className="h-4 w-4" />
      case "surgery":
        return <FileText className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "vaccination":
        return "bg-green-100 text-green-800"
      case "medication":
        return "bg-blue-100 text-blue-800"
      case "checkup":
        return "bg-purple-100 text-purple-800"
      case "surgery":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-balance">Pet Health Tracker</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
          Keep track of your pets' medical history, vaccinations, and upcoming appointments
        </p>
      </div>

      <Tabs defaultValue="records" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="records">Health Records</TabsTrigger>
            <TabsTrigger value="reminders">Reminders</TabsTrigger>
            <TabsTrigger value="pets">My Pets</TabsTrigger>
          </TabsList>

          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Record
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add Health Record</DialogTitle>
                <DialogDescription>Record a new medical entry for your pet</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddRecord} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="petName">Pet Name *</Label>
                    <select
                      id="petName"
                      className="w-full p-2 border rounded-md"
                      value={newRecord.petName}
                      onChange={(e) => setNewRecord({ ...newRecord, petName: e.target.value })}
                      required
                    >
                      <option value="">Select a pet</option>
                      {mockPets.map((pet) => (
                        <option key={pet.id} value={pet.name}>
                          {pet.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Record Type *</Label>
                    <select
                      id="type"
                      className="w-full p-2 border rounded-md"
                      value={newRecord.type}
                      onChange={(e) => setNewRecord({ ...newRecord, type: e.target.value as any })}
                      required
                    >
                      <option value="checkup">Checkup</option>
                      <option value="vaccination">Vaccination</option>
                      <option value="medication">Medication</option>
                      <option value="surgery">Surgery</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Annual Vaccination, Routine Checkup"
                    value={newRecord.title}
                    onChange={(e) => setNewRecord({ ...newRecord, title: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newRecord.date}
                      onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nextDue">Next Due (optional)</Label>
                    <Input
                      id="nextDue"
                      type="date"
                      value={newRecord.nextDue}
                      onChange={(e) => setNewRecord({ ...newRecord, nextDue: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vet">Veterinarian *</Label>
                  <Input
                    id="vet"
                    placeholder="e.g., Dr. Smith - Happy Paws Clinic"
                    value={newRecord.vet}
                    onChange={(e) => setNewRecord({ ...newRecord, vet: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Additional notes about the visit or treatment..."
                    value={newRecord.notes}
                    onChange={(e) => setNewRecord({ ...newRecord, notes: e.target.value })}
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Add Record
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Health Records */}
        <TabsContent value="records" className="space-y-6">
          <div className="flex items-center gap-4">
            <Label htmlFor="petFilter">Filter by pet:</Label>
            <select
              id="petFilter"
              className="p-2 border rounded-md"
              value={selectedPet}
              onChange={(e) => setSelectedPet(e.target.value)}
            >
              <option value="all">All Pets</option>
              {mockPets.map((pet) => (
                <option key={pet.id} value={pet.name}>
                  {pet.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            {filteredRecords.map((record) => (
              <Card key={record.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge className={getTypeColor(record.type)}>
                          {getTypeIcon(record.type)}
                          <span className="ml-1 capitalize">{record.type}</span>
                        </Badge>
                        <span className="text-sm text-muted-foreground">{record.petName}</span>
                      </div>
                      <CardTitle className="text-lg">{record.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(record.date).toLocaleDateString()}
                        {record.nextDue && (
                          <>
                            <span>•</span>
                            <span>Next due: {new Date(record.nextDue).toLocaleDateString()}</span>
                          </>
                        )}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    <strong>Veterinarian:</strong> {record.vet}
                  </p>
                  {record.notes && <p className="text-sm">{record.notes}</p>}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Reminders */}
        <TabsContent value="reminders" className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Upcoming Reminders</h2>
            {upcomingReminders.map((reminder, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <h3 className="font-medium">
                        {reminder.pet} - {reminder.task}
                      </h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Due: {new Date(reminder.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={reminder.daysUntil <= 7 ? "destructive" : "secondary"}
                        className="flex items-center gap-1"
                      >
                        {reminder.daysUntil <= 7 && <AlertCircle className="h-3 w-3" />}
                        {reminder.daysUntil} days
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* My Pets */}
        <TabsContent value="pets" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockPets.map((pet) => (
              <Card key={pet.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <img
                    src={pet.image || "/placeholder.svg"}
                    alt={pet.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover"
                  />
                  <CardTitle>{pet.name}</CardTitle>
                  <CardDescription>
                    {pet.breed} • {pet.age}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      {records.filter((r) => r.petName === pet.name).length} health records
                    </p>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    View Health History
                  </Button>
                </CardContent>
              </Card>
            ))}

            <Card className="border-dashed border-2 hover:shadow-lg transition-shadow">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center space-y-4">
                <Plus className="h-12 w-12 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">Add New Pet</h3>
                  <p className="text-sm text-muted-foreground">Add another pet to track their health</p>
                </div>
                <Button variant="outline" className="bg-transparent">
                  Add Pet
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
