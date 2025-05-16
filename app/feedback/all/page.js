"use client";

import {useEffect, useState} from "react";
import {Search, Filter, BookOpenText, BookOpen, Heart, LayoutGrid, University, User} from "lucide-react";
import {motion} from "framer-motion";
import Spinner from "@/components/ui/spinner";
import SideBar from "@/components/ui/Sidebar/sidebar";


export default function Resources() {

    
    const [resourcesData, setResourcesData] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        async function fetchData() {

            try {

                const response = await fetch("/api/feedback/all");
                const result = await response.json();
                setResourcesData(result);

            } catch (error) {

                console.error("Error fetching data:", error);

            } finally {

                setLoading(false);

            }

        }

        fetchData();

    }, []);


    return (
        <div className="w-screen bg-black flex-row text-white min-h-screen pt-8 lg:pt-0 texture-cartographer">
            <SideBar/>
            <div className="w-full md:w-4/5 lg:p-10 mx-auto flex-col p-3">
                <div className="font-bold text-4xl mb-5 md:mb-10">User Feedbacks</div>




                <div className={`${loading ? "justify-center pt-10" : "grid! grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"} mt-2`}>
                    {(!loading ? resourcesData.map((rsrc, index) => (
                        <motion.div
                            target="_blank"
                            rel="noopener noreferrer"
                            // href={rsrc.source}
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="flex-col justify-between bg-zinc-900 p-5 border border-zinc-800 hover:border-zinc-700 transition-colors hover:cursor-pointer"
                        >

                            <div className={"justify-between flex-1 items-center"}>
                                <div className={"text-xl font-semibold"}>{rsrc.feedback}</div>
                                
                            </div>

                            <span className="text-gray-dark text-xs mb-4">{rsrc.userName || "Anonymous"}</span>

                        </motion.div>
                    )) : <Spinner/>)}
                </div>
            </div>
        </div>
    )
}