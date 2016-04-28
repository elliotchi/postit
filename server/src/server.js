'use strict'

const server = require('./config/server-config');
require('dotenv').config();

const PORT = process.env.PORT;

server.listen(PORT, () => console.log(`server listening on port ${PORT}`));
