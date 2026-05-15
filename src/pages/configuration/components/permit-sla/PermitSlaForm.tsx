import { useState } from 'react';
import { Button, useToast } from '@/atoms';
import { updatePermitSlaApi } from '@/services/configurationService';
import { useAppDispatch } from '@/store';
import { fetchPermitSla } from '@/store/apiSlices/permitSlaApiSlice';
import type { PermitSlaApiResponse } from '@/types/configuration';
import { SlaRuleField } from './SlaRuleField';

type Props = {
  data: PermitSlaApiResponse;
};

export function PermitSlaForm({ data }: Props) {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const [permitValidity, setPermitValidity] = useState(
    data.permitValidityMonths,
  );
  const [labSla, setLabSla] = useState(data.labSlaDays);
  const [renewalReminder, setRenewalReminder] = useState(
    data.renewalReminderDays,
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await updatePermitSlaApi({
        permitValidityMonths: permitValidity,
        labSlaDays: labSla,
        renewalReminderDays: renewalReminder,
      });
      if (response.success) {
        toast.show('Permit & SLA rules saved');
        dispatch(fetchPermitSla());
      } else {
        toast.show(
          response.error?.description ?? 'Failed to save permit & SLA rules',
          { tone: 'error' },
        );
      }
    } catch {
      toast.show('Failed to save permit & SLA rules', { tone: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-card-lg border border-ink-200 bg-white shadow-card-sm">
        <div className="flex items-center justify-between border-b border-ink-200 px-6 py-3.5">
          <h3 className="text-[14px] font-semibold text-ink-900">
            Permit &amp; SLA Rules
          </h3>
          <p className="text-[12px] text-ink-500">
            System-wide validity &amp; service levels
          </p>
        </div>

        <div className="px-6 py-5">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <SlaRuleField
              label="Permit Validity"
              unit="months"
              value={permitValidity}
              onChange={setPermitValidity}
              hint="Validity period from permit issue date."
            />
            <SlaRuleField
              label="Lab SLA"
              unit="days"
              value={labSla}
              onChange={setLabSla}
              hint="Max time from sample receipt to result."
            />
            <SlaRuleField
              label="Renewal Reminder"
              unit="days"
              value={renewalReminder}
              onChange={setRenewalReminder}
              hint="Days before expiry when owners are notified."
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="primary" onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Saving…' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
}
