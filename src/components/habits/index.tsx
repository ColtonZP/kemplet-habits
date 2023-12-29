import { getAuth, signOut } from 'firebase/auth';
import { app, db } from '../../utils/firebase.ts';
import React, { useEffect } from 'react';
import { doc, updateDoc, arrayUnion, onSnapshot } from 'firebase/firestore';

const auth = getAuth(app);

export const Habits = () => {
    const [habitForm, setHabitForm] = React.useState('');
    const [habits, setHabits] = React.useState<string[]>([]);

    const habitRef = doc(db, 'users', auth.currentUser!.uid);

    useEffect(() => {
        return onSnapshot(habitRef, doc => {
            if (doc.data()) {
                setHabits(doc.data()?.habits);
            }
        });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHabitForm(e.target.value);
    };

    const handleSignOut = async () => {
        await signOut(auth);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await updateDoc(habitRef, {
            habits: arrayUnion(habitForm),
        });
    };

    return (
        <div>
            <h2>Welcome, {auth.currentUser?.displayName}</h2>
            <button onClick={handleSignOut}>Sign Out</button>

            <div className="card">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="habit">Add Habit</label>
                    <input
                        type="text"
                        id="habit"
                        name="habit"
                        value={habitForm}
                        onChange={handleChange}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>

            <ul>
                {habits.map(habit => (
                    <li>{habit}</li>
                ))}
            </ul>
        </div>
    );
};
