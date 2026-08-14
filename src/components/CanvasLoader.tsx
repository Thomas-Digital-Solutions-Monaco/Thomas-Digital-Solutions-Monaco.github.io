import { Html, useProgress } from "@react-three/drei";

const CanvasLoader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-brand" />
        <p className="text-xs text-mist">{progress.toFixed(0)}%</p>
      </div>
    </Html>
  );
};

export default CanvasLoader;
