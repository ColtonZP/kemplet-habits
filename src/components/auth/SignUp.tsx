import { useState } from 'react';
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
} from 'firebase/auth';
import { app } from '@/utils/firebase.ts';

const auth = getAuth(app);

export const SignUp = () => {
    const [formValue, setFormValue] = useState({
        email: '',
        name: '',
        password: '',
        passwordConfirmation: '',
    });

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // TODO: form validation

        await createUserWithEmailAndPassword(
            auth,
            formValue.email,
            formValue.password
        ).then(_ => {
            if (auth.currentUser) {
                updateProfile(auth.currentUser, {
                    displayName: formValue.name,
                });
            }
        });
    };

    const handleChange = (event: React.ChangeEvent<HTMLFormElement>) => {
        const { name, value } = event.target;

        setFormValue(prevFormValue => ({
            ...prevFormValue,
            [name]: value,
        }));
    };

    return (
        <div>
            <h2>Sign Up</h2>

            <form onSubmit={handleSubmit} onChange={handleChange}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formValue.email}
                    required
                />

                <label htmlFor="text">First Name</label>
                <input
                    type="name"
                    name="name"
                    value={formValue.name}
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    value={formValue.password}
                    required
                />

                <label htmlFor="passwordConfirmation">Confirm Password</label>
                <input
                    type="password"
                    name="passwordConfirmation"
                    value={formValue.passwordConfirmation}
                    required
                />

                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};
