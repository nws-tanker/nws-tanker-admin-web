import { useState } from 'react';
import { Button, FileUploadZone, FormField, TextInput } from '@/atoms';

type FormState = {
  name: string;
  contact: string;
  email: string;
  phone: string;
  crNumber: string;
  crFile: File | null;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const EMPTY_FORM: FormState = {
  name: '',
  contact: '',
  email: '',
  phone: '',
  crNumber: '',
  crFile: null,
};

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = 'Required';
  if (!form.contact.trim()) errors.contact = 'Required';
  if (!form.email.trim()) errors.email = 'Required';
  if (!form.phone.trim()) errors.phone = 'Required';
  if (!form.crFile) errors.crFile = 'Please upload the CR document.';
  return errors;
}

export function OnboardContractorCard() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const set = (field: keyof FormState) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleClear = () => {
    setForm(EMPTY_FORM);
    setErrors({});
  };

  const handleSubmit = () => {
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    // TODO: call register contractor API
    // setTimeout(() => {
    //   setSubmitting(false);
    //   setForm(EMPTY_FORM);
    // }, 2000);
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
          <FormField label="Contractor Name" required error={errors.name}>
            <TextInput
              placeholder="e.g. Aldar"
              value={form.name}
              onChange={(e) => set('name')(e.target.value)}
              invalid={!!errors.name}
            />
          </FormField>

          <FormField label="Contact Person" required error={errors.contact}>
            <TextInput
              placeholder="Full name"
              value={form.contact}
              onChange={(e) => set('contact')(e.target.value)}
              invalid={!!errors.contact}
            />
          </FormField>

          <FormField label="Email Address" required error={errors.email}>
            <TextInput
              type="email"
              placeholder="contact@contractor.om"
              value={form.email}
              onChange={(e) => set('email')(e.target.value)}
              invalid={!!errors.email}
            />
          </FormField>

          <FormField label="Phone Number" required error={errors.phone}>
            <TextInput
              type="tel"
              placeholder="+968 9XXX XXXX"
              value={form.phone}
              onChange={(e) => set('phone')(e.target.value)}
              invalid={!!errors.phone}
            />
          </FormField>

          <FormField label="CR Number" className="col-span-2">
            <TextInput
              placeholder="Commercial registration no."
              value={form.crNumber}
              onChange={(e) => set('crNumber')(e.target.value)}
            />
          </FormField>
        </div>

        <FormField
          label="CR Document"
          required
          error={errors.crFile}
          className="mb-4"
        >
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
