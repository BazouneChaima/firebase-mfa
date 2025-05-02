'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Divider,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Stack,
  Card,
  CardContent,
  CardActions,
  Grid
} from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2';
import {
  AccountCircle,
  Email,
  VpnKey,
  Dashboard as DashboardIcon
} from '@mui/icons-material';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navigation />
      
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <CircularProgress />
          </Box>
        ) : user ? (
          <Grid container spacing={3}>
            <Grid xs={12}>
              <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h4" gutterBottom>
                  Welcome to Your Dashboard
                </Typography>
                <Typography variant="body1" paragraph>
                  You are logged in as <strong>{user.email}</strong>
                </Typography>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="h6" gutterBottom>
                  Your Account Information
                </Typography>
                
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <AccountCircle />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Name" 
                      secondary={user.name || 'Not provided'} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Email />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Email" 
                      secondary={user.email} 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <VpnKey />
                    </ListItemIcon>
                    <ListItemText 
                      primary="User ID" 
                      secondary={user.id} 
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
            
            <Grid xs={12} md={4}>
              <Card>
                <CardContent>
                  <DashboardIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
                  <Typography variant="h6" component="div">
                    Dashboard
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    View your personalized dashboard with all your information.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    color="primary"
                    component={Link}
                    href="/dashboard"
                  >
                    Go to Dashboard
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            
            <Grid xs={12} md={4}>
              <Card>
                <CardContent>
                  <AccountCircle color="primary" sx={{ fontSize: 40, mb: 2 }} />
                  <Typography variant="h6" component="div">
                    Profile
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Update your profile information and account settings.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    color="primary"
                    component={Link}
                    href="/profile"
                  >
                    View Profile
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            
            <Grid xs={12} md={4}>
              <Card>
                <CardContent>
                  <VpnKey color="primary" sx={{ fontSize: 40, mb: 2 }} />
                  <Typography variant="h6" component="div">
                    Settings
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Manage your account settings and security preferences.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    color="primary"
                    component={Link}
                    href="/settings"
                  >
                    Go to Settings
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        ) : (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            minHeight: '70vh'
          }}>
            <Typography variant="h3" component="h1" gutterBottom>
              Welcome to My App
            </Typography>
            <Typography variant="h6" color="textSecondary" paragraph align="center" sx={{ maxWidth: 600, mb: 4 }}>
              A secure authentication system with PostgreSQL integration.
              Sign in to access your personalized dashboard.
            </Typography>
            
            <Stack direction="row" spacing={2}>
              <Button 
                variant="contained" 
                size="large"
                component={Link}
                href="/login"
              >
                Login
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                component={Link}
                href="/register"
              >
                Register
              </Button>
            </Stack>
          </Box>
        )}
      </Container>
    </Box>
  );
}
