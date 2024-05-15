import Image from "next/image";

const AuthLayout = (
  {
    children
  }: {
    children: React.ReactNode
  }
) => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="relative w-full h-full md:w-1/2 hidden md:block">
      <Image
            fill
            className="object-cover"
            alt="login & signin image"
            src="https://images.unsplash.com/photo-1541178735493-479c1a27ed24?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;