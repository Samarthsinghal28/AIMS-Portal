const components: { title: string; href: string; description?: string }[] = [
  { title: "Courses", href: "/courses" },
  { title: "Student Record", href: "/student-record" },
  { title: "Help", href: "/help" },
];

export function Dashboard() {
  return (
    <div>
      {/* Admin Dashboard Header */}

      {/* Navigation Menu */}
      <nav className="flex align-middle bg-primary text-white overflow-hidden">
        <p className="self-center text-2xl font-bold mx-2">Admin Dashboard</p>
        <ul className="list-none m-0 p-0 flex">
          {/* Dynamic Components */}
          {components.map((component) => (
            <li key={component.href} className="float-left">
              <a
                href={component.href}
                className="block  text-center px-4 py-3 no-underline hover:bg-secondary "
              >
                {component.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
