import React from 'react';
import AppNavbar from '../frontend/components/AppNavbar';
import Calendar from '../frontend/components/calendar/Calendar';

function IndexPage() {
  return (
    <div className="App">
      <AppNavbar />
      <Calendar />
    </div>
  );
}

export default IndexPage;
