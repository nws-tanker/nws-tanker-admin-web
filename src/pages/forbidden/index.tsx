import { Link } from 'react-router-dom';
import { Button } from '@/atoms';
import { AppShell } from '@/common-components/AppShell';
import { firstAllowedPath } from '@/constants/routes';
import { useAppSelector } from '@/store';
import { selectUserAccess } from '@/store/slices/authSlice';

export default function ForbiddenPage() {
  const userAccess = useAppSelector(selectUserAccess);
  const homePath = firstAllowedPath(userAccess);

  return (
    <AppShell breadcrumbs={['Home', 'Forbidden']}>
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
        <h1 className="text-4xl font-semibold">403</h1>
        <p className="text-lg">
          You don&apos;t have access to this page. Contact your administrator if
          you believe this is a mistake.
        </p>
        <Link to={homePath}>
          <Button>Go home</Button>
        </Link>
      </div>
    </AppShell>
  );
}
