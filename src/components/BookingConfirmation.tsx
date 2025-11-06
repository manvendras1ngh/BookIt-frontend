import { Check } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BookingConfirmation = () => {
  const { state } = useLocation();
  const { bookingId } = state;
  return (
    <div className="flex flex-col items-center mt-16">
      <div className="bg-[#24AC39] w-15 h-15 flex items-center justify-center rounded-full">
        <Check size={35} stroke="white" strokeWidth={3} />
      </div>

      <h1 className="text-2xl mt-8">Booking Confirmed</h1>
      <p className="font-light text-[#656565] mt-2">Ref ID: {bookingId}</p>

      <Link
        to="/"
        className="bg-[#E3E3E3] text-[#656565] font-light mt-8 text-xs px-4 py-2 rounded-sm"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default BookingConfirmation;
