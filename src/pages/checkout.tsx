import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface CartItem {
  product: {
    id: string;
    name: string;
    price: number;
  };
  quantity: number;
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const router = useRouter();

  // Hämta kundvagn från localStorage vid mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const totalPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Skapa unikt ordernummer
  function generateOrderNumber() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  // Hantera form submit
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // (Valfritt: spara orderinfo/orderhistorik)
    const orderNum = generateOrderNumber();

    // (Valfritt: Skicka orderinfo till API här)

    // Navigera till tack-sida med ordernummer i query
    router.push(`/tack?order=${orderNum}`);
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Kassa</h1>
      <p className="text-gray-700">Tack för att du handlar hos Simons Kosttillskott! 🛍️</p>

      <section className="border rounded-xl p-4 bg-gray-50">
        <h2 className="text-xl font-semibold mb-2">Din order</h2>
        {cart.length === 0 ? (
          <p>Din varukorg är tom.</p>
        ) : (
          <ul className="divide-y">
            {cart.map((item) => (
              <li key={item.product.id} className="py-2 flex justify-between">
                <span>{item.product.name} x {item.quantity}</span>
                <span>{item.product.price * item.quantity} kr</span>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-4 font-bold text-right">Totalt: {totalPrice} kr</p>
      </section>

      <form className="space-y-4 border rounded-xl p-4" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1 font-medium" htmlFor="name">Fullständigt namn</label>
          <input
            id="name"
            type="text"
            className="w-full border rounded-lg p-2"
            required
            value={name}
            onChange={e => setName(e.target.value)}
            autoComplete="name"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="email">E-postadress</label>
          <input
            id="email"
            type="email"
            className="w-full border rounded-lg p-2"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="address">Adress</label>
          <input
            id="address"
            type="text"
            className="w-full border rounded-lg p-2"
            required
            value={address}
            onChange={e => setAddress(e.target.value)}
            autoComplete="street-address"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Slutför köp
        </button>
      </form>
    </div>
  );
}
