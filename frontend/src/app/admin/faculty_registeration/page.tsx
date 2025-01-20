import { Dashboard } from "@/components/dashboard";
import { FacultyRegister } from "@/components/faculty-register";

export default function FacReg() {
  return (
    <div className="">
      <Dashboard title="Faculty Registration">
        <div className="text-center mb-8">
          {/* Page Title and Intro */}
          <h1 className="text-3xl font-bold mb-4">Enter Faculty Details</h1>
        </div>

        {/* Form Section */}
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
          <FacultyRegister />
        </div>
      </Dashboard>
    </div>
  );
}
