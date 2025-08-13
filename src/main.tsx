import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ConvexProviderWithAuth, ConvexReactClient } from 'convex/react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { useConvexAuth } from './convexAuth';
import './index.css';

const theme = createTheme({
  palette: {
    primary: { main: '#22c55e' },
  },
});
const convexClient = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL!);

createRoot(document.getElementById('root')!).render(
  <ConvexProviderWithAuth client={convexClient} useAuth={useConvexAuth}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </ConvexProviderWithAuth>
);
