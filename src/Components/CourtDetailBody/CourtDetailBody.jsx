import React, { useState, useEffect } from "react";
import IMG from "@assets/throwing-basketball.jpg";
import "./CourtDetailBody.css";
import editIcon from "@assets/edit.svg";
import filesIcon from "@assets/filesimg.svg";
import addIcon from "@assets/addIcon2.svg";
import calenderIcon from "@assets/calender.svg";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Modal from "../Common/Modal/Modal";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import closeIcon from "@assets/close.svg";
import forward from "@assets/forward.svg";
import CustomInput from "../Common/CustomInput/CustomInput";
import { useParams } from "react-router-dom";
import AxiosInstance from "../../Config/apicall";
import { TIMINGS } from "../../Constants/constants";
import { ErrorToast, successToast } from "../../Plugins/Toast/Toast";
import { useDispatch } from "react-redux";
import { showorhideLoader } from "../../redux/generalSlice";

function CourtDetailBody() {
  const { id } = useParams();
  const [openTimeslot, setTimeSlot] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
    key: "selection",
  });
  const [singleCourtData, setCourtData] = useState({});
  const [calenderOpen, setCalenderOpen] = useState(false);
  const [opendd, setOpendd] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [filterdTimings, setFilteredTimings] = useState(TIMINGS);
  const [cost, setCost] = useState("");
  const [bookingModal, setBookingModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().substr(0, 10)
  ); //yy-mm-dd
  const [slotsData, setSlotsData] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    getSingleCourtData();
  }, []);
  useEffect(() => {
    getslotsdata();
  }, [selectedDate]);

  const getslotsdata = () => {
    dispatch(showorhideLoader(true));
    AxiosInstance.get("/users/getslotsdata", {
      params: { courtId: id, date: selectedDate },
    })
      .then((res) => {
        setSlotsData(res.data);
        dispatch(showorhideLoader(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(showorhideLoader(false));
        ErrorToast("something went wrong");
      });
  };
  const getSingleCourtData = () => {
    AxiosInstance.get("/users/getsinglecourtdata", { params: { courtId: id } })
      // AxiosInstance({
      //   url:,
      //   method:'',
      //   params:{}
      // })
      .then((resp) => {
        setCourtData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const selectSlot = (e, slot) => {
    e.stopPropagation();
    setSelectedSlots([...selectedSlots, slot]);

    const newfilter = filterdTimings.filter(
      (element) => element.id !== slot.id
    );
    setFilteredTimings(newfilter);
    setOpendd(false);
  };
  const createCourtshedules = () => {
    dispatch(showorhideLoader(true));
    AxiosInstance({
      url: "/admin/createschedules",
      method: "post",
      data: {
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        cost: cost,
        selectedSlots: selectedSlots,
        courtId: id,
      },
    })
      .then((res) => {
        successToast("court created successfully");
        setTimeSlot(false);
        dispatch(showorhideLoader(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(showorhideLoader(false));
        ErrorToast(err.response.data?.message);
      });
  };
  const setorDeselectslot = (slot) => {
    if (bookedSlots.find((ele) => ele._id === slot._id)) {
      const temp = bookedSlots.filter((ele) => ele._id !== slot._id);
      setBookedSlots(temp);
    } else {
      setBookedSlots([...bookedSlots, slot]);
    }
  };

  async function initiateBooking() {
    const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
        ErrorToast("Razorpay SDK failed to load. Are you online?");
        return;
    }
const slotIds=bookedSlots.map((ele)=>{return ele._id})
    // creating a new order
    const result = await AxiosInstance.post("/payments/orders",{courtId:id,slotIds:slotIds});

    if (!result) {
        alert("Server error. Are you online?");
        return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency ,receipt} = result.data;

    const options = {
        key: process.env.REACT_APP_RP_KEY_ID,
        amount: amount.toString(),
        currency: currency,
        name: "green grid pvt.ltd",
        description: "booking payments ",
        image: null,
        order_id: order_id,
        handler: async function (response) {
            const data = {
                orderCreationId: order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
                receipt,
                slotIds,
                courtId:id,
                date:selectedDate
            };

            const result = await AxiosInstance.post("/payments/verify", data);
setBookingModal(false)
getslotsdata()
            successToast(result.data.msg);
        },
        prefill: {
            name: "Soumya Dey",
            email: "SoumyaDey@example.com",
            contact: "9999999999",
        },
        notes: {
            address: "Soumya Dey Corporate Office",
        },
        theme: {
            color: "#61dafb",
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
}
function loadScript(src) {
  return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
          resolve(true);
      };
      script.onerror = () => {
          resolve(false);
      };
      document.body.appendChild(script);
  });
}

  return (
    <div className="details-page ">
      <div className="details-image-box">
        <img className="details-main-img" src={IMG} alt="" />
        <div className="details-image-content d-flex justify-content-between p-4">
          <div className="d-flex flex-column justify-content-center text-white">
            <h3>{singleCourtData.name}</h3>
            <p>{singleCourtData.location} </p>
            <p>{singleCourtData.type} </p>
          </div>
          <div className="align-self-end d-flex gap-3">
            <button onClick={() => setBookingModal(true)}>Book</button>
            <button>
              <img src={editIcon} alt="" height={"20px"} />
            </button>
            <button>
              <img src={filesIcon} alt="" height={"20px"} />
            </button>
            <button>
              <img
                src={addIcon}
                alt=""
                height={"20px"}
                onClick={() => setTimeSlot(true)}
              />
            </button>
          </div>
        </div>
      </div>
      <ReactQuill
        readOnly={true}
        theme="bubble"
        className=""
        value={singleCourtData.description}
      />
      {openTimeslot && (
        <Modal
          heading={"Add new time slot data"}
          closeModal={() => setTimeSlot(false)}
        >
          <div className="timeslot-select-modal p-3">
            <label htmlFor="">
              Select Date Range
              <img
                src={calenderIcon}
                alt=""
                height={"20px"}
                onClick={() => setCalenderOpen(true)}
              />
            </label>
            <div className="d-flex gap-2 align-items-center mt-2">
              <div className="timeslot-date flex-grow-1 border border-1 rounded-2 p-2">
                {new Date(dateRange.startDate).toLocaleDateString()}
              </div>
              <img src={forward} alt="" height={"20px"} />
              <div className="timeslot-date flex-grow-1 border border-1 rounded-2 p-2">
                {new Date(dateRange.endDate).toLocaleDateString()}
              </div>
            </div>
            {calenderOpen && (
              <div className="calender-box">
                <img
                  src={closeIcon}
                  alt=""
                  height={"20px"}
                  className="modal-close-icon"
                  onClick={() => setCalenderOpen(false)}
                />
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setDateRange(item.selection)}
                  moveRangeOnFirstSelection={false}
                  ranges={[dateRange]}
                />

                <div className="d-flex justify-content-end gap-3 p-2 mt-2">
                  <button
                    className="common-button "
                    onClick={() => setCalenderOpen(false)}
                  >
                    Select
                  </button>
                </div>
              </div>
            )}
            <div className="mt-3">
              <CustomInput
                name={"cost"}
                label={"Cost"}
                value={cost}
                onchange={(e) => setCost(e.target.value)}
              />
            </div>
            <div
              className="range-label position-relative  mt-3"
              onClick={() => setOpendd(true)}
            >
              Select Slots
              {opendd && (
                <ul className="slot-list">
                  {filterdTimings.map((slot) => (
                    <li onClick={(e) => selectSlot(e, slot)}>{slot.name}</li>
                  ))}
                </ul>
              )}
            </div>
            <div className="d-flex gap-2 mt-2 flex-wrap py-2">
              {selectedSlots.map((slot) => (
                <span className="border border-1 rounded-2 px-2 py-1">
                  {slot.name}
                </span>
              ))}
            </div>
            <div className="d-flex justify-content-end gap-3 py-2 mt-2">
              <button className="common-button bg-black text-white">
                Cancel
              </button>
              <button className="common-button " onClick={createCourtshedules}>
                Create
              </button>
            </div>
          </div>
        </Modal>
      )}

      {bookingModal && (
        <Modal
          heading={"Booking slots"}
          closeModal={() => setBookingModal(false)}
        >
          <div className="p-3 imeslot-select-modal h-100 d-flex flex-column">
            <label htmlFor="" className="mt-1">
              Start date :{" "}
            </label>
            <input
              type="date"
              className="p-1 px-2 mx-2 border roounded-1"
              value={selectedDate}
              min={new Date().toISOString().substr(0, 10)}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <label htmlFor="">Available Slots</label>
            <div className="d-flex flex-wrap gap-2 mt-1">
              {/* notavaialable */}
              {slotsData.map((slot) => (
                <span
                  className={`${
                    bookedSlots.find((ele) => ele._id === slot._id)
                      ? "bg-info-subtle "
                      : slot.bookedBy
                      ? "notavaialable"
                      : "availbleslots"
                  }  px-2 py-1 mt-2`}
                  onClick={() => !slot.bookedBy && setorDeselectslot(slot)}
                >
                  {slot.slot.name}
                </span>
              ))}
            </div>
            <div className="d-flex justify-content-end gap-3 py-2 mt-2">
              <button className="common-button bg-black text-white">
                {" "}
                cancel
              </button>

              <button className="common-button" onClick={initiateBooking}>
                Book
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default CourtDetailBody;
