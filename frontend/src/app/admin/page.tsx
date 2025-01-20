"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Dashboard } from "@/components/dashboard";

export default function Admin() {
  const router = useRouter();

  return (
    <Dashboard>
      <div className="flex flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
        {/* Admin Dashboard Heading */}
        <div className="text-2xl font-bold text-center mb-6">
          Admin Dashboard
        </div>

        {/* Registration Buttons */}
        <div className="flex w-full max-w-sm flex-col gap-6">
          {/* Navigate to Student Registration */}
          <Button onClick={() => router.push("/admin/student_registeration")}>
            Student Register
          </Button>

          {/* Navigate to Faculty Registration */}
          <Button onClick={() => router.push("/admin/faculty_registeration")}>
            Faculty Register
          </Button>
        </div>
      </div>
    </Dashboard>
  );
}
