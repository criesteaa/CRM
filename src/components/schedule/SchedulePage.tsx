import React, { useState } from "react";
import Sidebar from "../layout/Sidebar";
import TopBar from "../layout/TopBar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Plus, Filter } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const SchedulePage = () => {
  // State for dialogs
  const [addEventDialogOpen, setAddEventDialogOpen] = useState(false);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [clientDetailsDialogOpen, setClientDetailsDialogOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  // Sample client details data
  const clientDetails = {
    "Athena Ramos": {
      email: "athena.ramos@example.com",
      phone: "(555) 123-4567",
      company: "Ramos Enterprises",
      address: "123 Business Ave, Suite 400",
      notes:
        "Interested in marketing and branding services. Follow up on proposal by next week.",
    },
    "Michael Johnson": {
      email: "michael.johnson@example.com",
      phone: "(555) 987-6543",
      company: "Johnson Consulting",
      address: "456 Corporate Blvd",
      notes: "Needs help with business strategy. Has a team of 15 employees.",
    },
  };

  // Sample meetings data
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      name: "Athena Ramos",
      email: "athena.ramos@gmail.com",
      time: "10:30 AM",
    },
    {
      id: 2,
      name: "Athena Ramos",
      email: "athena.ramos@gmail.com",
      time: "10:30 AM",
    },
    {
      id: 3,
      name: "Athena Ramos",
      email: "athena.ramos@gmail.com",
      time: "10:30 AM",
    },
    {
      id: 4,
      name: "Athena Ramos",
      email: "athena.ramos@gmail.com",
      time: "10:30 AM",
    },
    {
      id: 5,
      name: "Athena Ramos",
      email: "athena.ramos@gmail.com",
      time: "10:30 AM",
    },
    {
      id: 6,
      name: "Athena Ramos",
      email: "athena.ramos@gmail.com",
      time: "10:30 AM",
    },
  ]);

  // Handle adding a new event
  const handleAddEvent = (event: {
    name: string;
    email: string;
    time: string;
  }) => {
    const newEvent = {
      ...event,
      id: meetings.length + 1,
    };
    setMeetings([...meetings, newEvent]);
    setAddEventDialogOpen(false);
  };

  // Filter meetings based on selected filter
  const filteredMeetings =
    selectedFilter === "all"
      ? meetings
      : meetings.filter(
          (_, index) => index % 2 === (selectedFilter === "today" ? 0 : 1),
        );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <TopBar />

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Schedule</h1>
              </div>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setFilterDialogOpen(true)}
                  className="flex items-center"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button
                  onClick={() => setAddEventDialogOpen(true)}
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Event
                </Button>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-full mr-4">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      No. of meetings
                    </h3>
                    <div className="flex items-end">
                      <p className="text-3xl font-bold">36</p>
                      <p className="text-sm text-gray-500 ml-2 mb-1">
                        This Month
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-full mr-4">
                    <Calendar className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Rescheduled meetings
                    </h3>
                    <div className="flex items-end">
                      <p className="text-3xl font-bold">15</p>
                      <p className="text-sm text-gray-500 ml-2 mb-1">
                        This Month
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-2 bg-red-100 rounded-full mr-4">
                    <Calendar className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Cancelled meetings
                    </h3>
                    <div className="flex items-end">
                      <p className="text-3xl font-bold">21</p>
                      <p className="text-sm text-gray-500 ml-2 mb-1">
                        This Month
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Today's Meetings */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Today - 6 meetings</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredMeetings.map((meeting) => (
                  <Card
                    key={meeting.id}
                    className="bg-white border border-gray-200"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="h-12 w-12 rounded-full overflow-hidden mr-3">
                          <img
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${meeting.name}`}
                            alt={meeting.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{meeting.name}</h3>
                          <p className="text-sm text-gray-500">
                            {meeting.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-700 mb-4">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{meeting.time}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          className="flex-1 bg-teal-600 hover:bg-teal-700"
                          onClick={() =>
                            window.open("https://meet.google.com", "_blank")
                          }
                        >
                          Join Meeting
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => {
                            setSelectedMeeting(meeting);
                            setClientDetailsDialogOpen(true);
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add Event Dialog */}
      <Dialog open={addEventDialogOpen} onOpenChange={setAddEventDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Add New Event
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Contact Name</Label>
              <Input id="name" placeholder="Enter contact name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Date & Time</Label>
              <div className="flex space-x-2">
                <Input id="date" type="date" className="flex-1" />
                <Input id="time" type="time" className="w-1/3" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Event Type</Label>
              <Select defaultValue="consultation">
                <SelectTrigger>
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consultation">
                    Initial Consultation
                  </SelectItem>
                  <SelectItem value="followup">Follow-up Meeting</SelectItem>
                  <SelectItem value="proposal">Proposal Review</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setAddEventDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={() => {
                handleAddEvent({
                  name: "New Contact",
                  email: "new.contact@example.com",
                  time: "2:00 PM",
                });
              }}
            >
              Add Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Filter Dialog */}
      <Dialog open={filterDialogOpen} onOpenChange={setFilterDialogOpen}>
        <DialogContent className="sm:max-w-[400px] bg-white">
          <DialogHeader>
            <DialogTitle>Filter Events</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="filter-by">Filter By</Label>
                <Select
                  defaultValue={selectedFilter}
                  onValueChange={(value) => setSelectedFilter(value)}
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Events</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="contact">Contact</Label>
                <Select defaultValue="all">
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select contact" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Contacts</SelectItem>
                    <SelectItem value="athena">Athena Ramos</SelectItem>
                    <SelectItem value="michael">Michael Johnson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setFilterDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" onClick={() => setFilterDialogOpen(false)}>
              Apply Filters
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Client Details Dialog */}
      <Dialog
        open={clientDetailsDialogOpen}
        onOpenChange={setClientDetailsDialogOpen}
      >
        <DialogContent className="sm:max-w-[600px] bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Meeting Details
            </DialogTitle>
          </DialogHeader>
          {selectedMeeting && (
            <div className="py-4">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg mb-6">
                <div className="h-16 w-16 rounded-full overflow-hidden">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedMeeting.name}`}
                    alt={selectedMeeting.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{selectedMeeting.name}</h2>
                  <p className="text-gray-500">
                    {clientDetails[selectedMeeting.name]?.company || ""}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      Contact Information
                    </h3>
                    <div className="bg-white p-4 rounded-md border border-gray-200">
                      <div className="grid gap-3">
                        <div className="flex items-start">
                          <span className="text-gray-500 w-20">Email:</span>
                          <span className="font-medium">
                            {selectedMeeting.email}
                          </span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-gray-500 w-20">Phone:</span>
                          <span className="font-medium">
                            {clientDetails[selectedMeeting.name]?.phone ||
                              "Not provided"}
                          </span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-gray-500 w-20">Address:</span>
                          <span className="font-medium">
                            {clientDetails[selectedMeeting.name]?.address ||
                              "Not provided"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      Meeting Information
                    </h3>
                    <div className="bg-white p-4 rounded-md border border-gray-200">
                      <div className="grid gap-3">
                        <div className="flex items-start">
                          <span className="text-gray-500 w-20">Time:</span>
                          <span className="font-medium">
                            {selectedMeeting.time}
                          </span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-gray-500 w-20">Type:</span>
                          <span className="font-medium">
                            Initial Consultation
                          </span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-gray-500 w-20">Location:</span>
                          <span className="font-medium">
                            Virtual (Google Meet)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      Notes
                    </h3>
                    <div className="bg-white p-4 rounded-md border border-gray-200 h-[150px] overflow-y-auto">
                      <p>
                        {clientDetails[selectedMeeting.name]?.notes ||
                          "No notes available."}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      Agenda
                    </h3>
                    <div className="bg-white p-4 rounded-md border border-gray-200">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Introduction and overview</li>
                        <li>Client needs assessment</li>
                        <li>Service presentation</li>
                        <li>Q&A session</li>
                        <li>Next steps and follow-up plan</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setClientDetailsDialogOpen(false)}
                >
                  Close
                </Button>
                <Button
                  className="bg-teal-600 hover:bg-teal-700"
                  onClick={() =>
                    window.open("https://meet.google.com", "_blank")
                  }
                >
                  Join Meeting
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SchedulePage;
