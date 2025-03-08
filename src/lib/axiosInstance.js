import axios from "axios";
import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/auth";
let baseURL = process.env.NEXTAUTH_URL;

const AxiosInstance = () => {
	const defaultOptions = {
		baseURL,
	};

	const instance = axios.create(defaultOptions);

	instance.interceptors.request.use(async (request) => {
		const session = await getServerSession(authOptions);
		// console.log(`Session has: ${session.user.accessToken}`)
		if (session) {
			request.headers.Authorization = `Bearer ${session.user.accessToken}`;
		}
		return request;
	});

	return instance;
};

export default AxiosInstance();
