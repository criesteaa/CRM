import React from "react";
import Sidebar from "../layout/Sidebar";
import TopBar from "../layout/TopBar";
import LeadManagementTable from "./LeadManagementTable";

const LeadPage = () => {
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
            {/* Lead Management Table */}
            <LeadManagementTable />
          </div>
        </main>
      </div>
    </div>
  );
};

export default LeadPage;
