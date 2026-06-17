export interface StatusTheme {
  bg: string;
  text: string;
  hex: string;
  bgHex: string;
}

export const statusThemes: Record<string, StatusTheme> = {
  // Blue guys
  offer_sent: {
    bg: "bg-[#E3EFFE]",
    text: "text-[#025FD6]",
    hex: "#025FD6",
    bgHex: "#E3EFFE",
  },
  verified: {
    bg: "bg-[#E3EFFE]",
    text: "text-[#025FD6]",
    hex: "#025FD6",
    bgHex: "#E3EFFE",
  },
  // Yellow guys
  pending: {
    bg: "bg-[#F9DF75]/25",
    text: "text-[#B59201]",
    hex: "#B59201",
    bgHex: "#F9DF7540",
  },
  buyback_requested: {
    bg: "bg-[#F9DF75]/25",
    text: "text-[#B59201]",
    hex: "#B59201",
    bgHex: "#F9DF7540",
  },
  // Green guys
  eligible: {
    bg: "bg-[#94F975]/25",
    text: "text-[#1A8701]",
    hex: "#1A8701",
    bgHex: "#94F97540",
  },
  completed: {
    bg: "bg-[#94F975]/25",
    text: "text-[#1A8701]",
    hex: "#1A8701",
    bgHex: "#94F97540",
  },
  approved: {
    bg: "bg-[#94F975]/25",
    text: "text-[#1A8701]",
    hex: "#1A8701",
    bgHex: "#94F97540",
  },
  accepted: {
    bg: "bg-[#94F975]/25",
    text: "text-[#1A8701]",
    hex: "#1A8701",
    bgHex: "#94F97540",
  },
  paid: {
    bg: "bg-[#94F975]/25",
    text: "text-[#1A8701]",
    hex: "#1A8701",
    bgHex: "#94F97540",
  },
  // Red guys
  declined: {
    bg: "bg-[#F6E7E6]",
    text: "text-[#A80B00]",
    hex: "#A80B00",
    bgHex: "#F6E7E6",
  },
  rejected: {
    bg: "bg-[#F6E7E6]",
    text: "text-[#A80B00]",
    hex: "#A80B00",
    bgHex: "#F6E7E6",
  },
  not_eligible: {
    bg: "bg-[#F6E7E6]",
    text: "text-[#A80B00]",
    hex: "#A80B00",
    bgHex: "#F6E7E6",
  },
  // Purple guys
  payment_processing: {
    bg: "bg-[#6633992a]",
    text: "text-[#663399]",
    hex: "#663399",
    bgHex: "#6633992a",
  },
};

export const getStatusTheme = (status: string): StatusTheme => {
  const normalized = status?.toLowerCase() || "";
  return (
    statusThemes[normalized] || {
      bg: "bg-gray-100",
      text: "text-gray-600",
      hex: "#4B5563",
      bgHex: "#F3F4F6",
    }
  );
};
