import { useState, useEffect } from 'react';
import './Discover.css';

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function Discover({ banList, addToBanList }) {
    const [data, setData] = useState(null);
    const [shouldFetch, setShouldFetch] = useState(false);

    useEffect(() => {
        if (shouldFetch) {
            fetchData();
            setShouldFetch(false);
        }
    }, [banList, shouldFetch]);

    const isValidDog = (dog) => {
        if (dog.breeds.length === 0) return false;

        const attributes = {
            breedName: dog.breeds[0]?.name || "Unknown Breed",
            origin: dog.breeds[0]?.origin || "Unknown Origin",
            lifeSpan: dog.breeds[0]?.life_span || "Unknown Lifespan",
            weight: dog.breeds[0]?.weight?.imperial || "Unknown Weight",
            breedGroup: dog.breeds[0]?.breed_group || "Unknown Group"
        };

        return Object.values(attributes).every(attr => !banList.includes(attr));
    };

    const fetchData = async () => {
        try {
            const response = await fetch(`https://api.thedogapi.com/v1/images/search?limit=10&api_key=${ACCESS_KEY}`);
            const results = await response.json();
    
            const validDogs = results.filter(isValidDog);
            
            if (validDogs.length > 0) {
                setData(validDogs[0]);
            } else {
                fetchData(); // Recursive call if no valid dogs are found
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const handleDiscoverClick = () => {
        setShouldFetch(true);
    };

    return (
        <div className="discover-container">
            {data && (
                <>
                    <h2>{data.breeds[0]?.name || "Unknown Breed"}</h2>
                    <div className="buttons">
                        <button type="attribute" className="attribute-buttons" onClick={() => addToBanList(data.breeds[0]?.name || "Unknown Breed")}>{data.breeds[0]?.name || "Unknown Breed"}</button>
                        {data.breeds[0]?.origin && data.breeds[0]?.origin !== "Unknown Origin" && (
                            <button type="attribute" className="attribute-buttons" onClick={() => addToBanList(data.breeds[0]?.origin)}>{data.breeds[0]?.origin}</button>
                        )}
                        <button type="attribute" className="attribute-buttons" onClick={() => addToBanList(data.breeds[0]?.life_span || "Unknown Lifespan")}>{data.breeds[0]?.life_span || "Unknown Lifespan"}</button>
                        <button type="attribute" className="attribute-buttons" onClick={() => addToBanList(data.breeds[0]?.weight?.imperial || "Unknown Weight")}> {data.breeds[0]?.weight?.imperial ? `${data.breeds[0]?.weight?.imperial} lbs` : "Unknown Weight"} </button>
                        {data.breeds[0]?.breed_group && ( // Add breed group as an attribute
                            <button type="attribute" className="attribute-buttons" onClick={() => addToBanList(data.breeds[0]?.breed_group)}>{data.breeds[0]?.breed_group}</button>
                        )}
                    </div>
                    <br></br>
                    <img src={data.url} alt="Random Dog" height="250px" width="250px" />
                </>
            )}
            <br />
            <button type="discover" className="discover-button" onClick={handleDiscoverClick}>
                🔀 Discover!
            </button>
        </div>
    );
}

export default Discover;