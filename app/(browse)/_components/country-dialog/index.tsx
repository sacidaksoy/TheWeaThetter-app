"use client";

import { useCityPicker } from "@/store/use-city-picker";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Sheet from "@/components/sheet";
import { useIsClient } from "usehooks-ts";
import { CityPickerDialog } from "./city-picker-dialog";

export default function CountryDialog() {
  const isClient = useIsClient();
  const router = useRouter();

  const { open, setOpen, selectedCountry, selectedCity } = useCityPicker();

  const handleClickSave = () => {
    router.push(
      `/${selectedCity?.latitude || selectedCountry?.latitude}/${
        selectedCity?.longitude || selectedCountry?.longitude
      }`
    );
  };

  // fix hydration error
  if (!isClient) {
    return <>Client Render</>;
  }

  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}
      title="Select Country & City"
      description="What's the weather in your city today?"
      content={
        <div className="flex flex-col items-start justify-between space-y-2 my-4">
          <CityPickerDialog />
        </div>
      }
      actions={
        <Button variant="outline" onClick={handleClickSave}>
          Let's Go
        </Button>
      }
    />
  );
}
