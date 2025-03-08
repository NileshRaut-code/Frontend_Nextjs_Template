import Signup from './signup.js';
import { authOptions } from '../../api/auth/auth.js'
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
    const session = await getServerSession(authOptions);
     console.log(`Session is: ${JSON.stringify(session)}`)
    if(session) {
        redirect("/dashboard");
    }
    return (

                        <Signup />
                
    
    );
}
