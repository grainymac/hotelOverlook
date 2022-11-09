import { expect } from "chai";
import { Room } from "../src/classes/Rooms";
import { roomsData } from "../src/data/roomsData";
import { Customer } from "../src/classes/Customer";
import { customersData } from "../src/data/customersData";
import { Booking } from "../src/classes/Bookings";
import { bookingsData } from "../src/data/bookingsData";

describe("Booking", () => {
  let roomData;
  let customerData;
  let customer1, customer2;
  let booking1, booking2, booking3;
  let bookingData;

  beforeEach(() => {
    roomData = roomsData.map((room) => new Room(room));
    customerData = customersData;
    customer1 = new Customer(customersData[0]);
    customer2 = new Customer(customersData[1]);
    bookingData = bookingsData;
    booking1 = new Booking(bookingsData[0]);
    booking2 = new Booking(bookingsData[1]);
    booking3 = new Booking(bookingsData[2]);
  });

  it.skip("should be an instance of Booking", () => {
    expect(booking1).to.be.an.instanceof(Booking);
  });

  it.skip("should have an id", () => {
    expect(booking1.id).to.equal("5fwrgu4i7k55hl6sz");
    expect(booking2.id).to.equal("5fwrgu4i7k55hl6t5");
    expect(booking3.id).to.equal("5fwrgu4i7k55hl6t6");
  });

  it.skip("should have an id for the customer", () => {
    expect(booking1.customerID).to.equal(9);
    expect(booking2.customerID).to.equal(43);
    expect(booking3.customerID).to.equal(13);
  });

  it.skip("should have a date of the booking", () => {
    expect(booking1.date).to.equal("2022/04/22");
    expect(booking2.date).to.equal("2022/01/24");
    expect(booking3.date).to.equal("2022/01/10");
  });

  it.skip("should have a room number with the booking", () => {
    expect(booking1.roomNumber).to.equal(15);
    expect(booking2.roomNumber).to.equal(24);
    expect(booking3.roomNumber).to.equal(12);
  });

  it.skip("should have no room information", () => {
    expect(booking1.roomInfo).to.equal("");
  });

  it.skip("should get room information", () => {
    expect(booking1.roomInfo).to.equal("");
    expect(booking2.roomInfo).to.equal("");
    booking1.getRoomInfo(roomData);
    booking2.getRoomInfo(roomData);
    expect(booking1.roomInfo).to.deep.equal({
      number: 15,
      roomType: "residential suite",
      bidet: false,
      bedSize: "full",
      numBeds: 1,
      costPerNight: 294.56,
    });
    expect(booking2.roomInfo).to.deep.equal({
      number: 24,
      roomType: "suite",
      bidet: false,
      bedSize: "queen",
      numBeds: 1,
      costPerNight: 327.24,
    });
  });

  it.skip("should have the room info set to a room object", () => {
    booking1.getRoomInfo(roomData);
    booking2.getRoomInfo(roomData);
    expect(booking1.roomInfo).to.be.an.instanceof(Room);
    expect(booking2.roomInfo).to.be.an.instanceof(Room);
  });

  it.skip("should get customer info with booking", () => {
    expect(booking1.getCustomerInfo(customerData)).to.deep.equal({
      id: 9,
      name: "Faustino Quitzon",
      allBookings: [],
      totalCost: 0,
    });
    expect(booking2.getCustomerInfo(customerData)).to.deep.equal({
      id: 43,
      name: "Earline Hamill",
      allBookings: [],
      totalCost: 0,
    });
  });

  it.skip("should check if the customer made a booking", () => {
    expect(booking1.bookedByCustomer(customer1, customerData)).to.equal(true);
    expect(booking2.bookedByCustomer(customer2, customerData)).to.equal(false);
  });
});
