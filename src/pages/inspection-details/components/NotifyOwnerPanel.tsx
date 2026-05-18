import { useState } from 'react';
import { Button, Toggle, useToast } from '@/atoms';
import { sendNotificationApi } from '@/services/inspectionService';
import type { InspectionDetailsApiResponse } from '@/types/inspection';
import { formatPhone } from '@/utils';
import { useNotificationContacts } from '../hooks/useNotificationContacts';

type Props = { data: InspectionDetailsApiResponse };

export function NotifyOwnerPanel({ data }: Props) {
  const toast = useToast();
  const [sendWhatsapp, setSendWhatsapp] = useState(true);
  const [sendEmail, setSendEmail] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { mobileNo: senderMobile, email: senderEmail } =
    useNotificationContacts();

  const phone = data.tanker.owner.phone;
  const email = data.tanker.owner.email;
  const hasChannel = sendWhatsapp || sendEmail;
  const hasContact = Boolean(phone) || Boolean(email);
  const permitGenerated = data.permit.permit_number !== null;

  const handleSend = async () => {
    if (!hasChannel || !hasContact) return;
    setSubmitting(true);
    try {
      const res = await sendNotificationApi({
        email: email ?? '',
        mobileNo: (phone ?? '').replace(/\+/g, '').trim(),
        sendEmail,
        sendWhatsapp,
        inspectionId: Number(data.id),
      });
      if (res.success) {
        toast.show('Notification sent to owner');
      } else {
        toast.show(res.error?.description ?? 'Failed to send notification', {
          tone: 'error',
        });
      }
    } catch {
      toast.show('Failed to send notification', { tone: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-card border border-ink-200 shadow-card-sm overflow-hidden bg-white">
      <div className="bg-ink-50 border-b border-ink-100 px-4 py-2.5">
        <span className="text-[11px] font-bold tracking-widest uppercase text-ink-500">
          NOTIFY OWNER
        </span>
      </div>
      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-ink-700">Send via WhatsApp</span>
          <Toggle
            checked={sendWhatsapp}
            onChange={setSendWhatsapp}
            disabled={submitting}
            aria-label="Send via WhatsApp"
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-ink-700">Send via Email</span>
          <Toggle
            checked={sendEmail}
            onChange={setSendEmail}
            disabled={submitting}
            aria-label="Send via Email"
          />
        </div>
        <div className="border-t border-ink-100 pt-2.5 flex flex-col gap-2">
          <div>
            <p className="text-[11px] text-ink-400">Phone Number</p>
            <p className="text-[13px] font-semibold text-ink-800">
              {data.tanker.owner.phone
                ? formatPhone(data.tanker.owner.phone)
                : '—'}
            </p>
          </div>
          <div>
            <p className="text-[11px] text-ink-400">Email Address</p>
            <p className="text-[13px] font-semibold text-ink-800">
              {email || '—'}
            </p>
          </div>
        </div>
        <div className="bg-ink-50 rounded-card p-2.5 text-[11px] text-ink-500">
          Sent from{' '}
          <span className="font-mono text-ink-700">{senderMobile ?? '—'}</span>{' '}
          (WhatsApp) &amp;{' '}
          <span className="font-mono text-ink-700">{senderEmail ?? '—'}</span>
        </div>
        {!permitGenerated && (
          <div className="rounded-card border border-amber-100 bg-amber-50 px-3 py-2 text-[11px] leading-snug text-amber-800">
            Permit hasn’t been generated for this inspection yet. The owner can
            be notified once the permit is issued.
          </div>
        )}
        {!hasContact && (
          <div className="rounded-card border border-amber-100 bg-amber-50 px-3 py-2 text-[11px] leading-snug text-amber-800">
            Neither a phone number nor an email address is available for this
            owner, so notifications cannot be sent.
          </div>
        )}
        <Button
          variant="primary"
          size="lg"
          className="w-full justify-center"
          onClick={handleSend}
          disabled={
            submitting || !hasChannel || !permitGenerated || !hasContact
          }
        >
          {submitting ? 'Sending…' : 'Send Now'}
        </Button>
      </div>
    </div>
  );
}
