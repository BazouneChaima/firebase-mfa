'use client';

import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Container,
  CircularProgress,
  Tabs,
  Tab
} from '@mui/material';
import { AccountCircle, ExitToApp } from '@mui/icons-material';

export default function Navigation() {
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>
              My App
            </Link>
          </Typography>

          {loading ? (
            <CircularProgress color="inherit" size={24} />
          ) : user ? (
            <>
              {/* Navigation links for authenticated users */}
              <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }}>
                <Tabs 
                  value={pathname} 
                  textColor="inherit"
                  indicatorColor="secondary"
                >
                  <Tab 
                    label="Home" 
                    value="/" 
                    component={Link} 
                    href="/"
                  />
                  <Tab 
                    label="Dashboard" 
                    value="/dashboard" 
                    component={Link} 
                    href="/dashboard"
                  />
                  <Tab 
                    label="Profile" 
                    value="/profile" 
                    component={Link} 
                    href="/profile"
                  />
                  <Tab 
                    label="Settings" 
                    value="/settings" 
                    component={Link} 
                    href="/settings"
                  />
                </Tabs>
              </Box>
              
              {/* User info and logout */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ mr: 2 }}>
                  {user.name || user.email}
                </Typography>
                <Button 
                  color="inherit" 
                  onClick={handleLogout}
                  startIcon={<ExitToApp />}
                >
                  Logout
                </Button>
              </Box>
            </>
          ) : (
            <Box sx={{ display: 'flex' }}>
              <Button 
                color="inherit" 
                component={Link} 
                href="/login"
                sx={{ mr: 1 }}
              >
                Login
              </Button>
              <Button 
                variant="contained" 
                color="secondary" 
                component={Link} 
                href="/register"
                startIcon={<AccountCircle />}
              >
                Register
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
