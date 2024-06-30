import { useState } from 'react';
import './index.css';

const CreateRoomForm = () => {
    const [generatedCode, setGeneratedCode] = useState('');

    const generateCode = () => {
        const code = Math.random().toString(36).substr(2, 8).toUpperCase();
        setGeneratedCode(code);
    };

    const copyCode = () => {
        navigator.clipboard.writeText(generatedCode);
        alert("Code copied: " + generatedCode);
    };

    return (
        <div>
            <h2>Create Room</h2>
            <form id="create-room-form">
                <div className="input-group">
                    <label htmlFor="admin-name">Admin Name</label>
                    <input type="text" id="admin-name" name="admin-name" required />
                </div>
                <div className="input-group">
                    <label htmlFor="room-name">Room Name</label>
                    <input type="text" id="room-name" name="room-name" required />
                </div>
                <div className="input-group">
                    <label htmlFor="room-description">Description</label>
                    <textarea id="room-description" name="room-description" required></textarea>
                </div>
                <div className="input-group">
                    <label htmlFor="generated-code">Generated Code</label>
                    <input type="text" id="generated-code" name="generated-code" value={generatedCode} disabled />
                </div>
                <div className="button-row">
                    <button type="button" className="btn btn-danger" onClick={generateCode}>Generate Code</button>
                    <button type="button" className="btn btn-success" onClick={copyCode}>Copy Code</button>
                </div>
                <button type="submit" className="btn btn-primary">Create Room</button>
            </form>
        </div>
    );
};

export default CreateRoomForm;
