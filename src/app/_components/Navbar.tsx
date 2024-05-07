import UserInfobar from "./UserInfobar";
import { CiSearch } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";

function Navbar() {
  return (
    <div className="flex w-full flex-col border border-red-400">
      <UserInfobar />
      <div className="flex px-5">
        <h2 className="flex-1 border border-red-400 text-lg font-bold">
          ECOMMERCE
        </h2>
        <div
          className="flex items-center justify-evenly border border-red-400 text-xs font-bold"
          style={{ flex: "1" }}
        >
          <span>Categories</span>
          <span>Sale</span>
          <span>Clearance</span>
          <span>New Stock</span>
          <span>Trending</span>
        </div>
        <div className="flex flex-1 items-center justify-end gap-6 border border-red-400">
          <CiSearch size={20} />
          <CiShoppingCart size={20} />
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Navbar;
