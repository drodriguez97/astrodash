import { Outlet, Link } from "react-router-dom";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";

const Layout = () => {
    return (
        <div className="layout">
            <div className='navigation-bar'>
                <Header />
                
                <Link to="/"><Navbar /></Link>
            </div>
            <Outlet />
        </div>
    )
}

export default Layout;