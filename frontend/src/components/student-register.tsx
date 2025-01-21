"use client";

import * as React from "react";
import { z } from "zod";
import axios from "axios";
import classnames from "classnames";
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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Define constants for options
const branches = ["CSE", "EE", "Civil"];
const degrees = ["BTECH", "MTECH"];
const batches = [2022, 2023, 2024]; // Adjust as needed

// Define the form schema using Zod
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Enter a valid email." }),
  batch: z.string().nonempty({ message: "Please select a batch." }),
  branch: z.string().nonempty({ message: "Please select a branch." }),
  degree: z.string().nonempty({ message: "Please select a degree." }),
  facultyAdvisor: z
    .string()
    .nonempty({ message: "Please select a faculty advisor." }),
});

type FormData = z.infer<typeof formSchema>;

export function StudentRegister() {
  const [facultyAdvisors, setFacultyAdvisors] = React.useState<
    { _id: string; name: string; email: string }[]
  >([]);

  // Fetch faculty advisors from the backend
  React.useEffect(() => {
    const fetchFacultyAdvisors = async () => {
      try {
        console.log("Fetching faculty advisors...");
        const res = await axios.get(
          "http://localhost:5000/api/users/faculty-advisors"
        );
        console.log("Faculty advisors fetched successfully:", res.data);
        setFacultyAdvisors(res.data);
      } catch (err) {
        console.error("Error fetching faculty advisors:", err);
        // Handle error if necessary
      }
    };

    fetchFacultyAdvisors();
  }, []);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      batch: "",
      branch: "",
      degree: "",
      facultyAdvisor: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Add the 'role' field as 'student'
      const postData = { ...data, role: "student" };
      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        postData
      );
      console.log("Student registered successfully:", res.data);
      // Show success message or handle success as needed
      alert("Student registered successfully.");
      // Reset the form
      form.reset();
    } catch (err: any) {
      console.error("Error registering student:", err);
      // Handle error as needed
      alert(err.response?.data?.message || "Failed to register student.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="johndoe@gmail.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Batch */}
        <FormItem>
          <FormLabel>Batch</FormLabel>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Batch" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="2021">2021</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormItem>

        {/* Branch */}
        <FormItem>
          <FormLabel>Branch</FormLabel>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Branch" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="CSE">CSE</SelectItem>
                <SelectItem value="EE">EE</SelectItem>
                <SelectItem value="CIVIL">CIVIL</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormItem>

        {/* Degree */}
        <FormItem>
          <FormLabel>Degree</FormLabel>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Degree Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="CSE">CSE</SelectItem>
                <SelectItem value="EE">EE</SelectItem>
                <SelectItem value="CIVIL">CIVIL</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormItem>

        {/* Faculty Advisor */}
        <FormItem>
          <FormLabel>Faculty Advisor</FormLabel>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Respective Advisor" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Puneet Goyal">Puneet Goyal</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormItem>

        <Button type="submit">Register Student</Button>
      </form>
    </Form>
  );
}

// SelectItem component for Radix UI Select
// const SelectItem = React.forwardRef(
//   (
//     {
//       children,
//       className,
//       ...props
//     }: React.ComponentPropsWithoutRef<typeof Select.Item>,
//     forwardedRef: React.Ref<HTMLDivElement>
//   ) => {
//     return (
//       <Select.Item
//         className={classnames("SelectItem", className)}
//         {...props}
//         ref={forwardedRef}
//       >
//         <Select.ItemText>{children}</Select.ItemText>
//         <Select.ItemIndicator className="SelectItemIndicator">
//           <CheckIcon />
//         </Select.ItemIndicator>
//       </Select.Item>
//     );
//   }
// );

// SelectItem.displayName = "SelectItem";
