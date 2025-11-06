import { Link } from "react-router-dom";
import type { FinalExperience } from "../utils/types";
import Loader from "./Loader";
import useExperienceContext from "../contexts/useExperienceContext";

const ExperienceCard = ({
  experiences,
}: {
  experiences: FinalExperience[];
}) => {
  return experiences.map((e) => (
    <div key={e.id} className="bg-[#F0F0F0]/90 rounded-xl">
      <img
        src={e.imageUrl}
        alt={e.experienceName}
        className="rounded-t-xl w-full md:h-[170px] object-cover max-h-70"
      />
      <div className="p-3 space-y-4 flex flex-col md:h-50 xl:h-auto">
        <section className="flex justify-between items-center">
          <h1 className="text-lg">{e.experienceName}</h1>
          <p className="bg-[#D6D6D6] px-2 py-0.5 rounded-sm text-sm">
            {e.location}
          </p>
        </section>

        <p className="text-xs grow">{e.details}</p>

        <section className="flex justify-between items-center">
          <p className="flex items-center">
            <span className="text-sm pr-1">From</span>
            <span className="text-xl">₹{e.price}</span>
          </p>
          <Link
            to={`/${e.id}`}
            className="bg-[#FFD643] px-2 py-1.5 rounded-sm text-xs"
          >
            View Details
          </Link>
        </section>
      </div>
    </div>
  ));
};
const Experiences = () => {
  const { experiences, experienceLoading, noResults } = useExperienceContext();

  if (experienceLoading) return <Loader />;
  if (noResults)
    return (
      <div className="flex justify-center mt-60">
        <h1 className="text-xl font-light">No data found!</h1>
      </div>
    );

  return (
    <section className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 md:p-12 xl:px-22 py-4">
      <ExperienceCard experiences={experiences} />
    </section>
  );
};

export default Experiences;
