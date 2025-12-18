import { Link } from 'react-router-dom';
import { FaHome, FaArrowLeft, FaExclamationTriangle } from 'react-icons/fa';

const NotFoundSimple = () => {
    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="text-center space-y-8 max-w-lg">
                <div className="space-y-4">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-error/10">
                        <FaExclamationTriangle className="text-4xl text-error" />
                    </div>

                    <h1 className="text-5xl font-bold">404</h1>

                    <h2 className="text-2xl font-semibold">Page Not Found</h2>

                    <p className="text-lg opacity-80">
                        Sorry, we couldn't find the page you're looking for. It might have been
                        moved, deleted, or never existed.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        className="btn btn-outline"
                        onClick={() => window.history.back()}
                    >
                        <FaArrowLeft className="mr-2" />
                        Go Back
                    </button>

                    <Link to="/" className="btn btn-primary">
                        <FaHome className="mr-2" />
                        Return Home
                    </Link>
                </div>

                <div className="card bg-base-200 border border-base-300">
                    <div className="card-body items-center text-center">
                        <p className="text-sm opacity-70">
                            URL: <code className="bg-base-300 px-2 py-1 rounded">{window.location.pathname}</code>
                        </p>
                        <p className="text-xs opacity-60 mt-2">
                            If this error persists, please contact support.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFoundSimple;