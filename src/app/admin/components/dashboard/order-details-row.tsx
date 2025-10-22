"use client";

import { useQuery } from "@tanstack/react-query";
import { getOrderDeteil } from "@/api/admin/admin-sevices";

interface OrderDetailsRowProps {
  orderId: string;
  token: string | undefined;
  isExpanded: boolean;
}

export const OrderDetailsRow = ({
  orderId,
  token,
  isExpanded,
}: OrderDetailsRowProps) => {
  const { data: orderDetail, isFetching } = useQuery({
    queryKey: ["orderDetail", orderId],
    queryFn: () => getOrderDeteil(token, orderId),
    enabled: !!token && isExpanded,
    staleTime: 1000 * 60 * 5,
  });

  if (!isExpanded) return null;

  return (
    <>
      {isExpanded && (
        <tr>
          <td
            colSpan={7}
            className="bg-slate-50/50 border-t border-slate-200/60 px-8 py-6"
          >
            {isFetching ? (
              <div className="text-center text-slate-500 py-4">
                در حال بارگذاری جزئیات سفارش...
              </div>
            ) : orderDetail ? (
              <div className="space-y-6">
                <div className="font-bold text-slate-800 text-lg bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text ">
                  جزئیات سفارش
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-slate-700">
                  <div className="bg-white rounded-xl p-4 border border-slate-200/60 shadow-sm">
                    <div className="text-slate-500 text-xs font-medium mb-1">
                      گیرنده
                    </div>
                    <div className="font-semibold text-slate-800">
                      {orderDetail.receiver}
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-slate-200/60 shadow-sm">
                    <div className="text-slate-500 text-xs font-medium mb-1">
                      شماره تماس
                    </div>
                    <div className="font-semibold text-slate-800">
                      {orderDetail.address_phone_number}
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-slate-200/60 shadow-sm">
                    <div className="text-slate-500 text-xs font-medium mb-1">
                      آدرس
                    </div>
                    <div className="font-semibold text-slate-800">
                      {orderDetail.address}
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-slate-200/60 shadow-sm">
                    <div className="text-slate-500 text-xs font-medium mb-1">
                      شهر
                    </div>
                    <div className="font-semibold text-slate-800">
                      {orderDetail.city}
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-slate-200/60 shadow-sm">
                    <div className="text-slate-500 text-xs font-medium mb-1">
                      کد پستی
                    </div>
                    <div className="font-mono font-semibold text-slate-800">
                      {orderDetail.postal_code}
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-slate-200/60 shadow-sm">
                    <div className="text-slate-500 text-xs font-medium mb-1">
                      مبلغ کل
                    </div>
                    <div className="font-bold text-lg text-amber-600">
                      {orderDetail.total_price} تومان
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-slate-200/60 pt-6">
                  <div className="font-semibold text-slate-800 mb-4 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text ">
                    محصولات سفارش داده‌شده
                  </div>
                  <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
                    <table className="w-full text-sm text-slate-700">
                      <thead className="bg-slate-50/80 border-b border-slate-200/60">
                        <tr>
                          <th className="px-6 py-4 text-right font-semibold text-slate-600">
                            محصول
                          </th>
                          <th className="px-6 py-4 text-center font-semibold text-slate-600">
                            تعداد
                          </th>
                          <th className="px-6 py-4 text-center font-semibold text-slate-600">
                            سایز
                          </th>
                          <th className="px-6 py-4 text-left font-semibold text-slate-600">
                            قیمت
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderDetail.items?.map((item: any, index: number) => (
                          <tr
                            key={item.id}
                            className={`border-b border-slate-100 transition-colors ${
                              index % 2 === 0 ? "bg-white" : "bg-slate-50/30"
                            }`}
                          >
                            <td className="px-6 py-4 font-medium text-slate-800">
                              {item.product_name}
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg font-medium">
                                {item.quantity}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg font-medium">
                                {item.size}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-left font-semibold text-amber-600">
                              {item.price} تومان
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-slate-400 text-sm bg-slate-50 rounded-2xl p-6 border border-slate-200/60">
                  هیچ جزئیاتی یافت نشد
                </div>
              </div>
            )}
          </td>
        </tr>
      )}
    </>
  );
};
