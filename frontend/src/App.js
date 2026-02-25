import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ListPage from './pages/ListPage';
import DetailsPage from './pages/DetailsPage';
import PhotoResultPage from './pages/PhotoResultPage';
import GraphPage from './pages/GraphPage';
import MapPage from './pages/MapPage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { Toaster } from 'react-hot-toast';
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/list" element={
                <ProtectedRoute>
                  <ListPage />
                </ProtectedRoute>
              } />
              <Route path="/details/:id" element={
                <ProtectedRoute>
                  <DetailsPage />
                </ProtectedRoute>
              } />
              <Route path="/photo-result" element={
                <ProtectedRoute>
                  <PhotoResultPage />
                </ProtectedRoute>
              } />
              <Route path="/graph" element={
                <ProtectedRoute>
                  <GraphPage />
                </ProtectedRoute>
              } />
              <Route path="/map" element={
                <ProtectedRoute>
                  <MapPage />
                </ProtectedRoute>
              } />
            </Routes>
            <Toaster position="top-right" />
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;