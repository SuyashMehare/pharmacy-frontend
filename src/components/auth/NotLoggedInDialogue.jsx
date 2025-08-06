import { useNavigate } from "react-router-dom";
import { AlertCircle, LogIn } from 'lucide-react';

export default function NotLoggedInDialogue({ message = "You need to log in to access this page", navigateTo = '/auth' }) {
    const navigate = useNavigate();

    return (
        <div className="fixed inset-0  bg-opacity-0 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                <div className="flex flex-col items-center text-center">
                    {/* Warning Icon */}
                    <div className="mb-4 p-3 bg-red-100 rounded-full">
                        <AlertCircle className="h-8 w-8 text-red-600" />
                    </div>
                    
                    {/* Message */}
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Access Required
                    </h3>
                    <p className="text-gray-600 mb-6">
                        {message}
                    </p>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-3 w-full">
                        <button
                            onClick={() => navigate('/products')}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                            Go Home
                        </button>
                        <button
                            onClick={() => navigate(navigateTo)}
                            className="flex-1 px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors flex items-center justify-center"
                        >
                            <LogIn className="h-4 w-4 mr-2" />
                            Log In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}