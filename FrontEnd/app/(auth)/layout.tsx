import Image from "next/image";
import Link from "next/link";

const Auth = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center bg-[#F8F8F8] overflow-hidden py-10">
      {/* Background patterns */}
      <div className="bg-primary/10 absolute bottom-0 -left-90 -z-10 size-105 rounded-full md:-left-85 lg:-left-80 z-0" />
      <div className="bg-primary/10 absolute top-0 -right-90 -z-10 size-105 rounded-full md:-right-85 lg:-right-80 z-0" />
      
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4 md:px-10">
        <Link href="/">
          <Image src="/logo.svg" alt="BoroBazar" width={150} height={40} className="h-8 w-auto md:h-10" />
        </Link>
        <div className="flex gap-4">
          <Link href="/login" className="rounded-full border border-gray-300 bg-white px-6 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 uppercase">
            Login
          </Link>
          <Link href="/register" className="rounded-full border border-gray-300 bg-white px-6 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 uppercase">
            Sign Up
          </Link>
        </div>
      </div>

      <div className="z-10 flex w-full items-center justify-center">
        {children}
      </div>
    </section>
  );
};

export default Auth;

