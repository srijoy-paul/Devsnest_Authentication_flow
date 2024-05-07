import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
function Offersbar() {
  return (
    <div className="bg-offersbg flex items-center justify-center gap-4 py-2 text-xs">
      <GrFormPrevious size={15} />
      <span>Get 10% off on buisness sign up</span>
      <GrFormNext size={15} />
    </div>
  );
}

export default Offersbar;
