import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
      <Link href="/services">Services</Link>
      <Link href="/game">TicTacToe</Link>
    </nav>
  );
};

export default Navbar;