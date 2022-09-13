import React, { Reducer, useReducer, FormEvent, useState } from 'react';
import { LoginForm, TLoginField } from '@components/LoginForm/LoginForm';
import './LoginContainer.css';
import { validateEmail } from './utils';
import { useAuth } from '../AuthContextProvider';
import { Typography } from '@mui/material';

type TLoginFieldState = Omit<TLoginField, 'onChange'>;
type TAction = {
  type: 'change' | 'error';
  value: string;
};

const reducer = (state: TLoginFieldState, action: TAction): TLoginFieldState => {
  switch (action.type) {
    case 'change':
      return {
        ...state,
        value: action.value,
        error: false,
      };
    case 'error':
      return {
        ...state,
        error: true,
        helper: action.value,
      };
  }
  return state;
};

export const LoginContainer = () => {
  const { loginWithEmailAndPass } = useAuth();
  const [authError, setAuthError] = useState('');
  const [emailState, dispatchEmail] = useReducer<Reducer<TLoginFieldState, TAction>>(reducer, {
    name: 'email',
    value: '',
  });

  const [passwordState, dispatchPassword] = useReducer<Reducer<TLoginFieldState, TAction>>(reducer, {
    name: 'password',
    value: '',
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isValid = true;
    if (!validateEmail(emailState.value)) {
      isValid = false;
      dispatchEmail({
        type: 'error',
        value: 'Enter a valid email',
      });
    }

    if (passwordState.value.length <= 6) {
      isValid = false;
      dispatchPassword({
        type: 'error',
        value: 'Pass length must be more than six',
      });
    }

    if (isValid) {
      loginWithEmailAndPass(emailState.value, passwordState.value)
        .then(() => {
          window.history.back();
        })
        .catch((error) => {
          setAuthError(error.message || 'error');
        });
    }
  };

  return (
    <div className="login-container">
      {authError && (
        <Typography variant="subtitle2" sx={{ m: 2 }}>
          {authError}
        </Typography>
      )}
      <LoginForm
        email={{
          ...emailState,
          onChange: (e) => dispatchEmail({ type: 'change', value: e.target.value }),
        }}
        password={{
          ...passwordState,
          onChange: (e) => dispatchPassword({ type: 'change', value: e.target.value }),
        }}
        onSubmit={onSubmit}
      />
    </div>
  );
};
