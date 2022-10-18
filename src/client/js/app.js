
// rest form with eventlistener//

const resetForm = document.getElementById("remove");
resetForm.addEventListener("click", resetTrip);
function resetTrip() {
  document.getElementById("tripForm").reset();
}

export{resetTrip}