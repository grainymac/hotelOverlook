import "./css/styles.css";
import "./css/utilities.css";
import { Customer } from "./classes/Customer";
import { Room } from "./classes/Room";
import { Booking } from "./classes/Booking";
import { fetchData } from "./apiCalls";
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import "./images/turing-logo.png";
import "./images/pexels-pixabay-258154.jpg";
import { domUpdates } from './domUpdates.js'
// import { bookingsData } from "./data/bookingsData";
import domUpdates from "./domUpdates";

//  =========================================================================QUERY SELECTORS
const navHomeBtn = document.querySelector("#navHomeBtn");
const navDashboardBtn = document.querySelector("#navDashboardBtn");
const navBookBtn = document.querySelector("#navBookBtn");

const homeDisplay = document.querySelector("#homeDisplay");
const dashboardDisplay = document.querySelector("#dashboardDisplay");
const bookDisplay = document.querySelector("#bookDisplay");

const headDashboard = document.querySelector("#headDashboard");
const bodyDashboard = document.querySelector("#bodyDashboard");
const footerDashboard = document.querySelector("#footerDashboard");

const dashboardContainer = document.querySelector("#dashboardContainer");
const bookContainer = document.querySelector("#bookContainer");
const customerBookingHistory = document.querySelector("#customerBookingHistory");

const bookingOptions = document.querySelector("#bookingOptions");
const startDate = document.querySelector("#startDate");
const roomTypes = document.querySelector("#roomTypes");
const bookSearchBtn = document.querySelector("#bookSearchBtn");

const searchMsg = document.querySelector("#searchMsg");
const totalCost = document.querySelector("#totalCost");
const headDashboardContainer = document.querySelector("#headDashboardContainer");
const cards = document.querySelector("#cards");

const currentUsername = document.querySelector("#currentUsername");
const currentPassword = document.querySelector("#currentPassword");
const loginBtn = document.querySelector("#loginBtn");
const logoutBtn = document.querySelector("#logoutBtn");

//  =======================================================================GLOBAL VARIABLES
let allCustomerData = [];
let allRoomData = [];
let allBookingData = [];
let currentCustomer = "";
let currentManager = "";

//  ========================================================================= FETCH CALLS
const loadData = () => {
  const getAllCustomers = fetchData("http://localhost:3001/api/v1/customers", "GET");
  const getAllRooms = fetchData("http://localhost:3001/api/v1/rooms", "GET");
  const getbookings = fetchData("http://localhost:3001/api/v1/bookings", "GET");
  Promise.all([getAllCustomers, getAllRooms, getbookings])
    .then((data) => {
      allCustomerData = data[0].customers.map((customer) => new Customer(customer));
      allRoomData = data[1].rooms.map((room) => new Room(room));
      allBookingData = data[2].bookings.map((booking) => new Booking(booking));
      allBookingData.map((booking) => booking.setRoom(allRoomData));
    })
    .catch((error) => console.log(error));
};

const getBookingFromAPI = () => {
  let url = "http://localhost:3001/api/v1/bookings";
  let methodType = "GET";
  Promise.all([fetchData(url, methodType)])
    .then((data) => {
      allBookingData = [];
      allBookingData = data[0].bookings.map((booking) => new Booking(booking));
      allBookingData.map((booking) => booking.setRoom(allRoomData));
      currentCustomer.addBookings(allBookingData);
      displayDashboardCards(currentCustomer.bookings, false);
      displayAvailableBookings(getStartDate(), roomTypes.value);
    })
    .catch((error) => console.log(error));
};

const postBookingAPI = (roomNumber) => {
  let url = "http://localhost:3001/api/v1/bookings";
  let methodType = "POST";
  let date = getStartDate();
  let data = { userID: currentCustomer.id, date: date, roomNumber: roomNumber };
  return fetchData(url, methodType, data);
};

const addNewBooking = (roomNumber) => {
  Promise.all([postBookingAPI(roomNumber)])
    .then((data) => {
      console.log(data[0]);
      getBookingFromAPI();
    })
    .catch((error) => console.log(error));
};

const deleteBookingAPI = (bookingToBeDeleted) => {
  let url = `http://localhost:3001/api/v1/bookings/${bookingToBeDeleted}`;
  let methodType = "DELETE";
  return fetchData(url, methodType);
};

const deleteBooking = (bookingToBeDeleted) => {
  Promise.all([deleteBookingAPI(bookingToBeDeleted)])
    .then((data) => {
      console.log(data[0]);
      getBookingAPI();
    })
    .catch((error) => console.log(error));
};

// =========================================================================EVENT LISTENERS
window.addEventListener("load", loadData);
navHomeBtn.addEventListener("click", loadHomeDisplay);
navDashboardBtn.addEventListener("click", loadDashboardDisplay);
navBookBtn.addEventListener("click", () => loadBookView());

