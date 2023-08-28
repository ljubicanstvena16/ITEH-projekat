import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    async function registerUser(ev) {
        ev.preventDefault();
        try {
            await axios.post("/api/register", {
                name,
                email,
                password,
            });
            alert("Registracija uspešna! Možete koristiti aplikaciju.");
        } catch (e) {
            alert("Neuspešna registracija, molimo Vas pokušajte ponovo.");
        }
    }
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Registracija</h1>
                <form className="max-w-md mx-auto" onSubmit={registerUser}>
                    <input
                        type="text"
                        placeholder="Jovana Milovanović"
                        value={name}
                        onChange={(ev) => setName(ev.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="jovana@email.com"
                        value={email}
                        onChange={(ev) => setEmail(ev.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="složenijaŠifra123"
                        value={password}
                        onChange={(ev) => setPassword(ev.target.value)}
                    />
                    <button className="primary">Registruj se!</button>
                    <div className="text-center py-2 text-gray-500">
                        Već imaš nalog?{" "}
                        <Link className="underline text-black" to={"/login"}>
                            Prijavi se!
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
