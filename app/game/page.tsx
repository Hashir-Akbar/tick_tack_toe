import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import TicTacToe from "@/components/ticktacktoe";


export default function GamePage() {
  return (
    <div className="grid-container">
      <div className="content">
      <Navbar />
        <main className="main-section">
          <TicTacToe/>
        </main>
      </div>
      <Footer />
    </div>
  );
}

