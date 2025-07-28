import { FaApple, FaAndroid } from "react-icons/fa";
import Image from "next/image";
import FeatureSection from "./FeatureSection";

export default function HeroSection() {
  return (
    <div>
      <section className="text-white py-1 pt-10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl w-full z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              YOUR <br />
              <span className="text-yellow-400">USERNAME</span>
              <br /> IS YOUR <br />
              <span className="text-yellow-400">NET WORTH</span>.
            </h1>
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <div className="flex rounded-full overflow-hidden border border-[#b6650a]">
                <button className="bg-[#b6650a] text-white px-6 py-3 font-semibold flex items-center gap-2 hover:cursor-pointer">
                  <FaApple /> Sign up for iOS
                </button>
                <button className="text-[#cfc6b3] px-6 py-3 font-semibold flex items-center gap-2 hover:bg-[#332007] cursor-pointer">
                  <FaAndroid /> Sign up for Android
                </button>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center bg-transparent border border-[#bfa873] rounded-full overflow-hidden w-full max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="bg-transparent text-[#cfc6b3] placeholder-[#cfc6b3] px-5 py-1 outline-none w-full"
                />
                <button className="bg-[#bfa873] hover:bg-[#cfb15c] p-3 m-3 rounded-full transition">
                  <span className="text-black text-xl">{">"}</span>
                </button>
              </div>
            </div>
          </div>
          <div className="relative z-0 w-full max-w-sm md:max-w-md">
            <Image
              src="/mobile.png"
              alt="twocents preview"
              width={400}
              height={600}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </section>
      <FeatureSection />
    </div>
  );
}
