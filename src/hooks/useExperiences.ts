import { useEffect, useState } from "react";
import type { FinalExperience } from "../utils/types";

import { experienceApi } from "../services/api";

export const useExperiences = () => {
  const [experiences, setExperiences] = useState<FinalExperience[]>([]);
  const [experienceLoading, setExperienceLoading] = useState(false);

  const fetchExperiences = async () => {
    setExperienceLoading(true);
    try {
      const expData = await experienceApi.getAllExperiences();
      setExperiences(expData);
    } catch (error) {
      console.error("Error fetching experiences!", error);
    } finally {
      setExperienceLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  return { experiences, setExperiences, experienceLoading };
};
