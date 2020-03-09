function myFunction() {
    const x = document.getElementById("myTopnav");
    if (x.className === "nav-menu") {
      x.className += " resposive";
    } else {
      x.className = "nav-menu";
    }
  }