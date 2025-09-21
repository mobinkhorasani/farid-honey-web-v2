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

export type CartItem = {
  id: string | number
  title: string
  subtitle?: string
  price: number
  originalPrice?: number
  image: string
  qty: number
  stock: number
  category?: string
  brand?: string
  weightKg?: number
}

export type ShippingMethod = 'pishtaz' | 'tipax' | 'snappbox'

export type ShippingState = {
  method: ShippingMethod
  region: 'intra' | 'inter'
  distanceKm: number
}
