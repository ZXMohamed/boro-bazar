export interface AddAddressPayloadT {
  fullName: string;
  phone: string;
  email?: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
  type: "home" | "work" | "other";
}

export interface AddressT {
  id: string;
  userId?: string;
  fullName: string;
  phone: string;
  email?: string;
  street: string;
  city: string;
  state: string;
  postalCode?: string;
  country: string;
  isDefault?: boolean;
  type: "home" | "work" | "other";
}
