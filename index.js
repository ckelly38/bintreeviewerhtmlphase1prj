let loadbintree = false;
let loadbinsrchtree = false;
let userbuildowntree = false;
let mynumnodesontree = 0;
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

function getMyDataOrIDOnlyList(transversalarr, usedata)
{
    if (usedata == undefined || usedata == null)
    {
        throw "usedata must be a defined boolean variable!";
    }
    else
    {
        if (usedata === true || usedata === false);
        else throw "usedata must be a defined boolean variable!";
    }

    if (transversalarr == undefined || transversalarr == null) return null;
    else
    {
        if (transversalarr.length < 1) return transversalarr;
        else
        {
            return transversalarr.map(function(item){
                if (item == undefined || item == null) return null;
                else
                {
                    if (usedata) return item.data;
                    else return item.id;
                }
            });
        }
    }
}
function getMyDataOnlyList(transversalarr) { return getMyDataOrIDOnlyList(transversalarr, true); }
function getMyIDOnlyList(transversalarr) { return getMyDataOrIDOnlyList(transversalarr, false); }

function getTransversalDataStringFromArray(transversaldataarr)
{
    if (transversaldataarr == undefined || transversaldataarr == null || transversaldataarr.length < 1)
    {
        return "";
    }
    else
    {
        let myretstr = "";
        for (let n = 0; n < transversaldataarr.length; n++)
        {
            myretstr += "" + transversaldataarr[n];
            if (n + 1 < transversaldataarr.length) myretstr += ", ";
            //else;//do nothing
        }
        return myretstr;
    }
}

function includeAllExceptRoot(transversalarr)
{
    if (transversalarr == undefined || transversalarr == null || transversalarr.length < 1)
    {
        return null;
    }
    else
    {
        return transversalarr.filter(function(item){
            //console.log("item = " + item);
            //console.log("item.id = " + item.id);
            //console.log("item.data = " + item.data);
            //console.log("item.isRootNode.call(item) = " + item.isRootNode.call(item));
            if (item.isRootNode.call(item)) return false;
            else return true;
        });
    }
}

function getRootIndexInTransversal(transversalarr)
{
    if (transversalarr == undefined || transversalarr == null || transversalarr.length < 1)
    {
        //console.log("transversal array is empty!");
        return null;
    }
    else
    {
        //console.log("transversalarr.length = " + transversalarr.length);
        if (transversalarr.length == 1) return 0;
        else
        {
            for (let n = 0; n < transversalarr.length; n++)
            {
                //console.log("transversalarr[" + n + "] = " + transversalarr[n]);
                //console.log("transversalarr[" + n + "].id = " + transversalarr[n].id);
                //console.log("transversalarr[" + n + "].data = " + transversalarr[n].data);
                //console.log("transversalarr[" + n + "].isRootNode.call(transversalarr[" + n + "]) = " +
                //    transversalarr[n].isRootNode.call(transversalarr[n]));
                if (transversalarr[n].isRootNode.call(transversalarr[n])) return n;
                //else;//do nothing
            }

            throw "at least one of them must be the root node to be on a transversal, but none were!";
        }
    }
}

function getAllBeforeOrAfterRoot(transversalarr, usebefore)
{
    //console.log("usebefore = " + usebefore);
    if (usebefore == undefined || usebefore == null)
    {
        throw "usebefore must be a defined boolean variable!";
    }
    else
    {
        if (usebefore === true || usebefore === false);
        else throw "usebefore must be a defined boolean variable!";
    }

    if (transversalarr == undefined || transversalarr == null || transversalarr.length < 1)
    {
        //console.log("transversal array is empty!");
        return null;
    }
    else
    {
        //console.log("transversalarr.length = " + transversalarr.length);
        if (transversalarr.length == 1) return null;
        else
        {
            let myrtindx = getRootIndexInTransversal(transversalarr);
            let nsi = -1;
            let nmax = -1;
            if (usebefore)
            {
                nsi = 0;
                nmax = myrtindx;
            }
            else
            {
                nsi = myrtindx + 1;
                nmax = transversalarr.length;
            }
            //console.log("nsi = " + nsi);
            //console.log("nmax = " + nmax);
            //console.log("myrtindx = " + myrtindx);

            let myparttransarr = new Array();
            for (let n = nsi; n < nmax && n < transversalarr.length; n++)
            {
                myparttransarr.push(transversalarr[n]);
            }
            return myparttransarr;
        }
    }
}
function getAllBeforeRoot(transversalarr) { return getAllBeforeOrAfterRoot(transversalarr, true); }
function getAllAfterRoot(transversalarr) { return getAllBeforeOrAfterRoot(transversalarr, false); }

