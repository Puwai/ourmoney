import React from 'react';

export default function Home() {
  const [invoices, setInvoices] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('http://127.0.0.1:8000/api/invoices/')
      .then(res => res.json())
      .then(data => {
        setInvoices(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch invoices:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-green-800">OurMoney</div>
          <div>
            <a href="/login" className="text-gray-700 hover:text-green-600 mr-6">Your account</a>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg">Get started for free</button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="bg-gray-50 py-16 text-center">
          <div className="max-w-4xl mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Simple money management for African entrepreneurs
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Manage your money like a boss. Create invoices, accept payments, and make accounting easy — all in one place.
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg">
              Get started for free
            </button>
          </div>
        </section>

        {/* Features */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-green-800 font-bold">📊</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">No sweat accounting</h3>
              <p className="text-gray-600">Track income, expenses, and cash flow with ease.</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-green-800 font-bold">🧾</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy invoicing</h3>
              <p className="text-gray-600">Create beautiful invoices in seconds.</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-green-800 font-bold">💳</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure payments</h3>
              <p className="text-gray-600">Accept cards, bank transfers, mobile money.</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-green-800 font-bold">👥</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Payroll made easy</h3>
              <p className="text-gray-600">Pay your team with confidence.</p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-12">Trusted by African entrepreneurs</h2>
            <div className="space-y-8">
              <blockquote className="text-gray-700 text-lg">
                “OurMoney makes your life a whole lot easier. I've tried others — this one just gets it.”
                <footer className="mt-4 font-semibold">— Tatiyanna, TruCreates.com</footer>
              </blockquote>
            </div>
          </div>
        </section>

        {/* Live Invoices */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8">Your Recent Invoices</h2>
            {loading ? (
              <p className="text-gray-600">Loading invoices...</p>
            ) : invoices.length === 0 ? (
              <p className="text-gray-600">No invoices yet. Create one in the admin.</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {invoices.map(inv => (
                  <div key={inv.id} className="bg-white p-6 rounded-lg shadow border border-gray-200">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-semibold">{inv.client}</h3>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                        inv.status === 'paid'
                          ? 'bg-green-100 text-green-800'
                          : inv.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {inv.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">#{inv.invoice_number}</p>
                    <p className="text-xl font-bold mt-2">USD {inv.amount.toFixed(2)}</p>
                    <p className="text-sm text-gray-500 mt-1">Due: {inv.due_date}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ✅ Create Invoice Form */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8">Create a New Invoice</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const data = Object.fromEntries(formData);

                fetch('http://127.0.0.1:8000/api/invoices/create/', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    client_name: data.client_name,
                    invoice_number: data.invoice_number,
                    status: data.status,
                    due_date: data.due_date,
                  }),
                })
                  .then(res => res.json())
                  .then(data => {
                    alert(data.message || 'Invoice created!');
                    window.location.reload();
                  })
                  .catch(err => {
                    console.error("Error creating invoice:", err);
                    alert("Failed to create invoice. Check console.");
                  });
              }}
              className="bg-white p-6 rounded-lg shadow"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Client Name</label>
                  <input
                    name="client_name"
                    type="text"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    placeholder="e.g. Sipho’s Spaza"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Invoice Number</label>
                  <input
                    name="invoice_number"
                    type="text"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    placeholder="e.g. INV-0002"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select
                    name="status"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="overdue">Overdue</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Due Date</label>
                  <input
                    name="due_date"
                    type="date"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium"
              >
                Create Invoice
              </button>
            </form>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-green-800 text-white py-16 text-center">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-4">You didn’t start your business to be a bookkeeper</h2>
            <p className="text-xl mb-8">Let OurMoney do the math. You do the magic.</p>
            <button className="bg-white text-green-800 hover:bg-gray-100 px-8 py-3 rounded-lg text-lg font-semibold">
              Get started for free
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">OurMoney</h3>
            <p className="text-gray-400">Built for Africa. Backed by the world.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Features</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white">Invoicing</a></li>
              <li><a href="/" className="hover:text-white">Payments</a></li>
              <li><a href="/" className="hover:text-white">Accounting</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white">About</a></li>
              <li><a href="/" className="hover:text-white">Blog</a></li>
              <li><a href="/" className="hover:text-white">Careers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white">Help Center</a></li>
              <li><a href="/" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}