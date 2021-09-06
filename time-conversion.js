let dt = DateTime.now();
let localZone = dt.zoneName;

console.log(dt);
console.log(localZone, DateTime.local().setZone(localZone).isValid);

const zones = moment.tz.names();
const availableZones = zones.filter(
  (zone) => DateTime.local().setZone(zone).isValid
);

console.log(zones);
console.log(availableZones);

availableZones.forEach((tz) => {
  const item = document.createElementNS(
    "http://www.w3.org/1999/xhtml",
    "option"
  );
  item.setAttribute("value", tz);
  if (tz === localZone) {
    item.setAttribute("selected", "selected");
  }
  item.innerHTML = tz;
  document.querySelector("select#time-zones").appendChild(item);
});
