function myFunction() {
    const x = document.getElementById("myTopnav");
    if (x.className === "nav-meu") {
      x.className += " resposive";
    } else {
      x.className = "nav-meu";
    }
  }