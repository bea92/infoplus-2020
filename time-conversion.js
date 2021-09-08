const DateTime = luxon.DateTime;

const dt = DateTime.now();
const previousZone = localStorage.getItem('previousTimeZone');
const localZone = previousZone || dt.zoneName;
const defaultZone = "America/New_York";

const zones = moment.tz.names();
const availableZones = zones.filter(
  (zone) => DateTime.local().setZone(zone).isValid
);

availableZones.forEach((tz) => {
  const item = document.createElementNS(
    "http://www.w3.org/1999/xhtml",
    "option"
  );
  item.setAttribute("value", tz);
  if (tz === localZone) {
    convertTimezones(localZone);
    item.setAttribute("selected", "selected");
  }
  item.innerHTML = tz;
  document.querySelector("select#time-zones").appendChild(item);
});

function convertTimezones(localZone) {
  // console.log(localZone)
  const slots = document.querySelectorAll(".converted-timezone");
  slots.forEach(function (el) {
    const dataTime = el.getAttribute("data-time");
    const date = DateTime.fromISO(`2021-09-27T${dataTime}:00:00`, {
      zone: defaultZone,
    });
    const convertedDate = date.setZone(localZone);
    let formattedDate = convertedDate.toFormat("ha");
    if (el.hasAttribute("data-duration")) {
      const end = convertedDate.plus({
        hours: el.getAttribute("data-duration"),
      });
      formattedDate += " - " + end.toFormat("ha");
    }
    el.innerHTML = formattedDate;
    storeTimeZone(localZone);
  });
}

function storeTimeZone(localZone) {
  // remember the selection
  localStorage.setItem('previousTimeZone', localZone);
  document.querySelector('#selected-time-zone').innerHTML = localZone;
  // set option in dropdown
  const options = document.querySelector("select#time-zones").querySelectorAll("option").forEach(option=>{
    if (option.getAttribute("value")===localZone) {
      option.setAttribute("selected", "selected");
    } else {
      option.removeAttribute("selected");
    }
  })
  // hide modal
  $('#selectTimezoneModal').modal('hide')
}

function guessTimezone() {
  const localZone = dt.zoneName;
  storeTimeZone(localZone);
}