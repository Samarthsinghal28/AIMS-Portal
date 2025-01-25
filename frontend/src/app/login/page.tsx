import { LoginForm } from "@/components/login-form";
export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center gap-2 self-center font-medium">
          <div className="flex flex-col items-center justify-center rounded-md">
            <img src="iitrpr_logo.jpg" className="h-28 w-24 m-2"></img>
            <div className="text-center text-lg font-sans font-bold">
              Academic Information Management System
              <br />
              Indian Institute of Technology, Ropar
            </div>
          </div>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
