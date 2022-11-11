import { Room } from '../classes/Room';
import { Customer } from '../classes/Customer';

export class Booking {
    constructor(bookingData) {
        this.id = bookingData.id;
        this.userID = bookingData.userID;
        this.date = bookingData.date;
        this.roomNumber = bookingData.roomNumber;
        this.roomDetails = '';
    }

    setRoom(allRoomsData) {
        const findRoom = allRoomsData.find(room => room.number === this.roomNumber);
        this.roomDetails = findRoom;
    };

    getRoomDetails() {
        return this.roomDetails;
    };

    getCustomer(allCustomersData) {
        const findCustomer = allCustomersData.find(customer => customer.id === this.userID);
        return new Customer(findCustomer);
    };

    isBookedByCurrentCustomer(currentCustomer, allCustomersData) {
        return this.getCustomer(allCustomersData).id === currentCustomer.id;
    };
};