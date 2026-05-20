'use client';

import ServiceForm from './ServiceForm';

export default function ServiceRenewalForm({ isOpen, onClose, productData }) {
  return (
    <ServiceForm
      isOpen={isOpen}
      onClose={onClose}
      productData={productData}
      endpoint="/api/serviceRenewal"
      includeInstrumentFields
      eyebrow="Service Renewal"
      title="Service Renewal Request"
      submitLabel="Submit Renewal Request"
      successLabel="Renewal Request Sent!"
      dialogLabel="Service Renewal Request"
    />
  );
}
