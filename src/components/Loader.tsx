import { useState, useEffect } from "react";

let showLoaderFunction: (() => void) | null = null;

export default function Loader() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        showLoaderFunction = () => {
            setVisible(true);
            setTimeout(() => {
                setVisible(false);
            }, 3000);
        };
    }, []);

    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
            <div className="w-12 h-12 border-4 border-white rounded-full border-t-transparent animate-spin"></div>
        </div>
    );
}

// Export function to trigger loader from anywhere
export const showLoader = () => {
    if (showLoaderFunction) showLoaderFunction();
};
