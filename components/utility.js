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

export function getCookie(document, name) {
    const cookieValue = document.cookie
        .split('; ')
        .find((row) => row.startsWith(`${name}=`))
        ?.split('=')[1];
    return cookieValue;
};


export function setCookie(document, name, value, days) {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = `; expires=${date.toUTCString()}`;
    }

    document.cookie = `${name}=${encodeURIComponent(value || '')}${expires}; path=/`;
}
