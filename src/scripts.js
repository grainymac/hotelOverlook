import "./css/styles.css";
import "./css/utilities.css";
import { Customer } from "./classes/Customer";
import { Room } from "./classes/Room";
import { Booking } from "./classes/Booking";
import { fetchData, postAll } from "./apiCalls";
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import "./images/turing-logo.png";
import "./images/pexels-pixabay-258154.jpg";
import { displayBookHeader } from "./domUpdates";
// import { bookingsData } from "./data/bookingsData";
// import { showElement, hideElement, displaySuccessMsg, displaySearchMsg, displayDashboardCards, displayBookingCards, displayDashboardHeader, displayBookHeader,getCurrentDate } from './domUpdates'

//  =======================================================================GLOBAL VARIABLES
let allCustomerData = [];
let allRoomData = [];
let allBookingData = [];
// let currentCustomer = "";
let currentDate
let currentCustomer = allCustomerData[49]; 

//  =========================================================================QUERY SELECTORS
const navHomeBtn = document.querySelector("#navHomeBtn");
const navDashboardBtn = document.querySelector("#navDashboardBtn");
const navReserveBtn = document.querySelector("#navReserveBtn");
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
const searchMsg = document.querySelector("#searchMsg");
const totalCost = document.querySelector("#totalCost");
const headDashboardContainer = document.querySelector("#headDashboardContainer");
const cards = document.querySelector("#cards");
const currentUsername = document.querySelector("#currentUsername");
const currentPassword = document.querySelector("#currentPassword");
const logoutBtn = document.querySelector("#logoutBtn");
const welcomeTxt = document.querySelector('#welcomeTxt')
const bookingInfo = document.querySelector('#bookingInfo')
const bookingsBtn = document.querySelector('#bookings')
const reserveBtn = document.querySelector("#reserveBtn");
const allRooms = document.querySelector('#allRooms')
const suite = document.querySelector('#suite')
const residentialSuite = document.querySelector('#residentialSuite')
const juniorSuite = document.querySelector('#juniorSuite')
const singleRoom = document.querySelector('#singleRoom')
const startDate = document.querySelector("#startDate");
const roomTypes = document.querySelector("#roomTypes");
const searchResults = document.querySelector('#searchResults')
const login = document.querySelector('#login')
const loginBtn = document.querySelector("#loginBtn");

//  ========================================================================= FETCH CALLS
const loadData = () => {
  const getAllCustomers = fetchData("http://localhost:3001/api/v1/customers", "GET");
  const getAllRooms = fetchData("http://localhost:3001/api/v1/rooms", "GET");
  const getBookings = fetchData("http://localhost:3001/api/v1/bookings", "GET");
  Promise.all([getAllCustomers, getAllRooms, getBookings])
    .then((data) => {
      allCustomerData = data[0].customers.map((customer) => new Customer(customer));
      allRoomData = data[1].rooms.map((room) => new Room(room));
      allBookingData = data[2].bookings.map((booking) => new Booking(booking));
      console.log('booking shit', allBookingData)
      allBookingData.map((booking) => booking.setRoom(allRoomData));

      
      currentCustomer = allCustomerData[49];
      loadCustomer()
    })
    .catch((error) => console.log(error));
  };

  function updateData() {
    const getAllCustomers = fetchData("http://localhost:3001/api/v1/customers", "GET");
    const getAllRooms = fetchData("http://localhost:3001/api/v1/rooms", "GET");
    const getBookings = fetchData("http://localhost:3001/api/v1/bookings", "GET");  
  Promise.all([getAllCustomers, getAllRooms, getBookings])
    .then((data) => {
      allCustomerData = data[0].customers.map((customer) => new Customer(customer));
      allRoomData = data[1].rooms.map((room) => new Room(room));
      allBookingData = data[2].bookings.map((booking) => new Booking(booking));
      allBookingData.map((booking) => booking.setRoom(allRoomData));
      currentCustomer = allCustomerData[49];
      loadCustomer()
      searchResults.innerHTML = '';
    })
  };
  
  
//   const getBookingFromAPI = () => {
//     let url = "http://localhost:3001/api/v1/bookings";
//     let methodType = "GET";
//     allBookingData.filter()
//     Promise.all([fetchData(url, methodType)])
//     .then((data) => {
//       allBookingData = [];
//       allBookingData = data[0].bookings.map((booking) => new Booking(booking));
//       allBookingData.map((booking) => booking.setRoom(allRoomData));
//       currentCustomer.addBookings(allBookingData);
//       displayDashboardCards(currentCustomer.bookings, false);
//       displayAvailableBookings(getStartDate(), roomTypes.value);
//     })
//     .catch((error) => console.log(error));
// };

