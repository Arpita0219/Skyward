import { useState } from "react";

function SearchBar({ onSearch }) {

    const [city, setCity] = useState("");

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!city.trim()) return;

        onSearch(city);

    };

    return (

        <form
            onSubmit={handleSubmit}
            className="flex justify-center mt-10"
        >

            <div className="flex bg-white rounded-full shadow-lg overflow-hidden">

                <input
                    type="text"
                    placeholder="Search City..."
                    className="px-6 py-3 outline-none w-80"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />

                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                >
                    Search
                </button>

            </div>

        </form>

    );

}

export default SearchBar;