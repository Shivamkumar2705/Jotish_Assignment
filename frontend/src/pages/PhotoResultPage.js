import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Download, Share2, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

const PhotoResultPage = () => {
    const [photo, setPhoto] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const savedPhoto = localStorage.getItem('capturedPhoto');
        if (savedPhoto) {
            setPhoto(savedPhoto);
        } else {
            navigate('/list');
        }
    }, [navigate]);

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = photo;
        link.download = `employee-capture-${Date.now()}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success('Photo downloaded successfully');
    };

    const handleDiscard = () => {
        localStorage.removeItem('capturedPhoto');
        navigate(-1);
    };

    if (!photo) return null;

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl animate-pop-in">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden outline outline-4 outline-white">
                    <div className="p-8 text-center border-b border-gray-100">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 mb-4">
                            <CheckCircle2 size={32} />
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Photo Captured!</h1>
                        <p className="text-gray-500 mt-2">The identity has been successfully captured and verified.</p>
                    </div>

                    <div className="p-8">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                            <div className="relative rounded-2xl overflow-hidden bg-white shadow-lg">
                                <img src={photo} alt="Captured" className="w-full h-auto object-cover" />
                            </div>
                        </div>

                        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <button
                                onClick={handleDownload}
                                className="flex flex-col items-center justify-center p-4 rounded-2xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition group"
                            >
                                <Download size={24} className="mb-2 group-hover:scale-110 transition" />
                                <span className="text-xs font-bold uppercase tracking-wider">Save</span>
                            </button>
                            <button
                                className="flex flex-col items-center justify-center p-4 rounded-2xl bg-gray-50 text-gray-600 hover:bg-gray-100 transition group"
                            >
                                <Share2 size={24} className="mb-2 group-hover:scale-110 transition" />
                                <span className="text-xs font-bold uppercase tracking-wider">Share</span>
                            </button>
                            <button
                                onClick={handleDiscard}
                                className="flex flex-col items-center justify-center p-4 rounded-2xl bg-red-50 text-red-600 hover:bg-red-100 transition group"
                            >
                                <Trash2 size={24} className="mb-2 group-hover:scale-110 transition" />
                                <span className="text-xs font-bold uppercase tracking-wider">Discard</span>
                            </button>
                            <Link
                                to="/list"
                                className="flex flex-col items-center justify-center p-4 rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-lg group"
                            >
                                <ArrowLeft size={24} className="mb-2 group-hover:-translate-x-1 transition" />
                                <span className="text-xs font-bold uppercase tracking-wider">Submit</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-gray-500 font-medium hover:text-indigo-600 transition flex items-center justify-center mx-auto"
                    >
                        <ArrowLeft size={18} className="mr-2" />
                        Go Back to Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PhotoResultPage;
