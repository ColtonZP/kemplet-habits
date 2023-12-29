import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../utils/firebase.ts';

const auth = getAuth(app);

export const SignIn = () => {
    const [formValue, setFormValue] = useState({ email: '', password: '' });

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        await signInWithEmailAndPassword(
            auth,
            formValue.email,
            formValue.password
        );
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
            <h2>Sign In</h2>

            <form onSubmit={handleSubmit} onChange={handleChange}>
                <label htmlFor="email">email</label>
                <input type="email" name="email" value={formValue.email} />

                <label htmlFor="password">password</label>
                <input
                    type="password"
                    name="password"
                    value={formValue.password}
                />

                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};
