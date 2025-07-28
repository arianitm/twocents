import { FaEyeSlash, FaTrophy } from "react-icons/fa";
import { BsCloudCheck } from "react-icons/bs";

const features = [
  {
    Icon: FaEyeSlash,
    title: "Anonymous",
    description:
      "No email, name, phone number, or password required to create an account.",
  },
  {
    Icon: BsCloudCheck,
    title: "Verified",
    description:
      "Connect brokerages, bank accounts and crypto wallets to sum up your net worth.",
  },
  {
    Icon: FaTrophy,
    title: "Leaderboards",
    description:
      "Compare yourself to others with the same age, gender, location, and more.",
  },
];

export default function FeatureSection() {
  return (
    <section className="relative z-10 bg-[#2e1e04] py-12 text-center text-neutral-200 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#3b2c12] via-[#7a5316] to-[#3b2c12] shadow-[0_0_5px_#f8b133] z-10" />
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#3b2c12] via-[#7a5316] to-[#3b2c12] shadow-[0_0_5px_#f8b133] z-10" />
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
        {features.map(({ Icon, title, description }, i) => (
          <div key={i} className="flex flex-col items-center text-center">
            <Icon className="text-[64px] text-[#f8da8c] mb-4" />
            <h3 className="text-xl font-extrabold text-[#f8da8c]">{title}</h3>
            <p className="text-base text-[#e0c68b] max-w-xs mt-2">
              {description}
            </p>
          </div>
        ))}
      </div>

      <h2 className="text-[48px] md:text-[64px] font-extrabold text-[#4a3922] mt-16 tracking-tight">
        THE PEOPLE HAVE SPOKEN.
      </h2>
    </section>
  );
}
