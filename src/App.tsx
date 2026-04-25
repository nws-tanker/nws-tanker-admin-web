import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import FleetRegistryPage from '@/pages/fleet-registry';

export default function App() {
  return (
    <Routes>
      <Route
        path={ROUTES.root}
        element={<Navigate to={ROUTES.fleetRegistry} replace />}
      />
      <Route path={ROUTES.fleetRegistry} element={<FleetRegistryPage />} />
      <Route
        path="*"
        element={<Navigate to={ROUTES.fleetRegistry} replace />}
      />
    </Routes>
  );
}
