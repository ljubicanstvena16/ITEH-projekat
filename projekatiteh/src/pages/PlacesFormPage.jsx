import PhotosUploader from "../PhotosUploader.jsx";
import Perks from "../Perks.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";

export default function PlacesFormPage() {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState("");
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState(100);
    const [redirect, setRedirect] = useState(false);
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get("/places/" + id).then((response) => {
            const { data } = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        });
    }, [id]);
    function inputHeader(text) {
        return <h2 className="text-2xl mt-4">{text}</h2>;
    }
    function inputDescription(text) {
        return <p className="text-gray-500 text-sm">{text}</p>;
    }
    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }

    async function savePlace(ev) {
        ev.preventDefault();
        const placeData = {
            title,
            address,
            addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price,
        };
        if (id) {
            // update
            await axios.put("/places", {
                id,
                ...placeData,
            });
            setRedirect(true);
        } else {
            // new place
            await axios.post("/places", placeData);
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={"/account/places"} />;
    }

    return (
        <div>
            <AccountNav />
            <form onSubmit={savePlace}>
                {preInput(
                    "Naslov",
                    "Naslov bi trebalo da bude što privlačniji korisnicima platforme."
                )}
                <input
                    type="text"
                    value={title}
                    onChange={(ev) => setTitle(ev.target.value)}
                    placeholder="Naslov oglasa"
                />
                {preInput("Adresa", "Adresa mesta koju postavljaš za oglas.")}
                <input
                    type="text"
                    value={address}
                    onChange={(ev) => setAddress(ev.target.value)}
                    placeholder="Mije Kovačevića..."
                />
                {preInput("Fotografije", "Što više fotografija, to bolje!")}
                <PhotosUploader
                    addedPhotos={addedPhotos}
                    onChange={setAddedPhotos}
                />
                {preInput("Opis", "Detaljniji opis ovog mesta koje se izdaje.")}
                <textarea
                    value={description}
                    onChange={(ev) => setDescription(ev.target.value)}
                />
                {preInput(
                    "Osobine",
                    "Odaberi sve povlastice koje postoje u tvom smeštaju."
                )}
                <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    <Perks selected={perks} onChange={setPerks} />
                </div>
                {preInput(
                    "Ekstra informacije",
                    "Ovde možeš navesti pravila kućnog reda, dodatne infomacije..."
                )}
                <textarea
                    value={extraInfo}
                    onChange={(ev) => setExtraInfo(ev.target.value)}
                />
                {preInput(
                    "Vremena za ček-in i ček-aut.",
                    "Dodaj vremena za ček-in i ček-aut, ali vodi računa da ostaviš dovoljno vremena između za čišćenje."
                )}
                <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
                    <div>
                        <h3 className="mt-2 -mb-1">Ček-in vreme</h3>
                        <input
                            type="text"
                            value={checkIn}
                            onChange={(ev) => setCheckIn(ev.target.value)}
                            placeholder="18"
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Ček-aut vreme</h3>
                        <input
                            type="text"
                            value={checkOut}
                            onChange={(ev) => setCheckOut(ev.target.value)}
                            placeholder="9"
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Maksimalni broj gostiju</h3>
                        <input
                            type="number"
                            value={maxGuests}
                            onChange={(ev) => setMaxGuests(ev.target.value)}
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Cena po noćenju</h3>
                        <input
                            type="number"
                            value={price}
                            onChange={(ev) => setPrice(ev.target.value)}
                        />
                    </div>
                </div>
                <button className="primary my-4">Sačuvaj u bazi!</button>
            </form>
        </div>
    );
}
