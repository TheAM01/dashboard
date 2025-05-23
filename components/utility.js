"use client";

export function ScreenSizeGetter() {
    return (
        <div className="bg-white p-2 uppercase text-black font-bold duration-300 h-min">
            <div className="hidden! sm:hidden! md:hidden! lg:hidden! xl:hidden! 2xl:flex!">2xl (1344)</div>
            <div className="hidden! sm:hidden! md:hidden! lg:hidden! xl:flex! 2xl:hidden!">xl (1120)</div>
            <div className="hidden! sm:hidden! md:hidden! lg:flex! xl:hidden! 2xl:hidden!">lg (896)</div>
            <div className="hidden! sm:hidden! md:flex! lg:hidden! xl:hidden! 2xl:hidden!">md (672)</div>
            <div className="hidden! sm:flex! md:hidden! lg:hidden! xl:hidden! 2xl:hidden!">sm (560)</div>
            <div className="flex! sm:hidden! md:hidden! lg:hidden! xl:hidden! 2xl:hidden!">mo</div>
        </div>
    )
}
