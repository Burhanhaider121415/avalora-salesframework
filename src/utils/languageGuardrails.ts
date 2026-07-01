export const FORBIDDEN_WORDS = [
  'AI receptionist',
  'receptionist replacement',
  'guaranteed ROI',
  'guaranteed bookings',
  'HIPAA-proof',
  'your receptionist is failing',
  'your ads are failing',
  'you are losing money',
  'bot',
  'chatbot'
];

export const PARTNER_FORBIDDEN_WORDS = [
  'commission' // Only forbidden in owner-facing, but we'll flag it generally for notes and warn the rep to be careful
];

export const checkGuardrails = (text: string, isPartnerMode = false): string[] => {
  const violations: string[] = [];
  const lowerText = text.toLowerCase();
  
  FORBIDDEN_WORDS.forEach(word => {
    if (lowerText.includes(word.toLowerCase())) {
      violations.push(word);
    }
  });

  if (!isPartnerMode) {
    PARTNER_FORBIDDEN_WORDS.forEach(word => {
      if (lowerText.includes(word.toLowerCase())) {
        violations.push(`'${word}' (Avoid in owner-facing contexts)`);
      }
    });
  }

  return violations;
};
