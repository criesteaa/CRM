import React from "react";
import Sidebar from "./layout/Sidebar";
import TopBar from "./layout/TopBar";
import LeadManagementTable from "./leads/LeadManagementTable";

const Home = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <TopBar title="Dashboard" />

        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-500 mt-1">
                Welcome to your Business Consulting CRM
              </p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-sm font-medium text-gray-500">
                  Total Leads
                </h3>
                <p className="text-3xl font-bold mt-2">128</p>
                <p className="text-sm text-green-600 mt-1">
                  +12% from last month
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-sm font-medium text-gray-500">
                  Active Campaigns
                </h3>
                <p className="text-3xl font-bold mt-2">5</p>
                <p className="text-sm text-green-600 mt-1">+1 new campaign</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-sm font-medium text-gray-500">
                  Scheduled Meetings
                </h3>
                <p className="text-3xl font-bold mt-2">24</p>
                <p className="text-sm text-gray-600 mt-1">
                  Next: Today at 2:00 PM
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-sm font-medium text-gray-500">
                  Conversion Rate
                </h3>
                <p className="text-3xl font-bold mt-2">32%</p>
                <p className="text-sm text-red-600 mt-1">-3% from last month</p>
              </div>
            </div>

            {/* Lead Management Table */}
            <div className="mb-6">
              <LeadManagementTable />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
