import { NextResponse } from 'next/server';

export async function POST(req, context) {
    const { id } = await context.params;
    const body = await req.json();
    if (!id || !body) {
        return NextResponse.json({ error: 'Missing user ID or request body' }, { status: 400 });
    }

    const { moodHappy, moodSad, moodConfused, likeShorts } = body.preferences;

    if (
        typeof likeShorts === 'undefined' ||
        typeof moodHappy === 'undefined' ||
        typeof moodSad === 'undefined' ||
        typeof moodConfused === 'undefined'
    ) {
        return NextResponse.json({ error: 'Incomplete preferences data' }, { status: 400 });
    }
    try {
        const jsonedBody = JSON.stringify({
            Preferences: {
                mood_happy: moodHappy,
                mood_sad: moodSad,
                mood_confused: moodConfused,
                like_shorts: !!Number(likeShorts),
            },
        })
        console.log(jsonedBody)
        const res = await fetch(`https://server-eta-self.vercel.app/user/user_preference/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonedBody,
        });

        if (!res.ok) {
            const error = await res.json();
            return NextResponse.json({ error: error.message || 'Server error' }, { status: res.status });
        }

        return NextResponse.json({ message: 'Preferences updated successfully' });
    } catch (err) {
        console.error('Update error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
