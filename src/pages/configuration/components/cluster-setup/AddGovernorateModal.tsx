import { useMemo, useState } from 'react';
import {
  Button,
  FormField,
  Modal,
  Select,
  TextInput,
  useToast,
  type SelectOption,
} from '@/atoms';
import { createGovernorateApi } from '@/services/configurationService';
import type { ClusterSetupCluster } from '@/types/configuration';

type Props = {
  open: boolean;
  onClose: () => void;
  clusters: ClusterSetupCluster[];
  onSuccess: () => void;
};

type FormState = { name: string; code: string; clusterId: string };
type FormErrors = Partial<Record<keyof FormState, string>>;

const EMPTY_FORM: FormState = { name: '', code: '', clusterId: '' };

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = 'Required';
  if (!form.code.trim()) errors.code = 'Required';
  if (!form.clusterId) errors.clusterId = 'Required';
  return errors;
}

export function AddGovernorateModal({
  open,
  onClose,
  clusters,
  onSuccess,
}: Props) {
  const toast = useToast();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const clusterOptions = useMemo<SelectOption[]>(
    () => clusters.map((c) => ({ value: String(c.clusterId), label: c.name })),
    [clusters],
  );

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleClose = () => {
    if (submitting) return;
    setForm(EMPTY_FORM);
    setErrors({});
    onClose();
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
      const response = await createGovernorateApi({
        name: form.name.trim(),
        code: form.code.trim(),
        clusterId: Number(form.clusterId),
      });
      if (response.success) {
        toast.show('Governorate added');
        setForm(EMPTY_FORM);
        onSuccess();
        onClose();
      } else {
        toast.show(response.error?.description ?? 'Failed to add governorate', {
          tone: 'error',
        });
      }
    } catch {
      toast.show('Failed to add governorate', { tone: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Add Governorate"
      subtitle="Register a new governorate under a cluster"
      width={520}
      footer={
        <>
          <Button
            variant="secondary"
            onClick={handleClose}
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? 'Saving…' : 'Add Governorate'}
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <FormField label="Name" required error={errors.name}>
          <TextInput
            placeholder="e.g. Muscat"
            value={form.name}
            onChange={(e) => setField('name', e.target.value)}
            invalid={!!errors.name}
          />
        </FormField>

        <FormField label="Code" required error={errors.code}>
          <TextInput
            placeholder="e.g. MCT"
            value={form.code}
            onChange={(e) => setField('code', e.target.value)}
            invalid={!!errors.code}
          />
        </FormField>

        <FormField label="Cluster" required error={errors.clusterId}>
          <Select
            options={clusterOptions}
            value={form.clusterId}
            onChange={(next) => setField('clusterId', next)}
            placeholder="Select a cluster"
            invalid={!!errors.clusterId}
          />
        </FormField>
      </div>
    </Modal>
  );
}
