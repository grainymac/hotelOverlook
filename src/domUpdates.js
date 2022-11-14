const showElement = (element) => {
  element.classList.remove("hidden");
};

const hideElemet = (element) => {
  element.classList.add("hidden");
};

const clearDisplay = (view) => {
  view.innerHTML = "";
};

const displaySearchMsg = (message) => {
  searchMsg.innerText = message;
};

const displayManagerSearchMsg = (message) => {
  dashboardContainer.innherHTML = `<h2 class='my-4 text-center md'>${message}</h2>`;
};

const displayDashboardCards = (bookings, isHidden = true) => {
  clearDisplay(dashboardContainer);
  if (!bookings.length) {
    dashboardContainer.innerHTML = `<h2>there are no bookings available</h2>`;
  } else {
    displayBookedCards(bookings, isHidden);
  }
  displayBookingCost(bookings);
};

const displayBookedCards = (bookings, isHidden) => {
  let hidBtn = "";
  if (isHidden) {
    hidBtn = "hidden";
  }
  bookings.forEach((booking) => {
    dashboardContainer.innerHTML += `
          <div class="card flex">
              <summary>
                  <h3>room ${booking.roomDetails.number}</h3>
                  <h3>room ${booking.roomDetails.roomType}</h3>
                  <ul>
                      <li class="sm"><span>beds:</span> ${
                        booking.roomDetails.numBeds
                      }</li>
                      <li class="sm"><span>bed size:</span> ${
                        booking.roomDetails.bedSize
                      }</li>
                      <li class="sm"><span>bidet:</span> ${
                        booking.roomDetails.bidet
                      }</li>
                      <li class="sm"><span>date:</span> ${booking.date}</li>
                      <li class="sm"><span>cost per night:</span> ${booking.roomDetails.costPerNight.toFixed(
                        2
                      )}</li>
                      <li class="sm"><span>beds:</span> ${
                        booking.roomDetails.numBeds
                      }</li>
                  </ul>
              </summary>
              <button class="${hidBtn}" id="${booking.id}>delete</button
          </div>`;
  });
};

const displayBookingCost = (bookings) => {
  const bookingTotal = bookings.reduce((acc, booking) => {
    acc += booking.roomDetails.costPerNight;
    return acc;
  }, 0);
  return (totalCost.innerText = `${bookingTotal.toFixed(2)}`);
};

const displayBookingCards = (startDate, availableRooms) => {
  clearDisplay(bookContainer);
  if (!availableRooms.length) {
    boookingContainer.innerHTML = `
          <h1>no available bookings</h1>`;
  }
  displayAvailableRooms(bookContainer, startDate, availableRooms);
};

const displayAvailableRooms = (container, startDate, availableRooms) => {
  availableRooms.forEach((room) => {
    container.innerHTML += `
          <div class="flex card">
              <summary>
                  <h3>room ${room.number}</h3>
                  <h3>${room.roomType}</h3>
                  <ul>
                  <li class="sm"><span>beds:</span> ${room.numBeds}</li>
                  <li class="sm"><span>bed size:</span> ${room.bedSize}</li>
                  <li class="sm"><span>bidet:</span> ${room.bidet}</li>
                  <li class="sm"><span>date:</span> ${startDate}</li>
                  <li class="sm"><span>cost per night:</span> ${room.costPerNight.toFixed(
                    2
                  )}</li>
              </ul>
              </summary>
              <button class="btn" id="${room.number}">reserve</button>
          </div>`;
  });
};

const displayDashboardHeader = (currentCustomer) => {
  const displayName = `${currentCustomer.name}`;
  const welcomeMsg = "Welcome to Hotel Overlook!";
  displayDashHead(displayName, welcomeMsg);
};

const displayDashHead = (displayName, welcomeMsg) => {
  headDashboardContainer.innerHTML += `
      <article>
          <h2 class="lg">${displayName}</h2>
          <p>Date: ${getCurrentDate()}</p>
          <p>${welcomeMsg}</p>
      </article>`;
};

const displayManagerDashboard = (roomsAvailable, bookedRooms, salesTotal) => {
  let availableRoomCount = roomsAvailable.length;
  let occupiedRoomPercent = Math.round((bookedRooms.length / 25) * 100);
  cards.innerHTML = `
          <h2 class="md my-3 text-center">Info for ${getCurrentDate()}</h2>
          <h3 class="my-2">Available rooms</h2>
          <p class="sm">${availableRoomCount}</p>
          <h3 class="my-2">Occupied rooms</h2>
          <p class="sm">${occupiedRoomPercent}</p>
          <h3 class="my-2">Total sales</h2>
          <p class="sm">${salesTotal}</p>
      `;
};

const getCurrentDate = () => {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();
  if (Number(dd) < 10) {
    dd = `0${dd}`;
  } else if (Number(mm) < 10) {
    mm = `0${mm}`;
  }
  return `${yyyy}/${mm}/${dd}`;
};

export default domUpdates