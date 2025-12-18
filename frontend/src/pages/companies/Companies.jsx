// src/pages/Companies.jsx
import { useState } from 'react';
import {
    FaSearch,
    FaPlus,
    FaEdit,
    FaTrash,
    FaBuilding,
    FaUsers,
    FaPhone,
    FaEnvelope,
    FaGlobe,
    FaMapMarkerAlt,
    FaIndustry,
    FaCalendarAlt,
    FaCheckCircle,
    FaTimesCircle,
    FaExclamationTriangle,
    FaDownload,
    FaUpload,
    FaFilter,
    FaSort,
    FaSortUp,
    FaSortDown,
    FaEye,
    FaLink,
    FaCreditCard,
    FaChartLine
} from 'react-icons/fa';
import { format } from 'date-fns';

const Companies = () => {
    // État pour les données et filtres
    const [companies, setCompanies] = useState([
        {
            id: 1,
            name: 'TechCorp Solutions',
            domain: 'techcorp.com',
            industry: 'Information Technology',
            plan: 'Enterprise',
            status: 'active',
            users: 245,
            contact: {
                name: 'John Smith',
                email: 'john.smith@techcorp.com',
                phone: '+1 (555) 123-4567'
            },
            location: {
                city: 'San Francisco',
                country: 'United States'
            },
            billing: {
                amount: '$4,999',
                cycle: 'monthly',
                nextBilling: '2024-02-15'
            },
            created: '2023-06-15',
            lastActive: '2024-01-15T14:30:00',
            ssoEnabled: true,
            mfaEnabled: true,
            apiAccess: true
        },
        {
            id: 2,
            name: 'HealthPlus Medical',
            domain: 'healthplus.com',
            industry: 'Healthcare',
            plan: 'Professional',
            status: 'active',
            users: 128,
            contact: {
                name: 'Sarah Johnson',
                email: 'sarah.j@healthplus.com',
                phone: '+1 (555) 987-6543'
            },
            location: {
                city: 'New York',
                country: 'United States'
            },
            billing: {
                amount: '$2,499',
                cycle: 'monthly',
                nextBilling: '2024-02-10'
            },
            created: '2023-08-22',
            lastActive: '2024-01-14T09:15:00',
            ssoEnabled: true,
            mfaEnabled: false,
            apiAccess: true
        },
        {
            id: 3,
            name: 'EduLearn Academy',
            domain: 'edulearn.edu',
            industry: 'Education',
            plan: 'Educational',
            status: 'pending',
            users: 85,
            contact: {
                name: 'Robert Chen',
                email: 'r.chen@edulearn.edu',
                phone: '+1 (555) 456-7890'
            },
            location: {
                city: 'Boston',
                country: 'United States'
            },
            billing: {
                amount: '$1,499',
                cycle: 'annual',
                nextBilling: '2025-01-20'
            },
            created: '2024-01-05',
            lastActive: '2024-01-10T16:45:00',
            ssoEnabled: false,
            mfaEnabled: false,
            apiAccess: false
        },
        {
            id: 4,
            name: 'RetailChain Stores',
            domain: 'retailchain.com',
            industry: 'Retail',
            plan: 'Business',
            status: 'suspended',
            users: 320,
            contact: {
                name: 'Maria Garcia',
                email: 'maria.g@retailchain.com',
                phone: '+1 (555) 234-5678'
            },
            location: {
                city: 'Miami',
                country: 'United States'
            },
            billing: {
                amount: '$3,499',
                cycle: 'monthly',
                nextBilling: '2024-02-01'
            },
            created: '2023-04-18',
            lastActive: '2024-01-05T11:20:00',
            ssoEnabled: true,
            mfaEnabled: true,
            apiAccess: false
        },
        {
            id: 5,
            name: 'FinanceSecure Bank',
            domain: 'financesecure.bank',
            industry: 'Finance',
            plan: 'Enterprise Plus',
            status: 'active',
            users: 560,
            contact: {
                name: 'David Wilson',
                email: 'd.wilson@financesecure.bank',
                phone: '+1 (555) 345-6789'
            },
            location: {
                city: 'London',
                country: 'United Kingdom'
            },
            billing: {
                amount: '$7,999',
                cycle: 'monthly',
                nextBilling: '2024-02-20'
            },
            created: '2022-11-30',
            lastActive: '2024-01-15T08:45:00',
            ssoEnabled: true,
            mfaEnabled: true,
            apiAccess: true
        },
        {
            id: 6,
            name: 'Manufacturing Pro',
            domain: 'manufacturingpro.com',
            industry: 'Manufacturing',
            plan: 'Professional',
            status: 'inactive',
            users: 42,
            contact: {
                name: 'James Miller',
                email: 'j.miller@manufacturingpro.com',
                phone: '+1 (555) 567-8901'
            },
            location: {
                city: 'Detroit',
                country: 'United States'
            },
            billing: {
                amount: '$2,499',
                cycle: 'monthly',
                nextBilling: '2024-01-25'
            },
            created: '2023-12-01',
            lastActive: '2023-12-20T14:10:00',
            ssoEnabled: false,
            mfaEnabled: false,
            apiAccess: false
        },
        {
            id: 7,
            name: 'Creative Agency Co.',
            domain: 'creativeagency.co',
            industry: 'Marketing',
            plan: 'Startup',
            status: 'active',
            users: 28,
            contact: {
                name: 'Emma Davis',
                email: 'emma.d@creativeagency.co',
                phone: '+1 (555) 678-9012'
            },
            location: {
                city: 'Los Angeles',
                country: 'United States'
            },
            billing: {
                amount: '$499',
                cycle: 'monthly',
                nextBilling: '2024-02-05'
            },
            created: '2023-10-15',
            lastActive: '2024-01-14T17:30:00',
            ssoEnabled: true,
            mfaEnabled: true,
            apiAccess: true
        }
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedPlan, setSelectedPlan] = useState('all');
    const [selectedIndustry, setSelectedIndustry] = useState('all');
    const [sortField, setSortField] = useState('name');
    const [sortDirection, setSortDirection] = useState('asc');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

    // Industries uniques pour le filtre
    const industries = [...new Set(companies.map(company => company.industry))];

    // Plans uniques pour le filtre
    const plans = [...new Set(companies.map(company => company.plan))];

    // Filtrage et tri
    const filteredCompanies = companies
        .filter(company => {
            const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                company.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
                company.contact.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = selectedStatus === 'all' || company.status === selectedStatus;
            const matchesPlan = selectedPlan === 'all' || company.plan === selectedPlan;
            const matchesIndustry = selectedIndustry === 'all' || company.industry === selectedIndustry;
            return matchesSearch && matchesStatus && matchesPlan && matchesIndustry;
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
            active: { color: 'badge-success', icon: <FaCheckCircle className="mr-1" />, text: 'Active' },
            pending: { color: 'badge-warning', icon: <FaExclamationTriangle className="mr-1" />, text: 'Pending' },
            suspended: { color: 'badge-error', icon: <FaTimesCircle className="mr-1" />, text: 'Suspended' },
            inactive: { color: 'badge-neutral', icon: <FaTimesCircle className="mr-1" />, text: 'Inactive' }
        };
        const config = statusConfig[status] || { color: 'badge-neutral', text: status };
        return (
            <span className={`badge ${config.color} gap-1`}>
        {config.icon}
                {config.text}
      </span>
        );
    };

    const getPlanBadge = (plan) => {
        const planConfig = {
            'Enterprise Plus': { color: 'badge-primary', text: 'Enterprise+' },
            'Enterprise': { color: 'badge-primary', text: 'Enterprise' },
            'Professional': { color: 'badge-info', text: 'Professional' },
            'Business': { color: 'badge-info', text: 'Business' },
            'Startup': { color: 'badge-secondary', text: 'Startup' },
            'Educational': { color: 'badge-accent', text: 'Educational' }
        };
        const config = planConfig[plan] || { color: 'badge-neutral', text: plan };
        return <span className={`badge ${config.color}`}>{config.text}</span>;
    };

    const handleDeleteCompany = (id) => {
        if (window.confirm('Are you sure you want to delete this company? This will also remove all associated users.')) {
            setCompanies(companies.filter(company => company.id !== id));
        }
    };

    const handleToggleStatus = (id, currentStatus) => {
        const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
        setCompanies(companies.map(company =>
            company.id === id ? { ...company, status: newStatus } : company
        ));
    };

    const getCompanyMetrics = () => {
        const totalCompanies = companies.length;
        const activeCompanies = companies.filter(c => c.status === 'active').length;
        const totalUsers = companies.reduce((sum, company) => sum + company.users, 0);
        const monthlyRevenue = companies
            .filter(c => c.status === 'active' && c.billing.cycle === 'monthly')
            .reduce((sum, company) => {
                const amount = parseInt(company.billing.amount.replace('$', '').replace(',', ''));
                return sum + (isNaN(amount) ? 0 : amount);
            }, 0);

        return { totalCompanies, activeCompanies, totalUsers, monthlyRevenue };
    };

    const metrics = getCompanyMetrics();

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <FaBuilding className="text-primary" />
                        Companies Management
                    </h1>
                    <p className="text-base-content/70">
                        Manage organizations and their SSO configurations
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button className="btn btn-ghost">
                        <FaDownload /> Export
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={() => setShowImportModal(true)}
                    >
                        <FaUpload /> Import
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowCreateModal(true)}
                    >
                        <FaPlus /> Add Company
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="card bg-base-100 border border-base-300">
                    <div className="card-body">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm opacity-70">Total Companies</p>
                                <p className="text-3xl font-bold">{metrics.totalCompanies}</p>
                            </div>
                            <div className="text-primary text-2xl">
                                <FaBuilding />
                            </div>
                        </div>
                        <div className="text-xs opacity-70 mt-2">
                            <span className="text-success">+{metrics.activeCompanies} active</span>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 border border-base-300">
                    <div className="card-body">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm opacity-70">Active Companies</p>
                                <p className="text-3xl font-bold">{metrics.activeCompanies}</p>
                            </div>
                            <div className="text-success text-2xl">
                                <FaCheckCircle />
                            </div>
                        </div>
                        <div className="text-xs opacity-70 mt-2">
                            <span>{((metrics.activeCompanies / metrics.totalCompanies) * 100).toFixed(1)}% of total</span>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 border border-base-300">
                    <div className="card-body">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm opacity-70">Total Users</p>
                                <p className="text-3xl font-bold">{metrics.totalUsers.toLocaleString()}</p>
                            </div>
                            <div className="text-info text-2xl">
                                <FaUsers />
                            </div>
                        </div>
                        <div className="text-xs opacity-70 mt-2">
                            <span>Across all organizations</span>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 border border-base-300">
                    <div className="card-body">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm opacity-70">Monthly Revenue</p>
                                <p className="text-3xl font-bold">${metrics.monthlyRevenue.toLocaleString()}</p>
                            </div>
                            <div className="text-accent text-2xl">
                                <FaCreditCard />
                            </div>
                        </div>
                        <div className="text-xs opacity-70 mt-2">
                            <span>Active monthly subscriptions</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                    <div className="flex flex-col lg:flex-row gap-4 mb-6">
                        <div className="form-control flex-1">
                            <div className="input input-bordered flex items-center gap-2">
                                <FaSearch className="opacity-50" />
                                <input
                                    type="text"
                                    placeholder="Search companies by name, domain, or contact..."
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

                        <div className="flex items-center gap-2">
                            <div className="btn-group">
                                <button
                                    className={`btn btn-sm ${viewMode === 'grid' ? 'btn-active' : ''}`}
                                    onClick={() => setViewMode('grid')}
                                >
                                    Grid
                                </button>
                                <button
                                    className={`btn btn-sm ${viewMode === 'list' ? 'btn-active' : ''}`}
                                    onClick={() => setViewMode('list')}
                                >
                                    List
                                </button>
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
                                <option value="pending">Pending</option>
                                <option value="suspended">Suspended</option>
                                <option value="inactive">Inactive</option>
                            </select>

                            <select
                                className="select select-bordered select-sm"
                                value={selectedPlan}
                                onChange={(e) => setSelectedPlan(e.target.value)}
                            >
                                <option value="all">All Plans</option>
                                {plans.map(plan => (
                                    <option key={plan} value={plan}>{plan}</option>
                                ))}
                            </select>

                            <select
                                className="select select-bordered select-sm"
                                value={selectedIndustry}
                                onChange={(e) => setSelectedIndustry(e.target.value)}
                            >
                                <option value="all">All Industries</option>
                                {industries.map(industry => (
                                    <option key={industry} value={industry}>{industry}</option>
                                ))}
                            </select>

                            <button className="btn btn-ghost btn-sm">
                                <FaFilter /> More
                            </button>
                        </div>
                    </div>

                    {viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredCompanies.map((company) => (
                                <div key={company.id} className="card bg-base-100 border border-base-300 hover:shadow-xl transition-shadow">
                                    <div className="card-body">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="card-title text-lg">{company.name}</h3>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <FaGlobe className="text-xs opacity-50" />
                                                    <span className="text-sm opacity-70">{company.domain}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end gap-1">
                                                {getStatusBadge(company.status)}
                                                {getPlanBadge(company.plan)}
                                            </div>
                                        </div>

                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center gap-2">
                                                <FaUsers className="opacity-50" />
                                                <span className="text-sm">{company.users} users</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FaIndustry className="opacity-50" />
                                                <span className="text-sm">{company.industry}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FaMapMarkerAlt className="opacity-50" />
                                                <span className="text-sm">{company.location.city}, {company.location.country}</span>
                                            </div>
                                        </div>

                                        <div className="bg-base-200 rounded-lg p-3 mb-4">
                                            <p className="font-medium text-sm">Primary Contact</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <FaEnvelope className="text-xs" />
                                                <span className="text-sm">{company.contact.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <FaPhone className="text-xs" />
                                                <span className="text-sm">{company.contact.phone}</span>
                                            </div>
                                        </div>

                                        <div className="flex justify-between mb-4">
                                            <div className="text-center">
                                                <div className={`badge ${company.ssoEnabled ? 'badge-success' : 'badge-neutral'}`}>
                                                    SSO
                                                </div>
                                                <p className="text-xs mt-1">{company.ssoEnabled ? 'Enabled' : 'Disabled'}</p>
                                            </div>
                                            <div className="text-center">
                                                <div className={`badge ${company.mfaEnabled ? 'badge-success' : 'badge-neutral'}`}>
                                                    MFA
                                                </div>
                                                <p className="text-xs mt-1">{company.mfaEnabled ? 'Enabled' : 'Disabled'}</p>
                                            </div>
                                            <div className="text-center">
                                                <div className={`badge ${company.apiAccess ? 'badge-success' : 'badge-neutral'}`}>
                                                    API
                                                </div>
                                                <p className="text-xs mt-1">{company.apiAccess ? 'Enabled' : 'Disabled'}</p>
                                            </div>
                                        </div>

                                        <div className="card-actions justify-end">
                                            <button
                                                className="btn btn-sm btn-ghost"
                                                onClick={() => setSelectedCompany(company)}
                                            >
                                                <FaEye /> View
                                            </button>
                                            <button
                                                className="btn btn-sm btn-info"
                                                onClick={() => setSelectedCompany(company)}
                                            >
                                                <FaEdit /> Edit
                                            </button>
                                            <button
                                                className={`btn btn-sm ${company.status === 'active' ? 'btn-warning' : 'btn-success'}`}
                                                onClick={() => handleToggleStatus(company.id, company.status)}
                                            >
                                                {company.status === 'active' ? 'Suspend' : 'Activate'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* Vue Liste/Tableau */
                        <div className="overflow-x-auto">
                            <table className="table table-zebra">
                                <thead>
                                <tr>
                                    <th>
                                        <button
                                            className="flex items-center gap-1"
                                            onClick={() => handleSort('name')}
                                        >
                                            Company
                                            {sortField === 'name' && (
                                                sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />
                                            )}
                                        </button>
                                    </th>
                                    <th>Domain</th>
                                    <th>Status</th>
                                    <th>Plan</th>
                                    <th>Users</th>
                                    <th>Industry</th>
                                    <th>Billing</th>
                                    <th>SSO Features</th>
                                    <th className="text-right">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredCompanies.map((company) => (
                                    <tr key={company.id} className="hover">
                                        <td>
                                            <div className="font-medium">{company.name}</div>
                                            <div className="text-xs opacity-70">
                                                {company.contact.name}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-1">
                                                <FaGlobe className="opacity-50" />
                                                {company.domain}
                                            </div>
                                        </td>
                                        <td>{getStatusBadge(company.status)}</td>
                                        <td>{getPlanBadge(company.plan)}</td>
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <FaUsers className="opacity-50" />
                                                <span className="font-medium">{company.users}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-1">
                                                <FaIndustry className="opacity-50" />
                                                {company.industry}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{company.billing.amount}</span>
                                                <span className="text-xs opacity-70">
                            {company.billing.cycle}
                          </span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex gap-1">
                                                {company.ssoEnabled && <span className="badge badge-success badge-xs">SSO</span>}
                                                {company.mfaEnabled && <span className="badge badge-info badge-xs">MFA</span>}
                                                {company.apiAccess && <span className="badge badge-warning badge-xs">API</span>}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    className="btn btn-xs btn-ghost"
                                                    onClick={() => setSelectedCompany(company)}
                                                >
                                                    <FaEye />
                                                </button>
                                                <button
                                                    className="btn btn-xs btn-info"
                                                    onClick={() => setSelectedCompany(company)}
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    className="btn btn-xs btn-error"
                                                    onClick={() => handleDeleteCompany(company.id)}
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    <div className="flex flex-col md:flex-row justify-between items-center mt-6">
                        <div className="text-sm opacity-70">
                            Showing {filteredCompanies.length} of {companies.length} companies
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

            {showCreateModal && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-2xl">
                        <h3 className="font-bold text-lg">Add New Company</h3>
                        <p className="py-4">Enter company details to create a new organization</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Company Name*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., Acme Corporation"
                                    className="input input-bordered"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Domain*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., acme.com"
                                    className="input input-bordered"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Industry</span>
                                </label>
                                <select className="select select-bordered">
                                    <option value="">Select Industry</option>
                                    {industries.map(industry => (
                                        <option key={industry} value={industry}>{industry}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Plan</span>
                                </label>
                                <select className="select select-bordered">
                                    <option value="">Select Plan</option>
                                    {plans.map(plan => (
                                        <option key={plan} value={plan}>{plan}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Contact Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., John Doe"
                                    className="input input-bordered"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Contact Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="e.g., john@acme.com"
                                    className="input input-bordered"
                                />
                            </div>
                        </div>

                        <div className="modal-action">
                            <button className="btn btn-ghost" onClick={() => setShowCreateModal(false)}>
                                Cancel
                            </button>
                            <button className="btn btn-primary">
                                Create Company
                            </button>
                        </div>
                    </div>
                    <div className="modal-backdrop" onClick={() => setShowCreateModal(false)}></div>
                </div>
            )}

            {showImportModal && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Import Companies</h3>
                        <p className="py-4">Upload a CSV file with company data</p>

                        <div className="border-2 border-dashed border-base-300 rounded-lg p-8 text-center">
                            <FaUpload className="text-3xl opacity-50 mx-auto mb-4" />
                            <p className="mb-2">Drag & drop your CSV file here</p>
                            <p className="text-sm opacity-70 mb-4">or</p>
                            <button className="btn btn-primary">
                                Browse Files
                            </button>
                        </div>

                        <div className="mt-4">
                            <div className="alert alert-info">
                                <div>
                                    <h4 className="font-bold">CSV Format Required:</h4>
                                    <ul className="text-xs">
                                        <li>Columns: name, domain, industry, contact_email</li>
                                        <li>First row should contain headers</li>
                                        <li>Maximum file size: 10MB</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="modal-action">
                            <button className="btn btn-ghost" onClick={() => setShowImportModal(false)}>
                                Cancel
                            </button>
                            <button className="btn btn-primary">
                                Start Import
                            </button>
                        </div>
                    </div>
                    <div className="modal-backdrop" onClick={() => setShowImportModal(false)}></div>
                </div>
            )}

            {selectedCompany && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-4xl">
                        <h3 className="font-bold text-lg mb-4">Company Details: {selectedCompany.name}</h3>

                        <div className="tabs">
                            <a className="tab tab-bordered tab-active">Overview</a>
                            <a className="tab tab-bordered">Users</a>
                            <a className="tab tab-bordered">Settings</a>
                            <a className="tab tab-bordered">Billing</a>
                            <a className="tab tab-bordered">Activity</a>
                        </div>

                        <div className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-bold mb-2">Basic Information</h4>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="opacity-70">Domain:</span>
                                                <span className="font-medium">{selectedCompany.domain}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="opacity-70">Industry:</span>
                                                <span>{selectedCompany.industry}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="opacity-70">Status:</span>
                                                {getStatusBadge(selectedCompany.status)}
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="opacity-70">Plan:</span>
                                                {getPlanBadge(selectedCompany.plan)}
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-2">Location</h4>
                                        <div className="flex items-center gap-2">
                                            <FaMapMarkerAlt className="opacity-50" />
                                            <span>{selectedCompany.location.city}, {selectedCompany.location.country}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-bold mb-2">Contact Information</h4>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <FaEnvelope className="opacity-50" />
                                                <span>{selectedCompany.contact.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FaPhone className="opacity-50" />
                                                <span>{selectedCompany.contact.phone}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-2">Billing Information</h4>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="opacity-70">Amount:</span>
                                                <span className="font-bold text-lg">{selectedCompany.billing.amount}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="opacity-70">Cycle:</span>
                                                <span>{selectedCompany.billing.cycle}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="opacity-70">Next Billing:</span>
                                                <span>{format(new Date(selectedCompany.billing.nextBilling), 'MMM dd, yyyy')}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <h4 className="font-bold mb-4">SSO Features</h4>
                                <div className="flex gap-4">
                                    <div className={`card ${selectedCompany.ssoEnabled ? 'bg-success/10' : 'bg-base-200'} flex-1`}>
                                        <div className="card-body items-center text-center">
                                            <div className={`text-2xl ${selectedCompany.ssoEnabled ? 'text-success' : 'opacity-30'}`}>
                                                <FaLink />
                                            </div>
                                            <h5 className="card-title text-sm">SSO</h5>
                                            <p className="text-xs">{selectedCompany.ssoEnabled ? 'Enabled' : 'Disabled'}</p>
                                        </div>
                                    </div>

                                    <div className={`card ${selectedCompany.mfaEnabled ? 'bg-info/10' : 'bg-base-200'} flex-1`}>
                                        <div className="card-body items-center text-center">
                                            <div className={`text-2xl ${selectedCompany.mfaEnabled ? 'text-info' : 'opacity-30'}`}>
                                                <FaCheckCircle />
                                            </div>
                                            <h5 className="card-title text-sm">MFA</h5>
                                            <p className="text-xs">{selectedCompany.mfaEnabled ? 'Enabled' : 'Disabled'}</p>
                                        </div>
                                    </div>

                                    <div className={`card ${selectedCompany.apiAccess ? 'bg-warning/10' : 'bg-base-200'} flex-1`}>
                                        <div className="card-body items-center text-center">
                                            <div className={`text-2xl ${selectedCompany.apiAccess ? 'text-warning' : 'opacity-30'}`}>
                                                <FaChartLine />
                                            </div>
                                            <h5 className="card-title text-sm">API Access</h5>
                                            <p className="text-xs">{selectedCompany.apiAccess ? 'Enabled' : 'Disabled'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-3 gap-4">
                                <div className="stat">
                                    <div className="stat-title">Total Users</div>
                                    <div className="stat-value text-2xl">{selectedCompany.users}</div>
                                    <div className="stat-desc">Registered users</div>
                                </div>

                                <div className="stat">
                                    <div className="stat-title">Created</div>
                                    <div className="stat-value text-xl">
                                        {format(new Date(selectedCompany.created), 'MMM dd, yyyy')}
                                    </div>
                                    <div className="stat-desc">{Math.floor((new Date() - new Date(selectedCompany.created)) / (1000 * 60 * 60 * 24))} days ago</div>
                                </div>

                                <div className="stat">
                                    <div className="stat-title">Last Active</div>
                                    <div className="stat-value text-xl">
                                        {format(new Date(selectedCompany.lastActive), 'MMM dd')}
                                    </div>
                                    <div className="stat-desc">{format(new Date(selectedCompany.lastActive), 'HH:mm')}</div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-action">
                            <button className="btn btn-ghost" onClick={() => setSelectedCompany(null)}>
                                Close
                            </button>
                            <button className="btn btn-primary">
                                Edit Company
                            </button>
                        </div>
                    </div>
                    <div className="modal-backdrop" onClick={() => setSelectedCompany(null)}></div>
                </div>
            )}

            <div className="alert alert-info">
                <FaBuilding />
                <div>
                    <h3 className="font-bold">Company Management Guide</h3>
                    <div className="text-xs">
                        • Each company represents an organization using your SSO service<br/>
                        • Companies can have multiple realms and users<br/>
                        • Set up SSO, MFA, and API access per company<br/>
                        • Monitor usage and billing for each organization
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Companies;