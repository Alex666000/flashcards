// Логика searchParams (HW15 DZ-auto + тут) + храним бизнес-данные Redux
export const clearLocalStorage = () => {
  localStorage.removeItem('currentPage')
  localStorage.removeItem('pageSize')
  localStorage.removeItem('searchName')
  localStorage.removeItem('tabValue')
  localStorage.removeItem('sliderValue')
  localStorage.removeItem('sort')
  // или просто:
  localStorage.clear()
}
