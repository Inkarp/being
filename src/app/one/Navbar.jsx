

export default function Navbar() {
    return (
        <div className="sticky z-50 top-0 bg-white">
            <div className="max-w-[1320px] mx-auto px-[15px]">
                <div className="flex justify-between items-center h-[90px] font-[Teko]">
                    <div className="">
                        <a className="flex items-center gap-[5px]" href="index.html">
                            <img className="h-25" src="/logo.webp" alt="" />
                            {/* <div className="text-[28px] font-semibold">GYMFITO</div> */}
                        </a>
                    </div>
                    <div className="hidden xl:block">
                        <div className="flex text-[20px] font-medium">
                            <div className="group relative">
                                <div className="relative">
                                    {/* Layered Hover Animation (unchanged) */}
                                    <div className="absolute inset-0 bg-[#D5BDA2] group-[:not(:hover)]:scale-y-0 group-[:not(:hover)]:delay-[.06s] delay-0 transition-all duration-[.3s]"></div>
                                    <div className="absolute inset-0 bg-[#F67A45] group-[:not(:hover)]:scale-y-0 group-[:not(:hover)]:delay-[.04s] delay-[.02s] transition-all duration-[.3s]"></div>
                                    <div className="absolute inset-0 bg-[#01010F] group-[:not(:hover)]:scale-y-0 group-[:not(:hover)]:delay-[.02s] delay-[.04s] transition-all duration-[.3s]"></div>

                                    {/* 🔵 CHANGED TO YOUR THEME: #2B7EC2 */}
                                    <div className="absolute inset-0 bg-[#2B7EC2] bg-opacity-20 border-r border-[#2B7EC2] border-opacity-40 group-[:not(:hover)]:scale-y-0 group-[:not(:hover)]:delay-0 delay-[.06s] transition-all duration-[.3s]"></div>

                                    <div className="relative h-[90px] flex items-center gap-[5px] px-[20px]">
                                        <div className="relative">

                                            {/* 🔵 TEXT goes WHITE on hover */}
                                            <div className="absolute inset-0 group-hover:text-white group-[:not(:hover)]:scale-y-0 group-[:not(:hover)]:delay-0 delay-[.06s] transition-all duration-[.3s]">
                                                Home
                                            </div>

                                            {/* Default text visible when NOT hovered */}
                                            <div className="transition-all duration-[.3s] group-hover:scale-y-0 group-hover:delay-0 delay-[.06s]">
                                                Home
                                            </div>
                                        </div>

                                        <div className="text-[12px] transition-all duration-300 group-hover:text-white">
                                            <i className="fa fa-angle-down"></i>
                                        </div>
                                    </div>
                                </div>

                                {/* Submenu */}
                                {/* <div className="absolute w-[230px] group-[:not(:hover)]:invisible">
                                    <div className="absolute inset-0 bg-[#F67A45]"></div>
                                    <div className="absolute inset-0 bg-[#01010F]"></div>
                                    <div className="absolute inset-0 bg-[#F67A45] bg-opacity-10"></div>

                                    <div className="relative text-white">
                                        <div className="border-t border-[#F67A45] border-opacity-40"></div>

                                     
                                        <a href="/">
                                            <div className="group/c relative py-[15px] px-[20px] cursor-pointer">
                                                <div className="absolute inset-0 bg-[#2B7EC2] opacity-0 group-hover/c:opacity-20 transition-all duration-300"></div>
                                                <span className="relative group-hover/c:text-[#2B7EC2] transition-all duration-300">Home Page One</span>
                                            </div>
                                        </a>

                                        <div className="border-t border-[#F67A45] border-opacity-40"></div>

                                        <a href="/">
                                            <div className="group/c relative py-[15px] px-[20px] cursor-pointer">
                                                <div className="absolute inset-0 bg-[#2B7EC2] opacity-0 group-hover/c:opacity-20 transition-all duration-300"></div>
                                                <span className="relative group-hover/c:text-[#2B7EC2] transition-all duration-300">Home Page Two</span>
                                            </div>
                                        </a>

                                        <div className="border-t border-[#F67A45] border-opacity-40"></div>
                                    </div>
                                </div> */}
                            </div>

                            <div className="group relative">
                                <div className="relative">
                                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#D5BDA2] group-[:not(:hover)]:scale-y-0 group-[:not(:hover)]:delay-[.06s] delay-0 transition-all duration-[.3s]"></div>
                                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] group-[:not(:hover)]:scale-y-0 group-[:not(:hover)]:delay-[.04s] delay-[.02s] transition-all duration-[.3s]"></div>
                                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#01010F] group-[:not(:hover)]:scale-y-0 group-[:not(:hover)]:delay-[.02s] delay-[.04s] transition-all duration-[.3s]"></div>
                                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] bg-opacity-10 border-r-[1px] border-[#F67A45] border-opacity-40 group-[:not(:hover)]:scale-y-0 group-[:not(:hover)]:delay-0 delay-[.06s] transition-all duration-[.3s]"></div>
                                    <div className="relative h-[90px] flex items-center gap-[5px] px-[20px]">
                                        <div className="relative">
                                            <div className="absolute top-0 right-0 bottom-0 left-0 group-hover:text-[#F67A45] group-[:not(:hover)]:scale-y-0 group-[:not(:hover)]:delay-0 delay-[.06s] transition-all duration-[.3s]">About Us</div>
                                            <div className="group-hover:scale-y-0 group-hover:delay-0 delay-[.06s] transition-all duration-[.3s]">About Us</div>
                                        </div>
                                        <div className="text-[12px]"><i className="fa fa-angle-down"></i></div>
                                    </div>
                                </div>
                                <div className="absolute w-[230px] group-[:not(:hover)]:invisible">
                                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45]"></div>
                                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#01010F]"></div>
                                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] bg-opacity-10"></div>
                                    <div className="relative text-white">
                                        <div className="border-t-[1px] border-[#F67A45] border-opacity-40"></div>
                                        <a className="" href="classNamees.html">
                                            <div className="group/c relative">
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#D5BDA2] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-[.06s] delay-0 transition-all duration-[.3s]"></div>
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-[.04s] delay-[.02s] transition-all duration-[.3s]"></div>
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#01010F] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-[.02s] delay-[.04s] transition-all duration-[.3s]"></div>
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] bg-opacity-10 group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-0 delay-[.06s] transition-all duration-[.3s]"></div>
                                                <div className="relative py-[15px] px-[20px]">
                                                    <div className="relative">
                                                        <div className="absolute top-0 right-0 bottom-0 left-0 group-hover/c:text-[#F67A45] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-0 delay-[.06s] transition-all duration-[.3s]">className List</div>
                                                        <div className="origin-top group-[:not(:hover)]:scale-y-0 group-hover/c:scale-y-0 group-hover/c:delay-0 delay-[.06s] transition-all duration-[.3s]">className List</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                        <div className="border-t-[1px] border-[#F67A45] border-opacity-40"></div>
                                        <a className="" href="className-details.html">
                                            <div className="group/c relative">
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#D5BDA2] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-[.06s] delay-0 transition-all duration-[.3s]"></div>
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-[.04s] delay-[.02s] transition-all duration-[.3s]"></div>
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#01010F] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-[.02s] delay-[.04s] transition-all duration-[.3s]"></div>
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] bg-opacity-10 group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-0 delay-[.06s] transition-all duration-[.3s]"></div>
                                                <div className="relative py-[15px] px-[20px]">
                                                    <div className="relative">
                                                        <div className="absolute top-0 right-0 bottom-0 left-0 group-hover/c:text-[#F67A45] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-0 delay-[.06s] transition-all duration-[.3s]">className Details</div>
                                                        <div className="origin-bottom group-[:not(:hover)]:scale-y-0 group-hover/c:scale-y-0 group-hover/c:delay-0 delay-[.06s] transition-all duration-[.3s]">className Details</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                        <div className="border-t-[1px] border-[#F67A45] border-opacity-40"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="group relative">
                                <div className="relative">
                                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#D5BDA2] group-[:not(:hover)]:scale-y-0 group-[:not(:hover)]:delay-[.06s] delay-0 transition-all duration-[.3s]"></div>
                                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] group-[:not(:hover)]:scale-y-0 group-[:not(:hover)]:delay-[.04s] delay-[.02s] transition-all duration-[.3s]"></div>
                                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#01010F] group-[:not(:hover)]:scale-y-0 group-[:not(:hover)]:delay-[.02s] delay-[.04s] transition-all duration-[.3s]"></div>
                                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] bg-opacity-10 border-r-[1px] border-[#F67A45] border-opacity-40 group-[:not(:hover)]:scale-y-0 group-[:not(:hover)]:delay-0 delay-[.06s] transition-all duration-[.3s]"></div>
                                    <div className="relative h-[90px] flex items-center gap-[5px] px-[20px]">
                                        <div className="relative">
                                            <div className="absolute top-0 right-0 bottom-0 left-0 group-hover:text-[#F67A45] group-[:not(:hover)]:scale-y-0 group-[:not(:hover)]:delay-0 delay-[.06s] transition-all duration-[.3s]">SERVICES</div>
                                            <div className="group-hover:scale-y-0 group-hover:delay-0 delay-[.06s] transition-all duration-[.3s]">SERVICES</div>
                                        </div>
                                        <div className="text-[12px]"><i className="fa fa-angle-down"></i></div>
                                    </div>
                                </div>
                                <div className="absolute w-[230px] group-[:not(:hover)]:invisible">
                                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45]"></div>
                                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#01010F]"></div>
                                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] bg-opacity-10"></div>
                                    <div className="relative text-white">
                                        <div className="border-t-[1px] border-[#F67A45] border-opacity-40"></div>
                                        <a className="" href="services.html">
                                            <div className="group/c relative">
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#D5BDA2] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-[.06s] delay-0 transition-all duration-[.3s]"></div>
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-[.04s] delay-[.02s] transition-all duration-[.3s]"></div>
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#01010F] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-[.02s] delay-[.04s] transition-all duration-[.3s]"></div>
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] bg-opacity-10 group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-0 delay-[.06s] transition-all duration-[.3s]"></div>
                                                <div className="relative py-[15px] px-[20px]">
                                                    <div className="relative">
                                                        <div className="absolute top-0 right-0 bottom-0 left-0 group-hover/c:text-[#F67A45] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-0 delay-[.06s] transition-all duration-[.3s]">Our Services</div>
                                                        <div className="origin-top group-[:not(:hover)]:scale-y-0 group-hover/c:scale-y-0 group-hover/c:delay-0 delay-[.06s] transition-all duration-[.3s]">Our Services</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                        <div className="border-t-[1px] border-[#F67A45] border-opacity-40"></div>
                                        <a className="" href="service-details.html">
                                            <div className="group/c relative">
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#D5BDA2] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-[.06s] delay-0 transition-all duration-[.3s]"></div>
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-[.04s] delay-[.02s] transition-all duration-[.3s]"></div>
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#01010F] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-[.02s] delay-[.04s] transition-all duration-[.3s]"></div>
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] bg-opacity-10 group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-0 delay-[.06s] transition-all duration-[.3s]"></div>
                                                <div className="relative py-[15px] px-[20px]">
                                                    <div className="relative">
                                                        <div className="absolute top-0 right-0 bottom-0 left-0 group-hover/c:text-[#F67A45] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-0 delay-[.06s] transition-all duration-[.3s]">Service Details</div>
                                                        <div className="origin-bottom group-[:not(:hover)]:scale-y-0 group-hover/c:scale-y-0 group-hover/c:delay-0 delay-[.06s] transition-all duration-[.3s]">Service Details</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                        <div className="border-t-[1px] border-[#F67A45] border-opacity-40"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="group relative">
                                <div className="relative">
                                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#D5BDA2] group-[:not(:hover)]:scale-y-0 group-[:not(:hover)]:delay-[.06s] delay-0 transition-all duration-[.3s]"></div>
                                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] group-[:not(:hover)]:scale-y-0 group-[:not(:hover)]:delay-[.04s] delay-[.02s] transition-all duration-[.3s]"></div>
                                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#01010F] group-[:not(:hover)]:scale-y-0 group-[:not(:hover)]:delay-[.02s] delay-[.04s] transition-all duration-[.3s]"></div>
                                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] bg-opacity-10 border-r-[1px] border-[#F67A45] border-opacity-40 group-[:not(:hover)]:scale-y-0 group-[:not(:hover)]:delay-0 delay-[.06s] transition-all duration-[.3s]"></div>
                                    <div className="relative h-[90px] flex items-center gap-[5px] px-[20px]">
                                        <div className="relative">
                                            <div className="absolute top-0 right-0 bottom-0 left-0 group-hover:text-[#F67A45] group-[:not(:hover)]:scale-y-0 group-[:not(:hover)]:delay-0 delay-[.06s] transition-all duration-[.3s]">BLOG</div>
                                            <div className="group-hover:scale-y-0 group-hover:delay-0 delay-[.06s] transition-all duration-[.3s]">BLOG</div>
                                        </div>
                                        <div className="text-[12px]"><i className="fa fa-angle-down"></i></div>
                                    </div>
                                </div>
                                <div className="absolute w-[230px] group-[:not(:hover)]:invisible">
                                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45]"></div>
                                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#01010F]"></div>
                                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] bg-opacity-10"></div>
                                    <div className="relative text-white">
                                        <div className="border-t-[1px] border-[#F67A45] border-opacity-40"></div>
                                        <a className="" href="blog.html">
                                            <div className="group/c relative">
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#D5BDA2] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-[.06s] delay-0 transition-all duration-[.3s]"></div>
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-[.04s] delay-[.02s] transition-all duration-[.3s]"></div>
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#01010F] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-[.02s] delay-[.04s] transition-all duration-[.3s]"></div>
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] bg-opacity-10 group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-0 delay-[.06s] transition-all duration-[.3s]"></div>
                                                <div className="relative py-[15px] px-[20px]">
                                                    <div className="relative">
                                                        <div className="absolute top-0 right-0 bottom-0 left-0 group-hover/c:text-[#F67A45] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-0 delay-[.06s] transition-all duration-[.3s]">Blog List</div>
                                                        <div className="origin-top group-[:not(:hover)]:scale-y-0 group-hover/c:scale-y-0 group-hover/c:delay-0 delay-[.06s] transition-all duration-[.3s]">Blog List</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                        <div className="border-t-[1px] border-[#F67A45] border-opacity-40"></div>
                                        <a className="" href="blog-details.html">
                                            <div className="group/c relative">
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#D5BDA2] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-[.06s] delay-0 transition-all duration-[.3s]"></div>
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-[.04s] delay-[.02s] transition-all duration-[.3s]"></div>
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#01010F] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-[.02s] delay-[.04s] transition-all duration-[.3s]"></div>
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] bg-opacity-10 group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-0 delay-[.06s] transition-all duration-[.3s]"></div>
                                                <div className="relative py-[15px] px-[20px]">
                                                    <div className="relative">
                                                        <div className="absolute top-0 right-0 bottom-0 left-0 group-hover/c:text-[#F67A45] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-0 delay-[.06s] transition-all duration-[.3s]">Blog Details</div>
                                                        <div className="origin-bottom group-[:not(:hover)]:scale-y-0 group-hover/c:scale-y-0 group-hover/c:delay-0 delay-[.06s] transition-all duration-[.3s]">Blog Details</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                        <div className="border-t-[1px] border-[#F67A45] border-opacity-40"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="group relative">
                                <div className="relative">
                                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#D5BDA2] group-[:not(:hover)]:scale-y-0 group-[:not(:hover)]:delay-[.06s] delay-0 transition-all duration-[.3s]"></div>
                                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] group-[:not(:hover)]:scale-y-0 group-[:not(:hover)]:delay-[.04s] delay-[.02s] transition-all duration-[.3s]"></div>
                                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#01010F] group-[:not(:hover)]:scale-y-0 group-[:not(:hover)]:delay-[.02s] delay-[.04s] transition-all duration-[.3s]"></div>
                                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] bg-opacity-10 border-r-[1px] border-[#F67A45] border-opacity-40 group-[:not(:hover)]:scale-y-0 group-[:not(:hover)]:delay-0 delay-[.06s] transition-all duration-[.3s]"></div>
                                    <div className="relative h-[90px] flex items-center gap-[5px] px-[20px]">
                                        <div className="relative">
                                            <div className="absolute top-0 right-0 bottom-0 left-0 group-hover:text-[#F67A45] group-[:not(:hover)]:scale-y-0 group-[:not(:hover)]:delay-0 delay-[.06s] transition-all duration-[.3s]">PAGES</div>
                                            <div className="group-hover:scale-y-0 group-hover:delay-0 delay-[.06s] transition-all duration-[.3s]">PAGES</div>
                                        </div>
                                        <div className="text-[12px]"><i className="fa fa-angle-down"></i></div>
                                    </div>
                                </div>
                                <div className="absolute w-[230px] group-[:not(:hover)]:invisible">
                                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45]"></div>
                                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#01010F]"></div>
                                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] bg-opacity-10"></div>
                                    <div className="relative text-white">
                                        <div className="border-t-[1px] border-[#F67A45] border-opacity-40"></div>
                                        <a className="" href="about.html">
                                            <div className="group/c relative">
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#D5BDA2] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-[.06s] delay-0 transition-all duration-[.3s]"></div>
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-[.04s] delay-[.02s] transition-all duration-[.3s]"></div>
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#01010F] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-[.02s] delay-[.04s] transition-all duration-[.3s]"></div>
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] bg-opacity-10 group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-0 delay-[.06s] transition-all duration-[.3s]"></div>
                                                <div className="relative py-[15px] px-[20px]">
                                                    <div className="relative">
                                                        <div className="absolute top-0 right-0 bottom-0 left-0 group-hover/c:text-[#F67A45] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-0 delay-[.06s] transition-all duration-[.3s]">About Us</div>
                                                        <div className="origin-top group-[:not(:hover)]:scale-y-0 group-hover/c:scale-y-0 group-hover/c:delay-0 delay-[.06s] transition-all duration-[.3s]">About Us</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                        <div className="border-t-[1px] border-[#F67A45] border-opacity-40"></div>
                                        <a className="" href="bmi.html">
                                            <div className="group/c relative">
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#D5BDA2] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-[.06s] delay-0 transition-all duration-[.3s]"></div>
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-[.04s] delay-[.02s] transition-all duration-[.3s]"></div>
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#01010F] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-[.02s] delay-[.04s] transition-all duration-[.3s]"></div>
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] bg-opacity-10 group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-0 delay-[.06s] transition-all duration-[.3s]"></div>
                                                <div className="relative py-[15px] px-[20px]">
                                                    <div className="relative">
                                                        <div className="absolute top-0 right-0 bottom-0 left-0 group-hover/c:text-[#F67A45] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-0 delay-[.06s] transition-all duration-[.3s]">BMI Calculator</div>
                                                        <div className="origin-bottom group-[:not(:hover)]:scale-y-0 group-hover/c:scale-y-0 group-hover/c:delay-0 delay-[.06s] transition-all duration-[.3s]">BMI Calculator</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                        <div className="border-t-[1px] border-[#F67A45] border-opacity-40"></div>
                                        <a className="" href="schedule.html">
                                            <div className="group/c relative">
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#D5BDA2] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-[.06s] delay-0 transition-all duration-[.3s]"></div>
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-[.04s] delay-[.02s] transition-all duration-[.3s]"></div>
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#01010F] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-[.02s] delay-[.04s] transition-all duration-[.3s]"></div>
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] bg-opacity-10 group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-0 delay-[.06s] transition-all duration-[.3s]"></div>
                                                <div className="relative py-[15px] px-[20px]">
                                                    <div className="relative">
                                                        <div className="absolute top-0 right-0 bottom-0 left-0 group-hover/c:text-[#F67A45] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-0 delay-[.06s] transition-all duration-[.3s]">Schedule</div>
                                                        <div className="origin-top group-[:not(:hover)]:scale-y-0 group-hover/c:scale-y-0 group-hover/c:delay-0 delay-[.06s] transition-all duration-[.3s]">Schedule</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                        <div className="border-t-[1px] border-[#F67A45] border-opacity-40"></div>
                                        <a className="" href="pricing.html">
                                            <div className="group/c relative">
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#D5BDA2] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-[.06s] delay-0 transition-all duration-[.3s]"></div>
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-[.04s] delay-[.02s] transition-all duration-[.3s]"></div>
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#01010F] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-[.02s] delay-[.04s] transition-all duration-[.3s]"></div>
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] bg-opacity-10 group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-0 delay-[.06s] transition-all duration-[.3s]"></div>
                                                <div className="relative py-[15px] px-[20px]">
                                                    <div className="relative">
                                                        <div className="absolute top-0 right-0 bottom-0 left-0 group-hover/c:text-[#F67A45] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-0 delay-[.06s] transition-all duration-[.3s]">Pricing Table</div>
                                                        <div className="origin-bottom group-[:not(:hover)]:scale-y-0 group-hover/c:scale-y-0 group-hover/c:delay-0 delay-[.06s] transition-all duration-[.3s]">Pricing Table</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                        <div className="border-t-[1px] border-[#F67A45] border-opacity-40"></div>
                                        <a className="" href="gallery.html">
                                            <div className="group/c relative">
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#D5BDA2] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-[.06s] delay-0 transition-all duration-[.3s]"></div>
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-[.04s] delay-[.02s] transition-all duration-[.3s]"></div>
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#01010F] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-[.02s] delay-[.04s] transition-all duration-[.3s]"></div>
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] bg-opacity-10 group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-0 delay-[.06s] transition-all duration-[.3s]"></div>
                                                <div className="relative py-[15px] px-[20px]">
                                                    <div className="relative">
                                                        <div className="absolute top-0 right-0 bottom-0 left-0 group-hover/c:text-[#F67A45] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-0 delay-[.06s] transition-all duration-[.3s]">Gallery</div>
                                                        <div className="origin-top group-[:not(:hover)]:scale-y-0 group-hover/c:scale-y-0 group-hover/c:delay-0 delay-[.06s] transition-all duration-[.3s]">Gallery</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                        <div className="border-t-[1px] border-[#F67A45] border-opacity-40"></div>
                                        <a className="" href="contact.html">
                                            <div className="group/c relative">
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#D5BDA2] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-[.06s] delay-0 transition-all duration-[.3s]"></div>
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-[.04s] delay-[.02s] transition-all duration-[.3s]"></div>
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#01010F] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-[.02s] delay-[.04s] transition-all duration-[.3s]"></div>
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] bg-opacity-10 group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-0 delay-[.06s] transition-all duration-[.3s]"></div>
                                                <div className="relative py-[15px] px-[20px]">
                                                    <div className="relative">
                                                        <div className="absolute top-0 right-0 bottom-0 left-0 group-hover/c:text-[#F67A45] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-0 delay-[.06s] transition-all duration-[.3s]">Contact Us</div>
                                                        <div className="origin-bottom group-[:not(:hover)]:scale-y-0 group-hover/c:scale-y-0 group-hover/c:delay-0 delay-[.06s] transition-all duration-[.3s]">Contact Us</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                        <div className="border-t-[1px] border-[#F67A45] border-opacity-40"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="group relative">
                                <div className="relative">
                                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#D5BDA2] group-[:not(:hover)]:scale-y-0 group-[:not(:hover)]:delay-[.06s] delay-0 transition-all duration-[.3s]"></div>
                                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] group-[:not(:hover)]:scale-y-0 group-[:not(:hover)]:delay-[.04s] delay-[.02s] transition-all duration-[.3s]"></div>
                                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#01010F] group-[:not(:hover)]:scale-y-0 group-[:not(:hover)]:delay-[.02s] delay-[.04s] transition-all duration-[.3s]"></div>
                                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] bg-opacity-10 border-r-[1px] border-[#F67A45] border-opacity-40 group-[:not(:hover)]:scale-y-0 group-[:not(:hover)]:delay-0 delay-[.06s] transition-all duration-[.3s]"></div>
                                    <div className="relative h-[90px] flex items-center gap-[5px] px-[20px]">
                                        <div className="relative">
                                            <div className="absolute top-0 right-0 bottom-0 left-0 group-hover:text-[#F67A45] group-[:not(:hover)]:scale-y-0 group-[:not(:hover)]:delay-0 delay-[.06s] transition-all duration-[.3s]">TRAINER</div>
                                            <div className="group-hover:scale-y-0 group-hover:delay-0 delay-[.06s] transition-all duration-[.3s]">TRAINER</div>
                                        </div>
                                        <div className="text-[12px]"><i className="fa fa-angle-down"></i></div>
                                    </div>
                                </div>
                                <div className="absolute w-[230px] group-[:not(:hover)]:invisible">
                                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45]"></div>
                                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#01010F]"></div>
                                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] bg-opacity-10"></div>
                                    <div className="relative text-white">
                                        <div className="border-t-[1px] border-[#F67A45] border-opacity-40"></div>
                                        <a className="" href="trainer.html">
                                            <div className="group/c relative">
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#D5BDA2] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-[.06s] delay-0 transition-all duration-[.3s]"></div>
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-[.04s] delay-[.02s] transition-all duration-[.3s]"></div>
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#01010F] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-[.02s] delay-[.04s] transition-all duration-[.3s]"></div>
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] bg-opacity-10 group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-0 delay-[.06s] transition-all duration-[.3s]"></div>
                                                <div className="relative py-[15px] px-[20px]">
                                                    <div className="relative">
                                                        <div className="absolute top-0 right-0 bottom-0 left-0 group-hover/c:text-[#F67A45] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-0 delay-[.06s] transition-all duration-[.3s]">Trainer List</div>
                                                        <div className="origin-top group-[:not(:hover)]:scale-y-0 group-hover/c:scale-y-0 group-hover/c:delay-0 delay-[.06s] transition-all duration-[.3s]">Trainer List</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                        <div className="border-t-[1px] border-[#F67A45] border-opacity-40"></div>
                                        <a className="" href="trainer-details.html">
                                            <div className="group/c relative">
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#D5BDA2] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-[.06s] delay-0 transition-all duration-[.3s]"></div>
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-[.04s] delay-[.02s] transition-all duration-[.3s]"></div>
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#01010F] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-[.02s] delay-[.04s] transition-all duration-[.3s]"></div>
                                                <div className="origin-bottom absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] bg-opacity-10 group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-0 delay-[.06s] transition-all duration-[.3s]"></div>
                                                <div className="relative py-[15px] px-[20px]">
                                                    <div className="relative">
                                                        <div className="absolute top-0 right-0 bottom-0 left-0 group-hover/c:text-[#F67A45] group-[:not(:hover)]/c:scale-y-0 group-[:not(:hover)]/c:delay-0 delay-[.06s] transition-all duration-[.3s]">Trainer Details</div>
                                                        <div className="origin-bottom group-[:not(:hover)]:scale-y-0 group-hover/c:scale-y-0 group-hover/c:delay-0 delay-[.06s] transition-all duration-[.3s]">Trainer Details</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                        <div className="border-t-[1px] border-[#F67A45] border-opacity-40"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="flex items-center text-white">
                            <a className="xl:hidden group relative" data-c-toggle="a" href="#offcanvas">
                                <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] group-hover:scale-y-0 group-hover:delay-0 delay-[.4s] transition-all duration-[.3s]"></div>
                                <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#D5BDA2] group-[:not(:hover)]:scale-y-0 group-[:not(:hover)]:delay-[.4s] delay-0 transition-all duration-[.3s]"></div>
                                <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] group-[:not(:hover)]:scale-y-0 group-[:not(:hover)]:delay-[.3s] delay-[.1s] transition-all duration-[.3s]"></div>
                                <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#01010F] group-[:not(:hover)]:scale-y-0 group-[:not(:hover)]:delay-[.2s] delay-[.2s] transition-all duration-[.3s]"></div>
                                <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] bg-opacity-10 border-[1px] border-[#F67A45] group-[:not(:hover)]:scale-y-0 group-[:not(:hover)]:delay-[.1s] delay-[.3s] transition-all duration-[.3s]"></div>
                                <div className="relative h-[54px] w-[54px] flex justify-center items-center">
                                    <div className="relative">
                                        <div className="absolute top-0 right-0 bottom-0 left-0 group-[:not(:hover)]:scale-y-0 group-[:not(:hover)]:delay-0 delay-[.3s] transition-all duration-[.3s]">
                                            <i className="fa-solid fa-bars"></i>
                                        </div>
                                        <div className="group-hover:scale-y-0 group-hover:delay-0 delay-[.3s] transition-all duration-[.3s]">
                                            <i className="fa-solid fa-bars"></i>
                                        </div>
                                    </div>
                                </div>
                            </a>
                            <div className="xl:hidden md:px-[20px] border-t-[1px] border-[#F67A45]"></div>
                            <a className="hidden md:block group relative" href="#">
                                <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] group-hover:scale-y-0 group-hover:delay-0 delay-[.4s] transition-all duration-[.3s]"></div>
                                <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#D5BDA2] group-[:not(:hover)]:scale-y-0 group-[:not(:hover)]:delay-[.4s] delay-0 transition-all duration-[.3s]"></div>
                                <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] group-[:not(:hover)]:scale-y-0 group-[:not(:hover)]:delay-[.3s] delay-[.1s] transition-all duration-[.3s]"></div>
                                <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#01010F] group-[:not(:hover)]:scale-y-0 group-[:not(:hover)]:delay-[.2s] delay-[.2s] transition-all duration-[.3s]"></div>
                                <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] bg-opacity-10 border-[1px] border-[#F67A45] group-[:not(:hover)]:scale-y-0 group-[:not(:hover)]:delay-[.1s] delay-[.3s] transition-all duration-[.3s]"></div>
                                <div className="relative h-[54px] w-[144px] flex justify-center items-center">
                                    <div className="relative">
                                        <div className="absolute top-0 right-0 bottom-0 left-0 group-[:not(:hover)]:scale-y-0 group-[:not(:hover)]:delay-0 delay-[.3s] transition-all duration-[.3s]">JOIN NOW</div>
                                        <div className="group-hover:scale-y-0 group-hover:delay-0 delay-[.3s] transition-all duration-[.3s]">JOIN NOW</div>
                                    </div>
                                </div>
                            </a>
                            <div className="hidden md:block px-[20px] border-t-[1px] border-[#F67A45]"></div>
                            <a className="hidden md:block group relative" href="#">
                                <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] group-hover:scale-y-0 group-hover:delay-0 delay-[.4s] transition-all duration-[.3s]"></div>
                                <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#D5BDA2] group-[:not(:hover)]:scale-y-0 group-[:not(:hover)]:delay-[.4s] delay-0 transition-all duration-[.3s]"></div>
                                <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] group-[:not(:hover)]:scale-y-0 group-[:not(:hover)]:delay-[.3s] delay-[.1s] transition-all duration-[.3s]"></div>
                                <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#01010F] group-[:not(:hover)]:scale-y-0 group-[:not(:hover)]:delay-[.2s] delay-[.2s] transition-all duration-[.3s]"></div>
                                <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] bg-opacity-10 border-[1px] border-[#F67A45] group-[:not(:hover)]:scale-y-0 group-[:not(:hover)]:delay-[.1s] delay-[.3s] transition-all duration-[.3s]"></div>
                                <div className="relative h-[30px] w-[30px] flex justify-center items-center text-[12px] leading-[1]">
                                    <div className="relative">
                                        <div className="absolute top-0 right-0 bottom-0 left-0 group-[:not(:hover)]:scale-y-0 group-[:not(:hover)]:delay-0 delay-[.3s] transition-all duration-[.3s]">
                                            <i className="fa-brands fa-facebook-f"></i>
                                        </div>
                                        <div className="group-hover:scale-y-0 group-hover:delay-0 delay-[.3s] transition-all duration-[.3s]">
                                            <i className="fa-brands fa-facebook-f"></i>
                                        </div>
                                    </div>
                                </div>
                            </a>
                            <div className="hidden md:block px-[5px] border-t-[1px] border-[#F67A45]"></div>
                            <a className="hidden md:block group relative" href="#">
                                <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] group-hover:scale-y-0 group-hover:delay-0 delay-[.4s] transition-all duration-[.3s]"></div>
                                <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#D5BDA2] group-[:not(:hover)]:scale-y-0 group-[:not(:hover)]:delay-[.4s] delay-0 transition-all duration-[.3s]"></div>
                                <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] group-[:not(:hover)]:scale-y-0 group-[:not(:hover)]:delay-[.3s] delay-[.1s] transition-all duration-[.3s]"></div>
                                <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#01010F] group-[:not(:hover)]:scale-y-0 group-[:not(:hover)]:delay-[.2s] delay-[.2s] transition-all duration-[.3s]"></div>
                                <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#F67A45] bg-opacity-10 border-[1px] border-[#F67A45] group-[:not(:hover)]:scale-y-0 group-[:not(:hover)]:delay-[.1s] delay-[.3s] transition-all duration-[.3s]"></div>
                                <div className="relative h-[30px] w-[30px] flex justify-center items-center text-[12px] leading-[1]">
                                    <div className="relative">
                                        <div className="absolute top-0 right-0 bottom-0 left-0 group-[:not(:hover)]:scale-y-0 group-[:not(:hover)]:delay-0 delay-[.3s] transition-all duration-[.3s]">
                                            <i className="fa-brands fa-x-twitter"></i>
                                        </div>
                                        <div className="group-hover:scale-y-0 group-hover:delay-0 delay-[.3s] transition-all duration-[.3s]">
                                            <i className="fa-brands fa-x-twitter"></i>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}