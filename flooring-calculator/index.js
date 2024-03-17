// Inputs for flooring details
const lengthFeetInput = document.getElementById('length');
const lengthInchesInput = document.getElementById('length-in');
const widthFeetInput = document.getElementById('width');
const widthInchesInput = document.getElementById('width-in');
const totalAreaInput = document.getElementById('area');

// Inputs for flooring costs
const wasteInput = document.getElementById('waste');
const totalMaterialAreaInput = document.getElementById('total-material-area');
const costMaterialAreaInput = document.getElementById('cost-material-area');
const totalMaterialCostInput = document.getElementById('total-material-cost');

// Email button/modal
const emailButton = document.getElementById('email');

// Function to calculate and update the area
function updateRoomArea() {
  const lengthFeet = Number(lengthFeetInput.value);
  const lengthInches = Number(lengthInchesInput.value);
  const widthFeet = Number(widthFeetInput.value);
  const widthInches = Number(widthInchesInput.value);

  const lengthTotal = lengthFeet * 12 + lengthInches; // Convert everything to inches
  const widthTotal = widthFeet * 12 + widthInches;
  const area = (lengthTotal * widthTotal) / 144; // Convert square inches to square feet

  totalAreaInput.value = area.toFixed(1); // Update the area input with the calculated area, rounded to 2 decimal places

  updateFlooringCosts(area);
}

// Function to calculate and update flooring costs
function updateFlooringCosts(area) {
  const wasteFactor = Number(wasteInput.value) / 100;
  const totalMaterialArea = area * (1 + wasteFactor);
  totalMaterialAreaInput.value = totalMaterialArea.toFixed(2);

  // New code to calculate and update the total material cost
  const costPerUnitArea = Number(costMaterialAreaInput.value);
  const totalMaterialCost = totalMaterialArea * costPerUnitArea; // Calculate total material cost
  totalMaterialCostInput.value = totalMaterialCost.toFixed(2); // Update the total material cost input
}

// Attach the updateCalculations function to input events for all related inputs
[widthFeetInput, widthInchesInput].forEach((input) => {
  input.addEventListener('input', updateRoomArea);
});

// Attach updateFlooringCosts directly to the waste and cost inputs, requiring the current room area to calculate
[wasteInput, costMaterialAreaInput].forEach((input) => {
  input.addEventListener('input', () => {
    const area = parseFloat(totalAreaInput.value) || 0; // Use current room area or 0 if not available
    updateFlooringCosts(area);
  });
});
