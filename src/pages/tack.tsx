import { useEffect } from "react";
import { useRouter } from "next/router";

export default function TackSida() {
  const router = useRouter();
  const ordernummer = router.query.order;

  useEffect(() => {
    // Rensa varukorg
    localStorage.removeItem("cart");
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center max-w-md w-full">
        {/* Checkmark/ikon */}
        <div className="text-green-500 text-6xl mb-4">
          {/* Emoji eller SVG */}
          ✔️
        </div>
        <h1 className="text-2xl font-bold mb-2 text-center">
          Tack för din beställning!
        </h1>
        {ordernummer && (
          <p className="text-lg text-gray-700 mb-3">
            <span className="font-semibold">Ordernummer:</span>{" "}
            <span className="font-mono">#{ordernummer}</span>
          </p>
        )}
        <p className="text-gray-600 text-center mb-8">
          Du får ett bekräftelsemail så snart vi mottagit din order.<br />
          Vi packar och skickar din beställning så snart den finns på lager.<br />
          Har du frågor? Hör gärna av dig!
        </p>
        <button
          onClick={() => router.push("/")}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl px-6 py-3 transition-all shadow w-full max-w-xs"
        >
          Tillbaka till startsidan
        </button>
      </div>
    </main>
  );
}
