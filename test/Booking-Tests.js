import { expect } from "chai";
import { Room } from "../src/classes/Room";
import { Customer } from "../src/classes/Customer";
import { Booking } from "../src/classes/Booking";
import { roomsData } from "../src/data/roomsData";
import { customersData } from "../src/data/customersData";
import { bookingsData } from "../src/data/bookingsData";

describe("Booking", () => {
  let roomData;
  let customerData;
  let customer1, customer2;
  let booking1, booking2, booking3;
  let bookingData;

  beforeEach(() => {
    roomData = roomsData.map(room => new Room(room));
    customerData = customersData;
    customer1 = new Customer(customersData[8]);
    customer2 = new Customer(customersData[9]);
    bookingData = bookingsData;
    booking1 = new Booking(bookingsData[0]);
    booking2 = new Booking(bookingsData[1]);
    booking3 = new Booking(bookingsData[2]);
  });

  it("should be an instance of Booking", () => {
    expect(booking1).to.be.an.instanceof(Booking);
  });

  it("should have an id", () => {
    expect(booking1.id).to.equal("5fwrgu4i7k55hl6sz");
    expect(booking2.id).to.equal("5fwrgu4i7k55hl6t5");
    expect(booking3.id).to.equal("5fwrgu4i7k55hl6t6");
  });

  it("should have an id for the customer", () => {
    expect(booking1.userID).to.equal(9);
    expect(booking2.userID).to.equal(43);
    expect(booking3.userID).to.equal(13);
  });

  it("should have a date of the booking", () => {
    expect(booking1.date).to.equal("2022/04/22");
    expect(booking2.date).to.equal("2022/01/24");
    expect(booking3.date).to.equal("2022/01/10");
  });

  it("should have a room number with the booking", () => {
    expect(booking1.roomNumber).to.equal(15);
    expect(booking2.roomNumber).to.equal(24);
    expect(booking3.roomNumber).to.equal(12);
  });

  it("should have no room information", () => {
    expect(booking1.roomDetails).to.equal("");
  });

  it("should get room information", () => {
    expect(booking1.roomDetails).to.equal("");
    expect(booking2.roomDetails).to.equal("");
    booking1.setRoom(roomData);
    booking2.setRoom(roomData);
    expect(booking1.roomDetails).to.deep.equal({
      number: 15,
            roomType: 'residential suite',
            bidet: false,
            bedSize: 'full',
            numBeds: 1,
            costPerNight: 294.56
        });

    expect(booking2.roomDetails).to.deep.equal({
      number: 24,
            roomType: 'suite',
            bidet: false,
            bedSize: 'queen',
            numBeds: 1,
            costPerNight: 327.24
        });
  });

  it("should have the room info set to a room object", () => {
    booking1.setRoom(roomData);
    booking2.setRoom(roomData);
    expect(booking1.roomDetails).to.be.an.instanceof(Room);
    expect(booking2.roomDetails).to.be.an.instanceof(Room);
  });

  it('should get room details after they have been set', () => {
    expect(booking1.roomDetails).to.equal("");
    expect(booking2.roomDetails).to.equal("");
    booking1.setRoom(roomData);
    booking2.setRoom(roomData);
    expect(booking1.getRoomDetails()).to.deep.equal({
      number: 15,
      roomType: "residential suite",
      bidet: false,
      bedSize: "full",
      numBeds: 1,
      costPerNight: 294.56,
    });
    expect(booking2.getRoomDetails()).to.deep.equal({
      number: 24,
      roomType: "suite",
      bidet: false,
      bedSize: "queen",
      numBeds: 1,
      costPerNight: 327.24,
    });
  });

  it("should get customer info with booking", () => {
    expect(booking1.getCustomer(customerData)).to.deep.equal({
      id: 9,
      name: "Faustino Quitzon",
      bookings: [],
      totalCost: 0,
    });
    expect(booking2.getCustomer(customerData)).to.deep.equal({
      id: 43,
      name: "Earline Hamill",
      bookings: [],
      totalCost: 0,
    });
  });

  it("should check if the current customer made a booking", () => {
    expect(booking1.isBookedByCurrentCustomer(customer1, customerData)).to.equal(true);
    expect(booking2.isBookedByCurrentCustomer(customer2, customerData)).to.equal(false);
  });
});