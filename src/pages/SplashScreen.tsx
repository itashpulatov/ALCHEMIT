import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let value = 0;
    const interval = setInterval(() => {
      value += 2;
      if (value >= 100) {
        value = 100;
        clearInterval(interval);
      }
      setProgress(value);
    }, 40);

    return () => clearInterval(interval);
  }, []);

  if (progress >= 100) return null;

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-[9999]">
      <div className="relative flex flex-col items-center w-40 h-40">
        {/* Aylana to'lib boradigan loader */}
        <svg
          className="w-40 h-40 transform -rotate-90"
          style={{ overflow: "visible" }}
        >
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="#000"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.1s linear" }}
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <img src="/public/images/logo.svg" alt="logo" className="w-16 h-16" />
        </div>
      </div>

      <div className="absolute bottom-[35%] flex justify-center">
        <h1
          className="text-3xl font-bold tracking-wide"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          ALCHEMIT
        </h1>
      </div>
    </div>
  );
}
