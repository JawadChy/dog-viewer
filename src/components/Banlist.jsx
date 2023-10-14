import './Banlist.css';

function Banlist({ banList, removeFromBanList }) {
    return (
        <div className="sideNav">
            <h2>Ban List</h2>
            <h3>Select an attribute in your listing to ban it</h3>
            {banList.map((item, index) => (
                <button 
                    key={index} 
                    type="banned item" 
                    className="banned-buttons"
                    onClick={() => removeFromBanList(item)} 
                >
                    {item}
                </button>
            ))}
        </div>
    );
}

export default Banlist;
