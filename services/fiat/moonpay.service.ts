interface MoonpayConfig {
  apiKey: string;
  baseUrl?: string;
  mode: 'live' | 'test';
}

interface TransactionParams {
  currency: string;
  walletAddress: string;
  amount: number;
  externalTransactionId?: string;
}

interface MoonpayTransaction {
  id: string;
  status: 'pending' | 'completed' | 'failed';
  currency: string;
  amount: number;
  walletAddress: string;
  paymentUrl?: string;
}

export class MoonpayService {
  private config: MoonpayConfig;

  constructor() {
    this.config = {
      apiKey: process.env.NEXT_PUBLIC_MOONPAY_API || '',
      baseUrl: 'https://api.moonpay.com',
      mode: 'live'
    };
  }

  async createTransaction(params: TransactionParams): Promise<MoonpayTransaction> {
    try {
      // Реализация
      return {
        id: 'transaction_id',
        status: 'pending',
        currency: params.currency,
        amount: params.amount,
        walletAddress: params.walletAddress
      };
    } catch (error) {
      throw new Error(`Moonpay create transaction failed: ${error.message}`);
    }
  }

  getPaymentUrl(transactionId: string): string {
    return `${this.config.baseUrl}/transaction/${transactionId}?apiKey=${this.config.apiKey}`;
  }

  async getTransactionStatus(transactionId: string): Promise<string> {
    try {
      // Реализация
      return 'pending';
    } catch (error) {
      throw new Error(`Moonpay get status failed: ${error.message}`);
    }
  }
}