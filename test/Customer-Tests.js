import { expect } from "chai";
import { roomsData } from "../src/data/roomsData";
import { bookingsData } from "../src/data/bookingsData";
import { customersData } from "../src/data/customersData";
import { Room } from "../src/classes/Room";
import { Booking } from "../src/classes/Booking";
import { Customer } from "../src/classes/Customer";

describe("Customer", () => {
  let roomData;
  let bookingData;
  let customer1, customer2;
  let customerData;

  beforeEach(() => {
    roomData = roomsData.map(room => new Room(room));
    bookingData = bookingsData.map(booking => new Booking(booking));
    bookingData.forEach(booking => {
      booking.setRoom(roomData);
    });
    customerData = customersData;
    customer1 = new Customer(customerData[0]);
    customer2 = new Customer(customerData[1]);
  });

  it("should be an instance of Customer", () => {
    expect(customer1).to.be.an.instanceof(Customer);
  });

  it("should have an id", () => {
    expect(customer1.id).to.equal(1);
    expect(customer2.id).to.equal(2);
  });

  it("should have a name", () => {
    expect(customer1.name).to.equal("Leatha Ullrich");
    expect(customer2.name).to.equal("Rocio Schuster");
  });

  it("should have no bookings to start", () => {
    expect(customer1.bookings).to.deep.equal([]);
    expect(customer2.bookings).to.deep.equal([]);
  });

  it("should be able to see all bookings", () => {
    customer1.addBookings(bookingData);

    expect(customer1.bookings).to.deep.equal([
      {
        id: '5fwrgu4i7k55hl6t8',
        userID: 1,
        date: '2022/02/05',
        roomNumber: 12,
        roomDetails: {
          number: 12,
          roomType: 'single room',
          bidet: false,
          bedSize: 'twin',
          numBeds: 2,
          costPerNight: 172.09
        }
      },
      {
        
          id: "5fwrgu4i7k55hl6x8",
          userID: 1,
          date: "2023/01/11",
          roomNumber: 20,
          roomDetails: {
            number: 20,
            roomType: "residential suite",
            bidet: false,
            bedSize: "queen",
            numBeds: 1,
            costPerNight: 343.95
          }
        }
    ]);

  //   expect(customer2.bookings).to.deep.equal([
  //     {
  //       id: '5fwrgu4i7k55hl6tu',
  //       userID: 2,
  //       date: '2022/01/29',
  //       roomNumber: 6,
  //       roomDetails: {
  //         number: 6,
  //         roomType: 'junior suite',
  //         bidet: true,
  //         bedSize: 'queen',
  //         numBeds: 1,
  //         costPerNight: 397.02
  //       }
  //     },
  //     {
  //       id: '5fwrgu4i7k55hl6tx',
  //       userID: 2,
  //       date: '2022/01/18',
  //       roomNumber: 17,
  //       roomDetails: {
  //         number: 17,
  //         roomType: 'junior suite',
  //         bidet: false,
  //         bedSize: 'twin',
  //         numBeds: 2,
  //         costPerNight: 328.15
  //       }
  //     },
  //     {
  //       id: '5fwrgu4i7k55hl6u1',
  //       userID: 2,
  //       date: '2022/02/15',
  //       roomNumber: 21,
  //       roomDetails: {
  //         number: 21,
  //         roomType: 'single room',
  //         bidet: false,
  //         bedSize: 'full',
  //         numBeds: 2,
  //         costPerNight: 429.32
  //       }
  //     }
  //   ]);
  });

  it("should have no costs at start", () => {
    expect(customer1.totalCost).to.equal(0);
    expect(customer2.totalCost).to.equal(0);
  });

  it("should have total cost", () => {
    customer1.addBookings(bookingData);
    // customer2.addBookings(bookingData);
    customer1.updateTotalCost();
    // customer2.updateTotalCost();
    expect(customer1.totalCost).to.equal(344.18);
    // expect(customer2.totalCost).to.equal(1154.49);
  });
});