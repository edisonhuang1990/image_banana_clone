export function BananaIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M75 15C75 15 85 25 85 45C85 65 70 85 45 90C20 95 10 80 15 70C20 60 35 55 50 50C65 45 75 35 75 15Z"
        fill="#FFE135"
        stroke="#E5C100"
        strokeWidth="2"
      />
      <path d="M75 15C75 15 70 20 68 25C66 30 65 35 60 40" stroke="#8B7500" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="72" cy="12" rx="5" ry="3" fill="#4A3F00" />
    </svg>
  )
}

export function BananaDecoration({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute pointer-events-none select-none ${className}`}>
      <BananaIcon className="w-16 h-16 opacity-20" />
    </div>
  )
}
