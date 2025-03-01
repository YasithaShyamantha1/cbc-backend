import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [growthData, setGrowthData] = useState([]);
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [adminDetails, setAdminDetails] = useState({ name: 'Admin', age: 30 });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/orders`);
        setOrders(res.data);
      } catch (err) {
        toast.error("Failed to fetch orders.");
      }
    };

    const fetchGrowthData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/growth`);
        setGrowthData(res.data);
      } catch (err) {
        toast.error("Failed to fetch growth data.");
      }
    };

    fetchOrders();
    fetchGrowthData();
  }, []);

  const growthChartData = {
    labels: growthData.map(data => data.date),
    datasets: [{
      label: 'Business Growth',
      data: growthData.map(data => data.sales),
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    }],
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="flex flex-col lg:flex-row bg-gray-100 min-h-screen"
    >
     

      <div className="lg:w-4/5 p-6">
        <div className="flex justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">{adminDetails.name}</h1>
            <p className="text-gray-600">Age: {adminDetails.age}</p>
          </div>
          <div className="flex items-center">
            <Calendar 
              onChange={setCalendarDate} 
              value={calendarDate} 
              className="border rounded-lg shadow-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Business Growth</h3>
            <Line data={growthChartData} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Orders Summary</h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border">Order ID</th>
                  <th className="p-2 border">Status</th>
                  <th className="p-2 border">Date</th>
                  <th className="p-2 border">Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.orderId} className="hover:bg-gray-100 cursor-pointer">
                    <td className="p-2 border">{order.orderId}</td>
                    <td className="p-2 border">{order.status}</td>
                    <td className="p-2 border">{new Date(order.date).toLocaleDateString()}</td>
                    <td className="p-2 border">LKR {order.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;