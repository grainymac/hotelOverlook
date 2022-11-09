import { Room } from './Rooms';
import { Booking } from './Bookings'

export class Customer {
    constructor (customerData) {
        this.id = customerData.id;
        this.name = customerData.name;
        
    }
}