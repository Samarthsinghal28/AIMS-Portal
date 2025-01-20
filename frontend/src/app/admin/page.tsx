"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AdminDashboard } from "@/components/admin_dashboard";
import { PeopleList } from "@/components/people_list";

const students = [
  {
    name: "John Doe",
    email: "john@example.com",
    branch: "CSE",
    degree: "B.Tech",
    batch: "2025",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    branch: "ECE",
    degree: "B.Tech",
    batch: "2024",
  },
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    branch: "ME",
    degree: "B.Tech",
    batch: "2023",
  },
  {
    name: "Bob Brown",
    email: "bob@example.com",
    branch: "EE",
    degree: "B.Tech",
    batch: "2026",
  },
];

const faculty = [
  {
    name: "Dr. Sarah White",
    email: "sarah@example.com",
    department: "CSE",
    designation: "Professor",
    yearsOfExperience: 15,
  },
  {
    name: "Dr. Mike Green",
    email: "mike@example.com",
    department: "ECE",
    designation: "Associate Professor",
    yearsOfExperience: 10,
  },
  {
    name: "Dr. Anna Brown",
    email: "anna@example.com",
    department: "ME",
    designation: "Assistant Professor",
    yearsOfExperience: 8,
  },
];

const studentColumns = [
  { header: "Name", accessor: "name", className: "font-medium" },
  { header: "Email", accessor: "email" },
  { header: "Branch", accessor: "branch" },
  { header: "Degree", accessor: "degree" },
  { header: "Batch", accessor: "batch", className: "text-right" },
];

const facultyColumns = [
  { header: "Name", accessor: "name", className: "font-medium" },
  { header: "Email", accessor: "email" },
  { header: "Department", accessor: "department" },
  { header: "Designation", accessor: "designation" },
  {
    header: "Experience (Years)",
    accessor: "yearsOfExperience",
    className: "text-right",
  },
];

export default function Admin() {
  const [selectedView, setSelectedView] = useState<"students" | "faculty">(
    "students"
  );

  return (
    <div className="">
      <AdminDashboard />
      <div className="m-4 flex gap-4 ">
        <Button
          variant={selectedView === "students" ? "default" : "outline"}
          onClick={() => setSelectedView("students")}
        >
          Students
        </Button>
        <Button
          variant={selectedView === "faculty" ? "default" : "outline"}
          onClick={() => setSelectedView("faculty")}
        >
          Faculty
        </Button>
      </div>
      <div className="m-20 justify-evenly">
        {selectedView === "students" ? (
          <PeopleList
            columns={studentColumns}
            data={students}
            caption="List of Students"
            footerData={["", "", "", "Total Students", `${students.length}`]}
          />
        ) : (
          <PeopleList
            columns={facultyColumns}
            data={faculty}
            caption="List of Faculty"
            footerData={["", "", "", "Total Faculty", `${faculty.length}`]}
          />
        )}
      </div>
    </div>
  );
}
