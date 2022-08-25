const data = `id,name,surname,gender,email,picture
15519533,Raul,Flores,male,raul.flores@example.com,https://randomuser.me/api/portraits/men/42.jpg
82739790,Alvaro,Alvarez,male,alvaro.alvarez@example.com,https://randomuser.me/api/portraits/men/48.jpg
37206344,Adrian,Pastor,male,adrian.pastor@example.com,https://randomuser.me/api/portraits/men/86.jpg
58054375,Fatima,Guerrero,female,fatima.guerrero@example.com,https://randomuser.me/api/portraits/women/74.jpg
35133706,Raul,Ruiz,male,raul.ruiz@example.com,https://randomuser.me/api/portraits/men/78.jpg
79300902,Nerea,Santos,female,nerea.santos@example.com,https://randomuser.me/api/portraits/women/61.jpg
89802965,Andres,Sanchez,male,andres.sanchez@example.com,https://randomuser.me/api/portraits/men/34.jpg
62431141,Lorenzo,Gomez,male,lorenzo.gomez@example.com,https://randomuser.me/api/portraits/men/81.jpg
05298880,Marco,Campos,male,marco.campos@example.com,https://randomuser.me/api/portraits/men/67.jpg
61539018,Marco,Calvo,male,marco.calvo@example.com,https://randomuser.me/api/portraits/men/86.jpg`;

const fromCSV = (csv, nAttrs = 6) => {
  const deletedSpaces = csv.replace(/(\r\n|\n|\r)/gm, ",")
  const convertToArray = deletedSpaces.split(",");
  const getKeys = convertToArray.slice(0,6);
  const getValues = convertToArray.slice(6);
  const convertArrayToObject = (array) => {
    const result = [];
    for(let i = 0; i < array.length; i += 6){
      const deletePreviousRow = array.slice(i);
      const personinformation = {}
      for(let i = 0; i < nAttrs; i++) {
        personinformation[getKeys[i]] = deletePreviousRow[i];
      }
      result.push(personinformation);
    }
    return result
  };
  return convertArrayToObject(getValues);
};

const result = fromCSV(data);
console.log(result);
const resultExtra = fromCSV(data, 2);
console.log(resultExtra);