bookingOptions.addEventListener("click", (event) => displayBookings(event));
dashboardContainer.addEventListener("click", (event) => {
  let bookingId = event.target.id;
  if (!(getDateForBooking(bookingId) >= getCurrentDate())) {
    displaySearchMsg("Cannot delete past reservations");
  }
  if (bookingId && getDateForBooking(bookingId) >= getCurrentDate()) {
    deleteBooking(bookingId);
  }
});
bookContainer.addEventListener("click", (event) => {
  let roomNumber = Number(event.target.id);
  if (roomNumber) {
    addNewBooking(roomNumber);
  }
});

  bookSearchBtn.addEventListener("click", (event) => {
    event.preventDefault();
    displayAvailableBookings(getStartDate(), roomTypes.value);
  });

//  =========================================================================FUNCTIONS
const hideElements = () => {
  hideElement(homeDisplay);
  hideElement(dashboardDisplay);
  hideElement(customerBookingHistory);
  hideElement(managerBookingHistory);
  hideElement(bookDisplay);
  hideElement(loginDisplay);
  hideElement(logoutDisplay);
  hideElement(headDashboard);
  hideElement(bodyDashboard);
};
const getCustomerData = (customerData) => {
  let customers = allCustomerData.find(
    (customer) => customer.name === customerData
  );
  if (!customers) {
    return false;
  }
  customers.addBookings(allBookingData);
  return customers;
};

const loadHomeDisplay = () => {
  hideElements();
  showElement(homeDisplay);
  if (!currentCustomer && !currentManager) {
    showElement(loginDisplay);
  } else {
    showElement(logoutDisplay);
  }
};

const loadDashboardDisplay = () => {
  if (!currentCustomer) {
    loginError("Please login");
  } else {
    hideElements();
    showElement(dashboardDisplay);
    showElement(headDashboard);
    showElement(bodyDashboard);
    showElement(customerBookingHistory);
    displayDashboardHeader(currentCustomer);
    displayDashboardCards(currentCustomer.bookings);
  }
};

const displayReservations = () => {
  if (!currentCustomer) {
    loginError("please log in");
  } else if (!currentCustomer) {
    loginError("invalid user");
  } else {
    hideElements();
    showElement(bookDisplay);
    showElement(headDashboard);
    showElement(bodyDashboard);
    resetbookDisplay();
    displayAvailableBookings(getCurrentDate(), roomTypes.value);
    displayBookingHeader();
  }
};

const resetbookDisplay = () => {
  roomTypes.value = "all rooms";
  startDate.value = getCurrentDate().replaceAll("/", "-");
};

const displayBookings = (event) => {
  if (event.target.id === "bookings") {
    displayDashboardCards(currentCustomer.bookings);
  } else if (event.target.id === "pastBookings") {
    const pastBookings = currentCustomer.bookings.filter(
      (booking) => booking.date < getCurrentDate()
    );
    displayDashboardCards(pastBookings);
  } else if (event.target.id === "presentBookings") {
    const presentBookings = currentCustomer.bookings.filter(
      (booking) => booking.date === getCurrentDate()
    );
    displayDashboardCards(presentBookings);
  } else if (event.target.id === "futureBookings") {
    const futureBookings = currentCustomer.bookings.filter(
      (booking) => booking.date > getCurrentDate()
    );
    displayDashboardCards(futureBookings);
  }
};

const displayAvailableBookings = (startDate, roomType) => {
  let availableBooking = getAvailableRooms(startDate, roomType);
  displayBookingCards(startDate, availableBooking);
};

const getAvailableRooms = (startDate, roomType) => {
  let bookRoomNumbers = allBookingData
    .filter((booking) => booking.date === startDate)
    .map((bookedRoom) => bookedRoom.roomNumber);
  let availableRooms = allRoomData.filter(
    (room) => !bookRoomNumbers.includes(room.number)
  );
  let newAvailableRooms = filterRoomType(availableRooms, roomType);
  return newAvailableRooms;
};

const filterRoomType = (rooms, roomType) => {
  if (roomType === "all roms") {
    return rooms;
  }
  let filteredRooms = rooms.filter((room) => room.roomType === roomType);
  return filteredRooms;
};

const getBookedRooms = (startDate = getCurrentDate()) => {
  let presentBookings = allBookingData.filter(
    (booking) => booking.date === startDate
  );
  return presentBookings;
};

const getTotalSales = (startDate = getCurrentDate()) => {
  let bookedRooms = getBookedRooms(startDate, allBookingData);
  let totalSales = bookedRooms.reduce((acc, booking) => {
    acc += booking.roomDetails.costPerNight;
    return acc;
  }, 0);
  return totalSales.toFixed(2);
};

const getDateForBooking = (bookingId) => {
  let findBooking = allBookingData.find((booking) => booking.id === bookingId);
  return findBooking.date;
};

const getStartDate = () => {
  console.log('START DATE', startDate.value)
  if (!startDate.value) {
    return getCurrentDate();
  }
  return startDate.value(replaceAll("-", "/"));
};
