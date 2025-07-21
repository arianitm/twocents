import { useEffect, useState } from "react";

interface PollOption {
  option: string;
  votes: number;
}

interface Poll {
  question: string;
  options: PollOption[];
}

interface PollResultsProps {
  poll: Poll;
}

export default function PollResults({ poll }: PollResultsProps) {
  const [animated, setAnimated] = useState(false);

  const totalVotes = poll.options.reduce((acc, opt) => acc + opt.votes, 0);

  useEffect(() => {
    setAnimated(true);
  }, []);

  return (
    <div className="bg-gray-800 p-4 rounded-lg mt-8">
      <h3 className="text-lg font-semibold mb-4">{poll.question}</h3>
      <div className="space-y-3">
        {poll.options.map((opt, idx) => {
          const percentage = totalVotes ? (opt.votes / totalVotes) * 100 : 0;
          return (
            <div key={idx}>
              <div className="flex justify-between mb-1 text-sm text-gray-300">
                <span>{opt.option}</span>
                <span>{opt.votes} votes</span>
              </div>
              <div className="w-full bg-gray-700 rounded h-4 overflow-hidden">
                <div
                  className="bg-yellow-400 h-4 rounded transition-all duration-1000 ease-out"
                  style={{ width: animated ? `${percentage}%` : "0%" }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
