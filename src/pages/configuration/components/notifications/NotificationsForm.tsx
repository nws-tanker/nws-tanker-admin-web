import { useState } from 'react';
import { Button, useToast } from '@/atoms';
import { MailIcon, PhoneIcon } from '@/atoms/icons';
import { updateNotificationContactsApi } from '@/services/configurationService';
import { useAppDispatch } from '@/store';
import { fetchNotificationContacts } from '@/store/apiSlices/notificationContactsApiSlice';
import type { NotificationContactsApiResponse } from '@/types/configuration';
import { NotificationField } from './NotificationField';

type Props = {
  data: NotificationContactsApiResponse;
};

const OMAN_PHONE_RE = /^\+968\s?\d{4}\s?\d{4}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validatePhone(v: string): string | undefined {
  if (!v.trim()) return 'WhatsApp number is required';
  if (!OMAN_PHONE_RE.test(v.trim()))
    return 'Enter a valid Omani number (e.g. +968 9123 4567)';
}

function validateEmail(v: string): string | undefined {
  if (!v.trim()) return 'Sender email is required';
  if (!EMAIL_RE.test(v.trim())) return 'Enter a valid email address';
}

export function NotificationsForm({ data }: Props) {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const { editable } = data;
  const [whatsapp, setWhatsapp] = useState(data.mobileNo);
  const [email, setEmail] = useState(data.email);
  const [errors, setErrors] = useState<{ whatsapp?: string; email?: string }>(
    {},
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    const phoneError = validatePhone(whatsapp);
    const emailError = validateEmail(email);
    if (phoneError || emailError) {
      setErrors({ whatsapp: phoneError, email: emailError });
      return;
    }
    setErrors({});
    setIsSaving(true);
    try {
      const response = await updateNotificationContactsApi({
        contractorId: data.contractorId,
        email: email.trim(),
        mobileNo: whatsapp.trim(),
      });
      if (response.success) {
        toast.show('Notification settings saved');
        dispatch(fetchNotificationContacts());
      } else {
        toast.show(
          response.error?.description ?? 'Failed to save notification settings',
          { tone: 'error' },
        );
      }
    } catch {
      toast.show('Failed to save notification settings', { tone: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-card-lg border border-ink-200 bg-white shadow-card-sm">
        <div className="flex items-center justify-between border-b border-ink-200 px-6 py-3.5">
          <h3 className="text-[14px] font-semibold text-ink-900">
            Notifications &amp; Communications
          </h3>
          <p className="text-[12px] text-ink-500">
            Sender details used for all permit &amp; alert messages
          </p>
        </div>

        <div className="px-6 py-5">
          <p className="mb-4 text-[12px] leading-relaxed text-ink-500">
            These are Nama Water Service&apos;s own contact details. All
            outbound permit confirmations, renewal reminders, suspension alerts,
            and lab result notifications will be sent from these addresses.
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <NotificationField
              label="WhatsApp Sender Number"
              required
              tone="accent"
              icon={<PhoneIcon />}
              type="tel"
              value={whatsapp}
              onChange={setWhatsapp}
              error={errors.whatsapp}
              hint="Omani number registered on WhatsApp Business. Permit PDFs & renewal reminders sent here."
              disabled={!editable}
            />
            <NotificationField
              label="Sender Email Address"
              required
              tone="accent"
              icon={<MailIcon />}
              type="email"
              value={email}
              onChange={setEmail}
              error={errors.email}
              hint="All email notifications (permits, suspensions, lab alerts) will be sent from this address."
              disabled={!editable}
            />
          </div>

          <div className="mt-4 rounded-[4px] border-l-[3px] border-teal-600 bg-teal-50 px-4 py-2.5 text-[12px] leading-relaxed text-ink-700">
            <strong className="font-semibold">Note:</strong> Changes to the
            sender number or email require coordination with the WhatsApp
            Business API and SMTP provider. Save changes here first, then update
            the corresponding service credentials.
          </div>
        </div>
      </div>

      {editable && (
        <div className="flex justify-end">
          <Button variant="primary" onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Saving…' : 'Save Changes'}
          </Button>
        </div>
      )}
    </div>
  );
}
