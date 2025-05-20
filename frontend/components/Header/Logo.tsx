import { poppins } from "@/utils/fonts";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"} className="flex items-center gap-2">
      <Image
        src={"/chatify.webp"}
        alt="logo"
        width={32}
        height={32}
        priority
        className="filter invert dark:invert-0 w-auto h-auto"
      />
      <h1 className={`${poppins.className} text-lg md:text-xl font-bold`}>
        Chatify
      </h1>
    </Link>
  );
};
export default Logo;
