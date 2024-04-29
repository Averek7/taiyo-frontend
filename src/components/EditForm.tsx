import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateContact } from "../redux/contactSlice";

interface EditFormProps {
  id: number;
  first: string;
  last: string;
  state: string;
  closeModal: () => void;
}

const EditForm = ({id, first, last, state, closeModal}: EditFormProps) => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(first);
  const [lastName, setLastName] = useState(last);
  const [status, setStatus] = useState(state);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "firstName") {
      setFirstName(value);
    } else if (name === "lastName") {
      setLastName(value);
    } else if (name === "status") {
      setStatus(value);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateContact({ id, firstName, lastName, status }));
    closeModal();
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <div className="border-2 rounded-md p-5">
        <p className="font-semibold text-2xl text-center mt-3 mb-5">
          Edit Contact
        </p>
        <form onSubmit={handleFormSubmit}>
          <div className="flex flex-col gap-4 items-center justify-center text-xl font-semibold">
            <div>
              <label>First Name: </label>
              <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={handleChange}
                className="px-5 py-1 mx-2"
              />
            </div>

            <div>
              <label>Last Name: </label>
              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={handleChange}
                className="px-5 py-1 mx-2"
              />
            </div>

            <div className="flex items-center justify-center gap-5">
              <label>Status</label>
              <div className="flex flex-col">
                <div>
                  <input
                    type="radio"
                    name="status"
                    id="active"
                    value="active"
                    checked={status === "active"}
                    onChange={handleChange}
                  />
                  <label htmlFor="active">Active</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="status"
                    id="inactive"
                    value="inactive"
                    checked={status === "inactive"}
                    onChange={handleChange}
                  />
                  <label htmlFor="inactive">Inactive</label>
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-5 py-2 bg-blue-300 border-2 text-xl rounded-md font-semibold text-center mt-5"
          >
            Save Contact
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
