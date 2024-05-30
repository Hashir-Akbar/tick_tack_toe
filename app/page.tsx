"use client";
import Footer from "@/components/footer";
import Login from "@/components/Login";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  
  return (
    
    <div className="grid-container">
      <div className="content">
        <main className="main-section">
          <Login />
        </main>
        
      </div>
      <Footer />
    </div>
  );
}