const DateTime = luxon.DateTime;

const dt = DateTime.now();
const localZone = dt.zoneName;
const defaultZone = "America/New_York";

// console.log(dt);
// console.log(localZone, DateTime.local().setZone(localZone).isValid);

const zones = moment.tz.names();
const availableZones = zones.filter(
  (zone) => DateTime.local().setZone(zone).isValid
);

// console.log(zones);
// console.log(availableZones);

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
	const slots = document.querySelectorAll(".converted-timezone")
	slots.forEach(function(el){
		const dataTime = el.getAttribute("data-time")
		const date = DateTime.fromISO(`2021-09-27T${dataTime}:00:00`, { zone: defaultZone })
		const convertedDate = date.setZone(localZone);
		const formattedDate = convertedDate.toLocaleString(DateTime.TIME_SIMPLE);
		// console.log(formattedDate);
		el.innerHTML = formattedDate
	})
}
