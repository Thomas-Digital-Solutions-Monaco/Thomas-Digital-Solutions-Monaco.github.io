import { useReveal } from "../lib/useReveal";
import LiveRadar from "../components/LiveRadar";

const Live = () => {
  const { ref, shown } = useReveal<HTMLDivElement>();

  return (
    <section id="live" data-snap className="section scroll-mt-24 pb-4 pt-2 sm:pb-8">
      <div ref={ref} className={shown ? "fade-up" : "opacity-0"}>
        <LiveRadar />
      </div>
    </section>
  );
};

export default Live;
