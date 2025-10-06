import { LoginFormValues } from "@/app/login/components/login-schema";
import { RegisterFormValues } from "@/app/register/components/register-validation";
import { UseFormRegister } from "react-hook-form";
import type { ComponentType } from "react";

export type Category = {
  id: string;
  title: string;
  href: string;
  icon?: ComponentType<{ className?: string }>;
};

export type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  badge?: string;
};

export interface PasswordFieldProps {
  id?: string
  label?: string
  placeholder?: string
  error?: string
  showPassword: boolean
  onToggleShow: () => void
  registration: ReturnType<UseFormRegister<LoginFormValues>>
}

export interface PhoneFieldProps {
  id?: string
  label?: string
  hint?: string
  error?: string
  registration: ReturnType<UseFormRegister<LoginFormValues>>
}

export interface PasswordFieldProps {
  id?: string
  label?: string
  placeholder?: string
  error?: string
  showPassword: boolean
  onToggleShow: () => void
}

export interface PhoneFieldProps {
  id?: string
  label?: string
  hint?: string
  error?: string
  autoComplete?: string
}

export interface NameFieldProps {
  id?: string
  label?: string
  hint?: string
  error?: string
  registration: ReturnType<UseFormRegister<RegisterFormValues>>
}

export interface ProductsResponse {
  products: any[];
}

export interface ProductCardData {
  id: string | number;
  name: string;             
  price: number;           
  image_url: string;
  tag?: string;
}

export type DashboardOrder = {
  order_id: string
  total_price: number
  created_at: string
  address?: {
    province: string
    city: string
    address: string
    receiver: string
    phone_number: string
  }
  items: Array<{
    order_item_id: string
    product_id: string
    name: string
    price: number
    quantity: number
  }>
}

export type SalesPoint = { day: string; revenue: number; orders: number }
export type CityPoint = { city: string; revenue: number }
export type TopProduct = { name: string; qty: number; revenue: number }
