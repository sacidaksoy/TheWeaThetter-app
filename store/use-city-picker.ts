// use-city-picker.ts
import { create } from "zustand";

export type CountryOption = {
  currency: string;
  flag: string;
  isoCode: string;
  latitude: string;
  longitude: string;
  name: string;
  phoneCode: string;
  timeZones: [];
} | null;

export type CityOption = {
  countryCode: string;
  latitude: string;
  longitude: string;
  name: string;
  stateCode: string;
} | null;

type CityPickerState = {
  open: boolean;
  setOpen: (value: boolean) => void;
  selectedCountry: CountryOption | undefined;
  selectedCity: CityOption | undefined;
  setSelectedCountry: (value: CountryOption) => void;
  setSelectedCity: (value: CityOption) => void;
};

export const useCityPicker = create<CityPickerState>((set) => ({
  open: true, // Başlangıçta açık olarak başlatıldı
  setOpen: (value) => set({ open: value }),
  selectedCountry: undefined,
  selectedCity: undefined,
  setSelectedCountry: (value) => set({ selectedCountry: value }),
  setSelectedCity: (value) => set({ selectedCity: value }),
}));
