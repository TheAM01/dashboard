import SideBar from "@/components/ui/Sidebar/sidebar";
import { getSession } from "@/lib/get-session";
import {redirect} from "next/navigation";

export default function Home() {

    // const session = await getSession();
    // console.log(session)
    // if (!session.user) {
    //     return redirect('/user/login?login-first=true&redirect-to=dashboard');
    // }

    return (
        <div className={"w-screen bg-black flex-row text-white min-h-screen pt-8 lg:pt-0 texture-cartography"}>

            <SideBar/>

            <div className="flex-col w-full lg:mx-30 p-4 lg:p-10">

                <div className="text-4xl mb-3 font-bold">
                    Dashboard - Home
                </div>

                <div className="text-sm text-gray-dark mb-6">Welcome back</div>

                <div className="flex-col bg-zinc-900 border border-zinc-800 p-5 w-full">

                    Start by navigating to appropriate pages

                </div>
            </div>

        </div>
    )
}
