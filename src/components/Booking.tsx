import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { bookingApi, promoApi } from "../services/api";
import toast from "react-hot-toast";

const Booking = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id, experienceName, date, time, quantity, price } = state || {};

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const taxes = 59 * quantity;
  const subtotal = price * quantity;
  const total = subtotal + taxes - discount;

  const handlePromoApply = async () => {
    try {
      const res = await promoApi(promo);
      if (res.valid) {
        setDiscount(res.discountAmount);
        toast.success(`Promo applied! ₹${res.discountAmount} off`);
      } else {
        toast.error("Invalid or expired promo code.");
        setDiscount(0);
      }
    } catch (error) {
      console.error("Promo validation failed:", error);
      setDiscount(0);
    }
  };

  const handleConfirm = async () => {
    try {
      setLoading(true);

      const res = await bookingApi({
        experienceId: id,
        fullName,
        email,
        date,
        time,
        quantity,
        totalPrice: total,
        discountApplied: discount,
        promoCode: promo,
      });
      navigate("/booking/confirm", { state: { bookingId: res } });
    } catch (error) {
      console.error("Booking failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const formValid = fullName && email && agree;

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm px-6 mt-6 lg:px-12"
      >
        <ArrowLeft size={15} />
        Checkout
      </button>

      <div className="flex flex-col md:flex-row md:justify-between gap-8 px-6 lg:px-12 mt-8">
        {/* Left Form Section */}
        <div className="bg-[#EFEFEF] p-6 rounded-md flex flex-col gap-4 w-full md:max-w-[740px] lg:max-h-[200px]">
          <section className="flex flex-col gap-4 lg:flex-row">
            <label className="text-light text-[#5B5B5B] text-sm flex flex-col gap-1 flex-1">
              Full Name
              <input
                type="text"
                placeholder="Your name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full text-black bg-[#DDD] border border-[#DDD] rounded-md px-3 py-2 text-sm focus:outline-none"
              />
            </label>

            <label className="text-light text-[#5B5B5B] text-sm flex flex-col gap-1 flex-1">
              Email
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-black bg-[#DDD] border border-[#DDD] rounded-md px-3 py-2 text-sm focus:outline-none"
              />
            </label>
          </section>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Promo code"
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              className=" flex-1 text-black bg-[#DDD] border border-[#DDD] rounded-md px-3 py-2 text-sm focus:outline-none"
            />
            <button
              type="button"
              onClick={handlePromoApply}
              disabled={!promo}
              className={`px-4 py-2 rounded-md text-sm font-light bg-black text-white hover:bg-zinc-800 cursor-pointer ${
                !promo ? "cursor-not-allowed" : ""
              }`}
            >
              Apply
            </button>
          </div>

          <label className="flex items-center text-xs text-[#5B5B5B] font-light">
            <input
              type="checkbox"
              checked={agree}
              onChange={() => setAgree(!agree)}
              className="mr-2"
            />
            I agree to the terms and safety policy
          </label>
        </div>

        {/* Right Summary Section */}
        <div className="bg-[#EFEFEF] p-6 rounded-md w-full lg:w-[387px]">
          <section className="space-y-2 text-sm font-light">
            <div className="flex justify-between">
              <p className="text-[#656565]">Experience</p>
              <p>{experienceName}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-[#656565]">Date</p>
              <p>{date}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-[#656565]">Time</p>
              <p>{time}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-[#656565]">Qty</p>
              <p>{quantity}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-[#656565]">Subtotal</p>
              <p>₹{subtotal}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-[#656565]">Taxes</p>
              <p>₹{taxes}</p>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <p>Discount</p>
                <p>-₹{discount}</p>
              </div>
            )}
            <hr className="text-[#656565]" />
            <div className="flex justify-between text-lg font-medium">
              <p>Total</p>
              <p>₹{total}</p>
            </div>
          </section>

          <button
            disabled={!formValid || loading}
            onClick={handleConfirm}
            className={`w-full mt-4 py-2 rounded-md text-sm font-medium cursor-pointer ${
              formValid && !loading
                ? "bg-[#FFD643] hover:bg-yellow-400"
                : "bg-[#D7D7D7] text-[#7F7F7F] cursor-not-allowed"
            }`}
          >
            {loading ? "Processing..." : "Pay and Confirm"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Booking;
