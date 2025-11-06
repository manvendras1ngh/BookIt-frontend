import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { experienceApi } from "../services/api";
import type { FinalExperience, Slots } from "../utils/types";
import { ArrowLeft } from "lucide-react";
import Loader from "./Loader";

const ExperienceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [experience, setExperience] = useState<FinalExperience>();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const getExperience = async () => {
    setLoading(true);
    try {
      if (!id) throw new Error("Id not found");
      const res = await experienceApi.getExperienceById(id);
      setExperience(res);
    } catch (error) {
      console.error("Experience not found", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getExperience();
  }, [id]);

  if (!experience || loading) {
    return <Loader />;
  }

  const { experienceName, imageUrl, details, about, price } = experience;

  const slotArray: Slots[] = (experience as any).slots || [];

  const availableDates = Array.from(
    new Set(slotArray.map((s) => new Date(s.date).toDateString()))
  );

  const filteredSlots = selectedDate
    ? slotArray.filter((s) => new Date(s.date).toDateString() === selectedDate)
    : [];

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      navigate("/booking", {
        state: {
          id,
          experienceName,
          date: selectedDate,
          time: selectedTime,
          quantity,
          price,
        },
      });
    }
  };

  return (
    <>
      <Link
        to="/"
        className="flex items-center gap-2 text-sm mt-6 lg:px-12 xl:px-22 cursor-pointer"
      >
        <ArrowLeft size={15} />
        Details
      </Link>
      <div className="lg:flex lg:justify-between lg:items-start py-4 lg:px-12 xl:px-22 gap-8">
        <div className=" lg:max-w-[765px]">
          <img
            src={imageUrl}
            alt={experienceName}
            className="rounded-xl w-full max-h-[381px] object-cover"
          />

          <section className="py-6 space-y-6">
            <header>
              <h1 className="text-2xl pb-4">{experienceName}</h1>
              <p className="font-light text-[#6C6C6C]">{details}</p>
            </header>

            {/* --- Date & Time Selection Section --- */}
            <section>
              <div className="mb-6">
                <h3 className="text-xl mb-2">Choose date</h3>
                <div className="flex flex-wrap gap-4">
                  {availableDates.map((date) => (
                    <button
                      key={date}
                      onClick={() => {
                        setSelectedDate(date);
                        setSelectedTime(null);
                      }}
                      className={`cursor-pointer px-4 py-1.5 rounded-md border transition font-light text-[#838383] text-sm ${
                        selectedDate === date
                          ? "bg-[#FFD643] text-black border-none"
                          : "border-[#BDBDBD] hover:border-[#FFD643]"
                      }`}
                    >
                      {new Date(date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl mb-2">Choose time</h3>
                <div className="flex flex-wrap gap-4">
                  {filteredSlots.length > 0 ? (
                    filteredSlots.map((slot) => {
                      const available = slot.capacity - slot.booked;
                      const isSoldOut = available <= 0;
                      return (
                        <button
                          key={slot.time}
                          onClick={() =>
                            !isSoldOut && setSelectedTime(slot.time)
                          }
                          className={`cursor-pointer px-4 py-1.5 rounded-md border border-[#BDBDBD] transition flex items-center justify-between text-[#838383] font-light text-sm ${
                            isSoldOut
                              ? "bg-[#CCCCCC] text-[#838383] cursor-not-allowed"
                              : selectedTime === slot.time
                              ? "bg-[#FFD643] border-none text-black"
                              : " hover:border-[#FFD643]"
                          }`}
                        >
                          {slot.time}
                          {!isSoldOut && (
                            <span className="text-xs text-[#FF4C0A] ml-2">
                              {available} left
                            </span>
                          )}
                          {isSoldOut && (
                            <span className="text-xs ml-2 text-[#6A6A6A]">
                              Sold out
                            </span>
                          )}
                        </button>
                      );
                    })
                  ) : (
                    <p className="text-gray-500 text-sm">
                      Please select a date to view available time slots.
                    </p>
                  )}
                </div>

                <p className="text-[#838383] font-light text-xs py-2">
                  All times are in IST (GMT +5:30)
                </p>
              </div>
            </section>

            {/* --- About Section --- */}
            <section>
              <h2 className="pb-2 text-xl">About</h2>
              <p className="bg-[#EEEEEE] text-[#838383] font-light text-sm rounded-md p-3">
                {about}
              </p>
            </section>
          </section>
        </div>

        <div className="bg-[#EFEFEF] p-4 gap-4 rounded-md flex flex-col lg:max-h-65 lg:w-[387px]">
          <section className="space-y-3 font-light">
            <section className="flex justify-between">
              <p className="text-sm text-[#656565]">Starts at</p>
              <p>₹{price}</p>
            </section>

            <section className="flex justify-between">
              <p className="text-sm text-[#656565]">Quantity</p>
              <div className="flex items-center">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-1 text-xs border border-[#c9c9c9]"
                >
                  -
                </button>
                <span className="px-2 text-xs">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-1 text-xs border border-[#c9c9c9]"
                >
                  +
                </button>
              </div>
            </section>

            <section className="flex justify-between">
              <p className="text-sm text-[#656565]">Subtotal</p>
              <p className="text-sm">₹{price * quantity}</p>
            </section>

            <section className="flex justify-between">
              <p className="text-sm text-[#656565]">Taxes</p>
              <p className="text-xs">₹{59 * quantity}</p>
            </section>

            <hr className="text-[#D9D9D9]" />

            <section className="flex justify-between text-lg font-medium">
              <p>Total</p>
              <p>₹{price * quantity + 59 * quantity}</p>
            </section>
          </section>

          <button
            onClick={handleConfirm}
            disabled={!selectedDate || !selectedTime}
            className={`px-6 py-2 rounded-md text-sm ${
              selectedDate && selectedTime
                ? "bg-[#FFD643] hover:bg-yellow-500 cursor-pointer"
                : "bg-[#D7D7D7] cursor-not-allowed text-[#7F7F7F]"
            }`}
          >
            Confirm
          </button>
        </div>
      </div>
    </>
  );
};

export default ExperienceDetails;
