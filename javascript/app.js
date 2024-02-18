// per seat price and discount percentages
const seatPrice = 550;
const discountCodes = {
  NEW15: 15,
  Couple20: 20,
};

// initial available seat count
let availableSeats = 40;

// initial selected seats
let selectedSeats = [];

// coupon button
const couponButton = document.getElementById("coupon-button");

function calculateTotalPrice() {
  // calculate total price based on selected seats
  const totalPrice = selectedSeats.length * seatPrice;

  // apply discount price
  const couponInput = document.getElementById("coupon-input").value;
  const discountPercentage = discountCodes[couponInput] || 0;
  const discountedPrice = totalPrice * (1 - discountPercentage / 100);
  return discountedPrice;
}

function updateTotalPrice() {
  // calculate discounted price
  const discountedPrice = calculateTotalPrice();

  // calculate discount amount
  const totalPrice = selectedSeats.length * seatPrice;
  const discountAmount = totalPrice - discountedPrice;

  // update UI elements
  const totalPriceElement = document.getElementById("total_price");
  totalPriceElement.textContent = totalPrice;

  const discountPriceElement = document.getElementById("discount_price");
  discountPriceElement.textContent = discountAmount;

  const GrandtotalPriceElement = document.getElementById("Grandtotal_price");
  GrandtotalPriceElement.textContent = discountedPrice;
}

function handleClick(e) {
  const clickedButton = e.target;

  // Check if the button is already selected
  if (clickedButton.classList.contains("selected")) {
    return;
  }

  // validation for 4 seat
  const selectedButtons = document.querySelectorAll(".selected");
  if (selectedButtons.length >= 4) {
    alert("You have already selected 4 seats!");
    return;
  }

  // if selected btn then bg & color update
  clickedButton.classList.add("selected");
  clickedButton.style.backgroundColor = "#1dd100";
  clickedButton.style.color = "white";

  // push the seat in array
  const selectedSeat = clickedButton.textContent;
  selectedSeats.push(selectedSeat);

  // update selected seats count
  const selectedCount = selectedSeats.length;
  document.getElementById("selected-seat").textContent = selectedCount;
  availableSeats--;
  document.getElementById("available-seat").textContent = availableSeats;

  // if 4 buttons are selected then enable the coupon button
  if (selectedCount === 4) {
    couponButton.disabled = false;
  }

  // display the selected seat name, class & per seat price
  const seatInfoContainer = document.getElementById("seat-info");
  const seatInfoItem = document.createElement("h3");
  seatInfoItem.style.fontSize = "16px";
  seatInfoItem.style.fontWeight = "500";
  seatInfoItem.style.display = "flex";
  seatInfoItem.style.justifyContent = "space-between";
  seatInfoItem.innerHTML = `
    <span>${selectedSeat}</span>
    <span>Economy</span>
    <span>Per Seat: ${seatPrice}</span>
  `;
  seatInfoContainer.appendChild(seatInfoItem);

  // update total price
  updateTotalPrice();
}

// get the all button with querySelectorAll
document.querySelectorAll("#btn").forEach((button) => {
  button.addEventListener("click", handleClick);
});

document.getElementById("coupon-button").addEventListener("click", () => {
  const couponInput = document.getElementById("coupon-input").value;

  // if coupon code is valid
  if (!(couponInput in discountCodes)) {
    alert("Invalid coupon code! Please enter a valid coupon code.");
    return;
  }
  // update total price when coupon is applied
  updateTotalPrice();

  // hide coupon input field and apply button
  document.getElementById("discount-content").style.display = "none";
});

const numberInputs = document.querySelectorAll("#number");
const nextButton = document.getElementById("next-btn");

nextButton.disabled = true;

function checkValidity() {
  let atLeastOneButtonSelected = false;
  const selectedButtons = document.querySelectorAll(".selected");
  if (selectedButtons.length > 0) {
    atLeastOneButtonSelected = true;
  }
  const phoneNumberProvided = Array.from(numberInputs).some(
    (input) => input.value !== "" && !isNaN(input.value)
  );
  nextButton.disabled = !(atLeastOneButtonSelected && phoneNumberProvided);
}

document.querySelectorAll("#btn").forEach((button) => {
  button.addEventListener("click", () => {
    checkValidity();
  });
});

numberInputs.forEach((input) => {
  input.addEventListener("input", checkValidity);
});