function postBookingToAPI(roomNumber) {
  // let url = "http://localhost:3001/api/v1/bookings";
  // let methodType = "POST";
  // let date = getStartDate();
  // let body = JSON.stringify({ userID: currentCustomer.id, date: date, roomNumber: parseInt(roomNumber) });
  // const bookingToPost = fetchData(url, methodType, body);
  postAll(bookingToPost)
    .then((data) => {

    })
    .catch((err) => {
      console.error(err);
      cards.style.display = 'block';
    })
  };

// const addNewBooking = (roomNumber) => {
//   Promise.all([postBookingToAPI(roomNumber)])
//     .then((data) => {
//       console.log(data[0]);
//       getBookingFromAPI();
//     })
//     .catch((error) => console.log(error))
// };

const deleteBookingFromAPI = (bookingToBeDeleted) => {
  let url = `http://localhost:3001/api/v1/bookings/${bookingToBeDeleted}`;
  let methodType = "DELETE";
  return fetchData(url, methodType);
};

const deleteBooking = (bookingToBeDeleted) => {
  Promise.all([deleteBookingFromAPI(bookingToBeDeleted)])
    .then((data) => {
      console.log(data[0]);
      getBookingFromAPI();
    })
    .catch((error) => {
      displaySuccessMsg(`${error} there is an error`)
      console.log(error)
    });
};


// =========================================================================EVENT LISTENERS
window.addEventListener("load", loginLoad);
bookingsBtn.addEventListener('click', displayAllBookings)
// reserveBtn.addEventListener('click', loadSearchResults)
// reserveBtn.addEventListener("click", (event) => {
//   event.preventDefault();
//   displayAvailableBookings(getStartDate(), roomTypes.value);
// });
reserveBtn.addEventListener("click", displayAvailableBookings)
loginBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if(validateSignIn(currentUsername.value, currentPassword.value)) {
      loginUser();
  }
  loginView.reset();
});
// navHomeBtn.addEventListener("click", loadHomeDisplay);
// navDashboardBtn.addEventListener("click", loadDashboardDisplay);
// navReserveBtn.addEventListener("click", displayReservations);

// bookingOptions.addEventListener("click", (event) => displayBookings(event));
// dashboardContainer.addEventListener("click", (event) => {
//   let bookingId = event.target.id;
//   if (!(getDateForBooking(bookingId) >= getCurrentDate())) {
//     displaySearchMsg("Cannot delete past reservations");
//   }
//   if (bookingId && getDateForBooking(bookingId) >= getCurrentDate()) {
//     deleteBooking(bookingId);
//   }
// });
// bookContainer.addEventListener("click", (event) => {
//   let roomNumber = Number(event.target.id);
//   if (roomNumber) {
//     addNewBooking(roomNumber);
//   }
// });



//  =========================================================================FUNCTIONS
function loadCustomer() {
  // console.log('bookings', currentCustomer)
  currentCustomer.addBookings(allBookingData)
  displayWelcomeMsg()
  displayAllBookings()
  currentCustomer.updateTotalCost()
  getCurrentDate()
  startDate.min = currentDate
  // console.log(startDate.min)
  // display all customer booking information
  // getBooking()
}

function loginLoad() {
  searchResults.innerHTML = ''
  welcomeTxt.innerHTML = ''
  login.classList.remove('hidden')

}

// function clearDisplay(display) {
//   display.innerHTML = "";
// };

// function loadSearchResults(event) {
//   bookingInfo.classList.add('hidden')
//   searchResults.classList.remove('hidden')
//   event.preventDefault()
//   getAvailableRooms(startDate.value, roomTypes.value)
//   console.log('event', event.target)
//   console.log(roomTypes.value)
//   console.log(startDate.value)
//   const roomInfoType = currentCustomer.bookings.filter(booking => {
//     // console.log(booking.roomDetails)
//     if (booking.roomDetails.roomType === roomTypes.value) {
//       return booking.roomDetails
//     }
//   })
// searchResults.innerHTML += `
// <p>lkjfdsalkjfdsak ${roomTypes.value}</p>
// `
// }

function displayWelcomeMsg() {
  welcomeTxt.innerHTML = ''
  welcomeTxt.innerHTML += `Welcome, ${currentCustomer.name}
  <p><span class="sm">You have spent $${currentCustomer.totalCost} so far with us!</span></p>`
}

// function displayBookingInfo(event) {
//   if (event.target.id === 'bookings') {
//     displayAllBookings()

