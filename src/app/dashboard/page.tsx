'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Divider
} from '@mui/material';
import {
  Person,
  Settings,
  ExitToApp,
  Dashboard as DashboardIcon,
  Assignment,
  Security
} from '@mui/icons-material';

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
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
          Dashboard
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph>
          Welcome to your personal dashboard. Here you can manage your account and access all features.
        </Typography>
        
        <Divider sx={{ mb: 4 }} />
        
        <Grid container spacing={3}>
          {/* Dashboard Card 1 */}
          <Grid xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Person color="primary" sx={{ fontSize: 40, mb: 2 }} />
                <Typography variant="h6" component="div" gutterBottom>
                  Profile
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  View and edit your personal information, update your profile details and manage your account settings.
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  color="primary"
                  component={Link}
                  href="/profile"
                >
                  Manage Profile
                </Button>
              </CardActions>
            </Card>
          </Grid>

          {/* Dashboard Card 2 */}
          <Grid xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Settings color="primary" sx={{ fontSize: 40, mb: 2 }} />
                <Typography variant="h6" component="div" gutterBottom>
                  Settings
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Configure your account settings, change your password, and manage your notification preferences.
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  color="primary"
                  component={Link}
                  href="/settings"
                >
                  Manage Settings
                </Button>
              </CardActions>
            </Card>
          </Grid>

          {/* Dashboard Card 3 */}
          <Grid xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Security color="primary" sx={{ fontSize: 40, mb: 2 }} />
                <Typography variant="h6" component="div" gutterBottom>
                  Security
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage your account security, change your password, and review your recent login activity.
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  color="primary"
                  onClick={handleLogout}
                >
                  Sign Out
                </Button>
              </CardActions>
            </Card>
          </Grid>
          
          {/* Activity Summary */}
          <Grid xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Account Summary
              </Typography>
              <Typography variant="body2" paragraph>
                You are logged in as <strong>{user.email}</strong>
                {user.name && <> ({user.name})</>}
              </Typography>
              <Typography variant="body2">
                User ID: {user.id}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
