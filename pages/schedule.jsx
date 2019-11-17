import React from 'react';
import AppNavbar from '../frontend/components/AppNavbar';
import AdminCalendar from '../frontend/components/calendar/AdminCalendar';

function IndexPage() {
  return (
    <div className="App">
      <AppNavbar />
      <AdminCalendar />
    </div>
  );
}

export default IndexPage;
