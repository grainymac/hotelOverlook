import "./css/styles.css";
import "./css/utilities.css";
import { Customer } from "./classes/Customer";
import { Room } from "./classes/Room";
import { Booking } from "./classes/Booking";
import { fetchData } from "./apiCalls";
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import "./images/turing-logo.png";
import "./images/pexels-pixabay-258154.jpg";
import { bookingsData } from "./data/bookingsData";

//  =======================================================================GLOBAL VARIABLES
let allCustomerData = [];
let allRoomData = [];
let allBookingData = [];
let currentCustomer = "";
let currentManager = "";

//  =========================================================================QUERY SELECTORS
const homeBtn = document.querySelector("#homeDisplayLink");
const dashboardBtn = document.querySelector("#dashboardLink");
const reservationsBtn = document.querySelector("#reservationsLink");

const homeDisplay = document.querySelector("#homeDisplay");
const dashboardDisplay = document.querySelector("#dashboardDisplay");
const bookingDisplay = document.querySelector("#bookingDisplay");

const headDashboard = document.querySelector("#headDashboard");
const bodyDashboard = document.querySelector("#bodyDashboard");

const currentUsername = document.querySelector("#currentUsername");
const currentPassword = document.querySelector("#currentPassword");
const loginBtn = document.querySelector("#loginBtn");
const logoutBtn = document.querySelector("#logoutBtn");

const dashboardContainer = document.querySelector("#dashboardContainer");
const bookingContainer = document.querySelector("#bookingContainer");
const bookingHistoryCard = document.querySelector("#bookingHistoryCard");
const managerBookingHistory = document.querySelector("#managerBookingHistory");

const bookingOptions = document.querySelector("#bookingOptions");
const startDate = document.querySelector("#startDate");
const roomTypes = document.querySelector("#roomTypes");
const roomSearchBtn = document.querySelectorAll("#roomSearchBtn");
const customerSearchInput = document.querySelector("#customerSearchInput");
const customerSearchBtn = document.querySelector("#customerSearchBtn");

const searchMsg = document.querySelector('#searchMsg')

const validationMessage = document.querySelector("#validateMsg");
const allBookings = document.querySelector("#allBookings");
const pastBookings = document.querySelector("#pastBookings");
const presentBookings = document.querySelector("#presentBookings");
const futureBookings = document.querySelector("#futureBookings");

// =========================================================================EVENT LISTENERS
window.addEventListener("load", () => loadData());

dashboardBtn.addEventListener("click", () => loadDashboardDisplay());
homeBtn.addEventListener("click", () => loadHomeDisplay());
bookingOptions.addEventListener("click", (event) => displayBookings(event));
bookingDisplay;
reservationsBtn.addEventListener("click", () => displayReservations());
dashboardContainer.addEventListener("click", (event) => {
  let bookingId = event.target.id;
  if (!(getDateForBooking(bookingId) >= getCurrentDate())) {
    displaySearchMsg("Cannot delete past reservations");
  }
  if (bookingId && getDateForBooking(bookingId) >= getCurrentDate()) {
    deleteBooking(bookingId);
  }
});
bookingContainer.addEventListener("click", (event) => {
  let roomNumber = Number(event.target.id);
  if (roomNumber) {
    addNewBooking(roomNumber);
  }
});
customerSearchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  currentCustomer = getCustomerData(customerSearchInput.value);
  if (!currentCustomer) {
    displaySearchMsg("incorrect or invalid customer name");
    currentCustomer = "";
  }
  loadDashboardDisplay();
  customerSearchInput.value = "";
});

roomSearchBtn.addEventListener("click", (event) => {
  event.preventDefault();
  displayAvailableBookings(getStartDate(), roomTypes.value);
});

//  =========================================================================DOM
const hideElemet = (element) => {
    element.classList.add('hidden')
}
const showElement = (element) => {
    element.classList.remove('hidden')
}

const clearDisplay = (view) => {
    view.innerHTML = ''
}

const displaySearchMsg = (message) => {
    searchMsg.innerText = message
}

const displayManagerSearchMsg = (message) => {
    dashboardContainer.innherHTML = `<h2 class='my-4 text-center md'>${message}</h2>`
}

const displayDashboardCards = (bookings, isHidden=true) => {
    clearDisplay(dashboardContainer);
    if (!bookings.length) {
        dashboardContainer.innerHTML = `<h2>there are no bookings available</h2>`
    } else {
        displayBookedCards(bookings, isHidden)
    }
    displayBookingCost(bookings)
}

