const faker = require ('faker')

function editClientPayload(){
    let clientPayload = {
                    "id":1,
                    "created": faker.date.recent(),
                    "name": faker.name.firstName(),
                    "email": faker.internet.email(),
                    "telephone": faker.phone.phoneNumber()
    }

    return clientPayload
}

function editClientRequest(){
    cy.request({
        method: 'PUT', 
        url:'http://localhost:3000/api/client/1',
        headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
            'Content-Type': 'application/json'
        },
        body: editClientPayload()
    }).then((response => {
        expect(response.status).to.eq(200)
        cy.log(JSON.stringify(response.body))
    })) 
}

function getClientRequest(){
    cy.request({
        method: 'GET',
        url: 'http://localhost:3000/api/clients',
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
    editClientPayload,
    editClientRequest,
    getClientRequest
}