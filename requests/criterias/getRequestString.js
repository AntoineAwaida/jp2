export default function getRequestString(arraySelected) {
  let string = '';
  arraySelected.map((e, i) => {
    string += "'" + e + "'";
    if (i !== arraySelected.length - 1) {
      string += ',';
    }
  });
  return string;
}
