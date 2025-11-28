'use client';

import { FaSearch } from 'react-icons/fa';
import { RxHamburgerMenu } from 'react-icons/rx';
import Image from 'next/image';
import Header from './Header';
import Hero from './Hero';
import Recent from './Recent';
import AboutNew from './AboutNew';

export default function HeaderThree() {
    return (
        <>
            <Header />
            <Hero />
            <AboutNew />
            <Recent />
            <AboutNew />
            <AboutNew />
        </>
    );
}
