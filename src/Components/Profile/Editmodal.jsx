import React from 'react';
import { FaTimes } from "react-icons/fa";

const EditModal = ({ title, onClose, onSave, children }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[50%]">
                <h2 className="text-xl font-bold mb-4 flex items-center justify-between">
                    {title}
                    <FaTimes
                        className="cursor-pointer text-red-500"
                        onClick={onClose}
                    />
                </h2>
                <div className="space-y-4 overflow-y-auto custom-scrollbar" style={{ maxHeight: '400px', paddingRight: '10px' }}>
                    {children}
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <button onClick={onClose} className="mr-5 font-semibold text-blue-600 rounded-lg">Cancel</button>
                    <button
                        onClick={onSave}
                        className="px-3 py-2 bg-blue-600 text-white rounded-lg"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;