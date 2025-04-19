import React, { useState, useEffect, useRef } from 'react';
import { Calendar, X } from 'react-feather';
import './FiltersModal.scss';

const FiltersPopup = ({ isOpen, onClose, anchorRef, setFilterData }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: ''
  });
  const popupRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClear = () => {
    setFormData({
      name: '',
      description: '',
      date: ''
    });
    setFilterData({
      name: '',
      description: '',
      date: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilterData(formData);
    onClose();
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && 
        !popupRef.current.contains(event.target) && 
        !anchorRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      
      // Position the popup relative to the filter button
      if (popupRef.current && anchorRef.current) {
        const buttonRect = anchorRef.current.getBoundingClientRect();
        popupRef.current.style.top = `${buttonRect.bottom + 8}px`;
        popupRef.current.style.left = `${buttonRect.left - popupRef.current.offsetWidth + buttonRect.width}px`;
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="filters-popup" ref={popupRef}>
      <div className="filters-popup__header">
        <h2 className="filters-popup__title">Filters</h2>
        <div className="filters-popup__actions">
          <button 
            className="filters-popup__clear"
            onClick={handleClear}
          >
            Clear
          </button>
          <button 
            className="filters-popup__close"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <form className="filters-popup__form" onSubmit={handleSubmit}>
        <div className="filters-popup__form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Folder name"
            className="filters-popup__input"
          />
        </div>

        <div className="filters-popup__form-group">
          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="filters-popup__input"
          />
        </div>

        <div className="filters-popup__form-group">
          <label htmlFor="date">Date</label>
          <div className="filters-popup__date-input">
            <input
              id="date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              placeholder="DD-MM-YYYY"
              className="filters-popup__input"
            />
            {/* <Calendar size={18} className="filters-popup__calendar-icon" /> */}
          </div>
        </div>

        <div className="filters-popup__footer">
          <button 
            type="button"
            className="filters-popup__button filters-popup__button--secondary" 
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="filters-popup__button filters-popup__button--primary"
          >
            Apply
          </button>
        </div>
      </form>
    </div>
  );
};

export default FiltersPopup; 