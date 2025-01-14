import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, ShoppingCart, Clock, Star } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

function StatCard({ title, value, description, icon }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

export function UserStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Orders"
        value="12"
        description="Across all time"
        icon={<Package className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard
        title="Cart Items"
        value="3"
        description="Items waiting to be purchased"
        icon={<ShoppingCart className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard
        title="Pending Delivery"
        value="2"
        description="Orders in transit"
        icon={<Clock className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard
        title="Reviews Given"
        value="8"
        description="Thank you for your feedback"
        icon={<Star className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  );
}
