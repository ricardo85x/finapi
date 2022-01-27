const express = require('express');
const { v4 : uuidv4  } = require('uuid')

const app = express();

app.use(express.json())


/**
 * cpf - string
 * name - string
 * id - uuid
 * statement - []
 */


const customers = []

app.post("/account", (req, res) => {
    const { cpf, name } = req.body
    const id = uuidv4()

    customers.push({
        cpf, name, id, statement: []
    })

    return res.status(201).send()
})

app.get('/', (req, res) => {
    return res.json({ message: 'Hello, world!' });
})

app.listen(3333, () => console.log('listening on port 3333'))