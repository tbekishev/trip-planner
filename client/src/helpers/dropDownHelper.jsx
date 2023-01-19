const openNav = (id) => {
  document.getElementById(id).style.width = "30%";
}

const closeNav = (id) => {
  document.getElementById(id).style.width = "0";
}

const openNavH = (id) => {
  document.getElementById(id).style.height = "100%";
}

const closeNavH = (id) => {
  document.getElementById(id).style.height = "0";
}

export {openNav, closeNav, openNavH, closeNavH, };