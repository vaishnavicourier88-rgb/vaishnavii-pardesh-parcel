export interface TrackingCheckpoint {
  id: string;
  status: string;
  location: string;
  timestamp: string;
  description: string;
  completed: boolean;
  current?: boolean;
}

export interface ShipmentData {
  trackingNumber: string;
  senderName: string;
  senderPhone?: string;
  senderCity: string;
  senderCountry: string;
  senderAddress?: string;
  receiverName: string;
  receiverPhone?: string;
  receiverCity: string;
  receiverCountry: string;
  receiverAddress?: string;
  receiverPostalCode?: string;
  status: 'Booked' | 'In Transit' | 'Customs Clearance' | 'Out for Delivery' | 'Delivered' | 'On Hold';
  statusColor: string;
  serviceType: string;
  weightKg: number;
  chargeableWeightKg?: number;
  lengthCm?: number;
  widthCm?: number;
  heightCm?: number;
  pieces: number;
  declaredValueInr?: number;
  expectedDelivery: string;
  bookingDate: string;
  lastUpdated: string;
  partnerNetwork: 'FedEx' | 'DHL' | 'Aramex' | 'Vaishnavii Direct Express' | 'UPS';
  originAirport: string;
  destinationAirport: string;
  checkpoints: TrackingCheckpoint[];
  packageType: string;
  bookedBy?: string;
  agentName?: string;
  billingAmountInr?: number;
  agentCommissionInr?: number;
  paymentStatus?: 'Paid' | 'Pending' | 'Credit';
  contentDescription?: string;
}

export type UserRole = 'ADMIN' | 'SUB_ADMIN' | 'AGENT';

export interface StaffUser {
  id: string;
  username: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  branchName: string;
  branchCity: string;
  commissionPercentage: number;
  active: boolean;
  createdAt: string;
}

export interface CountryRate {
  id: string;
  name: string;
  code: string;
  flag: string;
  region: string;
  expressDays: string;
  economyDays: string;
  baseRatePerKg: number;
  docRate: number;
  agentWholesaleRatePerKg?: number;
  medicineSurcharge?: number;
  fuelSurchargePercent?: number;
  medicineAllowed: boolean;
  foodAllowed: boolean;
  popular: boolean;
  notes?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  hindiTitle?: string;
  description: string;
  iconName: string;
  badge?: string;
  features: string[];
  deliveryTime: string;
  suitableFor: string;
}

export interface PickupBookingRequest {
  id?: string;
  fullName: string;
  phone: string;
  email: string;
  pickupAddress: string;
  pickupCity: string;
  pickupPincode: string;
  pickupDate: string;
  pickupTimeSlot: string;
  destinationCountry: string;
  parcelType: string;
  approxWeightKg: number;
  specialInstructions?: string;
  requiresPackaging: boolean;
  status?: 'Pending' | 'Assigned' | 'Picked Up' | 'Cancelled';
  assignedAgent?: string;
  createdAt?: string;
}
