import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export default function Logo() {
  return (
    <Link href="/">
      <div className="flex items-center gap-x-4 hover:opacity-75 transition">
        <div className="bg-white rounded-full p-1 mr-12 shrink-0 lg:mr-0 lg:shrink">
          <Image
            src="/logo.png"
            alt="logo"
            // className="w-23 h-10"
            width={110}
            height={110}
            priority
          />
        </div>
        <div className={cn("hidden lg:block", font.className)}>
          <p className="text-base font-medium">E-İhracat Portal</p>
          {/* <p className="text-xs text-muted-foreground">Let&apos;s deep dive</p> */}
        </div>
      </div>
    </Link>
  );
}
