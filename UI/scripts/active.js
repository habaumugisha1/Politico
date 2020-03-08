// const linkContainer = document.getElementById("myNav a");

// const links = linkContainer.getElementsByClassName("link");

// for(let i=0; i<links.length; i++){
//     links[i].addEventListener("click", function(){
//         console.log("clicked")
//         const current = document.getElementsByClassName("active");
//         current[0].className = current[0].className.replace("active", "");
//         this.className += "active"
//     });
// }


const linkCont = document.querySelectorAll(".navs a");
const conten = document.querySelectorAll(".content");

linkCont.forEach(link=>{
    link.addEventListener("click", e=>{
        e.preventDefault();
        document.querySelector(".navs li.active").classList.remove("active");
        document.querySelector(".content.active").classList.remove("active");
         
        const parentEl = link.parentElement;
        parentEl.classList.add("active");

        const index = [...parentEl.parentElement.children].indexOf(parentEl);
        const conte = [...conten].filter(elem =>elem.getAttribute("data-index")==index);
        conte[0].classList.add("active");
    })
})