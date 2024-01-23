"use client";

import { Tooltip } from "@/components/tooltip";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CityOption,
  CountryOption,
  useCityPicker,
} from "@/store/use-city-picker";
import { useSidebar } from "@/store/use-sidebar";

import { Country, City } from "country-state-city";
import { Globe2Icon, GlobeIcon, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CityPicker() {
  const { collapsed } = useSidebar((state) => state);
  const { selectedCountry, selectedCity, setSelectedCountry, setSelectedCity } =
    useCityPicker();
  const router = useRouter();

  const handleSelectedCountry = (value: CountryOption) => {
    setSelectedCountry(value);
    setSelectedCity(null);
    router.push(`/${value?.latitude}/${value?.longitude}`);
  };

  const handleSelectedCity = (value: CityOption) => {
    setSelectedCity(value);
    router.push(`/${value?.latitude}/${value?.longitude}`);
  };

  return (
    <>
      <Select
        value={selectedCountry?.isoCode}
        // @ts-expect-error
        onValueChange={handleSelectedCountry}
      >
        <SelectTrigger className="w-full">
          <Tooltip
            label={selectedCountry?.name ?? "Country"}
            side="right"
            asChild
          >
            <div className="flex items-center justify-center space-x-2">
              <GlobeIcon className="h-5 w-5 text-white" />

              {!collapsed && (
                <label htmlFor="country">
                  {selectedCountry ? selectedCountry.name : "Country"}
                </label>
              )}
            </div>
          </Tooltip>
        </SelectTrigger>
        <SelectContent>
          {Country.getAllCountries().map((country) => (
            <SelectItem
              key={country.isoCode}
              value={country as unknown as string}
            >
              {country.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedCountry && (
        <Select
          value={selectedCity?.name}
          // @ts-expect-error
          onValueChange={handleSelectedCity}
        >
          {City.getCitiesOfCountry(selectedCountry.isoCode)?.map((item) => item)
            ?.length ?? 0 > 0 ? (
            <SelectTrigger className="w-full">
              <Tooltip
                label={selectedCity?.name ?? "City"}
                side="right"
                asChild
              >
                <div className="flex items-center justify-center space-x-2">
                  <Globe2Icon className="h-5 w-5 text-white" />
                  {!collapsed && (
                    <label htmlFor="city">
                      {selectedCity ? selectedCity.name : "City"}
                    </label>
                  )}
                </div>
              </Tooltip>
            </SelectTrigger>
          ) : (
            <Tooltip label={"No City Found"} side="right" asChild>
              <div className="flex items-center space-x-2 ml-4">
                <XCircle className="h-5 w-5 text-red-500" />
                {!collapsed && (
                  <label htmlFor="city" className="text-sm">
                    {selectedCity ? selectedCity.name : "No City Found"}
                  </label>
                )}
              </div>
            </Tooltip>
          )}

          <SelectContent>
            {City.getCitiesOfCountry(selectedCountry.isoCode)?.map(
              (option, index) => (
                <SelectItem key={index} value={option as unknown as string}>
                  {option.name}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
      )}
    </>
  );
}
