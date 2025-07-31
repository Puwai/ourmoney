import React from 'react';

export default function Home() {
  const [user, setUser] = React.useState(null);
  const [invoices, setInvoices] = React.useState([]);

  React.useEffect(() => {
    // Check login
    fetch('http://127.0.0.1:8000/api/user/', {
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => setUser(data))
    .catch(() => setUser(null));
  }, []);

  React.useEffect(() => {
    if (!user) return;
    fetch('http://127.0.0.1:8000/api/invoices/', {
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => setInvoices(data));
  }, [user]);

  return (
    <div className="font-sans">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-green-800">OurMoney</div>
          <div>
            {user ? (
              <span className="text-gray-700">Hello, {user.username}</span>
            ) : (
              <a href="http://127.0.0.1:8000/accounts/login/" className="text-gray-700 hover:text-green-600">
                Log In
              </a>
            )}
          </div>
        </div>
      </header>

      <main className="py-8">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-3xl font-bold mb-6">Your Invoices</h1>
          {user ? (
            <div className="grid md:grid-cols-2 gap-6">
              {invoices.map(inv => (
                <div key={inv.id} className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold">{inv.client}</h3>
                  <p className="text-xl font-bold">USD {inv.amount.toFixed(2)}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>Please log in to view your invoices.</p>
          )}
        </div>
      </main>
    </div>
  );
}