const openNav = (id) => {
  document.getElementById(id).style.width = "30%";
}

const closeNav = (id) => {
  document.getElementById(id).style.width = "0";
}

export {openNav, closeNav};