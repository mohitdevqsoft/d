export function convertDate(dateString) {
  console.log("date string", dateString);
  if (dateString) {
    debugger;
    const dateParts = dateString?.split("T");
    debugger;
    const date = new Date(dateParts[0], dateParts[1] - 1);
    const time = dateParts[1];
    let dateTime = new Date(
      date.getTime() + time.split(":").reduce((a, b) => a * 60 + b) * 1000
    );
    console.log("time", dateTime);
    utcToIST(dateTime);
  }
}

// export function convertDate(dateString) {
//   debugger;
//   const dateParts = dateString.split("T");
//   const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
//   const time = dateParts[2];
//   const hours = parseInt(time.substring(0, 2), 10);
//   const minutes = parseInt(time.substring(3, 5), 10);
//   const seconds = parseInt(time.substring(6, 8), 10);
//   const milliseconds = parseInt(time.substring(9, 12), 10);
//   utcToIST(
//     new Date(
//       date.getTime() +
//         hours * 3600000 +
//         minutes * 60000 +
//         seconds * 1000 +
//         milliseconds
//     )
//   );
// }

//   const dateString = "20230421T145636";
//   const convertedDate = convertDate(dateString);
//   console.log(convertedDate); // "2023-04-22T00:56:36"

// const dateString = "20230421T145636";
// const convertedDate = convertDate(dateString);
// console.log(convertedDate); // "2023-04-22T00:56:36"

export function utcToIST(utcTime) {
  debugger;
  const utcDate = new Date(utcTime);
  const istDate = new Date(utcDate.getTime() + 19 * 60 * 60 * 1000);
  let ab = istDate.toISOString();
  return istDate.toISOString();
}

//   const utcTime = "2023-04-21T14:56:36";
//   const istTime = utcToIST(utcTime);
//   console.log(istTime); // "2023-04-22T00:56:36"
