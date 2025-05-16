"use client";

import {useEffect, useState} from "react";
import {Search, Filter, BookOpenText, BookOpen, Heart, LayoutGrid, University, User} from "lucide-react";
import {motion} from "framer-motion";
import Input from "@/components/ui/input";
import Spinner from "@/components/ui/spinner";
import SideBar from "@/components/ui/Sidebar/sidebar";


export default function Resources() {

    
    const [resourcesData, setResourcesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [uniqueCategories, setUniqueCategories] = useState([])
    const [selectedResource, setSelectedResource] = useState("All");


    useEffect(() => {

        async function fetchData() {

            try {

                const response = await fetch("/api/resource/all");
                const result = await response.json();
                const uniq = [...new Set(result.map(item => item.category))];

                setUniqueCategories(uniq);
                setResourcesData(result);

            } catch (error) {

                console.error("Error fetching data:", error);

            } finally {

                setLoading(false);

            }

        }

        fetchData();

    }, []);


    const filteredResources = resourcesData.filter(
        (r) =>
            (r.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                r.preview?.toLowerCase().includes(searchTerm.toLowerCase()))
    );


    return (
        //    items-center 
        <div className="w-screen bg-black flex-row text-white min-h-screen pt-8 lg:pt-0 texture-cartographer">
            <SideBar/>
            <div className="w-full md:w-4/5 lg:p-10 mx-auto flex-col p-3">
                <div className="font-bold text-4xl mb-5 md:mb-10">Explore Resources</div>
                <div className="text-xl mb-5 md:mb-10">Click on card to open resource</div>

                {/* Search and filter */}

                <div className="mb-5 flex-col lg:flex-row">

                    <Input
                        type="text"
                        placeholder="Search resources..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        icon={<Search/>}
                    />
                    {/* <div className="flex-row-reverse lg:flex-row mt-4 lg:mt-0 w-full lg:w-3/10">

                        <div className="p-2">
                            <Filter/>
                        </div>

                        <select
                            value={selectedResource}
                            onChange={(e) => setSelectedResource(e.target.value)}
                            className="bg-zinc-900 border border-zinc-800 text-white rounded-none px-4 py-2 focus:ring-white focus:border-white w-full lg:flex-1"
                        >

                            <option value="All">All Categories</option>
                            {
                                uniqueCategories.map((note, i) => (
                                    <option value={note} key={i}>{note}</option>
                                ))
                            }

                        </select>

                    </div> */}

                </div>



                <div className={`${loading ? "justify-center pt-10" : "grid! grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"} mt-2`}>
                    {(!loading ? filteredResources.map((rsrc, index) => (
                        <motion.a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={rsrc.source}
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="flex-col justify-between bg-zinc-900 p-5 border border-zinc-800 hover:border-zinc-700 transition-colors hover:cursor-pointer"
                        >

                            <div className={"justify-between flex-1 items-center"}>
                                <div className={"text-xl font-semibold"}>{rsrc.title}</div>
                                <div className={"text-zinc-400 text-sm"}><Heart size={14} className={"mr-1"}/> {typeof rsrc.likes === "number" ? rsrc.likes : 2}</div>
                            </div>

                            <span className="text-gray-dark text-xs mb-4">{rsrc.author}</span>

                            <div className="flex-col mt-4 space-y-3">
                                <div className="flex items-center text-base font-light text-gray-dark">
                                    <BookOpenText size={20} className="min-w-[20px]" />
                                    <span className="ml-2 text-gray-light text-sm">{rsrc.preview || <code className="bg-zinc-950">Missing...</code>}</span>
                                </div>
                            </div>

                        </motion.a>
                    )) : <Spinner/>)}
                </div>
            </div>
        </div>
    )
}