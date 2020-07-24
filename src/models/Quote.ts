export interface Quote {
  id: string;
  userId: string;
  guildId: string;
  approved: boolean;
  quoteNumber: number;
  title: string;
  text: string;
  createdAt: Date;
}
