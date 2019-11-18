import React from 'react';
import AppNavbar from '../frontend/components/AppNavbar';
import AvailabilityCalendar from '../frontend/components/Availability/AvailabilityCalendar';

function IndexPage() {
  return (
    <div className="App">
      <AppNavbar />
      <AvailabilityCalendar />
    </div>
  );
}

export default IndexPage;
