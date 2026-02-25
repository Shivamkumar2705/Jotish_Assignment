import React from 'react';

const LoadingSpinner = ({ fullPage = false }) => {
    const spinner = (
        <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative w-16 h-16">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-200 rounded-full"></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="text-gray-500 font-medium animate-pulse">Loading data...</p>
        </div>
    );

    if (fullPage) {
        return (
            <div className="fixed inset-0 bg-white bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center">
                {spinner}
            </div>
        );
    }

    return (
        <div className="w-full flex items-center justify-center p-12">
            {spinner}
        </div>
    );
};

export default LoadingSpinner;
