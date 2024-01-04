import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

const ActivityTracker = () => {
    const [activities, setActivities] = useState([]);
    const [activityType, setActivityType] = useState('');
    const [activityDuration, setActivityDuration] = useState('');
    const [activityMood, setActivityMood] = useState('');
    const [activityNotes, setActivityNotes] = useState('');

    useEffect(() => {
        fetchActivities();
    }, []);

    const fetchActivities = async () => {
        const response = await fetch('/api/activities');
        const data = await response.json();
        setActivities(data);
    };

    const addActivity = async () => {
        const response = await fetch('/api/activities', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: activityType,
                duration: activityDuration,
                mood: activityMood,
                notes: activityNotes
            }),
        });
        const data = await response.json();
        setActivities([...activities, data]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Activity Tracker</Text>
            {activities.map((activity, index) => (
                <View key={index} style={styles.activity}>
                    <Text>Type: {activity.type}</Text>
                    <Text>Duration: {activity.duration}</Text>
                    <Text>Mood: {activity.mood}</Text>
                    <Text>Notes: {activity.notes}</Text>
                </View>
            ))}
            <TextInput
                style={styles.input}
                placeholder="Activity Type"
                onChangeText={text => setActivityType(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Activity Duration"
                onChangeText={text => setActivityDuration(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Mood"
                onChangeText={text => setActivityMood(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Notes"
                onChangeText={text => setActivityNotes(text)}
            />
            <Button title="Add Activity" onPress={addActivity} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    activity: {
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
});

export default ActivityTracker;
