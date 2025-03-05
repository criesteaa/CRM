import React from "react";
import Sidebar from "../layout/Sidebar";
import TopBar from "../layout/TopBar";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const StaffPage = () => {
  // Sample staff data
  const staffMembers = [
    {
      id: 1,
      name: "Dian Quadratic",
      employeeId: "#101215500",
      role: "Admin",
      status: "Active",
      team: "Marketing & Branding",
    },
    {
      id: 2,
      name: "Kyle Florendo",
      employeeId: "#101215500",
      role: "Staff",
      status: "Active",
      team: "IT & Digital Transformation",
    },
    {
      id: 3,
      name: "Alyssa Alegre",
      employeeId: "#101215500",
      role: "Staff",
      status: "Inactive",
      team: "IT & Digital Transformation",
    },
    {
      id: 4,
      name: "Lea Jenny Abuseo",
      employeeId: "#101215500",
      role: "Staff",
      status: "Active",
      team: "Legal & Regulatory Compliance",
    },
    {
      id: 5,
      name: "Chanel Longriver",
      employeeId: "#101215500",
      role: "Staff",
      status: "Inactive",
      team: "Human Resources & Talent Management",
    },
    {
      id: 6,
      name: "Ivan Dale Clarity",
      employeeId: "#101215500",
      role: "Staff",
      status: "Active",
      team: "Operations & Process Improvement",
    },
    {
      id: 7,
      name: "Windel Ramos",
      employeeId: "#101215500",
      role: "Staff",
      status: "Inactive",
      team: "Financial Consulting",
    },
    {
      id: 8,
      name: "Nathan Ting",
      employeeId: "#101215500",
      role: "Staff",
      status: "Active",
      team: "Business Strategy & Planning",
    },
  ];

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
                <h1 className="text-3xl font-bold text-gray-900">Employees</h1>
                <div className="flex items-center mt-1">
                  <span className="text-sm text-gray-500">100</span>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline">Export</Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  New Employee
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="-mb-px flex space-x-8">
                <a
                  href="#"
                  className="border-blue-500 text-blue-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                >
                  All Employees
                </a>
                <a
                  href="#"
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                >
                  Teams
                </a>
                <a
                  href="#"
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                >
                  Roles
                </a>
              </nav>
            </div>

            {/* Search and Filter */}
            <div className="flex justify-between mb-6">
              <div className="relative w-64">
                <input
                  type="text"
                  placeholder="Search Employee by name, role, ID or any related keywords"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <Button variant="outline" className="flex items-center">
                <svg
                  className="h-5 w-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                    clipRule="evenodd"
                  />
                </svg>
                Filter
              </Button>
            </div>

            {/* Staff Table */}
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      EMPLOYEE NAME
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      EMPLOYEE ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ROLE
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      STATUS
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      TEAMS
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {staffMembers.map((staff) => (
                    <tr key={staff.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {staff.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {staff.employeeId}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {staff.role}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge
                          className={`${
                            staff.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {staff.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {staff.team}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StaffPage;
