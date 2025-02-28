import React, { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface LeadTableHeaderProps {
  onSearch?: (searchTerm: string) => void;
  onFilterByService?: (service: string) => void;
}

const LeadTableHeader = ({
  onSearch = () => {},
  onFilterByService = () => {},
}: LeadTableHeaderProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock service categories
  const serviceCategories = [
    "All Services",
    "Marketing & Branding",
    "Business Strategy",
    "Financial Advisory",
    "Operations Management",
    "IT Consulting",
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleServiceChange = (value: string) => {
    onFilterByService(value);
  };

  return (
    <div className="w-full bg-white p-6 rounded-t-lg border-b border-gray-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Lead Management</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage and track your client leads
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Search form */}
          <form onSubmit={handleSearch} className="relative w-full sm:w-64">
            <Input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-full"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 transform -translate-y-1/2"
            >
              Go
            </Button>
          </form>

          {/* Service filter */}
          <div className="w-full sm:w-auto">
            <Select
              onValueChange={handleServiceChange}
              defaultValue="All Services"
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <SelectValue placeholder="Filter by service" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {serviceCategories.map((service) => (
                  <SelectItem key={service} value={service}>
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadTableHeader;
