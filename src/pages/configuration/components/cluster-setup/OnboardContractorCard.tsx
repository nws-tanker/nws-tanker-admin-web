import { useState } from 'react';
import {
  Button,
  FileUploadZone,
  FormField,
  TextInput,
  useToast,
} from '@/atoms';
import { onboardContractorApi } from '@/services/configurationService';

type Props = {
  onSuccess?: () => void;
};

type FormState = {
  clusterName: string;
  name: string;
  crNumber: string;
  crFile: File | null;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const EMPTY_FORM: FormState = {
  clusterName: '',
  name: '',
  crNumber: '',
  crFile: null,
};

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.clusterName.trim()) errors.clusterName = 'Required';
  if (!form.name.trim()) errors.name = 'Required';
  return errors;
}

export function OnboardContractorCard({ onSuccess }: Props) {
  const toast = useToast();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const handleClear = () => {
    setForm(EMPTY_FORM);
    setErrors({});
  };

  const handleSubmit = async () => {
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const response = await onboardContractorApi({
        clusterName: form.clusterName.trim(),
        contractorName: form.name.trim(),
        crNumber: form.crNumber.trim(),
        crDocument: form.crFile,
      });
      if (response.success) {
        toast.show('Contractor onboarded');
        setForm(EMPTY_FORM);
        onSuccess?.();
      } else {
        toast.show(
          response.error?.description ?? 'Failed to onboard contractor',
          { tone: 'error' },
        );
      }
    } catch {
      toast.show('Failed to onboard contractor', { tone: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-card-lg border border-ink-200 bg-white shadow-card-sm">
      <div className="border-b border-ink-200 px-5 py-3.5">
        <h3 className="text-[14px] font-semibold text-ink-900">
          Onboard New Contractor
        </h3>
        <p className="mt-0.5 text-[12px] text-ink-500">
          Register a contractor company to the permit system
        </p>
      </div>

      <div className="p-5">
        <div className="mb-4 grid grid-cols-2 gap-3">
          <FormField label="Cluster Name" required error={errors.clusterName}>
            <TextInput
              placeholder="e.g. Cluster 5"
              value={form.clusterName}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, clusterName: e.target.value }))
              }
              invalid={!!errors.clusterName}
            />
          </FormField>

          <FormField label="Contractor Name" required error={errors.name}>
            <TextInput
              placeholder="e.g. Aldar"
              value={form.name}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, name: e.target.value }))
              }
              invalid={!!errors.name}
            />
          </FormField>

          <FormField label="CR Number" className="col-span-2">
            <TextInput
              placeholder="Commercial registration no."
              value={form.crNumber}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, crNumber: e.target.value }))
              }
            />
          </FormField>
        </div>

        <FormField label="CR Document" error={errors.crFile} className="mb-4">
          <FileUploadZone
            file={form.crFile}
            onFile={(file) => setForm((prev) => ({ ...prev, crFile: file }))}
            error={errors.crFile}
          />
        </FormField>

        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={handleClear}>
            Clear
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? 'Registering…' : 'Register Contractor'}
          </Button>
        </div>
      </div>
    </div>
  );
}
