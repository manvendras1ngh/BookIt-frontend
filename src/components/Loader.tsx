import { LoaderCircle } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex justify-center mt-60 animate-spin">
      <LoaderCircle size={50} color="#FFD643" />
    </div>
  );
};

export default Loader;
