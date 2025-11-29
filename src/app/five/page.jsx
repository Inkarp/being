'use client';

import Header from './Header';
import Hero from './Hero';
import Recent from './Recent';
import AboutNew from './AboutNew';
import Footer from '../Footer';

export default function HeaderThree() {
    return (
        <>
            <Header />
            <Hero />
            <AboutNew />
            <Recent />
            <AboutNew />
            <Footer />
        </>
    );
}
