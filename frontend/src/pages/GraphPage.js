import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    Legend
} from 'recharts';
import { useData } from '../context/DataContext';
import { ArrowLeft, BarChart3, TrendingUp, DollarSign, Users } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const GraphPage = () => {
    const { data, loading } = useData();
    const navigate = useNavigate();

    const graphData = useMemo(() => {
        return data.slice(0, 10).map(item => ({
            name: item.name.split(' ')[0], // Just first name to keep labels clean
            fullName: item.name,
            salary: item.salaryValue,
            salaryStr: item.salary
        }));
    }, [data]);

    const stats = useMemo(() => {
        if (graphData.length === 0) return null;
        const total = graphData.reduce((acc, curr) => acc + curr.salary, 0);
        const avg = Math.round(total / graphData.length);
        const max = Math.max(...graphData.map(d => d.salary));
        return { avg, max };
    }, [graphData]);

    if (loading) return <LoadingSpinner fullPage />;

    const COLORS = ['#4f46e5', '#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe', '#e0e7ff', '#4f46e5', '#6366f1', '#818cf8', '#a5b4fc'];

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 shadow-sm px-4 py-4 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => navigate('/list')}
                            className="p-2 hover:bg-gray-100 rounded-full transition text-gray-600"
                        >
                            <ArrowLeft size={24} />
                        </button>
                        <div className="flex items-center space-x-2">
                            <BarChart3 className="text-indigo-600 w-6 h-6" />
                            <h1 className="text-xl font-bold text-gray-900">Salary Analysis</h1>
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                    <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">Top 10 Salaries</h3>
                                <p className="text-sm text-gray-500">Visualization of the top earners in the dataset</p>
                            </div>
                            <div className="flex items-center text-indigo-600 font-bold bg-indigo-50 px-3 py-1 rounded-full text-xs">
                                <TrendingUp size={14} className="mr-1" />
                                Live Data
                            </div>
                        </div>

                        <div className="h-[300px] md:h-[400px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={graphData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#94a3b8', fontSize: 10 }}
                                        dy={10}
                                        interval={0}
                                        angle={-45}
                                        textAnchor="end"
                                        height={60}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                                        tickFormatter={(value) => `$${value / 1000}k`}
                                    />
                                    <Tooltip
                                        cursor={{ fill: '#f8fafc' }}
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', padding: '12px' }}
                                        formatter={(value) => [`$${value.toLocaleString()}`, 'Annual Salary']}
                                    />
                                    <Bar
                                        dataKey="salary"
                                        radius={[8, 8, 0, 0]}
                                        barSize={40}
                                    >
                                        {graphData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-lg shadow-indigo-200">
                            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                                <Users size={24} />
                            </div>
                            <p className="text-indigo-100 text-sm font-medium">Average Top Salary</p>
                            <h3 className="text-4xl font-extrabold mt-1">${stats?.avg?.toLocaleString()}</h3>
                            <div className="mt-6 pt-6 border-t border-white/10">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-indigo-200 text-xs">Highest Record</p>
                                        <p className="font-bold text-lg">${stats?.max?.toLocaleString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-indigo-200 text-xs">Sample Size</p>
                                        <p className="font-bold text-lg">{graphData.length} records</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                                <DollarSign size={18} className="mr-2 text-indigo-500" />
                                Salary Distribution
                            </h3>
                            <div className="space-y-4">
                                {graphData.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500 font-medium">{item.fullName}</span>
                                        <span className="text-sm font-bold text-gray-800">{item.salaryStr}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default GraphPage;
