import { useDispatch, useSelector } from "react-redux";
import { renewSubscription, upgadeToOwner } from "../api/axiosConfig";
import { subscription, upgradeAccount } from "../actions/actions";
import { useState } from "react";

export default function BillingPage() {
    const jwtToken = useSelector(state => state.auth.jwtToken);
    const [isExpired, setIsExpired] = useState(useSelector(state => state.auth.isAccountExpired));
    const [role, setRole] = useState(useSelector(state => state.auth.role));
    const [lastBillingDate, setLastBillingDate] = useState(useSelector(state => state.auth.lastBillingDate));

    const dispatch = useDispatch();

    const upgrade = () => {
        upgadeToOwner(jwtToken)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                dispatch(upgradeAccount(response.data.accountType, response.data.lastBillingDate));
                setRole('OWNER');
            })
            .catch((error) => {
                console.error("Error: " + JSON.stringify(error.response));
            });
    }

    const renew = () => {
        renewSubscription(jwtToken)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                dispatch(subscription(response.data.lastBillingDate));
                setIsExpired(false);
                setLastBillingDate(response.data.lastBillingDate);
            })
            .catch((error) => {
                console.error("Error: " + JSON.stringify(error.response));
            });
    }
    return (
        <div>
            <h2>Manage your Bills: </h2>
            <p>You are currently subscribed to {role} account.</p>
            {role === 'OWNER' ? <div>
                <p>Your last billing date was {lastBillingDate}</p>
            </div> : <></>}
            {role === 'USER' ? <div>
                <p>Upgrade your account to OWNER: </p>
                <button onClick={upgrade}>Upgrade Account</button>
            </div> : <></>}
            {isExpired === true ?
                <div>
                    <p>Your account has been expired. Renew your account here: <button onClick={renew}>Renew Account</button></p>
                </div>
                : <></>}
        </div>
    );
}