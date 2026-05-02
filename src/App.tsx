import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import FleetRegistryPage from '@/pages/fleet-registry';
import PlaceholderPage from '@/pages/placeholder';
import TankerUploadPage from '@/pages/tanker-upload';
export default function App() {
  return (
    <Routes>
      <Route
        path={ROUTES.root}
        element={<Navigate to={ROUTES.fleetRegistry} replace />}
      />
      <Route path={ROUTES.fleetRegistry} element={<FleetRegistryPage />} />
      <Route path={ROUTES.tankerUpload} element={<TankerUploadPage />} />
      <Route
        path={ROUTES.dashboard}
        element={<PlaceholderPage title="Executive Dashboard" />}
      />
      <Route
        path={ROUTES.operations}
        element={<PlaceholderPage title="Operations" />}
      />
      <Route
        path={ROUTES.fleetCompliance}
        element={<PlaceholderPage title="Fleet Compliance" />}
      />
      <Route
        path={ROUTES.inspectionReview}
        element={<PlaceholderPage title="Inspection Review" />}
      />
      <Route
        path={ROUTES.permitRenewal}
        element={<PlaceholderPage title="Permit Renewal" />}
      />
      <Route
        path={ROUTES.reports}
        element={<PlaceholderPage title="Reports" />}
      />
      <Route
        path={ROUTES.configuration}
        element={<PlaceholderPage title="Configuration" />}
      />
      <Route
        path="*"
        element={<Navigate to={ROUTES.fleetRegistry} replace />}
      />
    </Routes>
  );
}
