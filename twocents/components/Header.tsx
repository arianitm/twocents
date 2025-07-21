import Home from "@/pages/Home";
import Image from "next/image";
import { useRouter } from "next/router";

interface HeaderProps {
  activeFilter?: string;
  onFilterClick?: (filter: string) => void;
  showFilter?: boolean;
}

export default function Header({
  activeFilter,
  onFilterClick,
  showFilter,
}: HeaderProps) {
  const router = useRouter();

  const redirectHome = () => {
    router.push("/");
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 border-b border-gray-700 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={redirectHome}
        >
          <Image
            className=""
            src="/logo.png"
            alt="twocents"
            width={32}
            height={32}
          />

          <span className="font-bold text-yellow-400 text-lg select-none">
            twocents
          </span>
        </div>

        {showFilter && (
          <div className="flex space-x-6 text-sm font-semibold ">
            <button
              onClick={() => onFilterClick?.("topToday")}
              className={
                activeFilter === "topToday"
                  ? "text-yellow-400 cursor-pointer"
                  : "text-gray-400 hover:text-yellow-400 cursor-pointer"
              }
            >
              Top Today
            </button>
            <button
              onClick={() => onFilterClick?.("newToday")}
              className={
                activeFilter === "newToday"
                  ? "text-yellow-400 cursor-pointer"
                  : "text-gray-400 hover:text-yellow-400 cursor-pointer"
              }
            >
              New Today
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
