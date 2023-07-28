let loadbintree = false;
let loadbinsrchtree = false;
let userbuildowntree = false;
const myswdth = screen.width;
let mygenndsarr = null;
function loadBinaryOrSearchTree(usesrchtree)
{
    //get the list of nodes from the api
    //then ?
    //GOAL: we want to take this list of nodes from the server and
    //-build a tree of the Binnodes and of the DOM nodes
    //
    //we do not want to modify the example nodes
    //we want to modify new nodes, so we want a copy of them
    //
    //concern: I cannot push them and gurantee the id
    //to build the tree, I need to have the ids guaranteed
    //
    if (usesrchtree == undefined || usesrchtree == null)
    {
        throw "usesrchtree must be a defined boolean variable!";
    }
    else
    {
        if (usesrchtree === true || usesrchtree === false);
        else throw "usesrchtree must be a defined boolean variable!";
    }
    
    let myurl = "http://localhost:3000/exbin";
    if (usesrchtree) myurl += "search";
    //else;//do nothing
    myurl += "treenodes";
    console.log("myurl = " + myurl);
    
    fetch(myurl).then((response) => response.json()).
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

function clearAndHideAllTransversals()
{
    document.getElementById("prorder").getElementsByClassName("rtnd")[0].textContent = "";
    //document.getElementById("prorder").getElementsByClassName("normalnds")[0].textContent = "";
    document.getElementById("innrmalndsparta").textContent = "";
    document.getElementById("innrmalndsparta").style.display = "none";
    document.getElementById("pinorder").getElementsByClassName("rtnd")[0].textContent = "";
    document.getElementById("innrmalndspartb").textContent = "";
    document.getElementById("innrmalndspartb").style.display = "none";
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
    console.log("showelem = " + showelem);
    console.log("useclick = " + useclick);
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
    console.log("this.id = " + this.id);
    console.log("this.data = " + this.data);
    //console.log("this.level = " + this.level);
    let mydatinfospan = pdivelem.getElementsByTagName("span")[0];
    if (useclick)
    {
        console.log("mydatinfospan.style.display = " + mydatinfospan.style.display);
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

function displayTransversals(mybinnd)
{
    if (mybinnd == undefined || mybinnd == null)
    {
        clearAndHideAllTransversals();
        return;
    }
    //else;//do nothing

    let myrtnds = document.getElementsByClassName("rtnd");
    for (let n = 0; n < myrtnds.length; n++)
    {
        myrtnds[n].style.display = "inline";
    }

    //document.getElementById("innrmalndsparta").style.display = "inline";
    //document.getElementById("innrmalndspartb").style.display = "inline";
    //document.getElementById("psorder").getElementsByClassName("normalnds")[0].style.display = "inline";

    //console.log("mybinnd.id = " + mybinnd.id);
    //console.log("mybinnd.data = " + mybinnd.data);
    
    let mypreordertrans = mybinnd.preOrderTransversal;
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
    console.log("myrtindxintransarr = " + myrtindxintransarr);
    //NOTE: when there is only the root, the arrays before root and after root will both be null!
    let myinordertransafterrt = getAllAfterRoot(myinordertrans);
    let myinordertransbeforert = getAllBeforeRoot(myinordertrans);
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
            else myuselenvar = myinordertransafterrt.length;
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
    if (myinordertransbeforert == null || myinordertransbeforert.length < 1);
    else
    {
        for (let n = 0; n < myinordertransafterrt.length; n++)
        {
            generateTransversalDOMNodesFor(myinordertransafterrt[n], myinordertransbeforert.length,
                document.getElementById("innrmalndspartb"));//islastnd, isrtnd
        }
    }
    
    let mypostordertrans = mybinnd.postOrderTransversal;
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
        generateTransversalDOMNodesFor(mypostordertrans[n], myuselenvar,
            document.getElementById("psnrmalnds"));//islastnd, isrtnd
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
        console.log("mypreordertree[" + n + "].level = cndlv = " + cndlv);
        console.log("mypreordertree[" + n + "].data = " + mypreordertree[n].data);
        console.log("mypreordertree[" + n + "].isRootNode() = " + mypreordertree[n].isRootNode());
        if (mypreordertree[n].isRootNode())
        {
            if (cndlv == 0);
            else throw "the root's level must be 0!";
        }
        else
        {
            console.log("mypreordertree[" + n + "].root.data = " + mypreordertree[n].root.data);
            console.log("mypreordertree[" + n + "].root.id = " + mypreordertree[n].root.id);
            console.log("mypreordertree[" + n + "].root.isParentOf(mypreordertree[" + n + "]) = " +
                mypreordertree[n].root.isParentOf(mypreordertree[n]));
            console.log("mypreordertree[" + n + "].root.isParentOf(mypreordertree[" + n + "], " +
                "mypreordertree[" + n + "].root) = " +
                mypreordertree[n].root.isParentOf(mypreordertree[n], mypreordertree[n].root));
            console.log("mypreordertree[" + n + "].isKidOfParent(mypreordertree[" + n +
                "], mypreordertree[" + n + "].root) = " +
                mypreordertree[n].isKidOfParent(mypreordertree[n], mypreordertree[n].root));
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
    //     10
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
                console.log("response = " + response);
                //debugger;
                console.log("response.id = " + response.id);
                console.log("response.data = " + response.data);
                console.log("myndsbyid[" + n + "].id = " + myndsbyid[n].id);
                console.log("myndsbyid[" + n + "].data = " + myndsbyid[n].data);
                debugger;
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

function getDOMElements(ndobj)
{
    console.error("NOT DONE YET 7-15-2023 2:53 AM!");
}

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
        console.log("event = " + event);
        console.log("event.target = " + event.target);
        console.log("mybinnd = " + mybinnd);
        debugger;
        buildUserBinaryTree(mybtn.parentNode, mybinnd, useleft, !useleft);
        mybtn.remove();
        debugger;
    });
    console.log("successfully added the add " + (useleft ? "left" : "right") + " kid listener!");
    debugger;
}
function addRightKidBtnListener(mybtn, mybinnd)
{
    addLeftOrRightKidBtnListener(mybtn, mybinnd, false);
}
function addLeftKidBtnListener(mybtn, mybinnd)
{
    addLeftOrRightKidBtnListener(mybtn, mybinnd, true);
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
    console.log("mynwndidstr = " + mynwndidstr);
    
    numids++;
    console.log("NEW numids = " + numids);
    
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
            mybinnd = new Bintreend("", "" + event.target.value, binptnd, null, null);
            if (addonleft) binptnd.leftkd = mybinnd;
            else if (addonright) binptnd.rightkd = mybinnd;
            //else;//do nothing
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
        };
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
                
                //display the transversals here
                //update the type of tree here
                //update the number of nodes on the tree
                displayTreeStatsAndUpdateThem(mybinnd);
                console.log("successfully posted the new binary tree object to the server!");

                addLeftKidBtnListener(myleftbtn, mybinnd);
                addRightKidBtnListener(myrightbtn, mybinnd);
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
            alert("Error: There was a problem updating or putting the data on the server! " +
                "See log for details!");
        });
        debugger;

        //update the parent node here
        if (usepost && (addonleft || addonright))
        {
            console.log("begin updating the parent node on the server here!");
            let myoconfigobj = {
                method: "PATCH",
                headers: {
                    "Content-Type" : "application/json",
                    "Accept" : "application/json"
                },
                body: JSON.stringify(getAndGenerateServerObject(binptnd, false))
            };
            fetch("http://localhost:3000/nodes/" + binptnd.id, myoconfigobj).
            then((response) => response.json()).
            then(function(response){
                console.log("response = " + response);
                console.log("response.id = " + response.id);
                console.log("response.data = " + response.data);
                
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
            debugger;
        }
        //else;//do nothing
    }.bind(mynwtextareaelem, myleftbtn, myrightbtn));
    console.log("successfully added my on edit listener for the textarea for my node here!");
    debugger;
}

document.addEventListener("DOMContentLoaded", function(event){
    //makeBinarySearchTreeNodesToSave();
    //display the number of nodes and levels on the tree in the statistics section
    //hide the root nodes on the transversals
    displayTreeStatsAndUpdateThem(null);

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
