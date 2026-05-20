import React from 'react';
import { LandingWeb } from './Landing.jsx';

// Single responsive landing page. The accent color is the Pivot brand blue.
export function App() {
  return <LandingWeb tweaks={{ accent: '#1A2BFB' }} />;
}
