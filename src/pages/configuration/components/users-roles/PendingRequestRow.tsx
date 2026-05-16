import { Button, Chip } from '@/atoms';
import {
  USER_TYPE_CHIP_TONE,
  USER_TYPE_LABELS,
} from '@/constants/configuration';
import type { PendingRequest } from '@/types/configuration';
import { formatPhone } from '@/utils';
import { UserAvatar } from './UserAvatar';

function formatLocalDate(utcDate: string) {
  return new Date(utcDate).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

type Props = {
  request: PendingRequest;
  onApprove: (request: PendingRequest) => void;
  onReject: (request: PendingRequest) => void;
};

export function PendingRequestRow({ request, onApprove, onReject }: Props) {
  return (
    <tr className="bg-amber-50/60 hover:bg-amber-50">
      <td className="px-4 py-3">
        <div className="flex items-center gap-2.5">
          <UserAvatar name={request.name} />
          <span className="text-[13px] font-semibold text-ink-900">
            {request.name}
          </span>
        </div>
      </td>
      <td className="px-4 py-3">
        {request.crNumber ? (
          <Chip tone={USER_TYPE_CHIP_TONE['contractor']}>
            {USER_TYPE_LABELS['contractor']}
          </Chip>
        ) : (
          <Chip tone={USER_TYPE_CHIP_TONE['nama_employee']}>
            {USER_TYPE_LABELS['nama_employee']}
          </Chip>
        )}
      </td>
      <td className="px-4 py-3 text-[13px] text-ink-600">{request.email}</td>
      <td className="px-4 py-3 text-[13px] text-ink-600">
        {formatPhone(request.mobile)}
      </td>
      <td className="px-4 py-3 text-[12px] text-ink-500">
        {request.crNumber ?? '—'}
      </td>
      <td className="px-4 py-3 text-[12px] text-ink-500">
        {formatLocalDate(request.createdDate)}
      </td>
      <td className="px-4 py-3 text-right">
        <div className="flex justify-end gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => onApprove(request)}
          >
            Approve &amp; Assign
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onReject(request)}
            className="border border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            Reject
          </Button>
        </div>
      </td>
    </tr>
  );
}
