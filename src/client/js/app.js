
// rest form with eventlistener//
if (typeof document !== "undefined") {
  document.getElementById("remove").addEventListener("click", resetTrip);
}

function resetTrip() {
  document.getElementById("tripForm").reset();
}

export{resetTrip}