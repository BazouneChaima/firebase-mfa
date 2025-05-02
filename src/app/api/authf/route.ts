// app/api/authf/route.ts
import { adminAuth } from "@/lib/firebase/firebaseAdmin";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    let userRecord;
    try {
      userRecord = await adminAuth.getUserByEmail(email);
    } catch (err) {
      userRecord = await adminAuth.createUser({
        email,
        emailVerified: false,
      });
    }

    return Response.json({ uid: userRecord.uid, email: userRecord.email });
  } catch (error) {
    console.error("Firebase error:", error);
    return new Response(JSON.stringify({ error: "Firebase error" }), {
      status: 500,
    });
  }
}
