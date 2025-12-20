import {useEffect, useState} from 'react';
import {
    FaSearch,
    FaPlus,
    FaEdit,
    FaTrash,
    FaCopy,
    FaUserShield,
    FaUsers,
    FaLock,
    FaLockOpen,
    FaEye,
    FaEyeSlash,
    FaFilter,
    FaSort,
    FaSortUp,
    FaSortDown,
    FaCheckCircle,
    FaTimesCircle,
    FaCog,
    FaKey,
    FaGlobe,
    FaDatabase,
    FaServer,
    FaChartBar,
    FaBell,
    FaDownload,
    FaUpload,
    FaClipboardList
} from 'react-icons/fa';
import { format } from 'date-fns';
import api from "../../api/index.js";
import Urls from "../../api/Urls.js";

const Roles = () => {
    const [roles, setRoles] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('all');
    const [selectedDefault, setSelectedDefault] = useState('all');
    const [sortField, setSortField] = useState('name');
    const [sortDirection, setSortDirection] = useState('asc');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showPermissionsModal, setShowPermissionsModal] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);
    const [viewMode, setViewMode] = useState('list'); // 'grid' or 'list'
    const [editingPermissions, setEditingPermissions] = useState(null);

    useEffect(() => {
        fetchRoles()
    }, []);

    const fetchRoles = async () => {
        const response = await api.get(Urls.role.list)
        setRoles(response.data.map((role) => ({
            id: role.id,
            name: role.name,
            code: role.name.toUpperCase().replace(/\s+/g, '_'),
            description: role.description || 'No description provided',
            type: 'system',
            permissions: role.permissions || {},
            isDefault: role.is_default || false,
            isProtected: role.is_protected || false,
            userCount: role.user_count || 0,
            lastModified: role.updated_at || new Date().toISOString(),
            createdBy: role.created_by || 'system',
            color: role.color || 'primary'
        })));
    }

    const roleTypes = [...new Set(roles.map(role => role.type))];

    const allPermissions = {
        users: ['create', 'read', 'update', 'delete', 'manage_all'],
        realms: ['create', 'read', 'update', 'delete', 'manage_all'],
        roles: ['create', 'read', 'update', 'delete', 'assign'],
        companies: ['create', 'read', 'update', 'delete', 'manage_all'],
        logs: ['read', 'export', 'delete_all'],
        settings: ['read', 'update', 'system_config', 'api_config', 'billing']
    };

    const filteredRoles = roles
        .filter(role => {
            const matchesSearch = role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                role.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                role.code.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesType = selectedType === 'all' || role.type === selectedType;
            const matchesDefault = selectedDefault === 'all' ||
                (selectedDefault === 'default' && role.isDefault) ||
                (selectedDefault === 'custom' && !role.isDefault);
            return matchesSearch && matchesType && matchesDefault;
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

    const getTypeBadge = (type) => {
        const typeConfig = {
            system: { color: 'badge-error', icon: <FaServer />, text: 'System' },
            realm: { color: 'badge-primary', icon: <FaGlobe />, text: 'Realm' },
            audit: { color: 'badge-warning', icon: <FaChartBar />, text: 'Audit' },
            user: { color: 'badge-info', icon: <FaUsers />, text: 'User' },
            viewer: { color: 'badge-neutral', icon: <FaEye />, text: 'Viewer' },
            developer: { color: 'badge-secondary', icon: <FaDatabase />, text: 'Developer' },
            billing: { color: 'badge-accent', icon: <FaBell />, text: 'Billing' }
        };
        const config = typeConfig[type] || { color: 'badge-neutral', text: type };
        return (
            <span className={`badge ${config.color} gap-1`}>
        {config.icon}
                {config.text}
      </span>
        );
    };

    const getPermissionBadge = (permission) => {
        const permissionColors = {
            create: 'badge-success',
            read: 'badge-info',
            update: 'badge-warning',
            delete: 'badge-error',
            manage_all: 'badge-primary',
            assign: 'badge-secondary',
            export: 'badge-accent',
            delete_all: 'badge-error',
            system_config: 'badge-primary',
            api_config: 'badge-secondary',
            billing: 'badge-accent'
        };

        return (
            <span className={`badge badge-sm ${permissionColors[permission] || 'badge-neutral'}`}>
        {permission.replace('_', ' ')}
      </span>
        );
    };

    const getColorBadge = (color) => {
        const colorClasses = {
            primary: 'badge-primary',
            secondary: 'badge-secondary',
            accent: 'badge-accent',
            info: 'badge-info',
            success: 'badge-success',
            warning: 'badge-warning',
            error: 'badge-error',
            neutral: 'badge-neutral'
        };

        return <div className={`badge ${colorClasses[color]} w-4 h-4 rounded-full`}></div>;
    };

    const handleDeleteRole = (id) => {
        const role = roles.find(r => r.id === id);
        if (role?.isProtected) {
            alert('Protected roles cannot be deleted.');
            return;
        }

        if (window.confirm('Are you sure you want to delete this role? Users with this role will be reassigned to the default role.')) {
            setRoles(roles.filter(role => role.id !== id));
        }
    };

    const handleDuplicateRole = (role) => {
        const newRole = {
            ...role,
            id: roles.length + 1,
            name: `${role.name} Copy`,
            code: `${role.code}_COPY`,
            isDefault: false,
            isProtected: false,
            userCount: 0,
            createdBy: 'admin@system.com',
            lastModified: new Date().toISOString()
        };
        setRoles([...roles, newRole]);
    };

    const handleToggleDefault = (id) => {
        setRoles(roles.map(role =>
            role.id === id ? { ...role, isDefault: !role.isDefault } : role
        ));
    };

    const handleUpdatePermissions = (roleId, category, permission, checked) => {
        const updatedRoles = roles.map(role => {
            if (role.id === roleId) {
                const updatedPermissions = { ...role.permissions };

                if (checked) {
                    updatedPermissions[category] = [...(updatedPermissions[category] || []), permission];
                } else {
                    updatedPermissions[category] = updatedPermissions[category].filter(p => p !== permission);
                }

                return {
                    ...role,
                    permissions: updatedPermissions,
                    lastModified: new Date().toISOString()
                };
            }
            return role;
        });

        setRoles(updatedRoles);
    };

    const getRoleStats = () => {
        const totalRoles = roles.length;
        const defaultRoles = roles.filter(r => r.isDefault).length;
        const protectedRoles = roles.filter(r => r.isProtected).length;
        const totalUsers = roles.reduce((sum, role) => sum + role.userCount, 0);

        return { totalRoles, defaultRoles, protectedRoles, totalUsers };
    };

    const stats = getRoleStats();

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <FaUserShield className="text-primary" />
                        Role Management
                    </h1>
                    <p className="text-base-content/70">
                        Define and manage user roles and permissions
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button className="btn btn-ghost">
                        <FaDownload /> Export
                    </button>
                    <button className="btn btn-secondary">
                        <FaUpload /> Import
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowCreateModal(true)}
                    >
                        <FaPlus /> Create Role
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="card bg-base-100 border border-base-300">
                    <div className="card-body">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm opacity-70">Total Roles</p>
                                <p className="text-3xl font-bold">{stats.totalRoles}</p>
                            </div>
                            <div className="text-primary text-2xl">
                                <FaUserShield />
                            </div>
                        </div>
                        <div className="text-xs opacity-70 mt-2">
                            <span>{stats.defaultRoles} default roles</span>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 border border-base-300">
                    <div className="card-body">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm opacity-70">Protected Roles</p>
                                <p className="text-3xl font-bold">{stats.protectedRoles}</p>
                            </div>
                            <div className="text-error text-2xl">
                                <FaLock />
                            </div>
                        </div>
                        <div className="text-xs opacity-70 mt-2">
                            <span>System-critical roles</span>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 border border-base-300">
                    <div className="card-body">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm opacity-70">Total Users</p>
                                <p className="text-3xl font-bold">{stats.totalUsers}</p>
                            </div>
                            <div className="text-success text-2xl">
                                <FaUsers />
                            </div>
                        </div>
                        <div className="text-xs opacity-70 mt-2">
                            <span>Assigned to roles</span>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 border border-base-300">
                    <div className="card-body">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm opacity-70">Last Updated</p>
                                <p className="text-3xl font-bold text-lg">
                                    {format(new Date(roles[0]?.lastModified || new Date()), 'MMM dd')}
                                </p>
                            </div>
                            <div className="text-info text-2xl">
                                <FaCog />
                            </div>
                        </div>
                        <div className="text-xs opacity-70 mt-2">
                            <span>Most recent change</span>
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
                                    placeholder="Search roles by name, code, or description..."
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
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                            >
                                <option value="all">All Types</option>
                                {roleTypes.map(type => (
                                    <option key={type} value={type}>
                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                    </option>
                                ))}
                            </select>

                            <select
                                className="select select-bordered select-sm"
                                value={selectedDefault}
                                onChange={(e) => setSelectedDefault(e.target.value)}
                            >
                                <option value="all">All Roles</option>
                                <option value="default">Default Roles</option>
                                <option value="custom">Custom Roles</option>
                            </select>

                            <button className="btn btn-ghost btn-sm">
                                <FaFilter /> More
                            </button>
                        </div>
                    </div>

                    {viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredRoles.map((role) => (
                                <div key={role.id} className="card bg-base-100 border border-base-300 hover:shadow-xl transition-shadow">
                                    <div className="card-body">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="card-title text-lg flex items-center gap-2">
                                                    {role.isProtected ? <FaLock /> : <FaLockOpen />}
                                                    {role.name}
                                                    {role.isDefault && (
                                                        <span className="badge badge-sm badge-primary">Default</span>
                                                    )}
                                                </h3>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="font-mono text-sm opacity-70">{role.code}</span>
                                                    {getColorBadge(role.color)}
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end gap-1">
                                                {getTypeBadge(role.type)}
                                                <div className="flex items-center gap-1">
                                                    <FaUsers className="opacity-50" />
                                                    <span className="text-sm">{role.userCount}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-sm opacity-80 mb-4">{role.description}</p>

                                        <div className="mb-4">
                                            <h4 className="font-bold text-sm mb-2">Key Permissions</h4>
                                            <div className="flex flex-wrap gap-1">
                                                {Object.entries(role.permissions).slice(0, 4).map(([category, perms]) => (
                                                    perms.slice(0, 2).map(perm => (
                                                        <span key={`${category}-${perm}`} className="badge badge-xs">
                                                          {perm}
                                                        </span>
                                                    ))
                                                ))}
                                                {Object.values(role.permissions).flat().length > 8 && (
                                                    <span className="badge badge-xs">
                                                        +{Object.values(role.permissions).flat().length - 8} more
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="text-xs opacity-70 space-y-1 mb-4">
                                            <div className="flex justify-between">
                                                <span>Created by:</span>
                                                <span className="font-medium">{role.createdBy}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Last modified:</span>
                                                <span>{format(new Date(role.lastModified), 'MMM dd, HH:mm')}</span>
                                            </div>
                                        </div>

                                        <div className="card-actions justify-end">
                                            <button
                                                className="btn btn-sm btn-ghost"
                                                onClick={() => setSelectedRole(role)}
                                            >
                                                <FaEye /> View
                                            </button>
                                            <button
                                                className="btn btn-sm btn-info"
                                                onClick={() => setEditingPermissions(role)}
                                            >
                                                <FaKey /> Permissions
                                            </button>
                                            <button
                                                className={`btn btn-sm ${role.isDefault ? 'btn-warning' : 'btn-success'}`}
                                                onClick={() => handleToggleDefault(role.id)}
                                                disabled={role.isProtected}
                                            >
                                                {role.isDefault ? 'Remove Default' : 'Set Default'}
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
                                            Role
                                            {sortField === 'name' && (
                                                sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />
                                            )}
                                        </button>
                                    </th>
                                    <th>Type</th>
                                    <th>Permissions</th>
                                    <th>Users</th>
                                    <th>Status</th>
                                    <th className="text-right">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredRoles.map((role) => (
                                    <tr key={role.id} className="hover">
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className={`text-${role.color}`}>
                                                    {role.isProtected ? <FaLock /> : <FaLockOpen />}
                                                </div>
                                                <div>
                                                    <div className="font-bold">{role.name}</div>
                                                    <div className="text-xs opacity-70 font-mono">{role.code}</div>
                                                    <div className="text-sm opacity-80">{role.description}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{getTypeBadge(role.type)}</td>
                                        <td>
                                            <div className="flex flex-wrap gap-1 max-w-[200px]">
                                                {Object.values(role.permissions).flat().slice(0, 3).map(perm => (
                                                    <span key={perm} className="badge badge-xs">
                              {perm}
                            </span>
                                                ))}
                                                {Object.values(role.permissions).flat().length > 3 && (
                                                    <span className="badge badge-xs">
                              +{Object.values(role.permissions).flat().length - 3}
                            </span>
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <FaUsers className="opacity-50" />
                                                <span className="font-bold">{role.userCount}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex flex-col gap-1">
                                                {role.isDefault && (
                                                    <span className="badge badge-sm badge-primary">Default</span>
                                                )}
                                                {role.isProtected && (
                                                    <span className="badge badge-sm badge-error">Protected</span>
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    className="btn btn-xs btn-info"
                                                    onClick={() => setSelectedRole(role)}
                                                >
                                                    <FaEdit /> Edit
                                                </button>
                                                <button
                                                    className="btn btn-xs btn-warning"
                                                    onClick={() => handleDuplicateRole(role)}
                                                >
                                                    <FaCopy /> Duplicate
                                                </button>
                                                <button
                                                    className="btn btn-xs btn-error"
                                                    onClick={() => handleDeleteRole(role.id)}
                                                    disabled={role.isProtected}
                                                >
                                                    <FaTrash /> Delete
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
                            Showing {filteredRoles.length} of {roles.length} roles
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
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="card-title">Permission Matrix</h3>
                            <p className="text-base-content/70">Compare permissions across roles</p>
                        </div>
                        <button
                            className="btn btn-sm btn-primary"
                            onClick={() => setShowPermissionsModal(true)}
                        >
                            <FaKey /> Configure Permissions
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Permission Category</th>
                                {filteredRoles.slice(0, 4).map(role => (
                                    <th key={role.id} className="text-center">
                                        <div className="font-bold">{role.name}</div>
                                        <div className="text-xs opacity-70">{role.code}</div>
                                    </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {Object.entries(allPermissions).map(([category, permissions]) => (
                                <tr key={category}>
                                    <td className="font-medium capitalize">{category}</td>
                                    {filteredRoles.slice(0, 4).map(role => (
                                        <td key={role.id} className="text-center">
                                            <div className="flex flex-wrap gap-1 justify-center">
                                                {permissions.map(perm => (
                                                    <div key={perm} className="tooltip" data-tip={perm}>
                                                        {role.permissions[category]?.includes(perm) ? (
                                                            <FaCheckCircle className="text-success" />
                                                        ) : (
                                                            <FaTimesCircle className="text-error opacity-30" />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {showCreateModal && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-2xl">
                        <h3 className="font-bold text-lg">Create New Role</h3>
                        <p className="py-4">Define a new role with specific permissions</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Role Name*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., Support Agent"
                                    className="input input-bordered"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Role Code*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., SUPPORT_AGENT"
                                    className="input input-bordered font-mono"
                                />
                            </div>

                            <div className="form-control md:col-span-2">
                                <label className="label">
                                    <span className="label-text">Description</span>
                                </label>
                                <textarea
                                    className="textarea textarea-bordered"
                                    placeholder="Describe the purpose and responsibilities of this role..."
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Role Type</span>
                                </label>
                                <select className="select select-bordered">
                                    <option value="system">System</option>
                                    <option value="realm">Realm</option>
                                    <option value="user">User Management</option>
                                    <option value="audit">Audit</option>
                                    <option value="viewer">Viewer</option>
                                    <option value="developer">Developer</option>
                                    <option value="billing">Billing</option>
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Color</span>
                                </label>
                                <select className="select select-bordered">
                                    <option value="primary">Blue (Primary)</option>
                                    <option value="secondary">Purple (Secondary)</option>
                                    <option value="accent">Green (Accent)</option>
                                    <option value="info">Cyan (Info)</option>
                                    <option value="warning">Orange (Warning)</option>
                                    <option value="error">Red (Error)</option>
                                    <option value="neutral">Gray (Neutral)</option>
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text">Default Role</span>
                                    <input type="checkbox" className="toggle toggle-primary" />
                                </label>
                            </div>

                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <span className="label-text">Protected Role</span>
                                    <input type="checkbox" className="toggle toggle-primary" />
                                </label>
                            </div>
                        </div>

                        <div className="modal-action">
                            <button className="btn btn-ghost" onClick={() => setShowCreateModal(false)}>
                                Cancel
                            </button>
                            <button className="btn btn-primary">
                                Create Role
                            </button>
                        </div>
                    </div>
                    <div className="modal-backdrop" onClick={() => setShowCreateModal(false)}></div>
                </div>
            )}

            {editingPermissions && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-4xl max-h-[90vh] overflow-y-auto">
                        <h3 className="font-bold text-lg mb-4">
                            Edit Permissions: {editingPermissions.name}
                        </h3>

                        <div className="tabs">
                            <a className="tab tab-bordered tab-active">Users</a>
                            <a className="tab tab-bordered">Realms</a>
                            <a className="tab tab-bordered">Roles</a>
                            <a className="tab tab-bordered">Companies</a>
                            <a className="tab tab-bordered">Logs</a>
                            <a className="tab tab-bordered">Settings</a>
                        </div>

                        <div className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {Object.entries(allPermissions).map(([category, permissions]) => (
                                    <div key={category} className="card bg-base-200">
                                        <div className="card-body p-4">
                                            <h4 className="card-title text-sm capitalize mb-3">{category}</h4>
                                            <div className="space-y-2">
                                                {permissions.map(permission => (
                                                    <div key={permission} className="form-control">
                                                        <label className="label cursor-pointer justify-start gap-2">
                                                            <input
                                                                type="checkbox"
                                                                className="checkbox checkbox-sm"
                                                                checked={editingPermissions.permissions[category]?.includes(permission) || false}
                                                                onChange={(e) => handleUpdatePermissions(
                                                                    editingPermissions.id,
                                                                    category,
                                                                    permission,
                                                                    e.target.checked
                                                                )}
                                                            />
                                                            <span className="label-text">
                                {getPermissionBadge(permission)}
                              </span>
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="modal-action">
                            <button className="btn btn-ghost" onClick={() => setEditingPermissions(null)}>
                                Cancel
                            </button>
                            <button className="btn btn-primary" onClick={() => setEditingPermissions(null)}>
                                Save Permissions
                            </button>
                        </div>
                    </div>
                    <div className="modal-backdrop" onClick={() => setEditingPermissions(null)}></div>
                </div>
            )}

            {selectedRole && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-4xl">
                        <h3 className="font-bold text-lg mb-4">Role Details: {selectedRole.name}</h3>

                        <div className="tabs">
                            <a className="tab tab-bordered tab-active">Overview</a>
                            <a className="tab tab-bordered">Permissions</a>
                            <a className="tab tab-bordered">Assigned Users</a>
                            <a className="tab tab-bordered">History</a>
                        </div>

                        <div className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-bold mb-2">Basic Information</h4>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="opacity-70">Code:</span>
                                                <span className="font-mono">{selectedRole.code}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="opacity-70">Type:</span>
                                                {getTypeBadge(selectedRole.type)}
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="opacity-70">Status:</span>
                                                <div className="flex gap-2">
                                                    {selectedRole.isDefault && (
                                                        <span className="badge badge-primary">Default</span>
                                                    )}
                                                    {selectedRole.isProtected && (
                                                        <span className="badge badge-error">Protected</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="opacity-70">Color:</span>
                                                {getColorBadge(selectedRole.color)}
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-2">Description</h4>
                                        <p className="text-sm">{selectedRole.description}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-bold mb-2">Statistics</h4>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="opacity-70">Assigned Users:</span>
                                                <span className="font-bold text-xl">{selectedRole.userCount}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="opacity-70">Created by:</span>
                                                <span>{selectedRole.createdBy}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="opacity-70">Last Modified:</span>
                                                <span>{format(new Date(selectedRole.lastModified), 'PPpp')}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-bold mb-2">Total Permissions</h4>
                                        <div className="text-3xl font-bold text-primary">
                                            {Object.values(selectedRole.permissions).flat().length}
                                        </div>
                                        <div className="text-xs opacity-70">
                                            Across {Object.keys(selectedRole.permissions).length} categories
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <h4 className="font-bold mb-3">Permissions Breakdown</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {Object.entries(selectedRole.permissions).map(([category, permissions]) => (
                                        <div key={category} className="card bg-base-200">
                                            <div className="card-body p-3">
                                                <h5 className="font-bold capitalize mb-2">{category}</h5>
                                                <div className="flex flex-wrap gap-1">
                                                    {permissions.map(permission => (
                                                        <span key={permission} className="badge badge-sm">
                                                          {permission.replace('_', ' ')}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="modal-action">
                            <button className="btn btn-ghost" onClick={() => setSelectedRole(null)}>
                                Close
                            </button>
                            <button className="btn btn-primary">
                                Edit Role
                            </button>
                        </div>
                    </div>
                    <div className="modal-backdrop" onClick={() => setSelectedRole(null)}></div>
                </div>
            )}

            {showPermissionsModal && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-3xl">
                        <h3 className="font-bold text-lg">Permission Categories</h3>
                        <p className="py-4">Configure available permission categories and options</p>

                        <div className="space-y-4">
                            {Object.entries(allPermissions).map(([category, permissions]) => (
                                <div key={category} className="card bg-base-200">
                                    <div className="card-body p-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="font-bold capitalize">{category} Permissions</h4>
                                            <button className="btn btn-xs btn-primary">
                                                <FaPlus /> Add Permission
                                            </button>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {permissions.map(permission => (
                                                <div key={permission} className="badge badge-lg gap-2">
                                                    {permission.replace('_', ' ')}
                                                    <button className="btn btn-xs btn-circle btn-ghost">
                                                        <FaTimes />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="modal-action">
                            <button className="btn btn-ghost" onClick={() => setShowPermissionsModal(false)}>
                                Cancel
                            </button>
                            <button className="btn btn-primary">
                                Save Configuration
                            </button>
                        </div>
                    </div>
                    <div className="modal-backdrop" onClick={() => setShowPermissionsModal(false)}></div>
                </div>
            )}

            <div className="alert alert-info">
                <FaClipboardList />
                <div>
                    <h3 className="font-bold">Role Management Best Practices</h3>
                    <div className="text-xs">
                        • Follow the principle of least privilege (PoLP)<br/>
                        • Create role templates for common use cases<br/>
                        • Regularly audit role assignments and permissions<br/>
                        • Use protected roles for system-critical functions<br/>
                        • Document role purposes and permission justifications
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Roles;