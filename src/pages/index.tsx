// 📦 IMPORTER & TYPER
import { useEffect, useState } from 'react';
import Hero from '../components/Hero';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

// 🚀 HUVUDFUNKTION
export default function Home() {
  // 🧠 STATE
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: 'Vassleprotein',
      price: 299,
      description: 'Rent och svensktillverkat proteinpulver.',
      image: '/protein.jpg',
    },
    {
      id: 2,
      name: 'Magnesium Plus',
      price: 149,
      description: 'För bättre sömn och muskelåterhämtning.',
      image: '/magnesium.jpg',
    },
    // Fler produkter? Lägg till här!
  ]);

  // 💾 Spara/hämta kundvagn i localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // ➕ Lägg till produkt
  const addToCart = (product: Product) => {
    setCart(prev => {
      const found = prev.find(i => i.product.id === product.id);
      if (found) {
        return prev.map(i =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      } else {
        return [...prev, { product, quantity: 1 }];
      }
    });
  };

  // ➖ Kvantitet
  const increaseQuantity = (productId: number) => {
    setCart(prev =>
      prev.map(i =>
        i.product.id === productId
          ? { ...i, quantity: i.quantity + 1 }
          : i
      )
    );
  };
  const decreaseQuantity = (productId: number) => {
    setCart(prev =>
      prev
        .map(i =>
          i.product.id === productId
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
        .filter(i => i.quantity > 0)
    );
  };

  // 🧮 Summa & antal
  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  // 🖼️ UI
  return (
    <>
      <Hero />
      <div className="relative p-6 max-w-5xl mx-auto">
        {/* 🧭 VARUKORGS-KNAPP */}
        <div className="flex justify-end items-center mb-6">
          <button
            onClick={() => setCartOpen(!cartOpen)}
            className="relative text-2xl"
            aria-label="Öppna kundvagn"
          >
            🛒
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs rounded-full px-2">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* 🧺 DROPDOWN-KUNDVAGN */}
        {cartOpen && (
          <div className="absolute right-6 top-20 w-80 bg-white border shadow-xl rounded-xl p-4 z-50">
            <h2 className="text-lg font-bold mb-2">Din varukorg</h2>
            {cart.length === 0 ? (
              <p>Varukorgen är tom.</p>
            ) : (
              <ul className="space-y-2">
                {cart.map(item => (
                  <li key={item.product.id} className="flex justify-between items-center">
                    <span className="text-sm w-1/2">{item.product.name}</span>
                    <div className="flex items-center space-x-2">
                      <button
                        className="px-2 bg-gray-200 rounded"
                        onClick={() => decreaseQuantity(item.product.id)}
                        aria-label="Minska antal"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="px-2 bg-gray-200 rounded"
                        onClick={() => increaseQuantity(item.product.id)}
                        aria-label="Öka antal"
                      >
                        +
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {cart.length > 0 && (
              <div className="mt-4">
                <p className="font-semibold">Totalt: {totalPrice} kr</p>
                <a
                  href="/checkout"
                  className="block text-center mt-2 bg-green-600 text-white rounded-lg py-2 hover:bg-green-700"
                >
                  Till kassan
                </a>
              </div>
            )}
          </div>
        )}

        {/* 🛍️ PRODUKTER */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Utvalda produkter</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map(product => (
              <div key={product.id} className="rounded-2xl shadow-md border p-4 bg-white">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.description}</p>
                <p className="text-lg font-bold mt-2">{product.price} kr</p>
                <button
                  className="mt-4 w-full bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition"
                  onClick={() => addToCart(product)}
                >
                  Lägg i varukorg
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
