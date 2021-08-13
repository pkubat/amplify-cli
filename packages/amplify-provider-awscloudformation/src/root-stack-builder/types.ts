import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as iam from '@aws-cdk/aws-iam';

export interface AmplifyRootStackTemplate {
  deploymentBucket?: s3.CfnBucket;
  authRole?: iam.CfnRole;
  unauthRole?: iam.CfnRole;

  addCfnParameter(props: cdk.CfnParameterProps, logicalId: string): void;
  addCfnOutput(props: cdk.CfnOutputProps, logicalId: string): void;
  addCfnMapping(props: cdk.CfnMappingProps, logicalId: string): void;
  addCfnCondition(props: cdk.CfnConditionProps, logicalId: string): void;
  addCfnResource(props: cdk.CfnResourceProps, logicalId: string): void;
}

export interface Template {
  AWSTemplateFormatVersion?: string;
  Description?: string;
  Metadata?: Record<string, any>;
  Parameters?: Record<string, any>;
  Mappings?: {
    [key: string]: {
      [key: string]: Record<string, string | number | string[]>;
    };
  };
  Conditions?: Record<string, any>;
  Transform?: any;
  Resources?: Record<string, any>;
  Outputs?: Record<string, any>;
}