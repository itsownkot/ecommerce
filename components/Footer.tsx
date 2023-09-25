import Link from "next/link";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="flex justify-center items-center gap-2 mt-16">
      <p>2023 All rigthts etc</p>
      <Link href="">
        <AiFillInstagram />
      </Link>
      <Link href="">
        <AiOutlineTwitter />
      </Link>
    </footer>
  );
};
export default Footer;
