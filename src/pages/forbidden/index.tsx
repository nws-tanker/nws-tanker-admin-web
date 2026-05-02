import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { Button } from '@/atoms';

export default function ForbiddenPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-4xl font-semibold">403</h1>
      <p className="text-lg">
        You don&apos;t have access to this page. Contact your administrator if
        you believe this is a mistake.
      </p>
      <Link to={ROUTES.root}>
        <Button>Go home</Button>
      </Link>
    </div>
  );
}
