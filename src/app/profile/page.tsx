'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Divider,
  Avatar,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import {
  Person,
  Email,
  Save,
  Cancel
} from '@mui/icons-material';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    } else if (user) {
      setName(user.name || '');
    }
  }, [user, loading, router]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ text: '', type: '' });

    try {
      // This would be a real API call to update the user's profile
      // For now, we'll just simulate a successful update
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage({ text: 'Profile updated successfully!', type: 'success' });
      setIsEditing(false);
    } catch (error) {
      setMessage({ text: 'Failed to update profile', type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  // Generate initials for avatar
  const getInitials = () => {
    if (user.name) {
      return user.name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    return user.email.substring(0, 2).toUpperCase();
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navigation />
      
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Your Profile
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph>
          View and edit your profile information.
        </Typography>
        
        <Divider sx={{ mb: 4 }} />
        
        {message.text && (
          <Alert 
            severity={message.type as 'success' | 'error'} 
            sx={{ mb: 3 }}
            onClose={() => setMessage({ text: '', type: '' })}
          >
            {message.text}
          </Alert>
        )}
        
        <Grid container spacing={3}>
          <Grid xs={12} md={4}>
            <Card>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
                <Avatar 
                  sx={{ 
                    width: 100, 
                    height: 100, 
                    mb: 2,
                    bgcolor: 'primary.main',
                    fontSize: '2rem'
                  }}
                >
                  {getInitials()}
                </Avatar>
                <Typography variant="h6" gutterBottom>
                  {user.name || 'No name provided'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  User ID: {user.id}
                </Typography>
                
                {!isEditing && (
                  <Button 
                    variant="contained" 
                    startIcon={<Person />}
                    onClick={() => setIsEditing(true)}
                    sx={{ mt: 3 }}
                  >
                    Edit Profile
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
          
          <Grid xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              {isEditing ? (
                <Box component="form" onSubmit={handleSaveProfile}>
                  <Typography variant="h6" gutterBottom>
                    Edit Profile Information
                  </Typography>
                  
                  <TextField
                    label="Name"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    InputProps={{
                      startAdornment: <Person color="action" sx={{ mr: 1 }} />
                    }}
                  />
                  
                  <TextField
                    label="Email"
                    fullWidth
                    margin="normal"
                    value={user.email}
                    disabled
                    InputProps={{
                      startAdornment: <Email color="action" sx={{ mr: 1 }} />
                    }}
                    helperText="Email cannot be changed"
                  />
                  
                  <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={isSaving}
                      startIcon={isSaving ? <CircularProgress size={20} /> : <Save />}
                    >
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setIsEditing(false);
                        setName(user.name || '');
                      }}
                      startIcon={<Cancel />}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Profile Information
                  </Typography>
                  
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid xs={4}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Name
                      </Typography>
                    </Grid>
                    <Grid xs={8}>
                      <Typography variant="body1">
                        {user.name || 'Not provided'}
                      </Typography>
                    </Grid>
                    
                    <Grid xs={4}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Email
                      </Typography>
                    </Grid>
                    <Grid xs={8}>
                      <Typography variant="body1">
                        {user.email}
                      </Typography>
                    </Grid>
                    
                    <Grid xs={4}>
                      <Typography variant="subtitle2" color="text.secondary">
                        User ID
                      </Typography>
                    </Grid>
                    <Grid xs={8}>
                      <Typography variant="body1">
                        {user.id}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
