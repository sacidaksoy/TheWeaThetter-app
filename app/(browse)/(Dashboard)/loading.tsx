import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="h-full flex flex-col space-y-4 justify-center items-center">
      <Loader className="h-10 w-10 text-muted-foreground animate-spin" />
    </div>
  );
}
