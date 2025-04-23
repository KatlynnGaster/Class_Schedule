import { useState } from 'react';

/* Call API here to update the data from the database when this form is submitted */
function EditFeature({ classData, onUpdate }) {
  const [formData, setFormData] = useState({ ...classData });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated class data:', formData);
    alert(`Class updated: ${formData.className}`);
    if (onUpdate) onUpdate(formData); // Callback to parent
  };

  const fields = [
    { name: 'className', label: 'Class Name' },
    { name: 'classDescrpt', label: 'Description' },
    { name: 'classCap', label: 'Capacity' },
    { name: 'classCode', label: 'Class Code' },
    { name: 'classSec', label: 'Section' },
    { name: 'classTerm', label: 'Term' },
  ];

  return (
    <form onSubmit={handleSubmit} className="edit-form p-3 bg-light border rounded">
      {fields.map(({ name, label }) => (
        <div className="mb-2" key={name}>
          <label className="form-label">{label}</label>
          <input
            type="text"
            name={name}
            className="form-control"
            value={formData[name] || ''}
            onChange={handleChange}
          />
        </div>
      ))}

      {/* Class Time Field */}
      <div className="mb-2">
        <label className="form-label">Class Time</label>
        <div className="d-flex">
          <input
            type="text"
            name="startHour"
            className="form-control"
            value={formData.startHour || ''}
            onChange={handleChange}
            placeholder="Start Hour"
            maxLength="2" // To limit input to two digits
            style={{ width: '60px', marginRight: '5px' }}
          />
          <input
            type="text"
            name="startMinute"
            className="form-control"
            value={formData.startMinute || ''}
            onChange={handleChange}
            placeholder="Start Minute"
            maxLength="2" // To limit input to two digits
            style={{ width: '60px', marginRight: '5px' }}
          />
          <span> - </span>
          <input
            type="text"
            name="endHour"
            className="form-control"
            value={formData.endHour || ''}
            onChange={handleChange}
            placeholder="End Hour"
            maxLength="2" // To limit input to two digits
            style={{ width: '60px', marginRight: '5px' }}
          />
          <input
            type="text"
            name="endMinute"
            className="form-control"
            value={formData.endMinute || ''}
            onChange={handleChange}
            placeholder="End Minute"
            maxLength="2" // To limit input to two digits
            style={{ width: '60px' }}
          />
        </div>
      </div>

      {/* Format Dropdown */}
      <div className="mb-2">
        <label className="form-label">Format</label>
        <select
          name="classType"
          className="form-control"
          value={formData.classType || ''}
          onChange={handleChange}
        >
          <option value="">Select format</option>
          <option value="Lecture">Lecture</option>
          <option value="Online">Online</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </div>

      <button type="submit" className="btn btn-success mt-2">
        Save
      </button>
    </form>
  );
}

export default EditFeature;
