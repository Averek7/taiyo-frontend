import React, { useState } from 'react'
import { MdCancel } from "react-icons/md";
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import ContactModal from './ContactModal';
import ContactForm from './ContactForm';
import Details from './Details';
function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const contacts = useSelector((state: RootState) => state.contacts.contacts)

    const handleClick = () => {
        setIsModalOpen(true)
    }
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='w-full h-full flex flex-col items-center gap-5 px-5'>
            <button className=' mt-10 p-5 bg-blue-300 border-2 text-2xl rounded-md font-semibold' onClick={handleClick}>Create Contact</button>
            <div className='w-full h-full flex justify-center items-center gap-3 border-2 rounded-md m-5'>
                {contacts.length ? (
                    <>
                        <Details />
                    </>
                ) : (
                    <div className='flex items-center'>
                        <MdCancel size={65} color='red' />
                        <div className='p-4 text-xl font-semibold'>
                            <p className='p-1'>No Contact Found !</p>
                            <p className='p-1'>Please Add Contacts from Create Contact Option</p>
                        </div>
                    </div>
                )}
            </div>
            <ContactModal isOpen={isModalOpen} onClose={closeModal}>
                <ContactForm closeModal={closeModal} />
            </ContactModal>
        </div>
    )
}

export default Home