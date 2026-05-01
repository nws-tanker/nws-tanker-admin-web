import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import ProtectedRoute from '@/common-components/ProtectedRoute';
import { useAuthBootstrap } from '@/hooks/useAuthBootstrap';
import FleetRegistryPage from '@/pages/fleet-registry';
// import ConfigurationPage from './pages/configuration';
import TankerUploadPage from '@/pages/tanker-upload';
import AuthenticationPage from '@/pages/authentication';
import ForbiddenPage from '@/pages/forbidden';

export default function App() {
  useAuthBootstrap();

  return (
    <Routes>
      <Route
        path={ROUTES.root}
        element={<Navigate to={ROUTES.fleetRegistry} replace />}
      />
      <Route path={ROUTES.authentication} element={<AuthenticationPage />} />
      <Route path={ROUTES.forbidden} element={<ForbiddenPage />} />
      <Route
        path={ROUTES.fleetRegistry}
        element={
          <ProtectedRoute route="fleetRegistry">
            <FleetRegistryPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.tankerUpload}
        element={
          <ProtectedRoute route="tankerUpload">
            <TankerUploadPage />
          </ProtectedRoute>
        }
      />
      {/*<Route path={ROUTES.configuration} element={<ConfigurationPage />} />*/}
      <Route
        path="*"
        element={<Navigate to={ROUTES.fleetRegistry} replace />}
      />
    </Routes>
  );
}