// }

function displayAllBookings(event) {
  bookingInfo.innerHTML = ''
  bookingInfo.classList.remove('hidden')
  console.log('CURRENT CUSTOMER', currentCustomer)
  const bookingInformation = currentCustomer.bookings.map(booking => {
    // console.log(booking.roomDetails)
  bookingInfo.innerHTML += `
    <div class="card" id=${booking.id}>
      <h3>${booking.date}</h3>
      <h3>Room Number ${booking.roomNumber}</h3>
      <h3>Conf# ${booking.id}</h3>
  </div>
  `
})
}

function displayAvailableBookings(event) {
  searchResults.classList.remove('hidden')
  bookingInfo.classList.add('hidden')
  event.preventDefault();
  let startDate = getStartDate()
  let availableBooking = getAvailableRooms(startDate, roomTypes.value);
  displayBookingCards(startDate, availableBooking);
};


  function filterRoomType(rooms, roomTypes) {
    // console.log('TYPE', roomTypes)
    if (roomTypes === 'all rooms') {
      return rooms;
    }
    let filteredRooms = rooms.filter((room) => room.roomType === roomTypes);
    // console.log('filter', filteredRooms)
    return filteredRooms;
  };

console.log(startDate.value, roomTypes.value)
function getAvailableRooms(startDate, roomTypes) {
  let bookRoomNumbers = allBookingData.filter((booking) => booking.date === startDate)
    .map((bookedRoom) => bookedRoom.roomNumber);
  let availableRooms = allRoomData.filter(
    (room) => !bookRoomNumbers.includes(room.number)
  );
  let newAvailableRooms = filterRoomType(availableRooms, roomTypes);
  return newAvailableRooms;
};

function getStartDate() {
  console.log('START DATE', startDate.value)
  if (!startDate.value) {
    return getCurrentDate();
  }
  return startDate.value.replaceAll("-", "/");
};

function getCurrentDate() {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();
  if (Number(dd) < 10) {
    dd = `0${dd}`
  } else if (Number(mm) < 10) {
    mm = `0${mm}`
  }
  currentDate = `${yyyy}-${mm}-${dd}`
  return `${yyyy}/${mm}/${dd}`;
};


function displayBookingCards(startDate, availableRooms) {
  searchResults.innerHTML = ''
  // console.log('availableRooms', availableRooms)
  console.log('what is this', currentCustomer)
const ifAvailableRooms = currentCustomer.bookings.filter(booking => {
  if (booking.date === startDate) {

  }
  // return searchResults.innerHTML += `<h2>no available booking please select another date</h2>`
  
})
// console.log('AVAILABLE', availableRooms)
if (availableRooms.length === 0) {
  return searchResults.innerHTML += `<h2>no available bookings</h2>`;
}
displayAvailableRooms(startDate, availableRooms);
};

function displayAvailableRooms(startDate, availableRooms) {
  searchResults.innerHTML = '';
  // console.log('what', availableRooms)
  availableRooms.forEach((room) => {
    // console.log(room)
    searchResults.innerHTML += `
          <div class="flex card">
              <summary>
                  <h3>room ${room.number}</h3>
                  <h3>${room.roomType}</h3>
                  <ul>
                  <li class="sm"><span>beds:</span> ${room.numBeds}</li>
                  <li class="sm"><span>bed size:</span> ${room.bedSize}</li>
                  <li class="sm"><span>bidet:</span> ${room.bidet}</li>
                  <li class="sm"><span>date:</span> ${startDate}</li>
                  <li class="sm"><span>cost per night:</span> ${room.costPerNight.toFixed(2)}</li>
              </ul>
              </summary>
              <button class="room-btn btn-secondary" id="${room.number}">reserve</button>
          </div>`;
          let roomNum = `${room.number}`
          console.log('what IS THIS', typeof roomNum)
          // postBtn.addEventListener("click", (event) => {
          //   postBooking(roomNum);
          });
        
        // event.preventDefault();
        const postBtn = document.querySelectorAll('.room-btn')
        postBtn.forEach(button => button.addEventListener('click', postBooking))
        
}

function postBooking(event) {
  let roomNum = parseInt(event.target.id)
  let url = "http://localhost:3001/api/v1/bookings";
  let methodType = "POST";
  let date = getStartDate();
  let body = { userID: currentCustomer.id, date: date, roomNumber: roomNum }
  fetchData(url, methodType, body);
  console.log(body)
displaySuccessMessage()
  // setTimeout(updateData(), 1000)
}