class Bintreend {
    constructor(myid, mydatstr, myptnd=null, myleftkdnd=null, myrightkdnd=null)
    {
        this.id = myid;
        this.data = mydatstr;
        this.ptnd = myptnd;
        this.leftkd = myleftkdnd;
        this.rightkd = myrightkdnd;
    }
    isRootNode() { return ((this.ptnd == null) ? true : false); }
    getRootNode(vlistnds=null)
    {
        if (this.isRootNode()) return this;
        else
        {
            //check to see if already on visited list of nodes circle reference error
            //add the current node to the visited list
            let myvlistnds = null;
            if (vlistnds == null || vlistnds.length < 1)
            {
                myvlistnds = new Array();
                myvlistnds.push(this);
                return this.getRootNode(myvlistnds);
            }
            else
            {
                for (let n = 0; n < vlistnds.length; n++)
                {
                    if (vlistnds[n] == null)
                    {
                        throw "no null nodes allowed on the list!";
                    }
                    else if (vlistnds[n] === this)
                    {
                        throw "CircularReferenceError: not a tree! Already visited this node; " +
                            "root not found!";
                    }
                    //else;//do nothing
                }

                myvlistnds = new Array();
                for (let n = 0; n < vlistnds.length; n++)
                {
                    if (vlistnds[n] == null)
                    {
                        throw "no null nodes allowed on the list!";
                    }
                    else myvlistnds.push(vlistnds[n]);
                }

                myvlistnds.push(this);
                return this.getRootNode(myvlistnds);
            }
        }
    }
    get root()
    {
        return this.getRootNode(null);
    }
    getNumberOfNodesBelowNode(nd, vlist=null)
    {
        if (nd == undefined || nd == null) return 0;
        else
        {
            //console.log("nd = " + nd);
            //console.log("nd.data = " + nd.data);

            //first find the root node
            //then decend tree using parent child relationships compile a vlist
            //if we have already visited the node, then throw an error
            //if the node is null, do not add it

            //visit this node
            //then call method on child nodes
            if (vlist == undefined || vlist == null || vlist.length < 1);
            else
            {
                for (let n = 0; n < vlist.length; n++)
                {
                    if (vlist[n] == null)
                    {
                        throw "no null nodes allowed on the list!";
                    }
                    else if (vlist[n] === nd)
                    {
                        throw "CircularReferenceError: not a tree! Already visited this node; " +
                            "root not found!";
                    }
                    //else console.log("vlist[" + n + "].data = " + vlist[n].data);
                }
            }
            //console.log("nd.leftkd = " + nd.leftkd);
            //console.log("nd.rightkd = " + nd.rightkd);

            if (nd.leftkd == null && nd.rightkd == null) return 1;
            else
            {
                //console.log("nd.leftkd.data = " + nd.leftkd.data);
                //console.log("nd.rightkd.data = " + nd.rightkd.data);

                let myvlist = new Array();
                if (vlist == undefined || vlist == null || vlist.length < 1);
                else
                {
                    for (let n = 0; n < vlist.length; n++)
                    {
                        if (vlist[n] == null)
                        {
                            throw "no null nodes allowed on the list!";
                        }
                        else if (vlist[n] === nd)
                        {
                            throw "CircularReferenceError: not a tree! Already visited this node; " +
                                "root not found!";
                        }
                        else
                        {
                            //console.log("added vlist[" + n + "].data = " + vlist[n].data);
                            myvlist.push(vlist[n]);
                        }
                    }
                }
                //console.log("added nd.data = " + nd.data);
                myvlist.push(nd);
                
                let numinatree = this.getNumberOfNodesBelowNode(nd.leftkd, myvlist);
                //console.log("numinatree = " + numinatree);
                let numinbtree = this.getNumberOfNodesBelowNode(nd.rightkd, myvlist)
                //console.log("NODE FOR CALL: nd.data = " + nd.data);
                //console.log("FINAL numinatree = " + numinatree);
                //console.log("FINAL numinbtree = " + numinbtree);
                return 1 + numinatree + numinbtree;
            }
        }
    }
    get numNodesOnTree()
    {
        return this.getNumberOfNodesBelowNode(this.root);
    }
    get isBinarySearchTree()
    {
        //then the data must be in order
        //it will either be all numbers or all strings
        let myinordertransarr = this.inOrderTransversal;
        let mydataarr = getMyDataOnlyList(myinordertransarr);
        if (mydataarr == undefined || mydataarr == null || mydataarr.length < 1)
        {
            throw "there must be at least one item on the data array for the transversal because " +
                "it includes this node!";
        }
        else if (mydataarr.length == 1) return true;
        //else;//do nothing

        let mydatacparr = new Array();
        for (let n = 0; n < mydataarr.length; n++) mydatacparr.push(...mydataarr[n]);
        mydatacparr = mydatacparr.sort();
        for (let n = 0; n < mydataarr.length; n++)
        {
            //console.log("mydataarr[" + n + "] = " + mydataarr[n]);
            //console.log("mydatacparr[" + n + "] = " + mydatacparr[n]);
            if (mydataarr[n] === mydatacparr[n]);
            else return false;
        }
        return true;
    }
    transversal(useinorder, usepost, snd=this.root, vlist=null)
    {
        //console.log("INSIDE TRANSVERSAL():");
        //console.log("useinorder = " + useinorder);
        //console.log("usepost = " + usepost);
        //console.log("snd = " + snd);
        //console.log("vlist = " + vlist);
        if (snd == undefined || snd == null) throw "the starting node must be defined and not null!";
        //else;//do nothing
        //if (vlist == null || vlist.length < 1) console.log("vlist is empty!");
        //else
        //{
            //for (let p = 0; p < vlist.length; p++)
            //{
            //    console.log("vlist[" + n + "].data = " + vlist[n].data);
            //}
        //}
        if (useinorder == undefined || usepost == undefined || useinorder == null || usepost == null)
        {
            throw "useinorder and usepost must be defined boolean variables!";
        }
        else
        {
            if ((usepost === true || usepost === false) && (useinorder === true || useinorder === false));
            else throw "useinorder and usepost must be defined boolean variables!";
        }

        if (useinorder === true && usepost === true)
        {
            throw "illegal transversal selected; you there is no transversal for in and post orders!";
        }
        //else;//do nothing
        //console.log("snd.data = " + snd.data);
        //console.log("snd.leftkd = " + snd.leftkd);
        //console.log("snd.rightkd = " + snd.rightkd);

        //in order: left root right
        //pre order: root left right
        //post order: left right root
        //
        //       f
        //  d       k
        // b e    h   m
        //a c    g i l n
        //  IN ORDER: a b c d e f g h i k l m n
        // PRE ORDER: f d b a c e k h g i m l n
        //POST ORDER: a c b e d g i h l n m k f
        let rlist = new Array();
        if (vlist == null || vlist.length < 1);
        else for (let n = 0; n < vlist.length; n++) rlist.push(vlist[n]);

        if (useinorder || usepost);
        else
        {
            //console.log("using preorder!");
            //preorder
            //root left right
            
            rlist.push(snd);//push current root now
            //console.log("added snd.data = " + snd.data + " to the list!");
        }

        if (snd.leftkd == null)
        {
            //console.log("left kid is null!");
            
            if (useinorder)
            {
                //left root right
                //console.log("using inorder!");
                
                rlist.push(snd);//push current root now
                
                //console.log("added snd.data = " + snd.data + " to the list!");
            }
            //else;//do nothing

            if (snd.rightkd == null)
            {
                //console.log("right kid is null!");
            }
            else
            {
                let myrightrlist = this.transversal(useinorder, usepost, snd.rightkd, null);
                if (myrightrlist == null || myrightrlist.length < 1);
                else
                {
                    for (let n = 0; n < myrightrlist.length; n++)
                    {
                        //console.log("added myrightrlist[" + n + "].data = " + myrightrlist[n].data +
                        //    " to the list!");
                        rlist.push(myrightrlist[n]);
                    }
                }
            }
        }
        else
        {
            let myleftrlist = this.transversal(useinorder, usepost, snd.leftkd, null);
            if (myleftrlist == null || myleftrlist.length < 1);
            else
            {
                for (let n = 0; n < myleftrlist.length; n++)
                {
                    //console.log("added myleftrlist[" + n + "].data = " + myleftrlist[n].data +
                    //    " to the list!");
                    rlist.push(myleftrlist[n]);
                }
            }

            if (useinorder)
            {
                //left root right
                //console.log("using inorder!");
                
                rlist.push(snd);//push current root now
                
                //console.log("added snd.data = " + snd.data + " to the list!");
            }
            //else;//do nothing

            let myrightrlist = this.transversal(useinorder, usepost, snd.rightkd, null);
            if (myrightrlist == null || myrightrlist.length < 1);
            else
            {
                for (let n = 0; n < myrightrlist.length; n++)
                {
                    //console.log("added myrightrlist[" + n + "].data = " + myrightrlist[n].data +
                    //    " to the list!");
                    rlist.push(myrightrlist[n]);
                }
            }
        }


        if (usepost)
        {
            //right left root
            //console.log("using postorder!");
            
            rlist.push(snd);//push current root now
            
            //console.log("added snd.data = " + snd.data + " to the list!");
        }
        //else;//do nothing

        if (rlist == undefined || null || rlist.length < 1)
        {
            throw "the return list must have at minimum the starting node on it!";
        }
        //else;//do nothing

        return rlist;
    }
    get inOrderTransversal()
    {
        return this.transversal(true, false, this.root, null);//inorder, post, snd, vlist
    }
    get preOrderTransversal()
    {
        return this.transversal(false, false, this.root, null);//inorder, post, snd, vlist
    }
    get postOrderTransversal()
    {
        return this.transversal(false, true, this.root, null);//inorder, post, snd, vlist
    }
}

