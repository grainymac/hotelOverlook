import { expect } from 'chai'
import { Room } from '../src/classes/Room'
import { roomsData } from '../src/data/roomsData'

describe('Rooms', () => {
    let room1, room2, room3;
    let roomData;

    beforeEach(() => {
        roomData = roomsData;
        room1 = new Room(roomsData[0]);
        room2 = new Room(roomsData[1]);
        room3 = new Room(roomsData[2]);
    });

    it('should be an instance of Room', () => {
        expect(room1).to.be.an.instanceof(Room);
    });

    it('should have a room number', () => {
        expect(room1.number).to.equal(1);
    });

    it('should have a type of room', () => {
        expect(room1.roomType).to.equal('residential suite');
    });

    it('should have a bidet or not', () => {
        expect(room1.bidet).to.equal(true);
        expect(room2.bidet).to.equal(false);
        expect(room3.bidet).to.equal(false);
    });

    it('should say what size the bed is', () => {
        expect(room1.bedSize).to.equal('queen');
        expect(room2.bedSize).to.equal('full');
        expect(room3.bedSize).to.equal('king');
    });

    it('should say number of beds', () => {
        expect(room1.numBeds).to.equal(1);
        expect(room2.numBeds).to.equal(2);
        expect(room3.numBeds).to.equal(1);
    });

    it('should have the cost per night', () => {
        expect(room1.costPerNight).to.equal(358.4);
        expect(room2.costPerNight).to.equal(477.38);
        expect(room3.costPerNight).to.equal(491.14);
    });

    it('should get the cost of room per night', () => {
        expect(room1.getCost()).to.equal(358.4);
        expect(room2.getCost()).to.equal(477.38);
        expect(room3.getCost()).to.equal(491.14);
    });
});