'use client'

import Footer from "../Footer";
import HeaderOne from "../Home/Header";
import Verticals from "../products/verticals";
import Applications from "./Applications";




export default function page() {
    return (
        <>
            <HeaderOne />
            <Applications />
            <Footer />
        </>
    )
}