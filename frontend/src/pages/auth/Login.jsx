import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import api from "../../api/index.js";
import Urls from "../../api/Urls.js";
import {toast} from "react-toastify";
import {useAuth} from "../../AuthProvider.jsx";

const Login = () => {
    const navigate = useNavigate();
    const {setAuthData} = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (!username.trim() || !password.trim()) {
            setError('Please enter both username and password');
            setIsLoading(false);
            return;
        }

        try {
            const response = await api.post(Urls.auth.login, {
                username: username.trim(),
                password: password.trim()
            });

            if (response && response.status >= 200 && response.status < 300) {
                setAuthData(response.data);
                toast.success('Login successful!');
                navigate('/admin/dashboard');
            } else {
                const msg = response?.data?.message || 'Registration failed. Please try again.';
                toast.error(msg);
                setError(msg);
            }
        } catch (err) {
            console.error('Login error:', err);
            const msg = err?.response?.data?.message || 'An error occurred during login. Please try again.';
            toast.error(msg);
            setError(msg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-sm">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title justify-center text-2xl mb-2">Login</h2>
                        <p className="text-center opacity-70 mb-6">Enter your credentials</p>

                        {error && (
                            <div className="alert alert-error">
                                <span>{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Username</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="input input-bordered w-full pr-10"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-3"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FaEyeSlash/> : <FaEye/>}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-full mt-4"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="loading loading-spinner"></span>
                                ) : 'Login'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;