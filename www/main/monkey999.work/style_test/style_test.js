const footSpace = document.querySelector(".foot_space.button_area");
const footDummy = document.querySelector(".foot_dummy");
const testCheck = document.querySelector("#test_check");
const btn = document.getElementsByClassName("btn")[0];
document.querySelector(".add_footer_element").addEventListener(
  "click",
  (e) => {
    const btnTemp = btn?.cloneNode(true);
    if (testCheck.checked) {
      footSpace.appendChild(btnTemp);
    } else {
      footDummy.appendChild(btnTemp);
    }
  },
  false
);

document.querySelector(".delete_footer_element").addEventListener(
  "click",
  (e) => {
    footSpace.innerHTML = "";
    footDummy.innerHTML = "<p>dummy area</p>";
  },
  false
);
