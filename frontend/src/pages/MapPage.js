import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useData } from '../context/DataContext';
import { ArrowLeft, Map as MapIcon, Navigation, Info } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

// Fix for Leaflet default icon issues in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Mock coordinates for cities in the dataset
const cityCoords = {
    'Edinburgh': [55.9533, -3.1883],
    'Tokyo': [35.6762, 139.6503],
    'San Francisco': [37.7749, -122.4194],
    'New York': [40.7128, -74.0060],
    'London': [51.5074, -0.1278],
    'Sidney': [-33.8688, 151.2093],
    'Singapore': [1.3521, 103.8198]
};

const MapPage = () => {
    const { data, loading } = useData();
    const navigate = useNavigate();

    const cityData = useMemo(() => {
        const counts = {};
        data.forEach(item => {
            const city = item.office;
            if (!counts[city]) {
                counts[city] = { name: city, count: 0, coords: cityCoords[city] || [0, 0], employees: [] };
            }
            counts[city].count++;
            counts[city].employees.push(item);
        });
        return Object.values(counts).filter(c => c.coords[0] !== 0);
    }, [data]);

    if (loading) return <LoadingSpinner fullPage />;

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 shadow-sm px-4 py-4 z-30">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => navigate('/list')}
                            className="p-2 hover:bg-gray-100 rounded-full transition text-gray-600"
                        >
                            <ArrowLeft size={24} />
                        </button>
                        <div className="flex items-center space-x-2">
                            <MapIcon className="text-indigo-600 w-6 h-6" />
                            <h1 className="text-xl font-bold text-gray-900">Global Offices</h1>
                        </div>
                    </div>
                    <div className="hidden sm:flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                            <div className="w-3 h-3 bg-indigo-600 rounded-full mr-2"></div>
                            Office Location
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 relative">
                <MapContainer
                    center={[30, 0]}
                    zoom={2}
                    className="absolute inset-0"
                    scrollWheelZoom={true}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {cityData.map((city, idx) => (
                        <Marker key={idx} position={city.coords}>
                            <Popup>
                                <div className="p-2 max-w-xs">
                                    <h3 className="font-bold text-lg text-indigo-700 mb-1">{city.name} Office</h3>
                                    <div className="flex items-center text-gray-600 mb-3 font-medium">
                                        <Navigation size={14} className="mr-1" />
                                        {city.count} Employees
                                    </div>
                                    <div className="space-y-1 mt-2 border-t pt-2">
                                        <p className="text-xs font-bold text-gray-400 uppercase">Recent Staff:</p>
                                        {city.employees.slice(0, 3).map((emp, i) => (
                                            <p key={i} className="text-sm text-gray-700 truncate">{emp.name}</p>
                                        ))}
                                        {city.count > 3 && <p className="text-xs text-indigo-500 font-medium font-italic">+{city.count - 3} more...</p>}
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>

                {/* Legend / Overlay */}
                <div className="absolute bottom-10 left-10 z-[1000] bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white max-w-sm hidden md:block max-h-[calc(100vh-160px)] overflow-y-auto custom-scrollbar">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                        <Info size={18} className="mr-2 text-indigo-600" />
                        Strategic Overview
                    </h3>
                    <div className="space-y-4">
                        {cityData.sort((a, b) => b.count - a.count).slice(0, 4).map((city, idx) => (
                            <div key={idx} className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                                    <span className="text-sm text-gray-600 font-medium">{city.name}</span>
                                </div>
                                <span className="text-sm font-bold text-gray-800">{city.count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapPage;
