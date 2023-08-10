// 1. Generate new variables using the querySelector method.
const items = [];
const inputElement = document.querySelector(".new-name");
const addButton = document.querySelector(".add");
const sortByNameButton = document.querySelector(".sort-name");
const sortByValueButton = document.querySelector(".sort-value");
const deleteButton = document.querySelector(".delete");
const showXmlButton = document.querySelector(".show-xml");
const itemListElement = document.querySelector(".item-list");

// 2. Conduct a validation for alphanumeric characters (limited to the Latin alphabet only).
function isAlphaNumeric(string) {
  const alphaNumericRegex = /^[a-zA-Z0-9]+$/;
  return alphaNumericRegex.test(string);
}

// 3. Divide the input string using the '=' separator and perform validation on both the name and value sections.
function parseInput(string) {
  const array = string.split("=");

  if (array.length === 2) {
    const name = array[0].trim();
    const value = array[1].trim();

    if (
      name.length > 0 &&
      value.length > 0 &&
      isAlphaNumeric(name) &&
      isAlphaNumeric(value)
    ) {
      return [name, value];
    }
  }

  return [];
}

// 4. choose an item
itemListElement.addEventListener("click", (event) => {
  const selectedItem = event.target;

  if (selectedItem.tagName === "LI") {
    const currentSelected = document.querySelector("li.selected");

    if (currentSelected) {
      currentSelected.classList.remove("selected");
    }

    selectedItem.classList.add("selected");
  }
});
// 5. get user input
addButton.addEventListener("click", () => {
  const info = inputElement.value;

  const nameValue = parseInput(info);
  if (nameValue.length === 0) {
    alert("Please specify two value through = or Latin alphabet only");
  } else {
    items.push(nameValue);
    itemListElement.insertAdjacentHTML("beforeend", `<li>${info}</li>`);
    inputElement.value = "";
  }
});

// 6. The function of changing and adding an element to the markup
function updateItemList(array, doSortByName) {
  const index = doSortByName ? 0 : 1;
  const sortedArray = [...array].sort((prevItem, currentItem) =>
    prevItem[index].localeCompare(currentItem[index])
  );

  itemListElement.innerHTML = "";
  sortedArray.forEach((item) =>
    itemListElement.insertAdjacentHTML(
      "beforeend",
      `<li>${item[0]}=${item[1]}</li>`
    )
  );
}

// 7. Sort function by name/value
sortByNameButton.addEventListener("click", () => {
  updateItemList(items, true);
});

// 8. Sort function by name/value
sortByValueButton.addEventListener("click", () => {
  updateItemList(items, false);
});

// 9. Delete the selected item
deleteButton.addEventListener("click", () => {
  const selectedItem = document.querySelector("li.selected");

  const nameValueToDelete = selectedItem.textContent.split("=");
  const itemToDeleteIndex = items.findIndex(
    (element) =>
      element[0] === nameValueToDelete[0] && element[1] === nameValueToDelete[1]
  );

  if (itemToDeleteIndex !== -1) {
    items.splice(itemToDeleteIndex, 1);
    selectedItem.remove();
  }
});

// 10. The function of Xml format
showXmlButton.addEventListener("click", () => {
  const xmlString = new XMLSerializer().serializeToString(itemListElement);
  alert(xmlString);
});
