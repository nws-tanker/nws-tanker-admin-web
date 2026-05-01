import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import FleetRegistryPage from '@/pages/fleet-registry';
// import ConfigurationPage from './pages/configuration';
import TankerUploadPage from '@/pages/tanker-upload';
import AuthenticationPage from '@/pages/authentication';
export default function App() {
  return (
    <Routes>
      <Route
        path={ROUTES.root}
        element={<Navigate to={ROUTES.fleetRegistry} replace />}
      />
      <Route path={ROUTES.fleetRegistry} element={<FleetRegistryPage />} />
      <Route path={ROUTES.tankerUpload} element={<TankerUploadPage />} />
      {/*<Route path={ROUTES.configuration} element={<ConfigurationPage />} />*/}
      <Route path={ROUTES.authentication} element={<AuthenticationPage />} />
      <Route
        path="*"
        element={<Navigate to={ROUTES.fleetRegistry} replace />}
      />
    </Routes>
  );
}
