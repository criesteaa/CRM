import React, { useState } from "react";
import {
  Edit,
  Trash2,
  ChevronDown,
  ChevronUp,
  Plus,
  Calendar,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import LeadTableHeader from "./LeadTableHeader";
import EditLeadDialog from "./EditLeadDialog";
import AddLeadDialog from "./AddLeadDialog";
import DeleteLeadDialog from "./DeleteLeadDialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
}

interface LeadManagementTableProps {
  leads?: Lead[];
}

const LeadManagementTable = ({
  leads: initialLeads,
}: LeadManagementTableProps) => {
  // Default leads data if none provided
  const defaultLeads: Lead[] = [
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "(555) 123-4567",
      service: "Marketing & Branding",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "(555) 987-6543",
      service: "Business Strategy",
    },
    {
      id: "3",
      name: "Michael Brown",
      email: "m.brown@example.com",
      phone: "(555) 456-7890",
      service: "Financial Advisory",
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily.d@example.com",
      phone: "(555) 234-5678",
      service: "Operations Management",
    },
    {
      id: "5",
      name: "Robert Wilson",
      email: "r.wilson@example.com",
      phone: "(555) 876-5432",
      service: "IT Consulting",
    },
  ];

  const [leads, setLeads] = useState<Lead[]>(initialLeads || defaultLeads);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>(leads);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Lead;
    direction: "ascending" | "descending";
  } | null>(null);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [deletingLead, setDeletingLead] = useState<Lead | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Handle search functionality
  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredLeads(leads);
      return;
    }

    const lowercasedTerm = searchTerm.toLowerCase();
    const results = leads.filter(
      (lead) =>
        lead.name.toLowerCase().includes(lowercasedTerm) ||
        lead.email.toLowerCase().includes(lowercasedTerm) ||
        lead.phone.includes(searchTerm) ||
        lead.service.toLowerCase().includes(lowercasedTerm),
    );

    setFilteredLeads(results);
  };

  // Handle service filtering
  const handleFilterByService = (service: string) => {
    if (service === "All Services") {
      setFilteredLeads(leads);
      return;
    }

    const results = leads.filter((lead) => lead.service === service);
    setFilteredLeads(results);
  };

  // Handle sorting
  const requestSort = (key: keyof Lead) => {
    let direction: "ascending" | "descending" = "ascending";

    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }

    setSortConfig({ key, direction });

    const sortedLeads = [...filteredLeads].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    setFilteredLeads(sortedLeads);
  };

  // Get sort direction indicator
  const getSortDirectionIcon = (key: keyof Lead) => {
    if (!sortConfig || sortConfig.key !== key) {
      return null;
    }
    return sortConfig.direction === "ascending" ? (
      <ChevronUp className="ml-1 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-1 h-4 w-4" />
    );
  };

  // Handle lead editing
  const handleEditLead = (lead: Lead) => {
    setEditingLead(lead);
  };

  // Handle lead deletion
  const handleDeleteLead = (lead: Lead) => {
    setDeletingLead(lead);
    setDeleteDialogOpen(true);
  };

  // Handle adding a new lead
  const handleAddLead = (values: Omit<Lead, "id">) => {
    const newLead = {
      ...values,
      id: `${leads.length + 1}`,
    };
    const updatedLeads = [...leads, newLead];
    setLeads(updatedLeads);
    setFilteredLeads(updatedLeads);
  };

  // Handle showing schedule
  const handleShowSchedule = (lead: Lead) => {
    setSelectedLead(lead);
    setScheduleDialogOpen(true);
  };

  // Save edited lead
  const handleSaveLead = (updatedLead: Omit<Lead, "id"> & { id?: string }) => {
    const updatedLeads = leads.map((lead) =>
      lead.id === editingLead?.id
        ? { ...updatedLead, id: editingLead.id }
        : lead,
    );

    setLeads(updatedLeads);
    setFilteredLeads(updatedLeads);
    setEditingLead(null);
  };

  // Confirm lead deletion
  const handleConfirmDelete = () => {
    if (!deletingLead) return;

    const updatedLeads = leads.filter((lead) => lead.id !== deletingLead.id);
    setLeads(updatedLeads);
    setFilteredLeads(updatedLeads);
    setDeletingLead(null);
    setDeleteDialogOpen(false);
  };

  // Get service badge color
  const getServiceBadgeColor = (service: string) => {
    switch (service) {
      case "Marketing & Branding":
        return "bg-blue-100 text-blue-800";
      case "Business Strategy":
        return "bg-green-100 text-green-800";
      case "Financial Advisory":
        return "bg-purple-100 text-purple-800";
      case "Operations Management":
        return "bg-orange-100 text-orange-800";
      case "IT Consulting":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-full h-full bg-gray-50 rounded-lg shadow-sm border border-gray-200 flex flex-col">
      {/* Table Header with Search and Filter */}
      <LeadTableHeader
        onSearch={handleSearch}
        onFilterByService={handleFilterByService}
        onAddLead={() => setAddDialogOpen(true)}
      />

      {/* Main Table */}
      <div className="flex-1 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="w-[250px] cursor-pointer hover:bg-gray-50"
                onClick={() => requestSort("name")}
              >
                <div className="flex items-center">
                  Name {getSortDirectionIcon("name")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => requestSort("email")}
              >
                <div className="flex items-center">
                  Email {getSortDirectionIcon("email")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => requestSort("phone")}
              >
                <div className="flex items-center">
                  Phone {getSortDirectionIcon("phone")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => requestSort("service")}
              >
                <div className="flex items-center">
                  Service {getSortDirectionIcon("service")}
                </div>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.length > 0 ? (
              filteredLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>{lead.phone}</TableCell>
                  <TableCell>
                    <Badge className={getServiceBadgeColor(lead.service)}>
                      {lead.service}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleShowSchedule(lead)}
                        className="h-8 w-8 text-gray-500 hover:text-teal-600"
                        title="View Schedule"
                      >
                        <Calendar className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditLead(lead)}
                        className="h-8 w-8 text-gray-500 hover:text-blue-600"
                        title="Edit Lead"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteLead(lead)}
                        className="h-8 w-8 text-gray-500 hover:text-red-600"
                        title="Delete Lead"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No leads found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Lead Dialog */}
      {editingLead && (
        <EditLeadDialog
          open={!!editingLead}
          onOpenChange={(open) => !open && setEditingLead(null)}
          lead={editingLead}
          onSave={handleSaveLead}
        />
      )}

      {/* Add Lead Dialog */}
      <AddLeadDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onSave={handleAddLead}
      />

      {/* Delete Lead Dialog */}
      <DeleteLeadDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        lead={deletingLead || undefined}
        onConfirm={handleConfirmDelete}
      />

      {/* Schedule Dialog */}
      <Dialog open={scheduleDialogOpen} onOpenChange={setScheduleDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {selectedLead?.name}'s Schedule
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-md">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-teal-600 mr-2" />
                  <div>
                    <p className="font-medium">Initial Consultation</p>
                    <p className="text-sm text-gray-500">Tomorrow, 10:00 AM</p>
                  </div>
                </div>
              </div>
              <div className="p-4 border border-gray-200 rounded-md">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-teal-600 mr-2" />
                  <div>
                    <p className="font-medium">Follow-up Meeting</p>
                    <p className="text-sm text-gray-500">Next Week, 2:00 PM</p>
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
    </div>
  );
};

export default LeadManagementTable;
