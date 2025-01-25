"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { StudentDashboard } from "@/components/student_dashboard";
import { TableList } from "@/components/table_list";
import { useZustandStore } from "@/store/store";
import { ProfileCard } from "@/components/profile";
import CourseCard, { type Course } from "@/components/course-card";
import { SearchBar, type SearchParams } from "@/components/searchbar";

export default function Course_Add_Drop() {
  const [selectedView, setSelectedView] = useState<"students" | "faculty">(
    "students"
  );
  const [students, setStudents] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  const { token } = useZustandStore();

  useEffect(() => {
    // Simulating course data fetch
    setCourses([
      {
        _id: "1",
        courseCode: "CS101",
        title: "Introduction to Computer Science",
        description: "Learn the basics of programming and computer science.",
        instructor: { name: "Prof. Alice" },
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
      },
      {
        _id: "3",
        courseCode: "CIV301",
        title: "Structural Analysis",
        description:
          "Understand the mechanics of structures in civil engineering.",
        instructor: { name: "Dr. Carol" },
        status: "approved",
        branches: ["Civil"],
        batches: [2023],
        degrees: ["BTECH"],
      },
      {
        _id: "4",
        courseCode: "ME401",
        title: "Thermodynamics",
        description:
          "Study of heat and temperature, and their relation to energy and work.",
        instructor: { name: "Dr. David" },
        status: "approved",
        branches: ["CSE"],
        batches: [2023],
        degrees: ["BTECH", "MTECH"],
      },
    ]);
    setFilteredCourses(courses);
  }, []);

  const handleSearch = (searchParams: SearchParams) => {
    const filtered = courses.filter(
      (course) =>
        (!searchParams.courseCode ||
          course.courseCode
            .toLowerCase()
            .includes(searchParams.courseCode.toLowerCase())) &&
        (!searchParams.branch ||
          course.branches.some((branch) =>
            branch.toLowerCase().includes(searchParams.branch.toLowerCase())
          )) &&
        (!searchParams.batch ||
          course.batches.some((batch) =>
            batch.toString().includes(searchParams.batch)
          )) &&
        (!searchParams.degree ||
          course.degrees.some((degree) =>
            degree.toLowerCase().includes(searchParams.degree.toLowerCase())
          ))
    );
    setFilteredCourses(filtered);
  };

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleAddCourses = () => {
    console.log("Adding courses:", selectedCourses);
    // Implement the logic to add selected courses
  };

  const handleDropCourses = () => {
    console.log("Dropping courses:", selectedCourses);
    // Implement the logic to drop selected courses
  };

  const handleEdit = (course: Course) => {
    console.log("Editing course:", course);
  };

  const handleDelete = (courseId: string) => {
    console.log("Deleting course with ID:", courseId);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        if (selectedView === "students") {
          const res = await axios.get(
            "http://localhost:5000/api/users/students",
            { headers }
          );
          setStudents(res.data);
        } else {
          const res = await axios.get(
            "http://localhost:5000/api/users/faculty-advisors",
            { headers }
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
    <div className="space-y-6">
      {token ? (
        <>
          <StudentDashboard />

          <div className="px-10">
            <SearchBar onSearch={handleSearch} />
          </div>

          <div className="px-10 py-4 flex justify-between">
            <Button
              onClick={handleAddCourses}
              disabled={selectedCourses.length === 0}
            >
              Add Selected Courses
            </Button>
            <Button
              onClick={handleDropCourses}
              disabled={selectedCourses.length === 0}
              variant="destructive"
            >
              Drop Selected Courses
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-10 py-6">
            {filteredCourses.map((course) => (
              <div key={course._id} className="relative">
                <Checkbox
                  id={`course-${course._id}`}
                  checked={selectedCourses.includes(course._id)}
                  onCheckedChange={() => handleCourseSelect(course._id)}
                  className="absolute top-2 right-2 z-10"
                />
                <CourseCard
                  course={course}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>Not Authorized</div>
      )}
    </div>
  );
}
