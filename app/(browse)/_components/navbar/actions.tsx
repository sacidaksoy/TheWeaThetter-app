"use client";

import { Button } from "@/components/ui/button";
import { useCityPicker } from "@/store/use-city-picker";

export default function Actions() {
  const { open, setOpen } = useCityPicker((state) => state);
  return (
    <div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
      <Button variant="outline" onClick={() => setOpen(!open)}>
        Open
      </Button>
    </div>
  );
}
