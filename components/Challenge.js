import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Challenge = () => {
    const [challenges, setChallenges] = useState([]);
    const [selectedChallenge, setSelectedChallenge] = useState(null);

    useEffect(() => {
        fetchChallenges();
    }, []);

    const fetchChallenges = async () => {
        const response = await axios.get('/api/challenges');
        setChallenges(response.data);
    };

    const handleChallengeSelect = (challenge) => {
        setSelectedChallenge(challenge);
    };

    return (
        <div>
            <h2>Wellness Challenges</h2>
            <div className="challenge-list">
                {challenges.map(challenge => (
                    <div key={challenge._id} onClick={() => handleChallengeSelect(challenge)}>
                        <h3>{challenge.title}</h3>
                        <p>{challenge.description}</p>
                        <p>Status: {challenge.status}</p>
                    </div>
                ))}
            </div>
            {selectedChallenge && (
                <div className="selected-challenge">
                    <h3>{selectedChallenge.title}</h3>
                    <p>{selectedChallenge.description}</p>
                    <p>Status: {selectedChallenge.status}</p>
                </div>
            )}
        </div>
    );
};

export default Challenge;