function displaySuccessMessage() {
  searchResults.innerHTML = ''
  searchResults.innerHTML += `<h2> THANK YOU FOR RESERVING</h2>`
  setTimeout(() => updateData(), 3000)
}
function validateSignIn(username, password) {
  if (username === 'customer50' && password === 'overlook2021') {
    displayValidateSuccessMessage();
  } else if (password !== 'overlook2021') {
    displayValidateInvalidMessage()
    }
}


function displayValidateSuccessMessage() {
  searchResults.innerHTML = ''
  searchResults.innerHTML += `<h2> SUCCESSFUL LOGIN</h2>`
  setTimeout(() => loadData(), 3000)
}

function displayValidateInvalidMessage() {
  searchResults.innerHTML = ''
  searchResults.innerHTML += `<h2> INCORRECT PASSWORD, TRY AGAIN</h2>`
  setTimeout(() => loginLoad(), 3000)
}
// function  searchResults.innerHTML = ''
// searchResults.innerHTML += `<h2> THANK YOU FOR RESERVING</h2>`

// function hideElements() {
//   hideElement(homeDisplay);
//   hideElement(dashboardDisplay);
//   hideElement(customerBookingHistory);
//   hideElement(bookDisplay);

//   hideElement(headDashboard);
//   hideElement(bodyDashboard);
// };


// const getCustomerData = (customerData) => {
//   let customers = allCustomerData.find(customer => customer.name === customerData);
//   if (!customers) {
//     return false;
//   }
//   customers.addBookings(allBookingData);
//   return customers;
// };

// function loadHomeDisplay () {
//   hideElements();
//   showElement(homeDisplay);
//   // if (!currentCustomer) {
//   //   showElement(loginDisplay);
//   // } else {
//   //   showElement(logoutDisplay);
//   // }
// };

// function loadDashboardDisplay() {
//   // if (!currentCustomer) {
//   //   loginError("Please login");
//   // } else {
//     hideElements();
//     showElement(dashboardDisplay);
//     showElement(headDashboard);
//     showElement(bodyDashboard);
//     showElement(customerBookingHistory);
//     displayDashboardHeader(currentCustomer);
//     displayDashboardCards(currentCustomer.bookings);

// };

// function displayReservations() {
//     hideElements();
//     showElement(bookDisplay);
//     console.log()
//     showElement(headDashboard);
//     showElement(bodyDashboard);
//     showElement(footerDashboard)
//     resetbookDisplay();
//     displayAvailableBookings(getCurrentDate(), roomTypes.value);
//     displayBookHeader();
// };

// const resetbookDisplay = () => {
//   roomTypes.value = "all rooms";
//   startDate.value = getCurrentDate().replaceAll("/", "-");
// };

// const displayBookings = (event) => {
//   if (event.target.id === "bookings") {
//     displayDashboardCards(currentCustomer.bookings);
//   } else if (event.target.id === "pastBookings") {
//     const pastBookings = currentCustomer.bookings.filter(
//       (booking) => booking.date < getCurrentDate()
//     );
//     displayDashboardCards(pastBookings);
//   } else if (event.target.id === "presentBookings") {
//     const presentBookings = currentCustomer.bookings.filter(
//       (booking) => booking.date === getCurrentDate()
//     );
//     displayDashboardCards(presentBookings);
//   } else if (event.target.id === "futureBookings") {
//     const futureBookings = currentCustomer.bookings.filter(
//       (booking) => booking.date > getCurrentDate()
//     );
//     displayDashboardCards(futureBookings);
//   }
// };

// const displayAvailableBookings = (startDate, roomType) => {
//   let availableBooking = getAvailableRooms(startDate, roomType);
//   displayBookingCards(startDate, availableBooking);
// };





// const getBookedRooms = (startDate = getCurrentDate()) => {
//   let presentBookings = allBookingData.filter(
//     (booking) => booking.date === startDate
//   );
//   return presentBookings;
// };

// const getTotalSales = (startDate = getCurrentDate()) => {
//   let bookedRooms = getBookedRooms(startDate, allBookingData);
//   let totalSales = bookedRooms.reduce((acc, booking) => {
//     acc += booking.roomDetails.costPerNight;
//     return acc;
//   }, 0);
//   return totalSales.toFixed(2);
// };

// const getDateForBooking = (bookingId) => {
//   let findBooking = allBookingData.find((booking) => booking.id === bookingId);
//   return findBooking.date;
// };

// const getStartDate = () => {
//   console.log('START DATE', startDate.value)
//   if (!startDate.value) {
//     return getCurrentDate();
//   }
//   return startDate.value.replaceAll("-", "/");
// };
