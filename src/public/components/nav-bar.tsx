import MenuIcon from '@mui/icons-material/Menu';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { useTranslate } from '@refinedev/core';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router';

const drawerWidth = 240;
const AppOrganization = import.meta.env.VITE_APP_ORGANIZATION;

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslate();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const navItems = [
    { label: t('public.nav.map'), path: '/' },
    {
      label: t('public.nav.about'),
      path: import.meta.env.VITE_APP_ORGANIZATION_SITE_URL,
      external: true,
    },
    { label: t('public.nav.admin'), path: '/admin' },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        {AppOrganization}
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            {item.external ? (
              <ListItemButton
                component="a"
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ textAlign: 'center' }}
              >
                <ListItemText primary={item.label} />
                <OpenInNewIcon sx={{ ml: 0.5, fontSize: '1rem' }} />
              </ListItemButton>
            ) : (
              <ListItemButton
                component={RouterLink}
                to={item.path}
                sx={{ textAlign: 'center' }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {AppOrganization}
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            {navItems.map((item) =>
              item.external ? (
                <Link
                  key={item.label}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  color="white"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.5,
                  }}
                >
                  {item.label}
                  <OpenInNewIcon sx={{ fontSize: '1rem' }} />
                </Link>
              ) : (
                <Link
                  key={item.label}
                  component={RouterLink}
                  to={item.path}
                  underline="hover"
                  color="white"
                >
                  {item.label}
                </Link>
              ),
            )}
          </Stack>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
};

export { NavBar };
