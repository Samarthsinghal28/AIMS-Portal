"use client";
import { useRouter } from "next/navigation"; // If you're using Next.js

const components: { title: string; href: string; description?: string }[] = [
  { title: "Dashboard", href: "/student" },
  { title: "Course Add/Drop", href: "/student/course_add_drop" },
];

export function StudentDashboard() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear localStorage
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div>
      {/* Admin Dashboard Header */}

      {/* Navigation Menu */}
      <nav className="flex items-center bg-primary text-white">
        <p className="text-2xl font-bold mx-4">AIMS-IITRPR</p>
        <ul className="flex flex-row">
          {/* Dynamic Components */}
          {components.map((component) => (
            <li key={component.href}>
              <a
                href={component.href}
                className="block text-center px-4 py-3 no-underline hover:bg-secondary"
              >
                {component.title}
              </a>
            </li>
          ))}
        </ul>
        <div className="ml-auto">
          <a
            href="/login"
            className="block text-center px-4 py-3 no-underline hover:bg-secondary"
          >
            Logout
          </a>
        </div>
      </nav>
    </div>
  );
}
