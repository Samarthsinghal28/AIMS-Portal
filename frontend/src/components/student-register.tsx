"use client";

import * as React from "react";
import { z } from "zod";
import axios from 'axios';
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
} from "@radix-ui/react-icons";

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
  facultyAdvisor: z.string().nonempty({ message: "Please select a faculty advisor." }),
});

type FormData = z.infer<typeof formSchema>;

export function StudentRegister() {
  const [facultyAdvisors, setFacultyAdvisors] = React.useState<{ _id: string; name: string; email: string; }[]>([]);

  // Fetch faculty advisors from the backend
  React.useEffect(() => {
    const fetchFacultyAdvisors = async () => {
      try {
        console.log("Fetching faculty advisors...");
        const res = await axios.get('http://localhost:5000/api/users/faculty-advisors');
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
      const postData = { ...data, role: 'student' };
      const res = await axios.post('http://localhost:5000/api/users/register', postData);
      console.log("Student registered successfully:", res.data);
      // Show success message or handle success as needed
      alert('Student registered successfully.');
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter student's name" {...field} />
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
                <Input type="email" placeholder="Enter student's email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Batch */}
        <FormField
          control={form.control}
          name="batch"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Batch</FormLabel>
              <FormControl>
                <Select.Root value={field.value} onValueChange={field.onChange}>
                  <Select.Trigger className="SelectTrigger">
                    <Select.Value placeholder="Select batch" />
                    <Select.Icon className="SelectIcon">
                      <ChevronDownIcon />
                    </Select.Icon>
                  </Select.Trigger>
                  <Select.Content className="SelectContent">
                    <Select.Viewport className="SelectViewport">
                      {batches.map((batch) => (
                        <SelectItem key={batch.toString()} value={batch.toString()}>
                          {batch}
                        </SelectItem>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Root>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Branch */}
        <FormField
          control={form.control}
          name="branch"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Branch</FormLabel>
              <FormControl>
                <Select.Root value={field.value} onValueChange={field.onChange}>
                  <Select.Trigger className="SelectTrigger">
                    <Select.Value placeholder="Select branch" />
                    <Select.Icon className="SelectIcon">
                      <ChevronDownIcon />
                    </Select.Icon>
                  </Select.Trigger>
                  <Select.Content className="SelectContent">
                    <Select.Viewport className="SelectViewport">
                      {branches.map((branch) => (
                        <SelectItem key={branch} value={branch}>
                          {branch}
                        </SelectItem>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Root>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Degree */}
        <FormField
          control={form.control}
          name="degree"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Degree</FormLabel>
              <FormControl>
                <Select.Root value={field.value} onValueChange={field.onChange}>
                  <Select.Trigger className="SelectTrigger">
                    <Select.Value placeholder="Select degree" />
                    <Select.Icon className="SelectIcon">
                      <ChevronDownIcon />
                    </Select.Icon>
                  </Select.Trigger>
                  <Select.Content className="SelectContent">
                    <Select.Viewport className="SelectViewport">
                      {degrees.map((degree) => (
                        <SelectItem key={degree} value={degree}>
                          {degree}
                        </SelectItem>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Root>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Faculty Advisor */}
        <FormField
          control={form.control}
          name="facultyAdvisor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Faculty Advisor</FormLabel>
              <FormControl>
                <Select.Root value={field.value} onValueChange={field.onChange}>
                  <Select.Trigger className="SelectTrigger">
                    <Select.Value placeholder="Select faculty advisor" />
                    <Select.Icon className="SelectIcon">
                      <ChevronDownIcon />
                    </Select.Icon>
                  </Select.Trigger>
                  <Select.Content className="SelectContent">
                    <Select.Viewport className="SelectViewport">
                      {facultyAdvisors.map((advisor) => (
                        <SelectItem key={advisor._id} value={advisor._id}>
                          {advisor.name} ({advisor.email})
                        </SelectItem>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Root>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Register Student</Button>
      </form>
    </Form>
  );
}

// SelectItem component for Radix UI Select
const SelectItem = React.forwardRef(
  (
    { children, className, ...props }: React.ComponentPropsWithoutRef<typeof Select.Item>,
    forwardedRef: React.Ref<HTMLDivElement>
  ) => {
    return (
      <Select.Item
        className={classnames("SelectItem", className)}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="SelectItemIndicator">
          <CheckIcon />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

SelectItem.displayName = "SelectItem";