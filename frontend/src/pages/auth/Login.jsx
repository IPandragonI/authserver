import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    FaUser,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaKey,
    FaShieldAlt,
    FaGoogle,
    FaMicrosoft,
    FaGithub,
    FaApple,
    FaEnvelope,
    FaPhone,
    FaQrcode,
    FaFingerprint,
    FaExclamationTriangle,
    FaCheckCircle,
    FaQuestionCircle,
    FaGlobe,
    FaCog
} from 'react-icons/fa';

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        rememberMe: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loginMethod, setLoginMethod] = useState('password'); // 'password', 'otp', 'sso', 'recovery'
    const [twoFactorCode, setTwoFactorCode] = useState('');
    const [step, setStep] = useState(1); // 1: credentials, 2: 2FA, 3: success

    const [ssoProviders] = useState([
        { id: 'google', name: 'Google', icon: <FaGoogle />, color: 'bg-red-500' },
        { id: 'microsoft', name: 'Microsoft', icon: <FaMicrosoft />, color: 'bg-blue-500' },
        { id: 'github', name: 'GitHub', icon: <FaGithub />, color: 'bg-gray-800' },
        { id: 'apple', name: 'Apple', icon: <FaApple />, color: 'bg-black' }
    ]);

    const [securityFeatures] = useState({
        mfaEnabled: true,
        biometricEnabled: false,
        passwordlessEnabled: true,
        ssoEnabled: true,
        riskBasedAuth: true
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        if (error) setError('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (!formData.username.trim() || !formData.password.trim()) {
            setError('Please enter both username and password');
            setIsLoading(false);
            return;
        }

        setTimeout(() => {
            if (formData.username === 'admin' && formData.password === 'admin123') {
                if (securityFeatures.mfaEnabled && step === 1) {
                    setStep(2);
                    setIsLoading(false);
                    setSuccess('Credentials verified. Please enter your 2FA code.');
                } else {
                    setStep(3);
                    setSuccess('Login successful! Redirecting...');

                    setTimeout(() => {
                        navigate('/dashboard');
                    }, 1500);
                }
            } else {
                setError('Invalid username or password. Please try again.');
                setIsLoading(false);
            }
        }, 1500);
    };

    const handleTwoFactorSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            if (twoFactorCode === '123456') {
                setStep(3);
                setSuccess('2FA verified! Redirecting...');

                setTimeout(() => {
                    navigate('/dashboard');
                }, 1500);
            } else {
                setError('Invalid 2FA code. Please try again.');
                setIsLoading(false);
            }
        }, 1000);
    };

    const handleSSOLogin = (provider) => {
        setIsLoading(true);
        setError('');

        setTimeout(() => {
            setSuccess(`Redirecting to ${provider.name} authentication...`);

            // Dans une vraie application, vous redirigeriez vers le fournisseur SSO
            // window.location.href = `/auth/sso/${provider.id}`;

            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
        }, 1000);
    };

    const handlePasswordReset = () => {
        setLoginMethod('recovery');
        setSuccess('Password reset instructions have been sent to your email.');
    };

    const handlePasswordlessLogin = () => {
        setIsLoading(true);
        setSuccess('Magic link sent to your email. Please check your inbox.');

        setTimeout(() => {
            navigate('/dashboard');
        }, 3000);
    };

    const renderLoginForm = () => {
        switch(step) {
            case 1:
                return (
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text flex items-center gap-2">
                                  <FaUser />
                                  Username or Email
                                </span>
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="username"
                                    className="input input-bordered w-full pl-10"
                                    placeholder="admin@example.com"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                    autoComplete="username"
                                />
                                <FaUser className="absolute left-3 top-3 opacity-50" />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text flex items-center gap-2">
                                  <FaLock />
                                  Password
                                </span>
                                <button
                                    type="button"
                                    className="label-text-alt link link-primary"
                                    onClick={handlePasswordReset}
                                >
                                    Forgot password?
                                </button>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className="input input-bordered w-full pl-10 pr-10"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                    autoComplete="current-password"
                                />
                                <FaLock className="absolute left-3 top-3 opacity-50" />
                                <button
                                    type="button"
                                    className="absolute right-3 top-3"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="label cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    className="checkbox checkbox-primary checkbox-sm"
                                    checked={formData.rememberMe}
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                />
                                <span className="label-text ml-2">Remember me</span>
                            </label>

                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} className="btn btn-ghost btn-sm">
                                    <FaCog />
                                    Security Options
                                </div>
                                <div className="dropdown-content z-50 p-2 shadow bg-base-100 rounded-box w-64">
                                    <div className="space-y-2">
                                        {securityFeatures.passwordlessEnabled && (
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-block btn-ghost justify-start"
                                                onClick={handlePasswordlessLogin}
                                            >
                                                <FaEnvelope />
                                                Passwordless Login
                                            </button>
                                        )}
                                        {securityFeatures.biometricEnabled && (
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-block btn-ghost justify-start"
                                            >
                                                <FaFingerprint />
                                                Biometric Login
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="loading loading-spinner loading-sm"></span>
                                    Authenticating...
                                </>
                            ) : (
                                <>
                                    <FaKey />
                                    Sign In
                                </>
                            )}
                        </button>
                    </form>
                );

            case 2:
                return (
                    <form onSubmit={handleTwoFactorSubmit} className="space-y-6">
                        <div className="text-center mb-4">
                            <div className="flex justify-center mb-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <FaShieldAlt className="text-primary text-3xl" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold">Two-Factor Authentication</h3>
                            <p className="text-base-content/70">
                                Enter the 6-digit code from your authenticator app
                            </p>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Verification Code</span>
                            </label>
                            <div className="flex gap-2">
                                {[...Array(6)].map((_, i) => (
                                    <input
                                        key={i}
                                        type="text"
                                        maxLength="1"
                                        className="input input-bordered w-full text-center text-2xl font-bold"
                                        onChange={(e) => {
                                            const codes = twoFactorCode.split('');
                                            codes[i] = e.target.value;
                                            setTwoFactorCode(codes.join(''));

                                            if (e.target.value && i < 5) {
                                                document.getElementById(`code-${i + 1}`)?.focus();
                                            }
                                        }}
                                        id={`code-${i}`}
                                        disabled={isLoading}
                                    />
                                ))}
                            </div>
                            <div className="text-xs opacity-70 mt-2">
                                <FaExclamationTriangle className="inline mr-1" />
                                Code expires in 30 seconds
                            </div>
                        </div>

                        <div className="space-y-3">
                            <button
                                type="button"
                                className="btn btn-sm btn-block btn-ghost"
                                onClick={() => setStep(1)}
                                disabled={isLoading}
                            >
                                ← Use different credentials
                            </button>

                            <button
                                type="button"
                                className="btn btn-sm btn-block btn-ghost"
                                onClick={() => {
                                    setSuccess('New code sent to your authenticator app.');
                                }}
                                disabled={isLoading}
                            >
                                <FaQrcode />
                                Get new code
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            disabled={isLoading || twoFactorCode.length !== 6}
                        >
                            {isLoading ? (
                                <>
                                    <span className="loading loading-spinner loading-sm"></span>
                                    Verifying...
                                </>
                            ) : (
                                <>
                                    <FaCheckCircle />
                                    Verify & Continue
                                </>
                            )}
                        </button>
                    </form>
                );

            case 3:
                return (
                    <div className="text-center space-y-6">
                        <div className="flex justify-center">
                            <div className="p-4 rounded-full bg-success/10 animate-pulse">
                                <FaCheckCircle className="text-success text-5xl" />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold">Login Successful!</h3>
                            <p className="text-base-content/70">
                                You are being redirected to the dashboard
                            </p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                                <span>Session established</span>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                                <span>Permissions loaded</span>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                                <span>Redirecting...</span>
                            </div>
                        </div>

                        <div className="progress progress-primary w-full"></div>
                    </div>
                );

            default:
                return null;
        }
    };

    // Rendu de la méthode de récupération
    const renderRecoveryForm = () => (
        <div className="space-y-6">
            <div className="text-center">
                <h3 className="text-2xl font-bold">Reset Password</h3>
                <p className="text-base-content/70">
                    Enter your email to receive reset instructions
                </p>
            </div>

            <form className="space-y-4">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email Address</span>
                    </label>
                    <input
                        type="email"
                        className="input input-bordered w-full"
                        placeholder="admin@example.com"
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Verification Method</span>
                    </label>
                    <select className="select select-bordered">
                        <option>Send reset link via email</option>
                        <option>Send verification code via SMS</option>
                    </select>
                </div>

                <div className="flex gap-3">
                    <button
                        type="button"
                        className="btn btn-ghost flex-1"
                        onClick={() => setLoginMethod('password')}
                    >
                        ← Back to login
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary flex-1"
                    >
                        Send Instructions
                    </button>
                </div>
            </form>
        </div>
    );

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
            <div className="absolute top-4 right-4">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} className="btn btn-ghost">
                        <FaGlobe />
                        Language
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>English</a></li>
                        <li><a>Français</a></li>
                        <li><a>Español</a></li>
                        <li><a>Deutsch</a></li>
                    </ul>
                </div>
            </div>

            <div className="w-full max-w-4xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="card bg-base-100 shadow-xl hidden lg:block">
                        <div className="card-body p-8">
                            <div className="text-center mb-8">
                                <div className="flex justify-center mb-4">
                                    <div className="p-3 rounded-full bg-gradient-to-br from-primary to-secondary">
                                        <FaShieldAlt className="text-white text-4xl" />
                                    </div>
                                </div>
                                <h1 className="text-3xl font-bold">SSO Admin Panel</h1>
                                <p className="text-base-content/70">
                                    Secure Single Sign-On Management
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-success/10">
                                        <FaCheckCircle className="text-success" />
                                    </div>
                                    <div>
                                        <div className="font-bold">Enterprise Security</div>
                                        <div className="text-sm opacity-70">Military-grade encryption</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-primary/10">
                                        <FaKey className="text-primary" />
                                    </div>
                                    <div>
                                        <div className="font-bold">Multi-Factor Auth</div>
                                        <div className="text-sm opacity-70">Enhanced account protection</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-secondary/10">
                                        <FaGlobe className="text-secondary" />
                                    </div>
                                    <div>
                                        <div className="font-bold">Multiple Realms</div>
                                        <div className="text-sm opacity-70">Separated authentication domains</div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-base-300">
                                <div className="stats shadow">
                                    <div className="stat">
                                        <div className="stat-title">Active Sessions</div>
                                        <div className="stat-value">342</div>
                                        <div className="stat-desc">Across all realms</div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 text-center">
                                <div className="flex items-center justify-center gap-2 text-sm opacity-70">
                                    <FaExclamationTriangle />
                                    <span>This system is monitored 24/7</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body p-8">
                            <div className="text-center mb-8">
                                <div className="flex justify-center mb-4">
                                    <div className={`p-3 rounded-full ${
                                        step === 1 ? 'bg-primary/10' :
                                            step === 2 ? 'bg-warning/10' :
                                                'bg-success/10'
                                    }`}>
                                        {step === 1 && <FaKey className="text-primary text-3xl" />}
                                        {step === 2 && <FaShieldAlt className="text-warning text-3xl" />}
                                        {step === 3 && <FaCheckCircle className="text-success text-3xl" />}
                                    </div>
                                </div>
                                <h2 className="text-2xl font-bold">
                                    {loginMethod === 'recovery' ? 'Password Recovery' : 'Sign In to Your Account'}
                                </h2>
                                <p className="text-base-content/70">
                                    {step === 1 && 'Enter your credentials to continue'}
                                    {step === 2 && 'Additional verification required'}
                                    {step === 3 && 'Authentication complete'}
                                    {loginMethod === 'recovery' && 'Recover access to your account'}
                                </p>
                            </div>

                            {step === 1 && loginMethod === 'password' && (
                                <div className="flex items-center justify-center mb-6">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 rounded-full bg-primary text-primary-content flex items-center justify-center">
                                            1
                                        </div>
                                        <div className="w-12 h-1 bg-primary"></div>
                                        <div className="w-8 h-8 rounded-full bg-base-300 flex items-center justify-center">
                                            2
                                        </div>
                                    </div>
                                    <div className="ml-4 text-sm">
                                        <div className="font-bold">Step 1 of 2</div>
                                        <div className="opacity-70">Credentials → 2FA</div>
                                    </div>
                                </div>
                            )}

                            {error && (
                                <div className="alert alert-error animate-pulse">
                                    <FaExclamationTriangle />
                                    <span>{error}</span>
                                </div>
                            )}

                            {success && (
                                <div className="alert alert-success">
                                    <FaCheckCircle />
                                    <span>{success}</span>
                                </div>
                            )}

                            <div className="py-4">
                                {loginMethod === 'recovery' ? renderRecoveryForm() : renderLoginForm()}
                            </div>

                            {step === 1 && loginMethod === 'password' && securityFeatures.ssoEnabled && (
                                <>
                                    <div className="divider">Or continue with</div>

                                    <div className="grid grid-cols-2 gap-3">
                                        {ssoProviders.map(provider => (
                                            <button
                                                key={provider.id}
                                                className={`btn btn-outline ${provider.color} border-${provider.color.split('-')[1]} text-${provider.color.split('-')[1]}`}
                                                onClick={() => handleSSOLogin(provider)}
                                                disabled={isLoading}
                                            >
                                                {provider.icon}
                                                {provider.name}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}

                            <div className="mt-8 pt-6 border-t border-base-300">
                                <div className="text-center space-y-3">
                                    {step === 1 && loginMethod === 'password' && (
                                        <>
                                            <div className="text-sm opacity-70">
                                                Don't have an account?{' '}
                                                <Link to="/register" className="link link-primary">
                                                    Request access
                                                </Link>
                                            </div>

                                            <div className="text-xs opacity-50">
                                                <FaExclamationTriangle className="inline mr-1" />
                                                By signing in, you agree to our{' '}
                                                <a href="/terms" className="link">Terms of Service</a> and{' '}
                                                <a href="/privacy" className="link">Privacy Policy</a>
                                            </div>
                                        </>
                                    )}

                                    {step === 1 && (
                                        <div className="flex justify-center gap-4">
                                            <button
                                                type="button"
                                                className={`btn btn-xs ${loginMethod === 'password' ? 'btn-primary' : 'btn-ghost'}`}
                                                onClick={() => setLoginMethod('password')}
                                            >
                                                Password
                                            </button>
                                            {securityFeatures.passwordlessEnabled && (
                                                <button
                                                    type="button"
                                                    className={`btn btn-xs ${loginMethod === 'passwordless' ? 'btn-primary' : 'btn-ghost'}`}
                                                    onClick={handlePasswordlessLogin}
                                                >
                                                    Passwordless
                                                </button>
                                            )}
                                            <button
                                                type="button"
                                                className={`btn btn-xs ${loginMethod === 'recovery' ? 'btn-primary' : 'btn-ghost'}`}
                                                onClick={() => setLoginMethod('recovery')}
                                            >
                                                Recovery
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6 p-3 bg-base-200 rounded-lg">
                                <div className="flex items-start gap-2">
                                    <FaShieldAlt className="text-success mt-1" />
                                    <div className="text-xs">
                                        <div className="font-bold">Security Status: Protected</div>
                                        <div className="opacity-70">
                                            Connection is encrypted using TLS 1.3 • Last security audit: Today 08:00
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-8 text-sm opacity-70">
                    <div className="flex flex-wrap justify-center gap-4 mb-2">
                        <a href="/help" className="link link-hover flex items-center gap-1">
                            <FaQuestionCircle />
                            Help Center
                        </a>
                        <a href="/support" className="link link-hover">Contact Support</a>
                        <a href="/status" className="link link-hover">System Status</a>
                        <a href="/docs" className="link link-hover">Documentation</a>
                    </div>
                    <div>
                        © 2024 SSO Admin Panel v2.4.1 •{' '}
                        <span className="font-mono">#{Math.random().toString(36).substr(2, 8).toUpperCase()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;