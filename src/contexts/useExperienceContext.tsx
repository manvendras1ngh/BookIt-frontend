import { useState, useEffect, useContext, createContext } from "react";
import type { FinalExperience } from "../utils/types";
import { experienceApi } from "../services/api";

interface ExperienceContextType {
  experiences: FinalExperience[];
  experienceLoading: boolean;
  noResults: boolean;
  filterByName: (str: string) => void;
}
const ExperienceContext = createContext<ExperienceContextType | undefined>(
  undefined
);

const useExperienceContext = () => {
  const context = useContext(ExperienceContext);
  if (!context) {
    throw new Error("useDataContext must be used within a data provider");
  }
  return context;
};

export function ExperienceContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [experiences, setExperiences] = useState<FinalExperience[]>([]);
  const [filteredExperiences, setFilteredExperiences] = useState<
    FinalExperience[]
  >([]);
  const [experienceLoading, setExperienceLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const fetchExperiences = async () => {
    setExperienceLoading(true);
    try {
      const expData = await experienceApi.getAllExperiences();
      setExperiences(expData);
      setFilteredExperiences(expData);
    } catch (error) {
      console.error("Error fetching experiences!", error);
    } finally {
      setExperienceLoading(false);
    }
  };

  // Search filter
  const filterByName = (query: string) => {
    setExperienceLoading(true);

    const lower = query.toLowerCase();

    const filtered = experiences.filter((exp) =>
      exp.experienceName.toLowerCase().includes(lower)
    );

    setFilteredExperiences(filtered);
    setNoResults(filtered.length === 0);

    setExperienceLoading(false);
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  return (
    <ExperienceContext.Provider
      value={{
        experiences: filteredExperiences,
        experienceLoading,
        noResults,
        filterByName,
      }}
    >
      {children}
    </ExperienceContext.Provider>
  );
}

export default useExperienceContext;
