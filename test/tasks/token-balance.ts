//
// Copyright 2023 Vulcanize, Inc.
//

import { task, types } from 'hardhat/config';
import '@nomiclabs/hardhat-ethers';

task('token-balance', 'Move tokens to recipient')
  .addParam('token', 'Token contract address', undefined, types.string)
  .addParam('account', 'Account address', undefined, types.string)
  .setAction(async (args, hre) => {
    const { token: tokenAddress, account } = args;
    await hre.run('compile');
    const Token = await hre.ethers.getContractFactory('GLDToken');
    const token = Token.attach(tokenAddress);

    const result = await token.balanceOf(account);
    console.log('Result', result);
  });
