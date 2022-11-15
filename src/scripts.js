import "./css/styles.css";
import "./css/utilities.css";
import { Customer } from "./classes/Customer";
import { Room } from "./classes/Room";
import { Booking } from "./classes/Booking";
import { fetchData, postAll } from "./apiCalls";
import "./images/turing-logo.png";
import "./images/pexels-pixabay-258154.jpg";
import { displayBookHeader } from "./domUpdates";


//  =======================================================================GLOBAL VARIABLES
let allCustomerData = [];
let allRoomData = [];
let allBookingData = [];
let currentDate
let currentCustomer = allCustomerData[49];

//  =========================================================================QUERY SELECTORS
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
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const message = document.querySelector('#message')
const bookingForm = document.querySelector('#bookingForm')

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


// =========================================================================EVENT LISTENERS
window.addEventListener("load", loginLoad);
bookingsBtn.addEventListener('click', displayAllBookings)
reserveBtn.addEventListener("click", displayAvailableBookings)
loginBtn.addEventListener("click", (event) => {
  event.preventDefault();
  validateSignIn(username.value, password.value)
});


//  =========================================================================FUNCTIONS
function loadCustomer() {
  bookingForm.classList.remove('hidden')
  currentCustomer.addBookings(allBookingData)
  displayWelcomeMsg()
  displayAllBookings()
  currentCustomer.updateTotalCost()
  getCurrentDate()
  startDate.min = currentDate
}

function loginLoad() {
  searchResults.innerHTML = ''
  welcomeTxt.innerHTML = ''
  login.classList.remove('hidden')
}

function displayWelcomeMsg() {
  welcomeTxt.innerHTML = ''
  welcomeTxt.innerHTML += `Welcome, ${currentCustomer.name}
  <p><span class="sm">You have spent $${currentCustomer.totalCost} so far with us!</span></p>`
}

function displayAllBookings(event) {
  bookingInfo.innerHTML = ''
  bookingInfo.classList.remove('hidden')
  console.log('CURRENT CUSTOMER', currentCustomer)
  const bookingInformation = currentCustomer.bookings.map(booking => {
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
  if (roomTypes === 'all rooms') {
    return rooms;
  }
  let filteredRooms = rooms.filter((room) => room.roomType === roomTypes);
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
  console.log('what is this', currentCustomer)
  const ifAvailableRooms = currentCustomer.bookings.filter(booking => {
    if (booking.date === startDate) {
    }
  })
  if (availableRooms.length === 0) {
    return searchResults.innerHTML += `<h2>no available bookings</h2>`;
  }
  displayAvailableRooms(startDate, availableRooms);
};

function displayAvailableRooms(startDate, availableRooms) {
  searchResults.innerHTML = '';
  availableRooms.forEach((room) => {
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
    const postBtn = document.querySelectorAll('.room-btn')
    postBtn.forEach(button => button.addEventListener('click', postBooking))

  })
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
}

function displaySuccessMessage() {
  searchResults.innerHTML = ''
  searchResults.innerHTML += `<h2> THANK YOU FOR RESERVING</h2>`
  setTimeout(() => updateData(), 3000)
}

function validateSignIn(username, password) {
  if ((username === 'customer50') && (password === 'overlook2021')) {
    message.innerText = ''
    login.classList.add('hidden')
    loadData()
  } else if (password !== 'overlook2021') {
    console.log('ughhhhhhhhhh', 238)
    message.innerText = `Wrong password, try again!!`
  }
}
