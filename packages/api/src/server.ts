import Fastify from 'fastify'
import Web3 from 'web3'

import app from './app'

import { MINT_PRIVATE_KEY } from './constants'

const server = Fastify({
  logger: {
    level: 'info',
    prettyPrint: true,
  },
})

server
  .register(app)
  .then(() => server.ready())
  .then(() => {
    // Public key
    const account = new Web3().eth.accounts.privateKeyToAccount(
      MINT_PRIVATE_KEY
    )
    console.log('[Server] ECDSA public Key: ', account.address)

    server.listen(3000, '0.0.0.0', function (err, address) {
      if (err) {
        server.log.error(err)
        process.exit(1)
      }
    })
  })
