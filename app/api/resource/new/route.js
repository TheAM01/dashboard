// app/api/resources/upload/route.js

import { NextResponse } from "next/server";

export async function POST(req) {

    try {
        const { title, content, preview, category, author, source } = await req.json();

        if (!title || !content || !preview || !category || !author || !source) {
            return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
        }

        const body = {
            title,
            content,
            preview,
            category,
            author,
            source,
            likes: 0,
        }

        console.log(typeof body)

        const res = await fetch("https://server-eta-self.vercel.app/resource/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        

        // const result = await res.json();

        if (!res.ok) {
            return NextResponse.json({ success: false, message: result.message || "Error from /resource/new" }, { status: res.status });
        }

        return NextResponse.json({ success: true, message: "Resource uploaded successfully" }, { status: 201 });

    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }

}
