
import { authOptions } from '../../api/auth/auth.js'
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Logout from "./logout.js";

export default async function LoginPage() {
    const session = await getServerSession(authOptions);
    console.log(`Session is: ${JSON.stringify(session)}`)
    if(!session) {
        redirect("/login");
    }
    return (

<Logout/>
                
    
    );
}
