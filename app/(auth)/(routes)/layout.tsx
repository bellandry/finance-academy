import Logo from "@/components/logo";
import Image from "next/image";

const AuthLayout = (
  {
    children
  }: {
    children: React.ReactNode
  }
) => {
  return (
    <div className="h-screen flex items-center justify-center py-4">
      <div className="w-full h-screen md:w-1/2 md:block fixed top-0 bottom-0 left-0">
        <Image
          fill objectFit="cover"
          alt="login & signin image"
          src="https://images.unsplash.com/photo-1633158829556-6ea20ad39b4f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </div>
      <div className=" md:block md:w-1/2">
        <div className="absolute m-4 z-10 top-4 left-3">
          <Logo />
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center flex-col">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;