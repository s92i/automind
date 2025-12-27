import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";

const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center gap-2 animate-fade-in">
        <Image src={logo} alt="Logo" width={120} height={50} priority />
      </div>
    </Link>
  );
};

export default Logo;
