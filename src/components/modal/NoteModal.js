import React, { useState } from 'react';
import { Modal, Input } from 'antd';

const NoteModal = ({ isOpen, onHide, id, handleFunc }) => {
    const [note, setNote] = useState('');

    const handleReject = () => {
        handleFunc(id, note);  // Pass the note along with the ID
        onHide();  // Close the modal after handling the rejection
    };

    return (
        <Modal
            title="Reason for Rejection"
            visible={isOpen}
            onCancel={onHide}
            onOk={handleReject}
            okText="Submit"
            cancelText="Cancel"
        >
            <p>Please provide the reason for rejection:</p>
            <Input.TextArea
                rows={4}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Enter your reason here"
            />
        </Modal>
    );
};

export default NoteModal;
