import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { LayoutGrid, BarChart3, Map as MapIcon, LogOut, ChevronRight, Search } from 'lucide-react';

const ListPage = () => {
    const { data, loading, error } = useData();
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = React.useState('');

    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.office.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-red-50">
                <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
                    <div className="text-red-500 text-5xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Fetching Data</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Header */}
            <nav className="bg-white shadow-sm sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center space-x-2">
                            <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
                                <LayoutGrid size={24} />
                            </div>
                            <h1 className="text-xl font-bold text-gray-900">EmpTrack</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="hidden sm:block text-sm text-gray-500">Welcome, {user?.name}</span>
                            <button
                                onClick={logout}
                                className="flex items-center space-x-1 text-sm text-red-600 hover:text-red-700 font-medium px-3 py-1.5 rounded-md hover:bg-red-50 transition"
                            >
                                <LogOut size={16} />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                {/* Actions Bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div className="relative flex-1 max-w-md w-full">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search employees, positions..."
                            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={() => navigate('/graph')}
                            className="flex items-center justify-center space-x-2 bg-white border border-gray-200 text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-indigo-50 transition shadow-sm w-full sm:w-auto"
                        >
                            <BarChart3 size={20} />
                            <span>View Salary Graph</span>
                        </button>
                        <button
                            onClick={() => navigate('/map')}
                            className="flex items-center justify-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition shadow-md w-full sm:w-auto"
                        >
                            <MapIcon size={20} />
                            <span>View Cities Map</span>
                        </button>
                    </div>
                </div>

                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredData.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => navigate(`/details/${item.id}`)}
                                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer group"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                        {item.name.charAt(0)}
                                    </div>
                                    <span className="text-xs font-semibold px-2 py-1 bg-green-50 text-green-700 rounded-full">Active</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">{item.name}</h3>
                                <p className="text-sm text-gray-500 mb-4">{item.position}</p>
                                <div className="space-y-2 border-t pt-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Office:</span>
                                        <span className="text-gray-700 font-medium">{item.office}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Salary:</span>
                                        <span className="text-emerald-600 font-bold">{item.salary}</span>
                                    </div>
                                </div>
                                <div className="mt-6 flex items-center text-indigo-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                    View Details
                                    <ChevronRight size={16} className="ml-1" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && filteredData.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-lg">No results found for "{searchTerm}"</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ListPage;
