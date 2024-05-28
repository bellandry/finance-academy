import Navbar from "@/components/navbar";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default function Home() {
  const { userId }: { userId: string | null } = auth();
  return (
    <main className="relative flex h-full w-full flex-col" >
      <Navbar userId={userId} />
      <div className="container w-full h-full flex flex-col items-center justify-center">
        <div className=" w-full h-full flex flex-col items-center justify-center py-32 md:py-40">
          <p className="text-xl text-muted-foreground text-center">L&pos;académie des finances personnelles vous présente</p>
          <h1 className="text-6xl md:text-6xl font-bold bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent w-fit text-center">Je suis mon budget</h1>
          <p className="text-xl text-muted-foreground my-6 md:w-3/5 text-center">Prenez le pouvoir sur vos finances, enregistrez, trackez et optimisez vos finance avec notre application de suivi automatisé</p>
          <Link href="/sign-up" className="font-semibold rounded-xl ring-1 bg-orange-600 py-4 px-8 text-white hover:ring-orange-600 hover:bg-background transition-all hover:text-orange-700">
            Commencer
          </Link>
        </div>
        <div className="w-full aspect-square md:w-4/5 md:aspect-video bg-demo-light shadow-md shadow-gray-400 mb-14 dark:bg-demo-dark bg-center bg-cover rounded-md" />
      </div>
    </main>
  );
}
