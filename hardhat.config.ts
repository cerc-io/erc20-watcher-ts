//
// Copyright 2021 Vulcanize, Inc.
//

import 'dotenv/config';

import '@nomiclabs/hardhat-waffle';

import './test/tasks/token-deploy';
import './test/tasks/token-transfer';
import './test/tasks/token-approve';
import './test/tasks/token-transfer-from';
import './test/tasks/block-latest';
import './test/tasks/account';
import './test/tasks/token-balance';

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const accounts = process.env.ACCOUNT_PRIVATE_KEY ? [process.env.ACCOUNT_PRIVATE_KEY] : undefined;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
export default {
  solidity: '0.8.0',
  networks: {
    docker: {
      url: process.env.ETH_RPC_URL || 'http://go-ethereum:8545',
      accounts
    }
  },
  paths: {
    sources: './test/contracts'
  }
};
