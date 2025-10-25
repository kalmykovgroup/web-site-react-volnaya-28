import {Outlet} from "react-router-dom";
import React, {useEffect, useState} from "react";
import s from './MainLayout.module.css';
import {Footer} from "@ui/components/Footer/Footrer.tsx";
const MainLayout: React.FC = () => {

    const [backgroundLoaded, setBackgroundLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setBackgroundLoaded(true);
        }, 2200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div id="home" className={s.container}>
            <div
                className={s.background}
                style={{ opacity: backgroundLoaded ? 0.1 : 0 }}
            />

             <main className={s.content}>
                <Outlet />
             </main>

            <Footer/>
       </div>
    );
};

export default MainLayout;