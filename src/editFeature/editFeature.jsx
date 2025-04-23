import { useState } from 'react';

function EditFeature({ classData, onUpdate }) {
  const [formData, setFormData] = useState({ ...classData });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated class data:', formData);
    alert(`Class updated: ${formData.className}`);
    if (onUpdate) onUpdate(formData); // callback to parent
  };

  const fields = [
    { name: 'className', label: 'Class Name' },
    { name: 'classDescrpt', label: 'Description' },
    { name: 'classCap', label: 'Capacity' },
    { name: 'classCode', label: 'Class Code' },
    { name: 'classType', label: 'Type' },
    { name: 'classSec', label: 'Section' },
    { name: 'classTerm', label: 'Term' }
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
            value={formData[name]}
            onChange={handleChange}
          />
        </div>
      ))}

      <button type="submit" className="btn btn-success mt-2">
        Save
      </button>
    </form>
  );
}

export default EditFeature;
