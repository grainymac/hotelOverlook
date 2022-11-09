import { expect } from 'chai'
import { Room } from '../src/classes/Rooms'
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

    it.skip('should be an instance of Room', () => {
        expect(room1).to.be.an.instanceof(Room);
    });

    it.skip('should have a room number', () => {
        expect(room1).to.equal(1);
    });

    it.skip('should have a type of room', () => {
        expect(room1).to.equal('residential suite');
    });

    it.skip('should have a bidet or not', () => {
        expect(room1).to.equal(true);
        expect(room2).to.equal(false);
        expect(room3).to.equal(false);
    });

    it.skip('should say what size the bed is', () => {
        expect(room1).to.equal('queen');
        expect(room2).to.equal('full');
        expect(room3).to.equal('king');
    });

    it.skip('should say number of beds', () => {
        expect(room1).to.equal(1);
        expect(room2).to.equal(2);
        expect(room3).to.equal(1);
    });

    it.skip('should have the cost per night', () => {
        expect(room1.costPerNight).to.equal(358.4);
        expect(room2.costPerNight).to.equal(477.38);
        expect(room3.costPerNight).to.equal(491.14);
    });

    it.skip('should get the cost of room per night', () => {
        expect(room1.getCostOfRoom()).to.equal(358.4);
        expect(room2.getCostOfRoom()).to.equal(477.38);
        expect(room3.getCostOfRoom()).to.equal(491.14);
    });
});