/// <reference types="cypress" />

import * as client from '../helpers/ClientHelpers'
import * as room from '../helpers/roomHelpers'
import * as logout from '../helpers/logoutHelpers'
import * as bill from '../helpers/billHelpers'
import * as reservation from '../helpers/reservationHelpers'

describe('Test suite', () => {

    it('New room', () => {
        cy.authenticate().then((response => {
            room.createRoomRequest()
            logout.createLogoutRequest()

        }))
    })

    it('New bill', () => {
        cy.authenticate().then((response => {
            bill.createBillRequest()
            logout.createLogoutRequest()

        }))
    })

    it('New reservation', () => {
        cy.authenticate().then((response => {
            reservation.createReservationRequest()
            logout.createLogoutRequest()

        }))
    })

    it('Edit room', () => {
        cy.authenticate().then((response => {
            room.editRoomRequest()
            logout.createLogoutRequest() 
        }))
    })

    it('Edit client', () =>{
        cy.authenticate().then((response =>{
            client.editClientRequest()
            logout.createLogoutRequest()
            
        }))
    })

    it('Get reservations', () =>{
        cy.authenticate().then((response =>{
            reservation.getReservationRequest()
            logout.createLogoutRequest()
        }))
    })

    it('Get rooms',() =>{
        cy.authenticate().then((response =>{
            room.getRoomRequest()
            logout.createLogoutRequest()
        }))
    })

    it('Get clients',() =>{
        cy.authenticate().then((response =>{
            client.getClientRequest()
            logout.createLogoutRequest()
        }))
    })

    it('Delete room', () => {
        cy.authenticate().then((response => {
            room.createRoomRequest()
            room.deleteRoomRequest()
            logout.createLogoutRequest()   
        })) 
     })

     it('Delete bill', () => {
        cy.authenticate().then((response => {
            bill.createBillRequest()
            bill.deleteBillRequest()
            logout.createLogoutRequest()   
            })) 
        })
     })
