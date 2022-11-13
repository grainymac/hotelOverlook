import './css/styles.css'
import './css/utilities.css';
import { Customer } from './classes/Customer';
import { Room } from './classes/Room';
import { Booking } from './classes/Booking';
import { fetchData } from './apiCalls'
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import './images/pexels-pixabay-258154.jpg'
import { bookingsData } from './data/bookingsData';

// GLOBAL VARIABLES
let allCustomerData = [];
let allRoomData = [];
let allBookingData = [];
let currentCustomer = '';
let currentManager = '';

// QUERY SELECTORS
const home = document.querySelector('#homeDisplayLink');
const dashboard = document.querySelector('#dashboardLink')
const reservations = document.querySelector('#reservationsLink')
const currentUsername = document.querySelector('#currentUsername');
const currentPassword = document.querySelector('#currentPassword')
const loginBtn = document.querySelector('#loginBtn')
const logoutBtn = document.querySelector('#logoutBtn')
const validationMessage = document.querySelector('#validateMsg')

const dashboardDisplay = document.querySelector('#dashboard')   
const bookingHistoryCard = document.querySelector('#bookingHistoryCard')
const bookingHistoryOptions = document.querySelector('#bookingHistoryOptions')
const allBookings = document.querySelector('#allBookings')
const pastBookings = document.querySelector('#pastBookings')
const presentBookings = document.querySelector('#presentBookings')
const futureBookings = document.querySelector('#futureBookings')

const managerBookingHistory = document.querySelector('#managerBookingHistory')
const dashboardCardsContainer = document.querySelector('#dashboardCardsContainer')

const bookingDisplay = document.querySelector('#bookingDisplay')
const bookingContainer = document.querySelector('#bookingContainer')






// EVENT LISTENERS
window.addEventListener('load', () => loadData());
home.addEventListener('click', () => displayHome());
dashboard.addEventListener('click', () => displayDashboard());
reservations.addEventListener('click', () => displayReservations());
loginBtn.addEventListener('click', )
dashboardCardsContainer.addEventListener('click', (event) => {
    let bookingId = event.target.id
    if (!(getDateForBooking(bookingId) >= getCurrentDate())) {
        (displaySearchMsg('Cannot delete past reservations'))
    }
    if (bookingId && (getDateForBooking(bookingId) >= getCurrentDate())) { 
        deleteBooking(bookingId)
    }
})
bookingContainer.addEventListener('click', (event) => {
    let roomNumber = Number(event.target.id);
    if (roomNumber) {
        addNewBooking(roomNumber)
    }
})





// FETCH CALLS
const loadData = () => {
    const getAllCustomers = fetchData('http://localhost:3001/api/v1/customers', GET);
    const getAllRooms = fetchData('http://localhost:3001/api/v1/rooms', GET);
    const getbookings = fetchData('http://localhost:3001/api/v1/bookings', GET);

    Promise.all([getAllCustomers, getAllRooms, getbookings])
        .then((data) => {
            allCustomerData = data[0].customers.map(customer => new Customer(customer));
            allRoomData = data[1].rooms.map(room => new Room(room));
            allBookingData = data[2].bookings.map(booking => new Booking(booking));

            allBookingData.map(booking => booking.setRoom(allRoomData))
        })
        .catch((error) => console.log(error));
};

const getBookingAPI = () => {
    let url = 'http://localhost:3001/api/v1/bookings';
    let methodType = 'GET';

    Promise.all([fetchData(url, methodType)])
        .then((data) => {
            allBookingData = [];
            allBookingData = data[0].bookings.map(booking => new Booking(booking));
            allBookingData.map(booking => booking.setRoom(allRoomData));

            currentCustomer.addBookings(allBookingData);

            displayManagerDashboard(getAvailableRooms(getCurrentDate(), "all rooms"), getBookedRooms(), getTotalRevenue());
            displayDashboardCards(currentCustomer.bookings, false);
            displayAvailableBookings(getStartDateValue(), roomTypes.value);
        })
        .catch((error) => console.log(error));
};

const postBookingAPI = (roomNumber) => {
    let url = 'http://localhost:3001/api/v1/bookings';
    let methodType = 'POST';
    let date = getStartDate();
    let data = { "userID": currentCustomer.id, "date": date, "roomNumber": roomNumber }
    return fetchData(url, methodType, data);
}

const addNewBooking = (roomNumber) => {
    Promise.all([postBookingAPI(roomNumber)])
        .then((data) => {
            console.log(data[0]);
            getBookingAPI();
        })
        .catch((error) => console.log(error))
};

