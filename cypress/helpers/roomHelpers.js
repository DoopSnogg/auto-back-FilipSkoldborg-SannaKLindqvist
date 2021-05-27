const faker = require ('faker')

function createRoomPayload(){
    let roomPayload = {
        "features":["penthouse"],
                    "category":"double",
                    "number": faker.datatype.number(),
                    "floor": faker.datatype.number(),
                    "price": faker.commerce.price()
    }

    return roomPayload
}
function editRoomPayload(){
    let roomPayload = {
                    "id":1,
                    "created": faker.date.recent(),
                    "category":"double",
                    "floor": faker.datatype.number(),
                    "number": faker.datatype.number(),
                    "available":true,
                    "price": faker.commerce.price(),
                    "features":["balcony","ensuite"]

    }

    return roomPayload
}

function createRoomRequest(){
    cy.request({
        method: 'POST',
        url: 'http://localhost:3000/api/room/new',
        headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
        body: createRoomPayload() 
    }).then((response => {
        expect(response.status).to.eq(200)
        cy.log(JSON.stringify(response.body))
    }))
}

function editRoomRequest(){
    cy.request({
        method: 'PUT', 
        url:'http://localhost:3000/api/room/1',
        headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
        body: editRoomPayload()
    }).then((response => {
        expect(response.status).to.eq(200)
        cy.log(JSON.stringify(response.body))
    }))
}

function getRoomRequest(){
    cy.request({
        method: 'GET', 
        url: 'http://localhost:3000/api/rooms', 
        headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
            'Content-Type': 'application/json'
        }
    }).then((response =>{
        expect(response.status).to.eq(200)
        cy.log(JSON.stringify(response.body))
    }))
}

function deleteRoomRequest(){
    cy.request({
        method: 'GET', 
        url: 'http://localhost:3000/api/rooms', 
        headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
            'Content-Type': 'application/json'
        }
    }).then((response =>{
        expect(response.status).to.eq(200)
        let lastID = response.body[response.body.length -1].id
        cy.log(lastID)

        cy.request({
            method: 'DELETE', 
            url:'http://localhost:3000/api/room/'+lastID, 
            headers: {
                'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
                'Content-Type': 'application/json'
            }
        }).then((response => {
            expect(response.status).to.eq(200)
            cy.log(JSON.stringify(response.body))
        }))
    }))
}
 
module.exports = {
    createRoomPayload,
    createRoomRequest,
    editRoomPayload,
    editRoomRequest,
    getRoomRequest,
    deleteRoomRequest
}