const openNav = (id) => {
  document.getElementById(id).style.height = "100%";
}

const closeNav = (id) => {
  document.getElementById(id).style.height = "0";
}

export {openNav, closeNav};