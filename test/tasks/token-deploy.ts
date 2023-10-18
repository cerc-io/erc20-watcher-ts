//
// Copyright 2021 Vulcanize, Inc.
//

import { task, types } from 'hardhat/config';
import '@nomiclabs/hardhat-ethers';
import fs from 'fs';
import path from 'path';

const DEFAULT_INITIAL_SUPPLY = '1000000000000000000000';

task('token-deploy', 'Deploys GLD token')
  .addOptionalParam('initialSupply', 'Set total supply', DEFAULT_INITIAL_SUPPLY, types.string)
  .addOptionalParam('file', 'JSON file to export contract address to', undefined, types.string)
  .setAction(async (args, hre) => {
    const { initialSupply, file } = args;
    await hre.run('compile');
    const Token = await hre.ethers.getContractFactory('GLDToken');
    const token = await Token.deploy(hre.ethers.BigNumber.from(initialSupply));

    const receipt = await token.deployTransaction.wait();
    console.log('GLD Token deployed to:', token.address);
    console.log('Deployed at block:', receipt.blockNumber, receipt.blockHash);

    if (file) {
      const filePath = path.resolve(file as string);
      const result = {
        address: token.address
      };
      fs.writeFileSync(filePath, JSON.stringify(result, null, 2), 'utf-8');

      console.log('Address written to file', filePath);
    }
  });
