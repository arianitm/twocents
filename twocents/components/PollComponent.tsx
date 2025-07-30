import { useEffect, useState } from "react";

interface PollOption {
  option: string;
  votes: number;
  average_balance: number;
}

interface PollProps {
  pollOptions: PollOption[];
}

export default function PollComponent({ pollOptions }: PollProps) {
  const totalVotes = pollOptions.reduce((acc, o) => acc + o.votes, 0);

  return (
    <section className="mb-10 border border-gray-800 rounded-xl p-4">
      <h2 className="text-lg font-semibold mb-4 text-white">Poll</h2>
      {pollOptions.map((opt, idx) => (
        <PollOptionRow key={idx} opt={opt} totalVotes={totalVotes} />
      ))}
    </section>
  );
}

function PollOptionRow({
  opt,
  totalVotes,
}: {
  opt: PollOption;
  totalVotes: number;
}) {
  const percent = totalVotes > 0 ? (opt.votes / totalVotes) * 100 : 0;
  const [animatePercent, setAnimatePercent] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatePercent(percent);
    }, 100);
    return () => clearTimeout(timeout);
  }, [percent]);

  return (
    <div className="mb-4 relative">
      <div className="flex justify-between items-center mb-1 text-sm font-medium">
        <span className="text-white">{opt.option}</span>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-white border border-gray-500 px-3 py-1 rounded-full text-sm font-semibold">
            <span className="text-gray-300">$</span>
            {Math.round(opt.average_balance).toLocaleString()}
          </div>
        </div>
      </div>

      <div className="relative w-full h-10 rounded-xl bg-gray-800 overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-[#f4a557] rounded-xl transition-all duration-1000 ease-out"
          style={{ width: `${animatePercent}%` }}
        ></div>
        <div className="relative z-10 h-full px-4 flex items-center justify-between text-sm font-semibold text-white">
          <span>{opt.option}</span>
          <span>{Math.round(percent)}%</span>
        </div>
      </div>
    </div>
  );
}
