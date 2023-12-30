import { useState } from "react";
import { useSelector } from "react-redux";
import { addTemplateSubscribers, deleteTemplateSubscribers, getSubscribersByTemplateId } from "../api/axiosConfig";

import '../css/TemplateDetailsPage.css';
import { useLocation } from "react-router-dom";

export default function TemplateDetailsPage() {
    const jwtToken = useSelector(state => state.auth.jwtToken);
    
    const location = useLocation();
    const template = location.state;

    const globalSubscribers = useSelector(state => state.auth.subscribers);
    const [templateSubscribers, setTemplateSubscribers] = useState([]);
    const [remainingSubscribers, setRemainingSubscribers] = useState([]);
    const [showSubscriber, setShowSubscriber] = useState(false);
    const [showRemainingSubscribers, setShowRemainingSubscribers] = useState(false);
    var [selectedSubscribersIdsRemove, setSelectedSubscriberIdsRemove] = useState([]);
    var [selectedSubscribersIdsAdd, setSelectedSubscriberIdsAdd] = useState([]);
    
    const handleShowSubscriber = () => {
        getSubscribersByTemplateId(jwtToken, template.id)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setTemplateSubscribers(response.data);
                setShowSubscriber(true);
            })
            .catch((error) => {
                console.error("Error: " + JSON.stringify(error.response));
            });
    }

    const handleSubscriberSelectionForRemoval = (id) => {
        if (selectedSubscribersIdsRemove.includes(id)) {
            selectedSubscribersIdsRemove = selectedSubscribersIdsRemove.filter(subscriberId => subscriberId !== id);
        }
        else {
            selectedSubscribersIdsRemove = [...selectedSubscribersIdsRemove, id];
        }
        setSelectedSubscriberIdsRemove(selectedSubscribersIdsRemove);
    }

    const handleSubscriberSelectionForAdding = (id) => {
        if (selectedSubscribersIdsAdd.includes(id)) {
            selectedSubscribersIdsAdd = selectedSubscribersIdsAdd.filter(subscriberId => subscriberId !== id);
        }
        else {
            selectedSubscribersIdsAdd = [...selectedSubscribersIdsAdd, id];
        }
        setSelectedSubscriberIdsAdd(selectedSubscribersIdsAdd);
    }

    const removeSelectedSubscribers = () => {
        const req = { subscriberIds: [...selectedSubscribersIdsRemove] };
        deleteTemplateSubscribers(jwtToken, template.id, req)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setSelectedSubscriberIdsRemove([]);
                handleShowSubscriber();
            })
            .catch((error) => {
                console.error("Error: " + JSON.stringify(error.response));
        })
    }

    const handleShowRemainingSubscribers = () => {
        if (templateSubscribers.length === 0) {
            // fetch template subscribers
            getSubscribersByTemplateId(jwtToken, template.id)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    setRemainingSubscribers(globalSubscribers.filter(globalSubscriber =>
                        !response.data.some(templateSubscriber => templateSubscriber.id === globalSubscriber.id)));
                    setTemplateSubscribers(response.data);
                    setShowRemainingSubscribers(true);
                })
                .catch((error) => {
                    console.error("Error: " + JSON.stringify(error.response));
                });
        }
        else {
            setRemainingSubscribers(globalSubscribers.filter(globalSubscriber =>
                !templateSubscribers.some(templateSubscriber => templateSubscriber.id === globalSubscriber.id)));
            setShowRemainingSubscribers(true);
        }
    }

    const handleAddSubscribers = () => {
        const req = { subscriberIds: [...selectedSubscribersIdsAdd] };
        addTemplateSubscribers(jwtToken, template.id, req)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setSelectedSubscriberIdsAdd([]);
                setShowRemainingSubscribers(false);
                handleShowSubscriber();
            })
            .catch((error) => {
                console.error("Error: " + JSON.stringify(error.response));
            });
    }

    return (
        <div className="template-details-page">
            <h2>{template.title}</h2>
            <p>{template.content}</p>
            <div>
                {showSubscriber ?
                    <div>
                        <p>Manage subscribers of template: {template.title}. You can add or remove subscribers from this template here...</p>
                        <br />
                        <table>
                            <thead>
                                <tr>
                                    <th>Email</th>
                                    <th>TelegramId</th>
                                    <th>Phone Number</th>
                                    <th>Longitude</th>
                                    <th>Latitude</th>
                                    <th>Select</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    templateSubscribers.map(subscriber => (
                                        <tr key={subscriber.id}>
                                            <td>{subscriber.email}</td>
                                            <td>{subscriber.telegramId}</td>
                                            <td>{subscriber.phoneNumber}</td>
                                            <td>{subscriber.geolocation?.longitude}</td>
                                            <td>{subscriber.geolocation?.latitude}</td>
                                            <td>
                                                <label>
                                                    <input type="checkbox" id={subscriber.id}
                                                        onChange={() => { handleSubscriberSelectionForRemoval(subscriber.id) }}>
                                                    </input>
                                                </label>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <br></br>
                        <div>
                            <button onClick={removeSelectedSubscribers}>Remove</button>
                        </div>
                    </div>
                    : <p onClick={handleShowSubscriber}>Click here to see all the subscribers of this template...</p>}
            </div>
            <br />
            <p>Add new Subscribers to this template:&nbsp;&nbsp;
                <button onClick={handleShowRemainingSubscribers}>Add</button>
            </p>
            {showRemainingSubscribers ?
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>TelegramId</th>
                                <th>Phone Number</th>
                                <th>Longitude</th>
                                <th>Latitude</th>
                                <th>Select</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                remainingSubscribers.map(subscriber => (
                                    <tr key={subscriber.id}>
                                        <td>{subscriber.email}</td>
                                        <td>{subscriber.telegramId}</td>
                                        <td>{subscriber.phoneNumber}</td>
                                        <td>{subscriber.geolocation?.longitude}</td>
                                        <td>{subscriber.geolocation?.latitude}</td>
                                        <td>
                                            <label>
                                                <input type="checkbox" id={subscriber.id}
                                                    onChange={() => { handleSubscriberSelectionForAdding(subscriber.id) }}>
                                                </input>
                                            </label>
                                        </td>

                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <br />
                    <button onClick={handleAddSubscribers}>Add to Template</button>
                </div>
                : <></>}
        </div>
    );
}