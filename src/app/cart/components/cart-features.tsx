"use client";

import { Truck, Shield, Package } from "lucide-react";

export const CartFeatures = () => {
  const features = [
    {
      icon: Truck,
      title: "ارسال رایگان",
      desc: "برای خرید بالای 500 هزار تومان",
    },
    {
      icon: Shield,
      title: "ضمانت اصالت",
      desc: "تضمین کیفیت محصولات",
    },
    {
      icon: Package,
      title: "بسته‌بندی ویژه",
      desc: "محافظت کامل از محصولات",
    },
  ];

  return (
    <div className="bg-white/60 backdrop-blur rounded-2xl p-6">
      <div className="space-y-4">
        {features.map((feature, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <feature.icon className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">{feature.title}</p>
              <p className="text-xs text-gray-500">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
