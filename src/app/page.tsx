import Featured from "@/components/Featured";
import Offer from "@/components/Offer";
import Slider from "@/components/Slider";
import Toast from "@/components/Toast";

export default function Home() {
  return (
    <main className="scroll-smooth">
      <Slider/>
      <Featured/>
      <Offer/>
      <Toast/>
    </main>
  );
}
