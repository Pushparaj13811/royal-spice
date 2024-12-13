interface PaymentData {
  paymentMethod: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
  upiId?: string;
}

export async function processPayment(data: PaymentData): Promise<void> {
  // Simulate API call
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.1) { // 90% success rate
        resolve(undefined);
      } else {
        reject(new Error('Payment failed'));
      }
    }, 2000);
  });
}