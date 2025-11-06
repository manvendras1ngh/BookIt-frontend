import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Experiences from "./components/Experiences";
import ExperienceDetails from "./components/ExperienceDetails";
import Booking from "./components/Booking";
import BookingConfirmation from "./components/BookingConfirmation";

function App() {
  return (
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
  );
}

export default App;
