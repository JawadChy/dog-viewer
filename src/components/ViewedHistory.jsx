import './ViewedHistory.css';

function ViewedHistory({ history }) {
    return (
        <div className="historyNav">
            <h2>Viewed History</h2>
            <h3>Previously viewed dogs from this session</h3>
            {history.map((dog, index) => (
                <div key={index} className="viewed-item">
                    <span>{dog.breeds[0]?.name || "Unknown Breed"}</span>
                    <img src={dog.url} alt={dog.breeds[0]?.name || "Unknown Breed"} className="viewed-image" />
                </div>
            ))}
        </div>
    );
}


export default ViewedHistory;