function printDataAndIDAndErrorCheckTransversal(mytransarr, typestr, arrname, expectedtotal)
{
    if (typestr == undefined || typestr == null || typestr.length < 5)
    {
        throw "illegal type string found and used here!";
    }
    else
    {
        let mylegaltypes = ["inorder", "in-order", "preorder", "pre-order", "postorder", "post-order"];
        let mylwrtypestr = ("" + typestr).toLowerCase();
        let typeisvalid = false;
        for (let n = 0; n < mylegaltypes.length; n++)
        {
            if (mylegaltypes[n] === mylwrtypestr)
            {
                typeisvalid = true;
                break;
            }
            //else;//do nothing
        }
        if (typeisvalid);
        else throw "the type string for the type of the transversal is not valid!";
    }

    if (arrname == undefined || arrname == null || arrname.length < 5)
    {
        throw "illegal name of the transversal array found and used here!";
    }
    //else;//do nothing

    if (expectedtotal == undefined || expectedtotal == null || isNaN(expectedtotal))
    {
        throw "expected total must be a number that is at least zero!";
    }
    else
    {
        if (expectedtotal < 0) throw "illegal expected total of elements was found and used here!";
        //else;//do nothing
    }

    console.log(typestr + ":");
    if (mytransarr == undefined || mytransarr == null || mytransarr.length < 1)
    {
        console.log("is null or empty!");
    }
    else
    {
        for (let p = 0; p < mytransarr.length; p++)
        {
            console.log(arrname + "[" + p + "].id = " + mytransarr[p].id);
            console.log(arrname + "[" + p + "].data = " + mytransarr[p].data);
        }
    }
    
    let showerr = false;
    if (mytransarr == undefined || mytransarr == null)
    {
        if (expectedtotal == 0);
        else if (expectedtotal > 0) showerr = true;
        else throw "illegal expected total of elements was found and used here!";
    }
    else
    {
        if (mytransarr.length == expectedtotal)
        {
            let myidonlylisttran = getMyIDOnlyList(mytransarr);
            for (let n = 0; n < myidonlylisttran.length; n++)
            {
                for (let k = n + 1; k < myidonlylisttran.length; k++)
                {
                    if (myidonlylisttran[n] == myidonlylisttran[k])
                    {
                        console.log("myidonlylisttran[" + n + "] = " + myidonlylisttran[n]);
                        console.log("myidonlylisttran[" + k + "] = " + myidonlylisttran[k]);
                        throw "duplicate ids found on the list!";
                    }
                    //else;//do nothing
                }
            }
        }
        else showerr = true;
    }
    
    if (showerr) throw "" + typestr + " did not have the right number of elements on it!";
    //else;//do nothing
}

