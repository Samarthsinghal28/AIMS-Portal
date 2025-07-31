export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <h1 className="text-3xl font-bold">Login</h1>
      <form className="mt-8 space-y-6">
        <input type="email" placeholder="Email" className="w-full p-2 rounded bg-gray-800 text-white" />
        <input type="password" placeholder="Password" className="w-full p-2 rounded bg-gray-800 text-white" />
        <button type="submit" className="w-full p-2 rounded bg-blue-500 hover:bg-blue-700">Sign In</button>
      </form>
    </div>
  );
}
