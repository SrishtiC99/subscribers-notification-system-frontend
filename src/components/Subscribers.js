import { useDispatch, useSelector } from "react-redux"
import '../css/Subscribers.css';
import { addSubscriberList, deleteSubscriber } from "../api/axiosConfig";
import { useState } from "react";
import { addSubscribers, removeSubscriber } from "../actions/actions";

export default function Subscribers() {
    const jwtToken = useSelector(state => state.auth.jwtToken);
    var [subscribers, setSubscribers] = useState(useSelector(state => state.auth.subscribers));
    const dispatch = useDispatch();

    const deleteThisSubscriber = (id) => {
        deleteSubscriber(jwtToken, id)
            .then((respone) => {
                console.log(JSON.stringify(respone.data));
                if (respone.data === true) {
                    subscribers = subscribers.filter(subscriber => subscriber.id !== id)
                    dispatch(removeSubscriber(subscribers));
                    setSubscribers(subscribers);
                }
            })
            .catch((error) => {
                console.error("Error: " + JSON.stringify(error.response));
            });
    }

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    }

    const handleUpload = () => {
        addSubscriberList(jwtToken, selectedFile)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                const updatedSubsscribers = [...subscribers, ...response.data]
                dispatch(addSubscribers(updatedSubsscribers));
                setSubscribers(updatedSubsscribers);
                setSelectedFile(null);
            })
            .catch((error) => {
                console.error("Error: " + JSON.stringify(error.response));
            });
    }

    return (
        <div>
            <h2>Manage Your Subsscribers</h2>
            <table>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>TelegramId</th>
                        <th>Phone Number</th>
                        <th>Longitude</th>
                        <th>Latutude</th>
                        <th>Remove From the List</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        subscribers.map(subscriber => (
                            <tr key={subscriber.id}>
                                <td>{subscriber.email}</td>
                                <td>{subscriber.telegramId}</td>
                                <td>{subscriber.phoneNumber}</td>
                                <td>{subscriber.geolocation.longitude}</td>
                                <td>{subscriber.geolocation.latitude}</td>
                                <td className="button">
                                    <button onClick={() => deleteThisSubscriber(subscriber.id)}>Remove</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className="add_button" >
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpload}>Add Subscribers</button>
            </div>
        </div>
    );
}