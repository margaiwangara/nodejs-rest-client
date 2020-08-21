import React from 'react';
import TitleComponent from '@/container/DefaultLayout/TitleComponent';

function Home() {
  return (
    <div className="card">
      <TitleComponent title="Dashboard" />
      <div className="card-body">
        <h3>Dashboard</h3>
      </div>
    </div>
  );
}

export default Home;
