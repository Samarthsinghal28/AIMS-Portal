import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-black text-white p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center gap-2 self-center font-medium">
          <div className="flex flex-col items-center justify-center rounded-md">
            <img src="iitrpr_logo.png" alt="IIT Ropar Logo" className="h-20 w-20" />
            <h1 className="text-2xl">IIT Ropar</h1>
          </div>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}