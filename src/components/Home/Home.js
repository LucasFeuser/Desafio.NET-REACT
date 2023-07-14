import React, {useState, useEffect} from 'react';
import { toast, ToastContainer } from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import './homestyle.css';


export default function Home({ children })
{  
    const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width: 990px)").matches);
    const [showDropdown, setShowDropdown] = useState({ media: false, users: false, payments: false });
    const [showNav, setShowNav] = useState(false);
    const [compactDashboard, setCompactDashboard] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.matchMedia("(max-width: 990px)").matches);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleDropdownClick = (dropdown) => {
        setShowDropdown(prevState => ({ ...prevState, [dropdown]: !prevState[dropdown] }));
    };

    const handleMenuClick = () => {
        if (isMobile) {
            setShowNav(!showNav);
        } else {
            setCompactDashboard(!compactDashboard);
        }
    };

    const navigate = useNavigate();

    const backToLogin = () => {
        toast.error("Deslogando...");  
                    setTimeout(() => {
                        navigate('/');
                    }, 6000);  
    } 

    const goToCalendar = () => {
        navigate("/Calendario");
    }

    const goToProfile = () => {
        navigate("/Profile");
    }


    return (
        <div className={`dashboard ${compactDashboard ? 'dashboard-compact' : ''}`}>
            <ToastContainer/>
            <div className={`dashboard-nav ${showNav ? 'mobile-show' : ''}`}>
                <header>
                    <a href="#!" className="menu-toggle" onClick={handleMenuClick}><i className="fas fa-bars"></i></a>
                    <a href="#!" className="brand-logo"><span>TopMed</span></a>
                </header>
                <nav className="dashboard-nav-list">
                    <a href="#" className="dashboard-nav-item" onClick={goToProfile}><i className="fas fa-user" ></i> Profissional </a>                  
                    <div className={`dashboard-nav-dropdown ${showDropdown.users ? 'show' : ''}`}>
                        <a href="#!" className="dashboard-nav-item dashboard-nav-dropdown-toggle" onClick={() => handleDropdownClick('users')}>
                            <i className="fas fa-users"></i> Atendimento
                        </a>
                        <div className='dashboard-nav-dropdown-menu'>                          
                            <a href="#" className="dashboard-nav-dropdown-item" onClick={goToCalendar}>Todos</a> 
                        </div>
                    </div>                    
                    <div className="nav-item-divider"></div>
                    <a href="#" className="dashboard-nav-item" onClick={backToLogin}><i className="fas fa-sign-out-alt"></i> Sair </a>
                </nav>
            </div>
            <div className='dashboard-app'>
                <header className='dashboard-toolbar'><a href="#!" className="menu-toggle" onClick={handleMenuClick}><i className="fas fa-bars"></i></a></header>
                <div className='dashboard-content'>
                    <div className='container'>
                        <div className='card'>                            
                            <div className='card-body'>
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}