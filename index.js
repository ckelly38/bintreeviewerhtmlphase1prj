let loadbintree = false;
let loadbinsrchtree = false;
let userbuildowntree = false;
document.addEventListener("DOMContentLoaded", function(event){
    //show the form
    let myloadfrm = document.getElementById("myloadingform");
    myloadfrm.style.display="block";
    let myloadopts = myloadfrm.getElementsByTagName("input");
    for (let n = 0; n < 3; n++)
    {
        myloadopts[n].addEventListener("click", function(event){
            //console.log("selected an option on the form!");
            myloadopts[3].disabled = false;
        });
    }
    myloadopts[3].disabled = true;
    myloadfrm.addEventListener("submit", function(event){
        event.preventDefault();
        console.log("event.target = " + event.target);
        console.log("event.target[0].checked = " + event.target[0].checked);
        console.log("event.target[1].checked = " + event.target[1].checked);
        console.log("event.target[2].checked = " + event.target[2].checked);
        loadbintree = event.target[0].checked;
        loadbinsrchtree = event.target[1].checked;
        userbuildowntree = event.target[2].checked;
        debugger;
    });
});
