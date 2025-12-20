import {useEffect, useState} from 'react';
import {
    FaChartLine,
    FaCheck,
    FaCheckCircle,
    FaCopy,
    FaCreditCard,
    FaCrown,
    FaDownload,
    FaEdit,
    FaFilter,
    FaFire,
    FaGem,
    FaInfinity,
    FaPlus,
    FaSearch,
    FaShieldAlt,
    FaSortDown,
    FaSortUp,
    FaStar,
    FaTimes,
    FaTimesCircle,
    FaTrash,
    FaUsers
} from 'react-icons/fa';
import api from "../../api/index.js";
import Urls from "../../api/Urls.js";

const Plans = () => {
    const [plans, setPlans] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedPopularity, setSelectedPopularity] = useState('all');
    const [sortField, setSortField] = useState('name');
    const [sortDirection, setSortDirection] = useState('asc');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showPricingModal, setShowPricingModal] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        fetchPlans();
    }, []);

    const fetchPlans = async () => {
        const response = await api.get(Urls.plan.list)

        setPlans(response.data.map(plan => ({
            id: plan.id,
            name: plan.name,
            code: plan.name.toUpperCase().replace(/\s+/g, '_'),
            description: plan.description,
            price: plan.price,
            billingCycle: 'monthly',
            features: {
                users: plan.maxUsers,
                realms: plan.maxRealms,
                ssoEnabled: true,
                mfaEnabled: false,
                apiCalls: 1000,
                support: 'community',
                customDomains: false,
                auditLogs: false,
                sla: false
            },
            status: 'active',
            popularity: 'low',
            color: plan.name === 'Free' ? 'neutral' : plan.name === 'Pro' ? 'primary' : 'info',
            createdAt: plan.createdAt,
            subscribers: Math.floor(Math.random() * 1000)
        })));

    }

    const totalRevenue = plans.reduce((sum, plan) => {
        if (plan.status === 'active' && plan.price > 0) {
            return sum + (plan.price * plan.subscribers);
        }
        return sum;
    }, 0);

    const totalSubscribers = plans.reduce((sum, plan) => sum + plan.subscribers, 0);

    const activePlans = plans.filter(plan => plan.status === 'active').length;

    const filteredPlans = plans
        .filter(plan => {
            const matchesSearch = plan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                plan.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                plan.code.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = selectedStatus === 'all' || plan.status === selectedStatus;
            const matchesPopularity = selectedPopularity === 'all' || plan.popularity === selectedPopularity;
            const matchesTab = activeTab === 'all' ||
                (activeTab === 'free' && plan.price === 0) ||
                (activeTab === 'paid' && plan.price > 0) ||
                (activeTab === 'enterprise' && plan.name.toLowerCase().includes('enterprise'));

            return matchesSearch && matchesStatus && matchesPopularity && matchesTab;
        })
        .sort((a, b) => {
            const aValue = a[sortField];
            const bValue = b[sortField];

            if (sortDirection === 'asc') {
                return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
            } else {
                return bValue < aValue ? -1 : bValue > aValue ? 1 : 0;
            }
        });

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            active: {color: 'badge-success', icon: <FaCheckCircle className="mr-1"/>, text: 'Active'},
            archived: {color: 'badge-neutral', icon: <FaTimesCircle className="mr-1"/>, text: 'Archived'},
            draft: {color: 'badge-warning', icon: <FaTimesCircle className="mr-1"/>, text: 'Draft'}
        };
        const config = statusConfig[status] || {color: 'badge-neutral', text: status};
        return (
            <span className={`badge ${config.color} gap-1`}>
        {config.icon}
                {config.text}
      </span>
        );
    };

    const getPopularityBadge = (popularity) => {
        const popularityConfig = {
            high: {color: 'badge-success', icon: <FaFire className="mr-1"/>, text: 'High'},
            medium: {color: 'badge-warning', icon: <FaStar className="mr-1"/>, text: 'Medium'},
            low: {color: 'badge-neutral', icon: <FaStar className="mr-1"/>, text: 'Low'}
        };
        const config = popularityConfig[popularity] || {color: 'badge-neutral', text: popularity};
        return (
            <span className={`badge ${config.color} gap-1`}>
        {config.icon}
                {config.text}
      </span>
        );
    };

    const getPlanIcon = (color) => {
        const iconConfig = {
            primary: <FaCrown className="text-primary"/>,
            secondary: <FaGem className="text-secondary"/>,
            accent: <FaShieldAlt className="text-accent"/>,
            info: <FaStar className="text-info"/>,
            warning: <FaFire className="text-warning"/>,
            neutral: <FaCreditCard className="text-neutral"/>
        };
        return iconConfig[color] || <FaCreditCard/>;
    };

    const handleDeletePlan = (id) => {
        if (window.confirm('Are you sure you want to delete this plan? Existing subscribers will be migrated to the free plan.')) {
            setPlans(plans.filter(plan => plan.id !== id));
        }
    };

    const handleDuplicatePlan = (plan) => {
        const newPlan = {
            ...plan,
            id: plans.length + 1,
            name: `${plan.name} Copy`,
            code: `${plan.code}_COPY`,
            status: 'draft',
            subscribers: 0
        };
        setPlans([...plans, newPlan]);
    };

    const handleArchivePlan = (id) => {
        setPlans(plans.map(plan =>
            plan.id === id
                ? {...plan, status: plan.status === 'archived' ? 'active' : 'archived'}
                : plan
        ));
    };

    const getFeatureIcon = (value) => {
        if (value === true || value === 'unlimited') {
            return <FaCheck className="text-success mx-auto"/>;
        } else if (value === false) {
            return <FaTimes className="text-error mx-auto"/>;
        }
        return null;
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <FaCreditCard className="text-primary"/>
                        Subscription Plans
                    </h1>
                    <p className="text-base-content/70">
                        Manage pricing plans and subscriptions
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button className="btn btn-ghost">
                        <FaDownload/> Export
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={() => setShowPricingModal(true)}
                    >
                        <FaChartLine/> Analytics
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowCreateModal(true)}
                    >
                        <FaPlus/> Create Plan
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="card bg-base-100 border border-base-300">
                    <div className="card-body">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm opacity-70">Monthly Recurring Revenue</p>
                                <p className="text-3xl font-bold">${totalRevenue.toLocaleString()}</p>
                            </div>
                            <div className="text-primary text-2xl">
                                <FaCreditCard/>
                            </div>
                        </div>
                        <div className="text-xs opacity-70 mt-2">
                            <span className="text-success">+12.5% from last month</span>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 border border-base-300">
                    <div className="card-body">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm opacity-70">Total Subscribers</p>
                                <p className="text-3xl font-bold">{totalSubscribers.toLocaleString()}</p>
                            </div>
                            <div className="text-success text-2xl">
                                <FaUsers/>
                            </div>
                        </div>
                        <div className="text-xs opacity-70 mt-2">
                            <span>Across all active plans</span>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 border border-base-300">
                    <div className="card-body">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm opacity-70">Active Plans</p>
                                <p className="text-3xl font-bold">{activePlans}</p>
                            </div>
                            <div className="text-info text-2xl">
                                <FaCheckCircle/>
                            </div>
                        </div>
                        <div className="text-xs opacity-70 mt-2">
                            <span>Available for subscription</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="tabs tabs-boxed bg-base-200 p-1">
                <a
                    className={`tab ${activeTab === 'all' ? 'tab-active' : ''}`}
                    onClick={() => setActiveTab('all')}
                >
                    All Plans
                </a>
                <a
                    className={`tab ${activeTab === 'free' ? 'tab-active' : ''}`}
                    onClick={() => setActiveTab('free')}
                >
                    Free
                </a>
                <a
                    className={`tab ${activeTab === 'paid' ? 'tab-active' : ''}`}
                    onClick={() => setActiveTab('paid')}
                >
                    Paid
                </a>
                <a
                    className={`tab ${activeTab === 'enterprise' ? 'tab-active' : ''}`}
                    onClick={() => setActiveTab('enterprise')}
                >
                    Enterprise
                </a>
            </div>

            <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                    <div className="flex flex-col lg:flex-row gap-4 mb-6">
                        <div className="form-control flex-1">
                            <div className="input input-bordered flex items-center gap-2">
                                <FaSearch className="opacity-50"/>
                                <input
                                    type="text"
                                    placeholder="Search plans by name, code, or description..."
                                    className="w-full"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="btn btn-xs btn-ghost"
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <select
                                className="select select-bordered select-sm"
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="archived">Archived</option>
                                <option value="draft">Draft</option>
                            </select>

                            <select
                                className="select select-bordered select-sm"
                                value={selectedPopularity}
                                onChange={(e) => setSelectedPopularity(e.target.value)}
                            >
                                <option value="all">All Popularity</option>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>

                            <button className="btn btn-ghost btn-sm">
                                <FaFilter/> More
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                            <tr>
                                <th>
                                    <button
                                        className="flex items-center gap-1"
                                        onClick={() => handleSort('name')}
                                    >
                                        Plan
                                        {sortField === 'name' && (
                                            sortDirection === 'asc' ? <FaSortUp/> : <FaSortDown/>
                                        )}
                                    </button>
                                </th>
                                <th>Price</th>
                                <th>Features</th>
                                <th>Status</th>
                                <th>Popularity</th>
                                <th>Subscribers</th>
                                <th className="text-right">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredPlans.map((plan) => (
                                <tr key={plan.id} className="hover">
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="text-2xl">
                                                {getPlanIcon(plan.color)}
                                            </div>
                                            <div>
                                                <div className="font-bold">{plan.name}</div>
                                                <div className="text-xs opacity-70 font-mono">{plan.code}</div>
                                                <div className="text-sm opacity-80">{plan.description}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex flex-col">
                                            <span className="text-2xl font-bold">
                                              {plan.price === 0 ? 'Free' : `$${plan.price}`}
                                            </span>
                                            <span className="text-xs opacity-70">
                                              {plan.billingCycle === 'forever' ? 'Forever free' : `per ${plan.billingCycle}`}
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex flex-wrap gap-1">
                                            <span className="badge badge-sm">
                                              {plan.features.users === 'unlimited' ?
                                                  <FaInfinity/> : plan.features.users} users
                                            </span>
                                            <span className="badge badge-sm">
                                              {plan.features.realms === 'unlimited' ?
                                                  <FaInfinity/> : plan.features.realms} realms
                                            </span>
                                            <span
                                                className={`badge badge-sm ${plan.features.ssoEnabled ? 'badge-success' : 'badge-neutral'}`}>
                                              SSO
                                            </span>
                                            <span
                                                className={`badge badge-sm ${plan.features.mfaEnabled ? 'badge-info' : 'badge-neutral'}`}>
                                              MFA
                                            </span>
                                        </div>
                                    </td>
                                    <td>{getStatusBadge(plan.status)}</td>
                                    <td>{getPopularityBadge(plan.popularity)}</td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <FaUsers className="opacity-50"/>
                                            <span className="font-bold">{plan.subscribers.toLocaleString()}</span>
                                            {plan.price > 0 && (
                                                <span className="text-xs opacity-70">
                                                    (${(plan.price * plan.subscribers).toLocaleString()}/mo)
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex justify-end gap-2">
                                            <button
                                                className="btn btn-xs btn-info"
                                                onClick={() => setSelectedPlan(plan)}
                                            >
                                                <FaEdit/> Edit
                                            </button>
                                            <button
                                                className="btn btn-xs btn-warning"
                                                onClick={() => handleDuplicatePlan(plan)}
                                            >
                                                <FaCopy/> Duplicate
                                            </button>
                                            <button
                                                className={`btn btn-xs ${plan.status === 'archived' ? 'btn-success' : 'btn-neutral'}`}
                                                onClick={() => handleArchivePlan(plan.id)}
                                            >
                                                {plan.status === 'archived' ? 'Activate' : 'Archive'}
                                            </button>
                                            <button
                                                className="btn btn-xs btn-error"
                                                onClick={() => handleDeletePlan(plan.id)}
                                            >
                                                <FaTrash/> Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center mt-6">
                        <div className="text-sm opacity-70">
                            Showing {filteredPlans.length} of {plans.length} plans
                        </div>
                        <div className="join">
                            <button className="join-item btn btn-sm">«</button>
                            <button className="join-item btn btn-sm btn-active">1</button>
                            <button className="join-item btn btn-sm">2</button>
                            <button className="join-item btn btn-sm">3</button>
                            <button className="join-item btn btn-sm">»</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                    <h3 className="card-title">Plan Comparison</h3>
                    <p className="text-base-content/70 mb-4">Compare features across all active plans</p>

                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Feature</th>
                                {plans.filter(p => p.status === 'active').map(plan => (
                                    <th key={plan.id} className="text-center">
                                        <div className="font-bold">{plan.name}</div>
                                        <div
                                            className="text-sm opacity-70">{plan.price === 0 ? 'Free' : `$${plan.price}/mo`}</div>
                                    </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Maximum Users</td>
                                {plans.filter(p => p.status === 'active').map(plan => (
                                    <td key={plan.id} className="text-center">
                                        {plan.features.users === 'unlimited' ? (
                                            <span
                                                className="font-bold flex items-center justify-center gap-1"><FaInfinity/> Unlimited</span>
                                        ) : (
                                            plan.features.users
                                        )}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td>Realms</td>
                                {plans.filter(p => p.status === 'active').map(plan => (
                                    <td key={plan.id} className="text-center">
                                        {plan.features.realms === 'unlimited' ? (
                                            <span
                                                className="font-bold flex items-center justify-center gap-1"><FaInfinity/> Unlimited</span>
                                        ) : (
                                            plan.features.realms
                                        )}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td>SSO Enabled</td>
                                {plans.filter(p => p.status === 'active').map(plan => (
                                    <td key={plan.id} className="text-center">
                                        {getFeatureIcon(plan.features.ssoEnabled)}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td>MFA Enabled</td>
                                {plans.filter(p => p.status === 'active').map(plan => (
                                    <td key={plan.id} className="text-center">
                                        {getFeatureIcon(plan.features.mfaEnabled)}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td>API Calls/Month</td>
                                {plans.filter(p => p.status === 'active').map(plan => (
                                    <td key={plan.id} className="text-center">
                                        {plan.features.apiCalls === 'unlimited' ? (
                                            <span
                                                className="font-bold flex items-center justify-center gap-1"><FaInfinity/> Unlimited</span>
                                        ) : (
                                            plan.features.apiCalls.toLocaleString()
                                        )}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td>Support</td>
                                {plans.filter(p => p.status === 'active').map(plan => (
                                    <td key={plan.id} className="text-center">
                                        <span className="badge badge-sm">{plan.features.support}</span>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td>Custom Domains</td>
                                {plans.filter(p => p.status === 'active').map(plan => (
                                    <td key={plan.id} className="text-center">
                                        {getFeatureIcon(plan.features.customDomains)}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td>Audit Logs</td>
                                {plans.filter(p => p.status === 'active').map(plan => (
                                    <td key={plan.id} className="text-center">
                                        {plan.features.auditLogs === 'unlimited' ? (
                                            <span
                                                className="font-bold flex items-center justify-center gap-1"><FaInfinity/> Unlimited</span>
                                        ) : (
                                            plan.features.auditLogs
                                        )}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td>SLA</td>
                                {plans.filter(p => p.status === 'active').map(plan => (
                                    <td key={plan.id} className="text-center">
                                        {getFeatureIcon(plan.features.sla)}
                                    </td>
                                ))}
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {showCreateModal && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-4xl">
                        <h3 className="font-bold text-lg">Create New Plan</h3>
                        <p className="py-4">Configure a new subscription plan</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Plan Name*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., Professional"
                                    className="input input-bordered"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Plan Code*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., PRO"
                                    className="input input-bordered font-mono"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Description</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Brief description of the plan"
                                    className="input input-bordered"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Color Theme</span>
                                </label>
                                <select className="select select-bordered">
                                    <option value="primary">Primary (Blue)</option>
                                    <option value="secondary">Secondary (Purple)</option>
                                    <option value="accent">Accent (Green)</option>
                                    <option value="info">Info (Cyan)</option>
                                    <option value="warning">Warning (Orange)</option>
                                    <option value="neutral">Neutral (Gray)</option>
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Monthly Price ($)</span>
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    step="1"
                                    placeholder="0 for free plan"
                                    className="input input-bordered"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Billing Cycle</span>
                                </label>
                                <select className="select select-bordered">
                                    <option value="monthly">Monthly</option>
                                    <option value="annual">Annual (Save 20%)</option>
                                    <option value="forever">One-time / Forever</option>
                                </select>
                            </div>
                        </div>

                        <div className="divider my-4"></div>

                        <h4 className="font-bold mb-3">Features Configuration</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Maximum Users</span>
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        min="1"
                                        placeholder="e.g., 100"
                                        className="input input-bordered flex-1"
                                    />
                                    <label className="label cursor-pointer">
                                        <span className="label-text">Unlimited</span>
                                        <input type="checkbox" className="checkbox"/>
                                    </label>
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Realms</span>
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    placeholder="Number of realms"
                                    className="input input-bordered"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text">SSO Enabled</span>
                                    <input type="checkbox" className="toggle toggle-primary" defaultChecked/>
                                </label>
                            </div>

                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text">MFA Enabled</span>
                                    <input type="checkbox" className="toggle toggle-primary"/>
                                </label>
                            </div>

                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text">Custom Domains</span>
                                    <input type="checkbox" className="toggle toggle-primary"/>
                                </label>
                            </div>

                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text">API Access</span>
                                    <input type="checkbox" className="toggle toggle-primary" defaultChecked/>
                                </label>
                            </div>
                        </div>

                        <div className="modal-action">
                            <button className="btn btn-ghost" onClick={() => setShowCreateModal(false)}>
                                Cancel
                            </button>
                            <button className="btn btn-primary">
                                Create Plan
                            </button>
                        </div>
                    </div>
                    <div className="modal-backdrop" onClick={() => setShowCreateModal(false)}></div>
                </div>
            )}

            {showPricingModal && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-4xl">
                        <h3 className="font-bold text-lg">Pricing Analytics</h3>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
                            <div className="stat">
                                <div className="stat-title">Average Price</div>
                                <div className="stat-value text-2xl">
                                    ${(plans.filter(p => p.price > 0).reduce((sum, p) => sum + p.price, 0) / plans.filter(p => p.price > 0).length).toFixed(0)}
                                </div>
                                <div className="stat-desc">per month</div>
                            </div>

                            <div className="stat">
                                <div className="stat-title">Most Popular</div>
                                <div className="stat-value text-xl">
                                    {plans.reduce((max, plan) => plan.subscribers > max.subscribers ? plan : max).name}
                                </div>
                                <div className="stat-desc">by subscribers</div>
                            </div>

                            <div className="stat">
                                <div className="stat-title">Conversion Rate</div>
                                <div className="stat-value text-2xl">4.2%</div>
                                <div className="stat-desc">free to paid</div>
                            </div>

                            <div className="stat">
                                <div className="stat-title">Churn Rate</div>
                                <div className="stat-value text-2xl">1.8%</div>
                                <div className="stat-desc">monthly</div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Plan</th>
                                    <th>Subscribers</th>
                                    <th>Growth</th>
                                    <th>MRR</th>
                                    <th>Churn Rate</th>
                                </tr>
                                </thead>
                                <tbody>
                                {plans.filter(p => p.status === 'active').map(plan => (
                                    <tr key={plan.id}>
                                        <td>
                                            <div className="flex items-center gap-2">
                                                {getPlanIcon(plan.color)}
                                                <span className="font-medium">{plan.name}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="font-bold">{plan.subscribers.toLocaleString()}</div>
                                        </td>
                                        <td>
                                            <div
                                                className={`badge ${plan.popularity === 'high' ? 'badge-success' : plan.popularity === 'medium' ? 'badge-warning' : 'badge-neutral'}`}>
                                                {plan.popularity === 'high' ? '+15.2%' : plan.popularity === 'medium' ? '+5.4%' : '+1.2%'}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="font-bold">
                                                ${(plan.price * plan.subscribers).toLocaleString()}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="text-error">2.1%</div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="modal-action">
                            <button className="btn btn-ghost" onClick={() => setShowPricingModal(false)}>
                                Close
                            </button>
                        </div>
                    </div>
                    <div className="modal-backdrop" onClick={() => setShowPricingModal(false)}></div>
                </div>
            )}

            {selectedPlan && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-4xl">
                        <h3 className="font-bold text-lg">Edit Plan: {selectedPlan.name}</h3>

                        <div className="tabs">
                            <a className="tab tab-bordered tab-active">Details</a>
                            <a className="tab tab-bordered">Pricing</a>
                            <a className="tab tab-bordered">Features</a>
                            <a className="tab tab-bordered">Subscribers</a>
                        </div>

                        <div className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Plan Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={selectedPlan.name}
                                        className="input input-bordered"
                                        onChange={(e) => setSelectedPlan({...selectedPlan, name: e.target.value})}
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Status</span>
                                    </label>
                                    <select
                                        className="select select-bordered"
                                        value={selectedPlan.status}
                                        onChange={(e) => setSelectedPlan({...selectedPlan, status: e.target.value})}
                                    >
                                        <option value="active">Active</option>
                                        <option value="archived">Archived</option>
                                        <option value="draft">Draft</option>
                                    </select>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Monthly Price</span>
                                    </label>
                                    <input
                                        type="number"
                                        value={selectedPlan.price}
                                        className="input input-bordered"
                                        onChange={(e) => setSelectedPlan({
                                            ...selectedPlan,
                                            price: parseFloat(e.target.value)
                                        })}
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Popularity</span>
                                    </label>
                                    <select
                                        className="select select-bordered"
                                        value={selectedPlan.popularity}
                                        onChange={(e) => setSelectedPlan({...selectedPlan, popularity: e.target.value})}
                                    >
                                        <option value="high">High</option>
                                        <option value="medium">Medium</option>
                                        <option value="low">Low</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-control mt-4">
                                <label className="label">
                                    <span className="label-text">Description</span>
                                </label>
                                <textarea
                                    className="textarea textarea-bordered"
                                    value={selectedPlan.description}
                                    onChange={(e) => setSelectedPlan({...selectedPlan, description: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="modal-action">
                            <button className="btn btn-ghost" onClick={() => setSelectedPlan(null)}>
                                Cancel
                            </button>
                            <button className="btn btn-primary" onClick={() => {
                                setPlans(plans.map(p => p.id === selectedPlan.id ? selectedPlan : p));
                                setSelectedPlan(null);
                            }}>
                                Save Changes
                            </button>
                        </div>
                    </div>
                    <div className="modal-backdrop" onClick={() => setSelectedPlan(null)}></div>
                </div>
            )}

            <div className="alert alert-success">
                <FaChartLine/>
                <div>
                    <h3 className="font-bold">Pricing Strategy Tips</h3>
                    <div className="text-xs">
                        • Consider a 3-tier pricing model (Basic/Pro/Enterprise)<br/>
                        • Offer annual discounts (usually 20%) to improve retention<br/>
                        • Monitor conversion rates between free and paid plans<br/>
                        • Regularly review competitor pricing<br/>
                        • Test price changes with a small segment first
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Plans;