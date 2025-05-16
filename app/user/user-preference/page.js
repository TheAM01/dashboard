"use client";

import {useEffect, useState} from "react";
import {Search, BookOpenText, Upload, X, Check} from "lucide-react";
import {motion} from "framer-motion";
import Input from "@/components/ui/input";
import Spinner from "@/components/ui/spinner";
import SideBar from "@/components/ui/Sidebar/sidebar";
import { Button } from "@/components/ui/button";
import StatusToast from "@/components/ui/status-toast";


export default function Resources() {

    const [toast, setToast] = useState(null);
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [msg, setMsg] = useState("Search for a user first");
    const [isUserDataEmpty, setIsUserDataEmpty] = useState(true);
    const [prefs, setPrefs] = useState({
        moodHappy: "",
        moodSad: "",
        moodConfused: "",
        likeShorts: ""
    })


    

    async function fetchData() {

        try {

            const response = await fetch(`/api/user/${searchTerm}`);
            const result = await response.json();
            console.log(result);

            if (result.statusCode !== 500) {
                
                setUserData(result)
                setIsUserDataEmpty(false)
                console.log(userData)
                setPrefs({
                    moodConfused: Array.isArray(result.preferences["mood_confused"]) ? result.preferences["mood_confused"][0] : result.preferences["mood_confused"],
                    moodSad: Array.isArray(result.preferences["mood_sad"]) ? result.preferences["mood_sad"][0] : result.preferences["mood_sad"],
                    moodHappy: Array.isArray(result.preferences["mood_happy"]) ? result.preferences["mood_happy"][0] : result.preferences["mood_happy"],
                    likeShorts: result.preferences["like_shorts"],
                });

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

    const handleChange = (e) => {
        const {name, value} = e.target;
        setPrefs((prev) => ({ ...prev, [name]: value}));
    }

    console.log(prefs)


    return (
        <div className="w-screen bg-black flex-row text-white min-h-screen pt-8 lg:pt-0 texture-cartographer">
            <SideBar/>
            <div className="w-full md:w-4/5 lg:p-10 mx-auto flex-col p-3">
                <div className="font-bold text-4xl mb-5 md:mb-10">Change User Preferences</div>
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



                <div className={`${loading ? "justify-center pt-10" : "w-3/5 mx-auto"} mt-2`}>
                    {(!loading ? isUserDataEmpty ? msg : <UserDataCard data={userData} prefs={prefs} handleChange={handleChange} toast={toast} setToast={setToast} /> : msg)}
                </div>
            </div>
        </div>
    )
}

function UserDataCard({data, prefs, handleChange, toast, setToast}) {

    const handleSubmit = async () => {
        const response = await fetch(`/api/user/update/${data._id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ preferences: prefs }),
        });

        if (response.ok) {
            setToast({ message: 'Preferences updated successfully!', icon: Check });
        } else {
            setToast({ message: 'Failed to update preferences.', icon: X });
        }
    };


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
                    <select
                        name={"moodHappy"}
                        className={"flex-1 flex border-zinc-700 border bg-zinc-800 text-white placeholder-zinc-medium p-2"}
                        value={prefs.moodHappy}
                        required={true}
                        onChange={handleChange}
                    >
                        <option value="" disabled>Select a preference</option>
                        <option value={"Motivational Quotes"}>Motivational Quotes</option>
                        <option value={"Uplifting Storites"}>Uplifting Storites</option>
                        <option value={"Comedy / Fun Content"}>Comedy / Fun Content</option>
                        <option value={"Music / Playlists"}>Music / Playlists</option>
                        <option value={"Guided Meditation"}>Guided Meditation</option>
                        
                    </select>
                </div>
                
                <div className="flex-col flex-1">
                    <div className="font-light">Sad Mood</div>
                    <select
                        name={"moodSad"}
                        className={"flex-1 flex border-zinc-700 border bg-zinc-800 text-white placeholder-zinc-medium p-2"}
                        value={prefs.moodSad}
                        required={true}
                        onChange={handleChange}
                    >
                        <option value="" disabled>Select a preference</option>
                        <option value={"Relaxing Music / Nature Sounds"}>Relaxing Music / Nature Sounds</option>
                        <option value={"Guided Meditation / Breathing Exercises"}>Guided Meditation / Breathing Exercises</option>
                        <option value={"Supportive Community Posts"}>Supportive Community Posts</option>
                        <option value={"Inspirational Stories"}>Inspirational Stories</option>
                        <option value={"Professional Advice & Coping Strategies"}>Professional Advice & Coping Strategies</option>
                        
                    </select>
                </div>
                
            </div>
            <div className="flex-wrap gap-5 mb-5">

                <div className="flex-col flex-1">
                    <div className="font-light text-sm">Confused Mood</div>
                    
                    <select
                        name={"moodConfused"}
                        className={"flex-1 flex border-zinc-700 border bg-zinc-800 text-white placeholder-zinc-medium p-2"}
                        value={prefs.moodConfused}
                        required={true}
                        onChange={handleChange}
                    >
                        <option value="" disabled>Select a preference</option>
                        <option value={"Self-Reflection Exercises"}>Self-Reflection Exercises</option>
                        <option value={"Personal Growth Articles"}>Personal Growth Articles</option>
                        <option value={"Q&A Forums / Community Discussions"}>Q&A Forums / Community Discussions</option>
                        <option value={"Guided Decision-Making Tips"}>Guided Decision-Making Tips</option>
                    </select>
                </div>
                <div className="flex-col flex-1">
                    <div className="font-light text-sm">Like Shorts</div>
                    
                    <div className="flex-col flex-1">
                        <select
                            name={"likeShorts"}
                            className={"flex-1 flex border-zinc-700 border bg-zinc-800 text-white placeholder-zinc-medium p-2"}
                            value={prefs.likeShorts}
                            required={Number(true)}
                            onChange={handleChange}
                        >
                            <option value="" disabled>Select a preference</option>
                            <option value={0}>No</option>
                            <option value={1}>Yes</option>
                        </select>
                    </div>
                </div>
                
            </div>

            <button
                    className={"bg-white items-center font-gray-medium  duration-100 text-black flex text-nowrap w-min p-2 mt-4 hover:cursor-pointer hover:font-gray-dark"}
                    onClick={handleSubmit}
                >
                    <Upload size={18}/>
                    <div className="ml-2 text-sm">Save</div>
            </button>

            {toast && (
                    <StatusToast
                        message={toast.message}
                        type={toast.type}
                        icon={toast.icon}
                        onClose={() => setToast(null)}
                    />
                )}
            
        </div>
    )
}