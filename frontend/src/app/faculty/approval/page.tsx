"use client";

import { useState } from "react";
import { RequestList } from "@/components/request_list"; // Assuming you have a RequestList component
import { FacultyDashboard } from '@/components/faculty_dashboard'; // Adjust import path if needed

export default function Page() {
  // Define the columns for the student table    
  const studentColumns = [
    { header: "Name", accessor: "name" },
    { header: "Faculty Advisor", accessor: "facultyAdvisor" },
    { header: "Batch", accessor: "batch" },
    { header: "Branch", accessor: "branch" },
    { header: "Degree", accessor: "degree" },
    { header: "Course Code", accessor: "courseCode" },
    { header: "Action", accessor: "action" },
  ];

  // Define the columns for the faculty table
  const facultyColumns = [
    { header: "Name", accessor: "name" },
    { header: "Faculty Advisor", accessor: "facultyAdvisor" },
    { header: "Batch", accessor: "batch" },
    { header: "Branch", accessor: "branch" },
    { header: "Degree", accessor: "degree" },
    { header: "Course Code", accessor: "courseCode" },
    { header: "Action", accessor: "action" }
  ];

  // Sample data for students
  const studentData = [
    {
      id: "1",
      name: "John Doe",
      facultyAdvisor: "Dr. Smith",
      batch: 2023,
      branch: "CSE",
      degree: "BTECH",
      courseCode: "CS101",
    },
  ];

  // Sample data for faculty
  const facultyData = [
    {
      id: "1",
      name: "John Doo",
      facultyAdvisor: "Dr. Smith",
      batch: 2023,
      branch: "CSE",
      degree: "BTECH",
      courseCode: "CS101",
    },
  ];

  // Define the footer data
  const studentFooterData = [`Total Students: ${studentData.length}`];
  const facultyFooterData = [`Total Faculty: ${facultyData.length}`];

  // Handlers for approve and reject actions for students
  const handleApproveStudent = (id: string) => {
    console.log(`Approved student request with ID: ${id}`);
  };

  const handleRejectStudent = (id: string) => {
    console.log(`Rejected student request with ID: ${id}`);
  };

  // Handlers for approve and reject actions for faculty
  const handleApproveFaculty = (id: string) => {
    console.log(`Approved faculty request with ID: ${id}`);
  };

  const handleRejectFaculty = (id: string) => {
    console.log(`Rejected faculty request with ID: ${id}`);
  };

  // State to manage the active tab (student or faculty)
  const [activeTab, setActiveTab] = useState("student");

  return (
    <div className="relative">
      <FacultyDashboard />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-7xl p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold text-center mb-6">Pending Approval Requests</h1>

          {/* Tabs for switching between tables */}
          <div className="mb-6 flex justify-center">
            <button
              className={`px-4 py-2 mr-2 ${activeTab === "student" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              onClick={() => setActiveTab("student")}
            >
              Student Requests
            </button>
            <button
              className={`px-4 py-2 ${activeTab === "faculty" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              onClick={() => setActiveTab("faculty")}
            >
              Faculty Requests
            </button>
          </div>

          {/* Ensure both tables are in the same container to maintain alignment */}
          <div className="overflow-x-auto mb-8" style={{ minHeight: "300px" }}>
            {activeTab === "student" && (
              <RequestList
                columns={studentColumns}
                data={studentData}
                caption="Student Requests"
                onApprove={handleApproveStudent}
                onReject={handleRejectStudent}
                footerData={studentFooterData}
              />
            )}
            {activeTab === "faculty" && (
              <RequestList
                columns={facultyColumns}
                data={facultyData}
                caption="Faculty Requests"
                onApprove={handleApproveFaculty}
                onReject={handleRejectFaculty}
                footerData={facultyFooterData}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
