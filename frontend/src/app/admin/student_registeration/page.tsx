import { Dashboard } from "@/components/dashboard";
import { StudentRegister } from "@/components/student-register";

export default function StudReg() {
  return (
    <div className="">
      <Dashboard title="Student Registration">
        <div className="text-center mb-8">
          {/* Page Title and Intro */}
          <h1 className="text-3xl font-bold mb-4">Enter Student Details</h1>
        </div>

        {/* Form Section */}
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
          <StudentRegister />
        </div>
      </Dashboard>
    </div>
  );
}
