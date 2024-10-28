import Image from "next/image";
import logo from "@/app/logo.svg";
import { DarkThemeToggle } from "flowbite-react";
import Link from "next/link";

export const Header = () => (
  <header className="w-full h-16 md:h-20 p-4 flex justify-between items-center">
    <Link href="/">
      <Image src={logo} alt="Taller" className="dark:invert" priority />
    </Link>

    <DarkThemeToggle className="ml-auto mr-2" />
    <Link href="/">
      <h2 className="text-xl md:text-2xl font-bold text-gray-700 dark:text-white">
        Dashboard
      </h2>
    </Link>
  </header>
);
