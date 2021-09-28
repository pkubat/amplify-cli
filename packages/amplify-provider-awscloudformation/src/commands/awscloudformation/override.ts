/*
    entry code for amplify override root
*/

import path from 'path';
import { generateOverrideSkeleton, $TSContext, FeatureFlags } from 'amplify-cli-core';
import { printer } from 'amplify-prompts';
import * as fs from 'fs-extra';

const subcommand = 'override';

export const name = 'overrides';

export const run = async (context: $TSContext) => {
  if (FeatureFlags.getBoolean('overrides.project')) {
    const backendDir = context.amplify.pathManager.getBackendDirPath();

    const destPath = path.join(backendDir, 'awscloudformation');
    fs.ensureDirSync(destPath);
    const srcPath = path.join(__dirname, '..', '..', '..', 'resources', 'overrides-resource');
    // removing runtime old root cfn stack
    // no need for rollback since these files will be autogenerated after push
    const oldRootStackFile = path.join(destPath, 'nested-cloudformation-stack.yml');
    if (fs.existsSync(oldRootStackFile)) {
      fs.unlinkSync(oldRootStackFile);
    }
    await generateOverrideSkeleton(context, srcPath, destPath);
  } else {
    printer.info('Project level overrides is currently not turned on. In cli.json file please include the following:');
    printer.info(`{
      override: {
         project: true
      }
    }`);
  }
};