const displayBookedCards = (bookings, isHidden) => {
    let hidBtn = ''
    if (isHidden) {
        hidBtn ='hidden'
    }
    bookings.forEach(booking => {
        dashboardContainer.innerHTML += `
        <div class="card flex">
            <summary>
                <h3>room ${booking.roomDetails.number}</h3>
                <h3>room ${booking.roomDetails.roomType}</h3>
                <ul>
                    <li class="sm"><span>beds:</span> ${booking.roomDetails.numBeds}</li>
                    <li class="sm"><span>bed size:</span> ${booking.roomDetails.bedSize}</li>
                    <li class="sm"><span>bidet:</span> ${booking.roomDetails.bidet}</li>
                    <li class="sm"><span>date:</span> ${booking.date}</li>
                    <li class="sm"><span>cost per night:</span> ${booking.roomDetails.costPerNight.toFixed(2)}</li>
                    <li class="sm"><span>beds:</span> ${booking.roomDetails.numBeds}</li>
                </ul>
            </summary>
            <button class="${hidBtn}" id="${booking.id}>delete</button
        </div>`
    })
}

const displayBookingCost = (bookings) => {
    const bookingTotal = 
}
//  =========================================================================FETCH CALLS
const loadData = () => {
  const getAllCustomers = fetchData(
    "http://localhost:3001/api/v1/customers",
    "GET"
  );
  const getAllRooms = fetchData("http://localhost:3001/api/v1/rooms", "GET");
  const getbookings = fetchData("http://localhost:3001/api/v1/bookings", "GET");

  Promise.all([getAllCustomers, getAllRooms, getbookings])
    .then((data) => {
      allCustomerData = data[0].customers.map(
        (customer) => new Customer(customer)
      );
      allRoomData = data[1].rooms.map((room) => new Room(room));
      allBookingData = data[2].bookings.map((booking) => new Booking(booking));

      allBookingData.map((booking) => booking.setRoom(allRoomData));
    })
    .catch((error) => console.log(error));
};

const getBookingAPI = () => {
  let url = "http://localhost:3001/api/v1/bookings";
  let methodType = "GET";

  Promise.all([fetchData(url, methodType)])
    .then((data) => {
      allBookingData = [];
      allBookingData = data[0].bookings.map((booking) => new Booking(booking));
      allBookingData.map((booking) => booking.setRoom(allRoomData));

      currentCustomer.addBookings(allBookingData);

      displayManagerDashboard(
        getAvailableRooms(getCurrentDate(), "all rooms"),
        getBookedRooms(),
        getTotalSales()
      );
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
      getBookingAPI();
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


//  =========================================================================FUNCTIONS
const hideElements = () => {
  hideElement(homeDisplay);
  hideElement(dashboardDisplay);
  hideElement(bookingHistoryCard);
  hideElement(managerBookingHistory);
  hideElement(bookingDisplay);
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
  if (!currentCustomer && !currentManager) {
    loginError("Please login");
  } else if (currentManager !== "") {
    hideElements();
    showElement(dashboardDisplay);
    showElement(managerBookingHistory);
    showElement(headDashboard);
    showElement(bodyDashboard);
    displayManagerDashboard(
      getAvailableRooms(getCurrentDate(), "all rooms"),
      getBookedRooms(),
      getTotalSales()
    );
    displayDashboardHeader(currentManager);

    if (currentCustomer !== "") {
      displaySearchMsg("");
      displayDashboardCards(currentCustomer.bookings, false);
    } else {
      displayManagerSearchMsg("");
    }
  } else {
    hideElements();
    showElement(dashboardDisplay);
    showElement(headDashboard);
    showElement(bodyDashboard);
    showElement(bookingHistoryCard);
    displayDashboardHeader(currentCustomer);
    displayDashboardCards(currentCustomer.bookings);
  }
};

const displayReservations = () => {
  if (!currentCustomer && !currentManager) {
    loginError("please log in");
  } else if (!currentCustomer) {
    loginError("invalid user");
  } else {
    hideElements();
    showElement(bookingDisplay);
    showElement(headDashboard);
    showElement(bodyDashboard);
    resetBookingDisplay();
    displayAvailableBookings(getCurrentDate(), roomTypes.value);
    displayBookingHeader();
  }
};

const resetBookingDisplay = () => {
  roomTypes.value = "all rooms";
  startDate.value - getCurrentDate().replaceAll("/", "-");
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
  let availableRoom = allRoomData.filter(
    (room) => !bookRoomNumbers.includes(room.number)
  );
  let newAvailableRooms = filterRoomType(availableRoom, roomType);
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
  if (!startDate.value) {
    return getCurrentDate();
  }
  return startDate.value(replaceAll("-", "/"));
};
