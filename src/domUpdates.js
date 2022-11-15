export const showElement = (element) => {
  element.classList.remove("hidden");
};

export const hideElement = (element) => {
  element.classList.add("hidden");
};

const clearDisplay = (view) => {
  view.innerHTML = "";
};

export const displaySuccessMsg = (message) => {
    const successMsg = document.querySelector("#validationMsg");
    validationMsg.innerText = message;
}

export const displaySearchMsg = (message) => {
  searchMsg.innerText = message;
};

export const displayDashboardCards = (bookings, isHidden=true) => {
    clearDisplay(dashboardContainer);
    console.log(typeof bookings)
    if (!bookings.length) {
    dashboardContainer.innerHTML = `<h2>there are no bookings available</h2>`;
  } else {
    displayBookedCards(bookings, isHidden);
  }
  displayBookingCost(bookings);
};

export const displayBookedCards = (bookings, isHidden) => {
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
    const totalCost = document.querySelector("#totalCost");
    totalCost.innerText = `$${bookingTotal.toFixed(2)}`;
}

export const displayBookingCards = (startDate, availableRooms) => {
  clearDisplay(bookContainer);
  if (!availableRooms.length) {
    bookContainer.innerHTML = `
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

export const displayDashboardHeader = (currentCustomer) => {
  const displayName = `${currentCustomer.name}`;
  const welcomeMsg = "Welcome to Hotel Overlook!";
  displayContentHeadDash(displayName, welcomeMsg);
};

export const displayBookHeader = () => {
    const displayName = "make a reservation";
    const welcomeMsg = "reserve a new room.";
    displayContentHeadDash(displayName, welcomeMsg);
}

const displayContentHeadDash = (displayName, welcomeMsg) => {
    const headDashboardContainer = document.querySelector("#headDashboardContainer");
  headDashboardContainer.innerHTML += `
      <article>
          <h2 class="lg">${displayName}</h2>
          <p>Date: ${getCurrentDate()}</p>
          <p>${welcomeMsg}</p>
      </article>`;
};

export const getCurrentDate = () => {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();
  if (Number(dd) < 10) {
    dd = `0${dd}`
  } else if (Number(mm) < 10) {
    mm = `0${mm}`
  }
  return `${yyyy}/${mm}/${dd}`;
};