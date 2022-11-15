import { Room } from "./Room";
import { Booking } from "./Booking";

export class Customer {
  constructor(customerData) {
    this.id = customerData.id;
    this.name = customerData.name;
    this.bookings = [];
    this.totalCost = 0;
  }

  addBookings(allBookingsData) {
    this.bookings = allBookingsData.filter(booking => booking.userID === this.id);
    this.updateTotalCost();
  }

  updateTotalCost() {
    this.totalCost = 0;
    this.bookings.forEach((booking) => {
      this.totalCost += booking.roomDetails.costPerNight;
    });
  }
}