import React, { useRef, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Webcam from 'react-webcam';
import { useData } from '../context/DataContext';
import { ArrowLeft, Camera, RefreshCw, Smartphone, MapPin, Briefcase, Calendar, CreditCard } from 'lucide-react';

const DetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, loading } = useData();
    const [showCamera, setShowCamera] = useState(false);

    const webcamRef = useRef(null);
    const employee = data.find(emp => emp.id === parseInt(id));

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        localStorage.setItem('capturedPhoto', imageSrc);
        navigate('/photo-result');
    }, [webcamRef, navigate]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
    );

    if (!employee) return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Employee not found</h2>
            <Link to="/list" className="text-indigo-600 font-medium hover:underline flex items-center">
                <ArrowLeft size={20} className="mr-2" /> Back to List
            </Link>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-indigo-600 text-white pb-24 pt-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <button
                        onClick={() => navigate('/list')}
                        className="flex items-center space-x-2 text-indigo-100 hover:text-white transition mb-6"
                    >
                        <ArrowLeft size={20} />
                        <span>Back to Dashboard</span>
                    </button>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="flex items-center space-x-6">
                            <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-4xl font-bold border border-white/30 shadow-xl">
                                {employee.name.charAt(0)}
                            </div>
                            <div className="space-y-1">
                                <h1 className="text-3xl font-extrabold">{employee.name}</h1>
                                <p className="text-indigo-100 text-lg flex items-center">
                                    <Briefcase className="w-5 h-5 mr-2 opacity-70" />
                                    {employee.position}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Details Column */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                                <h2 className="font-bold text-gray-800 flex items-center">
                                    <Smartphone className="w-5 h-5 mr-2 text-indigo-500" />
                                    Employee Information
                                </h2>
                            </div>
                            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Office Location</p>
                                    <p className="text-gray-800 font-medium flex items-center">
                                        <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                                        {employee.office}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Extension Number</p>
                                    <p className="text-gray-800 font-medium">{employee.extn}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Join Date</p>
                                    <p className="text-gray-800 font-medium flex items-center">
                                        <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                                        {employee.startDate}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Annual Salary</p>
                                    <p className="text-emerald-600 font-bold flex items-center">
                                        <CreditCard className="w-4 h-4 mr-1 text-gray-400" />
                                        {employee.salary}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Camera Section */}
                        <div className="bg-white rounded-2xl shadow-lg border border-indigo-100 overflow-hidden outline outline-2 outline-indigo-600/10">
                            <div className="p-8 text-center">
                                {!showCamera ? (
                                    <div className="space-y-6">
                                        <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto text-indigo-600 animate-bounce">
                                            <Camera size={40} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800">Verify Identity</h3>
                                            <p className="text-gray-500 mt-2">Capture a photo to verify this employee record</p>
                                        </div>
                                        <button
                                            onClick={() => setShowCamera(true)}
                                            className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition shadow-md hover:shadow-lg transform active:scale-95"
                                        >
                                            Activate Camera
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        <div className="relative rounded-xl overflow-hidden shadow-inner bg-black aspect-video max-w-lg mx-auto border-4 border-indigo-600/20">
                                            <Webcam
                                                audio={false}
                                                ref={webcamRef}
                                                screenshotFormat="image/jpeg"
                                                videoConstraints={{ facingMode: "user" }}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 border-[40px] border-black/40 pointer-events-none rounded-full scale-150"></div>
                                            <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                                                <div className="bg-indigo-600/80 backdrop-blur-md px-4 py-1 rounded-full text-white text-xs font-bold animate-pulse">
                                                    CAMERA ACTIVE
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-center space-x-4">
                                            <button
                                                onClick={() => setShowCamera(false)}
                                                className="flex items-center space-x-2 px-6 py-2 rounded-lg text-gray-600 font-medium hover:bg-gray-100 transition"
                                            >
                                                <ArrowLeft size={18} />
                                                <span>Cancel</span>
                                            </button>
                                            <button
                                                onClick={capture}
                                                className="flex items-center space-x-2 px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg transform active:scale-x-95"
                                            >
                                                <Camera size={22} />
                                                <span>Capture Photo</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / Quick Stats */}
                    <div className="space-y-6">
                        <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 p-6 rounded-2xl text-white shadow-lg">
                            <h3 className="font-bold mb-4 opacity-80 uppercase tracking-widest text-xs">Contract Status</h3>
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-2xl font-bold">100% Verified</span>
                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                    <RefreshCw size={24} className="animate-spin-slow" />
                                </div>
                            </div>
                            <p className="text-sm text-indigo-100">All data points for this employee have been synced with the central repository.</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-800 mb-4">Quick Actions</h3>
                            <div className="space-y-2">
                                <button className="w-full text-left px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition">Download PDF Report</button>
                                <button className="w-full text-left px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition">Request Salary Update</button>
                                <button className="w-full text-left px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition">Email Employee</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DetailsPage;
