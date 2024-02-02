import Actions from "./actions";
import Logo from "./logo";
import { CityPickerNavbar } from "./city-picker-navbar";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full h-14 bg-[#fff] z-[49] px-2 lg:px-4 flex justify-between items-center shadow-sm">
      <Logo />
      {/* <div className="flex items-center space-x-2">
        <CityPickerNavbar />
      </div> */}
      <Actions />
    </nav>
  );
}