const deleteBookingAPI = (bookingToBeDeleted) => {
    let url = `http://localhost:3001/api/v1/bookings/${bookingToBeDeleted}`;
    let methodType = 'DELETE';
    return fetchData(url, methodType);
}

const deleteBooking = (bookingToBeDeleted) => {
    Promise.all([deleteBookingAPI(bookingToBeDeleted)])
        .then((data) => {
            console.log(data[0]);
            getBookingAPI();
        })
        .catch((error) => console.log(error))
}

// FUNCTIONS
const hideElements = () => {
    hideElement(homeDisplay);
    hideElement(dashboardDisplay);
    hideElement(customerBookingHistory);
    hideElement(managerBookingHistory);
    hideElement(bookingDisplay);
    hideElement(loginDisplay);
    hideElement(logoutDisplay);
    hideElement(dashboard)
}

const loadHomeDisplay = () => {
    hideElements();
    showElement(homeDisplay);
    if(!currentCustomer && !currentManager) {
        showElement(loginDisplay)
    } else {
        showElement(logoutDisplay)
    }
}

const loadDashboardDisplay = () => {
    if (!currentCustomer && !currentManager) {
        loginError();
    } else if (currentManager !== '') {
        hideElements();
        showElement(dashboardDisplay);
        showElement(managerBookingHistory);
        showElement(dashboard);
        displayManagerDashboard(getAvailableRooms(getCurrentDate(), "all rooms"), getBookedRooms(), getTotalRevenue());
        displayDashboardHeader(currentManager);
    
        if(currentCustomer !== '') {
            displayCustomerSearchMessage('')
            displayDashboardCards(currentCustomer.bookings, false);
        } else {
            displayManagerSearchMessage('');
        }
    } else {
        hideElements();
        showElement(dashboardDisplay);
        showElement(dashboard)
        displayDashboardHeader(currentCustomer);
        displayDashboardCards(currentCustomer.bookings);
    }
}

const loadBookingDisplay = () => {
    if (!currentCustomer && !currentManager) {
        loginError('');
    } else if (!currentCustomer) {
        loginError('');
    } else {
        hideElements();
        showElement(bookingDisplay);
        showElement(dashboard);
        resetBookingDisplay();
        displayAvailableBookings(getCurrentDate(), roomTypes.value);
        displayBookingHeader();
    }
}

const resetBookingDisplay = () => {
    roomTypes.value = 'all rooms';
    startDate.value - getCurrentDate().replaceAll('/', '-');
}

const displayBookings = (event) => {
    if (event.target.id === 'bookings') {
        displayDashboardCards(currentCustomer.bookings);
    } else if (event.target.id === 'pastBookings') {
        const pastBookings = currentCustomer.bookings.filter(booking => booking.date < getCurrentDate());
        displayDashboardCards(pastBookings)
    } else if (event.target.id === 'presentBookings') {
        const presentBookings = currentCustomer.bookings.filter(booking => booking.date === getCurrentDate());
        displayDashboardCards(presentBookings)
    } else if (event.target.id === 'futureBookings') {
        const futureBookings = currentCustomer.bookings.filter(booking => booking.date > getCurrentDate())
        displayDashboardCards(futureBookings)
    }
}

const getAvailableRooms = (startDate, roomType) => {
    let bookRoomNumbers = allBookingData.filter(booking => booking.date === startDate)
                                    .map(bookedRoom => bookedRoom.roomNumber);
    let availableRoom = allRoomData.filter(room => !bookRoomNumbers.includes(room.number))
    let newAvailableRooms = filterRoomType(availableRoom, roomType);
    return newAvailableRooms
}

const filterRoomType = (rooms, roomType) => {
    if (roomType === 'all roms') {
        return rooms;
    }
    let filteredRooms = rooms.filter(room => room.roomType === roomType);
    return filteredRooms;
}

const getBookedRooms = (startDate = getCurrentDate()) => {
    let presentBookings = allBookingData.filter(booking => booking.date === startDate)
    return presentBookings;
}

const getTotalSales = (startDate = getCurrentDate()) => {
    let bookedRooms = getBookedRooms(startDate, allBookingData)
    let totalSales = bookedRooms.reduce((acc, booking) => {
        acc += booking.roomDetails.costPerNight;
        return acc;
    }, 0)
    return totalSales.toFixed(2);
}

const getDateForBooking = (bookingId) => {
    let findBooking = allBookingData.find(booking => booking.id === bookingId);
    return findBooking.date;
}

const getStartDate = () => {
    if (!startDate.value) {
        return getCurrentDate();
    }
    return startDate.value(replaceAll('-', '/'))
}