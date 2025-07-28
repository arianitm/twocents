"use client";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaSquareXTwitter } from "react-icons/fa6";

export default function Header({}) {
  const router = useRouter();
  const redirectHome = () => router.push("/");

  return (
    <div className="flex justify-center px-4 py-8">
      <header className="fixed w-full max-w-6xl bg-transparent backdrop-blur-md border border-[#795910] z-50 text-white px-4 sm:px-6 py-3 rounded-full shadow-md flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={redirectHome}
        >
          <Image src="/logo.png" alt="twocents" width={32} height={32} />
          <span className="font-bold text-white text-lg sm:text-xl">
            twocents
          </span>
        </div>
        <div>
          <a
            href="https://x.com/twocentinc"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit TwoCents on X"
          >
            <FaSquareXTwitter
              size={28}
              className="text-white hover:text-yellow-400 transition-colors duration-200"
            />
          </a>
        </div>
      </header>
    </div>
  );
}
