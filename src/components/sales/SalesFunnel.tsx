import React, { useState } from "react";
import Sidebar from "../layout/Sidebar";
import TopBar from "../layout/TopBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, MoreHorizontal, Edit, Trash2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import AddClientDialog from "./AddClientDialog";

const SalesFunnel = () => {
  // Sample client data
  const [clients, setClients] = useState([
    { id: 1, name: "Athena Khrysta Ramos" },
    { id: 2, name: "Michael Johnson" },
    { id: 3, name: "Sarah Williams" },
  ]);

  // Client-specific stages
  const [clientStages, setClientStages] = useState({
    1: ["Discovery", "Talk", "Retention", "Pitch"],
    2: ["Initial Contact", "Proposal", "Negotiation", "Closing"],
    3: ["Lead", "Qualification", "Presentation", "Contract"],
  });

  // Sample client details data
  const clientDetails = {
    1: {
      email: "athena.ramos@example.com",
      phone: "(555) 123-4567",
      company: "Ramos Enterprises",
      address: "123 Business Ave, Suite 400",
    },
    2: {
      email: "michael.johnson@example.com",
      phone: "(555) 987-6543",
      company: "Johnson Consulting",
    },
    3: {
      email: "sarah.williams@example.com",
      phone: "(555) 456-7890",
      company: "Williams & Associates",
    },
  };

  // State for dialogs
  const [addClientDialogOpen, setAddClientDialogOpen] = useState(false);
  const [addProcessDialogOpen, setAddProcessDialogOpen] = useState(false);
  const [editProcessDialogOpen, setEditProcessDialogOpen] = useState(false);
  const [deleteProcessDialogOpen, setDeleteProcessDialogOpen] = useState(false);
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [clientDetailsDialogOpen, setClientDetailsDialogOpen] = useState(false);
  const [newProcessName, setNewProcessName] = useState("");
  const [editingProcess, setEditingProcess] = useState("");
  const [editingProcessIndex, setEditingProcessIndex] = useState(-1);
  const [deletingProcessIndex, setDeletingProcessIndex] = useState(-1);
  const [selectedClient, setSelectedClient] = useState<{
    id: number;
    name: string;
  } | null>(null);

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
              <h1 className="text-3xl font-bold text-gray-900">Sales Funnel</h1>
              <Button
                onClick={() => setAddClientDialogOpen(true)}
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Client
              </Button>
            </div>

            {/* Sales Funnel Board */}
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {clients.map((client) => (
                <Card
                  key={client.id}
                  className="w-[350px] flex-shrink-0 bg-white"
                >
                  <CardHeader className="pb-2 pt-4 px-4">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-sm font-medium text-gray-700">
                        Client: {client.name}
                      </CardTitle>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => {
                            setSelectedClient(client);
                            setScheduleDialogOpen(true);
                          }}
                        >
                          <Calendar className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedClient(client);
                                setClientDetailsDialogOpen(true);
                              }}
                            >
                              View Details
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="px-4 py-2">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-500">Processes</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => {
                          setSelectedClient(client);
                          setAddProcessDialogOpen(true);
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-3 min-h-[200px]">
                      {clientStages[client.id]?.map((stage) => (
                        <div
                          key={stage}
                          className="p-3 border border-gray-200 rounded-md text-center hover:bg-gray-50 cursor-move transition-colors relative group bg-white shadow-sm"
                          draggable="true"
                          onDragStart={(e) => {
                            // Store both the stage name and client ID to ensure we only move within the same client card
                            e.dataTransfer.setData(
                              "text/plain",
                              JSON.stringify({
                                stage: stage,
                                clientId: client.id,
                              }),
                            );
                          }}
                          onDragOver={(e) => {
                            e.preventDefault();
                            e.currentTarget.classList.add("bg-gray-100");
                          }}
                          onDragLeave={(e) => {
                            e.currentTarget.classList.remove("bg-gray-100");
                          }}
                          onDrop={(e) => {
                            e.preventDefault();
                            e.currentTarget.classList.remove("bg-gray-100");
                            try {
                              const data = JSON.parse(
                                e.dataTransfer.getData("text/plain"),
                              );
                              const draggedStage = data.stage;
                              const draggedClientId = data.clientId;

                              // Only allow reordering if it's the same client
                              if (
                                draggedClientId === client.id &&
                                draggedStage !== stage
                              ) {
                                const newClientStages = { ...clientStages };
                                const currentStages = [
                                  ...newClientStages[client.id],
                                ];
                                const draggedIndex =
                                  currentStages.indexOf(draggedStage);
                                const targetIndex =
                                  currentStages.indexOf(stage);
                                currentStages.splice(draggedIndex, 1);
                                currentStages.splice(
                                  targetIndex,
                                  0,
                                  draggedStage,
                                );
                                newClientStages[client.id] = currentStages;
                                setClientStages(newClientStages);
                              }
                            } catch (error) {
                              console.error("Error parsing drag data", error);
                            }
                          }}
                        >
                          {stage}
                          <div className="absolute right-2 top-2 hidden group-hover:flex space-x-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-5 w-5 p-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingProcess(stage);
                                setEditingProcessIndex(
                                  clientStages[client.id].indexOf(stage),
                                );
                                setSelectedClient(client);
                                setEditProcessDialogOpen(true);
                              }}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-5 w-5 p-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeletingProcessIndex(
                                  clientStages[client.id].indexOf(stage),
                                );
                                setSelectedClient(client);
                                setDeleteProcessDialogOpen(true);
                              }}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Add Process Dialog */}
      <Dialog
        open={addProcessDialogOpen}
        onOpenChange={setAddProcessDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>Add New Process Stage</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="process-name" className="text-sm font-medium">
                Process Name
              </label>
              <Input
                id="process-name"
                value={newProcessName}
                onChange={(e) => setNewProcessName(e.target.value)}
                placeholder="Enter process name"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setAddProcessDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={() => {
                if (newProcessName.trim() && selectedClient) {
                  const newClientStages = { ...clientStages };
                  newClientStages[selectedClient.id] = [
                    ...(newClientStages[selectedClient.id] || []),
                    newProcessName,
                  ];
                  setClientStages(newClientStages);
                  setNewProcessName("");
                  setAddProcessDialogOpen(false);
                }
              }}
            >
              Add Process
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Process Dialog */}
      <Dialog
        open={editProcessDialogOpen}
        onOpenChange={setEditProcessDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>Edit Process</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label
                htmlFor="edit-process-name"
                className="text-sm font-medium"
              >
                Process Name
              </label>
              <Input
                id="edit-process-name"
                value={editingProcess}
                onChange={(e) => setEditingProcess(e.target.value)}
                placeholder="Enter process name"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setEditProcessDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={() => {
                if (
                  editingProcess.trim() &&
                  editingProcessIndex >= 0 &&
                  selectedClient
                ) {
                  const newClientStages = { ...clientStages };
                  const currentStages = [...newClientStages[selectedClient.id]];
                  currentStages[editingProcessIndex] = editingProcess;
                  newClientStages[selectedClient.id] = currentStages;
                  setClientStages(newClientStages);
                  setEditProcessDialogOpen(false);
                }
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Process Dialog */}
      <AlertDialog
        open={deleteProcessDialogOpen}
        onOpenChange={setDeleteProcessDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              process
              {deletingProcessIndex >= 0 &&
                selectedClient &&
                clientStages[selectedClient.id] && (
                  <strong>
                    {" "}
                    {clientStages[selectedClient.id][deletingProcessIndex]}
                  </strong>
                )}
              .
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deletingProcessIndex >= 0 && selectedClient) {
                  const newClientStages = { ...clientStages };
                  const currentStages = [...newClientStages[selectedClient.id]];
                  currentStages.splice(deletingProcessIndex, 1);
                  newClientStages[selectedClient.id] = currentStages;
                  setClientStages(newClientStages);
                  setDeleteProcessDialogOpen(false);
                }
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Add Client Dialog */}
      <AddClientDialog
        open={addClientDialogOpen}
        onOpenChange={setAddClientDialogOpen}
        onSave={(values) => {
          const newClientId = clients.length + 1;
          const newClient = {
            id: newClientId,
            name: values.name,
          };
          setClients([...clients, newClient]);

          // Initialize with empty stages for the new client
          const newClientStages = { ...clientStages };
          newClientStages[newClientId] = [];
          setClientStages(newClientStages);

          // Add client details
          clientDetails[newClientId] = {
            email: values.email,
            phone: values.phone,
            company: values.company || "",
            address: values.address || "",
            notes: values.notes || "",
          };
        }}
      />

      {/* Schedule Dialog */}
      <Dialog open={scheduleDialogOpen} onOpenChange={setScheduleDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {selectedClient?.name}'s Schedule
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-md">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-teal-600 mr-2" />
                  <div>
                    <p className="font-medium">Strategy Meeting</p>
                    <p className="text-sm text-gray-500">Tomorrow, 11:30 AM</p>
                  </div>
                </div>
              </div>
              <div className="p-4 border border-gray-200 rounded-md">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-teal-600 mr-2" />
                  <div>
                    <p className="font-medium">Proposal Review</p>
                    <p className="text-sm text-gray-500">Next Week, 3:00 PM</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Button className="w-full bg-teal-600 hover:bg-teal-700">
                  <Plus className="h-4 w-4 mr-2" /> Add New Event
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Client Details Dialog */}
      <Dialog
        open={clientDetailsDialogOpen}
        onOpenChange={setClientDetailsDialogOpen}
      >
        <DialogContent className="sm:max-w-[400px] bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Client Details
            </DialogTitle>
          </DialogHeader>
          {selectedClient && (
            <div className="py-4">
              <div className="mb-6">
                <h2 className="text-xl font-bold">{selectedClient.name}</h2>
                <p className="text-gray-500">
                  {clientDetails[selectedClient.id]?.company}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Contact Information
                  </h3>
                  <div className="bg-white p-4 rounded-md border border-gray-200">
                    <div className="grid gap-3">
                      <div className="flex items-start">
                        <span className="text-gray-500 w-16">Email:</span>
                        <span className="font-medium">
                          {clientDetails[selectedClient.id]?.email}
                        </span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-gray-500 w-16">Phone:</span>
                        <span className="font-medium">
                          {clientDetails[selectedClient.id]?.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => setClientDetailsDialogOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SalesFunnel;
