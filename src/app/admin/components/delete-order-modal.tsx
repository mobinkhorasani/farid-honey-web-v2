'use client';

import { useState } from 'react';
import { 
  Trash2, 
  Package, 
  User, 
  Phone, 
  MapPin,
  Calendar,
  Sparkles,
  X
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useDeleteOrder } from '../hooks';
import { Button } from '@/components/ui/button';

// تایپ‌های TypeScript
export interface Order {
  id: string;
  total_price: string;
  province: string;
  order_date: string;
  order_time: string;
  user: {
    id: string;
    name: string;
    phone_number: string;
  };
}

interface DeleteOrderModalProps {
  order: Order;
  token?: string;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const DeleteOrderModal = ({ 
  order, 
  token,
  trigger,
  onSuccess,
  onError 
}: DeleteOrderModalProps) => {
  const [open, setOpen] = useState(false);
  const deleteMutation = useDeleteOrder(token);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteMutation.mutateAsync(order.id);
      setOpen(false);
      onSuccess?.();
      console.log(`Order ${order.id} deleted successfully`);
    } catch (error) {
      console.error('Error deleting order:', error);
      onError?.(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            className="inline-flex items-center gap-2 text-red-500 hover:text-red-600 font-medium transition-all duration-200 px-3 py-1.5 rounded-lg hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 group"
            onClick={(e) => e.stopPropagation()}
          >
            <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </Button>
        )}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md bg-white" dir="rtl">

        
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-right relative z-10">
            <div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-red-700 to-orange-600 text-transparent bg-clip-text">
                حذف سفارش
              </h3>
              <p className="text-sm text-amber-700/60 mt-0.5 flex items-center gap-1">
                <Package className="w-3 h-3" />
                سفارش #{order.id}
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className="text-amber-800/80 text-right pt-2 relative z-10 leading-relaxed">
          آیا از حذف این سفارش اطمینان دارید؟ این عملیات قابل بازگشت نیست.
        </DialogDescription>
        
        {/* Order Details Section */}
        <div className="relative z-10 mt-4">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200/30 shadow-inner">
            {/* Order Details Card */}
            <div className="bg-white/80 backdrop-blur rounded-lg p-3 space-y-3 shadow-sm">
              {/* Customer Info */}
              <div className="flex items-center gap-2 pb-2 border-b border-amber-100">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                  <User className="w-4 h-4 text-amber-700" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-800">{order.user.name}</div>
                  <div className="text-xs text-amber-600 flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    {order.user.phone_number}
                  </div>
                </div>
              </div>
              
              {/* Order Info Grid */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-500" />
                  <span className="text-gray-700">{order.province}</span>
                </div>
                <div className="flex items-center gap-2 mr-auto">
                  <Calendar className="w-4 h-4 text-amber-500" />
                  <span className="text-gray-700">{order.order_date}</span>
                </div>
              </div>
              
              {/* Price */}
              <div className="pt-2 border-t border-amber-100 flex items-center justify-between">
                <span className="text-sm text-gray-600">مبلغ کل:</span>
                <div className="flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span className="font-bold text-lg bg-gradient-to-r from-amber-600 to-orange-500 text-transparent bg-clip-text">
                    {order.total_price}
                  </span>
                  <span className="text-xs text-gray-600">تومان</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="gap-3 pt-4 relative z-10">
          <Button
            onClick={() => setOpen(false)}
            disabled={isDeleting}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 hover:from-amber-200 hover:to-orange-200 text-amber-800 px-5 py-2.5 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 transform"
          >
            <X className="w-4 h-4" />
            انصراف
          </Button>
          
          <Button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-5 py-2.5 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform"
          >
            {isDeleting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                در حال حذف...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                حذف نهایی
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};