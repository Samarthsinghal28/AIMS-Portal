const components: { title: string; href: string; description?: string }[] = [
  { title: "Dashboard", href: "/admin" },
  { title: "Student Registeration", href: "/admin/student_registeration" },
  { title: "Faculty Registeration", href: "/admin/faculty_registeration" },
];

export function AdminDashboard() {
  return (
    <div>
      {/* Admin Dashboard Header */}

      {/* Navigation Menu */}
      <nav className="flex align-middle bg-primary text-white overflow-hidden">
        <p className="self-center text-2xl font-bold mx-4 ">AIMS-IITRPR</p>
        <ul className=" flex justify-end">
          {/* Dynamic Components */}
          {components.map((component) => (
            <div className="">
              <li key={component.href} className="float-left">
                <a
                  href={component.href}
                  className="block text-center px-4 py-3 no-underline hover:bg-secondary"
                >
                  {component.title}
                </a>
              </li>
            </div>
          ))}
          <div className="">
            <li key="/login" className="ml-auto">
              <a
                href="/login"
                className="block text-center px-4 py-3 no-underline hover:bg-secondary "
              >
                Logout
              </a>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
}
