// // So thing thing is to display the user runs like just for viewing and not editing or deleting. 
// // So the user can see their runs and click on them to view more details. 
// // The UserDatav component fetches the user data from the server and displays it in a list format. 




import { useState, useEffect } from "react";

function UserDatav() {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/runs/userdata");
            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };
    // const handleRunClick = (id) => {
    return (
        <div className="run-list">
            {userData.map((data) => (
                <div 
                    key={data._id} 
                    className="run-card" 
                    onClick={() => navigate(`/runs/${data._id}`)}
                >
                    <h2>{data.runName}</h2>
                    <div className="run-stats">
                        <p>Distance: {data.splits[0]?.distance}</p>
                        <p>Pace: {data.splits[0]?.time}</p>
                    </div>
                </div>
            ))}
        </div>
    );
    }
    


export default UserDatav;