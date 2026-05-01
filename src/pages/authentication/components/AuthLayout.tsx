type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <div className="h-screen flex bg-gray-100">
      {/* Left Side */}
      <div className="w-1/2 bg-gradient-to-br from-teal-900 via-teal-800 to-[#0D3A40] flex items-center justify-center text-white">
        <h1 className="text-3xl font-bold">Nama water services</h1>
      </div>

      {/* Right Side */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
