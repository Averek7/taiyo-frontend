import React, { useState } from 'react';
import EditForm from './EditForm';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../redux/contactSlice';

interface CardComponent {
  id: number;
  first: string;
  last: string;
  status: string;
}

function Cards({ id, first, last, status }: CardComponent) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditClose = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(deleteContact(id));
  };

  return (
    <div className="border-2 border-white rounded-md pt-10 pb-10">
      <div className="flex flex-col items-center">
        <p className="text-xl font-semibold">
          {first} {last}
        </p>
        <span className={`font-semibold text-lg ${status === 'active' ? `text-green-700` : `text-red-700`}`}>
          {status}
        </span>
      </div>

      <div className="flex gap-2 justify-center items-center mt-5">
        <button className="px-10 py-1 bg-blue-300" onClick={handleEdit}>
          Edit
        </button>
        <button className="px-10 py-1 bg-red-300" onClick={handleDelete}>
          Delete
        </button>
      </div>

      {isEditing && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-md">
            <EditForm id={id} first={first} last={last} state={status} closeModal={handleEditClose} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Cards;
