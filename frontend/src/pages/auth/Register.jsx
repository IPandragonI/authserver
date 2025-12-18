import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaBuilding,
    FaPhone,
    FaCheckCircle,
    FaTimesCircle,
    FaShieldAlt,
    FaGoogle,
    FaMicrosoft,
    FaGithub,
    FaApple,
    FaClipboardCheck,
    FaUserPlus,
    FaGlobe,
    FaKey,
    FaExclamationTriangle,
    FaQuestionCircle,
    FaArrowLeft,
    FaIdCard,
    FaMapMarkerAlt,
    FaIndustry,
    FaLanguage, FaArrowRight, FaCheck
} from 'react-icons/fa';

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        jobTitle: '',
        department: '',
        country: '',

        username: '',
        password: '',
        confirmPassword: '',

        preferredLanguage: 'en',
        communicationPrefs: {
            productUpdates: true,
            securityAlerts: true,
            newsletter: false,
            marketing: false
        },
        termsAccepted: false,
        privacyAccepted: false,

        accountType: 'individual', // 'individual', 'enterprise', 'partner'
        subscriptionPlan: 'free', // 'free', 'starter', 'professional', 'enterprise'
        enableMFA: true,
        autoVerify: false
    });

    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');
    const [inviteCode, setInviteCode] = useState('');
    const [verificationMethod, setVerificationMethod] = useState('email'); // 'email', 'sms', 'call'

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

    const [accountTypes] = useState([
        {id: 'individual', name: 'Individual Account', description: 'For personal or small team use'},
        {id: 'enterprise', name: 'Enterprise Account', description: 'For organizations with 50+ users'},
        {id: 'partner', name: 'Partner Account', description: 'For system integrators and resellers'}
    ]);

    const [subscriptionPlans] = useState([
        {
            id: 'free',
            name: 'Free Plan',
            users: 'Up to 10 users',
            price: '$0/mo',
            features: ['Basic SSO', '1 Realm', 'Community Support']
        },
        {
            id: 'starter',
            name: 'Starter',
            users: 'Up to 50 users',
            price: '$49/mo',
            features: ['Advanced SSO', '3 Realms', 'Email Support']
        },
        {
            id: 'professional',
            name: 'Professional',
            users: 'Up to 200 users',
            price: '$199/mo',
            features: ['Full SSO Suite', '10 Realms', 'Priority Support']
        },
        {
            id: 'enterprise',
            name: 'Enterprise',
            users: 'Unlimited users',
            price: 'Custom',
            features: ['Custom SSO', 'Unlimited Realms', '24/7 Support']
        }
    ]);

    const [countries] = useState([
        'United States', 'Canada', 'United Kingdom', 'France', 'Germany',
        'Australia', 'Japan', 'Singapore', 'India', 'Brazil'
    ]);

    const [languages] = useState([
        {code: 'en', name: 'English'},
        {code: 'fr', name: 'French'},
        {code: 'es', name: 'Spanish'},
        {code: 'de', name: 'German'},
        {code: 'ja', name: 'Japanese'}
    ]);

    const [ssoProviders] = useState([
        {id: 'google', name: 'Google', icon: <FaGoogle/>, color: 'bg-red-500'},
        {id: 'microsoft', name: 'Microsoft', icon: <FaMicrosoft/>, color: 'bg-blue-500'},
        {id: 'github', name: 'GitHub', icon: <FaGithub/>, color: 'bg-gray-800'},
        {id: 'apple', name: 'Apple', icon: <FaApple/>, color: 'bg-black'}
    ]);

    const validatePassword = (password) => {
        const criteria = {
            length: password.length >= 12,
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

        return criteria;
    };

    const handleInputChange = (e) => {
        const {name, value, type, checked} = e.target;

        if (name.startsWith('communicationPrefs.')) {
            const prefKey = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                communicationPrefs: {
                    ...prev.communicationPrefs,
                    [prefKey]: checked
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }

        if (name === 'password') {
            validatePassword(value);
        }

        if (errors[name]) {
            setErrors(prev => ({...prev, [name]: undefined}));
        }
    };

    const validateStep = (stepNumber) => {
        const newErrors = {};

        switch (stepNumber) {
            case 1:
                if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
                if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
                if (!formData.email.trim()) {
                    newErrors.email = 'Email is required';
                } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                    newErrors.email = 'Email is invalid';
                }
                if (!formData.company.trim()) newErrors.company = 'Company name is required';
                break;

            case 2:
                if (!formData.username.trim()) newErrors.username = 'Username is required';
                if (!formData.password) {
                    newErrors.password = 'Password is required';
                } else if (passwordStrength.score < 3) {
                    newErrors.password = 'Password is too weak';
                }
                if (formData.password !== formData.confirmPassword) {
                    newErrors.confirmPassword = 'Passwords do not match';
                }
                break;

            case 3:
                if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept the terms of service';
                if (!formData.privacyAccepted) newErrors.privacyAccepted = 'You must accept the privacy policy';
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (validateStep(step)) {
            setStep(step + 1);
        }
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateStep(3)) {
            return;
        }

        setIsLoading(true);
        setSuccess('');

        setTimeout(() => {
            setIsLoading(false);
            setSuccess('Account created successfully! Please check your email to verify your account.');

            setTimeout(() => {
                navigate('/login?registered=true');
            }, 3000);
        }, 2000);
    };

    const handleSSORegister = (provider) => {
        setIsLoading(true);
        setSuccess(`Redirecting to ${provider.name} for authentication...`);

        setTimeout(() => {
            navigate('/dashboard');
        }, 2000);
    };

    const checkEmailAvailability = () => {
        const fakeTakenEmails = ['admin@example.com', 'test@test.com'];

        if (fakeTakenEmails.includes(formData.email)) {
            setErrors(prev => ({...prev, email: 'This email is already registered'}));
        }
    };

    const generateUsername = () => {
        if (formData.firstName && formData.lastName) {
            const username = `${formData.firstName.toLowerCase()}.${formData.lastName.toLowerCase()}`;
            setFormData(prev => ({...prev, username}));
        }
    };

    const renderPasswordStrength = () => {
        const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
        const strengthColors = ['bg-error', 'bg-warning', 'bg-warning', 'bg-success', 'bg-success'];

        return (
            <div className="space-y-2">
                <div className="flex justify-between text-sm">
                    <span>Password Strength:</span>
                    <span className={`font-bold ${strengthColors[passwordStrength.score]?.replace('bg-', 'text-')}`}>
            {strengthLabels[passwordStrength.score]}
          </span>
                </div>

                <div className="progress progress-primary w-full">
                    <div
                        className="progress-bar"
                        style={{width: `${(passwordStrength.score / 4) * 100}%`}}
                    ></div>
                </div>

                <div className="space-y-1 text-xs">
                    {Object.entries(passwordStrength.criteria).map(([key, met]) => (
                        <div key={key} className="flex items-center gap-2">
                            {met ? (
                                <FaCheckCircle className="text-success"/>
                            ) : (
                                <FaTimesCircle className="text-error"/>
                            )}
                            <span className={met ? '' : 'opacity-50'}>
                {key === 'length' && 'At least 12 characters'}
                                {key === 'uppercase' && 'Contains uppercase letter'}
                                {key === 'lowercase' && 'Contains lowercase letter'}
                                {key === 'number' && 'Contains number'}
                                {key === 'special' && 'Contains special character'}
              </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderStep1 = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">First Name*</span>
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            name="firstName"
                            className={`input input-bordered w-full pl-10 ${errors.firstName ? 'input-error' : ''}`}
                            placeholder="John"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            onBlur={generateUsername}
                        />
                        <FaUser className="absolute left-3 top-3 opacity-50"/>
                    </div>
                    {errors.firstName && (
                        <div className="label-text-alt text-error">{errors.firstName}</div>
                    )}
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Last Name*</span>
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            name="lastName"
                            className={`input input-bordered w-full pl-10 ${errors.lastName ? 'input-error' : ''}`}
                            placeholder="Doe"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            onBlur={generateUsername}
                        />
                        <FaUser className="absolute left-3 top-3 opacity-50"/>
                    </div>
                    {errors.lastName && (
                        <div className="label-text-alt text-error">{errors.lastName}</div>
                    )}
                </div>
            </div>

            <div className="form-control">
                <label className="label">
          <span className="label-text flex items-center gap-2">
            <FaEnvelope/>
            Email Address*
          </span>
                </label>
                <div className="relative">
                    <input
                        type="email"
                        name="email"
                        className={`input input-bordered w-full pl-10 ${errors.email ? 'input-error' : ''}`}
                        placeholder="john.doe@company.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={checkEmailAvailability}
                    />
                    <FaEnvelope className="absolute left-3 top-3 opacity-50"/>
                </div>
                {errors.email ? (
                    <div className="label-text-alt text-error">{errors.email}</div>
                ) : (
                    <div className="label-text-alt opacity-70">
                        We'll send a verification link to this address
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                    <label className="label">
            <span className="label-text flex items-center gap-2">
              <FaPhone/>
              Phone Number
            </span>
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        className="input input-bordered w-full"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={handleInputChange}
                    />
                    <div className="label-text-alt opacity-70">
                        For account recovery and 2FA
                    </div>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Country</span>
                    </label>
                    <select
                        name="country"
                        className="select select-bordered w-full"
                        value={formData.country}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Country</option>
                        {countries.map(country => (
                            <option key={country} value={country}>{country}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="form-control">
                <label className="label">
          <span className="label-text flex items-center gap-2">
            <FaBuilding/>
            Company/Organization*
          </span>
                </label>
                <input
                    type="text"
                    name="company"
                    className={`input input-bordered w-full ${errors.company ? 'input-error' : ''}`}
                    placeholder="Acme Corporation"
                    value={formData.company}
                    onChange={handleInputChange}
                />
                {errors.company && (
                    <div className="label-text-alt text-error">{errors.company}</div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Title</span>
                    </label>
                    <input
                        type="text"
                        name="jobTitle"
                        className="input input-bordered w-full"
                        placeholder="System Administrator"
                        value={formData.jobTitle}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-control">
                    <label className="label">
            <span className="label-text flex items-center gap-2">
              <FaIndustry/>
              Department
            </span>
                    </label>
                    <input
                        type="text"
                        name="department"
                        className="input input-bordered w-full"
                        placeholder="IT Security"
                        value={formData.department}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Account Type</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {accountTypes.map(type => (
                        <div
                            key={type.id}
                            className={`card cursor-pointer ${
                                formData.accountType === type.id ? 'ring-2 ring-primary' : 'bg-base-200'
                            }`}
                            onClick={() => setFormData(prev => ({...prev, accountType: type.id}))}
                        >
                            <div className="card-body p-4">
                                <div className="font-bold">{type.name}</div>
                                <div className="text-xs opacity-70">{type.description}</div>
                                {formData.accountType === type.id && (
                                    <FaCheckCircle className="text-success mt-2"/>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-6">
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Username*</span>
                    <button
                        type="button"
                        className="label-text-alt link link-primary"
                        onClick={generateUsername}
                    >
                        Generate from name
                    </button>
                </label>
                <div className="relative">
                    <input
                        type="text"
                        name="username"
                        className={`input input-bordered w-full pl-10 ${errors.username ? 'input-error' : ''}`}
                        placeholder="john.doe"
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                    <FaUser className="absolute left-3 top-3 opacity-50"/>
                </div>
                {errors.username && (
                    <div className="label-text-alt text-error">{errors.username}</div>
                )}
                <div className="label-text-alt opacity-70">
                    Used for login and system identification
                </div>
            </div>

            <div className="form-control">
                <label className="label">
          <span className="label-text flex items-center gap-2">
            <FaLock/>
            Password*
          </span>
                </label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className={`input input-bordered w-full pl-10 pr-10 ${errors.password ? 'input-error' : ''}`}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    <FaLock className="absolute left-3 top-3 opacity-50"/>
                    <button
                        type="button"
                        className="absolute right-3 top-3"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEyeSlash/> : <FaEye/>}
                    </button>
                </div>
                {renderPasswordStrength()}
                {errors.password && (
                    <div className="label-text-alt text-error">{errors.password}</div>
                )}
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Confirm Password*</span>
                </label>
                <div className="relative">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        className={`input input-bordered w-full pl-10 pr-10 ${errors.confirmPassword ? 'input-error' : ''}`}
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                    />
                    <FaLock className="absolute left-3 top-3 opacity-50"/>
                    <button
                        type="button"
                        className="absolute right-3 top-3"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? <FaEyeSlash/> : <FaEye/>}
                    </button>
                </div>
                {errors.confirmPassword && (
                    <div className="label-text-alt text-error">{errors.confirmPassword}</div>
                )}
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Subscription Plan</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {subscriptionPlans.map(plan => (
                        <div
                            key={plan.id}
                            className={`card cursor-pointer ${
                                formData.subscriptionPlan === plan.id ? 'ring-2 ring-primary' : 'bg-base-200'
                            }`}
                            onClick={() => setFormData(prev => ({...prev, subscriptionPlan: plan.id}))}
                        >
                            <div className="card-body p-4">
                                <div className="font-bold">{plan.name}</div>
                                <div className="text-lg font-bold my-2">{plan.price}</div>
                                <div className="text-xs opacity-70 mb-2">{plan.users}</div>
                                <ul className="text-xs space-y-1">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx}>✓ {feature}</li>
                                    ))}
                                </ul>
                                {formData.subscriptionPlan === plan.id && (
                                    <FaCheckCircle className="text-success mt-2"/>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="label-text-alt opacity-70 mt-2">
                    You can upgrade or downgrade your plan at any time
                </div>
            </div>

            <div className="space-y-3">
                <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-3">
                        <input
                            type="checkbox"
                            name="enableMFA"
                            className="toggle toggle-primary"
                            checked={formData.enableMFA}
                            onChange={handleInputChange}
                        />
                        <div>
                            <div className="font-medium flex items-center gap-2">
                                <FaShieldAlt/>
                                Enable Two-Factor Authentication
                            </div>
                            <div className="text-sm opacity-70">
                                Add an extra layer of security to your account
                            </div>
                        </div>
                    </label>
                </div>

                <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-3">
                        <input
                            type="checkbox"
                            name="autoVerify"
                            className="toggle toggle-primary"
                            checked={formData.autoVerify}
                            onChange={handleInputChange}
                        />
                        <div>
                            <div className="font-medium">Auto-verify Account</div>
                            <div className="text-sm opacity-70">
                                Skip email verification (for demo purposes only)
                            </div>
                        </div>
                    </label>
                </div>
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="space-y-6">
            <div className="form-control">
                <label className="label">
          <span className="label-text flex items-center gap-2">
            <FaLanguage/>
            Preferred Language
          </span>
                </label>
                <select
                    name="preferredLanguage"
                    className="select select-bordered w-full"
                    value={formData.preferredLanguage}
                    onChange={handleInputChange}
                >
                    {languages.map(lang => (
                        <option key={lang.code} value={lang.code}>{lang.name}</option>
                    ))}
                </select>
            </div>

            <div className="space-y-4">
                <h4 className="font-bold">Communication Preferences</h4>
                <div className="space-y-2">
                    {Object.entries(formData.communicationPrefs).map(([key, value]) => (
                        <div key={key} className="form-control">
                            <label className="label cursor-pointer justify-start gap-3">
                                <input
                                    type="checkbox"
                                    name={`communicationPrefs.${key}`}
                                    className="checkbox checkbox-primary"
                                    checked={value}
                                    onChange={handleInputChange}
                                />
                                <div className="font-medium capitalize">
                                    {key === 'productUpdates' && 'Product Updates & Release Notes'}
                                    {key === 'securityAlerts' && 'Security Alerts & Notifications'}
                                    {key === 'newsletter' && 'Monthly Newsletter'}
                                    {key === 'marketing' && 'Marketing Communications'}
                                </div>
                            </label>
                        </div>
                    ))}
                </div>
                <div className="text-sm opacity-70">
                    You can change these preferences at any time in your account settings
                </div>
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Invitation Code (Optional)</span>
                </label>
                <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Enter invitation code if you have one"
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value)}
                />
                <div className="label-text-alt opacity-70">
                    Required for certain enterprise accounts
                </div>
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Verification Method</span>
                </label>
                <div className="flex gap-3">
                    {['email', 'sms', 'call'].map(method => (
                        <button
                            key={method}
                            type="button"
                            className={`btn btn-sm capitalize ${verificationMethod === method ? 'btn-primary' : 'btn-ghost'}`}
                            onClick={() => setVerificationMethod(method)}
                        >
                            {method === 'email' && <FaEnvelope/>}
                            {method === 'sms' && <FaPhone/>}
                            {method === 'call' && <FaPhone/>}
                            {method}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-3">
                        <input
                            type="checkbox"
                            name="termsAccepted"
                            className="checkbox checkbox-primary"
                            checked={formData.termsAccepted}
                            onChange={handleInputChange}
                        />
                        <div>
                            <div className="font-medium">I agree to the Terms of Service*</div>
                            {errors.termsAccepted && (
                                <div className="label-text-alt text-error">{errors.termsAccepted}</div>
                            )}
                        </div>
                    </label>
                </div>

                <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-3">
                        <input
                            type="checkbox"
                            name="privacyAccepted"
                            className="checkbox checkbox-primary"
                            checked={formData.privacyAccepted}
                            onChange={handleInputChange}
                        />
                        <div>
                            <div className="font-medium">I agree to the Privacy Policy*</div>
                            {errors.privacyAccepted && (
                                <div className="label-text-alt text-error">{errors.privacyAccepted}</div>
                            )}
                        </div>
                    </label>
                </div>

                <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-3">
                        <input
                            type="checkbox"
                            className="checkbox checkbox-primary"
                            defaultChecked
                        />
                        <div className="text-sm opacity-70">
                            I understand that this is a demo system and no real account will be created
                        </div>
                    </label>
                </div>
            </div>

            <div className="card bg-base-200">
                <div className="card-body p-4">
                    <h5 className="font-bold mb-3">Account Summary</h5>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="opacity-70">Account Type:</span>
                            <span className="font-medium">{formData.accountType}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="opacity-70">Plan:</span>
                            <span className="font-medium">
                             {subscriptionPlans.find(p => p.id === formData.subscriptionPlan)?.name}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="opacity-70">2FA:</span>
                            <span className="font-medium">{formData.enableMFA ? 'Enabled' : 'Disabled'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="opacity-70">Users:</span>
                            <span className="font-medium">
                                {subscriptionPlans.find(p => p.id === formData.subscriptionPlan)?.users}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderForm = () => {
        switch (step) {
            case 1:
                return renderStep1();
            case 2:
                return renderStep2();
            case 3:
                return renderStep3();
            default:
                return null;
        }
    };

    const renderProgress = () => {
        const steps = [
            {number: 1, label: 'Personal Info'},
            {number: 2, label: 'Account Setup'},
            {number: 3, label: 'Preferences'}
        ];

        return (
            <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    {steps.map((stepItem, index) => (
                        <div key={stepItem.number} className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                step === stepItem.number
                                    ? 'bg-primary text-primary-content'
                                    : step > stepItem.number
                                        ? 'bg-success text-success-content'
                                        : 'bg-base-300'
                            }`}>
                                {step > stepItem.number ? <FaCheckCircle/> : stepItem.number}
                            </div>
                            <div className="text-xs mt-2 text-center">{stepItem.label}</div>
                        </div>
                    ))}
                </div>
                <div className="progress progress-primary w-full">
                    <div
                        className="progress-bar"
                        style={{width: `${((step - 1) / 2) * 100}%`}}
                    ></div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="card bg-base-100 shadow-xl hidden lg:block">
                        <div className="card-body p-8">
                            <div className="text-center mb-8">
                                <div className="flex justify-center mb-4">
                                    <div className="p-3 rounded-full bg-gradient-to-br from-primary to-secondary">
                                        <FaUserPlus className="text-white text-4xl"/>
                                    </div>
                                </div>
                                <h1 className="text-3xl font-bold">Join SSO Admin</h1>
                                <p className="text-base-content/70">
                                    Start managing your authentication infrastructure
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-success/10">
                                        <FaCheckCircle className="text-success"/>
                                    </div>
                                    <div>
                                        <div className="font-bold">Free 14-Day Trial</div>
                                        <div className="text-sm opacity-70">All features included, no credit card
                                            required
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-primary/10">
                                        <FaShieldAlt className="text-primary"/>
                                    </div>
                                    <div>
                                        <div className="font-bold">Enterprise Security</div>
                                        <div className="text-sm opacity-70">SOC 2 compliant, GDPR ready</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-secondary/10">
                                        <FaGlobe className="text-secondary"/>
                                    </div>
                                    <div>
                                        <div className="font-bold">Global Infrastructure</div>
                                        <div className="text-sm opacity-70">Data centers in US, EU, and Asia</div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-base-300">
                                <h4 className="font-bold mb-4">What You'll Get</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2">
                                        <FaCheckCircle className="text-success"/>
                                        <span>Unlimited SSO connections</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <FaCheckCircle className="text-success"/>
                                        <span>Multi-factor authentication</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <FaCheckCircle className="text-success"/>
                                        <span>Advanced user management</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <FaCheckCircle className="text-success"/>
                                        <span>Comprehensive audit logs</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <FaCheckCircle className="text-success"/>
                                        <span>24/7 support during trial</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="mt-8 text-center">
                                <div className="stats shadow">
                                    <div className="stat">
                                        <div className="stat-title">Trusted by</div>
                                        <div className="stat-value">5000+</div>
                                        <div className="stat-desc">Companies worldwide</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body p-8">
                            <div className="text-center mb-6">
                                <h2 className="text-2xl font-bold">
                                    {step === 1 && 'Create Your Account'}
                                    {step === 2 && 'Account Security'}
                                    {step === 3 && 'Finalize Registration'}
                                </h2>
                                <p className="text-base-content/70">
                                    {step === 1 && 'Tell us about yourself'}
                                    {step === 2 && 'Secure your account'}
                                    {step === 3 && 'Review and complete'}
                                </p>
                            </div>

                            {renderProgress()}

                            {success && (
                                <div className="alert alert-success mb-4 animate-pulse">
                                    <FaCheckCircle/>
                                    <span>{success}</span>
                                </div>
                            )}
                            {errors && (
                                <div className="alert alert-error mb-4 animate-shake">
                                    <FaExclamationTriangle/>
                                    <span>Please fix the errors below and try again.</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                {renderForm()}
                                <div className="mt-8 flex justify-between">
                                    {step > 1 ? (
                                        <button
                                            type="button"
                                            className="btn btn-ghost"
                                            onClick={() => setStep(prev => prev - 1)}
                                        >
                                            <FaArrowLeft className="mr-2"/>
                                            Back
                                        </button>
                                    ) : <div></div>}
                                    {step < 3 ? (
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() => {
                                                if (validateStep()) {
                                                    setStep(prev => prev + 1);
                                                }
                                            }}
                                        >
                                            Next
                                            <FaArrowRight className="ml-2"/>
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <span className="loading loading-spinner mr-2"></span>
                                                    Creating Account...
                                                </>
                                            ) : (
                                                <>
                                                    Complete Registration
                                                    <FaCheck className="ml-2"/>
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Register;