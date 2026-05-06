import { Modal, Button } from '@/atoms';

type Props = {
  open: boolean;
  onClose: () => void;
};

export function TermsAndConditionsModal({ open, onClose }: Props) {
  return (
    <Modal
      open={open}
      title="Terms and Conditions"
      subtitle="Nama Water Services · Tanker Permit & Compliance Portal"
      width={640}
      onClose={onClose}
      footer={
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      }
    >
      <div className="space-y-5 text-[13px] text-gray-700 leading-relaxed">
        <section>
          <h2 className="font-semibold text-gray-900 mb-1">
            1. Registration &amp; Eligibility
          </h2>
          <p>
            Registration is open to licensed water tanker operators holding a
            valid Commercial Registration (CR) issued by the Sultanate of Oman.
            By submitting a registration, you confirm that the information
            provided is accurate and complete.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-gray-900 mb-1">
            2. Permit Obligations
          </h2>
          <p>
            All tankers operating under Nama Water Services jurisdiction must
            maintain a valid annual permit. Operating without a valid permit is
            a violation of Omani water regulations and may result in suspension
            or legal action.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-gray-900 mb-1">
            3. Inspection Compliance
          </h2>
          <p>
            Registered operators must present tankers for inspection when
            scheduled. Failure to comply within the SLA period may result in
            permit suspension. Drinking Water tankers are subject to mandatory
            laboratory testing per Oman Drinking Water Standards (MD 154/2001).
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-gray-900 mb-1">4. Data Accuracy</h2>
          <p>
            Operators are responsible for keeping contact details, fleet
            information, and documentation up to date in the portal. Nama Water
            Services reserves the right to suspend access for operators
            providing false or outdated information.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-gray-900 mb-1">
            5. Violations &amp; Suspension
          </h2>
          <p>
            Violations logged in the system (including failed inspections, lab
            failures, and permit expiry) are retained on record. Three or more
            violations within a 12-month period may result in permit revocation
            and referral to the Ministry of Regional Municipalities and Water
            Resources (MRMWR).
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-gray-900 mb-1">6. Data Privacy</h2>
          <p>
            Personal and company data submitted through this portal is processed
            in accordance with Oman&apos;s Personal Data Protection Law (Royal
            Decree 6/2022) and used solely for permit management and regulatory
            compliance purposes.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-gray-900 mb-1">7. Governing Law</h2>
          <p>
            These terms are governed by the laws of the Sultanate of Oman. Any
            disputes arising from use of this portal shall be subject to the
            jurisdiction of Omani courts.
          </p>
        </section>
      </div>
    </Modal>
  );
}
