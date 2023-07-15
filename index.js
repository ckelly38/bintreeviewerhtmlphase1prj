let loadbintree = false;
let loadbinsrchtree = false;
let userbuildowntree = false;
const myswdth = screen.width;
function loadBinaryOrSearchTree(usesrchtree)
{
    //get the list of nodes from the api
    //then ?
    fetch("http://localhost:3000/bintreenodes").then((response) => response.json()).
    then(function(response){
        console.log(response);
        let mynodesarr = response;
        for (let n = 0; n < mynodesarr.length; n++)
        {
            console.log("mynodesarr[" + n + "] = " + mynodesarr[n]);
        }
        console.error("NOT DONE YET 7-15-2023 2:53 AM!");
        debugger;
    }).catch(function(err){
        console.error("there was an error getting the nodes!");
        console.error(err);
    });
}

function buildUserBinaryTree()
{
    //build the root node for the user here
    //have a textarea for data
    //have a spot for the left kid and a spot for the right kid
    //need to have an add left, add right, edit data or remove option
    let mydiv = document.createElement("div");
    let mycntelem = document.createElement("textarea");
    mycntelem.style.width = "248px";
    mycntelem.style.height = "38px";
    mycntelem.style.resize = "none";
    mycntelem.style.marginLeft = "auto";
    mycntelem.style.marginRight = "auto";
    mydiv.id = "rtnd";
    mydiv.style.marginLeft = "40%";
    let myleftbtn = document.createElement("button");
    let myrightbtn = document.createElement("button");
    let mydelbtn = document.createElement("button");
    let mynl = document.createElement("br");
    myleftbtn.textContent = "add left kid";
    myrightbtn.textContent = "add right kid";
    mydelbtn.textContent = "delete node";
    mydiv.appendChild(mycntelem);
    mydiv.appendChild(mynl);
    mydiv.appendChild(myleftbtn);
    mydiv.appendChild(myrightbtn);
    mydiv.appendChild(mydelbtn);
    document.getElementById("tree").appendChild(mydiv);
    console.error("NOT DONE YET 7-15-2023 2:53 AM!");
    debugger;
}

document.addEventListener("DOMContentLoaded", function(event){
    //show the form
    let myloadfrm = document.getElementById("myloadingform");
    myloadfrm.style.display="block";
    let myloadopts = myloadfrm.getElementsByTagName("input");
    for (let n = 0; n < 3; n++)
    {
        myloadopts[n].addEventListener("click", function(oevent){
            //console.log("selected an option on the form!");
            myloadopts[3].disabled = false;
        });
    }
    myloadopts[3].disabled = true;
    myloadfrm.addEventListener("submit", function(oevent){
        oevent.preventDefault();
        console.log("oevent.target = " + oevent.target);
        console.log("oevent.target[0].checked = " + oevent.target[0].checked);
        console.log("oevent.target[1].checked = " + oevent.target[1].checked);
        console.log("oevent.target[2].checked = " + oevent.target[2].checked);
        loadbintree = oevent.target[0].checked;
        loadbinsrchtree = oevent.target[1].checked;
        userbuildowntree = oevent.target[2].checked;
        debugger;
        if (loadbinsrchtree === true || loadbintree === true) loadBinaryOrSearchTree(loadbinsrchtree);
        else buildUserBinaryTree();
    });
});
