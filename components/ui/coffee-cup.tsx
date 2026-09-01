import { cn } from "@/lib/utils";

type LoaderProps = {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
};

export function CoffeeCup({ size = "lg", className = "" }: LoaderProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };
  const containerSize = sizeClasses[size] || sizeClasses.md;
  return (
    <div
      className={cn(
        "relative flex items-center justify-center",
        containerSize,
        "text-primary",
        className,
      )}
    >
      <style>{`
        @keyframes steam {
          0% { transform: translateY(0) translateX(0) scaleX(1); opacity: 0; }
          30% { opacity: 0.9; }
          100% { transform: translateY(-200%) translateX(45%) scaleX(1.4); opacity: 0; }
        }
      `}</style>
      <div
        className="absolute flex gap-[10%]"
        style={{ bottom: "56%", width: "42%", height: "16%" }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-[16%] h-full rounded-full bg-current"
            style={{
              animation: `steam ${1.6 + i * 0.3}s ease-in-out infinite`,
              animationDelay: `${i * 0.45}s`,
              marginTop: i === 1 ? "-24%" : 0,
            }}
          />
        ))}
      </div>
      <div className="relative" style={{ width: "58%", height: "40%" }}>
        <div
          className="absolute bottom-0 rounded-b-md border-[3px] border-current"
          style={{
            left: "6%",
            width: "70%",
            height: "100%",
            borderTop: "none",
          }}
        />
        <div
          className="absolute bottom-[12%] rounded-r-full border-[3px] border-current"
          style={{ right: "0%", width: "24%", height: "26%" }}
        />
        <div
          className="absolute bottom-0 bg-current opacity-35"
          style={{
            left: "6%",
            width: "70%",
            height: "16%",
            borderRadius: "0 0 5px 5px",
          }}
        />
      </div>
    </div>
  );
}
