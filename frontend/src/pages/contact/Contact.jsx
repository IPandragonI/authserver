import { useState } from 'react';
import {
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaClock,
    FaUser,
    FaBuilding,
    FaPaperPlane,
    FaCheckCircle,
    FaExclamationTriangle,
    FaHeadset,
    FaComments,
    FaFileAlt,
    FaStar,
    FaLinkedin,
    FaTwitter,
    FaFacebook,
    FaYoutube,
    FaInstagram,
    FaGlobe,
    FaWhatsapp,
    FaVideo,
    FaCalendar,
    FaLifeRing,
    FaShieldAlt,
    FaLock, FaHandshake, FaQuestionCircle
} from 'react-icons/fa';

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        phone: '',
        subject: '',
        message: '',
        department: 'general',
        urgency: 'normal',
        consent: false,
        subscribe: false
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [activeTab, setActiveTab] = useState('contact'); // 'contact', 'support', 'sales'
    const [selectedTopic, setSelectedTopic] = useState('');

    const departments = [
        { value: 'general', label: 'General Inquiry', icon: <FaEnvelope /> },
        { value: 'sales', label: 'Sales', icon: <FaBuilding /> },
        { value: 'support', label: 'Technical Support', icon: <FaHeadset /> },
        { value: 'billing', label: 'Billing', icon: <FaFileAlt /> },
        { value: 'security', label: 'Security', icon: <FaShieldAlt /> },
        { value: 'partnership', label: 'Partnership', icon: <FaHandshake /> }
    ];

    const urgencyLevels = [
        { value: 'low', label: 'Low', color: 'badge-success' },
        { value: 'normal', label: 'Normal', color: 'badge-info' },
        { value: 'high', label: 'High', color: 'badge-warning' },
        { value: 'critical', label: 'Critical', color: 'badge-error' }
    ];

    const topics = [
        'SSO Configuration',
        'API Integration',
        'Security Audit',
        'Pricing Inquiry',
        'Custom Development',
        'Training Request',
        'Feature Request',
        'Bug Report',
        'Compliance Questions',
        'Migration Assistance'
    ];

    const contactInfo = {
        email: {
            primary: 'contact@ssopro.com',
            sales: 'sales@ssopro.com',
            support: 'support@ssopro.com',
            security: 'security@ssopro.com'
        },
        phone: {
            primary: '+1 (555) 123-4567',
            tollFree: '1-800-SSO-PRO',
            support: '+1 (555) 987-6543'
        },
        address: {
            street: '123 Security Blvd',
            city: 'San Francisco',
            state: 'CA',
            zip: '94107',
            country: 'United States'
        },
        hours: {
            support: '24/7',
            sales: 'Mon-Fri, 9AM-6PM PST',
            office: 'Mon-Fri, 8AM-5PM PST'
        }
    };

    const supportTiers = [
        {
            level: 'Basic',
            responseTime: '24 hours',
            availability: 'Business hours',
            features: ['Email support', 'Documentation', 'Community forums'],
            price: 'Free'
        },
        {
            level: 'Professional',
            responseTime: '8 hours',
            availability: '16/5',
            features: ['Priority email', 'Phone support', 'SLA 99.5%'],
            price: '$99/month'
        },
        {
            level: 'Enterprise',
            responseTime: '1 hour',
            availability: '24/7',
            features: ['Dedicated manager', 'On-call engineer', 'SLA 99.9%'],
            price: 'Custom'
        }
    ];

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);

            // Reset form after success
            setTimeout(() => {
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    company: '',
                    phone: '',
                    subject: '',
                    message: '',
                    department: 'general',
                    urgency: 'normal',
                    consent: false,
                    subscribe: false
                });
                setIsSubmitted(false);
            }, 5000);
        }, 2000);
    };

    const handleTopicSelect = (topic) => {
        setSelectedTopic(topic);
        setFormData(prev => ({ ...prev, subject: topic }));
    };

    return (
        <div className="min-h-screen bg-base-100">
            {/* Hero Section */}
            <div className="hero bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
                <div className="hero-content text-center">
                    <div className="max-w-4xl">
                        <h1 className="text-5xl font-bold mb-6">
                            Get in <span className="text-primary">Touch</span>
                        </h1>
                        <p className="text-xl opacity-80 mb-8">
                            We're here to help with your identity and access management needs.
                            Whether you need technical support, sales information, or just want to chat.
                        </p>

                        {/* Quick Contact Bar */}
                        <div className="flex flex-wrap justify-center gap-6 mb-8">
                            <a href={`tel:${contactInfo.phone.primary}`} className="btn btn-outline">
                                <FaPhone />
                                Call Now
                            </a>
                            <a href={`mailto:${contactInfo.email.primary}`} className="btn btn-outline">
                                <FaEnvelope />
                                Email Us
                            </a>
                            <button className="btn btn-outline">
                                <FaWhatsapp />
                                WhatsApp
                            </button>
                            <button className="btn btn-outline">
                                <FaVideo />
                                Schedule Call
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                {/* Tabs Navigation */}
                <div className="tabs tabs-boxed justify-center mb-12">
                    <button
                        className={`tab tab-lg ${activeTab === 'contact' ? 'tab-active' : ''}`}
                        onClick={() => setActiveTab('contact')}
                    >
                        <FaEnvelope className="mr-2" />
                        Contact Form
                    </button>
                    <button
                        className={`tab tab-lg ${activeTab === 'support' ? 'tab-active' : ''}`}
                        onClick={() => setActiveTab('support')}
                    >
                        <FaHeadset className="mr-2" />
                        Support
                    </button>
                    <button
                        className={`tab tab-lg ${activeTab === 'sales' ? 'tab-active' : ''}`}
                        onClick={() => setActiveTab('sales')}
                    >
                        <FaBuilding className="mr-2" />
                        Sales
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Contact Info */}
                    <div className="space-y-8">
                        {/* Contact Cards */}
                        <div className="card bg-base-100 border border-base-300">
                            <div className="card-body">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 rounded-full bg-primary/10">
                                        <FaEnvelope className="text-primary text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="card-title">Email</h3>
                                        <p className="text-sm opacity-70">Get in touch via email</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {Object.entries(contactInfo.email).map(([key, value]) => (
                                        <div key={key} className="flex justify-between items-center p-2 hover:bg-base-200 rounded">
                                            <div className="flex items-center gap-2">
                                                <FaEnvelope className="opacity-50" />
                                                <span className="capitalize">{key}</span>
                                            </div>
                                            <a href={`mailto:${value}`} className="link link-primary">
                                                {value}
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="card bg-base-100 border border-base-300">
                            <div className="card-body">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 rounded-full bg-success/10">
                                        <FaPhone className="text-success text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="card-title">Phone</h3>
                                        <p className="text-sm opacity-70">Call our team directly</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {Object.entries(contactInfo.phone).map(([key, value]) => (
                                        <div key={key} className="flex justify-between items-center p-2 hover:bg-base-200 rounded">
                                            <div className="flex items-center gap-2">
                                                <FaPhone className="opacity-50" />
                                                <span className="capitalize">{key}</span>
                                            </div>
                                            <a href={`tel:${value}`} className="link link-primary">
                                                {value}
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="card bg-base-100 border border-base-300">
                            <div className="card-body">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 rounded-full bg-info/10">
                                        <FaMapMarkerAlt className="text-info text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="card-title">Location</h3>
                                        <p className="text-sm opacity-70">Visit our headquarters</p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-start gap-2">
                                        <FaMapMarkerAlt className="mt-1 opacity-50" />
                                        <div>
                                            <p>{contactInfo.address.street}</p>
                                            <p>{contactInfo.address.city}, {contactInfo.address.state} {contactInfo.address.zip}</p>
                                            <p>{contactInfo.address.country}</p>
                                        </div>
                                    </div>

                                    <div className="divider my-4"></div>

                                    <div className="space-y-3">
                                        {Object.entries(contactInfo.hours).map(([key, value]) => (
                                            <div key={key} className="flex justify-between items-center">
                                                <div className="flex items-center gap-2">
                                                    <FaClock className="opacity-50" />
                                                    <span className="capitalize">{key}</span>
                                                </div>
                                                <span className="font-medium">{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Emergency Contact */}
                        <div className="card bg-error/10 border border-error/20">
                            <div className="card-body">
                                <div className="flex items-center gap-3 mb-4">
                                    <FaExclamationTriangle className="text-error text-xl" />
                                    <h3 className="card-title">Emergency Contact</h3>
                                </div>
                                <p className="text-sm mb-4">
                                    For critical security incidents or system outages
                                </p>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span>Security Hotline:</span>
                                        <a href="tel:+1-555-EMERGENCY" className="link link-error font-bold">
                                            +1 (555) EMERGENCY
                                        </a>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>On-call Engineer:</span>
                                        <span className="font-bold">24/7 Available</span>
                                    </div>
                                </div>
                                <div className="mt-4 text-xs opacity-70">
                                    <FaLock className="inline mr-1" />
                                    All emergency communications are encrypted and logged
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Middle Column - Contact Form */}
                    <div className="lg:col-span-2">
                        {activeTab === 'contact' && (
                            <div className="card bg-base-100 border border-base-300">
                                <div className="card-body">
                                    {isSubmitted ? (
                                        <div className="text-center py-12">
                                            <div className="flex justify-center mb-6">
                                                <div className="p-4 rounded-full bg-success/10">
                                                    <FaCheckCircle className="text-success text-5xl" />
                                                </div>
                                            </div>
                                            <h3 className="text-2xl font-bold mb-4">Message Sent Successfully!</h3>
                                            <p className="text-lg opacity-80 mb-6">
                                                Thank you for contacting us. We'll get back to you within 24 hours.
                                            </p>
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-center gap-2">
                                                    <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                                                    <span>Ticket created: #{Math.random().toString(36).substr(2, 8).toUpperCase()}</span>
                                                </div>
                                                <div className="flex items-center justify-center gap-2">
                                                    <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                                                    <span>Confirmation email sent to {formData.email}</span>
                                                </div>
                                                <div className="flex items-center justify-center gap-2">
                                                    <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                                                    <span>Response time: {formData.urgency === 'critical' ? '1 hour' : '24 hours'}</span>
                                                </div>
                                            </div>
                                            <button
                                                className="btn btn-primary mt-8"
                                                onClick={() => setIsSubmitted(false)}
                                            >
                                                Send Another Message
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <h2 className="text-2xl font-bold mb-2">Send us a Message</h2>
                                            <p className="text-base-content/70 mb-8">
                                                Fill out the form below and our team will respond as soon as possible.
                                            </p>

                                            <form onSubmit={handleSubmit} className="space-y-6">
                                                {/* Department Selection */}
                                                <div>
                                                    <label className="label">
                                                        <span className="label-text font-medium">Department</span>
                                                    </label>
                                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                                        {departments.map(dept => (
                                                            <button
                                                                key={dept.value}
                                                                type="button"
                                                                className={`btn btn-outline ${formData.department === dept.value ? 'btn-primary' : ''}`}
                                                                onClick={() => setFormData({...formData, department: dept.value})}
                                                            >
                                                                {dept.icon}
                                                                {dept.label}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Personal Information */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text flex items-center gap-2">
                                                                <FaUser />
                                                                First Name *
                                                            </span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="firstName"
                                                            className="input input-bordered"
                                                            value={formData.firstName}
                                                            onChange={handleInputChange}
                                                            required
                                                        />
                                                    </div>

                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text">Last Name *</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="lastName"
                                                            className="input input-bordered"
                                                            value={formData.lastName}
                                                            onChange={handleInputChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text flex items-center gap-2">
                                                                <FaEnvelope />
                                                                Email *
                                                            </span>
                                                        </label>
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            className="input input-bordered"
                                                            value={formData.email}
                                                            onChange={handleInputChange}
                                                            required
                                                        />
                                                    </div>

                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text flex items-center gap-2">
                                                                <FaPhone />
                                                                Phone
                                                            </span>
                                                        </label>
                                                        <input
                                                            type="tel"
                                                            name="phone"
                                                            className="input input-bordered"
                                                            value={formData.phone}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text flex items-center gap-2">
                                                                <FaBuilding />
                                                                Company
                                                            </span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="company"
                                                            className="input input-bordered"
                                                            value={formData.company}
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>

                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text">Urgency Level</span>
                                                        </label>
                                                        <select
                                                            name="urgency"
                                                            className="select select-bordered"
                                                            value={formData.urgency}
                                                            onChange={handleInputChange}
                                                        >
                                                            {urgencyLevels.map(level => (
                                                                <option key={level.value} value={level.value}>
                                                                    {level.label} Priority
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>

                                                {/* Topic Selection */}
                                                <div>
                                                    <label className="label">
                                                        <span className="label-text">Common Topics</span>
                                                    </label>
                                                    <div className="flex flex-wrap gap-2">
                                                        {topics.map(topic => (
                                                            <button
                                                                key={topic}
                                                                type="button"
                                                                className={`badge badge-lg ${selectedTopic === topic ? 'badge-primary' : 'badge-outline'}`}
                                                                onClick={() => handleTopicSelect(topic)}
                                                            >
                                                                {topic}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">Subject *</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="subject"
                                                        className="input input-bordered"
                                                        value={formData.subject}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                </div>

                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text flex items-center gap-2">
                                                            <FaComments />
                                                            Message *
                                                        </span>
                                                    </label>
                                                    <textarea
                                                        name="message"
                                                        className="textarea textarea-bordered h-40"
                                                        value={formData.message}
                                                        onChange={handleInputChange}
                                                        placeholder="Please provide detailed information about your inquiry..."
                                                        required
                                                    ></textarea>
                                                </div>

                                                {/* Attachments */}
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">Attachments</span>
                                                    </label>
                                                    <div className="border-2 border-dashed border-base-300 rounded-lg p-8 text-center">
                                                        <FaFileAlt className="text-3xl opacity-50 mx-auto mb-4" />
                                                        <p className="mb-4">Drop files here or click to upload</p>
                                                        <p className="text-sm opacity-70 mb-4">
                                                            Maximum file size: 10MB • Supported: PDF, DOC, PNG, JPG
                                                        </p>
                                                        <button type="button" className="btn btn-sm btn-outline">
                                                            Browse Files
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Consent and Options */}
                                                <div className="space-y-4">
                                                    <label className="label cursor-pointer justify-start gap-3">
                                                        <input
                                                            type="checkbox"
                                                            name="consent"
                                                            className="checkbox checkbox-primary"
                                                            checked={formData.consent}
                                                            onChange={handleInputChange}
                                                            required
                                                        />
                                                        <span className="label-text">
                                                            I agree to the processing of my personal data according to the{' '}
                                                            <a href="/privacy" className="link link-primary">Privacy Policy</a> *
                                                        </span>
                                                    </label>

                                                    <label className="label cursor-pointer justify-start gap-3">
                                                        <input
                                                            type="checkbox"
                                                            name="subscribe"
                                                            className="checkbox"
                                                            checked={formData.subscribe}
                                                            onChange={handleInputChange}
                                                        />
                                                        <span className="label-text">
                                                            Subscribe to our newsletter for updates and security tips
                                                        </span>
                                                    </label>
                                                </div>

                                                <div className="flex flex-col sm:flex-row gap-4">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary flex-1"
                                                        disabled={isSubmitting || !formData.consent}
                                                    >
                                                        {isSubmitting ? (
                                                            <>
                                                                <span className="loading loading-spinner"></span>
                                                                Sending...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <FaPaperPlane />
                                                                Send Message
                                                            </>
                                                        )}
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="btn btn-outline"
                                                        onClick={() => window.location.href = `mailto:${contactInfo.email.primary}`}
                                                    >
                                                        <FaEnvelope />
                                                        Email Directly
                                                    </button>
                                                </div>
                                            </form>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'support' && (
                            <div className="space-y-8">
                                <div className="card bg-base-100 border border-base-300">
                                    <div className="card-body">
                                        <h2 className="text-2xl font-bold mb-6">Support Tiers</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            {supportTiers.map(tier => (
                                                <div key={tier.level} className={`card ${tier.level === 'Professional' ? 'border-primary border-2' : 'border-base-300'}`}>
                                                    <div className="card-body">
                                                        <h3 className="card-title">{tier.level}</h3>
                                                        <div className="text-2xl font-bold mb-4">{tier.price}</div>
                                                        <div className="space-y-3 mb-6">
                                                            <div className="flex items-center gap-2">
                                                                <FaClock className="opacity-50" />
                                                                <span>Response: {tier.responseTime}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <FaCalendar className="opacity-50" />
                                                                <span>Available: {tier.availability}</span>
                                                            </div>
                                                        </div>
                                                        <ul className="space-y-2 mb-6">
                                                            {tier.features.map((feature, index) => (
                                                                <li key={index} className="flex items-center gap-2">
                                                                    <FaCheckCircle className="text-success" />
                                                                    {feature}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                        <button className="btn btn-primary w-full">
                                                            {tier.level === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="card bg-base-100 border border-base-300">
                                    <div className="card-body">
                                        <h2 className="text-2xl font-bold mb-6">Support Resources</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-3 p-4 bg-base-200 rounded-lg">
                                                    <FaHeadset className="text-xl" />
                                                    <div>
                                                        <div className="font-bold">Live Chat</div>
                                                        <div className="text-sm opacity-70">Available 24/7 for paid plans</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3 p-4 bg-base-200 rounded-lg">
                                                    <FaComments className="text-xl" />
                                                    <div>
                                                        <div className="font-bold">Community Forum</div>
                                                        <div className="text-sm opacity-70">Connect with other users</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-3 p-4 bg-base-200 rounded-lg">
                                                    <FaFileAlt className="text-xl" />
                                                    <div>
                                                        <div className="font-bold">Documentation</div>
                                                        <div className="text-sm opacity-70">Comprehensive guides</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3 p-4 bg-base-200 rounded-lg">
                                                    <FaVideo className="text-xl" />
                                                    <div>
                                                        <div className="font-bold">Video Tutorials</div>
                                                        <div className="text-sm opacity-70">Step-by-step guides</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'sales' && (
                            <div className="space-y-8">
                                <div className="card bg-base-100 border border-base-300">
                                    <div className="card-body">
                                        <h2 className="text-2xl font-bold mb-6">Schedule a Sales Call</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div>
                                                <h3 className="text-xl font-bold mb-4">Why Schedule a Demo?</h3>
                                                <ul className="space-y-3">
                                                    <li className="flex items-center gap-2">
                                                        <FaCheckCircle className="text-success" />
                                                        Personalized product tour
                                                    </li>
                                                    <li className="flex items-center gap-2">
                                                        <FaCheckCircle className="text-success" />
                                                        Technical Q&A session
                                                    </li>
                                                    <li className="flex items-center gap-2">
                                                        <FaCheckCircle className="text-success" />
                                                        Custom pricing quote
                                                    </li>
                                                    <li className="flex items-center gap-2">
                                                        <FaCheckCircle className="text-success" />
                                                        Implementation roadmap
                                                    </li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold mb-4">Available Time Slots</h3>
                                                <div className="space-y-3">
                                                    {['Tomorrow 10:00 AM', 'Tomorrow 2:00 PM', 'Friday 11:00 AM', 'Friday 3:00 PM'].map(slot => (
                                                        <button key={slot} className="btn btn-outline w-full justify-start">
                                                            <FaCalendar className="mr-2" />
                                                            {slot}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Social Media & Additional Info */}
                <div className="mt-16">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold mb-4">Connect With Us</h2>
                        <p className="text-xl opacity-80">Follow us on social media for updates and news</p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 mb-12">
                        {[
                            { icon: <FaTwitter />, label: 'Twitter', color: 'bg-blue-400' },
                            { icon: <FaLinkedin />, label: 'LinkedIn', color: 'bg-blue-700' },
                            { icon: <FaFacebook />, label: 'Facebook', color: 'bg-blue-600' },
                            { icon: <FaYoutube />, label: 'YouTube', color: 'bg-red-600' },
                            { icon: <FaInstagram />, label: 'Instagram', color: 'bg-pink-600' },
                            { icon: <FaGlobe />, label: 'Blog', color: 'bg-green-500' },
                        ].map(social => (
                            <a
                                key={social.label}
                                href="#"
                                className={`btn ${social.color} text-white btn-lg`}
                            >
                                {social.icon}
                                {social.label}
                            </a>
                        ))}
                    </div>

                    <div className="card bg-base-100 border border-base-300">
                        <div className="card-body">
                            <h3 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { q: "What's your average response time?", a: "Within 24 hours for general inquiries, 1 hour for critical issues." },
                                    { q: "Do you offer custom development?", a: "Yes, we provide custom solutions for enterprise clients." },
                                    { q: "Is there a free trial?", a: "We offer a 14-day free trial with full features." },
                                    { q: "What security certifications do you have?", a: "SOC 2 Type II, ISO 27001, GDPR compliant." },
                                ].map((faq, index) => (
                                    <div key={index} className="collapse collapse-arrow border border-base-300">
                                        <input type="checkbox" />
                                        <div className="collapse-title font-medium">
                                            {faq.q}
                                        </div>
                                        <div className="collapse-content">
                                            <p>{faq.a}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="text-center mt-6">
                                <a href="/faq" className="btn btn-ghost">
                                    <FaQuestionCircle className="mr-2" />
                                    View All FAQs
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;