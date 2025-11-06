import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Experiences from "./components/Experiences";
import ExperienceDetails from "./components/ExperienceDetails";
import Booking from "./components/Booking";
import BookingConfirmation from "./components/BookingConfirmation";

function App() {
  return (
    <Routes>
      <Route path="/experiences" element={<Layout />}>
        <Route index element={<Experiences />} />
        <Route path="/experiences/:id" element={<ExperienceDetails />} />
      </Route>
      <Route path="/booking" element={<Layout />}>
        <Route index element={<Booking />} />
        <Route path="/booking/confirm" element={<BookingConfirmation />} />
      </Route>
    </Routes>
  );
}

export default App;
