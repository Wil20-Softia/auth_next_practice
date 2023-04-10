import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";


const Dashboard = () => {
    const [user, setUser] = useState({
        "firstname": "",
        "lastname": "",
        "email": "",
    })
    const router = useRouter();

    const getProfile = async () => {
        const response = await axios.get("/api/profile")
        setUser(response.data);
    }

    const logout = async () => {
        try {
            const response = await axios.post("/api/auth/logout");
            console.log(response);
            router.push("/login")
        } catch (error) {
            console.log(error);
            router.push("/login");
        }
        
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <pre>
                {JSON.stringify(user, null, 2)}
            </pre>
            <button onClick={() => getProfile()}>Get profile</button>
            <button onClick={() => logout()}>Logout</button>
        </div>
    )
}

export default Dashboard