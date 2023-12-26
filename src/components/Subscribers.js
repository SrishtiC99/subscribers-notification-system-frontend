import { useSelector } from "react-redux"

export default function Subscribers() {
    const subscribers = useSelector(state => state.auth.subscribers);

    return (
        <div>
            <h2>Manage Your Subsscribers</h2>
            <ol>
                {
                    subscribers.map(subscriber => (
                        <li key={subscriber.id}>
                            <p>{subscriber.email}</p>
                            <p>{subscriber.telegramId}</p>
                            <p>{subscriber.phoneNumber}</p>
                            <br />
                            <p>Location: </p>
                            <p>{subscriber.geolocation.longitude}</p>
                            <p>{subscriber.geolocation.latitude}</p>
                        </li>
                    ))
                }
            </ol>
        </div>
    )
}