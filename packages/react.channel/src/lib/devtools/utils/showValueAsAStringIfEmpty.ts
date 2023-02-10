export const showValueAsAStringIfEmpty = (value: any) => {
  if (!value) {
    switch (value) {
      case null:
        return 'null';
      case undefined:
      case 'undefined':
        return 'undefined';
      case 0:
        return '0';
      case false:
        return 'false';
      default:
        return '';
    }
  }
};