function displayTransversals(mybinnd)
{
    let mypreordertrans = mybinnd.preOrderTransversal;
    document.getElementById("prorder").getElementsByClassName("rtnd")[0].textContent = "" +
        mypreordertrans[0].data;
    document.getElementById("prorder").getElementsByClassName("normalnds")[0].textContent = "" +
        ((mypreordertrans.length > 1) ? ", " : "") + 
        getTransversalDataStringFromArray(getMyDataOnlyList(includeAllExceptRoot(mypreordertrans)));
    
    let myinordertrans = mybinnd.inOrderTransversal;
    let myrtindxintransarr = getRootIndexInTransversal(myinordertrans);
    console.log("myrtindxintransarr = " + myrtindxintransarr);
    let myinordertransafterrt = getAllAfterRoot(myinordertrans);
    document.getElementById("innrmalndsparta").textContent = "" +
        getTransversalDataStringFromArray(getMyDataOnlyList(getAllBeforeRoot(myinordertrans))) + ", ";
    document.getElementById("pinorder").getElementsByClassName("rtnd")[0].textContent = "" +
        myinordertrans[myrtindxintransarr].data;
    document.getElementById("innrmalndspartb").textContent = "" +
        ((myinordertransafterrt.length > 0) ? ", " : "") +
        getTransversalDataStringFromArray(getMyDataOnlyList(myinordertransafterrt));
    
    
    let mypostordertrans = mybinnd.postOrderTransversal;
    document.getElementById("psorder").getElementsByClassName("rtnd")[0].textContent = "" +
        mypostordertrans[mypostordertrans.length - 1].data;
    document.getElementById("psorder").getElementsByClassName("normalnds")[0].textContent = 
        getTransversalDataStringFromArray(getMyDataOnlyList(includeAllExceptRoot(mypostordertrans))) +
            ((mypostordertrans.length > 1) ? ", " : "");
}

