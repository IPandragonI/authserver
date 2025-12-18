import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    FaShieldAlt,
    FaLock,
    FaUsers,
    FaRocket,
    FaChartLine,
    FaCheckCircle,
    FaGlobe,
    FaBuilding,
    FaMobileAlt,
    FaCloud,
    FaServer,
    FaCertificate,
    FaHandshake,
    FaClock,
    FaCogs,
    FaBell,
    FaKey,
    FaIdCard,
    FaNetworkWired,
    FaPlug,
    FaDatabase,
    FaCode,
    FaDesktop,
    FaArrowRight,
    FaStar,
    FaMedal,
    FaAward,
    FaRegSmile,
    FaChevronRight, FaMicrosoft, FaGoogle, FaSlack, FaSalesforce, FaGithub, FaAws
} from 'react-icons/fa';

const Home = () => {
    const [activeFeature, setActiveFeature] = useState(0);

    const features = [
        {
            id: 0,
            title: "Single Sign-On (SSO)",
            description: "Allow your users to access all applications with one set of credentials. Reduce password fatigue and improve security.",
            icon: <FaKey className="text-3xl text-primary" />,
            benefits: ["One-click access", "Centralized control", "Improved security"]
        },
        {
            id: 1,
            title: "Multi-Factor Authentication",
            description: "Add an extra layer of security with MFA. Support for SMS, authenticator apps, biometrics, and hardware tokens.",
            icon: <FaLock className="text-3xl text-success" />,
            benefits: ["Enhanced security", "Flexible methods", "Compliance ready"]
        },
        {
            id: 2,
            title: "Identity Management",
            description: "Centralized user lifecycle management. Automate provisioning, deprovisioning, and role-based access control.",
            icon: <FaUsers className="text-3xl text-info" />,
            benefits: ["Automated workflows", "Role-based access", "Audit trails"]
        },
        {
            id: 3,
            title: "API Access Management",
            description: "Secure your APIs with OAuth 2.0 and OpenID Connect. Control and monitor API access across your ecosystem.",
            icon: <FaCode className="text-3xl text-warning" />,
            benefits: ["Secure APIs", "Scalable architecture", "Real-time monitoring"]
        }
    ];

    const testimonials = [
        {
            name: "Alex Johnson",
            role: "CTO, TechCorp Solutions",
            content: "Implemented in just 2 weeks. Our user satisfaction increased by 40% and security incidents dropped by 85%.",
            rating: 5,
            company: "TechCorp"
        },
        {
            name: "Maria Garcia",
            role: "Security Director, HealthPlus",
            content: "The compliance features saved us hundreds of audit hours. HIPAA compliance has never been easier.",
            rating: 5,
            company: "HealthPlus"
        },
        {
            name: "David Chen",
            role: "VP Engineering, FinTech Pro",
            content: "Scaled from 100 to 10,000 users seamlessly. The API integration was flawless with our existing systems.",
            rating: 5,
            company: "FinTech Pro"
        }
    ];

    const integrations = [
        { name: "Microsoft Azure AD", icon: <FaMicrosoft />, color: "bg-blue-100 text-blue-600" },
        { name: "Google Workspace", icon: <FaGoogle />, color: "bg-red-100 text-red-600" },
        { name: "Slack", icon: <FaSlack />, color: "bg-purple-100 text-purple-600" },
        { name: "Salesforce", icon: <FaSalesforce />, color: "bg-blue-100 text-blue-900" },
        { name: "GitHub", icon: <FaGithub />, color: "bg-gray-100 text-gray-800" },
        { name: "AWS", icon: <FaAws />, color: "bg-orange-100 text-orange-600" }
    ];

    return (
        <div className="min-h-screen">
            <div className="hero bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10">
                <div className="hero-content text-center py-20">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10">
                            <FaShieldAlt className="text-primary" />
                            <span className="text-sm font-semibold">Enterprise Grade Identity Management</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            Secure Identity Management
                            <span className="block text-primary mt-2">Made Simple</span>
                        </h1>

                        <p className="text-xl opacity-80 mb-10 max-w-3xl mx-auto">
                            A comprehensive SSO and identity platform that simplifies access management,
                            enhances security, and improves user experience across all your applications.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                            <Link to="/demo" className="btn btn-primary btn-lg">
                                <FaRocket className="mr-2" />
                                Start Free Trial
                            </Link>
                            <Link to="/contact" className="btn btn-outline btn-lg">
                                <FaHandshake className="mr-2" />
                                Schedule Demo
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary">99.9%</div>
                                <div className="text-sm opacity-70">Uptime</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-success">500+</div>
                                <div className="text-sm opacity-70">Companies</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-info">1M+</div>
                                <div className="text-sm opacity-70">Users</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-warning">24/7</div>
                                <div className="text-sm opacity-70">Support</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-20 bg-base-100">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Everything You Need in One Platform</h2>
                        <p className="text-xl opacity-70 max-w-3xl mx-auto">
                            From SSO to advanced security features, we've built the most comprehensive
                            identity platform for modern enterprises.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                        <div className="space-y-6">
                            {features.map((feature, index) => (
                                <div
                                    key={feature.id}
                                    className={`card cursor-pointer transition-all duration-300 ${
                                        activeFeature === index
                                            ? 'card-bordered border-primary shadow-lg'
                                            : 'hover:shadow-md'
                                    }`}
                                    onClick={() => setActiveFeature(index)}
                                >
                                    <div className="card-body">
                                        <div className="flex items-start gap-4">
                                            {feature.icon}
                                            <div className="flex-1">
                                                <h3 className="card-title text-xl">{feature.title}</h3>
                                                <p className="opacity-80">{feature.description}</p>
                                                <div className="flex flex-wrap gap-2 mt-3">
                                                    {feature.benefits.map((benefit, i) => (
                                                        <span key={i} className="badge badge-outline">
                                                            <FaCheckCircle className="mr-1 text-success" />
                                                            {benefit}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <FaChevronRight className={`transition-transform ${
                                                activeFeature === index ? 'rotate-90' : ''
                                            }`} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="card bg-gradient-to-br from-primary/5 to-secondary/5 border border-base-300">
                            <div className="card-body flex flex-col items-center justify-center h-full">
                                <div className="text-center p-8">
                                    {features[activeFeature].icon}
                                    <h3 className="text-2xl font-bold mt-6 mb-4">
                                        {features[activeFeature].title}
                                    </h3>
                                    <p className="text-lg opacity-80 mb-8">
                                        {features[activeFeature].description}
                                    </p>
                                    <div className="space-y-3">
                                        {features[activeFeature].benefits.map((benefit, index) => (
                                            <div key={index} className="flex items-center gap-3">
                                                <FaCheckCircle className="text-success" />
                                                <span className="font-medium">{benefit}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <button className="btn btn-primary mt-8">
                                        Learn More
                                        <FaArrowRight className="ml-2" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="card bg-base-100 border border-base-300 hover:shadow-lg transition-shadow">
                            <div className="card-body items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-info/10 flex items-center justify-center mb-4">
                                    <FaCertificate className="text-2xl text-info" />
                                </div>
                                <h4 className="card-title">SOC 2 Compliant</h4>
                                <p className="text-sm opacity-70">Enterprise-grade security and compliance standards</p>
                            </div>
                        </div>
                        <div className="card bg-base-100 border border-base-300 hover:shadow-lg transition-shadow">
                            <div className="card-body items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
                                    <FaGlobe className="text-2xl text-success" />
                                </div>
                                <h4 className="card-title">Global Infrastructure</h4>
                                <p className="text-sm opacity-70">Data centers across 5 continents for low latency</p>
                            </div>
                        </div>
                        <div className="card bg-base-100 border border-base-300 hover:shadow-lg transition-shadow">
                            <div className="card-body items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center mb-4">
                                    <FaCogs className="text-2xl text-warning" />
                                </div>
                                <h4 className="card-title">Easy Integration</h4>
                                <p className="text-sm opacity-70">Pre-built connectors and flexible APIs</p>
                            </div>
                        </div>
                        <div className="card bg-base-100 border border-base-300 hover:shadow-lg transition-shadow">
                            <div className="card-body items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                    <FaChartLine className="text-2xl text-primary" />
                                </div>
                                <h4 className="card-title">Real-time Analytics</h4>
                                <p className="text-sm opacity-70">Comprehensive dashboards and reporting</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-20 bg-base-200">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">Trusted by Industry Leaders</h2>
                        <p className="text-xl opacity-70 max-w-3xl mx-auto">
                            Join thousands of companies that trust our platform for their identity management needs.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="card bg-base-100 border border-base-300 hover:shadow-xl transition-shadow">
                                <div className="card-body">
                                    <div className="flex items-center gap-2 mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <FaStar key={i} className="text-warning" />
                                        ))}
                                    </div>
                                    <p className="italic mb-6">"{testimonial.content}"</p>
                                    <div className="flex items-center gap-4">
                                        <div className="avatar placeholder">
                                            <div className="bg-primary text-primary-content rounded-full w-12">
                                                <span>{testimonial.name.charAt(0)}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-bold">{testimonial.name}</h4>
                                            <p className="text-sm opacity-70">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap justify-center items-center gap-12 opacity-70">
                        <FaAward className="text-4xl" />
                        <FaMedal className="text-4xl" />
                        <FaRegSmile className="text-4xl" />
                        <FaBuilding className="text-4xl" />
                        <FaShieldAlt className="text-4xl" />
                    </div>
                </div>
            </div>

            <div className="py-20 bg-gradient-to-r from-primary to-secondary text-primary-content">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Identity Management?</h2>
                    <p className="text-xl mb-10 max-w-2xl mx-auto">
                        Start your free 14-day trial. No credit card required. Get started in minutes.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/auth/register" className="btn btn-lg btn-accent text-accent-content">
                            <FaRocket className="mr-2" />
                            Start Free Trial
                        </Link>
                        <Link to="/contact" className="btn btn-lg btn-outline btn-primary-content">
                            <FaHandshake className="mr-2" />
                            Contact Sales
                        </Link>
                    </div>
                    <p className="mt-8 text-sm opacity-90">
                        Need help deciding? <Link to="/compare" className="underline hover:opacity-80">Compare plans</Link>
                    </p>
                </div>
            </div>

            <div className="py-12 bg-base-100 border-t border-base-300">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <FaShieldAlt className="text-2xl text-primary" />
                                <span className="text-xl font-bold">IdentityPro</span>
                            </div>
                            <p className="text-sm opacity-70">
                                Enterprise-grade identity and access management platform for modern organizations.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Product</h4>
                            <ul className="space-y-2">
                                <li><Link to="/features" className="link link-hover">Features</Link></li>
                                <li><Link to="/pricing" className="link link-hover">Pricing</Link></li>
                                <li><Link to="/integrations" className="link link-hover">Integrations</Link></li>
                                <li><Link to="/roadmap" className="link link-hover">Roadmap</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Resources</h4>
                            <ul className="space-y-2">
                                <li><Link to="/docs" className="link link-hover">Documentation</Link></li>
                                <li><Link to="/blog" className="link link-hover">Blog</Link></li>
                                <li><Link to="/support" className="link link-hover">Support</Link></li>
                                <li><Link to="/community" className="link link-hover">Community</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Company</h4>
                            <ul className="space-y-2">
                                <li><Link to="/about" className="link link-hover">About Us</Link></li>
                                <li><Link to="/careers" className="link link-hover">Careers</Link></li>
                                <li><Link to="/contact" className="link link-hover">Contact</Link></li>
                                <li><Link to="/privacy" className="link link-hover">Privacy Policy</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-base-300 mt-8 pt-8 text-center text-sm opacity-70">
                        <p>© {new Date().getFullYear()} IdentityPro. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;