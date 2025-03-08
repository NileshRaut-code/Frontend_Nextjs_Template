import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import GoogleProvider from "next-auth/providers/google";

let baseURL = process.env.NEXT_PUBLIC_API_BASEURL;

export const authOptions = {
	session: "jwt",
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: "/login"
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		  }),
	  
		CredentialsProvider({
			credentials: {
				email: {},
				password: {},
			},
			async authorize(credentials, req) {
				try {
					console.log(`API baseurl is: ` + baseURL);
					let uri = `${baseURL}/user/login`;
					const res = await axios.post(uri, { email: credentials.email, password: credentials.password });

					if (res.data.checkuser) {
						// res.data.checkuser.accessToken=res.data.accessToken
						console.log(res.data.checkuser);
						
						return res.data.checkuser;
					} else {
						return null;
					}
				} catch (err) {
					console.log(`error is ${JSON.stringify(err)}`);
					return null;
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user,account }) {
			if (account?.provider === "google") {
				try {
				  console.log(user);
				  
				  const { data } = await axios.post("http://localhost:8000/user/auth/google", {
					
					email: user.email,
				
				  });
				  console.log(data);
				  
		
				  token._id = data._id; 
				  token.email = data.email;
				  token.username = data.username;
				  token.isverified = data.isverified;
				  token.accessToken=user.accessToken;
				} catch (error) {
				  console.error("Google login error:", error.response?.data || error.message);
				  throw new Error("Google login failed");
				}
			  }
		
			  if (user) {
				console.log(user);
				token._id = user._id;
				token.email = user.email;
				token.username = user.username;
				token.isverified = user.isverified;
				token.accessToken=user.accessToken;
			  }
			  return token;
		},
		async session({ session, token }) {
			if (session?.user) {
				session.user = {
					id: token.id,
					email: token.email,
					username: token.username,
					name: token.name,
					isverified: token.isverified,
					accessToken:token.accessToken,
				};
			}
			return session;
		}
	}
};