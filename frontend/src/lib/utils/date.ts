import { addDays } from 'date-fns';

export function calculateDeliveryDate(orderDate: string | Date): Date {
  const date = new Date(orderDate);
  // Add 3-5 business days for delivery
  return addDays(date, 5);
}