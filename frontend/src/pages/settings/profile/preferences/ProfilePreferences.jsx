import { useState } from 'react';
import {
    FaPalette,
    FaLanguage,
    FaDesktop,
    FaMoon,
    FaSun,
    FaTextHeight,
    FaColumns,
    FaMousePointer,
    FaKeyboard,
    FaClock,
    FaCalendarAlt,
    FaGlobe,
    FaSave,
    FaUndo,
    FaCog,
    FaEye,
    FaEyeSlash,
    FaCheckCircle,
    FaTimesCircle,
    FaChevronRight,
    FaBell,
    FaChartBar,
    FaDatabase,
    FaFilter,
    FaSortAmountDown,
    FaTable,
    FaTh,
    FaList,
    FaCompress,
    FaExpand
} from 'react-icons/fa';

const ProfilePreferences = () => {
    const [interfacePrefs, setInterfacePrefs] = useState({
        theme: {
            mode: 'system', // 'light', 'dark', 'system'
            primaryColor: '#3B82F6',
            secondaryColor: '#8B5CF6',
            accentColor: '#10B981'
        },
        display: {
            density: 'comfortable', // 'compact', 'comfortable', 'spacious'
            fontSize: 'medium', // 'small', 'medium', 'large', 'x-large'
            fontFamily: 'system-ui',
            animationSpeed: 'normal' // 'slow', 'normal', 'fast', 'none'
        },
        layout: {
            sidebarPosition: 'left', // 'left', 'right', 'top', 'hidden'
            sidebarWidth: 'normal', // 'compact', 'normal', 'wide'
            headerType: 'sticky', // 'static', 'sticky', 'hidden'
            footerVisible: true
        }
    });

    const [regionalPrefs, setRegionalPrefs] = useState({
        language: {
            interface: 'en',
            format: 'en-US',
            timezone: 'America/New_York'
        },
        dateTime: {
            dateFormat: 'MM/DD/YYYY', // 'DD/MM/YYYY', 'YYYY-MM-DD'
            timeFormat: '12h', // '12h', '24h'
            firstDayOfWeek: 'sunday' // 'sunday', 'monday'
        },
        numbers: {
            numberFormat: '1,234.56', // '1.234,56'
            currency: 'USD',
            unitSystem: 'metric' // 'metric', 'imperial'
        }
    });

    const [accessibilityPrefs, setAccessibilityPrefs] = useState({
        visual: {
            highContrast: false,
            reduceMotion: false,
            colorBlindMode: 'none', // 'none', 'protanopia', 'deuteranopia', 'tritanopia'
            cursorSize: 'normal', // 'small', 'normal', 'large'
        },
        navigation: {
            keyboardNavigation: true,
            tabFocusHighlight: true,
            skipToContent: true,
            focusTraps: true
        },
        reading: {
            lineHeight: 'normal', // 'tight', 'normal', 'loose'
            letterSpacing: 'normal', // 'tight', 'normal', 'wide'
            textJustification: 'left' // 'left', 'center', 'justify'
        }
    });

    const [workspacePrefs, setWorkspacePrefs] = useState({
        dashboard: {
            defaultView: 'overview', // 'overview', 'analytics', 'minimal'
            refreshInterval: 300,
            showQuickStats: true,
            showCharts: true,
            showRecentActivity: true
        },
        tables: {
            defaultPageSize: 25, // 10, 25, 50, 100
            stripedRows: true,
            hoverHighlight: true,
            rowNumbers: false,
            compactView: false
        },
        forms: {
            autoSave: true,
            saveInterval: 30, // seconds
            inlineValidation: true,
            tooltipHelp: true,
            confirmDelete: true
        }
    });

    const [testData] = useState({
        languages: [
            { code: 'en', name: 'English', nativeName: 'English' },
            { code: 'fr', name: 'French', nativeName: 'Français' },
            { code: 'es', name: 'Spanish', nativeName: 'Español' },
            { code: 'de', name: 'German', nativeName: 'Deutsch' },
            { code: 'ja', name: 'Japanese', nativeName: '日本語' }
        ],
        timezones: [
            { value: 'America/New_York', label: 'Eastern Time (ET)' },
            { value: 'America/Chicago', label: 'Central Time (CT)' },
            { value: 'America/Denver', label: 'Mountain Time (MT)' },
            { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
            { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
            { value: 'Europe/Paris', label: 'Central European Time (CET)' },
            { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' }
        ],
        colors: [
            { name: 'Blue', value: '#3B82F6', css: 'primary' },
            { name: 'Purple', value: '#8B5CF6', css: 'secondary' },
            { name: 'Green', value: '#10B981', css: 'accent' },
            { name: 'Red', value: '#EF4444', css: 'error' },
            { name: 'Orange', value: '#F59E0B', css: 'warning' },
            { name: 'Cyan', value: '#06B6D4', css: 'info' }
        ],
        fontSizes: [
            { value: 'small', label: 'Small', size: '0.875rem' },
            { value: 'medium', label: 'Medium', size: '1rem' },
            { value: 'large', label: 'Large', size: '1.125rem' },
            { value: 'x-large', label: 'Extra Large', size: '1.25rem' }
        ]
    });

    const [activeTab, setActiveTab] = useState('interface');
    const [isEditing, setIsEditing] = useState(false);
    const [originalPrefs, setOriginalPrefs] = useState(null);
    const [saveStatus, setSaveStatus] = useState(null);

    const startEditing = () => {
        setOriginalPrefs({
            interface: JSON.parse(JSON.stringify(interfacePrefs)),
            regional: JSON.parse(JSON.stringify(regionalPrefs)),
            accessibility: JSON.parse(JSON.stringify(accessibilityPrefs)),
            workspace: JSON.parse(JSON.stringify(workspacePrefs))
        });
        setIsEditing(true);
    };

    const cancelEditing = () => {
        if (originalPrefs) {
            setInterfacePrefs(originalPrefs.interface);
            setRegionalPrefs(originalPrefs.regional);
            setAccessibilityPrefs(originalPrefs.accessibility);
            setWorkspacePrefs(originalPrefs.workspace);
        }
        setIsEditing(false);
        setOriginalPrefs(null);
    };

    const savePreferences = () => {
        setSaveStatus('saving');

        setTimeout(() => {
            setIsEditing(false);
            setOriginalPrefs(null);
            setSaveStatus('success');

            setTimeout(() => setSaveStatus(null), 3000);
        }, 1000);
    };

    const resetToDefaults = (category) => {
        if (window.confirm('Are you sure you want to reset to default settings?')) {
            switch(category) {
                case 'interface':
                    setInterfacePrefs({
                        theme: { mode: 'system', primaryColor: '#3B82F6', secondaryColor: '#8B5CF6', accentColor: '#10B981' },
                        display: { density: 'comfortable', fontSize: 'medium', fontFamily: 'system-ui', animationSpeed: 'normal' },
                        layout: { sidebarPosition: 'left', sidebarWidth: 'normal', headerType: 'sticky', footerVisible: true }
                    });
                    break;
                case 'regional':
                    setRegionalPrefs({
                        language: { interface: 'en', format: 'en-US', timezone: 'America/New_York' },
                        dateTime: { dateFormat: 'MM/DD/YYYY', timeFormat: '12h', firstDayOfWeek: 'sunday' },
                        numbers: { numberFormat: '1,234.56', currency: 'USD', unitSystem: 'metric' }
                    });
                    break;
                case 'accessibility':
                    setAccessibilityPrefs({
                        visual: { highContrast: false, reduceMotion: false, colorBlindMode: 'none', cursorSize: 'normal' },
                        navigation: { keyboardNavigation: true, tabFocusHighlight: true, skipToContent: true, focusTraps: true },
                        reading: { lineHeight: 'normal', letterSpacing: 'normal', textJustification: 'left' }
                    });
                    break;
                case 'workspace':
                    setWorkspacePrefs({
                        dashboard: { defaultView: 'overview', refreshInterval: 300, showQuickStats: true, showCharts: true, showRecentActivity: true },
                        tables: { defaultPageSize: 25, stripedRows: true, hoverHighlight: true, rowNumbers: false, compactView: false },
                        forms: { autoSave: true, saveInterval: 30, inlineValidation: true, tooltipHelp: true, confirmDelete: true }
                    });
                    break;
                default:
                    setInterfacePrefs({
                        theme: { mode: 'system', primaryColor: '#3B82F6', secondaryColor: '#8B5CF6', accentColor: '#10B981' },
                        display: { density: 'comfortable', fontSize: 'medium', fontFamily: 'system-ui', animationSpeed: 'normal' },
                        layout: { sidebarPosition: 'left', sidebarWidth: 'normal', headerType: 'sticky', footerVisible: true }
                    });
                    setRegionalPrefs({
                        language: { interface: 'en', format: 'en-US', timezone: 'America/New_York' },
                        dateTime: { dateFormat: 'MM/DD/YYYY', timeFormat: '12h', firstDayOfWeek: 'sunday' },
                        numbers: { numberFormat: '1,234.56', currency: 'USD', unitSystem: 'metric' }
                    });
                    setAccessibilityPrefs({
                        visual: { highContrast: false, reduceMotion: false, colorBlindMode: 'none', cursorSize: 'normal' },
                        navigation: { keyboardNavigation: true, tabFocusHighlight: true, skipToContent: true, focusTraps: true },
                        reading: { lineHeight: 'normal', letterSpacing: 'normal', textJustification: 'left' }
                    });
                    setWorkspacePrefs({
                        dashboard: { defaultView: 'overview', refreshInterval: 300, showQuickStats: true, showCharts: true, showRecentActivity: true },
                        tables: { defaultPageSize: 25, stripedRows: true, hoverHighlight: true, rowNumbers: false, compactView: false },
                        forms: { autoSave: true, saveInterval: 30, inlineValidation: true, tooltipHelp: true, confirmDelete: true }
                    });
            }
        }
    };

    const updateInterfacePref = (category, key, value) => {
        setInterfacePrefs(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [key]: value
            }
        }));
    };

    const updateRegionalPref = (category, key, value) => {
        setRegionalPrefs(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [key]: value
            }
        }));
    };

    const updateAccessibilityPref = (category, key, value) => {
        setAccessibilityPrefs(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [key]: value
            }
        }));
    };

    const updateWorkspacePref = (category, key, value) => {
        setWorkspacePrefs(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [key]: value
            }
        }));
    };

    const renderDensityPreview = () => {
        const densities = [
            { id: 'compact', label: 'Compact', icon: <FaCompress /> },
            { id: 'comfortable', label: 'Comfortable', icon: <FaColumns /> },
            { id: 'spacious', label: 'Spacious', icon: <FaExpand /> }
        ];

        return (
            <div className="space-y-2">
                {densities.map(density => (
                    <div
                        key={density.id}
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                            interfacePrefs.display.density === density.id
                                ? 'ring-2 ring-primary bg-primary/5'
                                : 'bg-base-200 hover:bg-base-300'
                        }`}
                        onClick={() => updateInterfacePref('display', 'density', density.id)}
                    >
                        <div className="text-xl">{density.icon}</div>
                        <div className="flex-1">
                            <div className="font-medium">{density.label}</div>
                            <div className="text-xs opacity-70">
                                {density.id === 'compact' && 'More content, less spacing'}
                                {density.id === 'comfortable' && 'Balanced spacing for readability'}
                                {density.id === 'spacious' && 'More spacing, less content'}
                            </div>
                        </div>
                        {interfacePrefs.display.density === density.id && (
                            <FaCheckCircle className="text-success" />
                        )}
                    </div>
                ))}
            </div>
        );
    };

    const renderThemePreview = () => {
        const themes = [
            { id: 'light', label: 'Light', icon: <FaSun />, bg: 'bg-base-100', text: 'text-base-content' },
            { id: 'dark', label: 'Dark', icon: <FaMoon />, bg: 'bg-neutral', text: 'text-neutral-content' },
            { id: 'system', label: 'System', icon: <FaDesktop />, bg: 'bg-base-200', text: 'text-base-content' }
        ];

        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {themes.map(theme => (
                    <div
                        key={theme.id}
                        className={`card cursor-pointer ${
                            interfacePrefs.theme.mode === theme.id ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => updateInterfacePref('theme', 'mode', theme.id)}
                    >
                        <div className={`card-body p-4 ${theme.bg} ${theme.text} rounded-lg`}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="text-xl">{theme.icon}</div>
                                    <div className="font-bold">{theme.label}</div>
                                </div>
                                {interfacePrefs.theme.mode === theme.id && (
                                    <FaCheckCircle className="text-success" />
                                )}
                            </div>
                            <div className="text-xs opacity-70 mt-2">
                                {theme.id === 'system' && 'Follows your system settings'}
                                {theme.id !== 'system' && `${theme.label} mode`}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    // Sélecteur de couleur
    const renderColorPicker = (category, key) => {
        return (
            <div className="flex flex-wrap gap-2">
                {testData.colors.map(color => (
                    <div
                        key={color.value}
                        className="tooltip"
                        data-tip={color.name}
                    >
                        <button
                            className={`w-8 h-8 rounded-full border-2 ${
                                interfacePrefs.theme[key] === color.value
                                    ? 'border-base-content'
                                    : 'border-transparent'
                            }`}
                            style={{ backgroundColor: color.value }}
                            onClick={() => updateInterfacePref('theme', key, color.value)}
                        />
                    </div>
                ))}
                <div className="tooltip" data-tip="Custom color">
                    <input
                        type="color"
                        className="w-8 h-8 cursor-pointer rounded-full"
                        value={interfacePrefs.theme[key]}
                        onChange={(e) => updateInterfacePref('theme', key, e.target.value)}
                    />
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <FaPalette className="text-primary" />
                        Preferences
                    </h1>
                    <p className="text-base-content/70">
                        Customize your workspace appearance and behavior
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    {saveStatus === 'saving' && (
                        <div className="badge badge-info gap-1">
                            <span className="loading loading-spinner loading-xs"></span>
                            Saving...
                        </div>
                    )}
                    {saveStatus === 'success' && (
                        <div className="badge badge-success gap-1">
                            <FaCheckCircle /> Saved
                        </div>
                    )}

                    <button
                        className="btn btn-ghost"
                        onClick={() => resetToDefaults('all')}
                    >
                        <FaUndo /> Reset All
                    </button>

                    {isEditing ? (
                        <>
                            <button
                                className="btn btn-ghost"
                                onClick={cancelEditing}
                            >
                                <FaTimesCircle /> Cancel
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={savePreferences}
                                disabled={saveStatus === 'saving'}
                            >
                                {saveStatus === 'saving' ? (
                                    <>
                                        <span className="loading loading-spinner loading-xs"></span>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <FaSave /> Save Preferences
                                    </>
                                )}
                            </button>
                        </>
                    ) : (
                        <button
                            className="btn btn-primary"
                            onClick={startEditing}
                        >
                            <FaCog /> Customize
                        </button>
                    )}
                </div>
            </div>

            <div className="tabs tabs-boxed bg-base-200 p-1">
                <a
                    className={`tab flex items-center gap-2 ${activeTab === 'interface' ? 'tab-active' : ''}`}
                    onClick={() => setActiveTab('interface')}
                >
                    <FaPalette />
                    Interface
                </a>
                <a
                    className={`tab flex items-center gap-2 ${activeTab === 'regional' ? 'tab-active' : ''}`}
                    onClick={() => setActiveTab('regional')}
                >
                    <FaGlobe />
                    Regional
                </a>
                <a
                    className={`tab flex items-center gap-2 ${activeTab === 'accessibility' ? 'tab-active' : ''}`}
                    onClick={() => setActiveTab('accessibility')}
                >
                    <FaEye />
                    Accessibility
                </a>
                <a
                    className={`tab flex items-center gap-2 ${activeTab === 'workspace' ? 'tab-active' : ''}`}
                    onClick={() => setActiveTab('workspace')}
                >
                    <FaDesktop />
                    Workspace
                </a>
            </div>

            <div className="card bg-base-100 shadow-lg">
                <div className="card-body">

                    {activeTab === 'interface' && (
                        <div className="space-y-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-bold">Theme & Appearance</h3>
                                    <p className="text-base-content/70">Customize the look and feel of your interface</p>
                                </div>
                                <button
                                    className="btn btn-sm btn-ghost"
                                    onClick={() => resetToDefaults('interface')}
                                >
                                    Reset to Defaults
                                </button>
                            </div>

                            <div className="space-y-4">
                                <h4 className="font-bold">Theme Mode</h4>
                                {renderThemePreview()}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-3">
                                    <h4 className="font-bold">Primary Color</h4>
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-8 h-8 rounded-full"
                                            style={{ backgroundColor: interfacePrefs.theme.primaryColor }}
                                        />
                                        <div className="font-mono">{interfacePrefs.theme.primaryColor}</div>
                                    </div>
                                    {renderColorPicker('theme', 'primaryColor')}
                                </div>

                                <div className="space-y-3">
                                    <h4 className="font-bold">Secondary Color</h4>
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-8 h-8 rounded-full"
                                            style={{ backgroundColor: interfacePrefs.theme.secondaryColor }}
                                        />
                                        <div className="font-mono">{interfacePrefs.theme.secondaryColor}</div>
                                    </div>
                                    {renderColorPicker('theme', 'secondaryColor')}
                                </div>

                                <div className="space-y-3">
                                    <h4 className="font-bold">Accent Color</h4>
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-8 h-8 rounded-full"
                                            style={{ backgroundColor: interfacePrefs.theme.accentColor }}
                                        />
                                        <div className="font-mono">{interfacePrefs.theme.accentColor}</div>
                                    </div>
                                    {renderColorPicker('theme', 'accentColor')}
                                </div>
                            </div>

                            <div className="divider"></div>

                            <div className="space-y-6">
                                <h3 className="text-xl font-bold">Display Settings</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <h4 className="font-bold">Interface Density</h4>
                                        {renderDensityPreview()}
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="font-bold">Font Size</h4>
                                        <div className="space-y-2">
                                            {testData.fontSizes.map(font => (
                                                <div
                                                    key={font.value}
                                                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${
                                                        interfacePrefs.display.fontSize === font.value
                                                            ? 'bg-primary/10 ring-1 ring-primary'
                                                            : 'bg-base-200 hover:bg-base-300'
                                                    }`}
                                                    onClick={() => updateInterfacePref('display', 'fontSize', font.value)}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <FaTextHeight />
                                                        <div>
                                                            <div className="font-medium">{font.label}</div>
                                                            <div className="text-xs opacity-70" style={{ fontSize: font.size }}>
                                                                Sample text
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {interfacePrefs.display.fontSize === font.value && (
                                                        <FaCheckCircle className="text-success" />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="font-bold">Animation Speed</h4>
                                        <div className="space-y-2">
                                            {['none', 'fast', 'normal', 'slow'].map(speed => (
                                                <div
                                                    key={speed}
                                                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${
                                                        interfacePrefs.display.animationSpeed === speed
                                                            ? 'bg-primary/10 ring-1 ring-primary'
                                                            : 'bg-base-200 hover:bg-base-300'
                                                    }`}
                                                    onClick={() => updateInterfacePref('display', 'animationSpeed', speed)}
                                                >
                                                    <div className="capitalize">{speed}</div>
                                                    {interfacePrefs.display.animationSpeed === speed && (
                                                        <FaCheckCircle className="text-success" />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="font-bold">Sidebar Position</h4>
                                        <div className="grid grid-cols-2 gap-2">
                                            {[
                                                { id: 'left', label: 'Left' },
                                                { id: 'right', label: 'Right' },
                                                { id: 'top', label: 'Top' },
                                                { id: 'hidden', label: 'Hidden' }
                                            ].map(pos => (
                                                <button
                                                    key={pos.id}
                                                    className={`btn btn-sm capitalize ${
                                                        interfacePrefs.layout.sidebarPosition === pos.id
                                                            ? 'btn-primary'
                                                            : 'btn-ghost'
                                                    }`}
                                                    onClick={() => updateInterfacePref('layout', 'sidebarPosition', pos.id)}
                                                >
                                                    {pos.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'regional' && (
                        <div className="space-y-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-bold">Regional Settings</h3>
                                    <p className="text-base-content/70">Configure language, date, time, and number formats</p>
                                </div>
                                <button
                                    className="btn btn-sm btn-ghost"
                                    onClick={() => resetToDefaults('regional')}
                                >
                                    Reset to Defaults
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h4 className="font-bold flex items-center gap-2">
                                        <FaLanguage />
                                        Language
                                    </h4>
                                    <div className="space-y-3">
                                        {testData.languages.map(lang => (
                                            <div
                                                key={lang.code}
                                                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${
                                                    regionalPrefs.language.interface === lang.code
                                                        ? 'bg-primary/10 ring-1 ring-primary'
                                                        : 'bg-base-200 hover:bg-base-300'
                                                }`}
                                                onClick={() => updateRegionalPref('language', 'interface', lang.code)}
                                            >
                                                <div>
                                                    <div className="font-medium">{lang.name}</div>
                                                    <div className="text-sm opacity-70">{lang.nativeName}</div>
                                                </div>
                                                {regionalPrefs.language.interface === lang.code && (
                                                    <FaCheckCircle className="text-success" />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="font-bold flex items-center gap-2">
                                        <FaClock />
                                        Timezone
                                    </h4>
                                    <select
                                        className="select select-bordered w-full"
                                        value={regionalPrefs.language.timezone}
                                        onChange={(e) => updateRegionalPref('language', 'timezone', e.target.value)}
                                    >
                                        {testData.timezones.map(tz => (
                                            <option key={tz.value} value={tz.value}>
                                                {tz.label}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="text-sm opacity-70">
                                        Current time: {new Date().toLocaleTimeString(regionalPrefs.language.format)}
                                    </div>
                                </div>
                            </div>

                            <div className="divider"></div>

                            <div className="space-y-6">
                                <h4 className="font-bold flex items-center gap-2">
                                    <FaCalendarAlt />
                                    Date & Time Format
                                </h4>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <label className="label">
                                            <span className="label-text">Date Format</span>
                                        </label>
                                        <div className="space-y-2">
                                            {[
                                                { id: 'MM/DD/YYYY', example: '01/15/2024' },
                                                { id: 'DD/MM/YYYY', example: '15/01/2024' },
                                                { id: 'YYYY-MM-DD', example: '2024-01-15' },
                                                { id: 'DD MMM YYYY', example: '15 Jan 2024' }
                                            ].map(format => (
                                                <div
                                                    key={format.id}
                                                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${
                                                        regionalPrefs.dateTime.dateFormat === format.id
                                                            ? 'bg-primary/10 ring-1 ring-primary'
                                                            : 'bg-base-200 hover:bg-base-300'
                                                    }`}
                                                    onClick={() => updateRegionalPref('dateTime', 'dateFormat', format.id)}
                                                >
                                                    <div>
                                                        <div className="font-mono">{format.id}</div>
                                                        <div className="text-sm opacity-70">Example: {format.example}</div>
                                                    </div>
                                                    {regionalPrefs.dateTime.dateFormat === format.id && (
                                                        <FaCheckCircle className="text-success" />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="label">
                                            <span className="label-text">Time Format</span>
                                        </label>
                                        <div className="space-y-2">
                                            {[
                                                { id: '12h', example: '02:30 PM' },
                                                { id: '24h', example: '14:30' }
                                            ].map(format => (
                                                <div
                                                    key={format.id}
                                                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${
                                                        regionalPrefs.dateTime.timeFormat === format.id
                                                            ? 'bg-primary/10 ring-1 ring-primary'
                                                            : 'bg-base-200 hover:bg-base-300'
                                                    }`}
                                                    onClick={() => updateRegionalPref('dateTime', 'timeFormat', format.id)}
                                                >
                                                    <div>
                                                        <div className="font-medium">{format.id === '12h' ? '12-hour' : '24-hour'}</div>
                                                        <div className="text-sm opacity-70">Example: {format.example}</div>
                                                    </div>
                                                    {regionalPrefs.dateTime.timeFormat === format.id && (
                                                        <FaCheckCircle className="text-success" />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="divider"></div>

                            <div className="space-y-6">
                                <h4 className="font-bold">Number & Currency Format</h4>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Number Format</span>
                                        </label>
                                        <select
                                            className="select select-bordered"
                                            value={regionalPrefs.numbers.numberFormat}
                                            onChange={(e) => updateRegionalPref('numbers', 'numberFormat', e.target.value)}
                                        >
                                            <option value="1,234.56">1,234.56 (US/UK)</option>
                                            <option value="1.234,56">1.234,56 (EU)</option>
                                            <option value="1 234,56">1 234,56 (FR)</option>
                                        </select>
                                        <div className="text-xs opacity-70 mt-2">
                                            Example: {regionalPrefs.numbers.numberFormat.replace('1', '1,234').replace('56', '56')}
                                        </div>
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Currency</span>
                                        </label>
                                        <select
                                            className="select select-bordered"
                                            value={regionalPrefs.numbers.currency}
                                            onChange={(e) => updateRegionalPref('numbers', 'currency', e.target.value)}
                                        >
                                            <option value="USD">USD - US Dollar ($)</option>
                                            <option value="EUR">EUR - Euro (€)</option>
                                            <option value="GBP">GBP - British Pound (£)</option>
                                            <option value="JPY">JPY - Japanese Yen (¥)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'accessibility' && (
                        <div className="space-y-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-bold">Accessibility</h3>
                                    <p className="text-base-content/70">Make the interface more accessible based on your needs</p>
                                </div>
                                <button
                                    className="btn btn-sm btn-ghost"
                                    onClick={() => resetToDefaults('accessibility')}
                                >
                                    Reset to Defaults
                                </button>
                            </div>

                            <div className="space-y-6">
                                <h4 className="font-bold">Visual Adjustments</h4>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[
                                        {
                                            key: 'highContrast',
                                            label: 'High Contrast Mode',
                                            description: 'Increase contrast for better visibility',
                                            icon: <FaEye />
                                        },
                                        {
                                            key: 'reduceMotion',
                                            label: 'Reduce Motion',
                                            description: 'Minimize animations and transitions',
                                            icon: <FaEyeSlash />
                                        }
                                    ].map(setting => (
                                        <div key={setting.key} className="form-control">
                                            <label className="label cursor-pointer justify-start gap-3">
                                                <input
                                                    type="checkbox"
                                                    className="toggle toggle-primary"
                                                    checked={accessibilityPrefs.visual[setting.key]}
                                                    onChange={(e) => updateAccessibilityPref('visual', setting.key, e.target.checked)}
                                                />
                                                <div className="flex items-center gap-3">
                                                    <div className="text-xl">{setting.icon}</div>
                                                    <div>
                                                        <div className="font-medium">{setting.label}</div>
                                                        <div className="text-sm opacity-70">{setting.description}</div>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-4">
                                    <h5 className="font-medium">Color Blindness Mode</h5>
                                    <div className="flex flex-wrap gap-2">
                                        {[
                                            { id: 'none', label: 'None', color: 'bg-base-200' },
                                            { id: 'protanopia', label: 'Protanopia', color: 'bg-orange-100' },
                                            { id: 'deuteranopia', label: 'Deuteranopia', color: 'bg-green-100' },
                                            { id: 'tritanopia', label: 'Tritanopia', color: 'bg-blue-100' }
                                        ].map(mode => (
                                            <button
                                                key={mode.id}
                                                className={`btn btn-sm capitalize ${accessibilityPrefs.visual.colorBlindMode === mode.id ? 'btn-primary' : 'btn-ghost'}`}
                                                onClick={() => updateAccessibilityPref('visual', 'colorBlindMode', mode.id)}
                                            >
                                                {mode.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h5 className="font-medium">Cursor Size</h5>
                                    <div className="flex gap-4">
                                        {['small', 'normal', 'large'].map(size => (
                                            <div
                                                key={size}
                                                className={`flex flex-col items-center gap-2 p-3 rounded-lg cursor-pointer ${
                                                    accessibilityPrefs.visual.cursorSize === size
                                                        ? 'bg-primary/10 ring-1 ring-primary'
                                                        : 'bg-base-200 hover:bg-base-300'
                                                }`}
                                                onClick={() => updateAccessibilityPref('visual', 'cursorSize', size)}
                                            >
                                                <FaMousePointer className={`${
                                                    size === 'small' ? 'text-base' :
                                                        size === 'normal' ? 'text-lg' : 'text-xl'
                                                }`} />
                                                <div className="capitalize">{size}</div>
                                                {accessibilityPrefs.visual.cursorSize === size && (
                                                    <FaCheckCircle className="text-success" />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="divider"></div>

                            <div className="space-y-6">
                                <h4 className="font-bold flex items-center gap-2">
                                    <FaKeyboard />
                                    Navigation
                                </h4>

                                <div className="space-y-4">
                                    {[
                                        {
                                            key: 'keyboardNavigation',
                                            label: 'Keyboard Navigation',
                                            description: 'Enable full keyboard navigation support'
                                        },
                                        {
                                            key: 'tabFocusHighlight',
                                            label: 'Focus Highlight',
                                            description: 'Highlight focused elements for better visibility'
                                        },
                                        {
                                            key: 'skipToContent',
                                            label: 'Skip to Content',
                                            description: 'Add skip links for screen readers'
                                        },
                                        {
                                            key: 'focusTraps',
                                            label: 'Focus Traps',
                                            description: 'Keep focus within modal dialogs'
                                        }
                                    ].map(setting => (
                                        <div key={setting.key} className="form-control">
                                            <label className="label cursor-pointer justify-start gap-3">
                                                <input
                                                    type="checkbox"
                                                    className="toggle toggle-primary"
                                                    checked={accessibilityPrefs.navigation[setting.key]}
                                                    onChange={(e) => updateAccessibilityPref('navigation', setting.key, e.target.checked)}
                                                />
                                                <div>
                                                    <div className="font-medium">{setting.label}</div>
                                                    <div className="text-sm opacity-70">{setting.description}</div>
                                                </div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="divider"></div>

                            <div className="space-y-6">
                                <h4 className="font-bold">Reading Preferences</h4>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-4">
                                        <label className="label">
                                            <span className="label-text">Line Height</span>
                                        </label>
                                        <div className="space-y-2">
                                            {['tight', 'normal', 'loose'].map(height => (
                                                <div
                                                    key={height}
                                                    className={`flex items-center justify-between p-2 rounded cursor-pointer ${
                                                        accessibilityPrefs.reading.lineHeight === height
                                                            ? 'bg-primary/10 ring-1 ring-primary'
                                                            : 'bg-base-200 hover:bg-base-300'
                                                    }`}
                                                    onClick={() => updateAccessibilityPref('reading', 'lineHeight', height)}
                                                >
                                                    <div className="capitalize">{height}</div>
                                                    {accessibilityPrefs.reading.lineHeight === height && (
                                                        <FaCheckCircle className="text-success" />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="label">
                                            <span className="label-text">Letter Spacing</span>
                                        </label>
                                        <div className="space-y-2">
                                            {['tight', 'normal', 'wide'].map(spacing => (
                                                <div
                                                    key={spacing}
                                                    className={`flex items-center justify-between p-2 rounded cursor-pointer ${
                                                        accessibilityPrefs.reading.letterSpacing === spacing
                                                            ? 'bg-primary/10 ring-1 ring-primary'
                                                            : 'bg-base-200 hover:bg-base-300'
                                                    }`}
                                                    onClick={() => updateAccessibilityPref('reading', 'letterSpacing', spacing)}
                                                >
                                                    <div className="capitalize">{spacing}</div>
                                                    {accessibilityPrefs.reading.letterSpacing === spacing && (
                                                        <FaCheckCircle className="text-success" />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="label">
                                            <span className="label-text">Text Alignment</span>
                                        </label>
                                        <div className="space-y-2">
                                            {['left', 'center', 'justify'].map(align => (
                                                <div
                                                    key={align}
                                                    className={`flex items-center justify-between p-2 rounded cursor-pointer ${
                                                        accessibilityPrefs.reading.textJustification === align
                                                            ? 'bg-primary/10 ring-1 ring-primary'
                                                            : 'bg-base-200 hover:bg-base-300'
                                                    }`}
                                                    onClick={() => updateAccessibilityPref('reading', 'textJustification', align)}
                                                >
                                                    <div className="capitalize">{align}</div>
                                                    {accessibilityPrefs.reading.textJustification === align && (
                                                        <FaCheckCircle className="text-success" />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'workspace' && (
                        <div className="space-y-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-bold">Workspace Settings</h3>
                                    <p className="text-base-content/70">Configure how you interact with the system</p>
                                </div>
                                <button
                                    className="btn btn-sm btn-ghost"
                                    onClick={() => resetToDefaults('workspace')}
                                >
                                    Reset to Defaults
                                </button>
                            </div>

                            <div className="space-y-6">
                                <h4 className="font-bold flex items-center gap-2">
                                    <FaChartBar />
                                    Dashboard
                                </h4>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Default Dashboard View</span>
                                        </label>
                                        <select
                                            className="select select-bordered"
                                            value={workspacePrefs.dashboard.defaultView}
                                            onChange={(e) => updateWorkspacePref('dashboard', 'defaultView', e.target.value)}
                                        >
                                            <option value="overview">Overview</option>
                                            <option value="analytics">Analytics</option>
                                            <option value="minimal">Minimal</option>
                                        </select>
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Auto-refresh Interval</span>
                                        </label>
                                        <select
                                            className="select select-bordered"
                                            value={workspacePrefs.dashboard.refreshInterval}
                                            onChange={(e) => updateWorkspacePref('dashboard', 'refreshInterval', parseInt(e.target.value))}
                                        >
                                            <option value={60}>1 minute</option>
                                            <option value={300}>5 minutes</option>
                                            <option value={600}>10 minutes</option>
                                            <option value={1800}>30 minutes</option>
                                            <option value={0}>Never</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {[
                                        { key: 'showQuickStats', label: 'Show Quick Statistics' },
                                        { key: 'showCharts', label: 'Show Charts and Graphs' },
                                        { key: 'showRecentActivity', label: 'Show Recent Activity' }
                                    ].map(setting => (
                                        <div key={setting.key} className="form-control">
                                            <label className="label cursor-pointer justify-start gap-3">
                                                <input
                                                    type="checkbox"
                                                    className="toggle toggle-primary"
                                                    checked={workspacePrefs.dashboard[setting.key]}
                                                    onChange={(e) => updateWorkspacePref('dashboard', setting.key, e.target.checked)}
                                                />
                                                <div className="font-medium">{setting.label}</div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="divider"></div>

                            <div className="space-y-6">
                                <h4 className="font-bold flex items-center gap-2">
                                    <FaTable />
                                    Table Settings
                                </h4>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Default Page Size</span>
                                        </label>
                                        <select
                                            className="select select-bordered"
                                            value={workspacePrefs.tables.defaultPageSize}
                                            onChange={(e) => updateWorkspacePref('tables', 'defaultPageSize', parseInt(e.target.value))}
                                        >
                                            <option value={10}>10 rows</option>
                                            <option value={25}>25 rows</option>
                                            <option value={50}>50 rows</option>
                                            <option value={100}>100 rows</option>
                                        </select>
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Default View</span>
                                        </label>
                                        <div className="flex gap-2">
                                            {[
                                                { id: 'table', label: 'Table', icon: <FaTable /> },
                                                { id: 'grid', label: 'Grid', icon: <FaTh /> },
                                                { id: 'list', label: 'List', icon: <FaList /> }
                                            ].map(view => (
                                                <button
                                                    key={view.id}
                                                    className={`btn btn-sm ${workspacePrefs.tables.compactView === (view.id === 'grid') ? 'btn-primary' : 'btn-ghost'}`}
                                                    onClick={() => updateWorkspacePref('tables', 'compactView', view.id === 'grid')}
                                                >
                                                    {view.icon}
                                                    {view.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {[
                                        { key: 'stripedRows', label: 'Striped Rows' },
                                        { key: 'hoverHighlight', label: 'Hover Highlight' },
                                        { key: 'rowNumbers', label: 'Show Row Numbers' }
                                    ].map(setting => (
                                        <div key={setting.key} className="form-control">
                                            <label className="label cursor-pointer justify-start gap-3">
                                                <input
                                                    type="checkbox"
                                                    className="toggle toggle-primary"
                                                    checked={workspacePrefs.tables[setting.key]}
                                                    onChange={(e) => updateWorkspacePref('tables', setting.key, e.target.checked)}
                                                />
                                                <div className="font-medium">{setting.label}</div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="divider"></div>

                            <div className="space-y-6">
                                <h4 className="font-bold flex items-center gap-2">
                                    <FaDatabase />
                                    Form Settings
                                </h4>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Auto-save Interval</span>
                                        </label>
                                        <select
                                            className="select select-bordered"
                                            value={workspacePrefs.forms.saveInterval}
                                            onChange={(e) => updateWorkspacePref('forms', 'saveInterval', parseInt(e.target.value))}
                                            disabled={!workspacePrefs.forms.autoSave}
                                        >
                                            <option value={10}>10 seconds</option>
                                            <option value={30}>30 seconds</option>
                                            <option value={60}>1 minute</option>
                                            <option value={300}>5 minutes</option>
                                        </select>
                                        <div className="text-xs opacity-70 mt-2">
                                            {workspacePrefs.forms.autoSave
                                                ? `Changes saved every ${workspacePrefs.forms.saveInterval} seconds`
                                                : 'Auto-save is disabled'
                                            }
                                        </div>
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Confirmation Dialogs</span>
                                        </label>
                                        <div className="space-y-2">
                                            {[
                                                { key: 'confirmDelete', label: 'Confirm before deleting' },
                                                { key: 'confirmExit', label: 'Confirm unsaved changes' }
                                            ].map(setting => (
                                                <div key={setting.key} className="form-control">
                                                    <label className="label cursor-pointer justify-start gap-2">
                                                        <input
                                                            type="checkbox"
                                                            className="checkbox checkbox-primary checkbox-sm"
                                                            checked={workspacePrefs.forms[setting.key]}
                                                            onChange={(e) => updateWorkspacePref('forms', setting.key, e.target.checked)}
                                                        />
                                                        <span className="label-text">{setting.label}</span>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {[
                                        { key: 'autoSave', label: 'Enable Auto-save' },
                                        { key: 'inlineValidation', label: 'Inline Form Validation' },
                                        { key: 'tooltipHelp', label: 'Show Help Tooltips' }
                                    ].map(setting => (
                                        <div key={setting.key} className="form-control">
                                            <label className="label cursor-pointer justify-start gap-3">
                                                <input
                                                    type="checkbox"
                                                    className="toggle toggle-primary"
                                                    checked={workspacePrefs.forms[setting.key]}
                                                    onChange={(e) => updateWorkspacePref('forms', setting.key, e.target.checked)}
                                                />
                                                <div className="font-medium">{setting.label}</div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                    <h3 className="card-title">Live Preview</h3>
                    <p className="text-base-content/70 mb-4">See how your changes will look</p>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="card bg-base-200">
                            <div className="card-body">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className={`w-10 h-10 rounded-full bg-${interfacePrefs.theme.primaryColor === '#3B82F6' ? 'primary' : ''}`}
                                         style={{
                                             backgroundColor: interfacePrefs.theme.primaryColor !== '#3B82F6'
                                                 ? interfacePrefs.theme.primaryColor
                                                 : undefined
                                         }}>
                                    </div>
                                    <div>
                                        <div className="font-bold">Sample User</div>
                                        <div className="text-sm opacity-70">Administrator</div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Email:</span>
                                        <span>user@example.com</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Status:</span>
                                        <span className="badge badge-success">Active</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <button className={`btn btn-${interfacePrefs.theme.primaryColor === '#3B82F6' ? 'primary' : ''}`}
                                    style={{
                                        backgroundColor: interfacePrefs.theme.primaryColor !== '#3B82F6'
                                            ? interfacePrefs.theme.primaryColor
                                            : undefined
                                    }}>
                                Primary Button
                            </button>
                            <button className={`btn btn-${interfacePrefs.theme.secondaryColor === '#8B5CF6' ? 'secondary' : 'outline'}`}
                                    style={{
                                        backgroundColor: interfacePrefs.theme.secondaryColor !== '#8B5CF6'
                                            ? interfacePrefs.theme.secondaryColor
                                            : undefined
                                    }}>
                                Secondary Button
                            </button>
                            <div className={`badge badge-${interfacePrefs.theme.accentColor === '#10B981' ? 'accent' : ''} gap-1`}
                                 style={{
                                     backgroundColor: interfacePrefs.theme.accentColor !== '#10B981'
                                         ? interfacePrefs.theme.accentColor
                                         : undefined
                                 }}>
                                <FaCheckCircle />
                                Sample Badge
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className={`${interfacePrefs.display.fontSize === 'small' ? 'text-sm' :
                                interfacePrefs.display.fontSize === 'medium' ? 'text-base' :
                                    interfacePrefs.display.fontSize === 'large' ? 'text-lg' : 'text-xl'}`}>
                                <div className="font-bold">Sample Text Preview</div>
                                <div className="opacity-70">
                                    This is how text will appear with your current settings.
                                    The font size, line height, and spacing are all customizable.
                                </div>
                            </div>
                            <div className="text-xs opacity-50">
                                Current density: {interfacePrefs.display.density}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePreferences;