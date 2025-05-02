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
  Card,
  CardContent,
  CardActions,
  Grid,
  IconButton
} from '@mui/material';
import {
  Lock,
  Save,
  Cancel,
  Visibility,
  VisibilityOff,
  DeleteForever,
  Warning
} from '@mui/icons-material';

export default function SettingsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ text: '', type: '' });

    // Validate passwords
    if (newPassword !== confirmPassword) {
      setMessage({ text: 'New passwords do not match', type: 'error' });
      setIsSaving(false);
      return;
    }

    if (newPassword.length < 6) {
      setMessage({ text: 'New password must be at least 6 characters', type: 'error' });
      setIsSaving(false);
      return;
    }

    try {
      // This would be a real API call to change the password
      // For now, we'll just simulate a successful update
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage({ text: 'Password changed successfully!', type: 'success' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setMessage({ text: 'Failed to change password', type: 'error' });
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

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navigation />
      
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Account Settings
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph>
          Manage your account settings and security preferences.
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
          {/* Password Change Section */}
          <Grid xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Change Password
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Update your password to keep your account secure.
              </Typography>
              
              <Box component="form" onSubmit={handleChangePassword}>
                <TextField
                  label="Current Password"
                  fullWidth
                  margin="normal"
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: <Lock color="action" sx={{ mr: 1 }} />,
                    endAdornment: (
                      <IconButton
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        edge="end"
                      >
                        {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    )
                  }}
                />
                
                <TextField
                  label="New Password"
                  fullWidth
                  margin="normal"
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: <Lock color="action" sx={{ mr: 1 }} />,
                    endAdornment: (
                      <IconButton
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        edge="end"
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    )
                  }}
                />
                
                <TextField
                  label="Confirm New Password"
                  fullWidth
                  margin="normal"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: <Lock color="action" sx={{ mr: 1 }} />,
                    endAdornment: (
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    )
                  }}
                />
                
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSaving}
                  startIcon={isSaving ? <CircularProgress size={20} /> : <Save />}
                  sx={{ mt: 3 }}
                >
                  {isSaving ? 'Changing Password...' : 'Change Password'}
                </Button>
              </Box>
            </Paper>
          </Grid>
          
          {/* Account Information */}
          <Grid xs={12} md={6}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Account Information
              </Typography>
              
              <Grid container spacing={2} sx={{ mt: 1 }}>
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
                    Account Created
                  </Typography>
                </Grid>
                <Grid xs={8}>
                  <Typography variant="body1">
                    {/* This would be a real date from the user object */}
                    {new Date().toLocaleDateString()}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
            
            {/* Danger Zone */}
            <Card sx={{ bgcolor: '#fdeded', mb: 3 }}>
              <CardContent>
                <Typography variant="h6" color="error" gutterBottom>
                  Danger Zone
                </Typography>
                <Typography variant="body2" paragraph>
                  This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                </Typography>
              </CardContent>
              <CardActions sx={{ px: 2, pb: 2 }}>
                <Button 
                  variant="outlined" 
                  color="error"
                  startIcon={<DeleteForever />}
                  onClick={() => setDeleteConfirmOpen(true)}
                >
                  Delete Account
                </Button>
              </CardActions>
            </Card>
            
            {/* Delete Confirmation */}
            {deleteConfirmOpen && (
              <Card sx={{ bgcolor: '#fdeded' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Warning color="error" sx={{ mr: 1 }} />
                    <Typography variant="h6" color="error">
                      Confirm Account Deletion
                    </Typography>
                  </Box>
                  <Typography variant="body2" paragraph>
                    Are you sure you want to delete your account? This action cannot be undone.
                  </Typography>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2 }}>
                  <Button 
                    variant="contained" 
                    color="error"
                    onClick={() => {
                      // This would be a real API call to delete the account
                      alert('Account deletion would happen here in a real app');
                      setDeleteConfirmOpen(false);
                    }}
                  >
                    Yes, Delete My Account
                  </Button>
                  <Button 
                    variant="outlined"
                    onClick={() => setDeleteConfirmOpen(false)}
                  >
                    Cancel
                  </Button>
                </CardActions>
              </Card>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
