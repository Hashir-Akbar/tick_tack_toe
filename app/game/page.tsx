import TicTacToe from "@/components/ticktacktoe";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";


export default function GamePage() {
  return (
    <div className="grid-container">
      <div className="content">
        <div className="ticktactoe">Tic-Tac-Toe</div>
      <Navbar />
        <main className="main-section">
          <TicTacToe/>
        </main>
      </div>
      <Footer />
    </div>
  );
}

