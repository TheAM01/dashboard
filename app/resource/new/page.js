"use client";

import {Upload, Check, X} from "lucide-react";
import {useState} from "react";
import SideBar from "@/components/ui/Sidebar/sidebar";
import axios from "axios";
import StatusToast from "@/components/ui/status-toast";

export default function AddResource({user}) {

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        preview: "",
        category: "",
        author: "",
        source: "",
    });

    const [toast, setToast] = useState(null);

    const handleChange = async (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({ ...prev, [name]: value }));

        if (name === "url") {
            
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        // Extract form data
        const { title, content, preview, category, author, source } = formData;

        if (!title || !content || !preview || !category || !author || !source) {
            return setToast({ message: 'Missing fields!', icon: X });
        }

        const response = await fetch("/api/resource/new", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, content, preview, category, author, source }),
        });

        const status = response.status;

        setFormData({
            title: "",
            content: "",
            preview: "",
            category: "",
            author: "",
            source: "",
        });


        if (response.status === 201) setToast({ message: 'Upload successful!', icon: Check })
        else setToast({ message: 'There was a problem.', icon: X });

        return status;
    };

    return (
        <div className={"w-screen bg-black flex-row text-white min-h-screen pt-8 lg:pt-0 texture-cartographer"}>

            <SideBar/>
            <div className="flex-col w-full md:w-4/5 lg:w-3/5 xl:w-2/5  p-4 lg:p-10 mx-auto">

                <div className="text-4xl mb-3 font-bold">
                    Add Resources
                </div>

                <div className="text-sm text-gray-dark mb-6">Add an article/resource</div>

                <div className="flex-col bg-zinc-900 border border-zinc-700 p-5 w-full">

                    <div className="font-semibold text-2xl mb-2">Complete the details</div>

                    <div className="flex-wrap gap-5 mb-5">
                        <div className="flex-col flex-1">
                            <div className="font-light">Title *</div>
                            <input
                                name={"title"}
                                className={"flex-1 flex bg-zinc-900 border border-zinc-700 text-white placeholder-gray-medium p-2 text-sm"}
                                type={"text"}
                                value={formData.title}
                                onChange={handleChange}
                                required={true}
                            />
                        </div>
                        
                    </div>

                    <div className="flex-wrap gap-5 mb-5">

                        <div className="flex-col flex-1">
                            <div className="font-light">Author *</div>
                            <input
                                name={"author"}
                                className={"flex-1 flex bg-zinc-900 border border-zinc-700 text-white placeholder-gray-medium p-2  text-sm"}
                                type={"text"}
                                value={formData.author}
                                onChange={handleChange}
                                required={true}
                            />
                            
                        </div>
                        <div className="flex-col flex-1">
                            <div className="font-light">Category *</div>
                            <select
                                name={"category"}
                                className={"flex-1 flex border-zinc-700 border bg-zinc-800 text-white placeholder-zinc-medium p-2"}
                                value={formData.category}
                                required={true}
                                onChange={handleChange}
                            >
                                <option value={"Mindfullness"}>Mindfullness</option>
                                <option value={"Physical Relaxation"}>Physical Relaxation</option>
                                <option value={"Emotional Support"}>Emotional Support</option>
                                <option value={"Guides & Workbooks"}>Guides & Workbooks</option>
                                <option value={"Better Sleep"}>Better Sleep</option>
                                <option value={"Productivity Hacks"}>Productivity Hacks</option>
                            </select>
                        </div>

                        
                    </div>

                    <div className="flex-col flex-1 mb-3">
                        <div className="font-light">Source *</div>
                        <input
                            name={"source"}
                            className={"flex-1 flex bg-zinc-900 border border-zinc-700 text-white placeholder-gray-medium p-2 text-sm"}
                            type={"url"}
                            value={formData.source}
                            onChange={handleChange}
                            required={true}
                            placeholder={"https://..."}
                        />
                        <div className="mt-1 text-gray-dark text-xs">Link to a source [can be removed if asked]</div>
                    </div>

                    {/* <div className="flex-wrap gap-5 mb-5">

                        <div className="flex-col flex-1">
                            <div className="font-light">Likes *</div>
                            <input
                                name={"likes"}
                                className={"flex-1 flex bg-zinc-900 border border-zinc-700 text-white placeholder-gray-medium p-2  text-sm"}
                                type={"number"}
                                value={formData.likes}
                                onChange={handleChange}
                                required={true}
                            />
                        </div>

                        <div className="flex-col flex-1">
                            <div className="font-light">Views *</div>
                            <input
                                name={"views"}
                                className={"flex-1 flex bg-zinc-900 border border-zinc-700 text-white placeholder-gray-medium p-2  text-sm"}
                                type={"number"}
                                value={formData.views}
                                onChange={handleChange}
                                required={true}
                            />
                        </div>
                    </div> */}

                    <div className="flex-col flex-1">
                        <div className="font-light">Content *</div>
                        <textarea
                            name={"content"}
                            className={"flex-1 flex bg-zinc-900 border border-zinc-700 text-white placeholder-gray-medium p-2 text-sm"}
                            value={formData.content}
                            onChange={handleChange}
                            required={false}
                            rows={7}
                            placeholder={"Content of the post..."}
                        />
                        <div className="font-light">Preview *</div>
                        <textarea
                            name={"preview"}
                            className={"flex-1 flex bg-zinc-900 border border-zinc-700 text-white placeholder-gray-medium p-2 text-sm"}
                            value={formData.preview}
                            onChange={handleChange}
                            required={false}
                            rows={7}
                            placeholder={"Preview of post..."}
                        />
                        <div className="mt-1 text-gray-dark text-xs">Your peers appreciate channels that are described about more. Try adding a description to reach more people.</div>
                    </div>

                    <div className="flex-col flex-1">
                        
                    </div>

                    <div className="w-full border-b border-zinc-700 mt-5 mb-2"></div>

                    <button
                        className={"bg-white items-center font-gray-medium  duration-100 text-black flex text-nowrap w-min p-2 mt-4 hover:cursor-pointer hover:font-gray-dark"}
                        onClick={handleSubmit}
                    >
                        <Upload size={18}/>
                        <div className="ml-2 text-sm">Upload</div>
                    </button>

                </div>
                {toast && (
                    <StatusToast
                        message={toast.message}
                        type={toast.type}
                        icon={toast.icon}
                        onClose={() => setToast(null)}
                    />
                )}
            </div>
        </div>
    )
}
