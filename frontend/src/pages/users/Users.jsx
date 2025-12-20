import {useEffect, useState} from 'react';
import {
    FaSearch,
    FaPlus,
    FaEdit,
    FaTrash,
    FaEye,
    FaEyeSlash,
    FaFilter,
    FaDownload,
    FaUpload,
    FaKey,
    FaUserPlus,
    FaEnvelope,
    FaPhone,
    FaBuilding,
    FaGlobe,
    FaCalendarAlt,
    FaCheckCircle,
    FaTimesCircle,
    FaLock,
    FaUnlock,
    FaCopy,
    FaSort,
    FaSortUp,
    FaSortDown, FaSave, FaClock, FaTimes
} from 'react-icons/fa';
import { format } from 'date-fns';
import {useSearchParams} from "react-router-dom";
import api from "../../api/index.js";
import Urls from "../../api/Urls.js";

const Users = () => {
    const [users, setUsers] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedRole, setSelectedRole] = useState('all');
    const [selectedRealm, setSelectedRealm] = useState('all');
    const [sortField, setSortField] = useState('name');
    const [sortDirection, setSortDirection] = useState('asc');

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showBulkActions, setShowBulkActions] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (searchParams.get('create') === 'true') {
            setShowAddModal(true);
            const newParams = new URLSearchParams(searchParams);
            newParams.delete('create');
            setSearchParams(newParams, { replace: true });
        }
    }, [searchParams]);

    useEffect(() => {
        fetchUsers()
    }, []);

    async function fetchUsers() {
        const response = await api.get(Urls.user.list)

        setUsers(response.data.map(user => ({
            id: user.id,
            email: user.email,
            name: `${user.firstname || ''} ${user.lastname || ''}`.trim() || user.username,
            firstName: user.firstname || '',
            lastName: user.lastname || '',
            username: user.username,
            status: user.verifiedAt ? 'active' : 'pending',
            role: user.role || 'User',
            phone: user.phone || '',
            company: user.company || '',
            department: user.department || '',
            lastLogin: user.lastLogin,
            createdAt: user.createdAt,
            mfaEnabled: user.mfaEnabled || false,
            emailVerified: !!user.verifiedAt,
            realm: user.realm || 'default-realm',
            lastIp: user.lastIp || null
        })));

        console.log('Fetched users:', response.data)
    }

    const [userForm, setUserForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        phone: '',
        company: '',
        department: '',
        role: 'User',
        realm: 'default-realm',
        status: 'active',
        sendWelcomeEmail: true,
        requirePasswordChange: false
    });

    const roles = ['Super Admin', 'Realm Administrator', 'User Manager', 'Read Only', 'API Developer', 'Security Auditor', 'Billing Manager'];

    const realms = [...new Set(users.map(user => user.realm))];

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const filteredUsers = users
        .filter(user => {
            const matchesSearch =
                user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.company.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
            const matchesRole = selectedRole === 'all' || user.role === selectedRole;
            const matchesRealm = selectedRealm === 'all' || user.realm === selectedRealm;

            return matchesSearch && matchesStatus && matchesRole && matchesRealm;
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

    const getStatusBadge = (status) => {
        const statusConfig = {
            active: { color: 'badge-success', icon: <FaCheckCircle />, text: 'Active' },
            inactive: { color: 'badge-error', icon: <FaTimesCircle />, text: 'Inactive' },
            pending: { color: 'badge-warning', icon: <FaClock />, text: 'Pending' },
            suspended: { color: 'badge-neutral', icon: <FaLock />, text: 'Suspended' }
        };

        const config = statusConfig[status] || { color: 'badge-neutral', text: status };
        return (
            <span className={`badge ${config.color} gap-1`}>
        {config.icon}
                {config.text}
      </span>
        );
    };

    const getRoleBadge = (role) => {
        const roleConfig = {
            'Super Admin': 'badge-primary',
            'Realm Administrator': 'badge-secondary',
            'User Manager': 'badge-info',
            'Read Only': 'badge-neutral',
            'API Developer': 'badge-warning',
            'Security Auditor': 'badge-success',
            'Billing Manager': 'badge-accent'
        };

        return <span className={`badge ${roleConfig[role] || 'badge-neutral'}`}>{role}</span>;
    };

    const handleAddUser = () => {
        const newUser = {
            id: users.length + 1,
            email: userForm.email,
            name: `${userForm.firstName} ${userForm.lastName}`,
            firstName: userForm.firstName,
            lastName: userForm.lastName,
            username: userForm.username,
            status: userForm.status,
            role: userForm.role,
            phone: userForm.phone,
            company: userForm.company,
            department: userForm.department,
            lastLogin: null,
            createdAt: new Date().toISOString(),
            mfaEnabled: false,
            emailVerified: false,
            realm: userForm.realm,
            lastIp: null
        };

        setUsers([...users, newUser]);
        setShowAddModal(false);
        resetForm();
    };

    const handleEditUser = () => {
        setUsers(users.map(user =>
            user.id === selectedUser.id ? { ...user, ...userForm } : user
        ));
        setShowEditModal(false);
        resetForm();
    };

    const handleDeleteUser = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            setUsers(users.filter(user => user.id !== id));
        }
    };

    const handleToggleStatus = (id, currentStatus) => {
        const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
        setUsers(users.map(user =>
            user.id === id ? { ...user, status: newStatus } : user
        ));
    };

    const resetForm = () => {
        setUserForm({
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            phone: '',
            company: '',
            department: '',
            role: 'User',
            realm: 'default-realm',
            status: 'active',
            sendWelcomeEmail: true,
            requirePasswordChange: false
        });
    };

    const prepareEdit = (user) => {
        setSelectedUser(user);
        setUserForm({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
            phone: user.phone,
            company: user.company,
            department: user.department,
            role: user.role,
            realm: user.realm,
            status: user.status,
            sendWelcomeEmail: false,
            requirePasswordChange: false
        });
        setShowEditModal(true);
    };

    const toggleRowSelection = (id) => {
        setSelectedRows(prev =>
            prev.includes(id)
                ? prev.filter(rowId => rowId !== id)
                : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedRows.length === filteredUsers.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(filteredUsers.map(user => user.id));
        }
    };

    const handleBulkAction = (action) => {
        switch(action) {
            case 'activate':
                setUsers(users.map(user =>
                    selectedRows.includes(user.id) ? { ...user, status: 'active' } : user
                ));
                break;
            case 'deactivate':
                setUsers(users.map(user =>
                    selectedRows.includes(user.id) ? { ...user, status: 'inactive' } : user
                ));
                break;
            case 'delete':
                if (window.confirm(`Are you sure you want to delete ${selectedRows.length} users?`)) {
                    setUsers(users.filter(user => !selectedRows.includes(user.id)));
                    setSelectedRows([]);
                }
                break;
        }
        setShowBulkActions(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <FaUserPlus className="text-primary" />
                        Users Management
                    </h1>
                    <p className="text-base-content/70">
                        Manage all system users and their permissions
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
                        onClick={() => setShowAddModal(true)}
                    >
                        <FaPlus /> Add User
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="card bg-base-100 shadow">
                    <div className="card-body p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm opacity-70">Total Users</p>
                                <p className="text-3xl font-bold">{users.length}</p>
                            </div>
                            <div className="text-primary text-2xl">
                                <FaUserPlus />
                            </div>
                        </div>
                        <div className="text-xs opacity-70 mt-2">
                          <span className="text-success">
                            {users.filter(u => u.status === 'active').length} active
                          </span>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow">
                    <div className="card-body p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm opacity-70">Pending Activation</p>
                                <p className="text-3xl font-bold text-warning">
                                    {users.filter(u => u.status === 'pending').length}
                                </p>
                            </div>
                            <div className="text-warning text-2xl">
                                <FaClock />
                            </div>
                        </div>
                        <div className="text-xs opacity-70 mt-2">
                            <span>Require verification</span>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow">
                    <div className="card-body p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm opacity-70">MFA Enabled</p>
                                <p className="text-3xl font-bold text-success">
                                    {users.filter(u => u.mfaEnabled).length}
                                </p>
                            </div>
                            <div className="text-success text-2xl">
                                <FaKey />
                            </div>
                        </div>
                        <div className="text-xs opacity-70 mt-2">
                            <span>{((users.filter(u => u.mfaEnabled).length / users.length) * 100).toFixed(0)}% of users</span>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 shadow">
                    <div className="card-body p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm opacity-70">Last Login</p>
                                <p className="text-xl font-bold">
                                    {format(new Date(users[0]?.lastLogin || new Date()), 'MMM dd')}
                                </p>
                            </div>
                            <div className="text-info text-2xl">
                                <FaCalendarAlt />
                            </div>
                        </div>
                        <div className="text-xs opacity-70 mt-2">
                            <span>Most recent activity</span>
                        </div>
                    </div>
                </div>
            </div>

            {selectedRows.length > 0 && (
                <div className="card bg-base-100 shadow-lg">
                    <div className="card-body p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="badge badge-primary">
                                    {selectedRows.length} selected
                                </div>
                                <span className="text-sm">Bulk actions available</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    className="btn btn-sm btn-success"
                                    onClick={() => handleBulkAction('activate')}
                                >
                                    <FaCheckCircle /> Activate
                                </button>
                                <button
                                    className="btn btn-sm btn-error"
                                    onClick={() => handleBulkAction('deactivate')}
                                >
                                    <FaTimesCircle /> Deactivate
                                </button>
                                <button
                                    className="btn btn-sm btn-outline btn-error"
                                    onClick={() => handleBulkAction('delete')}
                                >
                                    <FaTrash /> Delete
                                </button>
                                <button
                                    className="btn btn-sm btn-ghost"
                                    onClick={() => setSelectedRows([])}
                                >
                                    <FaTimes /> Clear
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                    <div className="flex flex-col lg:flex-row gap-4 mb-6">
                        <div className="form-control flex-1">
                            <div className="input input-bordered flex items-center gap-2">
                                <FaSearch className="opacity-50" />
                                <input
                                    type="text"
                                    placeholder="Search users by name, email, username, or company..."
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
                                <option value="inactive">Inactive</option>
                                <option value="pending">Pending</option>
                                <option value="suspended">Suspended</option>
                            </select>

                            <select
                                className="select select-bordered select-sm"
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)}
                            >
                                <option value="all">All Roles</option>
                                {roles.map(role => (
                                    <option key={role} value={role}>{role}</option>
                                ))}
                            </select>

                            <select
                                className="select select-bordered select-sm"
                                value={selectedRealm}
                                onChange={(e) => setSelectedRealm(e.target.value)}
                            >
                                <option value="all">All Realms</option>
                                {realms.map(realm => (
                                    <option key={realm} value={realm}>{realm}</option>
                                ))}
                            </select>

                            <button className="btn btn-ghost btn-sm">
                                <FaFilter /> More Filters
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                            <tr>
                                <th>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-sm"
                                            checked={selectedRows.length === filteredUsers.length && filteredUsers.length > 0}
                                            onChange={toggleSelectAll}
                                        />
                                        Select All
                                    </label>
                                </th>
                                <th>
                                    <button
                                        className="flex items-center gap-1"
                                        onClick={() => handleSort('name')}
                                    >
                                        User
                                        {sortField === 'name' && (
                                            sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />
                                        )}
                                    </button>
                                </th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Role</th>
                                <th>Realm</th>
                                <th>Last Login</th>
                                <th>Security</th>
                                <th className="text-right">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover">
                                    <td>
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-sm"
                                            checked={selectedRows.includes(user.id)}
                                            onChange={() => toggleRowSelection(user.id)}
                                        />
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar placeholder">
                                                <div className="bg-primary text-primary-content rounded-full w-10">
                            <span className="text-sm">
                              {user.firstName[0]}{user.lastName[0]}
                            </span>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{user.name}</div>
                                                <div className="text-sm opacity-70">@{user.username}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <FaEnvelope className="opacity-50" />
                                            <span>{user.email}</span>
                                            {user.emailVerified && (
                                                <span className="badge badge-success badge-xs">Verified</span>
                                            )}
                                        </div>
                                    </td>
                                    <td>{getStatusBadge(user.status)}</td>
                                    <td>{getRoleBadge(user.role)}</td>
                                    <td>
                                        <div className="flex items-center gap-1">
                                            <FaGlobe className="opacity-50" />
                                            <span className="font-mono text-sm">{user.realm}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex flex-col">
                                            {user.lastLogin ? (
                                                <>
                                                    <span>{format(new Date(user.lastLogin), 'MMM dd, yyyy')}</span>
                                                    <span className="text-xs opacity-70">
                              {format(new Date(user.lastLogin), 'HH:mm')}
                            </span>
                                                </>
                                            ) : (
                                                <span className="text-error">Never</span>
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex gap-1">
                                            {user.mfaEnabled && (
                                                <div className="tooltip" data-tip="MFA Enabled">
                                                    <FaKey className="text-success" />
                                                </div>
                                            )}
                                            {user.lastIp && (
                                                <div className="tooltip" data-tip={`Last IP: ${user.lastIp}`}>
                                                    <FaGlobe className="text-info" />
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex justify-end gap-2">
                                            <button
                                                className="btn btn-xs btn-info"
                                                onClick={() => prepareEdit(user)}
                                            >
                                                <FaEdit /> Edit
                                            </button>
                                            <button
                                                className={`btn btn-xs ${user.status === 'active' ? 'btn-error' : 'btn-success'}`}
                                                onClick={() => handleToggleStatus(user.id, user.status)}
                                            >
                                                {user.status === 'active' ? <FaTimesCircle /> : <FaCheckCircle />}
                                                {user.status === 'active' ? 'Deactivate' : 'Activate'}
                                            </button>
                                            <button
                                                className="btn btn-xs btn-error"
                                                onClick={() => handleDeleteUser(user.id)}
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

                    <div className="flex flex-col md:flex-row justify-between items-center mt-6">
                        <div className="text-sm opacity-70">
                            Showing {filteredUsers.length} of {users.length} users
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

            {showAddModal && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-2xl">
                        <h3 className="font-bold text-lg mb-4">Add New User</h3>

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">First Name*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input input-bordered"
                                        value={userForm.firstName}
                                        onChange={(e) => setUserForm({...userForm, firstName: e.target.value})}
                                        placeholder="John"
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Last Name*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input input-bordered"
                                        value={userForm.lastName}
                                        onChange={(e) => setUserForm({...userForm, lastName: e.target.value})}
                                        placeholder="Doe"
                                    />
                                </div>

                                <div className="form-control md:col-span-2">
                                    <label className="label">
                                        <span className="label-text">Email Address*</span>
                                    </label>
                                    <input
                                        type="email"
                                        className="input input-bordered"
                                        value={userForm.email}
                                        onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                                        placeholder="john.doe@example.com"
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Username*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input input-bordered"
                                        value={userForm.username}
                                        onChange={(e) => setUserForm({...userForm, username: e.target.value})}
                                        placeholder="johndoe"
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Phone Number</span>
                                    </label>
                                    <input
                                        type="tel"
                                        className="input input-bordered"
                                        value={userForm.phone}
                                        onChange={(e) => setUserForm({...userForm, phone: e.target.value})}
                                        placeholder="+1 (555) 123-4567"
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Company</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input input-bordered"
                                        value={userForm.company}
                                        onChange={(e) => setUserForm({...userForm, company: e.target.value})}
                                        placeholder="Acme Corporation"
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Department</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input input-bordered"
                                        value={userForm.department}
                                        onChange={(e) => setUserForm({...userForm, department: e.target.value})}
                                        placeholder="Engineering"
                                    />
                                </div>
                            </div>

                            <div className="divider"></div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Role</span>
                                    </label>
                                    <select
                                        className="select select-bordered"
                                        value={userForm.role}
                                        onChange={(e) => setUserForm({...userForm, role: e.target.value})}
                                    >
                                        {roles.map(role => (
                                            <option key={role} value={role}>{role}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Realm</span>
                                    </label>
                                    <select
                                        className="select select-bordered"
                                        value={userForm.realm}
                                        onChange={(e) => setUserForm({...userForm, realm: e.target.value})}
                                    >
                                        {realms.map(realm => (
                                            <option key={realm} value={realm}>{realm}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Status</span>
                                    </label>
                                    <select
                                        className="select select-bordered"
                                        value={userForm.status}
                                        onChange={(e) => setUserForm({...userForm, status: e.target.value})}
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                        <option value="pending">Pending</option>
                                    </select>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <div className="flex gap-2">
                                        <button className="btn btn-sm btn-outline flex-1">
                                            Generate Password
                                        </button>
                                        <button className="btn btn-sm btn-outline">
                                            <FaCopy />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="divider"></div>

                            <div className="space-y-3">
                                <div className="form-control">
                                    <label className="label cursor-pointer justify-start gap-3">
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-primary"
                                            checked={userForm.sendWelcomeEmail}
                                            onChange={(e) => setUserForm({...userForm, sendWelcomeEmail: e.target.checked})}
                                        />
                                        <div>
                                            <div className="font-medium">Send Welcome Email</div>
                                            <div className="text-sm opacity-70">
                                                Send account activation instructions to the user's email
                                            </div>
                                        </div>
                                    </label>
                                </div>

                                <div className="form-control">
                                    <label className="label cursor-pointer justify-start gap-3">
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-primary"
                                            checked={userForm.requirePasswordChange}
                                            onChange={(e) => setUserForm({...userForm, requirePasswordChange: e.target.checked})}
                                        />
                                        <div>
                                            <div className="font-medium">Require Password Change</div>
                                            <div className="text-sm opacity-70">
                                                User must change password on first login
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="modal-action">
                            <button
                                className="btn btn-ghost"
                                onClick={() => {
                                    setShowAddModal(false);
                                    resetForm();
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={handleAddUser}
                            >
                                <FaUserPlus /> Add User
                            </button>
                        </div>
                    </div>
                    <div className="modal-backdrop" onClick={() => {
                        setShowAddModal(false);
                        resetForm();
                    }}></div>
                </div>
            )}

            {showEditModal && selectedUser && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-2xl">
                        <h3 className="font-bold text-lg mb-4">Edit User: {selectedUser.name}</h3>

                        <div className="tabs">
                            <a className="tab tab-bordered tab-active">Basic Info</a>
                            <a className="tab tab-bordered">Permissions</a>
                            <a className="tab tab-bordered">Security</a>
                            <a className="tab tab-bordered">Advanced</a>
                        </div>

                        <div className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">First Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input input-bordered"
                                        value={userForm.firstName}
                                        onChange={(e) => setUserForm({...userForm, firstName: e.target.value})}
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Last Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input input-bordered"
                                        value={userForm.lastName}
                                        onChange={(e) => setUserForm({...userForm, lastName: e.target.value})}
                                    />
                                </div>

                                <div className="form-control md:col-span-2">
                                    <label className="label">
                                        <span className="label-text">Email Address</span>
                                    </label>
                                    <input
                                        type="email"
                                        className="input input-bordered"
                                        value={userForm.email}
                                        onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Username</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="input input-bordered"
                                        value={userForm.username}
                                        onChange={(e) => setUserForm({...userForm, username: e.target.value})}
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Phone Number</span>
                                    </label>
                                    <input
                                        type="tel"
                                        className="input input-bordered"
                                        value={userForm.phone}
                                        onChange={(e) => setUserForm({...userForm, phone: e.target.value})}
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Role</span>
                                    </label>
                                    <select
                                        className="select select-bordered"
                                        value={userForm.role}
                                        onChange={(e) => setUserForm({...userForm, role: e.target.value})}
                                    >
                                        {roles.map(role => (
                                            <option key={role} value={role}>{role}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Status</span>
                                    </label>
                                    <select
                                        className="select select-bordered"
                                        value={userForm.status}
                                        onChange={(e) => setUserForm({...userForm, status: e.target.value})}
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                        <option value="pending">Pending</option>
                                        <option value="suspended">Suspended</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-6 space-y-4">
                                <h4 className="font-bold">Security Settings</h4>

                                <div className="form-control">
                                    <label className="label cursor-pointer justify-start gap-3">
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-primary"
                                            checked={selectedUser.mfaEnabled}
                                            onChange={(e) => {
                                                setUsers(users.map(u =>
                                                    u.id === selectedUser.id ? { ...u, mfaEnabled: e.target.checked } : u
                                                ));
                                            }}
                                        />
                                        <div>
                                            <div className="font-medium">Two-Factor Authentication</div>
                                            <div className="text-sm opacity-70">
                                                {selectedUser.mfaEnabled ? 'Enabled' : 'Disabled'} for this user
                                            </div>
                                        </div>
                                    </label>
                                </div>

                                <div className="form-control">
                                    <label className="label cursor-pointer justify-start gap-3">
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-primary"
                                            checked={userForm.requirePasswordChange}
                                            onChange={(e) => setUserForm({...userForm, requirePasswordChange: e.target.checked})}
                                        />
                                        <div>
                                            <div className="font-medium">Require Password Reset</div>
                                            <div className="text-sm opacity-70">
                                                Force password change on next login
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="modal-action">
                            <button
                                className="btn btn-ghost"
                                onClick={() => {
                                    setShowEditModal(false);
                                    resetForm();
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={handleEditUser}
                            >
                                <FaSave /> Save Changes
                            </button>
                        </div>
                    </div>
                    <div className="modal-backdrop" onClick={() => {
                        setShowEditModal(false);
                        resetForm();
                    }}></div>
                </div>
            )}
        </div>
    );
};

export default Users;