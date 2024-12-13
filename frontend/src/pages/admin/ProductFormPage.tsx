import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { products } from '@/lib/data';
import { ProductForm } from '@/components/admin/ProductForm';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/types';

export function ProductFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const product = products.find((p) => p.id === id);
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (id && !product) {
      toast({
        title: 'Error',
        description: 'Product not found',
        variant: 'destructive',
      });
      navigate('/admin');
    }
  }, [id, product, navigate, toast]);

  const handleSubmit = async (data: Omit<Product, 'id'>) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: 'Success',
        description: `Product ${isEditMode ? 'updated' : 'created'} successfully`,
      });
      navigate('/admin');
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to ${isEditMode ? 'update' : 'create'} product`,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">
          {isEditMode ? 'Edit Product' : 'Add New Product'}
        </h1>
        <p className="text-muted-foreground">
          {isEditMode
            ? 'Update the product information below'
            : 'Fill in the details to create a new product'}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <ProductForm
            product={product}
            onSubmit={handleSubmit}
            isEditMode={isEditMode}
          />
        </div>

        {/* Tips and Guidelines */}
        <div className="space-y-6">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-xl font-semibold mb-4">Tips for Great Products</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <p className="text-sm text-muted-foreground">
                  Use high-quality, well-lit images that showcase your product clearly
                </p>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <p className="text-sm text-muted-foreground">
                  Write detailed, accurate descriptions that highlight key features
                </p>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <p className="text-sm text-muted-foreground">
                  Include relevant specifications and dimensions
                </p>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <p className="text-sm text-muted-foreground">
                  Set competitive prices based on market research
                </p>
              </li>
            </ul>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-xl font-semibold mb-4">Image Guidelines</h2>
            <div className="space-y-4">
              <div className="rounded-lg bg-muted p-4">
                <h3 className="font-medium mb-2">Recommended Image Specs</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Minimum size: 800x800 pixels</li>
                  <li>• Maximum file size: 5MB</li>
                  <li>• Format: JPG, PNG</li>
                  <li>• Background: White or transparent</li>
                </ul>
              </div>
              <div className="rounded-lg bg-muted p-4">
                <h3 className="font-medium mb-2">Best Practices</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Show product from multiple angles</li>
                  <li>• Include close-up shots of details</li>
                  <li>• Ensure proper lighting</li>
                  <li>• Maintain consistent aspect ratio</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}