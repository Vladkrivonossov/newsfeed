import { Box, Button, Stack, TextField } from '@mui/material';
import React, { FC } from 'react';

export type TLoginField = {
  name: string;
  error?: boolean;
  helper?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type TProps = {
  className?: string;
  email: TLoginField;
  password: TLoginField;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const LoginForm: FC<TProps> = ({ className, email, password, onSubmit }) => {
  return (
    <Box className={className}>
      <form onSubmit={onSubmit} method="POST">
        <Stack direction="column" spacing={1}>
          <TextField
            type="email"
            fullWidth
            label={email.name}
            variant="outlined"
            name={email.name}
            value={email.value}
            onChange={email.onChange}
            error={!!email.error}
            helperText={email.helper}
          />
          <TextField
            type="password"
            fullWidth
            label={password.name}
            variant="outlined"
            name={password.name}
            value={password.value}
            onChange={password.onChange}
            error={!!password.error}
            helperText={password.helper}
          />
          <Button type="submit" variant="contained" color="primary" size="large">
            Sign in
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
