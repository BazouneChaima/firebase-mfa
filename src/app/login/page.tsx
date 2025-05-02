'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Navigation from '@/components/Navigation';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  CircularProgress
} from '@mui/material';
import { LockOutlined, Email } from '@mui/icons-material';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      await login(email, password);
      router.push('/'); // Redirect to home page after successful login
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An error occurred during login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navigation />
      
      <Container maxWidth="xs" sx={{ pt: 8, pb: 8 }}>
        <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Sign in
          </Typography>
          
          {errorMessage && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {errorMessage}
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: <Email color="action" sx={{ mr: 1 }} />
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: <LockOutlined color="action" sx={{ mr: 1 }} />
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>
            
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2">
                Don't have an account?{' '}
                <Link href="/register" style={{ color: '#1976d2' }}>
                  Register
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
