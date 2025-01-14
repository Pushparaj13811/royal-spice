import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  Package,
  Leaf,
  ThermometerSun,
  Scale,
} from 'lucide-react';
import { Product, InventoryTransaction } from '@/types';

// Mock data - replace with API calls in production
const mockInventory: Product[] = [
  {
    id: 'p1',
    name: 'Premium Cashews',
    description: 'Premium grade cashews from Kerala',
    price: 999,
    category: 'nuts',
    images: ['/images/cashews.jpg'],
    status: 'active',
    stock: 15,
    minimumStock: 10,
    maximumStock: 50,
    reorderPoint: 20,
    unitCost: 750,
    lastRestocked: '2025-01-10',
    sku: 'CASH-PREM-001',
    weightPerUnit: 250,
    origin: 'Kerala, India',
    shelfLife: 12,
    storageConditions: 'room-temperature',
    organicCertified: true,
    qualityGrade: 'premium',
    processingType: 'raw',
    packagingType: 'retail',
    supplier: 'Kerala Nuts Co.',
  },
  {
    id: 'p2',
    name: 'Iranian Dates',
    description: 'Premium quality Iranian dates',
    price: 599,
    category: 'dryfruits',
    images: ['/images/dates.jpg'],
    status: 'active',
    stock: 25,
    minimumStock: 15,
    maximumStock: 60,
    reorderPoint: 20,
    unitCost: 400,
    lastRestocked: '2025-01-12',
    sku: 'DATE-IRAN-001',
    weightPerUnit: 500,
    origin: 'Iran',
    shelfLife: 18,
    storageConditions: 'room-temperature',
    organicCertified: true,
    qualityGrade: 'premium',
    processingType: 'raw',
    packagingType: 'retail',
    supplier: 'Iranian Dry Fruits Ltd.',
  },
];

export function InventoryManagement() {
  const [inventory, setInventory] = useState<Product[]>(mockInventory);
  const [transactions, setTransactions] = useState<InventoryTransaction[]>([]);
  // const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const { toast } = useToast();

  const updateStock = (
    itemId: string,
    quantity: number,
    type: InventoryTransaction['type'],
    qualityCheck?: InventoryTransaction['qualityCheck']
  ) => {
    const item = inventory.find(i => i.id === itemId);
    if (!item) return;

    const newTransaction: InventoryTransaction = {
      id: `t${Date.now()}`,
      productId: itemId,
      type,
      quantity: type === 'sale' || type === 'wastage' ? -quantity : quantity,
      date: new Date().toISOString().split('T')[0],
      notes: `${type} transaction`,
      performedBy: 'Admin', // Replace with actual user
      batchNumber: `B${Date.now()}`,
      expiryDate: new Date(Date.now() + (item.shelfLife * 30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
      qualityCheck,
    };

    setTransactions(prev => [newTransaction, ...prev]);

    setInventory(prev =>
      prev.map(item => {
        if (item.id === itemId) {
          const newStock = item.stock + (type === 'sale' || type === 'wastage' ? -quantity : quantity);
          
          // Check various stock conditions
          if (newStock <= item.reorderPoint) {
            toast({
              title: 'Low Stock Alert',
              description: `${item.name} has reached reorder point. Current stock: ${newStock}g`,
              variant: 'destructive',
            });
          }

          // Check shelf life
          const daysSinceRestocked = Math.floor(
            (new Date().getTime() - new Date(item.lastRestocked).getTime()) / (1000 * 60 * 60 * 24)
          );
          if (daysSinceRestocked > (item.shelfLife * 30 * 0.75)) { // Alert at 75% of shelf life
            toast({
              title: 'Shelf Life Alert',
              description: `${item.name} is approaching end of shelf life`,
              variant: 'default',
            });
          }

          return {
            ...item,
            stock: newStock,
            lastRestocked: type === 'restock' ? newTransaction.date : item.lastRestocked,
          };
        }
        return item;
      })
    );
  };

  const getStatusBadge = (item: Product) => {
    if (item.stock <= 0) return <Badge variant="destructive">Out of Stock</Badge>;
    if (item.stock <= item.minimumStock) return <Badge variant="destructive">Low Stock</Badge>;
    if (item.stock > item.maximumStock) return <Badge variant="secondary">Overstock</Badge>;
    return <Badge variant="default">In Stock</Badge>;
  };

  const getInventoryStats = () => {
    const totalWeight = inventory.reduce((sum, item) => sum + (item.stock * item.weightPerUnit), 0);
    const totalValue = inventory.reduce((sum, item) => sum + (item.stock * item.unitCost), 0);
    const lowStockItems = inventory.filter(item => item.stock <= item.minimumStock).length;
    const organicItems = inventory.filter(item => item.organicCertified).length;

    return { 
      totalWeight: totalWeight / 1000, // Convert to kg
      totalValue,
      lowStockItems,
      organicItems,
    };
  };

  const stats = getInventoryStats();

  return (
    <div className="space-y-6">
      {/* Inventory Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stock</CardTitle>
            <Scale className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalWeight.toFixed(2)} kg</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{stats.totalValue.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.lowStockItems}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Organic Items</CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.organicItems}</div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Current Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Stock (g)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Quality Grade</TableHead>
                <TableHead>Storage</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted-foreground">SKU: {item.sku}</div>
                    </div>
                  </TableCell>
                  <TableCell className="capitalize">{item.category}</TableCell>
                  <TableCell>{item.stock}</TableCell>
                  <TableCell>{getStatusBadge(item)}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {item.qualityGrade}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <ThermometerSun className="h-4 w-4 text-muted-foreground" />
                      <span className="capitalize">{item.storageConditions}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const qualityCheck = {
                            moisture: 5.5,
                            appearance: 'excellent' as const,
                            foreignMatter: 0.1,
                            approved: true,
                          };
                          updateStock(item.id, 1000, 'restock', qualityCheck);
                        }}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateStock(item.id, 100, 'sale')}
                        disabled={item.stock <= 0}
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => updateStock(item.id, 100, 'wastage')}
                        disabled={item.stock <= 0}
                      >
                        Waste
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Quantity (g)</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Quality Check</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.slice(0, 5).map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>
                    {inventory.find(i => i.id === transaction.productId)?.name}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        transaction.type === 'restock'
                          ? 'default'
                          : transaction.type === 'sale'
                          ? 'secondary'
                          : transaction.type === 'wastage'
                          ? 'destructive'
                          : 'outline'
                      }
                    >
                      {transaction.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {transaction.quantity > 0 ? '+' : ''}
                    {transaction.quantity}
                  </TableCell>
                  <TableCell>{transaction.batchNumber}</TableCell>
                  <TableCell>
                    {transaction.qualityCheck ? (
                      <Badge variant={transaction.qualityCheck.approved ? 'default' : 'destructive'}>
                        {transaction.qualityCheck.appearance}
                      </Badge>
                    ) : '-'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