function makeBinarySearchTreeNodesToSave()
{
    //in order: left root right
    //pre order: root left right
    //post order: left right root
    //
    //       f
    //  d       k
    // b e    h   m
    //a c    g i l n
    //  IN ORDER: a b c d e f g h i k l m n
    // PRE ORDER: f d b a c e k h g i m l n
    //POST ORDER: a c b e d g i h l n m k f
    let myrt = new Bintreend("1", "f", null, null, null);//parent, left, right
    let myndd = new Bintreend("2", "d", myrt, null, null);//parent, left, right
    let myndk = new Bintreend("3", "k", myrt, null, null);//parent, left, right
    myrt.leftkd = myndd;
    myrt.rightkd = myndk;
    //console.log("myrt.data = " + myrt.data);
    //console.log("myrt.leftkd.data = myndd.data = " + myrt.leftkd.data);
    //console.log("myrt.rightkd.data = myndk.data = " + myrt.rightkd.data);
    let myndb = new Bintreend("4", "b", myndd, null, null);//parent, left, right
    let mynde = new Bintreend("5", "e", myndd, null, null);//parent, left, right
    myndd.leftkd = myndb;
    myndd.rightkd = mynde;
    //console.log("myndd.leftkd.data = myndb.data = " + myndd.leftkd.data);
    //console.log("myndd.rightkd.data = mynde.data = " + myndd.rightkd.data);
    //console.log("myrt.leftkd.leftkd.data = myndb.data = " + myrt.leftkd.leftkd.data);
    //console.log("myrt.leftkd.rightkd.data = mynde.data = " + myrt.leftkd.rightkd.data);
    let myndh = new Bintreend("6", "h", myndk, null, null);//parent, left, right
    let myndm = new Bintreend("7", "m", myndk, null, null);//parent, left, right
    myndk.leftkd = myndh;
    myndk.rightkd = myndm;
    let mynda = new Bintreend("8", "a", myndb, null, null);//parent, left, right
    let myndc = new Bintreend("9", "c", myndb, null, null);//parent, left, right
    myndb.leftkd = mynda;
    myndb.rightkd = myndc;
    let myndg = new Bintreend("10", "g", myndh, null, null);//parent, left, right
    let myndi = new Bintreend("11", "i", myndh, null, null);//parent, left, right
    myndh.leftkd = myndg;
    myndh.rightkd = myndi;
    let myndl = new Bintreend("12", "l", myndm, null, null);//parent, left, right
    let myndn = new Bintreend("13", "n", myndm, null, null);//parent, left, right
    myndm.leftkd = myndl;
    myndm.rightkd = myndn;
    
    console.log("myrt.isRootNode() = " + myrt.isRootNode());
    if (myrt.isRootNode() == true);
    else throw "my root node must be the root for this test tree!";
    let numnodes = myrt.numNodesOnTree;
    console.log("numnodes = " + numnodes);
    if (numnodes == 13);
    else throw "illegal number of nodes found on the tree!";
    
    let myinordertree = myrt.inOrderTransversal;
    printDataAndIDAndErrorCheckTransversal(myinordertree, "inorder", "myinordertree", 13);
    let mypreordertree = myrt.preOrderTransversal;
    printDataAndIDAndErrorCheckTransversal(mypreordertree, "preorder", "mypreordertree", 13);
    let mypostordertree = myrt.postOrderTransversal;
    printDataAndIDAndErrorCheckTransversal(mypostordertree, "postorder", "mypostordertree", 13);
    if (myrt.isBinarySearchTree);
    else throw "this must be a binary search tree!";
    console.log("TEST PAST!");

    displayTransversals(myrt);
}
//makeBinarySearchTreeNodesToSave();

function getDOMElements(ndobj)
{
    console.error("NOT DONE YET 7-15-2023 2:53 AM!");
}

