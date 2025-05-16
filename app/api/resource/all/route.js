

export async function GET() {
    
    try {

        const res = await fetch("https://server-eta-self.vercel.app/resource/all");
        const json = await res.json();

        return Response.json(json, { status: 200 });

    } catch (error) {
        console.error("Fetch error:", error);
        return Response.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
