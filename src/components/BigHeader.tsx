import React from 'react';
import logo from '../assets/logos/icon-logo.png'; // Ensure this path is correct

function BigHeader() {
    return (
        <div className="hidden lg:flex items-center w-full">
            <div className="flex-shrink-0 w-36">
                <img src={logo} alt="Logo" className="w-36 h-36 object-contain" />
            </div>
            <div className="flex-grow pl-4">
                <h1 className="text-5xl font-bold">Ask Bobo</h1>
                <h1 className="text-1xl font-bold text-blue-400">The one and only Bukharian online dictionary.</h1>
            </div>
        </div>
    );
}

export default BigHeader;