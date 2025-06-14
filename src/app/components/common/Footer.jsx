import React from 'react';

const Footer = () => {
    return (
        <footer className="footer sm:footer-horizontal footer-center bg-base-100 text-base-content p-8 ">
            <aside>
                <p>Copyright © {new Date().getFullYear()} - All right reserved by On Table Ltd.</p>
            </aside>
        </footer>
    );
};

export default Footer;