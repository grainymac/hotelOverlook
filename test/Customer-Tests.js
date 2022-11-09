import { expect } from 'chai';
import { roomsData } from '../src/data/roomsData'
import { bookingsData } from '../src/data/bookingsData';
import { customersData } from '../src/data/customersData'
import { Rooms } from '../src/classes/Rooms'
import { Bookings } from '../src/classes/Bookings'
import { Customer } from '../src/classes/Customer'


describe ('Customer', () => {
    let roomData;
    let bookingData;
    let customer1, customer2;
    let customerData;

    beforeEach(() => {
        roomData = roomsData.map(room => new Rooms(room))
        bookingData = bookingsData.map(booking => new Bookings(booking))
        customerData = customersData
        customer1 = new Customer(customerData[0]);
        customer2 = new Customer(customerData[1]);
    })

    it('should be an instance of Customer', () => {
        expect(customer1).to.be.an.instanceof(Customer);
    });

    it('should have an id', () => {
        expect(customer1).to.equal(1);
        expect(customer2).to.equal(2);
    });

    it('should have a name', () => {
        expect(customer1).to.equal('Leatha Ulrich');
        expect(customer2).to.equal('Rocio Schuster');
    })

    it('should have no bookings to start', () => {
        expect(customer1.bookings).to.deep.equal([]);
        expect(customer2.bookings).to.deep.equal([]);
    });

    it('should be able to see all bookings', () => {
        expect(customer1.bookings).to.deep.equal([
            {
            "id": "5fwrgu4i7k55hl6t8",
            "userID": 1,
            "date": "2022/02/05",
            "roomNumber": 12,
            "roomInfo": {
                "number": 12,
                "roomType": "single room",
                "bidet": false,
                "bedSize": "twin",
                "numBeds": 2,
                "costPerNight": 172.09
              }     
          },
          {
            "id": "5fwrgu4i7k55hl6x8",
            "userID": 1,
            "date": "2023/01/11",
            "roomNumber": 20,
            "roomInfo": {
                "number": 20,
                "roomType": "residential suite",
                "bidet": false,
                "bedSize": "queen",
                "numBeds": 1,
                "costPerNight": 343.95
              }
          }
        ]);
        expect(customer2.bookings).to.deep.equal([
            {
            "id": "5fwrgu4i7k55hl6uf",
            "userID": 2,
            "date": "2023/01/09",
            "roomNumber": 18,
            "roomInfo": {
                "number": 18,
                "roomType": "junior suite",
                "bidet": false,
                "bedSize": "king",
                "numBeds": 2,
                "costPerNight": 496.41
              }
          },
          {
            "id": "5fwrgu4i7k55hl6uy",
            "userID": 2,
            "date": "2023/01/24",
            "roomNumber": 19,
            "roomInfo": {
                "number": 19,
                "roomType": "single room",
                "bidet": false,
                "bedSize": "queen",
                "numBeds": 1,
                "costPerNight": 374.67
              }
          }
        ]);
    });

    it('should have no costs at start', () => {
        expect(customer1.totalCost).to.equal(0);
        expect(customer2.totalCost).to.equal(0);
    });

    it('should have total cost', () => {
        expect(customer1.totalCost).to.equal(516.04);
        expect(customer2.totalCost).to.equal(871.08);
    });
})