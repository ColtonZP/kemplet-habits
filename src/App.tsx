import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { app } from './utils/firebase.ts';
import { Auth } from './components/auth';
import { Habits } from './components/habits';

const auth = getAuth(app);

export const App = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        return onAuthStateChanged(auth, user => setUser(user));
    }, []);

    return user ? <Habits /> : <Auth />;
};
