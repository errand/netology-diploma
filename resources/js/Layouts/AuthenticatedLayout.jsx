import React, { useState } from 'react';

export default function Authenticated({ auth, header, children }) {

    return (
        <div className="min-h-screen bg-gray-100">
            <main>{children}</main>
        </div>
    );
}
