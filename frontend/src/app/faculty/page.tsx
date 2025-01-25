"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { FacultyDashboard } from "@/components/faculty_dashboard";
import { TableList } from "@/components/table_list";
import { useZustandStore } from "@/store/store"; // Assuming you have a Zustand store with auth info
import Loading from "../../components/loading";
import { ProfileCard } from "@/components/profileprof";
import CourseCard, { Course } from "@/components/course-card";

export default function Student() {
  const [selectedView, setSelectedView] = useState<"students" | "faculty">(
    "students"
  );
  const [students, setStudents] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { token } = useZustandStore(); // Get the token from your global state

  // Example course data
  const courses: Course[] = [
    {
      _id: "1",
      courseCode: "CS101",
      title: "Introduction to Computer Science",
      description: "Learn the basics of programming and computer science.",
      instructor: { name: "Prof. Bob" },
      status: "approved",
      branches: ["CSE"],
      batches: [2023, 2024],
      degrees: ["BTECH"],
    },
    {
      _id: "2",
      courseCode: "EE201",
      title: "Electrical Circuits",
      description: "An in-depth study of electrical circuits and systems.",
      instructor: { name: "Prof. Bob" },
      status: "pending",
      branches: ["EE"],
      batches: [2022],
      degrees: ["BTECH", "MTECH"],
    }
  ];

  const handleEdit = (course: Course) => {
    console.log("Editing course:", course);
  };

  const handleDelete = (courseId: string) => {
    console.log("Deleting course with ID:", courseId);
  };

  useEffect(() => {
    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    const fetchData = async () => {
      setLoading(true);
      await delay(1000); // Delay for 1 second (adjust the time as needed)
      setError(null);
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        if (selectedView === "students") {
          const res = await axios.get(
            "http://localhost:5000/api/users/students",
            {
              headers,
            }
          );
          setStudents(res.data);
        } else {
          const res = await axios.get(
            "http://localhost:5000/api/users/faculty-advisors",
            {
              headers,
            }
          );
          setFaculty(res.data);
        }
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError(err.response?.data?.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedView, token]);

  return (
    <div className="">
      {token ? (
        <>
          <FacultyDashboard />
          <div className="py-10 w-1/3">
            <ProfileCard
              name="John Doe"
              email="johndoe@example.com"
              branch="Computer Science"
              Research_Interests="AI,ML,Game Theory"
            />
          </div>
          <div className="text-2xl font-bold mx-14">Courses Floated</div>
          {/* Grid of Courses */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-10 py-6">
            {courses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </>
      ) : (
        <div>Not Authorized</div>
      )}
    </div>
  );
}
