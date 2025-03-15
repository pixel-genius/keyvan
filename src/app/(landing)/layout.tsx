import {
  IconHome,
  IconListDetails,
  IconMenu2,
  IconShoppingBag,
  IconShoppingCart,
  IconUser,
} from "@tabler/icons-react";
import LogoIcon from "../icons/logo";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container  mx-auto w-[768px]">
      <nav>
        <div className="bg-maincard flex justify-around items-center rounded-t-4xl h-24 w-full flex-row">
          <div>
            <IconShoppingCart size={34} color="white" />
          </div>
          <div>
            <LogoIcon />
          </div>
          <div>
            <IconMenu2 size={34} color="white" />
          </div>
        </div>
      </nav>
      <div>{children}</div>
      <footer className="bg-maincard h-24 rounded-b-4xl flex items-center ">
        <div className="flex gap-3 justify-evenly w-full">
          <div className="flex flex-col items-center">
            <IconUser size={34} color="white" />
            <p>حساب کاربری</p>
          </div>
          <div className="flex flex-col items-center">
            <IconListDetails size={34} color="white" />
            <p>سفارشات</p>
          </div>
          <div className="flex flex-col items-center">
            <IconShoppingBag size={34} color="white" />
            <p>محصولات</p>
          </div>
          <div className="flex flex-col items-center">
            <IconHome size={34} color="white" />
            <p>خانه</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingLayout;
