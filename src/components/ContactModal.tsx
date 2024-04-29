import React, { MouseEventHandler } from 'react'
import { MdCancel } from 'react-icons/md'

interface ContactModalComponent{
    isOpen: boolean,
    onClose: Function,
    children: React.ReactNode
}

function ContactModal({isOpen, onClose, children}: ContactModalComponent) {
    if (!isOpen) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center">
            <div className="px-8 py-5 rounded-lg shadow-lg bg-slate-700">
                <div className="flex justify-end">
                    <button className="text-gray-600 hover:text-gray-900 mb-5" onClick={onClose as MouseEventHandler<HTMLButtonElement>}>
                        <MdCancel size={30}/>
                    </button>
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
}

export default ContactModal