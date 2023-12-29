import { useState } from 'react';
import { SignIn } from './SignIn.tsx';
import { SignUp } from './SignUp.tsx';

export const Auth = () => {
    const [isSignIn, setIsSignIn] = useState(true);

    const handleClick = () => setIsSignIn(prevState => !prevState);

    return (
        <div>
            <h1>Kemplet Habits</h1>

            <div className="card">
                {isSignIn ? <SignIn /> : <SignUp />}

                <p>
                    {isSignIn
                        ? "Don't have an account?"
                        : 'Already have an account?'}
                </p>

                <button onClick={handleClick}>
                    {isSignIn ? 'Sign Up' : 'Sign In'}
                </button>
            </div>
        </div>
    );
};
