import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WellnessSession = () => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSessions();
    }, []);

    const fetchSessions = async () => {
        try {
            const response = await axios.get('/api/wellness-sessions');
            setSessions(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data: ", error);
            setLoading(false);
        }
    };

    const renderSessions = () => {
        if (loading) return <div>Loading...</div>;
        return sessions.map(session => (
            <div key={session._id}>
                <h2>Wellness Session</h2>
                <p>Date: {new Date(session.date).toLocaleDateString()}</p>
                <p>Wellness Advice: {session.wellnessAdvice}</p>
                <p>Mental Health Support: {session.mentalHealthSupport}</p>
                <p>Daily Wellness Tips: {session.dailyWellnessTips}</p>
            </div>
        ));
    };

    return (
        <div>
            <h1>Wellness Sessions</h1>
            {renderSessions()}
        </div>
    );
};

export default WellnessSession;
