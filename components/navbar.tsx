import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
      <Link href="/game">Game</Link>
      <Link href="/services">Services</Link>
    </nav>
  );
};

export default Navbar;