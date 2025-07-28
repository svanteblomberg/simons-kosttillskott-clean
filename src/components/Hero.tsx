// components/Hero.tsx
export default function Hero() {
  return (
    <header className="relative h-30 md:h-50 flex items-center justify-center overflow-hidden rounded-b-xl mb-8 shadow">
      {/* Bakgrundsbild */}
      <img
        src="/hero-bg.jpg"
        alt="Tränande person"
        className="absolute inset-0 w-full h-full object-cover object-top z-0"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      {/* Innehåll */}
      <div className="relative z-20 flex flex-col items-center text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg tracking-tight">
          Simons Kosttillskott
        </h1>
        <p className="mt-4 text-lg md:text-2xl font-medium drop-shadow">
          För dej med potensproblem – snabbt, säkert och polskt hantverk!
        </p>
      </div>
    </header>
  );
}
