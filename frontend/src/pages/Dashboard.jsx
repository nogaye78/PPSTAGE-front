import React from 'react';
import { FaFileAlt, FaEnvelope, FaUser, FaHotel, FaBuilding, FaComment } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const stats = [
    { label: 'Formulaires', count: 125, color: 'bg-purple-500', icon: <FaFileAlt size={24} /> },
    { label: 'Messages', count: 40, color: 'bg-teal-500', icon: <FaComment size={24} /> },
    { label: 'Utilisateurs', count: 600, color: 'bg-yellow-500', icon: <FaUser size={24} /> },
    { label: 'E-mails', count: 25, color: 'bg-red-500', icon: <FaEnvelope size={24} /> },
    { label: 'Hôtels', count: 40, color: 'bg-purple-600', icon: <FaHotel size={24} /> },
    { label: 'Entités', count: '02', color: 'bg-blue-600', icon: <FaBuilding size={24} /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#f8f9fa]">
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 flex flex-col ml-0 md:ml-64">
        <Navbar title="Dashboard" />

        <div className="p-4 sm:p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-10 gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-normal text-gray-800">
                Bienvenue sur RED Product
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Lorem ipsum dolor sit amet consectetur
              </p>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 sm:gap-5 hover:shadow-lg transition-shadow duration-300"
              >
                <div className={`${stat.color} w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white shadow-inner`}>
                  {stat.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl sm:text-2xl font-bold text-gray-700">
                      {stat.count}
                    </span>
                    <span className="text-gray-400 text-sm">{stat.label}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 italic">
                    Je ne sais pas quoi mettre
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
