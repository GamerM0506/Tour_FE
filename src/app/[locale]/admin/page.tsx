import { DollarSign, ShoppingBag, Users, Activity } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      
      {/* 1. HEADER */}
      <div className="flex justify-between items-center">
        <div>
            <h1 className="font-serif text-3xl text-forest font-bold">Dashboard Overview</h1>
            <p className="text-jet/50">Welcome back, here's what's happening today.</p>
        </div>
        <button className="bg-forest text-sand px-4 py-2 rounded-md text-sm font-bold shadow-lg hover:bg-forest/90">
            Download Report
        </button>
      </div>

      {/* 2. STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value="$45,231" change="+20.1%" icon={DollarSign} />
        <StatCard title="Bookings" value="+2,350" change="+180.1%" icon={ShoppingBag} />
        <StatCard title="Active Users" value="+12,234" change="+19%" icon={Users} />
        <StatCard title="Active Now" value="+573" change="+201 since last hour" icon={Activity} />
      </div>

      {/* 3. RECENT BOOKINGS TABLE */}
      <div className="bg-white rounded-xl border border-sand-light shadow-sm overflow-hidden">
        <div className="p-6 border-b border-sand-light">
            <h3 className="font-serif text-xl text-forest font-bold">Recent Bookings</h3>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="bg-sand-light text-jet/60 uppercase tracking-wider text-xs font-bold">
                    <tr>
                        <th className="px-6 py-4">Customer</th>
                        <th className="px-6 py-4">Tour</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Amount</th>
                        <th className="px-6 py-4">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-sand-light">
                    {MOCK_BOOKINGS.map((item, i) => (
                        <tr key={i} className="hover:bg-sand/10 transition-colors">
                            <td className="px-6 py-4 font-bold text-jet">{item.customer}</td>
                            <td className="px-6 py-4 text-jet/80">{item.tour}</td>
                            <td className="px-6 py-4 text-jet/60">{item.date}</td>
                            <td className="px-6 py-4 font-medium">{item.amount}</td>
                            <td className="px-6 py-4">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                                    item.status === 'Paid' ? 'bg-green-100 text-green-700' : 
                                    item.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                                }`}>
                                    {item.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>

    </div>
  );
}

// --- Component phụ ---

const StatCard = ({ title, value, change, icon: Icon }: any) => (
    <div className="bg-white p-6 rounded-xl border border-sand-light shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
            <div>
                <p className="text-xs font-bold uppercase tracking-widest text-jet/40">{title}</p>
                <h3 className="text-2xl font-bold text-forest mt-1">{value}</h3>
            </div>
            <div className="p-2 bg-sand-light rounded-lg text-forest">
                <Icon size={20} />
            </div>
        </div>
        <p className="text-xs text-jet/50">
            <span className="text-green-600 font-bold">{change}</span> from last month
        </p>
    </div>
);

// Mock Data
const MOCK_BOOKINGS = [
    { customer: "Nguyen Van A", tour: "Ha Long Bay Legend", date: "2026-05-12", amount: "$1,200", status: "Paid" },
    { customer: "John Doe", tour: "Son Doong Expedition", date: "2026-06-20", amount: "$3,000", status: "Pending" },
    { customer: "Sarah Smith", tour: "Mekong River", date: "2026-07-05", amount: "$890", status: "Paid" },
    { customer: "Tran Thi B", tour: "Sapa Cloud Hunting", date: "2026-08-15", amount: "$1,500", status: "Cancelled" },
];