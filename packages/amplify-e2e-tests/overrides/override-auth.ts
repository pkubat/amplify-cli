export function overrideProps(props: any): any {
  props.userPool.deviceConfiguration = {
    challengeRequiredOnNewDevice: true,
  };
  return props;
}
