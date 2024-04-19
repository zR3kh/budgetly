import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import './ActivityBoard.css';
import FilterBoard from "./filterBoard/FilterBoard";

export default function ActivityBoard() {

  const [expenses, setExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState("Tout");
  const [searchFieldValue, setSearchFieldValue] = useState('');
  const [isFilterActive, setIsFilterActive] = useState(false);
  
  /** Get API data */
  useEffect(() => {
    (async () => {
      const data = await axios.get('http://localhost:8080/api/v1');
      setExpenses(data.data);
      setTotalExpenses(data.data);
    })();
  }, [])

  /** Detect click outside the popup to close it */
  useEffect(() => {
    document.addEventListener('click', handlePopupClick);
    return () => {
      document.removeEventListener('click', handlePopupClick);
    }
  }, [showFilterPopup])

  /** Call parseSearch each time input filter is modified */
  useEffect(() => {
    parseSearch(searchFieldValue);
  }, [searchFieldValue])

  /**
   * Capitalize first letter and lowercase the rest
   * @param {string} word 
   * @returns {string}
   */
  const formatString = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  /**
   * Only show the day and month
   * @param {date} dateToParse 
   * @returns {date}
   */
  const formatDate = (dateToParse) => {
    const date = new Date(dateToParse);
    return date.getDate() + " " + date.toLocaleString('default', {month: 'long'}).charAt(0).toUpperCase() + date.toLocaleString('default', {month: 'long'}).slice(1);;
  }

  /**
   * Get a specific color based on input
   * @param {string} category 
   * @returns {string} 
   */
  const getCategoryColor = (category) => {
    switch(category) {
      case 'FOOD':
        return 'red';
      case 'TRANSPORT':
        return 'blue';
      case 'HOUSING':
        return 'black';
      case 'HEALTH':
        return 'green';
      case 'TRAVEL':
        return 'yellow';
    }
  }

  /** Show or hide the filter popup */
  const showPopup = () => {
    setShowFilterPopup(!showFilterPopup);
  }

  /**
   * Update expenses state after a filter operation
   * @param {array} expenses 
   */
  const filterExpenses = (expenses) => {
    setExpenses(expenses);
    setFilteredExpenses(expenses);
  }

  /**
   * Update the filter state
   * @param {boolean} filter 
   */
  const updateActiveFilter = (filter) => {
    setIsFilterActive(filter);
  }

  /**
   * Update popup title based on last filter used
   * @param {string} title 
   */
  const updatePopupTitle = (title) => {
    setPopupTitle(title);
  }

  /**
   * Close popup if click outside of it
   * @param {event} e 
   */
  const handlePopupClick = (e) => {
    if (showFilterPopup && (!e.target.closest('.popup') && !e.target.closest('.popupButton'))) {
      setShowFilterPopup(false);
    }
  }

  /**
   * Update input value and call the parsing method
   * @param {event} e 
   */
  const handleSearch = (e) => {
    setSearchFieldValue(e.target.value);
  }

  /**
   * Return a filtered list of elements that contain the word
   * @param {string} word 
   */
  const parseSearch = (word) => {
    setExpenses(() => {
        if (isFilterActive) {
          let filteredExpensesCopy = filteredExpenses;
          return filteredExpensesCopy.filter(expense => expense.name.includes(word));
        } else {
          let totalExpensesCopy = totalExpenses;
          return totalExpensesCopy.filter(expense => expense.name.includes(word));
        }
      
    })
  }

  return (
    <div className="mt-3">
      <div className="text-center">
        <input 
          className="w-75 rounded border border-secondary p-2 mb-3 mt-1" 
          type="text" 
          placeholder="Recherchez par nom..."
          value={searchFieldValue}
          onChange={handleSearch}
        />
      </div>
      <div className="d-flex flex-column align-items-center">
        <div className="d-flex flex-column w-75">
          <div className="mb-2 fw-bold" style={{color: '#001435', fontSize: '1.1rem'}}>Filtrage</div>
          <div className="d-flex position-relative">
            <button 
              style={{padding: '10px 15px 10px 15px', backgroundColor: '#B9EFFC', color: '#001435', borderRadius: '20px', border: 'none'}} 
              onClick={showPopup}
              className='popupButton'
              >{popupTitle}</button>
            {showFilterPopup && <FilterBoard
                                   searchFieldValue={searchFieldValue} 
                                   filterExpenses={filterExpenses} 
                                   totalExpenses={totalExpenses} 
                                   updatePopupTitle={updatePopupTitle}
                                   updateActiveFilter={updateActiveFilter}
                                />}
          </div>
        </div>
      </div>

      <div className="d-flex flex-column align-items-center mt-3">
        {expenses.map(el => {
          return (
            <div className="d-flex justify-content-between w-75 border m-2 rounded p-3 align-items-center">
              <div className="d-flex align-items-center">
                <div className="d-flex align-items-center justify-content-center" 
                  style={{borderRadius: '30px', backgroundColor: getCategoryColor(el.categoryExpense), width: '90px', height: '35px', marginRight: '20px'}}>
                  <div className="fw-bold" style={{color: 'white', fontSize: '0.9rem'}}>{formatString(el.categoryExpense)}</div>
                </div>
                <div className="d-flex flex-column">
                  <div className="fw-bold" style={{fontSize: '1.2rem'}}>{el.name}</div>
                  <div style={{fontSize: '0.9rem'}}>{formatDate(el.date)}</div>
                </div>
              </div>
              <div className="fw-bold" style={{fontSize: '1.2rem'}}>-{el.cost}€</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
