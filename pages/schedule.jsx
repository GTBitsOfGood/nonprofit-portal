import React from 'react';
import AppNavbar from '../frontend/components/AppNavbar';
import Calendar from '../frontend/components/calendar/calendar';

function IndexPage() {
  return (
    <div className="App">
      <AppNavbar />
      <Calendar width="302px" />
    </div>
  );
}

export default IndexPage;
