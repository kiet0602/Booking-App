import React, { useEffect, useState } from "react";
import Perks from "../Perks";
import axios from "axios";
import UploadedPhotos from "../UploadedPhotos";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";

const PlaceFormPage = () => {
  const { id } = useParams();
  console.log(id);
  const [title, setTitle] = useState("");
  const [address, SetAddress] = useState("");
  const [photos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/place/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      SetAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(head, description) {
    return (
      <>
        {inputHeader(head)}
        {inputDescription(description)}
      </>
    );
  }

  const savePlace = async (ev) => {
    ev.preventDefault();
    const placeData = {
      title,
      address,
      photos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    if (id) {
      //update
      await axios.put("/place", {
        id,
        ...placeData,
      });
      setRedirect(true);
    } else {
      //new place
      await axios.post("/place", placeData);
      setRedirect(true);
    }
  };
  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <>
      <div>
        <AccountNav />
        <form onSubmit={savePlace}>
          {preInput("Title", "Title for you place. should be short and catchy")}
          <input
            type="text"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            placeholder="Title"
          />

          {preInput("Address", "Address for you place")}
          <input
            type="text"
            value={address}
            onChange={(ev) => SetAddress(ev.target.value)}
            placeholder="Address"
          />

          {preInput("Photos", "More = better")}
          <UploadedPhotos photos={photos} onChange={setAddedPhotos} />

          {preInput("Description", "Description of place")}
          <textarea
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />

          {preInput("Perks", " Select all the perks of yours")}
          <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            <Perks selected={perks} onChange={setPerks} />
          </div>

          {preInput("Extra Info", "House roles")}
          <textarea
            value={extraInfo}
            onChange={(ev) => setExtraInfo(ev.target.value)}
          />

          <h2 className="text-2xl mt-4">Check in&out time</h2>
          <p className="text-gray-500 text-sm">
            Add check in and out times, remember to have some time window for
            cleaning the between guests
          </p>
          <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
            <div>
              <h3 className="mt-2 -mb-1">Check in time</h3>
              <input
                type="text"
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
                placeholder="02:00 pm"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Check out time</h3>
              <input
                type="text"
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
                placeholder="09:00 "
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Max number guest</h3>
              <input
                type="number"
                value={maxGuests}
                onChange={(ev) => setMaxGuests(ev.target.value)}
                placeholder="10"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Price per night</h3>
              <input
                type="number"
                value={price}
                onChange={(ev) => setPrice(ev.target.value)}
                placeholder="10"
              />
            </div>
          </div>
          <button className="my-4 primary">Save</button>
        </form>
      </div>
    </>
  );
};

export default PlaceFormPage;
