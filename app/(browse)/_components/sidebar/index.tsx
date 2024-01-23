import { CityPickerSidebar } from "./city-picker-sidebar";
import Toggle, { ToggleSkeleton } from "./toggle";
import Wrapper from "./wrapper";

export default function Sidebar() {
  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-4 pt-4 lg:pt-0">
        <CityPickerSidebar />
      </div>
    </Wrapper>
  );
}

export function SidebarSkeleton() {
  return (
    <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
      <ToggleSkeleton />
    </aside>
  );
}
