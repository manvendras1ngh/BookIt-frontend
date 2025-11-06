import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Experiences from "./components/Experiences";
import ExperienceDetails from "./components/ExperienceDetails";
import Booking from "./components/Booking";
import BookingConfirmation from "./components/BookingConfirmation";
import { ExperienceContextProvider } from "./contexts/useExperienceContext";

function App() {
  return (
    <ExperienceContextProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Experiences />} />
          <Route path=":id" element={<ExperienceDetails />} />

          <Route path="booking">
            <Route index element={<Booking />} />
            <Route path="confirm" element={<BookingConfirmation />} />
          </Route>
        </Route>
      </Routes>
    </ExperienceContextProvider>
  );
}

export default App;
