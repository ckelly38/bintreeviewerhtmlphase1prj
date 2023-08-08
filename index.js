let loadbintree = false;
let loadbinsrchtree = false;
let loaduserbintree = false;
let userbuildowntree = false;
const myswdth = screen.width;
let mygenndsarr = null;
function getTransversalForNodeArray(svrndarr, usepost, usein, srtnd=null)
{
    if (svrndarr == undefined || svrndarr == null) return null;
    else
    {
        if (svrndarr.length < 2) return svrndarr;
        //else;//do nothing safe to proceed
    }

    let myretarr = new Array();
    if (srtnd == undefined || srtnd == null)
    {
        throw "srtnd  is not allowed to be null!";
    }
    //else;//do nothing

    if (usein == undefined || usepost == undefined || usein == null || usepost == null)
    {
        throw "usein and usepost must be defined boolean variables!";
    }
    else
    {
        if ((usepost === true || usepost === false) && (usein === true || usein === false));
        else throw "usein and usepost must be defined boolean variables!";
    }

    if (usein === true && usepost === true)
    {
        throw "illegal transversal selected; you there is no transversal for in and post orders!";
    }
    //else;//do nothing

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
    
    if (usepost || usein);
    else
    {
        //add the root node now
        myretarr.push(srtnd);
    }

    let myleftkdstr = "";
    if (srtnd.leftkd == null);
    else myleftkdstr = "" + srtnd.leftkd;

    let myrightkdstr = "";
    if (srtnd.rightkd == null);
    else myrightkdstr = "" + srtnd.rightkd;

    if (myleftkdstr.length < 1)
    {
        //no left kid
        //console.log("left kid is null!");
            
        if (usein)
        {
            //left root right
            //console.log("using inorder!");
            
            myretarr.push(srtnd);//push current root now
            
            //console.log("added srtnd.data = " + srtnd.data + " to the list!");
        }
        //else;//do nothing

        if (myrightkdstr.length < 1)
        {
            //console.log("right kid is null!");
        }
        else
        {
            let myrkdndi = -1;
            for (let k = 0; k < svrndarr.length; k++)
            {
                if (svrndarr[k].id === srtnd.rightkd)
                {
                    myrkdndi = k;
                    break;
                }
                //else;//do nothing
            }
            //console.log("myrkdndi = " + myrkdndi);

            if (myrkdndi < 0 || myrkdndi > svrndarr.length || myrkdndi == svrndarr.length)
            {
                throw "illegal index found and used for the root node!";
            }
            //else;//do nothing

            let myrightrlist = getTransversalForNodeArray(svrndarr, usepost, usein, svrndarr[myrkdndi]);
            if (myrightrlist == null || myrightrlist.length < 1);
            else
            {
                for (let n = 0; n < myrightrlist.length; n++)
                {
                    //console.log("added myrightrlist[" + n + "].data = " + myrightrlist[n].data +
                    //    " to the list!");
                    myretarr.push(myrightrlist[n]);
                }
            }
        }
    }
    else
    {
        //we have at least a left kid
        let mylkdndi = -1;
        for (let k = 0; k < svrndarr.length; k++)
        {
            if (svrndarr[k].id === srtnd.leftkd)
            {
                mylkdndi = k;
                break;
            }
            //else;//do nothing
        }
        //console.log("mylkdndi = " + mylkdndi);

        if (mylkdndi < 0 || mylkdndi > svrndarr.length || mylkdndi == svrndarr.length)
        {
            throw "illegal index found and used for the left kid node!";
        }
        //else;//do nothing

        let myleftrlist = getTransversalForNodeArray(svrndarr, usepost, usein, svrndarr[mylkdndi]);
        if (myleftrlist == null || myleftrlist.length < 1);
        else
        {
            for (let n = 0; n < myleftrlist.length; n++)
            {
                //console.log("added myleftrlist[" + n + "].data = " + myleftrlist[n].data +
                //    " to the list!");
                myretarr.push(myleftrlist[n]);
            }
        }

        if (usein)
        {
            //left root right
            //console.log("using inorder!");
            
            myretarr.push(srtnd);//push current root now
            
            //console.log("added srtnd.data = " + srtnd.data + " to the list!");
        }
        //else;//do nothing

        if (myrightkdstr.length < 1)
        {
            //console.log("right kid is null!");
        }
        else
        {
            let myrkdndi = -1;
            for (let k = 0; k < svrndarr.length; k++)
            {
                if (svrndarr[k].id === srtnd.rightkd)
                {
                    myrkdndi = k;
                    break;
                }
                //else;//do nothing
            }
            //console.log("myrkdndi = " + myrkdndi);

            if (myrkdndi < 0 || myrkdndi > svrndarr.length || myrkdndi == svrndarr.length)
            {
                throw "illegal index found and used for the right kid node!";
            }
            //else;//do nothing

            let myrightrlist = getTransversalForNodeArray(svrndarr, usepost, usein, svrndarr[myrkdndi]);
            if (myrightrlist == null || myrightrlist.length < 1);
            else
            {
                for (let n = 0; n < myrightrlist.length; n++)
                {
                    //console.log("added myrightrlist[" + n + "].data = " + myrightrlist[n].data +
                    //    " to the list!");
                    myretarr.push(myrightrlist[n]);
                }
            }
        }
    }

    if (usepost)
    {
        //right left root
        //console.log("using postorder!");
        
        myretarr.push(srtnd);//push current root now
        
        //console.log("added srtnd.data = " + srtnd.data + " to the list!");
    }
    //else;//do nothing

    if (myretarr == undefined || myretarr == null || myretarr.length < 1)
    {
        throw "the return list must have at minimum the starting node on it!";
    }
    //else;//do nothing

    return myretarr;
}
function getPreOrderTransversalForNodeArray(svrndarr, srtnd=null)
{
    return getTransversalForNodeArray(svrndarr, false, false, srtnd);
}
function getInOrderTransversalForNodeArray(svrndarr, srtnd=null)
{
    return getTransversalForNodeArray(svrndarr, false, true, srtnd);
}
function getPostOrderTransversalForNodeArray(svrndarr, srtnd=null)
{
    return getTransversalForNodeArray(svrndarr, true, false, srtnd);
}

let myprevtabledomnd = null;
let myndsloaded = 0;
let addmydatanow = false;
let doneloading = false;
function addDataAndFireChangeListener(ndfromarr, prevtbldomnd, isfirst=false)
{
    if (prevtbldomnd == undefined || prevtbldomnd == null)
    {
        throw "illegal dom node found and used here!";
    }
    //else;//do nothing

    if (isfirst == undefined || isfirst == null)
    {
        throw "isfirst must be a defined boolean variable!";
    }
    else
    {
        if (isfirst === true || isfirst === false);
        else throw "isfirst must be a defined boolean variable!";
    }

    if (ndfromarr == undefined || ndfromarr == null)
    {
        throw "the node from the array must be defined and not null!";
    }
    //else;//do nothing

    console.log("adding the data now!");
    //debugger;
    prevtbldomnd.children[0].children[1].firstChild.firstChild.value = ndfromarr.data;
    //debugger;
    let mychangeevent = new Event("change");
    addmydatanow = false;
    console.log("NEW addmydatanow = " + addmydatanow);
    prevtbldomnd.children[0].children[1].firstChild.firstChild.dispatchEvent(mychangeevent);
    if (isfirst) myprevtabledomnd = prevtbldomnd;
    //else;//do nothing
    myndsloaded++;
    console.log("NEW myndsloaded = " + myndsloaded);
    console.log("DONE ADDING DATA FOR THE NODE!");
}

function canClickTheParentNode(ndarr, ptndi, si, mtabledomnd)
{
    if (mtabledomnd == undefined || mtabledomnd == null)
    {
        throw "illegal dom node found and used here!";
    }
    //else;//do nothing

    if (ptndi == undefined || ptndi == null || isNaN(ptndi) || ptndi < 0)
    {
        throw "illegal value for the parent node index! It must be a number at least zero!";
    }
    //else;//do nothing

    if (si == undefined || si == null || isNaN(si) || si < 0)
    {
        throw "illegal value for the starting node index! It must be a number at least zero!";
    }
    //else;//do nothing

    if (ndarr == undefined || ndarr == null || ndarr.length < 1) return false;
    else
    {
        if (ptndi == undefined || ptndi == null || isNaN(ptndi) || ptndi < 0 || ptndi > ndarr.length)
        {
            throw "illegal index for the parent node or illegal number of nodes in the node array!";
        }
        //else;//do nothing

        if (si < 0 || si > ndarr.length || si == ndarr.length)
        {
            throw "illegal value for the starting node index! It must be a number at least zero!";
        }
        //else;//do nothing
    }

    let myprevlkdstr = "";
    if (ndarr[ptndi].leftkd === null);
    else myprevlkdstr = "" + ndarr[ptndi].leftkd;

    let myprevrkdstr = "";
    if (ndarr[ptndi].rightkd === null);
    else myprevrkdstr = "" + ndarr[ptndi].rightkd;

    let useleftkd = false;
    let userightkd = false;
    if (myprevlkdstr.length < 1);
    else
    {
        if (ndarr[ptndi].leftkd === ndarr[si].id) useleftkd = true;
        //else;//do nothing
    }

    if (myprevrkdstr.length < 1);
    else
    {
        if (ndarr[ptndi].rightkd === ndarr[si].id) userightkd = true;
        //else;//do nothing
    }
    //console.log("useleftkd = " + useleftkd);
    //console.log("userightkd = " + userightkd);

    if (useleftkd || userightkd)
    {
        let myprebtn = null;
        if (useleftkd) myprebtn = getLeftKidDOMNodeHas(mtabledomnd, false);
        else myprebtn = getRightKidDOMNodeHas(mtabledomnd, false);
        addmydatanow = true;
        
        //console.log("NEW addmydatanow = " + addmydatanow);
        //console.log("myprebtn = " + myprebtn);
        
        //debugger;

        myprebtn.click();
        return true;
    }
    else return false;
}

function treeLoadedHandler(event){
    console.log("inside of other dom loaded function");
    console.log("myprevtabledomnd = " + myprevtabledomnd);
    console.log("myndsloaded = " + myndsloaded);
    //debugger;
    loadDOMFromTreeNodesArray(this, myprevtabledomnd, myndsloaded);
}

function loadDOMFromTreeNodesArray(ndarr, prevtbldomnd, si=0)
{
    if (ndarr == undefined || ndarr == null || ndarr.length < 1) return;
    else
    {
        if (si == undefined || si == null || si < 0 || isNaN(si))
        {
            throw "illegal value found and used for the starting node array index si index here!";
        }
        else
        {
            if (si > 0)
            {
                if (prevtbldomnd == undefined || prevtbldomnd == null)
                {
                    throw "illegal dom node found and used here!";
                }
                //else;//do nothing
            }
            //else;//do nothing
        }
    }

    if (si == 0)
    {
        //now get the text area for the first node and provide the data
        addDataAndFireChangeListener(ndarr[si], document.getElementById("tree").children[1], true);
        console.log("DONE ADDING DATA FOR THE FIRST NODE!");
    }
    else if (si > 0 && si < ndarr.length)
    {
        //get the previous node and the current node and check to see if they are directly related
        //if they are related, use the relationship to determine which kid to click
        //if they are not related, get the parent node and
        //then get the dom id for that node
        //determine which kid to click
        //click the kid
        console.log("si is greater than zero!");
        console.log("addmydatanow = " + addmydatanow);

        if (addmydatanow) addDataAndFireChangeListener(ndarr[si], prevtbldomnd);
        else
        {
            console.log("determinging the node to click!");
            if (canClickTheParentNode(ndarr, si - 1, si, prevtbldomnd));
            else
            {
                //build the binary tree here
                //
                //      10
                //    6     17
                //  5  8  15  20
                //3  7
                //
                //cannot click either, so need to get the parent node of the current node
                //the last node in the generated array will correspond to ndarr[si - 1] and below
                //si and above will not have been generated yet
                
                //console.log("ndarr[" + (si - 1) + "] = " + ndarr[si - 1]);
                //console.log("ndarr[" + si + "] = " + ndarr[si]);
                //console.log("ndarr[" + si + "].ptnd = " + ndarr[si].ptnd);

                let ptndi = -1;
                for (let n = 0; n < ndarr.length; n++)
                {
                    if (ndarr[n].id === ndarr[si].ptnd)
                    {
                        ptndi = n;
                        break;
                    }
                    //else;//do nothing
                }
                //console.log("ptndi = " + ptndi);

                if (ptndi < 0 || ptndi == ndarr.length || ptndi > ndarr.length)
                {
                    throw "illegal value found and used for the ptndi index here!";
                }
                //else;//do nothing
                //console.log("ndarr[" + ptndi + "] = " + ndarr[ptndi]);
                
                let mybintnd = mygenndsarr[ptndi];
                //console.log("mybintnd = " + mybintnd);
                
                let myptdomnddiv = document.getElementById(mybintnd.id);
                let mypttabledomnd = myptdomnddiv.parentNode.parentNode.parentNode;
                //console.log("mypttabledomnd = " + mypttabledomnd);
                
                if (canClickTheParentNode(ndarr, ptndi, si, mypttabledomnd));
                else throw "the parent node and this node must be related somehow!";
            }
        }
    }
    else if (si == ndarr.length)
    {
        document.getElementById("tree").removeEventListener("treeDOMLoaded", treeLoadedHandler);
        doneloading = true;
        console.log("DONE LOADING ALL OF THE NODES!");
        alert("DONE LOADING ALL OF THE NODES!");
    }
    else throw "illegal value found and used here for the si index!";
}

