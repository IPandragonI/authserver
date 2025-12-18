import {useState, useEffect} from 'react';
import {
    FaSearch,
    FaPlus,
    FaEdit,
    FaTrash,
    FaCopy,
    FaEye,
    FaEyeSlash,
    FaFilter,
    FaDownload,
    FaSync,
    FaKey,
    FaGlobe,
    FaLock,
    FaLockOpen,
    FaUsers,
    FaCalendarAlt,
    FaSort,
    FaSortUp,
    FaSortDown
} from 'react-icons/fa';
import {format} from 'date-fns';
import {useSearchParams} from 'react-router-dom';

const Realms = () => {
    const [realms, setRealms] = useState([
        {
            id: 1,
            name: 'default-realm',
            displayName: 'Default Realm',
            description: 'Main authentication realm for all users',
            status: 'active',
            visibility: 'public',
            userCount: 1250,
            activeSessions: 342,
            lastModified: '2024-01-15T10:30:00',
            createdBy: 'admin@system.com',
            sslRequired: true,
            registrationAllowed: true,
            bruteForceProtected: true
        },
        {
            id: 2,
            name: 'enterprise-realm',
            displayName: 'Enterprise Realm',
            description: 'Dedicated realm for enterprise clients',
            status: 'active',
            visibility: 'private',
            userCount: 450,
            activeSessions: 89,
            lastModified: '2024-01-14T15:45:00',
            createdBy: 'admin@enterprise.com',
            sslRequired: true,
            registrationAllowed: false,
            bruteForceProtected: true
        },
        {
            id: 3,
            name: 'test-realm',
            displayName: 'Testing Environment',
            description: 'Realm for testing and development purposes',
            status: 'inactive',
            visibility: 'private',
            userCount: 25,
            activeSessions: 0,
            lastModified: '2024-01-13T09:15:00',
            createdBy: 'dev@test.com',
            sslRequired: false,
            registrationAllowed: true,
            bruteForceProtected: false
        },
        {
            id: 4,
            name: 'partner-realm',
            displayName: 'Partners Access',
            description: 'External partners authentication realm',
            status: 'active',
            visibility: 'restricted',
            userCount: 180,
            activeSessions: 42,
            lastModified: '2024-01-12T14:20:00',
            createdBy: 'admin@partner.com',
            sslRequired: true,
            registrationAllowed: false,
            bruteForceProtected: true
        },
        {
            id: 5,
            name: 'mobile-realm',
            displayName: 'Mobile Applications',
            description: 'Realm dedicated to mobile applications',
            status: 'maintenance',
            visibility: 'public',
            userCount: 850,
            activeSessions: 210,
            lastModified: '2024-01-11T11:10:00',
            createdBy: 'mobile@admin.com',
            sslRequired: true,
            registrationAllowed: true,
            bruteForceProtected: true
        }
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedVisibility, setSelectedVisibility] = useState('all');
    const [sortField, setSortField] = useState('name');
    const [sortDirection, setSortDirection] = useState('asc');
    const [showModal, setShowModal] = useState(false);
    const [selectedRealm, setSelectedRealm] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (searchParams.get('create') === 'true') {
            setShowModal(true);
            const newParams = new URLSearchParams(searchParams);
            newParams.delete('create');
            setSearchParams(newParams, { replace: true });
        }
    }, [searchParams]);

    const filteredRealms = realms
        .filter(realm => {
            const matchesSearch = realm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                realm.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                realm.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = selectedStatus === 'all' || realm.status === selectedStatus;
            const matchesVisibility = selectedVisibility === 'all' || realm.visibility === selectedVisibility;
            return matchesSearch && matchesStatus && matchesVisibility;
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
            active: {color: 'badge-success', text: 'Active'},
            inactive: {color: 'badge-error', text: 'Inactive'},
            maintenance: {color: 'badge-warning', text: 'Maintenance'},
            draft: {color: 'badge-neutral', text: 'Draft'}
        };
        const config = statusConfig[status] || {color: 'badge-neutral', text: status};
        return <span className={`badge ${config.color}`}>{config.text}</span>;
    };

    const getVisibilityBadge = (visibility) => {
        const visibilityConfig = {
            public: {color: 'badge-info', icon: <FaGlobe className="mr-1"/>, text: 'Public'},
            private: {color: 'badge-warning', icon: <FaLock className="mr-1"/>, text: 'Private'},
            restricted: {color: 'badge-error', icon: <FaLockOpen className="mr-1"/>, text: 'Restricted'}
        };
        const config = visibilityConfig[visibility] || {color: 'badge-neutral', text: visibility};
        return (
            <span className={`badge ${config.color}`}>
                {config.icon} {config.text}
            </span>
        );
    };

    const handleDeleteRealm = (id) => {
        if (window.confirm('Are you sure you want to delete this realm? This action cannot be undone.')) {
            setRealms(realms.filter(realm => realm.id !== id));
        }
    };

    const handleDuplicateRealm = (realm) => {
        const newRealm = {
            ...realm,
            id: realms.length + 1,
            name: `${realm.name}-copy`,
            displayName: `${realm.displayName} (Copy)`,
            status: 'draft'
        };
        setRealms([...realms, newRealm]);
    };

    const handleToggleStatus = (id) => {
        setRealms(realms.map(realm =>
            realm.id === id
                ? {...realm, status: realm.status === 'active' ? 'inactive' : 'active'}
                : realm
        ));
    };

    const closeCreateModal = () => {
        setShowModal(false);
        if (searchParams.get('create')) {
            const newParams = new URLSearchParams(searchParams);
            newParams.delete('create');
            setSearchParams(newParams, {replace: true});
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <FaKey className="text-primary"/>
                        Realms Management
                    </h1>
                    <p className="text-base-content/70">
                        Configure and manage authentication realms
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button className="btn btn-ghost">
                        <FaDownload/> Export
                    </button>
                    <button className="btn btn-ghost">
                        <FaSync/> Refresh
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowModal(true)}
                    >
                        <FaPlus/> Create Realm
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="stat bg-base-100 rounded-lg border border-base-300">
                    <div className="stat-figure text-primary">
                        <FaKey size={24}/>
                    </div>
                    <div className="stat-title">Total Realms</div>
                    <div className="stat-value">{realms.length}</div>
                    <div className="stat-desc">All environments</div>
                </div>

                <div className="stat bg-base-100 rounded-lg border border-base-300">
                    <div className="stat-figure text-success">
                        <FaUsers size={24}/>
                    </div>
                    <div className="stat-title">Active Users</div>
                    <div className="stat-value">{realms.reduce((sum, realm) => sum + realm.userCount, 0)}</div>
                    <div className="stat-desc">Across all realms</div>
                </div>

                <div className="stat bg-base-100 rounded-lg border border-base-300">
                    <div className="stat-figure text-info">
                        <FaGlobe size={24}/>
                    </div>
                    <div className="stat-title">Public Realms</div>
                    <div className="stat-value">{realms.filter(r => r.visibility === 'public').length}</div>
                    <div className="stat-desc">Visible to all</div>
                </div>

                <div className="stat bg-base-100 rounded-lg border border-base-300">
                    <div className="stat-figure text-warning">
                        <FaCalendarAlt size={24}/>
                    </div>
                    <div className="stat-title">Last Updated</div>
                    <div className="stat-value text-lg">
                        {format(new Date(realms[0]?.lastModified || new Date()), 'MMM dd')}
                    </div>
                    <div className="stat-desc">Most recent change</div>
                </div>
            </div>

            <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                    <div className="flex flex-col gap-4 mb-6">
                        <div className="flex flex-wrap gap-2">
                            <select
                                className="select select-bordered"
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="maintenance">Maintenance</option>
                                <option value="draft">Draft</option>
                            </select>

                            <select
                                className="select select-bordered"
                                value={selectedVisibility}
                                onChange={(e) => setSelectedVisibility(e.target.value)}
                            >
                                <option value="all">All Visibility</option>
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                                <option value="restricted">Restricted</option>
                            </select>

                            <button className="btn btn-ghost">
                                <FaFilter/> More Filters
                            </button>
                        </div>
                        <div className="form-control flex-1">
                            <div className="input input-bordered flex items-center gap-2">
                                <FaSearch className="opacity-50"/>
                                <input
                                    type="text"
                                    placeholder="Search realms by name, display name, or description..."
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
                                        Name
                                        {sortField === 'name' && (
                                            sortDirection === 'asc' ? <FaSortUp/> : <FaSortDown/>
                                        )}
                                    </button>
                                </th>
                                <th>Display Name</th>
                                <th>Status</th>
                                <th>Visibility</th>
                                <th>Users</th>
                                <th>Security</th>
                                <th>Last Modified</th>
                                <th className="text-right">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredRealms.map((realm) => (
                                <tr key={realm.id} className="hover">
                                    <td>
                                        <div className="font-mono text-sm">{realm.name}</div>
                                        <div className="text-xs opacity-70 truncate max-w-xs">
                                            {realm.description}
                                        </div>
                                    </td>
                                    <td className="font-medium">{realm.displayName}</td>
                                    <td>{getStatusBadge(realm.status)}</td>
                                    <td>{getVisibilityBadge(realm.visibility)}</td>
                                    <td>
                                        <div className="flex flex-col">
                                            <span className="font-semibold">{realm.userCount}</span>
                                            <span className="text-xs opacity-70">
                          {realm.activeSessions} active
                        </span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-1">
                                                {realm.sslRequired ? (
                                                    <FaLock className="text-success" size={12}/>
                                                ) : (
                                                    <FaLockOpen className="text-error" size={12}/>
                                                )}
                                                <span className="text-xs">SSL: {realm.sslRequired ? 'Yes' : 'No'}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                {realm.bruteForceProtected ? (
                                                    <FaEye className="text-success" size={12}/>
                                                ) : (
                                                    <FaEyeSlash className="text-error" size={12}/>
                                                )}
                                                <span className="text-xs">Brute Force</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex flex-col">
                                            <span>{format(new Date(realm.lastModified), 'MMM dd, yyyy')}</span>
                                            <span className="text-xs opacity-70">
                          {format(new Date(realm.lastModified), 'HH:mm')}
                        </span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex justify-end gap-2">
                                            <button
                                                className="btn btn-xs btn-info"
                                                onClick={() => setSelectedRealm(realm)}
                                            >
                                                <FaEdit/> Edit
                                            </button>
                                            <button
                                                className="btn btn-xs btn-warning"
                                                onClick={() => handleDuplicateRealm(realm)}
                                            >
                                                <FaCopy/> Duplicate
                                            </button>
                                            <button
                                                className={`btn btn-xs ${realm.status === 'active' ? 'btn-error' : 'btn-success'}`}
                                                onClick={() => handleToggleStatus(realm.id)}
                                            >
                                                {realm.status === 'active' ? <FaEyeSlash/> : <FaEye/>}
                                                {realm.status === 'active' ? 'Disable' : 'Enable'}
                                            </button>
                                            <button
                                                className="btn btn-xs btn-error"
                                                onClick={() => handleDeleteRealm(realm.id)}
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
                            Showing {filteredRealms.length} of {realms.length} realms
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

            {showModal && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Create New Realm</h3>
                        <p className="py-4">Configure a new authentication realm</p>

                        <div className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Realm Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., my-realm"
                                    className="input input-bordered"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Display Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., My Application Realm"
                                    className="input input-bordered"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Description</span>
                                </label>
                                <textarea
                                    className="textarea textarea-bordered"
                                    placeholder="Describe the purpose of this realm..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label cursor-pointer">
                                        <span className="label-text">SSL Required</span>
                                        <input type="checkbox" className="toggle toggle-primary" defaultChecked/>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer">
                                        <span className="label-text">Allow Registration</span>
                                        <input type="checkbox" className="toggle toggle-primary"/>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="modal-action">
                            <button className="btn btn-ghost" onClick={() => setShowModal(false)}>
                                Cancel
                            </button>
                            <button className="btn btn-primary">
                                Create Realm
                            </button>
                        </div>
                    </div>
                    <div className="modal-backdrop" onClick={() => setShowModal(false)}></div>
                </div>
            )}

            {selectedRealm && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-4xl">
                        <h3 className="font-bold text-lg">Edit Realm: {selectedRealm.displayName}</h3>

                        <div className="tabs">
                            <a className="tab tab-bordered tab-active">General</a>
                            <a className="tab tab-bordered">Security</a>
                            <a className="tab tab-bordered">Authentication</a>
                            <a className="tab tab-bordered">Advanced</a>
                        </div>

                        <div className="p-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Realm ID</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={selectedRealm.name}
                                        className="input input-bordered"
                                        readOnly
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Status</span>
                                    </label>
                                    <select className="select select-bordered">
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                        <option value="maintenance">Maintenance</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="modal-action">
                            <button className="btn btn-ghost" onClick={() => setSelectedRealm(null)}>
                                Cancel
                            </button>
                            <button className="btn btn-primary">
                                Save Changes
                            </button>
                        </div>
                    </div>
                    <div className="modal-backdrop" onClick={() => setSelectedRealm(null)}></div>
                </div>
            )}

            <div className="alert alert-info">
                <FaKey/>
                <div>
                    <h3 className="font-bold">Realm Management Tips</h3>
                    <div className="text-xs">
                        • Each realm acts as a separate authentication domain<br/>
                        • Public realms are accessible to all applications<br/>
                        • Private realms require explicit client registration<br/>
                        • Enable brute force protection for sensitive realms
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Realms;