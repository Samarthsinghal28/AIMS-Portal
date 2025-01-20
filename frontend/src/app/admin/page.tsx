"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
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

const studentColumns = [
  { header: "Name", accessor: "name", className: "font-medium" },
  { header: "Email", accessor: "email" },
  { header: "Branch", accessor: "branch" },
  { header: "Degree", accessor: "degree" },
  { header: "Batch", accessor: "batch", className: "text-right" },
];

export default function Admin() {
  const router = useRouter();

  return (
    <div className="">
      <AdminDashboard />
      <div className="flex m-20">
        <PeopleList
          columns={studentColumns}
          data={students}
          caption="List of Students"
          footerData={["", "", "", "Total Students", `${students.length}`]}
        />
      </div>
    </div>
  );
}
