import NotFoundPage from 'containers/404Page';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import publicRoutes from './PublicRoutes';

const AppRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/404' element={<NotFoundPage />} />
          {publicRoutes()}
        </Routes>
      </Router>
    </>
  );
};

export default React.memo(AppRoutes);
