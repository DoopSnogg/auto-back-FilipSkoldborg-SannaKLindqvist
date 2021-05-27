const faker = require ('faker')

function createReservationPayload(){
    let reservationPayload = {
                    "client":1,
                    "room":1,
                    "bill":1,
                    "start": faker.date.recent(),
                    "end": faker.date.soon()
    }

    return reservationPayload
}

function createReservationRequest(){
    cy.request({
        method: 'POST', 
        url:'http://localhost:3000/api/reservation/new',
        headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
        body: createReservationPayload()
    }).then((response => {
        expect(response.status).to.eq(200)
        cy.log(JSON.stringify(response.body))
    }))
}

function getReservationRequest(){
    cy.request({
        method: 'GET',
        url: 'http://localhost:3000/api/reservations',
        headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        }
    }).then((response => {
        expect(response.status).to.eq(200)
        cy.log(JSON.stringify(response.body))
    }))
}
module.exports = {
    createReservationPayload,
    createReservationRequest,
    getReservationRequest,
}