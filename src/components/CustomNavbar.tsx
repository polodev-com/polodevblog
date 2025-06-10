"use client";
import React, {useState, useEffect} from 'react';
import {Logo} from "@/components/Logo";
import Link from "next/link";


export const CustomNavbar = () => {
    const [isNavVisible, setNavVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // This effect handles the logic for showing and hiding the navbar on scroll
    useEffect(() => {
        const controlNavbar = () => {
            // If scrolling down, hide the navbar. If scrolling up, show it.
            if (typeof window !== 'undefined') {
                if (window.scrollY > lastScrollY && window.scrollY > 100) { // Hide after scrolling 100px
                    setNavVisible(false);
                } else {
                    setNavVisible(true);
                }
                // Remember the new scroll position for the next move
                setLastScrollY(window.scrollY);
            }
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar);

            // Cleanup function to remove the event listener
            return () => {
                window.removeEventListener('scroll', controlNavbar);
            };
        }
    }, [lastScrollY]);

    return (
        <>
            {/* --- Persistent Logo --- */}
            {/* This logo is always visible in the top-left corner. */}
            {/* It has a higher z-index to ensure it stays on top of the main navbar. */}
            {/*<Link href={"/"} className="fixed top-4 left-4 z-50 transition-transform duration-300 ease-in-out">*/}
            {/*<Logo/>*/}
            {/*</Link>*/}

            {/* --- Main Hiding Navbar --- */}
            {/* This is the main navigation bar that hides on scroll. */}
            {/* The `transform` and `transition` classes create the smooth sliding effect. */}
            {/* It has a lower z-index than the persistent logo. */}
            <nav
                className={`fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md shadow-md transition-transform duration-300 ease-in-out
          ${isNavVisible ? 'translate-y-0' : '-translate-y-full'}`
                }
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/*<div className="opacity-0 pointer-events-none">*/}
                        <div>
                            <Link href={"/"}
                                  className="fixed top-4 left-4 z-50 transition-transform duration-300 ease-in-out">
                                <Logo/>
                            </Link>
                        </div>

                        {/* Navigation Links */}
                        <div className="hidden md:flex items-center justify-end space-x-8">
                            <Link href={"/about-me"} className="text-gray-600 hover:text-blue-600 font-medium">About
                                me</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};