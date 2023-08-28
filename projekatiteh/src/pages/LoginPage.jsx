import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext.jsx";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const { setUser } = useContext(UserContext);
    async function handleLoginSubmit(ev) {
        ev.preventDefault();
        try {
            const { data } = await axios.post("/login", { email, password });
            setUser(data);
            alert("Login successful");
            setRedirect(true);
        } catch (e) {
            alert("Login failed");
        }
    }

    if (redirect) {
        return <Navigate to={"/"} />;
    }

    return (
        <div className="mt-8 flex justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h1 className="text-3xl font-semibold mb-4 text-center">
                    Prijava
                </h1>
                <form className="space-y-4" onSubmit={handleLoginSubmit}>
                    <input
                        type="email"
                        placeholder="your@email.com"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
                        value={email}
                        onChange={(ev) => setEmail(ev.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:border-blue-500"
                        value={password}
                        onChange={(ev) => setPassword(ev.target.value)}
                    />
                    <button
                        type="submit"
                        className="primary w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-offset-2"
                    >
                        Prijavi se
                    </button>
                    <div className="text-center text-gray-500">
                        Nemate nalog još?{" "}
                        <Link to="/register" className="underline text-black">
                            Registruj se sada!
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
