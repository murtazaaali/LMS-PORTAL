import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Router from './routes';
import ThemeProvider from './theme';
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
// import AdmissionForm from './pages/AdmissionForm';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
          <Router />
          {/* <AdmissionForm /> */}
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
