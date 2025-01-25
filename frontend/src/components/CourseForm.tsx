"use client";

import * as React from "react";
import { z } from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

// Define constants for options
const departments = ["CSE", "EE", "Civil"];
const degrees = ["BTech", "MTech"];
const batches = ["2022", "2023", "2024"];

// Define the form schema using Zod
const formSchema = z.object({
  courseName: z.string().min(2, { message: "Course name must be at least 2 characters." }),
  courseCode: z.string().min(2, { message: "Course code must be at least 2 characters." }),
  department: z.array(z.string()).nonempty({ message: "Please select at least one department." }),
  degree: z.array(z.string()).nonempty({ message: "Please select at least one degree." }),
  batch: z.array(z.string()).nonempty({ message: "Please select at least one batch." }),
  credits: z.number().min(1, { message: "Credits must be at least 1." }),
});

type FormData = z.infer<typeof formSchema>;

export function AddCourse() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseName: "",
      courseCode: "",
      department: [],
      degree: [],
      batch: [],
      credits: 3,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await axios.post("http://localhost:5000/api/courses/add", data);
      console.log("Course added successfully:", res.data);
      alert("Course added successfully.");
      form.reset();
    } catch (err: any) {
      console.error("Error adding course:", err);
      alert(err.response?.data?.message || "Failed to add course.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Course Name */}
        <FormField
          control={form.control}
          name="courseName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Name</FormLabel>
              <FormControl>
                <Input placeholder="Course Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Course Code */}
        <FormField
          control={form.control}
          name="courseCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Code</FormLabel>
              <FormControl>
                <Input placeholder="Course Code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Department */}
        <FormItem>
          <FormLabel>Department</FormLabel>
          <div className="space-y-2">
            {departments.map((dept) => (
              <div key={dept} className="flex items-center space-x-2">
                <Checkbox
                  checked={form.watch("department").includes(dept)}
                  onCheckedChange={(checked) =>
                    form.setValue(
                      "department",
                      checked
                        ? [...form.watch("department"), dept]
                        : form.watch("department").filter((d) => d !== dept)
                    )
                  }
                />
                <span>{dept}</span>
              </div>
            ))}
          </div>
        </FormItem>

        {/* Degree */}
        <FormItem>
          <FormLabel>Degree</FormLabel>
          <div className="space-y-2">
            {degrees.map((deg) => (
              <div key={deg} className="flex items-center space-x-2">
                <Checkbox
                  checked={form.watch("degree").includes(deg)}
                  onCheckedChange={(checked) =>
                    form.setValue(
                      "degree",
                      checked
                        ? [...form.watch("degree"), deg]
                        : form.watch("degree").filter((d) => d !== deg)
                    )
                  }
                />
                <span>{deg}</span>
              </div>
            ))}
          </div>
        </FormItem>

        {/* Batch */}
        <FormItem>
          <FormLabel>Batch</FormLabel>
          <div className="space-y-2">
            {batches.map((batch) => (
              <div key={batch} className="flex items-center space-x-2">
                <Checkbox
                  checked={form.watch("batch").includes(batch)}
                  onCheckedChange={(checked) =>
                    form.setValue(
                      "batch",
                      checked
                        ? [...form.watch("batch"), batch]
                        : form.watch("batch").filter((b) => b !== batch)
                    )
                  }
                />
                <span>{batch}</span>
              </div>
            ))}
          </div>
        </FormItem>

        {/* Credits */}
        <FormField
          control={form.control}
          name="credits"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Credits</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Credits" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Add Course</Button>
      </form>
    </Form>
  );
}
