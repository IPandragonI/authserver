import {useState, useEffect} from 'react';
import {
    FaSearch,
    FaFilter,
    FaDownload,
    FaTrash,
    FaEye,
    FaEyeSlash,
    FaExclamationTriangle,
    FaCheckCircle,
    FaInfoCircle,
    FaBug,
    FaUser,
    FaKey,
    FaClock,
    FaCalendarAlt,
    FaSync,
    FaTimes,
    FaCog,
    FaChartBar,
    FaUserShield,
    FaServer,
    FaGlobe,
    FaSort,
    FaSortUp,
    FaSortDown,
    FaCopy
} from 'react-icons/fa';
import {format, formatDistanceToNow} from 'date-fns';
import {fr} from 'date-fns/locale';
import api from "../../api/index.js";
import Urls from "../../api/Urls.js";

const Logs = () => {
    const [logs, setLogs] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('all');
    const [selectedSource, setSelectedSource] = useState('all');
    const [selectedAction, setSelectedAction] = useState('all');
    const [selectedRealm, setSelectedRealm] = useState('all');
    const [dateRange, setDateRange] = useState('today');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [sortField, setSortField] = useState('timestamp');
    const [sortDirection, setSortDirection] = useState('desc');
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const [selectedLog, setSelectedLog] = useState(null);
    const [autoRefresh, setAutoRefresh] = useState(false);
    const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'
    const [logsPerPage, setLogsPerPage] = useState(20);

    useEffect(() => {
        fetchLogs()
    }, []);

    const fetchLogs = async () => {
        const response = await api.get(Urls.log.list)

        setLogs(response.data.map(log => ({
            id: log.id,
            timestamp: log.timestamp || new Date().toISOString(),
            level: log.level || 'INFO',
            source: log.source || 'SYSTEM',
            userId: log.userId || null,
            username: log.username || 'system',
            ip: log.ip || 'N/A',
            userAgent: log.ua || 'N/A',
            action: log.action || 'N/A',
            details: log.details || 'N/A',
            statusCode: log.statusCode || 200,
            duration: log.duration || 0,
            realm: log.realm || 'default-realm',
            traceId: log.traceId || null,
            sessionId: log.sessionId || null
        })));
    }

    const sources = [...new Set(logs.map(log => log.source))];
    const actions = [...new Set(logs.map(log => log.action))];
    const realms = [...new Set(logs.map(log => log.realm))];

    const logLevels = {
        ERROR: {color: 'bg-error/10 text-error border-error/20', icon: <FaExclamationTriangle/>},
        WARN: {color: 'bg-warning/10 text-warning border-warning/20', icon: <FaExclamationTriangle/>},
        INFO: {color: 'bg-info/10 text-info border-info/20', icon: <FaInfoCircle/>},
        DEBUG: {color: 'bg-neutral/10 text-neutral border-neutral/20', icon: <FaBug/>},
        AUDIT: {color: 'bg-success/10 text-success border-success/20', icon: <FaCheckCircle/>}
    };

    const filteredLogs = logs
        .filter(log => {
            const matchesSearch =
                log.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                log.details?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                log.ip?.includes(searchQuery) ||
                log.traceId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                log.action?.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesLevel = selectedLevel === 'all' || log.level === selectedLevel;
            const matchesSource = selectedSource === 'all' || log.source === selectedSource;
            const matchesAction = selectedAction === 'all' || log.action === selectedAction;
            const matchesRealm = selectedRealm === 'all' || log.realm === selectedRealm;

            const logDate = new Date(log.timestamp);
            let matchesDate = true;

            if (dateRange === 'today') {
                const today = new Date();
                matchesDate = logDate.toDateString() === today.toDateString();
            } else if (dateRange === 'yesterday') {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                matchesDate = logDate.toDateString() === yesterday.toDateString();
            } else if (dateRange === 'last7days') {
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                matchesDate = logDate >= weekAgo;
            } else if (dateRange === 'custom' && startDate && endDate) {
                matchesDate = logDate >= new Date(startDate) && logDate <= new Date(endDate);
            }

            return matchesSearch && matchesLevel && matchesSource && matchesAction && matchesRealm && matchesDate;
        })
        .sort((a, b) => {
            const aValue = a[sortField];
            const bValue = b[sortField];

            if (sortField === 'timestamp') {
                return sortDirection === 'asc'
                    ? new Date(aValue) - new Date(bValue)
                    : new Date(bValue) - new Date(aValue);
            }

            if (sortDirection === 'asc') {
                return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
            } else {
                return bValue < aValue ? -1 : bValue > aValue ? 1 : 0;
            }
        });

    const getStats = () => {
        const total = logs.length;
        const errors = logs.filter(log => log.level === 'ERROR').length;
        const warnings = logs.filter(log => log.level === 'WARN').length;
        const infos = logs.filter(log => log.level === 'INFO').length;

        return {total, errors, warnings, infos};
    };

    const stats = getStats();

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('desc');
        }
    };

    const getLevelBadge = (level) => {
        const config = logLevels[level] || logLevels.INFO;
        return (
            <span className={`badge gap-1 ${config.color}`}>
        {config.icon}
                {level}
      </span>
        );
    };

    const getStatusCodeBadge = (code) => {
        if (code >= 200 && code < 300) {
            return <span className="badge badge-success badge-sm">{code}</span>;
        } else if (code >= 400 && code < 500) {
            return <span className="badge badge-warning badge-sm">{code}</span>;
        } else if (code >= 500) {
            return <span className="badge badge-error badge-sm">{code}</span>;
        }
        return <span className="badge badge-neutral badge-sm">{code}</span>;
    };

    const handleClearLogs = () => {
        if (window.confirm('Are you sure you want to clear all logs? This action cannot be undone.')) {
            setLogs([]);
        }
    };

    const handleExportLogs = () => {
        const dataStr = JSON.stringify(filteredLogs, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        const exportFileDefaultName = `logs-${format(new Date(), 'yyyy-MM-dd')}.json`;

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    useEffect(() => {
        let interval;
        if (autoRefresh) {
            interval = setInterval(() => {
                const newLog = {
                    id: logs.length + 1,
                    timestamp: new Date().toISOString(),
                    level: ['INFO', 'DEBUG', 'WARN'][Math.floor(Math.random() * 3)],
                    source: ['API', 'AUTHENTICATION', 'SSO'][Math.floor(Math.random() * 3)],
                    userId: `user_${Math.floor(Math.random() * 10000)}`,
                    username: `user${Math.floor(Math.random() * 100)}@example.com`,
                    ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
                    action: ['LOGIN', 'LOGOUT', 'API_CALL'][Math.floor(Math.random() * 3)],
                    details: 'Auto-generated log entry',
                    statusCode: 200,
                    duration: Math.floor(Math.random() * 1000),
                    realm: 'default-realm',
                    traceId: `trace_${Math.random().toString(36).substr(2, 9)}`
                };

                setLogs(prev => [newLog, ...prev.slice(0, 49)]);
            }, 5000);
        }

        return () => clearInterval(interval);
    }, [autoRefresh, logs.length]);

    const formatDuration = (ms) => {
        if (ms < 1000) return `${ms}ms`;
        return `${(ms / 1000).toFixed(2)}s`;
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <FaChartBar className="text-primary"/>
                        System Logs
                    </h1>
                    <p className="text-base-content/70">
                        Monitor authentication and system activities
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button
                        className={`btn ${autoRefresh ? 'btn-success' : 'btn-ghost'}`}
                        onClick={() => setAutoRefresh(!autoRefresh)}
                    >
                        <FaSync className={autoRefresh ? 'animate-spin' : ''}/>
                        {autoRefresh ? 'Auto-refresh ON' : 'Auto-refresh'}
                    </button>
                    <button
                        className="btn btn-error"
                        onClick={handleClearLogs}
                    >
                        <FaTrash/> Clear Logs
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={handleExportLogs}
                    >
                        <FaDownload/> Export
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="card bg-base-100 border border-base-300">
                    <div className="card-body">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm opacity-70">Total Logs</p>
                                <p className="text-3xl font-bold">{stats.total}</p>
                            </div>
                            <div className="text-primary text-2xl">
                                <FaChartBar/>
                            </div>
                        </div>
                        <div className="text-xs opacity-70 mt-2">
                            <span>Last 24 hours</span>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 border border-base-300">
                    <div className="card-body">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm opacity-70">Errors</p>
                                <p className="text-3xl font-bold text-error">{stats.errors}</p>
                            </div>
                            <div className="text-error text-2xl">
                                <FaExclamationTriangle/>
                            </div>
                        </div>
                        <div className="text-xs opacity-70 mt-2">
                            <span>{stats.total > 0 ? ((stats.errors / stats.total) * 100).toFixed(1) : 0}% of total</span>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 border border-base-300">
                    <div className="card-body">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm opacity-70">Warnings</p>
                                <p className="text-3xl font-bold text-warning">{stats.warnings}</p>
                            </div>
                            <div className="text-warning text-2xl">
                                <FaExclamationTriangle/>
                            </div>
                        </div>
                        <div className="text-xs opacity-70 mt-2">
                            <span>{stats.total > 0 ? ((stats.warnings / stats.total) * 100).toFixed(1) : 0}% of total</span>
                        </div>
                    </div>
                </div>

                <div className="card bg-base-100 border border-base-300">
                    <div className="card-body">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm opacity-70">Avg Response Time</p>
                                <p className="text-3xl font-bold">
                                    {logs.length > 0 ? formatDuration(logs.reduce((sum, log) => sum + log.duration, 0) / logs.length) : '0ms'}
                                </p>
                            </div>
                            <div className="text-info text-2xl">
                                <FaClock/>
                            </div>
                        </div>
                        <div className="text-xs opacity-70 mt-2">
                            <span>Across all requests</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                    <div className="flex flex-col lg:flex-row gap-4 mb-6">
                        <div className="form-control flex-1">
                            <div className="input input-bordered flex items-center gap-2">
                                <FaSearch className="opacity-50"/>
                                <input
                                    type="text"
                                    placeholder="Search logs by user, IP, action, or details..."
                                    className="w-full"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="btn btn-xs btn-ghost"
                                    >
                                        <FaTimes/>
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="btn-group">
                                <button
                                    className={`btn btn-sm ${viewMode === 'table' ? 'btn-active' : ''}`}
                                    onClick={() => setViewMode('table')}
                                >
                                    Table
                                </button>
                                <button
                                    className={`btn btn-sm ${viewMode === 'card' ? 'btn-active' : ''}`}
                                    onClick={() => setViewMode('card')}
                                >
                                    Cards
                                </button>
                            </div>

                            <button
                                className="btn btn-sm btn-ghost"
                                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                            >
                                <FaFilter/> {showAdvancedFilters ? 'Hide Filters' : 'More Filters'}
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                        <select
                            className="select select-bordered select-sm"
                            value={selectedLevel}
                            onChange={(e) => setSelectedLevel(e.target.value)}
                        >
                            <option value="all">All Levels</option>
                            <option value="ERROR">Error</option>
                            <option value="WARN">Warning</option>
                            <option value="INFO">Info</option>
                            <option value="DEBUG">Debug</option>
                            <option value="AUDIT">Audit</option>
                        </select>

                        <select
                            className="select select-bordered select-sm"
                            value={selectedSource}
                            onChange={(e) => setSelectedSource(e.target.value)}
                        >
                            <option value="all">All Sources</option>
                            {sources.map(source => (
                                <option key={source} value={source}>{source}</option>
                            ))}
                        </select>

                        <select
                            className="select select-bordered select-sm"
                            value={selectedAction}
                            onChange={(e) => setSelectedAction(e.target.value)}
                        >
                            <option value="all">All Actions</option>
                            {actions.map(action => (
                                <option key={action} value={action}>{action}</option>
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

                        <select
                            className="select select-bordered select-sm"
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                        >
                            <option value="today">Today</option>
                            <option value="yesterday">Yesterday</option>
                            <option value="last7days">Last 7 Days</option>
                            <option value="custom">Custom Range</option>
                        </select>
                    </div>

                    {showAdvancedFilters && (
                        <div className="p-4 bg-base-200 rounded-lg mb-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Start Date</span>
                                    </label>
                                    <input
                                        type="datetime-local"
                                        className="input input-bordered"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">End Date</span>
                                    </label>
                                    <input
                                        type="datetime-local"
                                        className="input input-bordered"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Status Code</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g., 200, 404, 500"
                                        className="input input-bordered"
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">IP Address</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g., 192.168.1.1"
                                        className="input input-bordered"
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">User ID</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g., user_12345"
                                        className="input input-bordered"
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Min Duration (ms)</span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="e.g., 1000"
                                        className="input input-bordered"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 mt-4">
                                <button className="btn btn-sm btn-ghost">
                                    Reset Filters
                                </button>
                                <button className="btn btn-sm btn-primary">
                                    Apply Filters
                                </button>
                            </div>
                        </div>
                    )}

                    {viewMode === 'table' ? (
                        <div className="overflow-x-auto">
                            <table className="table table-zebra">
                                <thead>
                                <tr>
                                    <th>
                                        <button
                                            className="flex items-center gap-1"
                                            onClick={() => handleSort('timestamp')}
                                        >
                                            <FaClock/>
                                            Time
                                            {sortField === 'timestamp' && (
                                                sortDirection === 'asc' ? <FaSortUp/> : <FaSortDown/>
                                            )}
                                        </button>
                                    </th>
                                    <th>Level</th>
                                    <th>Source</th>
                                    <th>User</th>
                                    <th>Action</th>
                                    <th>Details</th>
                                    <th>Status</th>
                                    <th className="text-right">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredLogs.map((log) => (
                                    <tr key={log.id} className="hover">
                                        <td>
                                            <div className="flex flex-col">
                          <span className="font-mono text-xs">
                            {format(new Date(log.timestamp), 'HH:mm:ss')}
                          </span>
                                                <span className="text-xs opacity-70">
                            {formatDistanceToNow(new Date(log.timestamp), {addSuffix: true})}
                          </span>
                                            </div>
                                        </td>
                                        <td>{getLevelBadge(log.level)}</td>
                                        <td>
                                            <div className="flex items-center gap-1">
                                                {log.source === 'AUTHENTICATION' && <FaKey/>}
                                                {log.source === 'API' && <FaServer/>}
                                                {log.source === 'SECURITY' && <FaUserShield/>}
                                                {log.source === 'SSO' && <FaGlobe/>}
                                                {log.source === 'AUDIT' && <FaChartBar/>}
                                                <span className="font-medium">{log.source}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex flex-col">
                                                {log.username && (
                                                    <span className="font-medium truncate max-w-[150px]">
                              {log.username}
                            </span>
                                                )}
                                                {log.ip && (
                                                    <span className="text-xs opacity-70 font-mono">
                              {log.ip}
                            </span>
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="font-mono text-sm">{log.action}</div>
                                        </td>
                                        <td>
                                            <div className="max-w-xs truncate" title={log.details}>
                                                {log.details}
                                            </div>
                                            {log.traceId && (
                                                <div className="text-xs opacity-70 font-mono">
                                                    Trace: {log.traceId}
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            <div className="flex flex-col gap-1">
                                                {getStatusCodeBadge(log.statusCode)}
                                                <span className="text-xs opacity-70">
                            {formatDuration(log.duration)}
                          </span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    className="btn btn-xs btn-info"
                                                    onClick={() => setSelectedLog(log)}
                                                >
                                                    <FaEye/> Details
                                                </button>
                                                <button
                                                    className="btn btn-xs btn-ghost"
                                                    onClick={() => navigator.clipboard.writeText(JSON.stringify(log, null, 2))}
                                                >
                                                    <FaCopy/>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        /* Vue Cards */
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {filteredLogs.map((log) => (
                                <div key={log.id} className="card bg-base-100 border border-base-300">
                                    <div className="card-body p-4">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-center gap-2">
                                                {getLevelBadge(log.level)}
                                                <span className="badge badge-outline">
                          {log.source}
                        </span>
                                            </div>
                                            <div className="text-xs opacity-70">
                                                {format(new Date(log.timestamp), 'PPpp')}
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <h4 className="font-bold text-lg mb-1">{log.action}</h4>
                                            <p className="text-sm opacity-90">{log.details}</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 mb-4">
                                            <div className="flex items-center gap-2">
                                                <FaUser className="opacity-50"/>
                                                <div>
                                                    <div
                                                        className="text-sm font-medium truncate">{log.username || 'Anonymous'}</div>
                                                    <div className="text-xs opacity-70 font-mono">{log.ip}</div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col">
                                                <div className="text-sm">Realm: <span
                                                    className="font-medium">{log.realm}</span></div>
                                                <div className="text-sm">Duration: <span
                                                    className="font-medium">{formatDuration(log.duration)}</span></div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                {getStatusCodeBadge(log.statusCode)}
                                                {log.traceId && (
                                                    <span
                                                        className="text-xs opacity-70 font-mono truncate max-w-[100px]">
                            {log.traceId}
                          </span>
                                                )}
                                            </div>

                                            <div className="flex gap-2">
                                                <button
                                                    className="btn btn-xs btn-info"
                                                    onClick={() => setSelectedLog(log)}
                                                >
                                                    <FaEye/> View
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex flex-col md:flex-row justify-between items-center mt-6">
                        <div className="text-sm opacity-70">
                            Showing {filteredLogs.length} of {logs.length} log entries
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <span className="text-sm opacity-70">Show:</span>
                                <select
                                    className="select select-bordered select-sm"
                                    value={logsPerPage}
                                    onChange={(e) => setLogsPerPage(parseInt(e.target.value))}
                                >
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>
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
            </div>

            <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                    <h3 className="card-title">Log Summary</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <h4 className="font-bold mb-3">By Level</h4>
                            <div className="space-y-2">
                                {Object.entries(logLevels).map(([level, config]) => {
                                    const count = logs.filter(log => log.level === level).length;
                                    const percentage = logs.length > 0 ? (count / logs.length * 100).toFixed(1) : 0;

                                    return (
                                        <div key={level} className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className={`badge gap-1 ${config.color}`}>
                                                  {config.icon}
                                                    {level}
                                                </span>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold">{count}</div>
                                                <div className="text-xs opacity-70">{percentage}%</div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold mb-3">By Source</h4>
                            <div className="space-y-2">
                                {sources.map(source => {
                                    const count = logs.filter(log => log.source === source).length;
                                    const percentage = logs.length > 0 ? (count / logs.length * 100).toFixed(1) : 0;

                                    return (
                                        <div key={source} className="flex items-center justify-between">
                                            <div className="font-medium">{source}</div>
                                            <div className="text-right">
                                                <div className="font-bold">{count}</div>
                                                <div className="text-xs opacity-70">{percentage}%</div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold mb-3">By Status Code</h4>
                            <div className="space-y-2">
                                {[200, 201, 400, 401, 404, 429, 500].map(code => {
                                    const count = logs.filter(log => log.statusCode === code).length;
                                    if (count === 0) return null;

                                    return (
                                        <div key={code} className="flex items-center justify-between">
                                            <div>{getStatusCodeBadge(code)}</div>
                                            <div className="font-bold">{count}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {selectedLog && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-4xl max-h-[90vh] overflow-y-auto">
                        <h3 className="font-bold text-lg mb-4">Log Details</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-bold mb-2">Basic Information</h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="opacity-70">Timestamp:</span>
                                            <span className="font-medium">
                                                {format(new Date(selectedLog.timestamp), 'PPpp')}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="opacity-70">Level:</span>
                                            {getLevelBadge(selectedLog.level)}
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="opacity-70">Source:</span>
                                            <span className="font-medium">{selectedLog.source}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="opacity-70">Action:</span>
                                            <span className="font-mono">{selectedLog.action}</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-bold mb-2">Performance</h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="opacity-70">Duration:</span>
                                            <span className="font-bold">{formatDuration(selectedLog.duration)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="opacity-70">Status Code:</span>
                                            {getStatusCodeBadge(selectedLog.statusCode)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-bold mb-2">User Information</h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="opacity-70">Username:</span>
                                            <span className="font-medium">{selectedLog.username || 'N/A'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="opacity-70">User ID:</span>
                                            <span className="font-mono">{selectedLog.userId || 'N/A'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="opacity-70">IP Address:</span>
                                            <span className="font-mono">{selectedLog.ip}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="opacity-70">Realm:</span>
                                            <span>{selectedLog.realm}</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-bold mb-2">Technical Details</h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="opacity-70">Trace ID:</span>
                                            <span className="font-mono">{selectedLog.traceId}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="opacity-70">Session ID:</span>
                                            <span className="font-mono">{selectedLog.sessionId || 'N/A'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-bold mb-2">Details</h4>
                            <div className="bg-base-200 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                                {selectedLog.details}
                            </div>
                        </div>

                        {selectedLog.userAgent && (
                            <div className="mt-4">
                                <h4 className="font-bold mb-2">User Agent</h4>
                                <div className="bg-base-200 rounded-lg p-3 text-sm">
                                    {selectedLog.userAgent}
                                </div>
                            </div>
                        )}

                        <div className="modal-action">
                            <button
                                className="btn btn-ghost"
                                onClick={() => navigator.clipboard.writeText(JSON.stringify(selectedLog, null, 2))}
                            >
                                <FaCopy/> Copy JSON
                            </button>
                            <button className="btn btn-primary" onClick={() => setSelectedLog(null)}>
                                Close
                            </button>
                        </div>
                    </div>
                    <div className="modal-backdrop" onClick={() => setSelectedLog(null)}></div>
                </div>
            )}

            <div className="alert alert-info">
                <FaCog/>
                <div>
                    <h3 className="font-bold">Log Management Tips</h3>
                    <div className="text-xs">
                        • Monitor ERROR and WARN levels closely for system health<br/>
                        • Use trace IDs to follow requests across microservices<br/>
                        • Set up alerts for critical errors (failed logins, system errors)<br/>
                        • Regularly archive old logs to maintain performance<br/>
                        • Use filters to quickly find specific issues or user activities
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Logs;