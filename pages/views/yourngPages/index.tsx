import React, { useState } from 'react'

export default function index() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            {/* Sidebar */}
            <div
                style={{
                    ...styles.sidebar,
                    paddingTop: '5%',
                    position: 'fixed',
                    transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
                }}
            >
                <button onClick={toggleSidebar} style={{ ...styles.closeButton, position: 'absolute' }}>
                    &times;
                </button>
                <div style={styles.sidebarContent}>
                    <h2>Menu</h2>
                    <ul style={styles.menuList}>
                        <li>Dashboard</li>
                        <li>Profile</li>
                        <li>Settings</li>
                        <li>Logout</li>
                    </ul>
                </div>
            </div>

            {/* Toggle Button */}
            {!isSidebarOpen && (
                <button onClick={toggleSidebar} style={{ ...styles.openButton, position: 'fixed' }}>
                    ☰
                </button>
            )}

            {/* Main Content */}
            <div style={styles.mainContent}>
                <h1>Main Content Area</h1>
                <p>
                    This is the main content area where you can put any page-specific content.
                </p>
            </div>
        </div>
    );
};

// CSS Styles for components
const styles = {
    sidebar: {

        left: 0,
        top: 0,
        width: '250px',
        height: '100%',
        backgroundColor: '#333',
        color: 'white',
        padding: '20px',
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.5)',
        transition: 'transform 0.3s ease-in-out',
        zIndex: 1000,
    },
    sidebarContent: {
        marginTop: '20px',
    },
    menuList: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
    },
    openButton: {

        left: '20px',
        top: '100px',
        fontSize: '24px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '10px',
        cursor: 'pointer',
        zIndex: 1100,
    },
    closeButton: {

        top: '100px',
        right: '10px',
        fontSize: '24px',
        backgroundColor: 'transparent',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
    },
    mainContent: {
        marginLeft: '50px',
        padding: '20px',
        flexGrow: 1,
        transition: 'margin-left 0.3s ease-in-out',
        paddingTop: '100px'
    },
};

