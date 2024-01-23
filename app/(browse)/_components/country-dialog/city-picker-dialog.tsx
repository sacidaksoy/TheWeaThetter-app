"use client";

import { CheckIcon, Globe, XCircle, Globe2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { City, Country } from "country-state-city";
import { useState } from "react";
import {
  CityOption,
  CountryOption,
  useCityPicker,
} from "@/store/use-city-picker";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";

export function CityPickerDialog() {
  const { selectedCountry, selectedCity, setSelectedCountry, setSelectedCity } =
    useCityPicker();
  const [openCountry, setOpenCountry] = useState(false);
  const [openCity, setOpenCity] = useState(false);
  const router = useRouter();

  function handleSelectedCountry(value: CountryOption) {
    setSelectedCountry(value);
    setSelectedCity(null);
    setOpenCountry(false);
    router.push(`/${value?.latitude}/${value?.longitude}`);
  }

  const handleSelectedCity = (value: CityOption) => {
    setSelectedCity(value);
    setOpenCity(false);
    router.push(`/${value?.latitude}/${value?.longitude}`);
  };

  return (
    <>
      <Popover open={openCountry} onOpenChange={setOpenCountry}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openCountry}
            className="w-full justify-between"
          >
            {selectedCountry?.name ? selectedCountry.name : "Select country..."}
            <Globe className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search country..." className="h-9" />
            <ScrollArea className="h-96">
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {Country.getAllCountries().map((country) => (
                  <CommandItem
                    key={country.isoCode}
                    value={country as unknown as string}
                    // @ts-expect-error
                    onSelect={() => handleSelectedCountry(country)}
                  >
                    {country.name}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedCountry?.name === country.name
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </ScrollArea>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedCountry &&
        (City.getCitiesOfCountry(selectedCountry.isoCode)?.map((item) => item)
          ?.length ?? 0 > 0 ? (
          <Popover open={openCity} onOpenChange={setOpenCity}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openCity}
                className="w-full justify-between"
              >
                {selectedCity?.name ? selectedCity.name : "Select city..."}
                <Globe2 className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search city..." className="h-9" />
                <ScrollArea className="h-96">
                  <CommandEmpty>No city found.</CommandEmpty>
                  <CommandGroup>
                    {City.getCitiesOfCountry(selectedCountry.isoCode)?.map(
                      (city, index) => (
                        <CommandItem
                          key={index}
                          value={city as unknown as string}
                          // @ts-expect-error
                          onSelect={() => handleSelectedCity(city)}
                        >
                          {city.name}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              selectedCity?.name === city.name
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      )
                    )}
                  </CommandGroup>
                </ScrollArea>
              </Command>
            </PopoverContent>
          </Popover>
        ) : (
          <div className="flex items-center space-x-2 ml-4">
            <XCircle className="h-5 w-5 text-red-500" />
            <Label htmlFor="city" className="text-sm">
              No City Found
            </Label>
          </div>
        ))}
    </>
  );
}
