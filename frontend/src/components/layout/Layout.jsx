import {useEffect, useState} from 'react';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import {useAuth} from "../../AuthProvider.jsx";

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const {isAuthenticated, token, logout} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const onAuthPath = location.pathname.startsWith('/auth');
        if ((!isAuthenticated || !token) && !onAuthPath) {
            logout();
            navigate('/auth/login', {replace: true});
        }
    }, [isAuthenticated, token, location.pathname, logout, navigate]);

    return (
        <div className="flex min-h-screen bg-base-200">
            <div className={`
                      ${isSidebarOpen ? 'fixed inset-0 z-40' : 'hidden'}
                      md:static md:block md:z-auto
                    `}>
                <div className={`
                        ${isSidebarOpen ? 'fixed inset-y-0 left-0 z-50' : 'relative'}
                        transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                        transition-transform md:translate-x-0 md:relative
                      `}>
                    <Sidebar onClose={() => setIsSidebarOpen(false)}/>
                </div>
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 md:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}
            </div>

            <div className="flex-1 flex flex-col overflow-hidden max-h-screen">
                <Header
                    toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                    isSidebarOpen={isSidebarOpen}
                />
                <main className="flex-1 p-4 md:p-6 overflow-y-auto">
                    <Outlet/>
                </main>
            </div>
        </div>
    );
};

export default Layout;