import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Product } from '@/types';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const productSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Price must be a positive number',
  }),
  category: z.enum(['nuts', 'dryfruits']),
});

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: Omit<Product, 'id'>) => Promise<void>;
  isEditMode?: boolean;
}

export function ProductForm({ product, onSubmit, isEditMode }: ProductFormProps) {
  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>(product?.images || []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || '',
      description: product?.description || '',
      price: product?.price.toString() || '',
      category: product?.category || 'nuts',
    },
  });

  const handleSubmit = async (data: z.infer<typeof productSchema>) => {
    if (images.length === 0) {
      form.setError('root', {
        message: 'At least one image is required',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        ...data,
        price: Number(data.price),
        images,
        status: 'active',
        stock: 0,
        minimumStock: 0,
        maximumStock: 100,
        reorderPoint: 10,
        unitCost: Number(data.price) * 0.7, // Default unit cost as 70% of selling price
        lastRestocked: new Date().toISOString(),
        sku: `${data.category}-${Date.now()}`, // Generate a temporary SKU
        weightPerUnit: 100, // Default 100g
        origin: 'India', // Default origin
        shelfLife: 12, // Default 12 months
        storageConditions: 'room-temperature',
        organicCertified: false,
        qualityGrade: 'standard',
        processingType: 'raw',
        packagingType: 'retail'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" min="0" step="0.01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="nuts">Nuts</SelectItem>
                  <SelectItem value="dryfruits">Dry Fruits</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel>Images</FormLabel>
          <ImageUpload images={images} onChange={setImages} />
          {form.formState.errors.root && (
            <p className="text-sm font-medium text-destructive">
              {form.formState.errors.root.message}
            </p>
          )}
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? isEditMode
                ? 'Updating...'
                : 'Creating...'
              : isEditMode
              ? 'Update Product'
              : 'Create Product'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin')}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}