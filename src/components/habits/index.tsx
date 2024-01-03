import { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { doc, updateDoc, arrayUnion, onSnapshot } from 'firebase/firestore';

import motivation from '@/motivationalLines.json';

import { app, db } from '@/utils/firebase.ts';
import { Button } from '@ui/Button.tsx';

const auth = getAuth(app);

export const Habits = () => {
    const [habitForm, setHabitForm] = useState('');
    const [habits, setHabits] = useState<string[]>([]);

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
        <div className="grid grid-cols-2 gap-10 p-10 max-w-screen-xl mx-auto">
            {/* Left Column */}
            <div>
                <div className="flex items-center mb-5 gap-4">
                    <h2 className="text-4xl font-bold">
                        Welcome, {auth.currentUser?.displayName}!
                    </h2>
                    <Button
                        type="button"
                        intent="ghost"
                        onClick={handleSignOut}
                    >
                        Sign Out
                    </Button>
                </div>

                <p className="mb-10 italic">
                    {motivation[Math.floor(Math.random() * motivation.length)]}
                </p>

                <div>
                    <div className="bg-white rounded-xl p-10">
                        <div className="flex justify-between mb-8">
                            <span>S</span>
                            <span>M</span>
                            <span>T</span>
                            <span>W</span>
                            <span>T</span>
                            <span>F</span>
                            <span>S</span>
                        </div>

                        <ul>
                            {habits.map(habit => (
                                <li className="mb-4">
                                    <Button
                                        intent="secondary"
                                        fullWidth
                                        align="left"
                                    >
                                        {habit}
                                    </Button>
                                </li>
                            ))}
                        </ul>

                        <form
                            className="flex gap-5 items-center p-2 bg-ghost-white rounded-xl"
                            onSubmit={handleSubmit}
                        >
                            <label htmlFor="habit">+</label>
                            <input
                                type="text"
                                id="habit"
                                name="habit"
                                value={habitForm}
                                onChange={handleChange}
                            />
                            {habitForm && <Button type="submit">Submit</Button>}
                        </form>
                    </div>
                </div>
            </div>

            {/* Right Column */}
            <div>
                <div className="flex justify-between items-center mb-10">
                    <h3 className="text-2xl">Activity history</h3>
                    <div className="flex items-center gap-2 leading-4">
                        <Button padding="small">1w</Button>
                        <Button intent="ghost" padding="small">
                            2w
                        </Button>
                        <Button intent="ghost" padding="small">
                            1m
                        </Button>
                        <Button intent="ghost" padding="small">
                            3m
                        </Button>
                        <Button intent="ghost" padding="small">
                            6m
                        </Button>
                        <Button intent="ghost" padding="small">
                            1y
                        </Button>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-10">Chart</div>
            </div>
        </div>
    );
};
