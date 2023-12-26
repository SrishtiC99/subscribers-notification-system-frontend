import { useSelector } from "react-redux"
import '../css/Subscribers.css';

export default function Subscribers() {
    const subscribers = useSelector(state => state.auth.subscribers);

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
                                <td className="button"><button>Remove</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}