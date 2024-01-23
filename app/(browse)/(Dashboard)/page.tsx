"use client";

import { useCityPicker } from "@/store/use-city-picker";
import { useEffect } from "react";

export default function HomePage({ children }: { children: React.ReactNode }) {
  const { setOpen, setSelectedCountry, setSelectedCity } = useCityPicker(
    (state) => state
  );

  useEffect(() => {
    setOpen(true);
    setSelectedCity(null);
    setSelectedCountry(null);
  }, [setOpen, setSelectedCity, setSelectedCountry]);

  return <div>{children}</div>;
}