let mygenndsarr = null;
function getBintreendObjForIdFromArray(myid)
{
    if (myid == undefined || myid == null) throw "myid must be defined!";
    else
    {
        let myidstr = "" + myid;
        if (myidstr.length < 1) throw "myid must not be empty!";
        //else;//do nothing
    }

    let mybinnd = null;
    if (mygenndsarr == undefined || mygenndsarr == null || mygenndsarr.length < 1);
    else
    {
        for (let n = 0; n < mygenndsarr.length; n++)
        {
            if (mygenndsarr[n] == null) throw "not allowed to have null nodes on this list!";
            else
            {
                //console.log("mygenndsarr[" + n + "] = " + mygenndsarr[n]);
                //console.log("mygenndsarr[" + n + "].id = " + mygenndsarr[n].id);
                //console.log("myid = " + myid);
                if (mygenndsarr[n].id == myid)
                {
                    //console.log("found the node we were looking for!");
                    mybinnd = mygenndsarr[n];
                    break;
                }
                //else;//do nothing
            }
        }//end of n for loop
    }
    return mybinnd;
}

function buildUserBinaryTree()
{
    //build the root node for the user here
    //have a textarea for data
    //have a spot for the left kid and a spot for the right kid
    //need to have an add left, add right, edit data or remove option
    let mytable = document.createElement("table");
    let myotable = document.createElement("table");
    let mytrw = document.createElement("tr");
    let mytcol = document.createElement("td");
    let myotrwa = document.createElement("tr");
    let myotrwb = document.createElement("tr");
    let myotcolb = document.createElement("td");
    let myotcolc = document.createElement("td");
    let myotcold = document.createElement("td");
    let mydiv = document.createElement("div");
    let mycntelem = document.createElement("textarea");
    myotcolc.style.width = "80px";
    myotcold.style.width = "80px";
    mycntelem.style.width = "248px";
    mycntelem.style.height = "38px";
    mycntelem.style.resize = "none";
    mycntelem.style.marginLeft = "auto";
    mycntelem.style.marginRight = "auto";
    const mynwndidstr = "nwnd";
    mydiv.id = "" + mynwndidstr;
    mytable.style.display = "inline";
    let myleftbtn = document.createElement("button");
    let myrightbtn = document.createElement("button");
    let mydelbtn = document.createElement("button");
    let mynl = document.createElement("br");
    //let myobr = document.createElement("br");
    myleftbtn.disabled = true;
    myrightbtn.disabled = true;
    myleftbtn.textContent = "add left kid";
    myrightbtn.textContent = "add right kid";
    mydelbtn.textContent = "delete node";
    let myleftimg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    let myleftline = document.createElementNS("http://www.w3.org/2000/svg", "line");
    let myrightline = document.createElementNS("http://www.w3.org/2000/svg", "line");
    mydiv.appendChild(mycntelem);
    mydiv.appendChild(mynl);
    myotcolb.appendChild(mydelbtn);
    myotrwb.appendChild(myotcolc);
    myotrwb.appendChild(myotcolb);
    myotrwb.appendChild(myotcold);
    myotable.appendChild(myotrwb);
    myotrwa.appendChild(myotable);
    
    let mylkddiv = document.createElement("span");
    let myrkddiv = document.createElement("span");
    mylkddiv.appendChild(myleftbtn);
    myrkddiv.appendChild(myrightbtn);
    mytcol.appendChild(mydiv);
    mytrw.appendChild(mytcol);
    mytable.appendChild(mytrw);
    mytable.appendChild(myotrwa);
    document.getElementById("tree").appendChild(mylkddiv);
    document.getElementById("tree").appendChild(mytable);
    document.getElementById("tree").appendChild(myrkddiv);
    let mydivondoc = document.getElementById(mynwndidstr);
    //let myelemcoords = mydivondoc.getBoundingClientRect();
    //console.log("myelemcoords.x = " + myelemcoords.x);
    //console.log("myelemcoords.y = " + myelemcoords.y);
    //console.log("myelemcoords.top = " + myelemcoords.top);
    //console.log("myelemcoords.left = " + myelemcoords.left);
    //console.log("myelemcoords.right = " + myelemcoords.right);
    //console.log("myelemcoords.bottom = " + myelemcoords.bottom);
    //console.log("topoffset = " + mydivondoc.offsetTop);
    //console.log("leftoffset = " + mydivondoc.offsetLeft);
    //console.log("heightoffset = " + mydivondoc.offsetHeight);//actual of element
    //console.log("widthoffset = " + mydivondoc.offsetWidth);//actual of element
    let mynwtextareaelem = mydivondoc.getElementsByTagName("textarea")[0];
    let mywdthstr = "" + mynwtextareaelem.offsetWidth;
    let mywdthnumstr = "" + mywdthstr;//.substring(0, mywdthstr.length - 2);
    console.log("mywdthnumstr = " + mywdthnumstr);
    myleftimg.style.width = "" + mywdthstr;
    myleftimg.style.height = "" + Number(mywdthnumstr) / 2 + "px";
    //0,0 is the top left corner to the svg and it is relative to its container
    //in this case where mydiv starts after the new line
    myrightline.setAttribute("x1", "" + Number(mywdthnumstr) / 2);
    myrightline.setAttribute("y1", "0");
    myrightline.setAttribute("x2", mywdthnumstr);
    myrightline.setAttribute("y2", "" + Number(mywdthnumstr) / 2);
    myleftline.setAttribute("x1", "" + Number(mywdthnumstr) / 2);
    myleftline.setAttribute("y1", "0");
    myleftline.setAttribute("x2", "0");
    myleftline.setAttribute("y2", "" + Number(mywdthnumstr) / 2);
    myrightline.style.stroke = "black";
    myrightline.style.strokeWidth = "2";
    myleftline.style.stroke = "black";
    myleftline.style.strokeWidth = "2";
    myleftimg.textContent = "your browser does not support svg images";
    myleftimg.appendChild(myleftline);
    myleftimg.appendChild(myrightline);
    mydivondoc.appendChild(myleftimg);
    //console.log("myleftline.x1 = " + myleftline.x1);
    //console.log("myleftline.y1 = " + myleftline.y1);
    //console.log("myleftline.x2 = " + myleftline.x2);
    //console.log("myleftline.y2 = " + myleftline.y2);
    //console.log("firstbtnnewoffsetleft = " + mydivondoc.getElementsByTagName("button")[0].offsetLeft);
    //console.log("topoffset = " + mydivondoc.offsetTop);
    //console.log("leftoffset = " + mydivondoc.offsetLeft);
    //console.log("heightoffset = " + mydivondoc.offsetHeight);//actual of element
    //console.log("widthoffset = " + mydivondoc.offsetWidth);//actual of element
    console.error("NOT DONE YET 7-18-2023 1:50 AM!");
    
    mynwtextareaelem.addEventListener("change", function(bl, br, event){
        console.log("the textarea was changed!");
        console.log("event = " + event);
        console.log("this = " + this);
        console.log("this.parentNode = " + this.parentNode);
        console.log("this.parentNode.id = " + this.parentNode.id);
        console.log("this.value = " + this.value);
        console.log("event.target = " + event.target);
        console.log("event.target.value = " + event.target.value);
        console.log("event.target.parentNode = " + event.target.parentNode);
        console.log("event.target.parentNode.id = " + event.target.parentNode.id);
        console.log("bl = " + bl);
        console.log("br = " + br);
        //if empty, do not update server and disable the add child buttons until not empty
        //need to get the left and right buttons that correspond with this and then enable them
        //bl.disabled = false;
        //br.disabled = false;
        //we also need to set the listeners for the left and right buttons
        //build the binary tree node object (only once, and only once do a post otherwise do patch)
        //id, data, ptnd, leftkdnd, rightkdnd
        
        //validate the data here first
        if (event.target.value == undefined || event.target.value == null || event.target.value.length < 1)
        {
            //fetch the old data from the old data object and refuse to push
            console.error("data is empty! Data must not be empty so reverting!");

            //console.log("mygenndsarr = " + mygenndsarr);
            //debugger;
            let mybinnd = getBintreendObjForIdFromArray(event.target.parentNode.id);
            
            if (mybinnd == null) throw "the node must have been on the list!";
            else
            {
                console.log("mybinnd = " + mybinnd);
                console.log("mybinnd.id = " + mybinnd.id);
                console.log("mybinnd.data = " + mybinnd.data);
                console.log("mybinnd.ptnd = " + mybinnd.ptnd);
                console.log("event.target.parentNode.id = " + event.target.parentNode.id);
                event.target.value = "" + mybinnd.data;
                console.error("cannot have a node with empty data");
                alert("error: cannot have a node with empty data, so reverted!");
                return;
            }
        }
        //else;//do nothing duplicate data allowed
        //console.error("NOT DONE YET 7-18-2023 1:50 AM!");

        let usepost = true;
        if (event.target.parentNode.id === mynwndidstr) usepost = true;
        else usepost = false;
        console.log("usepost = " + usepost);

        let mybinnd = null;
        if (usepost)
        {
            mybinnd = new Bintreend("", "" + event.target.value, null, null, null);
        }
        else
        {
            //need to get the Bintreend object here with the id we are looking for
            //in this case it will match the parent node id
            //console.log("mygenndsarr = " + mygenndsarr);
            //debugger;
            mybinnd = getBintreendObjForIdFromArray(event.target.parentNode.id);
            
            if (mybinnd == null) throw "the node must have been on the list!";
            else
            {
                //set the new data value here...
                mybinnd.data = "" + event.target.value;
            }
        }

        let myptchbdystr = JSON.stringify(mybinnd);
        console.log("myptchbdystr = " + myptchbdystr);
        let myidindx = myptchbdystr.indexOf('"id":');
        let cmaafteridindx = -1;
        for (let i = myidindx + 5; i < myptchbdystr.length; i++)
        {
            if (myptchbdystr.charAt(i) == ',')
            {
                cmaafteridindx = i;
                break;
            }
            //else;//do nothing
        }
        console.log("cmaafteridindx = " + cmaafteridindx);
        if (cmaafteridindx < 0 || cmaafteridindx > myptchbdystr.length - 1)
        {
            throw "illegal value found and used for the cmaafteridindx index!";
        }
        let mypstbdystr = myptchbdystr.substring(0, myidindx) + myptchbdystr.substring(cmaafteridindx + 1);
        console.log("mypstbdystr = " + mypstbdystr);
        
        let mymethdstr = "";
        let mybdystr = "";
        let myresurl = "http://localhost:3000/nodes";
        if (usepost)
        {
            mymethdstr = "POST";
            mybdystr = "" + mypstbdystr;
        }
        else
        {
            mymethdstr = "PATCH";
            mybdystr = "" + myptchbdystr;
            myresurl += "/" + mybinnd.id;
        }
        console.log("mymethdstr = " + mymethdstr);
        console.log("mybdystr = " + mybdystr);
        console.log("myresurl = " + myresurl);

        //we need to asynchronously add this to the server
        //get the id and then update said object
        //set the dom node id correctly
        let myconfigobj = {
            method: mymethdstr,
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            body: mybdystr
        }
        fetch(myresurl, myconfigobj).then((response) => response.json()).
        then(function(response){
            console.log("response = " + response);
            console.log("response.id = " + response.id);
            let myresidstr = "" + response.id;
            console.log("usepost = " + usepost);
            debugger;
            if (response.id == undefined || response.id == null || myresidstr.length < 1)
            {
                throw "illegal response id found and used here!";
            }
            //else;//do nothing

            if (usepost)
            {
                mybinnd.id = response.id;
                //add the object to the list of nodes now
                if (mygenndsarr == null) mygenndsarr = new Array();
                //else;//do nothing
                mygenndsarr.push(mybinnd);
                //then enable the buttons
                bl.disabled = false;
                br.disabled = false;
                this.parentNode.id = response.id;
                //update the number of nodes on the tree
                mynumnodesontree++;
                document.getElementById("numnodes").textContent = "" + mynumnodesontree;
                //update the type of tree here
                document.getElementById("typeoftree").textContent = "" +
                    (mybinnd.isBinarySearchTree ? "Binary Search" : "Binary");
                //display the transversals here
                displayTransversals(mybinnd);
                console.log("successfully posted the new binary tree object to the server!");
            }
            else
            {
                console.log("response.data = " + response.data);
                console.log("successfully updated the binary tree node object on the server!");
            }
            debugger;
        }.bind(mynwtextareaelem)).catch(function(err){
            console.error("there was a problem updating the data on the server or adding data on the " +
                "server!");
            console.error(err);
        });
        debugger;
    }.bind(mynwtextareaelem, myleftbtn, myrightbtn));
    console.log("successfully added my on edit listener for the textarea for my node here!");
    debugger;
}

document.addEventListener("DOMContentLoaded", function(event){
    makeBinarySearchTreeNodesToSave();
    
    //display the number of nodes on the tree in the statistics section
    document.getElementById("numnodes").textContent = "" + mynumnodesontree;
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
        //console.log("oevent.target = " + oevent.target);
        //console.log("oevent.target[0].checked = " + oevent.target[0].checked);
        //console.log("oevent.target[1].checked = " + oevent.target[1].checked);
        //console.log("oevent.target[2].checked = " + oevent.target[2].checked);
        loadbintree = oevent.target[0].checked;
        loadbinsrchtree = oevent.target[1].checked;
        userbuildowntree = oevent.target[2].checked;
        //debugger;
        //hide this form now
        this.style.display = "none";
        if (loadbinsrchtree === true || loadbintree === true) loadBinaryOrSearchTree(loadbinsrchtree);
        else buildUserBinaryTree();
    }.bind(myloadfrm));
});