function loadBinaryOrSearchTree(usesrchtree, useuserbintree)
{
    //get the list of nodes from the api
    //then get the preorder of that list
    //then build the tree in that order
    //
    //GOAL: we want to take this list of nodes from the server and
    //-build a tree of the Binnodes and of the DOM nodes
    //
    //we do not want to modify the example nodes
    //we want to modify new nodes, so we want a copy of them
    //
    //concern: I cannot push them and gurantee the id
    //to build the tree, I need to have the ids guaranteed
    //
    //WAY AROUND THAT: use the event loop and build the tree in the right order,
    //then we don't care about the ids
    //but we need a custom event to signal that we are ready to laod the next one

    if (usesrchtree == undefined || usesrchtree == null)
    {
        throw "usesrchtree must be a defined boolean variable!";
    }
    else
    {
        if (usesrchtree === true || usesrchtree === false);
        else throw "usesrchtree must be a defined boolean variable!";
    }

    if (useuserbintree == undefined || useuserbintree == null)
    {
        throw "useuserbintree must be a defined boolean variable!";
    }
    else
    {
        if (useuserbintree === true || useuserbintree === false);
        else throw "useuserbintree must be a defined boolean variable!";
    }

    if (usesrchtree === useuserbintree)
    {
        if (usesrchtree)
        {
            throw "we cannot both be loading an example binary search tree and a user binary tree " +
                "at the same time!";
        }
        //else;//do nothing
    }
    //else;//do nothing
    
    let myurl = "http://localhost:3000/";
    if (useuserbintree) myurl += "nodes";
    else
    {
        myurl += "exbin";
        if (usesrchtree) myurl += "search";
        //else;//do nothing
        myurl += "treenodes";
    }
    console.log("myurl = " + myurl);
    
    fetch(myurl).then((response) => response.json()).
    then(function(response){
        console.log(response);
        let mynodesarr = response;
        
        //put the array in pre-order transversal: root left right
        //then build each node calling:
        //buildUserBinaryTree(domnode=null, binptnd=null, addonleft=false, addonright=false)
        //when we want to add a left kid we find the left kid button and click it

        let myrtndi = -1;
        if (mynodesarr == undefined || mynodesarr == null || mynodesarr.length < 1)
        {
            console.error("no nodes on the server to load in for the user tree!");
            showLoadFormAfterNoNodes();
            alert("Error: No nodes were found on the server for a user tree!\n" +
                "You may build your own, load an example of a binary search tree or of a binary tree!");
        }
        else if (mynodesarr.length > 0)
        {
            for (let n = 0; n < mynodesarr.length; n++)
            {
                //console.log("mynodesarr[" + n + "] = " + mynodesarr[n]);
                if (mynodesarr[n].ptnd == null)
                {
                    myrtndi = n;
                    break;
                }
                //else;//do nothing
            }
            //console.log("myrtndi = " + myrtndi);
            
            if (myrtndi < 0 || myrtndi > mynodesarr.length || myrtndi == mynodesarr.length)
            {
                throw "illegal root node index found and used here!";
            }
            //else;//do nothing

            let mypretransndarr = getPreOrderTransversalForNodeArray(mynodesarr, mynodesarr[myrtndi]);
            
            //console.log("mypretransndarr[0] = " + mypretransndarr[0]);
            
            document.getElementById("tree").addEventListener("treeDOMLoaded",
                treeLoadedHandler.bind(mypretransndarr));
            
            buildUserBinaryTree();
        }
        else throw "illegal length found and used for the nodes array from the server!";
        
        //console.error("NOT DONE YET 7-15-2023 2:53 AM!");
        //debugger;
    }).catch(function(err){
        console.error("there was an error getting the nodes!");
        console.error(err);
        alert("Error: There was a problem getting the nodes from the server! See log for details!");
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
            //console.log("item.isRootNode() = " + item.isRootNode());
            if (item.isRootNode()) return false;
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
                //console.log("transversalarr[" + n + "].isRootNode() = " +
                //    transversalarr[n].isRootNode());
                if (transversalarr[n].isRootNode()) return n;
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
    get isRoot() { return this.isRootNode(); }
    getRootNode(vlistnds=null)
    {
        //console.log("this.data = " + this.data);
        if (this.isRootNode()) return this;
        else
        {
            //check to see if already on visited list of nodes circle reference error
            //add the current node to the visited list
            //console.log("this.ptnd.data = " + this.ptnd.data);
            let myvlistnds = null;
            if (vlistnds == null || vlistnds.length < 1)
            {
                myvlistnds = new Array();
            }
            else
            {
                for (let n = 0; n < vlistnds.length; n++)
                {
                    if (vlistnds[n] == null)
                    {
                        throw "no null nodes allowed on the list!";
                    }
                    else
                    {
                        //console.log("vlistnds[" + n + "].data = " + vlistnds[n].data);
                        if (vlistnds[n] === this)
                        {
                            throw "CircularReferenceError: not a tree! Already visited this node; " +
                                "root not found!";
                        }
                        //else;//do nothing
                    }
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
            }
            myvlistnds.push(this);
            return this.ptnd.getRootNode(myvlistnds);
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
    isKidOfParent(kid=this, pt=null)
    {
        //console.log("kid.isRootNode() = " + kid.isRootNode());
        if (kid.isRootNode())
        {
            if (pt == undefined || pt == null) return true;
            else return false;
        }
        else
        {
            if (pt == undefined || pt == null) return false;
            else return (kid.ptnd === pt);
        }
    }
    isParentOf(kid=null, pt=this)
    {
        return this.isKidOfParent(kid, pt);
    }
    numberOfLevelsOnTree(snd=this.root, cnumlevels=1, vlist = null)
    {
        if (snd == undefined || snd == null) throw "starting node must be defined!";
        //else;//do nothing
        //console.log("snd.data = " + snd.data);
        //console.log("snd.id = " + snd.id);
        //console.log("cnumlevels = " + cnumlevels);
        if (vlist == undefined || vlist == null || vlist.length < 1)
        {
            //console.log("vlist is null or empty!");
        }
        else
        {
            //console.log("vlist.length = " + vlist.length);
            //console.log("vlist:");
            //for (let p = 0; p < vlist.length; p++)
            //{
            //    console.log("vlist[" + p + "].data = " + vlist[p].data);
            //}
        }

        let myvlist = null;
        let sndonvlist = false;
        if (vlist == undefined || vlist == null || vlist.length < 1);
        else
        {
            myvlist = new Array();
            for (let n = 0; n < vlist.length; n++)
            {
                if (vlist[n] == undefined || vlist[n] == null)
                {
                    throw "null and undefined are not allowed on the visited nodes list!";
                }
                else
                {
                    if (vlist[n] === snd)
                    {
                        if (sndonvlist);
                        else sndonvlist = true;
                    }
                    //else;//do nothing

                    myvlist.push(vlist[n]);
                }
            }
        }
        //console.log("sndonvlist = " + sndonvlist);
        
        //visit the current starting node or root node
        //then visit its kids
        //       f        | level 0 |
        //  d       k     | level 1 |
        // b e    h   m   | level 2 |
        //a c    g i l n  | level 3 | number of levels = 4
        //the root
        //its kids
        //their kids
        //just the root, return 1

        let visitleftkd = false;
        if (snd.leftkd == null) visitleftkd = false;
        else visitleftkd = true;
        let visitrightkd = false;
        if (snd.rightkd == null) visitrightkd = false;
        else visitrightkd = true;
        //console.log("visitleftkd = " + visitleftkd);
        //console.log("visitrightkd = " + visitrightkd);

        if (myvlist == null) myvlist = new Array();
        //else;//do nothing
        if (sndonvlist);
        else myvlist.push(snd);

        let numleft = 0;
        if (visitleftkd)
        {
            myvlist.push(snd.leftkd);
            numleft = this.numberOfLevelsOnTree(snd.leftkd, cnumlevels + 1, myvlist);
        }
        //else;//do nothing
        let numright = 0;
        if (visitrightkd)
        {
            myvlist.push(snd.rightkd);
            numright = this.numberOfLevelsOnTree(snd.rightkd, cnumlevels + 1, myvlist);
        }
        //else;//do nothing
        //console.log("FINAL visitleftkd = " + visitleftkd);
        //console.log("FINAL visitrightkd = " + visitrightkd);
        //console.log("FINAL numleft = " + numleft);
        //console.log("FINAL numright = " + numright);
        //console.log("FINAL snd.data = " + snd.data);
        //console.log("FINAL snd.id = " + snd.id);
        //console.log("FINAL sndonvlist = " + sndonvlist);
        //console.log("FINAL cnumlevels = " + cnumlevels);
        
        if (visitleftkd && visitrightkd)
        {
            if (numleft > numright) return numleft;
            else return numright;
        }
        else
        {
            if (visitleftkd || visitrightkd)
            {
                if (visitleftkd) return numleft;
                else return numright;
            }
            else return cnumlevels;
        }
    }
    get numLevelsOnTree()
    {
        return this.numberOfLevelsOnTree(this.root, 1, null);
    }
    levelForNode(snd=this.root, fnd=this, clevel=0, vlist=null)
    {
        if (snd == undefined || snd == null) throw "starting node must be defined!";
        //else;//do nothing
        if (fnd == undefined || fnd == null) throw "the node we are looking for must not be null!";
        //else;//do nothing
        //console.log("snd.data = " + snd.data);
        //console.log("snd.id = " + snd.id);
        //console.log("fnd.data = " + fnd.data);
        //console.log("fnd.id = " + fnd.id);
        //console.log("clevel = " + clevel);
        
        let myvlist = new Array();
        if (vlist == undefined || vlist == null || vlist.length < 1)
        {
            //console.log("vlist is null or empty!");
        }
        else
        {
            //console.log("vlist.length = " + vlist.length);
            //console.log("vlist:");
            for (let p = 0; p < vlist.length; p++)
            {
                //console.log("vlist[" + p + "].data = " + vlist[p].data);
                myvlist.push(vlist[p]);
            }
        }

        if (fnd === snd)
        {
            //console.log("found our node!");
            //console.log("RETURNED clevel = " + clevel);
            return clevel;
        }
        //else;//do nothing

        //visit the current node
        myvlist.push(snd);

        let visitleftkd = ((snd.leftkd == null) ? false : true);
        let visitrightkd = ((snd.rightkd == null) ? false : true);
        //console.log("visitleftkd = " + visitleftkd);
        //console.log("visitrightkd = " + visitrightkd);

        if (visitleftkd || visitrightkd)
        {
            let leftkdlv = -1;
            if (visitleftkd)
            {
                leftkdlv = this.levelForNode(snd.leftkd, this, clevel + 1, myvlist);
                //if (leftkdlv > 0 || leftkdlv == 0) return leftkdlv;
                //else;//do nothing
            }
            //else;//do nothing
            let rightkdlv = -1;
            if (visitrightkd)
            {
                rightkdlv = this.levelForNode(snd.rightkd, this, clevel + 1, myvlist);
                //if (rightkdlv > 0 || rightkdlv == 0) return rightkdlv;
                //else;//do nothing
            }
            //else;//do nothing
            //console.log("FINAL snd.data = " + snd.data);
            //console.log("FINAL snd.id = " + snd.id);
            //console.log("FINAL fnd.data = " + fnd.data);
            //console.log("FINAL fnd.id = " + fnd.id);
            //console.log("FINAL visitleftkd = " + visitleftkd);
            //console.log("FINAL visitrightkd = " + visitrightkd);
            //console.log("FINAL leftkdlv = " + leftkdlv);
            //console.log("FINAL rightkdlv = " + rightkdlv);
            //console.log("FINAL clevel = " + clevel);
            
            if (visitleftkd && visitrightkd)
            {
                if (leftkdlv > 0 || leftkdlv == 0) return leftkdlv;
                else if (rightkdlv > 0 || rightkdlv == 0) return rightkdlv;
                //else;//do nothing
            }
            else
            {
                if (visitleftkd)
                {
                    if (leftkdlv > 0 || leftkdlv == 0) return leftkdlv;
                    //else;//do nothing
                }
                else
                {
                    if (visitrightkd)
                    {
                        if (rightkdlv > 0 || rightkdlv == 0) return rightkdlv;
                        //else;//do nothing
                    }
                    else
                    {
                        throw "this said we must have been visiting one or the other, but visited " +
                            "neither, but already checked for this case!";
                    }
                }
            }
        }
        //else;//do nothing
        
        //console.error("the node we were looking for was not found!");
        return -1;
    }
    get level()
    {
        return this.levelForNode(this.root, this, 0, null);
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
        for (let n = 0; n < mydataarr.length; n++) mydatacparr.push("" + mydataarr[n]);
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
    farthestLeftKidOfNode(nd)
    {
        if (nd == undefined || nd == null)
        {
            console.error("this node is null! So returned null!");
            return null;
        }
        //else;//do nothing

        if (nd.leftkd == null)
        {
            if (nd.rightkd == null) return nd;
            else return this.farthestLeftKidOfNode(nd.rightkd); 
        }
        else return this.farthestLeftKidOfNode(nd.leftkd);
    }
    get farthestLeftKidOfThis() { return this.farthestLeftKidOfNode(this); }
    clearDataProperties()
    {
        //the node has no kids, no problem
        //but it does have a parent unless only node
        //console.log("OLD this.data = " + this.data);
        //console.log("OLD this.id = " + this.id);
        //console.log("OLD this.ptnd = " + this.ptnd);
        //console.log("OLD this.leftkd = " + this.leftkd);
        //console.log("OLD this.rightkd = " + this.rightkd);

        //set the data to null
        //remove the node on the parent node...
        //set the id to null
        //set the object to null

        this.data = null;
        this.id = null;
        this.leftkd = null;
        this.rightkd = null;
        this.ptnd = null;

        //console.log("NEW this.data = " + this.data);
        //console.log("NEW this.id = " + this.id);
        //console.log("NEW this.ptnd = " + this.ptnd);
        //console.log("NEW this.leftkd = " + this.leftkd);
        //console.log("NEW this.rightkd = " + this.rightkd);
    }
    areAllPropertiesNull()
    {
        return ((this.data == null) && (this.id == null) && (this.leftkd == null) &&
        (this.rightkd == null) && (this.ptnd == null));
    }
    get areAllPropertiesCleared() { return this.areAllPropertiesNull(); }
    remove()
    {
        //if the node has no kids, then it can be removed immediately
        //the dom no kids will have both the add left kid and add right kid buttons
        //
        //then of course if the node has kids, then we need to be careful about it
        //   4
        // 2   6
        //0 3 5 8
        //suppose we want to remove 4 which has kids and is also the root node:
        //we need a new root node
        //we need to make sure both the left and right trees are hooked up to it correctly
        //this new root node needs to have no kids,
        //ideally it will also put the in-order transversal in order
        //so on the right tree find the farthest left node that has no kids
        //this will then be the new root
        //then we just hook up the kids
        //we also set the left and right kids new parent node
        //then we are free to set that parent node to null after we nullify all of the properties
        //
        //if we wanted to remove 4, 5 becomes the new root
        //if we wanted to remove 2, 3 becomes the new midroot
        //
        //the dom nodes will be the same, but more complicated because it is more complicated
        //

        console.log("the node we are removing:");
        console.log("this.data = " + this.data);
        console.log("this.id = " + this.id);
        if (this.ptnd == null) console.log("this is the root! It has no parents!");
        else
        {
            console.log("this.ptnd.data = " + this.ptnd.data);
            console.log("this.ptnd.id = " + this.ptnd.id);
        }

        let noleftkd = (this.leftkd == null);
        let norightkd = (this.rightkd == null);
        console.log("noleftkd = " + noleftkd);
        console.log("norightkd = " + norightkd);
        if (noleftkd)
        {
            console.log("this.leftkd = null");
        }
        else
        {
            console.log("this.leftkd.data = " + this.leftkd.data);
            console.log("this.leftkd.id = " + this.leftkd.id);
        }
        if (norightkd)
        {
            console.log("this.rightkd = null");
        }
        else
        {
            console.log("this.rightkd.data = " + this.rightkd.data);
            console.log("this.rightkd.id = " + this.rightkd.id);
        }
        console.log("");
        console.log("begin removing the node now!");

        let islkdofptnd = false;
        let isrkdofptnd = false;
        //debugger;
        if (this.ptnd == null);
        else
        {
            if (this.ptnd.leftkd == this)
            {
                islkdofptnd = true;
                //console.log("this is the left kid of its parent node!");
            }
            else
            {
                if (this.ptnd.rightkd == this)
                {
                    isrkdofptnd = true;
                    //console.log("this is the left kid of its parent node!");
                }
                else throw "this must be a kid of the parent node, but it was not!";
            }
        }
        console.log("islkdofptnd = " + islkdofptnd);
        console.log("isrkdofptnd = " + isrkdofptnd);

        if (noleftkd && norightkd)
        {
            //console.log("THIS IS A LEAF! This has no kids!");
            
            if (islkdofptnd) this.ptnd.leftkd = null;
            else if (isrkdofptnd) this.ptnd.rightkd = null;
            //else;//do nothing

            this.clearDataProperties();
        }
        else
        {
            //this has 1 or 2 kids
            console.log("this has at one or two kids!");

            let flkdrkthis = null;
            let hasbothkids = false;
            if (noleftkd || norightkd)
            {
                //has one kid
                console.log("this has one kid!");
                if (norightkd) flkdrkthis = this.leftkd;
                else flkdrkthis = this.rightkd;
            }
            else
            {
                //has both kids
                console.log("this has both kids!");
                hasbothkids = true;
                flkdrkthis = this.farthestLeftKidOfNode(this.rightkd);
            }
            console.log("hasbothkids = " + hasbothkids);
            console.log("flkdrkthis = " + flkdrkthis);
            console.log("flkdrkthis.id = " + flkdrkthis.id);
            console.log("flkdrkthis.data = " + flkdrkthis.data);
            console.log("OLD flkdrkthis.ptnd = " + flkdrkthis.ptnd);
            if (flkdrkthis.ptnd == null);
            else
            {
                console.log("OLD flkdrkthis.ptnd.id = " + flkdrkthis.ptnd.id);
                console.log("OLD flkdrkthis.ptnd.data = " + flkdrkthis.ptnd.data);
            }

            //the new root is: flkdrkthis

            //   4 <- remove this, replace with 5
            // 2   6
            //0 3 5 8
            //
            //   4
            // 2   6 <- remove this, replace with 8
            //0 3   8
            //
            //so on the right tree find the farthest left node that has no kids
            //this will then be the new root
            //then we just hook up the kids
            //we also set the left and right kids new parent node
            //then we are free to set that parent node to null after we nullify all of the properties
            //
            //this.ptnd we need a reference to it
            //we need to know which kid left or right
            //
            //

            if (hasbothkids)
            {
                console.log("THIS HAS BOTH KIDS!");
                //first create new references to the nodes we want to keep
                let myleftkd = this.leftkd;
                let myrightkd = this.rightkd;
                let myptnd = this.ptnd;
                //my new root is flkdrkthis
                
                //   4         5         6
                // 2   6  TO: 3 6  TO:  3 8
                //0 3 5 8    0   8     0

                //set the parents of the left and right kid and add the kids to the parent node
                console.log("OLD flkdrkthis.leftkd = " + flkdrkthis.leftkd);
                console.log("OLD flkdrkthis.rightkd = " + flkdrkthis.rightkd);
                //console.log("OLD myleftkd.ptnd = " + myleftkd.ptnd);
                //console.log("OLD myleftkd.ptnd.data = " + myleftkd.ptnd.data);
                //console.log("OLD myleftkd.ptnd.id = " + myleftkd.ptnd.id);
                //console.log("OLD myrightkd.ptnd = " + myrightkd.ptnd);
                //console.log("OLD myrightkd.ptnd.data = " + myrightkd.ptnd.data);
                //console.log("OLD myrightkd.ptnd.id = " + myrightkd.ptnd.id);

                if (myleftkd === flkdrkthis);
                else
                {
                    myleftkd.ptnd = flkdrkthis;
                    flkdrkthis.leftkd = myleftkd;
                }
                if (myrightkd === flkdrkthis);
                else
                {
                    myrightkd.ptnd = flkdrkthis;
                    flkdrkthis.rightkd = myrightkd;
                }

                //console.log("NEW myleftkd.ptnd = " + myleftkd.ptnd);
                console.log("NEW myleftkd.ptnd.data = " + myleftkd.ptnd.data);
                console.log("NEW myleftkd.ptnd.id = " + myleftkd.ptnd.id);
                //console.log("NEW myrightkd.ptnd = " + myrightkd.ptnd);
                console.log("NEW myrightkd.ptnd.data = " + myrightkd.ptnd.data);
                console.log("NEW myrightkd.ptnd.id = " + myrightkd.ptnd.id);
                //console.log("NEW flkdrkthis.leftkd = " + flkdrkthis.leftkd);
                if (flkdrkthis.leftkd == null);
                else
                {
                    console.log("NEW flkdrkthis.leftkd.data = " + flkdrkthis.leftkd.data);
                    console.log("NEW flkdrkthis.leftkd.id = " + flkdrkthis.leftkd.id);
                }
                //console.log("NEW flkdrkthis.rightkd = " + flkdrkthis.rightkd);
                if (flkdrkthis.rightkd == null);
                else
                {
                    console.log("NEW flkdrkthis.rightkd.data = " + flkdrkthis.rightkd.data);
                    console.log("NEW flkdrkthis.rightkd.id = " + flkdrkthis.rightkd.id);
                }
                

                //what we have so far:
                //   4 <- remove this, replace with 5
                //      6  <-
                //     5 8  | same node not a circle
                // 2    6  <-
                //0 3
                //
                //we need to change the kids node that goes to 5
                //then we need to change 5's parent node
                //
                //5's parent node needs to be this's parent node
                //flkdrkthis.ptnd = this.ptnd;

                if (flkdrkthis.ptnd.leftkd === flkdrkthis)
                {
                    //console.log("OLD flkdrkthis.ptnd.leftkd = " + flkdrkthis.ptnd.leftkd);
                    console.log("OLD flkdrkthis.ptnd.leftkd.data = " + flkdrkthis.ptnd.leftkd.data);
                    console.log("OLD flkdrkthis.ptnd.leftkd.id = " + flkdrkthis.ptnd.leftkd.id);

                    flkdrkthis.ptnd.leftkd = null;

                    console.log("NEW flkdrkthis.ptnd.leftkd = " + flkdrkthis.ptnd.leftkd);
                }
                else if (flkdrkthis.ptnd.rightkd === flkdrkthis)
                {
                    //console.log("OLD flkdrkthis.ptnd.rightkd = " + flkdrkthis.ptnd.rightkd);
                    console.log("OLD flkdrkthis.ptnd.rightkd.data = " + flkdrkthis.ptnd.rightkd.data);
                    console.log("OLD flkdrkthis.ptnd.rightkd.id = " + flkdrkthis.ptnd.rightkd.id);

                    flkdrkthis.ptnd.rightkd = null;

                    console.log("NEW flkdrkthis.ptnd.rightkd = " + flkdrkthis.ptnd.rightkd);
                }
                else throw "the parent of the node must have the node as one of its kids, but it did not!";

                console.log("OLD flkdrkthis.ptnd = " + flkdrkthis.ptnd);
                if (flkdrkthis.ptnd == null);
                else
                {
                    console.log("OLD flkdrkthis.ptnd.data = " + flkdrkthis.ptnd.data);
                    console.log("OLD flkdrkthis.ptnd.id = " + flkdrkthis.ptnd.id);
                }

                flkdrkthis.ptnd = myptnd;

                console.log("NEW flkdrkthis.ptnd = " + flkdrkthis.ptnd);
                if (myptnd == null);
                else
                {
                    console.log("NEW flkdrkthis.ptnd.data = " + flkdrkthis.ptnd.data);
                    console.log("NEW flkdrkthis.ptnd.id = " + flkdrkthis.ptnd.id);
                }

                if (myptnd == null);
                else
                {
                    if (islkdofptnd)
                    {
                        //console.log("OLD myptnd.leftkd = " + myptnd.leftkd);
                        console.log("OLD myptnd.leftkd.data = " + myptnd.leftkd.data);
                        console.log("OLD myptnd.leftkd.id = " + myptnd.leftkd.id);

                        myptnd.leftkd = flkdrkthis;

                        //console.log("NEW myptnd.leftkd = " + myptnd.leftkd);
                        console.log("NEW myptnd.leftkd.data = " + myptnd.leftkd.data);
                        console.log("NEW myptnd.leftkd.id = " + myptnd.leftkd.id);
                    }
                    else if (isrkdofptnd)
                    {
                        //console.log("OLD myptnd.rightkd = " + myptnd.rightkd);
                        console.log("OLD myptnd.rightkd.data = " + myptnd.rightkd.data);
                        console.log("OLD myptnd.rightkd.id = " + myptnd.rightkd.id);

                        myptnd.rightkd = flkdrkthis;

                        //console.log("NEW myptnd.rightkd = " + myptnd.rightkd);
                        console.log("NEW myptnd.rightkd.data = " + myptnd.rightkd.data);
                        console.log("NEW myptnd.rightkd.id = " + myptnd.rightkd.id);
                    }
                    //else;//do nothing
                }

                this.clearDataProperties();
            }
            else
            {
                //console.log("THIS HAS ONE KID! IT IS EITHER THE LEFT OR THE RIGHT KID!");
                
                let mynwptndref = this.ptnd;
                //the node we want is: flkdrkthis
                flkdrkthis.ptnd = mynwptndref;

                if (islkdofptnd || isrkdofptnd)
                {
                    if (islkdofptnd)
                    {
                        mynwptndref.leftkd = flkdrkthis;
                        //console.log("NEW this.ptnd.leftkd = " + this.ptnd.leftkd);
                        //console.log("NEW this.ptnd.leftkd.id = " + this.ptnd.leftkd.id);
                        //console.log("NEW this.ptnd.leftkd.data = " + this.ptnd.leftkd.data);
                    }
                    else //if (isrkdofptnd)
                    {
                        mynwptndref.rightkd = flkdrkthis;
                        //console.log("NEW this.ptnd.rightkd = " + this.ptnd.rightkd);
                        //console.log("NEW this.ptnd.rightkd.id = " + this.ptnd.rightkd.id);
                        //console.log("NEW this.ptnd.rightkd.data = " + this.ptnd.rightkd.data);
                    }
                    //else throw "this must be a kid of the parent node, but it was not!";
                }
                //else;//do nothing parent node will be null
                
                this.clearDataProperties();
                
                //console.log("NEW flkdrkthis = " + flkdrkthis);
                //console.log("NEW flkdrkthis.id = " + flkdrkthis.id);
                //console.log("NEW flkdrkthis.data = " + flkdrkthis.data);
                //console.log("NEW flkdrkthis.ptnd = " + flkdrkthis.ptnd);
                if (flkdrkthis.ptnd == null);
                else
                {
                    //console.log("NEW flkdrkthis.ptnd.id = " + flkdrkthis.ptnd.id);
                    //console.log("NEW flkdrkthis.ptnd.data = " + flkdrkthis.ptnd.data);
                }
                //debugger;
            }
        }
    }
    transversal(useinorder, usepost, snd=this.root, vlist=null)
    {
        //console.log("INSIDE TRANSVERSAL():");
        //console.log("useinorder = " + useinorder);
        //console.log("usepost = " + usepost);
        //console.log("snd = " + snd);
        //console.log("vlist = " + vlist);
        if (snd == undefined || snd == null)
        {
            throw "the starting node must be defined and not null!";
            //return null;
        }
        //else;//do nothing
        //if (vlist == null || vlist.length < 1) console.log("vlist is empty!");
        //else
        //{
        //    for (let p = 0; p < vlist.length; p++)
        //    {
        //        console.log("vlist[" + n + "].data = " + vlist[n].data);
        //    }
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


        if (usepost)
        {
            //right left root
            //console.log("using postorder!");
            
            rlist.push(snd);//push current root now
            
            //console.log("added snd.data = " + snd.data + " to the list!");
        }
        //else;//do nothing

        if (rlist == undefined || rlist == null || rlist.length < 1)
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

function removeAllDOMKidsOfDOMNode(domnd=null, remself=false)
{
    if (remself == undefined || remself == null)
    {
        throw "remself must be a defined boolean variable!";
    }
    else
    {
        if (remself === true || remself === false);
        else throw "remself must be a defined boolean variable!";
    }
    
    if (domnd == undefined || domnd == null)
    {
        //console.log("no nodes found!");
        return;
    }
    else
    {
        if (domnd.children == null || domnd.children.length < 1);
        else
        {
            for (let n = 0; n < domnd.children.length; n++)
            {
                removeAllDOMKidsOfDOMNode(domnd.children[n], true);
            }
        }
        
        if (remself) domnd.remove();
        //else;//do nothing
    }
}

function clearAndHideAllTransversals()
{
    //clear and remove all of the normal nodes in the pre order here now
    let myprordernormalnds = document.getElementById("prorder").getElementsByClassName("normalnds");
    if (myprordernormalnds == null || myprordernormalnds.length < 1)
    {
        //console.log("number of normal nodes on the preorder initially = 0");
    }
    else
    {
        let mylenpreordernrmlnodes = myprordernormalnds.length;
        //console.log("number of normal nodes on the preorder initially = " + mylenpreordernrmlnodes);
        //for (let n = 0; n < mylenpreordernrmlnodes; n++)
        //{
        //    console.log("myprordernormalnds[" + n + "] = " + myprordernormalnds[n]);
        //}
        //console.log("now attempting to remove them here:");
        for (let n = 0; n < mylenpreordernrmlnodes; n++)
        {
            //console.log("myprordernormalnds[" + n + "] = " + myprordernormalnds[n]);
            removeAllDOMKidsOfDOMNode(myprordernormalnds[n], true);
            n--;
            mylenpreordernrmlnodes--;
            //console.log("NEW n = " + n);
            //console.log("NEW mylenpreordernrmlnodes = " + mylenpreordernrmlnodes);
        }
        //debugger;
    }

    document.getElementById("prorder").getElementsByClassName("rtnd")[0].textContent = "";
    //document.getElementById("prorder").getElementsByClassName("normalnds")[0].textContent = "";
    
    removeAllDOMKidsOfDOMNode(document.getElementById("innrmalndsparta"), false);
    removeAllDOMKidsOfDOMNode(document.getElementById("innrmalndspartb"), false);
    document.getElementById("innrmalndsparta").textContent = "";
    document.getElementById("innrmalndsparta").style.display = "none";
    document.getElementById("pinorder").getElementsByClassName("rtnd")[0].textContent = "";
    document.getElementById("innrmalndspartb").textContent = "";
    document.getElementById("innrmalndspartb").style.display = "none";
    
    removeAllDOMKidsOfDOMNode(document.getElementById("psnrmalnds"), false);
    document.getElementById("psorder").getElementsByClassName("rtnd")[0].textContent = "";
    document.getElementById("psorder").getElementsByClassName("normalnds")[0].textContent = "";
    document.getElementById("psorder").getElementsByClassName("normalnds")[0].style.display = "none";

    let myrtnds = document.getElementsByClassName("rtnd");
    for (let n = 0; n < myrtnds.length; n++)
    {
        myrtnds[n].style.display = "none";
    }
}

function showOrHideToolTip(pdivelem, showelem, useclick)
{
    //console.log("showelem = " + showelem);
    //console.log("useclick = " + useclick);
    if (showelem == undefined || showelem == null)
    {
        throw "showelem must be a defined boolean variable!";
    }
    else
    {
        if (showelem === true || showelem === false);
        else throw "showelem must be a defined boolean variable!";
    }

    if (useclick == undefined || useclick == null)
    {
        throw "useclick must be a defined boolean variable!";
    }
    else
    {
        if (useclick === true || useclick === false);
        else throw "useclick must be a defined boolean variable!";
    }

    if (pdivelem == undefined || pdivelem == null)
    {
        throw "the div containing the span element is not allowed to be null!";
    }
    //else;//do nothing

    if (useclick) console.log("clicked node in transversal!");
    else console.log("hovered " + (showelem ? "on" : "off") + " node in transversal!");
    //console.log("this = " + this);
    //console.log("this.id = " + this.id);
    //console.log("this.data = " + this.data);
    //console.log("this.level = " + this.level);
    let mydatinfospan = pdivelem.getElementsByTagName("span")[0];
    if (useclick)
    {
        //console.log("mydatinfospan.style.display = " + mydatinfospan.style.display);
        if (mydatinfospan.style.display === "none") mydatinfospan.style.display = "inline-block";
        else if (mydatinfospan.style.display === "inline-block") mydatinfospan.style.display = "none";
        else throw "invalid display value found and used here!";
        //debugger;
    }
    else
    {
        if (showelem) mydatinfospan.style.display = "inline-block";
        else mydatinfospan.style.display = "none";
        //debugger;
    }
}
function showToolTip(pdivelem)
{
    showOrHideToolTip.call(this, pdivelem, true, false);//showelem, useclick
}
function hideToolTip(pdivelem)
{
    showOrHideToolTip.call(this, pdivelem, false, false);//showelem, useclick
}

function generateTransversalDOMNodesFor(binnd, lenpreordertrans, exdomnode, islastnd=false, isrtnd=false)
{
    if (binnd == undefined || binnd == null)
    {
        throw "the incoming binary tree node whose data is being displayed must not be null!";
    }
    //else;//do nothing

    if (exdomnode == undefined || exdomnode == null)
    {
        throw "the incoming binary tree node whose data is being displayed must not be null!";
    }
    //else;//do nothing

    if (islastnd == undefined || islastnd == null)
    {
        throw "islastnd must be a defined boolean variable!";
    }
    else
    {
        if (islastnd === true || islastnd === false);
        else throw "islastnd must be a defined boolean variable!";
    }

    if (isrtnd == undefined || isrtnd == null)
    {
        throw "isrtnd must be a defined boolean variable!";
    }
    else
    {
        if (isrtnd === true || isrtnd === false);
        else throw "isrtnd must be a defined boolean variable!";
    }

    if (lenpreordertrans == undefined || lenpreordertrans == null || isNaN(lenpreordertrans))
    {
        throw "illegal length found and used for the lenpreordertrans!";
    }
    else if (lenpreordertrans < 0) throw "illegal length found and used for the lenpreordertrans!";
    //else;//do nothing

    //buld a new div node that will be displayed inline and have the normalnds class
    //for each data item
    let mydatinfospan = document.createElement("span");
    mydatinfospan.style.display = "none";
    mydatinfospan.style.backgroundColor = "#555";//grey black ish
    mydatinfospan.style.color = "#fff";//white
    mydatinfospan.style.textAlign = "center";
    mydatinfospan.style.position = "absolute";
    mydatinfospan.style.bottom = "125%";
    mydatinfospan.style.width = "120px";
    mydatinfospan.style.marginLeft = "-70px";
    mydatinfospan.className = "tooltiptext";
    //cannot build the arrow in javascript because I cannot get the pseudo class after and add rules
    let myndisrtp = document.createElement("p");
    myndisrtp.textContent = "my node is " + (binnd.isRootNode() ? "" : "not") + " the root node!";
    let myndp = document.createElement("p");
    myndp.textContent = "my node id: " + binnd.id;
    let mynddatp = document.createElement("p");
    mynddatp.textContent = "my node data: " + binnd.data;
    let myndlvp = document.createElement("p");
    myndlvp.textContent = "my node level: " + binnd.level + "!";
    let mydatdiv = null;
    if (isrtnd)
    {
        exdomnode.textContent = "" + ((lenpreordertrans > 1) ? ", " : "") + binnd.data +
            ((lenpreordertrans > 1 && islastnd) ? ", " : "");
        //mydatonlypreorderarr[n];
        exdomnode.style.position = "relative";
    }
    else
    {
        mydatdiv = document.createElement("div");
        mydatdiv.style.position = "relative";
        mydatdiv.style.display = "inline-block";
        mydatdiv.className = "normalnds";
        mydatdiv.textContent = "" + ((lenpreordertrans > 1) ? ", " : "") + binnd.data +
            ((lenpreordertrans > 1 && islastnd) ? ", " : "");
        //mydatonlypreorderarr[n];
    }
    mydatinfospan.appendChild(myndisrtp);
    mydatinfospan.appendChild(myndp);
    mydatinfospan.appendChild(mynddatp);
    mydatinfospan.appendChild(myndlvp);
    if (isrtnd)
    {
        exdomnode.appendChild(mydatinfospan);
        exdomnode.addEventListener("mouseover", function(event) {
            showToolTip.call(binnd, exdomnode);
        });
        exdomnode.addEventListener("mouseout", function(event) {
            hideToolTip.call(binnd, exdomnode);
        });
        exdomnode.addEventListener("click", function(event) {
            showOrHideToolTip.call(binnd, exdomnode, false, true);
        });
    }
    else
    {
        mydatdiv.appendChild(mydatinfospan);
        exdomnode.appendChild(mydatdiv);
        mydatdiv.addEventListener("mouseover", function(event) {
            showToolTip.call(binnd, mydatdiv);
        });
        mydatdiv.addEventListener("mouseout", function(event) {
            hideToolTip.call(binnd, mydatdiv);
        });
        mydatdiv.addEventListener("click", function(event) {
            showOrHideToolTip.call(binnd, mydatdiv, false, true);
        });
    }
}

function doTransversalsHaveAllGenNodes()
{
    if (mygenndsarr == null || mygenndsarr.length < 1) return;
    //else;//do nothing

    for (let n = 0; n < mygenndsarr.length; n++)
    {
        //console.log("mygenndsarr[" + n + "] = " + mygenndsarr[n]);
        //console.log("mygenndsarr[" + n + "].data = " + mygenndsarr[n].data);
        
        let mypretrans = mygenndsarr[n].preOrderTransversal;
        let ndfnd = false;
        //console.log("mypretrans.length = " + mypretrans.length);

        for (let k = 0; k < mypretrans.length; k++)
        {
            //console.log("mypretrans[k = " + k + "] = " + mypretrans[k]);
            //console.log("mypretrans[k = " + k + "].data = " + mypretrans[k].data);
            if (mypretrans[k] === mygenndsarr[n])
            {
                ndfnd = true;
                break;
            }
            //else;//do nothing
        }

        if (ndfnd);
        else throw "the bin node must have been found on the transversal, but it was not!";

        let myposttrans = mygenndsarr[n].postOrderTransversal;
        ndfnd = false;
        for (let k = 0; k < myposttrans.length; k++)
        {
            if (myposttrans[k] === mygenndsarr[n])
            {
                ndfnd = true;
                break;
            }
            //else;//do nothing
        }

        if (ndfnd);
        else throw "the bin node must have been found on the transversal, but it was not!";

        let myinordertrans = mygenndsarr[n].inOrderTransversal;
        ndfnd = false;
        for (let k = 0; k < myinordertrans.length; k++)
        {
            if (myinordertrans[k] === mygenndsarr[n])
            {
                ndfnd = true;
                break;
            }
            //else;//do nothing
        }

        if (ndfnd);
        else throw "the bin node must have been found on the transversal, but it was not!";
    }
}

function displayTransversals(mybinnd)
{
    clearAndHideAllTransversals();

    if (mybinnd == undefined || mybinnd == null)
    {
        //console.log("calling clear transversals binary tree node was null!");
        return;
    }
    //else;//do nothing

    //console.log("mybinnd.id = " + mybinnd.id);
    //console.log("mybinnd.data = " + mybinnd.data);
    
    let mypreordertrans = mybinnd.preOrderTransversal;
    console.log("number of items in pre-order transversal = " + mypreordertrans.length);
    
    let fndmybinnd = false;
    for (let n = 0; n < mypreordertrans.length; n++)
    {
        if (mypreordertrans[n] === mybinnd)
        {
            fndmybinnd = true;
            break;
        }
        //else;//do nothing
    }
    //console.log("fndmybinnd = " + fndmybinnd);

    if (fndmybinnd);
    else throw "the bin node must have been found on the transversal, but it was not!";

    
    let myrtnds = document.getElementsByClassName("rtnd");
    for (let n = 0; n < myrtnds.length; n++)
    {
        myrtnds[n].style.display = "inline";
    }
    
    //document.getElementById("prorder").getElementsByClassName("rtnd")[0].textContent = "" +
    //    mypreordertrans[0].data;
    generateTransversalDOMNodesFor(mypreordertrans[0], 1,
        document.getElementById("prorder").getElementsByClassName("rtnd")[0],
        (mypreordertrans.length > 1), true);//islastnd, isrtnd
    let mypreordertransnortarr = includeAllExceptRoot(mypreordertrans);
    let mydatonlypreorderarr = getMyDataOnlyList(mypreordertransnortarr);
    for (let n = 0; n < mydatonlypreorderarr.length; n++)
    {
        generateTransversalDOMNodesFor(mypreordertransnortarr[n], mypreordertrans.length,
            document.getElementById("prorder"));//islastnd, isrtnd
    }
    //document.getElementById("prorder").getElementsByClassName("normalnds")[0].textContent = "" +
    //    ((mypreordertrans.length > 1) ? ", " : "") + 
    //    getTransversalDataStringFromArray(mydatonlypreorderarr);
    
    let myinordertrans = mybinnd.inOrderTransversal;
    let myrtindxintransarr = getRootIndexInTransversal(myinordertrans);
    console.log("number of items in in-order transversal = " + myinordertrans.length);
    console.log("myrtindxintransarr = " + myrtindxintransarr);
    //NOTE: when there is only the root, the arrays before root and after root will both be null!
    let myinordertransafterrt = getAllAfterRoot(myinordertrans);
    let myinordertransbeforert = getAllBeforeRoot(myinordertrans);
    if (myinordertransbeforert == null)
    {
        console.log("number of items in in-order transversal before root = null"); 
    }
    else
    {
        console.log("number of items in in-order transversal before root = " +
            myinordertransbeforert.length);
    }
    if (myinordertransafterrt == null)
    {
        console.log("number of items in in-order transversal after root = null");
    }
    else
    {
        console.log("number of items in in-order transversal after root = " +
            myinordertransafterrt.length);
    }
    
    if (myinordertransbeforert == null || myinordertransbeforert.length < 1);
    else document.getElementById("innrmalndsparta").style.display = "inline";
    if (myinordertransafterrt == null || myinordertransafterrt.length < 1);
    else document.getElementById("innrmalndspartb").style.display = "inline";
    
    //document.getElementById("innrmalndsparta").textContent = "" +
    //    getTransversalDataStringFromArray(getMyDataOnlyList(myinordertransbeforert)) +
    //    ((myinordertransbeforert != null && myinordertransbeforert.length > 0) ? ", " : "");
    if (myinordertransbeforert == null || myinordertransbeforert.length < 1);
    else
    {
        for (let n = 0; n < myinordertransbeforert.length; n++)
        {
            let myuselenvar;
            if (n == 0) myuselenvar = 1;
            else myuselenvar = myinordertransbeforert.length;
            //console.log("n = " + n);
            //console.log("myuselenvar = " + myuselenvar);
            generateTransversalDOMNodesFor(myinordertransbeforert[n], myuselenvar,
                document.getElementById("innrmalndsparta"), (n + 1 == myinordertransbeforert.length));
            //islastnd, isrtnd
        }
    }
    //document.getElementById("pinorder").getElementsByClassName("rtnd")[0].textContent = "" +
    //    myinordertrans[myrtindxintransarr].data;
    generateTransversalDOMNodesFor(myinordertrans[myrtindxintransarr], 1,
        document.getElementById("pinorder").getElementsByClassName("rtnd")[0],
            (myinordertrans.length > 1), true);//islastnd, isrtnd
    //document.getElementById("innrmalndspartb").textContent = "" +
    //    ((myinordertransafterrt != null && myinordertransafterrt.length > 0) ? ", " : "") +
    //    getTransversalDataStringFromArray(getMyDataOnlyList(myinordertransafterrt));
    if (myinordertransafterrt == null || myinordertransafterrt.length < 1);
    else
    {
        for (let n = 0; n < myinordertransafterrt.length; n++)
        {
            generateTransversalDOMNodesFor(myinordertransafterrt[n], myinordertransafterrt.length,
                document.getElementById("innrmalndspartb"));//islastnd, isrtnd
        }
    }
    
    let mypostordertrans = mybinnd.postOrderTransversal;
    console.log("number of items in post-order transversal = " + mypostordertrans.length);
    
    if (mypostordertrans.length > 1)
    {
        document.getElementById("psorder").getElementsByClassName("normalnds")[0].style.display = "inline";
    }
    //else;//do nothing

    //document.getElementById("psorder").getElementsByClassName("rtnd")[0].textContent = "" +
    //    mypostordertrans[mypostordertrans.length - 1].data;
    generateTransversalDOMNodesFor(mypostordertrans[mypostordertrans.length - 1], 1,
        document.getElementById("psorder").getElementsByClassName("rtnd")[0],
        (mypostordertrans.length > 1), true);//islastnd, isrtnd
    //document.getElementById("psorder").getElementsByClassName("normalnds")[0].textContent = 
    //    getTransversalDataStringFromArray(getMyDataOnlyList(includeAllExceptRoot(mypostordertrans))) +
    //        ((mypostordertrans.length > 1) ? ", " : "");
    for (let n = 0; n < mypostordertrans.length - 1; n++)
    {
        let myuselenvar;
        if (n == 0) myuselenvar = 1;
        else myuselenvar = mypostordertrans.length - 1;
        let myislastnd = (n + 1 === myuselenvar);
        generateTransversalDOMNodesFor(mypostordertrans[n], myuselenvar,
            document.getElementById("psnrmalnds"), myislastnd, false);//islastnd, isrtnd
    }
}

function displayTreeStatsAndUpdateThem(mybinnd)
{
    displayTransversals(mybinnd);

    if (mybinnd == undefined || mybinnd == null)
    {
        document.getElementById("numnodes").textContent = "0";
        document.getElementById("numlevels").textContent = "0";
        document.getElementById("typeoftree").textContent = "";
    }
    else
    {
        //console.log("mybinnd.id = " + mybinnd.id);
        //console.log("mybinnd.data = " + mybinnd.data);
        document.getElementById("numnodes").textContent = "" + mybinnd.numNodesOnTree;
        document.getElementById("numlevels").textContent = "" + mybinnd.numLevelsOnTree;
        document.getElementById("typeoftree").textContent = "" +
            (mybinnd.isBinarySearchTree ? "Binary Search" : "Binary");
    }
}

function getAndGenerateServerObject(binnd=null, usepost=true)
{
    if (usepost == undefined || usepost == null)
    {
        throw "usepost must be a defined boolean variable!";
    }
    else
    {
        if (usepost == true || usepost == false);
        else throw "usepost must be a defined boolean variable!";
    }

    if (binnd == undefined || binnd == null) return null;
    else
    {
        let initptndid = null;
        if (binnd.ptnd == null);
        else initptndid = binnd.ptnd.id;
        let initrkdndid = null;
        if (binnd.rightkd == null);
        else initrkdndid = binnd.rightkd.id;
        let initlkdndid = null;
        if (binnd.leftkd == null);
        else initlkdndid = binnd.leftkd.id;
        //console.log("initptndid = " + initptndid);
        //console.log("initlkdndid = " + initlkdndid);
        //console.log("initrkdndid = " + initrkdndid);

        if (usepost)
        {
            return {
                "ptnd" : initptndid,
                "leftkd" : initlkdndid,
                "rightkd" : initrkdndid,
                "data" : binnd.data,
                "isbinsrchtree" : binnd.isBinarySearchTree
            };
        }
        else
        {
            return {
                "ptnd" : initptndid,
                "leftkd" : initlkdndid,
                "rightkd" : initrkdndid,
                "data" : binnd.data,
                "id" : binnd.id,
                "isbinsrchtree" : binnd.isBinarySearchTree
            };
        }
    }
}

function testDeletingNodes(mytransarr, arrnm="mytransarr")
{
    if (mytransarr == undefined || mytransarr == null || mytransarr.length < 1);
    else
    {
        if (arrnm == undefined || arrnm == null || arrnm.length < 1)
        {
            throw "arrname must be defined!";
        }
        //else;//do nothing

        for (let n = 0; n < mytransarr.length; n++)
        {
            let mybgtstnd = null;
            if (mytransarr[n] == null)
            {
                for (let k = 0; k < mytransarr.length; k++)
                {
                    if (mytransarr[k] == null);
                    else
                    {
                        mybgtstnd = mytransarr[k];
                        break;
                    }
                }
            }
            else mybgtstnd = mytransarr[n];
            let oldnumnodesontree = 0;
            if (mybgtstnd == null);
            else oldnumnodesontree = mybgtstnd.numNodesOnTree;
            console.log("");
            console.log("oldnumnodesontree = " + oldnumnodesontree);
            mytransarr[n].remove();
            mytransarr[n] = null;
            //doTransversalsHaveAllGenNodes();

            //for (let p = 0; p < mytransarr.length; p++)
            //{
                //if (mytransarr[p] == null)
                //{
                    //console.log("NEW mytransarr[" + p + "] = null");
                //}
                //else
                //{
                    //console.log("NEW " + arrnm + "[" + p + "].id = " + mytransarr[p].id);
                    //console.log("NEW " + arrnm + "[" + p + "].data = " + mytransarr[p].data);
                    //console.log("NEW " + arrnm + "[" + p + "].leftkd = " + mytransarr[p].leftkd);
                    //if (mytransarr[p].leftkd == null);
                    //else
                    //{
                        //console.log("NEW " + arrnm + "[" + p + "].leftkd.id = " +
                        //    mytransarr[p].leftkd.id);
                        //console.log("NEW " + arrnm + "[" + p + "].leftkd.data = " +
                        //    mytransarr[p].leftkd.data);
                    //}
                    //console.log("NEW " + arrnm + "[" + p + "].rightkd = " + mytransarr[p].rightkd);
                    //if (mytransarr[p].rightkd == null);
                    //else
                    //{
                        //console.log("NEW " + arrnm + "[" + p + "].rightkd.id = " +
                        //    mytransarr[p].rightkd.id);
                        //console.log("NEW " + arrnm + "[" + p + "].rightkd.data = " +
                        //    mytransarr[p].rightkd.data);
                    //}
                    //console.log("NEW " + arrnm + "[" + p + "].ptnd = " + mytransarr[p].ptnd);
                    //if (mytransarr[p].ptnd == null);
                    //else
                    //{
                        //console.log("NEW " + arrnm + "[" + p + "].ptnd.id = " + mytransarr[p].ptnd.id);
                        //console.log("NEW " + arrnm + "[" + p + "].ptnd.data = " +
                        //    mytransarr[p].ptnd.data);
                    //}
                //}
            //}//end of p for loop
            
            let myotstnd = null;
            for (let k = 0; k < mytransarr.length; k++)
            {
                if (mytransarr[k] == null);
                else
                {
                    myotstnd = mytransarr[k];
                    break;
                }
            }
            let nwnumnodesbintree = 0;
            if (myotstnd == null);
            else nwnumnodesbintree = myotstnd.numNodesOnTree;
            console.log("oldnumnodesontree = " + oldnumnodesontree);
            console.log("nwnumnodesbintree = " + nwnumnodesbintree);
            debugger;
            if (nwnumnodesbintree + 1 == oldnumnodesontree);
            else throw "TEST FAILED TO REMOVE THE NODES!";
            console.log("removing the next node now!");
            console.log("");
        }//end of n for loop
    }
    console.log("TEST PAST!");
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
    let myndsbyid = new Array();
    let myrt = new Bintreend(1, "f", null, null, null);//parent, left, right
    let myndd = new Bintreend(2, "d", myrt, null, null);//parent, left, right
    let myndk = new Bintreend(3, "k", myrt, null, null);//parent, left, right
    myrt.leftkd = myndd;
    myrt.rightkd = myndk;
    //myndsbyid.push(myrt);
    //myndsbyid.push(myndd);
    //myndsbyid.push(myndk);
    //console.log("myrt.data = " + myrt.data);
    //console.log("myrt.leftkd.data = myndd.data = " + myrt.leftkd.data);
    //console.log("myrt.rightkd.data = myndk.data = " + myrt.rightkd.data);
    let myndb = new Bintreend(4, "b", myndd, null, null);//parent, left, right
    let mynde = new Bintreend(5, "e", myndd, null, null);//parent, left, right
    myndd.leftkd = myndb;
    myndd.rightkd = mynde;
    //myndsbyid.push(myndb);
    //myndsbyid.push(mynde);
    //console.log("myndd.leftkd.data = myndb.data = " + myndd.leftkd.data);
    //console.log("myndd.rightkd.data = mynde.data = " + myndd.rightkd.data);
    //console.log("myrt.leftkd.leftkd.data = myndb.data = " + myrt.leftkd.leftkd.data);
    //console.log("myrt.leftkd.rightkd.data = mynde.data = " + myrt.leftkd.rightkd.data);
    let myndh = new Bintreend(6, "hello, me", myndk, null, null);//parent, left, right
    let myndm = new Bintreend(7, "m", myndk, null, null);//parent, left, right
    myndk.leftkd = myndh;
    myndk.rightkd = myndm;
    //myndsbyid.push(myndh);
    //myndsbyid.push(myndm);
    let mynda = new Bintreend(8, "a", myndb, null, null);//parent, left, right
    let myndc = new Bintreend(9, "c", myndb, null, null);//parent, left, right
    myndb.leftkd = mynda;
    myndb.rightkd = myndc;
    //myndsbyid.push(mynda);
    //myndsbyid.push(myndc);
    let myndg = new Bintreend(10, "g", myndh, null, null);//parent, left, right
    let myndi = new Bintreend(11, "i", myndh, null, null);//parent, left, right
    myndh.leftkd = myndg;
    myndh.rightkd = myndi;
    //myndsbyid.push(myndg);
    //myndsbyid.push(myndi);
    let myndl = new Bintreend(12, "l", myndm, null, null);//parent, left, right
    let myndn = new Bintreend(13, "n", myndm, null, null);//parent, left, right
    myndm.leftkd = myndl;
    myndm.rightkd = myndn;
    //myndsbyid.push(myndl);
    //myndsbyid.push(myndn);
    
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
    for (let n = 0; n < mypreordertree.length; n++)
    {
        let cndlv = mypreordertree[n].level;
        //console.log("mypreordertree[" + n + "].level = cndlv = " + cndlv);
        //console.log("mypreordertree[" + n + "].data = " + mypreordertree[n].data);
        //console.log("mypreordertree[" + n + "].isRootNode() = " + mypreordertree[n].isRootNode());
        if (mypreordertree[n].isRootNode())
        {
            if (cndlv == 0);
            else throw "the root's level must be 0!";
        }
        else
        {
            //console.log("mypreordertree[" + n + "].root.data = " + mypreordertree[n].root.data);
            //console.log("mypreordertree[" + n + "].root.id = " + mypreordertree[n].root.id);
            //console.log("mypreordertree[" + n + "].root.isParentOf(mypreordertree[" + n + "]) = " +
            //    mypreordertree[n].root.isParentOf(mypreordertree[n]));
            //console.log("mypreordertree[" + n + "].root.isParentOf(mypreordertree[" + n + "], " +
            //    "mypreordertree[" + n + "].root) = " +
            //    mypreordertree[n].root.isParentOf(mypreordertree[n], mypreordertree[n].root));
            //console.log("mypreordertree[" + n + "].isKidOfParent(mypreordertree[" + n +
            //    "], mypreordertree[" + n + "].root) = " +
            //    mypreordertree[n].isKidOfParent(mypreordertree[n], mypreordertree[n].root));
            if (mypreordertree[n].root.isParentOf(mypreordertree[n]))
            {
                if (cndlv == 1);
                else throw "the root's kids' level must be 1!";
            }
            else
            {
                if (cndlv > 1);
                else throw "the root's kids' kids level must be at least 2!";
            }
        }
    }
    if (myrt.level == 0);
    else throw "the root's level must be 0!";
    if (myndd.level == 1 && myndk.level == 1);
    else throw "the root's kids' level must be 1!";
    if (myndb.level == 2 && mynde.level == 2 && myndh.level == 2 && myndm.level == 2);
    else throw "all of these nodes are on level 2!";
    if (mynda.level == 3 && myndc.level == 3 && myndg.level == 3 && myndi.level == 3 &&
        myndl.level == 3 && myndn.level == 3)
    {
        //do nothing valid
    }
    else throw "all of these nodes are on level 3!";
    console.log("TEST PAST!");

    //build the binary tree here
    //
    //      10
    //    6     17
    //  5  8  15  20
    //3  7

    let myrtten = new Bintreend(14, "10", null, null, null);//parent, left, right
    let myndsx = new Bintreend(15, "6", myrtten, null, null);//parent, left, right
    let myndsvteen = new Bintreend(16, "17", myrtten, null, null);//parent, left, right
    myrtten.leftkd = myndsx;
    myrtten.rightkd = myndsvteen;
    myndsbyid.push(myrtten);
    myndsbyid.push(myndsx);
    myndsbyid.push(myndsvteen);
    let myndtwenty = new Bintreend(17, "20", myndsvteen, null, null);//parent, left, right
    let myndfvteen = new Bintreend(18, "15", myndsvteen, null, null);//parent, left, right
    myndsvteen.leftkd = myndfvteen;
    myndsvteen.rightkd = myndtwenty;
    myndsbyid.push(myndtwenty);
    myndsbyid.push(myndfvteen);
    let myndet = new Bintreend(19, "8", myndsx, null, null);//parent, left, right
    let myndfv = new Bintreend(20, "5", myndsx, null, null);//parent, left, right
    myndsx.leftkd = myndfv;
    myndsx.rightkd = myndet;
    myndsbyid.push(myndet);
    myndsbyid.push(myndfv);
    let myndsvn = new Bintreend(21, "7", myndfv, null, null);//parent, left, right
    let myndthree = new Bintreend(22, "3", myndfv, null, null);//parent, left, right
    myndfv.leftkd = myndthree;
    myndfv.rightkd = myndsvn;
    myndsbyid.push(myndsvn);
    myndsbyid.push(myndthree);
    
    console.log("myrtten.isRootNode() = " + myrtten.isRootNode());
    if (myrtten.isRootNode() == true);
    else throw "my root node ten must be the root for this test tree!";
    let numnodesbintree = myrtten.numNodesOnTree;
    console.log("numnodesbintree = " + numnodesbintree);
    if (numnodesbintree == 9);
    else throw "illegal number of nodes found on the tree!";
    
    let myinorderbintree = myrtten.inOrderTransversal;
    printDataAndIDAndErrorCheckTransversal(myinorderbintree, "inorder", "myinorderbintree", 9);
    let mypreorderbintree = myrtten.preOrderTransversal;
    printDataAndIDAndErrorCheckTransversal(mypreorderbintree, "preorder", "mypreorderbintree", 9);
    let mypostorderbintree = myrtten.postOrderTransversal;
    printDataAndIDAndErrorCheckTransversal(mypostorderbintree, "postorder", "mypostorderbintree", 9);
    if (myrtten.isBinarySearchTree) throw "this must be a binary tree not a binary search tree!";
    //else;//do nothing
    
    displayTreeStatsAndUpdateThem(myrtten);

    //now test deleting nodes here
    //testDeletingNodes(myinorderbintree, "myinorderbintree");
    testDeletingNodes(mypreorderbintree, "mypreorderbintree");
    //testDeletingNodes(mypostorderbintree, "mypostorderbintree");

    //myrtten = null;
    //console.log("NEW myrtten = " + myrtten);
    //debugger;
    displayTreeStatsAndUpdateThem(myrtten);

    //post them all to the server
    let addthem = false;
    for (let n = 0; n < myndsbyid.length; n++)
    {
        console.log("myndsbyid[" + n + "].id = " + myndsbyid[n].id);
        console.log("myndsbyid[" + n + "].data = " + myndsbyid[n].data);
        if (addthem)
        {
            console.log("posting it now:");
            let configobj = {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                    "Accept" : "application/json"
                },
                body: JSON.stringify(getAndGenerateServerObject(myndsbyid[n], true))
            };
            fetch("http://localhost:3000/nodes", configobj).then((response) => response.json()).
            then(function(response){
                //console.log("response = " + response);
                //debugger;
                //console.log("response.id = " + response.id);
                //console.log("response.data = " + response.data);
                //console.log("myndsbyid[" + n + "].id = " + myndsbyid[n].id);
                //console.log("myndsbyid[" + n + "].data = " + myndsbyid[n].data);
                //debugger;
            })
            .catch(function(err){
                console.error("there was a problem posting the data on the server!");
                console.error(err);
                //alert("Error: failed to add the data on the server. See log for details!");
            });
            setTimeout(1000, function(){ console.log("moving on now!"); });
        }
        //else;//do nothing
    }//end of n for loop
}
//makeBinarySearchTreeNodesToSave();

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

function getArrayIndexForNodeOnArray(mybinnd)
{
    if (mybinnd == undefined || mybinnd == null)
    {
        console.error("the bin node was null, so not on the array!");
        return -1;
    }
    else
    {
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
                    if (mygenndsarr[n] == mybinnd) return n;
                    //else;//do nothing
                }
            }//end of n for loop
        }
        console.error("the bin node was not on the array!");
        return -1;
    }
}

function getFirstNonNullBinTreeNodeFromArray()
{
    let mybinnd = null;
    if (mygenndsarr == undefined || mygenndsarr == null || mygenndsarr.length < 1);
    else
    {
        for (let n = 0; n < mygenndsarr.length; n++)
        {
            //console.log("mygenndsarr[" + n + "] = " + mygenndsarr[n]);
            //debugger;
            if (mygenndsarr[n] == null) throw "not allowed to have null nodes on this list!";
            else
            {
                //console.log("mygenndsarr[" + n + "] = " + mygenndsarr[n]);
                //console.log("mygenndsarr[" + n + "].id = " + mygenndsarr[n].id);
                mybinnd = mygenndsarr[n];
                break;
            }
        }
    }
    return mybinnd;
}

function addLeftOrRightKidBtnListener(mybtn, mybinnd, useleft)
{
    if (mybtn == undefined || mybtn == null)
    {
        throw "the button must not be null or undefined!";
    }
    //else;//do nothing

    if (mybinnd == undefined ||mybinnd == null)
    {
        throw "the binary tree node must not be null or undefined!";
    }
    //else;//do nothing

    if (useleft == undefined || useleft == null)
    {
        throw "useleft must be a defined boolean variable!";
    }
    else
    {
        if (useleft == true || useleft == false);
        else throw "useleft must be a defined boolean variable!";
    }

    mybtn.addEventListener("click", function(event){
        console.log("clicked the " + (useleft ? "left" : "right") + " button!");
        //console.log("event = " + event);
        //console.log("event.target = " + event.target);
        //console.log("mybinnd = " + mybinnd);
        //debugger;
        buildUserBinaryTree(mybtn.parentNode, mybinnd, useleft, !useleft);
        mybtn.disabled = true;
        mybtn.style.display = "none";
        //mybtn.remove();//must only hide and disable because we need it later
        //debugger;
    });
    console.log("successfully added the add " + (useleft ? "left" : "right") + " kid listener!");
    //debugger;
}
function addRightKidBtnListener(mybtn, mybinnd)
{
    addLeftOrRightKidBtnListener(mybtn, mybinnd, false);
}
function addLeftKidBtnListener(mybtn, mybinnd)
{
    addLeftOrRightKidBtnListener(mybtn, mybinnd, true);
}

function getNumKidsDOMNodeHas(tabledomnd)
{
    //the id if we are removing dom node only implies that the dom node has no kids
    //if that is not the case, then it may have kids or not
    //
    //each node contains a table that has two rows
    //the second row has the add left delete table and add right buttons
    //inside the second row are three columns
    //on the first and 3rd columns: is a span which contains either a table or a button
    //the second column is a table also with three rows which centers the delete button
    //<table>
    // <tr>
    //  <td></td>
    //  <td><div>text area and svg</div></td>
    //  <td></td>
    // <tr>
    //  <td> <span> button and table or just button </span></td>
    //  <td> table for delete button </td>
    //  <td> <span> button and table or just button </span></td>
    //</table>

    if (tabledomnd == undefined || tabledomnd == null) return 0;
    else
    {
        let myrwsontable = tabledomnd.children;
        let mykidsrw = myrwsontable[1];
        let numkids = 0;
        for (let n = 0; n < 2; n++)
        {
            let mycolindx = -1;
            if (n == 0) mycolindx = 0;
            else mycolindx = 2;
            let myspan = mykidsrw.children[mycolindx].firstChild;
            let myspankids = myspan.children;
            //for (let k = 0; k < myspankids.length; k++)
            //{
            //    console.log("myspankids[" + k + "].tagName = " + myspankids[k].tagName);
            //}
            if (myspankids.length < 2);
            else if (myspankids.length == 2)
            {
                let mybtnortableelem = myspankids[1];
                if (mybtnortableelem.tagName === "TABLE") numkids++;
                //else;//do nothing
            }
            else throw "illegal number of kids of the span found!";
        }
        return numkids;
    }
}

function getLeftOrRightKidDOMNodeHas(tabledomnd, useleft, usespan=false, usetable=true)
{
    if (useleft == undefined || useleft == null)
    {
        throw "useleft must be a defined boolean variable!";
    }
    else
    {
        if (useleft == true || useleft == false);
        else throw "useleft must be a defined boolean variable!";
    }

    if (usetable == undefined || usetable == null)
    {
        throw "usetable must be a defined boolean variable!";
    }
    else
    {
        if (usetable == true || usetable == false);
        else throw "usetable must be a defined boolean variable!";
    }

    if (usespan == undefined || usespan == null)
    {
        throw "usespan must be a defined boolean variable!";
    }
    else
    {
        if (usespan == true || usespan == false);
        else throw "usespan must be a defined boolean variable!";
    }

    if (tabledomnd == undefined || tabledomnd == null) return null;
    //else;//do nothing

    let mytindx = -1;
    if (usetable) mytindx = 1;
    else mytindx = 0;
    let mykdindx = -1;
    if (useleft) mykdindx = 0;
    else mykdindx = 2;
    
    //table.tr.td.span.(table or button)
    let myspan = tabledomnd.children[1].children[mykdindx].firstChild;
    if (usespan) return myspan;
    else return myspan.children[mytindx];
}
function getLeftKidSpanDOMNodeHas(tabledomnd)
{
    return getLeftOrRightKidDOMNodeHas(tabledomnd, true, true, false);
}
function getRightKidSpanDOMNodeHas(tabledomnd)
{
    return getLeftOrRightKidDOMNodeHas(tabledomnd, false, true, false);
}
function getLeftKidDOMNodeHas(tabledomnd, usetable=true)
{
    return getLeftOrRightKidDOMNodeHas(tabledomnd, true, false, usetable);
}
function getRightKidDOMNodeHas(tabledomnd, usetable=true)
{
    return getLeftOrRightKidDOMNodeHas(tabledomnd, false, false, usetable);
}

function getParentDOMNodeHas(tabledomnd)
{
    if (tabledomnd == undefined || tabledomnd == null) return null;
    else
    {
        //console.log("tabledomnd.parentNode = " + tabledomnd.parentNode);
        //console.log("tabledomnd.parentNode.id = " + tabledomnd.parentNode.id);
        if (tabledomnd.parentNode.id === "tree") return null;
        else return tabledomnd.parentNode.parentNode.parentNode.parentNode;
        //table.span.td.tr.table
        //table.section.main.body.html (WHAT WE HAVE IF WE DON'T CHECK FOR IT ON ROOT NODE)
    }
}

function getFarthestLeftHTMLDOMNodeOfDOMNode(tabledomnd)
{
    if (tabledomnd == undefined || tabledomnd == null) return null;
    else
    {
        let mylkd = getLeftKidDOMNodeHas(tabledomnd);
        if (mylkd == null)
        {
            let myrkd = getRightKidDOMNodeHas(tabledomnd);
            if (myrkd == null) return tabledomnd;
            else return getFarthestLeftHTMLDOMNodeOfDOMNode(myrkd);
        }
        else return getFarthestLeftHTMLDOMNodeOfDOMNode(mylkd);
    }
}

function trimTreeToMemory(mysnd=null)
{
    let treendkds = document.getElementById("tree").children;
    if (treendkds == undefined || treendkds == null || treendkds.length < 2) return;
    //else;//do nothing

    if (treendkds.length == 2);//do nothing proceed below
    else throw "illegal number of dom kids of the tree section found here!";

    //eliminate all dom nodes that do not have a bintreenode associated with it
    if (mysnd == null) return trimTreeToMemory(treendkds[1]);
    //else;//do nothing

    let mydiv = mysnd.children[0].children[1].firstChild;
    //console.log("mydiv = " + mydiv);
    //console.log("mydiv.id = " + mydiv.id);
    let mydividstr = "" + mydiv.id;
    let btnsdisable = (mydividstr.indexOf("nwnd") == 0);
    //console.log("btnsdisable = " + btnsdisable);

    if (btnsdisable)
    {
        removeAllDOMKidsOfDOMNode(mysnd, true);
    }
    else
    {
        let myleftkd = getLeftKidDOMNodeHas(mysnd);
        if (myleftkd == null);
        else trimTreeToMemory(myleftkd);
        let myrightkd = getRightKidDOMNodeHas(mysnd);
        if (myrightkd == null);
        else trimTreeToMemory(myrightkd);
    }
}

function removeDOMNode(mytabledomnode, isfirst=true)
{
    if (isfirst == undefined || isfirst == null)
    {
        throw "isfirst must be a defined boolean variable!";
    }
    else
    {
        if (isfirst == true || isfirst == false);
        else throw "isfirst must be a defined boolean variable!";
    }

    let numkidsofdomnd = getNumKidsDOMNodeHas(mytabledomnode);
    //console.log("numkidsofdomnd = " + numkidsofdomnd);

    if (numkidsofdomnd == 0)
    {
        removeAllDOMKidsOfDOMNode(mytabledomnode, true);
    }
    else if (numkidsofdomnd > 0 && numkidsofdomnd < 3)
    {
        //   4
        // 2   6
        //0 3 5 8
        //
        //the id if we are removing dom node only implies that the dom node has no kids
        //if that is not the case, then it may have kids or not
        //
        //each node contains a table that has two rows
        //the second row has the add left delete table and add right buttons
        //inside the second row are three columns
        //on the first and 3rd columns: is a span which contains either a table or a button
        //the second column is a table also with three rows which centers the delete button
        //
        //<table>
        // <tr>
        //  <td></td>
        //  <td><div>text area and svg</div></td>
        //  <td></td>
        // <tr>
        //  <td> <span> button and table or just button </span></td>
        //  <td> table for delete button
        //  <td> <span> button and table or just button </span></td>
        //</table>

        //we can access the parent node using .parentNode
        //we can access the children nodes using .children
        //we can get the first child node using .firstChild
        //we can get the last child node using .lastChild
        //
        //
        //to get the parent dom node: getParentDOMNodeHas(tabledomnd)
        //tabledomnode.parentNode.parentNode.parentNode.parentNode
        //table.span.td.tr.table
        //
        //to get the kids of the current dom node:
        //to get the right kid: getRightKidDOMNodeHas(tabledomnd, usetable=true)
        //tabledomnode.children[1].children[2].firstChild.children[1] for the table (kid itself)
        //tabledomnode.children[1].children[2].firstChild.children[0] for the button
        //
        //to get the left kid: getLeftKidDOMNodeHas(tabledomnd, usetable=true)
        //tabledomnode.children[1].children[0].firstChild.children[1] for the table (kid itself)
        //tabledomnode.children[1].children[0].firstChild.children[0] for the button
        //
        //to get the farthest left kid of the DOM Node: getFarthestLeftHTMLDOMNodeOfDOMNode(tabledomnd)
        
        console.log("this has at one or two kids!");
        
        let noleftkd = (getLeftKidDOMNodeHas(mytabledomnode) == null);
        let norightkd = (getRightKidDOMNodeHas(mytabledomnode) == null);
        
        console.log("noleftkd = " + noleftkd);
        console.log("norightkd = " + norightkd);

        let nwrtdomnd = null;
        let hasbothkids = false;
        if (noleftkd || norightkd)
        {
            //has one kid
            console.log("this has one kid!");
            if (norightkd) nwrtdomnd = getLeftKidDOMNodeHas(mytabledomnode);
            else nwrtdomnd = getRightKidDOMNodeHas(mytabledomnode);
        }
        else
        {
            //has both kids
            console.log("this has both kids!");
            hasbothkids = true;
            nwrtdomnd = getFarthestLeftHTMLDOMNodeOfDOMNode(getRightKidDOMNodeHas(mytabledomnode));
        }
        console.log("hasbothkids = " + hasbothkids);
        //console.log("nwrtdomnd = " + nwrtdomnd);
        //console.log(nwrtdomnd);
        //debugger;

        let islkdofptnd = false;
        let isrkdofptnd = false;
        let mynwptndref = getParentDOMNodeHas(mytabledomnode);
        //console.log("mynwptndref = " + mynwptndref);

        if (mynwptndref == null);
        else
        {
            if (getLeftKidDOMNodeHas(mynwptndref) == mytabledomnode)
            {
                islkdofptnd = true;
                //console.log("this is the left kid of its parent node!");
            }
            else
            {
                if (getRightKidDOMNodeHas(mynwptndref) == mytabledomnode)
                {
                    isrkdofptnd = true;
                    //console.log("this is the left kid of its parent node!");
                }
                else throw "this must be a kid of the parent node, but it was not!";
            }
        }
        console.log("islkdofptnd = " + islkdofptnd);
        console.log("isrkdofptnd = " + isrkdofptnd);

        //   4 <- remove this, replace with 5
        // 2   6
        //0 3 5 8
        //
        //   4
        // 2   6 <- remove this, replace with 8
        //0 3   8
        //
        //so on the right tree find the farthest left node that has no kids
        //this will then be the new root
        //then we just hook up the kids
        //we also set the left and right kids new parent node
        //then we are free to set that parent node to null after we nullify all of the properties

        if (numkidsofdomnd == 1)
        {
            //   4
            // 2   6 <- remove this
            //0 3   8
            //
            //suppose we have the tree above: we want to remove 6 what do we need to do to accomplish that?
            //
            //we want the parent of [the node we are removing] to now have the kid of
            //[the node we are removing] as its kid
            //

            console.log("THIS HAS ONE KID! IT IS EITHER THE LEFT OR THE RIGHT KID!");
            
            //get the parent node reference: mynwptndref
            //the node we want is: nwrtdomnd
            //nwrtdomnd.ptnd = mynwptndref;
            //console.log("mynwptndref = " + mynwptndref);
            //console.log("nwrtdomnd = " + nwrtdomnd);
            //console.log("mytabledomnode = " + mytabledomnode);
            //debugger;

            if (islkdofptnd || isrkdofptnd)
            {
                if (islkdofptnd)
                {
                    //mynwptndref.leftkd = nwrtdomnd;
                    getLeftKidSpanDOMNodeHas(mynwptndref).appendChild(nwrtdomnd);
                    //console.log("NEW this.ptnd.leftkd = " + this.ptnd.leftkd);
                    //console.log("NEW this.ptnd.leftkd.id = " + this.ptnd.leftkd.id);
                    //console.log("NEW this.ptnd.leftkd.data = " + this.ptnd.leftkd.data);
                }
                else //if (isrkdofptnd)
                {
                    //mynwptndref.rightkd = nwrtdomnd;
                    getRightKidSpanDOMNodeHas(mynwptndref).appendChild(nwrtdomnd);
                    //console.log("NEW this.ptnd.rightkd = " + this.ptnd.rightkd);
                    //console.log("NEW this.ptnd.rightkd.id = " + this.ptnd.rightkd.id);
                    //console.log("NEW this.ptnd.rightkd.data = " + this.ptnd.rightkd.data);
                }
                //else throw "this must be a kid of the parent node, but it was not!";
            }
            else
            {
                console.log("parent node was null! We are removing the root node!");
                //it has a kid
                document.getElementById("tree").appendChild(nwrtdomnd);
            }
            //debugger;

            //now can remove it...
            removeAllDOMKidsOfDOMNode(mytabledomnode, true);
        }
        else //if (numkidsofdomnd == 2)
        {
            console.log("THIS HAS BOTH KIDS!");

            //we want to first get rid of any nodes that are not initialized
            //then check to see if we still have the same number of nodes
            //if we do not have the same number of nodes, then call again
            //otherwise proceed below
            
            trimTreeToMemory();
            console.log("trimmed the tree to memory!");

            if (isfirst)
            {
                removeDOMNode(mytabledomnode, false);
                return;
            }
            //else;//do nothing


            //first create new references to the nodes we want to keep
            let myleftkd = getLeftKidDOMNodeHas(mytabledomnode);
            let myrightkd = getRightKidDOMNodeHas(mytabledomnode);
            //console.log("myleftkd = " + myleftkd);
            //console.log("myrightkd = " + myrightkd);
            //console.log("mynwptndref = " + mynwptndref);
            //console.log("nwrtdomnd = " + nwrtdomnd);
            //my new root is nwrtdomnd
            //debugger;


            //what we are starting with:
            //   4
            // 2   6 <- remove this replace with 5
            //0 3 5 8
            //
            //first we node the nodes kids and parent
            //myleftkd = this.leftkd
            //myrightkd = this.rightkd
            //myparent = this.ptnd
            //then we get the farthest left kid of the right hand side
            //this will be the new root
            //

            //what we actually have:
            // 4 <- remove this replace with 8
            //2 8
            //
            //this.leftkd = 2
            //this.rightkd = 8
            //newrt = 8
            //newparentref = this.ptnd = null
            //
            //newrt.leftkd = this.leftkd
            //newrt.rightkd = this.rightkd
            //unless the left kid or the right kid is equal to the newrt
            //
            //if newparentref is not null: newparentref.(leftkd or rightkd?) = newrt
            //if newparentref is null: newrt is the new root, but still needs to be added to DOM


            //nwrtdomnd has no kids initially it may have a parent node though
            //myleftkd.ptnd = flkdrkthis;
            //myrightkd.ptnd = flkdrkthis;
            //flkdrkthis.leftkd = myleftkd;
            //flkdrkthis.rightkd = myrightkd;

            if (islkdofptnd || isrkdofptnd)
            {
                if (islkdofptnd)
                {
                    //mynwptndref.leftkd = nwrtdomnd;
                    getLeftKidSpanDOMNodeHas(mynwptndref).appendChild(nwrtdomnd);
                    //console.log("NEW this.ptnd.leftkd = " + this.ptnd.leftkd);
                    //console.log("NEW this.ptnd.leftkd.id = " + this.ptnd.leftkd.id);
                    //console.log("NEW this.ptnd.leftkd.data = " + this.ptnd.leftkd.data);
                }
                else //if (isrkdofptnd)
                {
                    //mynwptndref.rightkd = nwrtdomnd;
                    getRightKidSpanDOMNodeHas(mynwptndref).appendChild(nwrtdomnd);
                    //console.log("NEW this.ptnd.rightkd = " + this.ptnd.rightkd);
                    //console.log("NEW this.ptnd.rightkd.id = " + this.ptnd.rightkd.id);
                    //console.log("NEW this.ptnd.rightkd.data = " + this.ptnd.rightkd.data);
                }
                //else throw "this must be a kid of the parent node, but it was not!";
            }
            else
            {
                console.log("parent node was null! We are removing the root node!");
                //it has a kid
                document.getElementById("tree").appendChild(nwrtdomnd);
            }
            //debugger;

            if (nwrtdomnd === myleftkd);
            else getLeftKidSpanDOMNodeHas(nwrtdomnd).appendChild(myleftkd);
            if (nwrtdomnd === myrightkd);
            else getRightKidSpanDOMNodeHas(nwrtdomnd).appendChild(myrightkd);
            //debugger;

            //now can remove it...
            removeAllDOMKidsOfDOMNode(mytabledomnode, true);
        }
        console.log("node removed successfully!");
    }
    else throw "illegal number of kids of the dom node was found and used here!";
}

function makeSureAllButtonsAreDisplayedIfTheyAreSupposedTo(snddomnode=null, usert=true)
{
    //go through every node on the dom tree and make sure that the buttons are showing correctly
    //get the root node
    //the tree section contains an h2 and if there is at least one node a table as the other kid
    if (usert == undefined || usert == null)
    {
        throw "usert must be a defined boolean variable!";
    }
    else
    {
        if (usert == true || usert == false);
        else throw "usert must be a defined boolean variable!";
    }

    let mydomrootnd = null;
    if (usert && (snddomnode == undefined || snddomnode == null))
    {
        let mytreesectkds = document.getElementById("tree").children;
        if (mytreesectkds == undefined || mytreesectkds == null || mytreesectkds.length < 1);
        else
        {
            if (mytreesectkds.length > 1) mydomrootnd = mytreesectkds[1];
            //else;//do nothing
        }
    }
    else mydomrootnd = snddomnode;

    if (mydomrootnd == null) return;
    //else;//do nothing

    //take care of it for this node
    //get the span, then check the number of kids
    //then display the button
    for (let n = 0; n < 2; n++)
    {
        let myspan = null;
        if (n == 0) myspan = getLeftKidSpanDOMNodeHas(mydomrootnd);
        else if (n == 1) myspan = getRightKidSpanDOMNodeHas(mydomrootnd);
        else throw "illegal value for index n was found and used here!";

        //console.log("myspan.children.length = " + myspan.children.length);
        if (myspan.children.length == 2)
        {
            if (myspan.children[0].tagName === "BUTTON" && myspan.children[1].tagName === "TABLE")
            {
                //the span has a button as the first child and the table as the other
                //need to make sure that that button is not displayed
                //if it is displayed, hide it
                //if it is enabled, disable it
                let myhbtn = myspan.children[0];
                if (myhbtn.disabled);
                else myhbtn.disabled = true;
                if (myhbtn.style.display === "none");
                else myhbtn.style.display = "none";
                console.log("the button is now hidden and disabled!");
                //debugger;
            }
            else throw "this kid must be a table, but it was not!";
        }
        else if (myspan.children.length == 1)
        {
            let mydiv = mydomrootnd.children[0].children[1].firstChild;
            //console.log("mydiv = " + mydiv);
            //console.log("mydiv.id = " + mydiv.id);
            let mydividstr = "" + mydiv.id;
            let btnsdisable = (mydividstr.indexOf("nwnd") == 0);
            console.log("btnsdisable = " + btnsdisable);
            
            let myhbtn = myspan.firstChild;
            //console.log("myhbtn = " + myhbtn);
            //console.log("(myhbtn.tagName === 'BUTTON') = " + (myhbtn.tagName === "BUTTON"));
            if (myhbtn.tagName === "BUTTON")
            {
                if (btnsdisable)
                {
                    myhbtn.disabled = true;
                }
                else
                {
                    myhbtn.style.display = "block";
                    myhbtn.disabled = false;
                }
                console.log("displayed the button!");
            }
            else throw "this must be a button!";
            //debugger;
        }
        else
        {
            console.error("the dom node has an illegal number of kids!");
            console.error("mydomrootnd:");
            console.error(mydomrootnd);
            console.error("myspan:");
            console.error(myspan);
            throw "the dom node has an illegal number of kids!";
        }
    }//end of n for loop

    //visit the child nodes
    makeSureAllButtonsAreDisplayedIfTheyAreSupposedTo(getLeftKidDOMNodeHas(mydomrootnd), false);
    makeSureAllButtonsAreDisplayedIfTheyAreSupposedTo(getRightKidDOMNodeHas(mydomrootnd), false);
}

function removeDOMNodeAndShowButton(mypttable)
{
    if (mypttable == undefined || mypttable == null)
    {
        throw "mypttable must be defined and not null!";
    }
    //else;//do nothing

    removeDOMNode(mypttable, true);
    
    //re-enable and show hidden add kid button here
    makeSureAllButtonsAreDisplayedIfTheyAreSupposedTo(null, true);

    console.log("successfully deleted the node!");
}

function showLoadFormAfterNoNodes()
{
    let mytreesectkds = document.getElementById("tree").children;
    let hasatleastonendontree = false;
    if (mytreesectkds == undefined || mytreesectkds == null || mytreesectkds.length < 1);
    else
    {
        if (mytreesectkds.length > 1) hasatleastonendontree = true;
        //else;//do nothing
    }
    console.log("hasatleastonendontree = " + hasatleastonendontree);
    
    if (!hasatleastonendontree && (mygenndsarr == null || mygenndsarr.length < 1))
    {
        let myloadfrm = document.getElementById("myloadingform");
        myloadfrm.style.display = "block";
        console.log("no nodes on the tree, so displayed the loading form again!");
    }
    //else;//do nothing
}

function deleteAndUpdateDOMNodesOnly(mypttable)
{
    if (mypttable == undefined || mypttable == null)
    {
        throw "mypttable must be defined and not null!";
    }
    //else;//do nothing

    removeDOMNodeAndShowButton(mypttable);//, domnode
    
    //display the transversals here
    //update the type of tree here
    //update the number of nodes on the tree
    displayTreeStatsAndUpdateThem(getFirstNonNullBinTreeNodeFromArray());

    //show the form when all nodes are removed from the tree
    //so the page does not need to be reloaded in order to function
    showLoadFormAfterNoNodes();
    console.log("successfully updated the DOM ONLY after deleting a node!");
}

function clearAllNodesFromTheServer()
{
    fetch("http://localhost:3000/nodes").then((response) => response.json()).
    then(function(response){
        let myndsarr = response;
        if (response == undefined || response == null || response.length < 1)
        {
            console.log("the list was cleared successfully!");

            let clearsvrevent = new Event("serverNodesCleared");
            document.getElementById("tree").dispatchEvent(clearsvrevent);

            alert("server nodes cleared successfully!");
        }
        else
        {
            //let myidsarr = new Array();
            //for (let n = 0; n < myndsarr.length; n++) myidsarr.push(myndsarr[n].id);
            let myconfigobj = {
                method : "DELETE",
                headers: {
                    "Content-Type" : "application/json",
                    "Accept" : "application/json"
                },
                body: ""
            };
            // + myndsarr[n].id, myidsarr
            fetch("http://localhost:3000/nodes/" + myndsarr[0].id, myconfigobj).
            then((response) => response.json()).then(function(response){
                console.log("the item was deleted successfully!");
                clearAllNodesFromTheServer();
            }).catch(function(err){
                console.error("failed to delete the node on the server!");
                console.error(err);
                alert("failed to remove a node already on the server! See log for details!");
            });
        }
    }).catch(function(err){
        console.error("failed to get the nodes on the server for deletion!");
        console.error(err);
        alert("failed to clear the list of nodes already on the server! See log for details!");
    });
}

function finishLoadingDOMOptionsAfterServerCleared(event)
{
    if (loadbinsrchtree === true || loadbintree === true || loaduserbintree == true)
    {
        loadBinaryOrSearchTree(loadbinsrchtree, loaduserbintree);
    }
    else buildUserBinaryTree();
}

let numids = 0;
function buildUserBinaryTree(domnode=null, binptnd=null, addonleft=false, addonright=false)
{
    if (addonleft == undefined || addonleft == null)
    {
        throw "addonleft must be a defined boolean variable!";
    }
    else
    {
        if (addonleft == true || addonleft == false);
        else throw "addonleft must be a defined boolean variable!";
    }

    if (addonright == undefined || addonright == null)
    {
        throw "addonright must be a defined boolean variable!";
    }
    else
    {
        if (addonright == true || addonright == false);
        else throw "addonright must be a defined boolean variable!";
    }

    if (addonleft == addonright)
    {
        if (addonleft)
        {
            throw "both cannot be true! One must be true and the other must be false OR " +
                "both must be false!"
        }
        //else;//do nothing safe
    }
    //else;//do nothing safe

    //build the root node for the user here
    //have a textarea for data
    //have a spot for the left kid and a spot for the right kid
    //need to have an add left, add right, edit data or remove option

    //need a table with 3 columns and 2 rows
    //0 1 2 3
    //1 . ? .
    //2 a x b
    //
    //inside ? we will have:
    //the node contents
    //then two lines going down one to the left and one to the right
    //
    //inside x we will have:
    //a 1 row 3 column table to center the delete button
    //

    let mytable = document.createElement("table");
    let mytxtandsvgrw = document.createElement("tr");
    let myleftcolrwa = document.createElement("td");
    let mytxtandsvgcol = document.createElement("td");
    let myrightcolrwa = document.createElement("td");
    let mydelbtnrw = document.createElement("tr");
    let myleftcol = document.createElement("td");
    let mydelbtntablecol = document.createElement("td");
    let myrightcol = document.createElement("td");
    let mydelbtntable = document.createElement("table");
    let mydelbtntablerw = document.createElement("tr");
    let myemptyleftdelbtncol = document.createElement("td");
    let mydelbtncol = document.createElement("td");
    let myemptyrightdelbtncol = document.createElement("td");


    let mydiv = document.createElement("div");
    let mycntelem = document.createElement("textarea");
    myemptyleftdelbtncol.style.width = "80px";
    myemptyrightdelbtncol.style.width = "80px";
    mycntelem.style.width = "248px";
    mycntelem.style.height = "38px";
    mycntelem.style.resize = "none";
    mycntelem.style.marginLeft = "auto";
    mycntelem.style.marginRight = "auto";
    
    const mynwndidstr = "nwnd" + ((numids <= 0) ? "" : ("" + numids));
    mydiv.id = "" + mynwndidstr;
    //console.log("mynwndidstr = " + mynwndidstr);
    
    numids++;
    //console.log("NEW numids = " + numids);
    
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
    let mylkddiv = document.createElement("span");
    let myrkddiv = document.createElement("span");
    mylkddiv.appendChild(myleftbtn);
    myrkddiv.appendChild(myrightbtn);

    mytable.style.display = "inline";

    mydelbtncol.appendChild(mydelbtn);
    mydelbtntablerw.appendChild(myemptyleftdelbtncol);
    mydelbtntablerw.appendChild(mydelbtncol);
    mydelbtntablerw.appendChild(myemptyrightdelbtncol);
    
    mydelbtntablecol.style.position="absolue";
    mydelbtntablecol.style.verticalAlign="top";
    mydelbtntable.style.position="relative";

    mydelbtntable.appendChild(mydelbtntablerw);
    mydelbtntablecol.appendChild(mydelbtntable);
    
    myleftcol.style.position="absolue";
    myleftcol.style.verticalAlign="top";
    mylkddiv.style.position="relative";

    myrightcol.style.position="absolue";
    myrightcol.style.verticalAlign="top";
    myrkddiv.style.position="relative";

    myleftcol.appendChild(mylkddiv);
    mydelbtnrw.appendChild(myleftcol);
    mydelbtnrw.appendChild(mydelbtntablecol);
    myrightcol.appendChild(myrkddiv);
    mydelbtnrw.appendChild(myrightcol);
    
    mytxtandsvgcol.appendChild(mydiv);
    mytxtandsvgrw.appendChild(myleftcolrwa);
    mytxtandsvgrw.appendChild(mytxtandsvgcol);
    mytxtandsvgrw.appendChild(myrightcolrwa);
    
    mytable.appendChild(mytxtandsvgrw);
    mytable.appendChild(mydelbtnrw);
    let mydomnode = null;
    if (domnode == null) mydomnode = document.getElementById("tree");
    else mydomnode = domnode;
    mydomnode.appendChild(mytable);
    
    //build the svg and add it to the DOM now

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
    //console.log("mywdthnumstr = " + mywdthnumstr);
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
    
    mynwtextareaelem.addEventListener("change", function(bl, br, event){
        console.log("the textarea was changed!");
        //console.log("event = " + event);
        //console.log("this = " + this);
        //console.log("this.parentNode = " + this.parentNode);
        //console.log("this.parentNode.id = " + this.parentNode.id);
        //console.log("this.value = " + this.value);
        //console.log("event.target = " + event.target);
        //console.log("event.target.value = " + event.target.value);
        //console.log("event.target.parentNode = " + event.target.parentNode);
        //console.log("event.target.parentNode.id = " + event.target.parentNode.id);
        //console.log("bl = " + bl);
        //console.log("br = " + br);
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

        let usepost = true;
        if (event.target.parentNode.id === mynwndidstr) usepost = true;
        else usepost = false;
        console.log("usepost = " + usepost);

        let mybinnd = null;
        let mybinptnd = null;
        let treatasrt = false;
        if (binptnd == null) treatasrt = true;
        else treatasrt = binptnd.areAllPropertiesNull();
        if (treatasrt) mybinptnd = null;
        else mybinptnd = binptnd;
        console.log("treatasrt = " + treatasrt);

        if (usepost)
        {
            mybinnd = new Bintreend("", "" + event.target.value, mybinptnd, null, null);
            if (treatasrt);
            else
            {
                if (addonleft) mybinptnd.leftkd = mybinnd;
                else if (addonright) mybinptnd.rightkd = mybinnd;
                //else;//do nothing
            }
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

        let myptchbdystr = JSON.stringify(getAndGenerateServerObject(mybinnd, false));
        //console.log("myptchbdystr = " + myptchbdystr);
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
        //console.log("cmaafteridindx = " + cmaafteridindx);
        if (cmaafteridindx < 0 || cmaafteridindx > myptchbdystr.length - 1)
        {
            throw "illegal value found and used for the cmaafteridindx index!";
        }
        let mypstbdystr = myptchbdystr.substring(0, myidindx) + myptchbdystr.substring(cmaafteridindx + 1);
        //console.log("mypstbdystr = " + mypstbdystr);
        
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
        //console.log("mymethdstr = " + mymethdstr);
        //console.log("mybdystr = " + mybdystr);
        //console.log("myresurl = " + myresurl);

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
        };
        fetch(myresurl, myconfigobj).then((response) => response.json()).
        then(function(response){
            //console.log("response = " + response);
            //console.log("response.id = " + response.id);
            let myresidstr = "" + response.id;
            console.log("usepost = " + usepost);
            //debugger;
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
                
                //display the transversals here
                //update the type of tree here
                //update the number of nodes on the tree
                displayTreeStatsAndUpdateThem(mybinnd);
                console.log("successfully posted the new binary tree object to the server!");

                addLeftKidBtnListener(myleftbtn, mybinnd);
                addRightKidBtnListener(myrightbtn, mybinnd);

                console.log("doneloading = " + doneloading);
                if (doneloading);
                else
                {
                    let mytreebuiltevent = new Event("treeDOMLoaded");
                    myprevtabledomnd = mytable;
                    document.getElementById("tree").dispatchEvent(mytreebuiltevent);
                }
            }
            else
            {
                //console.log("response.data = " + response.data);
                
                //display the transversals here
                //update the type of tree here
                //update the number of nodes on the tree
                displayTreeStatsAndUpdateThem(mybinnd);
                
                console.log("successfully updated the binary tree node object on the server!");
            }
            //debugger;
        }.bind(mynwtextareaelem)).catch(function(err){
            console.error("there was a problem updating the data on the server or adding data on the " +
                "server!");
            console.error(err);
            alert("Error: There was a problem updating or putting the data on the server! " +
                "See log for details!");
        });
        //debugger;

        //update the parent node here
        if (!treatasrt && usepost && (addonleft || addonright))
        {
            console.log("begin updating the parent node on the server here!");
            //console.log("mybinptnd = " + mybinptnd);
            //debugger;
            let myoconfigobj = {
                method: "PATCH",
                headers: {
                    "Content-Type" : "application/json",
                    "Accept" : "application/json"
                },
                body: JSON.stringify(getAndGenerateServerObject(mybinptnd, false))
            };
            fetch("http://localhost:3000/nodes/" + mybinptnd.id, myoconfigobj).
            then((response) => response.json()).
            then(function(response){
                //console.log("response = " + response);
                //console.log("response.id = " + response.id);
                let myresidstr = "" + response.id;
                //console.log("response.data = " + response.data);
                
                if (response.id == undefined || response.id == null || myresidstr.length < 1)
                {
                    throw "illegal response id found and used here!";
                }
                //else;//do nothing
    
                console.log("successfully updated the parent binary tree node object on the server!");
            }).catch(function(err){
                console.error("there was a problem updating the data on the server!");
                console.error(err);
                alert("Error: There was a problem updating the data on the server! " +
                    "See log for details!");
            });
            //debugger;
        }
        //else;//do nothing
    }.bind(mynwtextareaelem, myleftbtn, myrightbtn));
    console.log("successfully added my on change listener for the textarea for my node here!");
    //debugger;

    mydelbtn.addEventListener("click", function(event){
        console.log("delete button clicked for the node!");
        //console.log("event.target = " + event.target);
        
        //get the DOM node we are trying to remove...
        //we also need to get the BintreeNode we are trying to remove...
        //there is a case where we may not be getting the BintreeNode because it was not created yet
        
        let mypttable = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
        //console.log("mypttable = " + mypttable);
        let mypttrws = mypttable.getElementsByTagName("tr");
        //console.log("mypttrws[0] = " + mypttrws[0]);
        let mydivtargetcol = mypttrws[0].getElementsByTagName("td")[1];
        //console.log("mydivtargetcol = " + mydivtargetcol);
        let mydivtarget = mydivtargetcol.getElementsByTagName("div")[0];
        //console.log("mydivtarget = " + mydivtarget);
        //console.log("mydivtarget.id = " + mydivtarget.id);
        let mydividstr = "" + mydivtarget.id;
        let remdomonly = (mydividstr.indexOf("nwnd") == 0);
        console.log("remdomonly = " + remdomonly);
        
        //if the node has no kids, then it can be removed immediately
        //the dom no kids will have both the add left kid and add right kid buttons
        //
        //then of course if the node has kids, then we need to be careful about it
        //   4
        // 2   6
        //0 3 5 8
        //suppose we want to remove 4 which has kids and is also the root node:
        //we need a new root node
        //we need to make sure both the left and right trees are hooked up to it correctly
        //this new root node needs to have no kids,
        //ideally it will also put the in-order transversal in order
        //so on the right tree find the farthest left node that has no kids
        //this will then be the new root
        //then we just hook up the kids
        //we also set the left and right kids new parent node
        //then we are free to set that parent node to null after we nullify all of the properties
        //
        //if we wanted to remove 4, 5 becomes the new root
        //if we wanted to remove 2, 3 becomes the new midroot
        //
        //the dom nodes will be the same, but more complicated because it is more complicated
        //
        //the id if we are removing dom node only implies that the dom node has no kids
        //if that is not the case, then it may have kids or not
        //
        //each node contains a table that has two rows
        //the second row has the add left delete table and add right buttons
        //inside the second row are three columns
        //on the first and 3rd columns: is a span which contains either a table or a button
        //the second column is a table also with three rows which centers the delete button
        //<table>
        // <tr>
        //  <td></td>
        //  <td><div>text area and svg</div></td>
        //  <td></td>
        // <tr>
        //  <td> <span> table or button </span></td>
        //  <td> table for delete button
        //  <td> <span> table or button </span></td>
        //</table>
        
        if (remdomonly) deleteAndUpdateDOMNodesOnly(mypttable);
        else
        {
            //remove software node and
            //remove dom nodes
            //
            mybinnd = getBintreendObjForIdFromArray(mydivtarget.id);
            
            if (mybinnd == null)
            {
                console.error("the node must have been on the list!");
                deleteAndUpdateDOMNodesOnly(mypttable);
                return;
            }
            else
            {
                //post the changes on the server
                let mydelconfigobj = {
                    method: "DELETE",
                    headers: {
                        "Content-Type" : "application/json",
                        "Accept" : "application/json"
                    },
                    body: ""
                };
                fetch("http://localhost:3000/nodes/" + mydivtarget.id, mydelconfigobj).
                then((response) => response.json()).
                then(function(response){
                    //console.log("response = " + response);
                    //console.log("mygenndsarr = " + mygenndsarr);
                    //debugger;
                    let myndi = getArrayIndexForNodeOnArray(mybinnd);
                    //console.log("myndi = " + myndi);
                    //console.log("OLD mygenndsarr.length = " + mygenndsarr.length);
                    
                    mybinnd.remove();
                    mybinnd = null;
                    if (myndi < 0 || myndi > mygenndsarr.length - 1);
                    else
                    {
                        mygenndsarr[myndi] = null;
                        mygenndsarr = mygenndsarr.filter(function(item, index){
                            if (index == myndi) return false;//get rid of this
                            else return true;//keep these
                        });
                    }
                    //console.log("NEW mygenndsarr.length = " + mygenndsarr.length);

                    doTransversalsHaveAllGenNodes();
                    
                    //update the DOM here
                    deleteAndUpdateDOMNodesOnly(mypttable);
                    
                    console.log("succesfully deleted the node from the server!");
                }).catch(function(err){
                    console.error("Error: there was a problem removing the nodes from the server!");
                    console.error(err);
                    alert("Error: there was a problem removing data from the server! See log for details!");
                });
            }
        }
        //debugger;
    }.bind(mydelbtn));
    console.log("successfully added delete button listener!");
    console.log("doneloading = " + doneloading);

    if (doneloading);
    else
    {
        let mytreebuiltevent = new Event("treeDOMLoaded");
        myprevtabledomnd = mytable;
        document.getElementById("tree").dispatchEvent(mytreebuiltevent);
    }
}

document.addEventListener("DOMContentLoaded", function(event){
    //makeBinarySearchTreeNodesToSave();
    //display the number of nodes and levels on the tree in the statistics section
    //hide the root nodes on the transversals
    displayTreeStatsAndUpdateThem(null);

    //show the form
    let myloadfrm = document.getElementById("myloadingform");
    myloadfrm.style.display = "block";
    let myloadopts = myloadfrm.getElementsByTagName("input");
    for (let n = 0; n < 4; n++)
    {
        myloadopts[n].addEventListener("click", function(oevent){
            //console.log("selected an option on the form!");
            myloadopts[4].disabled = false;
        });
    }
    myloadopts[4].disabled = true;
    myloadfrm.addEventListener("submit", function(oevent){
        oevent.preventDefault();
        //console.log("oevent.target = " + oevent.target);
        //console.log("oevent.target[0].checked = " + oevent.target[0].checked);
        //console.log("oevent.target[1].checked = " + oevent.target[1].checked);
        //console.log("oevent.target[2].checked = " + oevent.target[2].checked);
        //console.log("oevent.target[3].checked = " + oevent.target[3].checked);
        loadbintree = oevent.target[0].checked;
        loadbinsrchtree = oevent.target[1].checked;
        loaduserbintree = oevent.target[2].checked;
        userbuildowntree = oevent.target[3].checked;
        //debugger;
        //hide this form now
        this.style.display = "none";
        doneloading = false;
        if (loaduserbintree) finishLoadingDOMOptionsAfterServerCleared();
        else
        {
            document.getElementById("tree").addEventListener("serverNodesCleared",
                finishLoadingDOMOptionsAfterServerCleared);
            clearAllNodesFromTheServer();
        }
    }.bind(myloadfrm));
});
