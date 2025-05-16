"use client";

import {useEffect, useState} from "react";
import {Search, BookOpenText, Heart} from "lucide-react";
import {motion} from "framer-motion";
import Input from "@/components/ui/input";
import Spinner from "@/components/ui/spinner";
import SideBar from "@/components/ui/Sidebar/sidebar";
import { Button } from "@/components/ui/button";


export default function Resources() {

    
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [msg, setMsg] = useState("Search for a user first");
    const [isUserDataEmpty, setIsUserDataEmpty] = useState(true);


    

    async function fetchData() {

        try {

            const response = await fetch(`/api/user/${searchTerm}`);
            const result = await response.json();
            console.log(result);

            if (result.statusCode !== 500) {
                console.log(500)
                setUserData(result)
                setIsUserDataEmpty(false)
            } else {
                setMsg("No user found with provided ID")
                setUserData({})
                setIsUserDataEmpty(true)
                
            }

        } catch (error) {

            console.error("Error fetching data:", error);

        } finally {

            setLoading(false);

        }

    }



    return (
        <div className="w-screen bg-black flex-row text-white min-h-screen pt-8 lg:pt-0 texture-cartographer">
            <SideBar/>
            <div className="w-full md:w-4/5 lg:p-10 mx-auto flex-col p-3">
                <div className="font-bold text-4xl mb-5 md:mb-10">Get User</div>
                <div className="text-xl mb-5 md:mb-10">Get a user by their ID</div>
                

                <div className="mb-5 flex-col lg:flex-row">

                    <Input
                        type="text"
                        placeholder="ID of user to search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        icon={<Search/>}
                    />
                    <Button onClick={fetchData}>Search</Button>

                </div>



                <div className={`${loading || isUserDataEmpty ? "justify-center pt-10" : "w-3/5 mx-auto"} mt-2`}>
                    {(!loading ? isUserDataEmpty ? msg : <UserDataCard data={userData}/> : msg)}
                </div>
            </div>
        </div>
    )
}

function UserDataCard({data}) {
    return (
        <div className="flex-col bg-zinc-900 border border-zinc-700 p-5 w-full">

            <div className="font-semibold text-2xl mb-2">User Data</div>

            <div className="flex-wrap gap-5 mb-5">

                <div className="flex-col flex-1">
                    <div className="font-light text-sm">ID</div>
                    <div
                        className={"flex-1 flex bg-zinc-800 text-white placeholder-gray-medium p-2"}
                    >{data["_id"]}</div>
                </div>
                
            </div>

            <div className="flex-wrap gap-5 mb-5">

                <div className="flex-col flex-1">
                    <div className="font-light text-sm">Name</div>
                    <div
                        className={"flex-1 flex bg-zinc-800 text-white placeholder-gray-medium p-2"}
                    >{data.name}</div>
                </div>
                
            </div>

            <div className="flex-wrap gap-5 mb-5">

                <div className="flex-col flex-1">
                    <div className="font-light text-sm">Email</div>
                    <div
                        className={"flex-1 flex bg-zinc-800 text-white placeholder-gray-medium p-2"}
                    >{data.email}</div>
                </div>
                
            </div>

            <div className="flex-wrap gap-5 mb-5">

                <div className="flex-col flex-1">
                    <div className="font-light text-sm">Gender</div>
                    <div
                        className={"flex-1 flex bg-zinc-800 text-white placeholder-gray-medium p-2"}
                    >{data.gender}</div>
                    
                </div>
                <div className="flex-col flex-1">
                    <div className="font-light text-sm">Location</div>
                    <div
                        className={"flex-1 flex bg-zinc-800 text-white placeholder-gray-medium p-2"}
                    >{data.location}</div>
                </div>
                
            </div>

            <div className="flex-wrap gap-5 mb-5">

                <div className="flex-col flex-1">
                    <div className="font-light text-sm">Date of Birth</div>
                    <div
                        className={"flex-1 flex bg-zinc-800 text-white placeholder-gray-medium p-2"}
                    >{data["DOB"]}</div>
                    
                </div>
                <div className="flex-col flex-1">
                    <div className="font-light text-sm">Created At</div>
                    <div
                        className={"flex-1 flex bg-zinc-800 text-white placeholder-gray-medium p-2"}
                    >{data["created_at"]}</div>
                </div>
                
            </div>

            <div className="w-full border-b border-zinc-700 mt-5 mb-2"></div>

            <div className="font-semibold text-2xl mb-2">Preferences</div>

            <div className="flex-wrap gap-5 mb-5">

                <div className="flex-col flex-1">
                    <div className="font-light text-sm">Happy Mood</div>
                    <div
                        className={"flex-1 flex bg-zinc-800 text-white placeholder-gray-medium p-2"}
                    >{ Array.isArray(data?.preferences["mood_happy"]) ? data.preferences["mood_happy"][0] : data.preferences["mood_happy"] }</div>
                    
                </div>
                <div className="flex-col flex-1">
                    <div className="font-light text-sm">Sad Mood</div>
                    <div
                        className={"flex-1 flex bg-zinc-800 text-white placeholder-gray-medium p-2"}
                    >{ Array.isArray(data?.preferences["mood_sad"]) ? data.preferences["mood_sad"][0] : data.preferences["mood_sad"] }</div>
                </div>
                
            </div>

            <div className="flex-wrap gap-5 mb-5">

                <div className="flex-col flex-1">
                    <div className="font-light text-sm">Confused Mood</div>
                    <div
                        className={"flex-1 flex bg-zinc-800 text-white placeholder-gray-medium p-2"}
                    >{ Array.isArray(data?.preferences["mood_confused"]) ? data.preferences["mood_confused"][0] : data.preferences["mood_confused"] }</div>
                    
                </div>
                <div className="flex-col flex-1">
                    <div className="font-light text-sm">Likes Shorts</div>
                    <div
                        className={"flex-1 flex bg-zinc-800 text-white placeholder-gray-medium p-2"}
                    >{ data?.preferences["like_shorts"] ? "Yes" : "No" }</div>
                </div>
                
            </div>
        </div>
    )
}