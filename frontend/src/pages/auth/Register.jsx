import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaCheckCircle,
    FaTimesCircle,
    FaGoogle,
    FaMicrosoft,
    FaGithub,
    FaApple,
    FaShieldAlt,
    FaExclamationTriangle,
    FaArrowLeft,
    FaKey,
    FaGlobe,
    FaCheck,
    FaSpinner
} from 'react-icons/fa';
import api from "../../api/index.js";
import Urls from "../../api/Urls.js";
import { toast } from 'react-toastify'

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false,
        newsletter: true
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');
    const [passwordStrength, setPasswordStrength] = useState({
        score: 0,
        criteria: {
            length: false,
            uppercase: false,
            lowercase: false,
            number: false,
            special: false
        }
    });

    const validatePassword = (password) => {
        const criteria = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[^A-Za-z0-9]/.test(password)
        };

        const score = Object.values(criteria).filter(Boolean).length;

        setPasswordStrength({
            score,
            criteria
        });

        return score >= 3;
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateUsername = (username) => {
        const usernameRegex = /^[a-zA-Z0-9_.-]{3,30}$/;
        return usernameRegex.test(username);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }

        if (name === 'password') {
            validatePassword(value);
        }
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setErrors({});
        setIsLoading(true);

        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
        } else if (!validateUsername(formData.username)) {
            newErrors.username = 'Username must be 3-30 characters and can contain letters, numbers, dots, dashes, and underscores';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (passwordStrength.score < 3) {
            newErrors.password = 'Password is too weak. Please use a stronger password.';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!formData.termsAccepted) {
            newErrors.termsAccepted = 'You must accept the Terms of Service';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsLoading(false);
            return;
        }

        try {
            const response = await api.post(Urls.auth.register, {
                email: formData.email,
                username: formData.username,
                password: formData.password,
                newsletter: formData.newsletter
            });

            if (response && response.status >= 200 && response.status < 300) {
                const msg = response.data?.message || 'Registration successful! Please check your email to verify your account.';
                setSuccess(msg);
                toast.success(msg);
                navigate('/auth/login');
            } else {
                const msg = response?.data?.message || 'Registration failed. Please try again.';
                toast.error(msg);
                setErrors({ form: msg });
            }
        } catch (err) {
            const msg = err?.response?.data?.message || err?.message || 'Erreur réseau';
            toast.error(msg);
            setErrors(prev => ({ ...prev, form: msg }));
        } finally {
            setIsLoading(false);
        }
    }


    const renderPasswordStrength = () => {
        const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
        const strengthColors = ['text-error', 'text-warning', 'text-warning', 'text-success', 'text-success'];
        const progressColors = ['bg-error', 'bg-warning', 'bg-warning', 'bg-success', 'bg-success'];

        return (
            <div className="space-y-2 mt-2">
                <div className="flex justify-between items-center">
                    <span className="text-sm">Password strength:</span>
                    <span className={`text-sm font-bold ${strengthColors[passwordStrength.score]}`}>
                        {strengthLabels[passwordStrength.score]}
                    </span>
                </div>

                <progress
                    className={`progress w-full ${progressColors[passwordStrength.score]}`}
                    value={passwordStrength.score * 20}
                    max="100"
                ></progress>

                <div className="grid grid-cols-2 gap-2 text-xs">
                    {Object.entries(passwordStrength.criteria).map(([key, met]) => (
                        <div key={key} className="flex items-center gap-1">
                            {met ? (
                                <FaCheckCircle className="text-success text-xs" />
                            ) : (
                                <FaTimesCircle className="text-error text-xs" />
                            )}
                            <span className={met ? '' : 'opacity-50'}>
                                {key === 'length' && '8+ characters'}
                                {key === 'uppercase' && 'Uppercase'}
                                {key === 'lowercase' && 'Lowercase'}
                                {key === 'number' && 'Number'}
                                {key === 'special' && 'Special char'}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-100 to-primary/5 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <Link
                    to="/"
                    className="btn btn-ghost btn-sm absolute top-4 left-4 md:top-8 md:left-8"
                >
                    <FaArrowLeft className="mr-2" />
                    Back to Home
                </Link>

                <div className="dropdown dropdown-end absolute top-4 right-4 md:top-8 md:right-8">
                    <div tabIndex={0} className="btn btn-ghost btn-sm">
                        <FaGlobe />
                        EN
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>English</a></li>
                        <li><a>Français</a></li>
                        <li><a>Español</a></li>
                        <li><a>Deutsch</a></li>
                    </ul>
                </div>

                <div className="card bg-base-100 shadow-2xl border border-base-300">
                    <div className="card-body p-8">
                        <div className="text-center mb-8">
                            <div className="flex justify-center mb-4">
                                <div className="p-3 rounded-full bg-gradient-to-br from-primary to-secondary">
                                    <FaShieldAlt className="text-white text-3xl" />
                                </div>
                            </div>
                            <h1 className="text-3xl font-bold">Create Account</h1>
                            <p className="text-base-content/70 mt-2">
                                Join thousands of companies using our SSO platform
                            </p>
                        </div>

                        {success && (
                            <div className="alert alert-success mb-6 animate-pulse">
                                <FaCheckCircle />
                                <span>{success}</span>
                            </div>
                        )}

                        {Object.keys(errors).length > 0 && (
                            <div className="alert alert-error mb-6 animate-shake">
                                <FaExclamationTriangle />
                                <span>Please fix the errors below</span>
                            </div>
                        )}

                        <div className="divider">Or continue with email</div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text flex items-center gap-2">
                                        <FaEnvelope />
                                        Email Address *
                                    </span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
                                    placeholder="you@company.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                />
                                {errors.email && (
                                    <div className="label-text-alt text-error mt-1">
                                        {errors.email}
                                    </div>
                                )}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text flex items-center gap-2">
                                        <FaUser />
                                        Username *
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    className={`input input-bordered w-full ${errors.username ? 'input-error' : ''}`}
                                    placeholder="johndoe"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                />
                                {errors.username && (
                                    <div className="label-text-alt text-error mt-1">
                                        {errors.username}
                                    </div>
                                )}
                                <div className="label-text-alt opacity-70 mt-1">
                                    Letters, numbers, dots, dashes, and underscores only
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text flex items-center gap-2">
                                        <FaLock />
                                        Password *
                                    </span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        className={`input input-bordered w-full pr-10 ${errors.password ? 'input-error' : ''}`}
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-3 opacity-50 hover:opacity-100"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                {renderPasswordStrength()}
                                {errors.password && (
                                    <div className="label-text-alt text-error mt-1">
                                        {errors.password}
                                    </div>
                                )}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password *</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        className={`input input-bordered w-full pr-10 ${errors.confirmPassword ? 'input-error' : ''}`}
                                        placeholder="••••••••"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-3 opacity-50 hover:opacity-100"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <div className="label-text-alt text-error mt-1">
                                        {errors.confirmPassword}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-3">
                                <div className="form-control">
                                    <label className="label cursor-pointer justify-start gap-3">
                                        <input
                                            type="checkbox"
                                            name="termsAccepted"
                                            className="checkbox checkbox-primary"
                                            checked={formData.termsAccepted}
                                            onChange={handleInputChange}
                                            disabled={isLoading}
                                        />
                                        <span className="label-text">
                                            I agree to the{' '}
                                            <a href="/terms" className="link link-primary">Terms of Service</a>
                                            {' '}and{' '}
                                            <a href="/privacy" className="link link-primary">Privacy Policy</a> *
                                        </span>
                                    </label>
                                    {errors.termsAccepted && (
                                        <div className="label-text-alt text-error ml-12">
                                            {errors.termsAccepted}
                                        </div>
                                    )}
                                </div>

                                <div className="form-control">
                                    <label className="label cursor-pointer justify-start gap-3">
                                        <input
                                            type="checkbox"
                                            name="newsletter"
                                            className="checkbox"
                                            checked={formData.newsletter}
                                            onChange={handleInputChange}
                                            disabled={isLoading}
                                        />
                                        <span className="label-text">
                                            Subscribe to our newsletter for updates and security tips
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-full mt-6"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm"></span>
                                        Creating Account...
                                    </>
                                ) : (
                                    <>
                                        <FaCheck className="mr-2" />
                                        Create Account
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="text-center mt-6 pt-6 border-t border-base-300">
                            <p className="text-sm opacity-70">
                                Already have an account?{' '}
                                <Link to="/auth/login" className="link link-primary font-semibold">
                                    Sign in here
                                </Link>
                            </p>
                        </div>

                        <div className="mt-6 p-3 bg-base-200 rounded-lg">
                            <div className="flex items-start gap-2">
                                <FaShieldAlt className="text-success mt-1" />
                                <div className="text-xs">
                                    <div className="font-bold">Your data is secure</div>
                                    <div className="opacity-70">
                                        We use bank-level encryption and never share your information
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-6 text-xs opacity-70">
                    <p>
                        © 2024 SSO Platform •{' '}
                        <a href="/help" className="link link-hover">Help</a> •{' '}
                        <a href="/contact" className="link link-hover">Contact</a>
                    </p>
                    <p className="mt-1">
                        Need help? Contact support@ssoplatform.com
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;