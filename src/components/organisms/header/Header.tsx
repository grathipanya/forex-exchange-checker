import Logo from "@/assets/images/logo.svg";
import { Image } from "@/components/atoms/image";
import { GroupLabel } from "@/components/molecules/group-label";

const Header = () => (
  <div className="flex justify-between items-center gap-4 pt-5 py-5 px-6">
    <div className="min-h-6.5 min-w-35">
      <Image
        src={Logo}
        alt="Header Image"
      />
    </div>
    <div>
      <GroupLabel text={["55 Currencies", "EOD", "ECB DATA"]} />
    </div>
  </div>
);

export default Header;
