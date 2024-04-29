import React from "react";
import Cards from "./Cards";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { MdCancel } from "react-icons/md";



function Details() {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);

  return (
    <div className="w-full h-full">
      {contacts.length === 0 ? (
        <div className="w-full h-full flex justify-center items-center">
          <MdCancel size={65} color="red" />
          <div className="p-4 text-xl font-semibold">
            <p className="p-1">No Contact Found !</p>
            <p className="p-1">
              Please Add Contacts from Create Contact Option
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-5">
          {contacts.map((contact) => (
            <Cards
              id={contact.id}
              first={contact.firstName}
              last={contact.lastName}
              status={contact.status}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Details;
