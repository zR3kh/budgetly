import { useEffect, useState } from "react"

export default function FilterBoard({searchFieldValue, filterExpenses, totalExpenses, updatePopupTitle, updateActiveFilter}) {

  const [selectedFilter, setSelectedFilter] = useState();

  useEffect(() => {
    setSelectedFilter(localStorage.getItem('selectedFilter'));
  }, [])

  const filterAll = () => {
    filterExpenses(totalExpenses.filter(expense => expense.name.includes(searchFieldValue)));
    updateActiveFilter(false);
  }
  const filterSevenDays = () => {
    updateActiveFilter(true);
    const today = new Date();
    const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    filterExpenses(totalExpenses.filter(date => {
      if (date.name.includes(searchFieldValue)) {
        const toFilterDate = new Date(date.date);
        if (toFilterDate.getFullYear() == lastWeek.getFullYear()) {
          return toFilterDate >= lastWeek;
        }
      }
    }));
  }
  const filterCurrentMonth = () => {
    updateActiveFilter(true);
    const today = new Date();
    const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    filterExpenses(totalExpenses.filter(date => {
      if (date.name.includes(searchFieldValue)) {
        const toFilterDate = new Date(date.date);
        if (toFilterDate.getFullYear() == currentMonth.getFullYear()) {
          return toFilterDate.getMonth() >= currentMonth.getMonth();
        }
      }
    }));
  }
  const filterPastMonth = () => {
    updateActiveFilter(true);
    const today = new Date();
    const previousMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    filterExpenses(totalExpenses.filter(date => {
      if (date.name.includes(searchFieldValue)) {
        const toFilterDate = new Date(date.date);
        if (toFilterDate.getFullYear() == currentMonth.getFullYear()) {
          return toFilterDate >=previousMonth && toFilterDate < currentMonth;
        }
      }
    }));
  }

  const handleFilter = (filter) => {
    setSelectedFilter(filter);
    localStorage.setItem('selectedFilter', filter);
    switch(filter) {
      case 'all':
        filterAll(totalExpenses);
        updatePopupTitle("Tout");
        break;
      case 'seven-days':
        filterSevenDays(totalExpenses);
        updatePopupTitle("Semaine dernière")
        break;
      case 'current-month':
        filterCurrentMonth(totalExpenses);
        updatePopupTitle("Mois courant")
        break;
      case 'past-month': 
        filterPastMonth(totalExpenses);
        updatePopupTitle("Mois dernier");
        break;
    }
  }

  return (
    <div style={{top: '100%', backgroundColor: 'white'}} className="popup position-absolute border p-3 mt-3 rounded w-75">
      <div style={{fontSize: '1.2rem', color: '#6A7476'}}>Date</div>
      <div>
        <div className="mb-2 mt-2">
          <input 
            style={{margin: '0.4rem'}} 
            type="radio" 
            name="all" 
            id="all" 
            value="all"
            checked={selectedFilter === 'all'}
            onChange={() => handleFilter('all')}
          />
          <label htmlFor="all">Tout</label>
        </div>
        <div className="mb-2 mt-2">
          <input 
            style={{margin: '0.4rem'}} 
            type="radio" 
            name="seven-days" 
            id="seven-days" 
            value="seven-days"
            checked={selectedFilter === 'seven-days'}
            onChange={() => handleFilter('seven-days')}
          />
          <label htmlFor="seven-days">Semaine dernière</label>
        </div>
        <div className="mb-2 mt-2">
          <input 
            style={{margin: '0.4rem'}} 
            type="radio" 
            name="current-month" 
            id="current-month" 
            value="current-month"
            checked={selectedFilter === 'current-month'}
            onChange={() => handleFilter('current-month')}
          />
          <label htmlFor="current-month">Mois courant</label>
        </div>
        <div className="mb-2 mt-2">
          <input 
            style={{margin: '0.4rem'}} 
            type="radio" 
            name="past-month" 
            id="past-month" 
            value="past-month"
            checked={selectedFilter === 'past-month'}
            onChange={() => handleFilter('past-month')}
          />
          <label htmlFor="past-month">Mois dernier</label>
        </div>
      </div>
    </div>
  )
}
