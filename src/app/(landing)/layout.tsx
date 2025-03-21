import {
  IconHome,
  IconListDetails,
  IconMenu2,
  IconShoppingBag,
  IconShoppingCart,
  IconUser,
} from "@tabler/icons-react";
import LogoIcon from "../../icons/logo";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-maincard flex justify-between z-50 fixed top-0 w-full items-center px-4 py-6">
        <IconShoppingCart size={28} color="white" />
        <LogoIcon />
        <IconMenu2 size={28} color="white" />
      </nav>

      {/* Main Content */}
      <main className="flex-grow p-4 rounded-4xl mt-20 pb-40  ">{children}</main>

      {/* Footer Navigation */}
      <footer className="bg-maincard fixed bottom-0 left-0 w-full py-4 z-50  flex items-center shadow-lg">
        <div className="flex justify-around w-full text-xs text-white">
          <div className="flex flex-col gap-2 items-center">
            <IconUser size={24} color="white" />
            <p>حساب</p>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <IconListDetails size={24} color="white" />
            <p>سفارشات</p>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <IconShoppingBag size={24} color="white" />
            <p>محصولات</p>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <IconHome size={24} color="white" />
            <p>خانه</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingLayout;
