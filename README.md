# bintreeviewerhtmlphase1prj
Phase 1 Project Binary Tree Viewer HTML

This is a Single Page Application. This lets you view and build a Binary Tree.

To use it first, you designate if you want to start with an example:

You will see a form at the top of the page which asks you how you want to use the page.

The form presents you with the following options:

1. Binary Tree 2. Binary Search Tree 3. The User Tree 4. Build Your Own Binary Tree

OPTIONS 1, 2, and 3 WILL LOAD DATA from the JSON-SERVER hosting the db.json file for your choice.

OPTION 3 Checks to see if there are USER nodes to load in first. If there are not you will see an error message and will be asked to choose another option and the form will be displayed again at the top.

IF YOU CHOSE OPTIONS 1, 2, OR 3: THEN (assuming successful in case #3) it will load the nodes one by one and build the tree for you. Then it will let you know that it has finished by showing an alert.

THEN YOU CAN BUILD ON SAID TREE BY ADDING OR DELETING NODES AS NEEDED.

IF YOU CHOSE OPTIONS 1, 2, OR 4, THEN ALL PREVIOUS USER NODES WILL BE ERASED FROM THE SERVER.

If that fails, an error message will be displayed and you will be forced to reload and restart the server.

OPTION 4: IF YOU CHOSE TO BUILD YOUR OWN TREE: You will notice that each node looks something like this:

              ---------------
              |             |
              ---------------
                     /\
                    /  \
                   /    \
                  /      \
                 /        \
                /          \
               /            \
        -------    --------  -------
        |add  |    |Delete|  |add  |
        |left |    |Node  |  |right|
        |kid  |    --------  |kid  |
        -------              -------

AS NOTED BELOW THE NODES:

THE NODE IS NOT ALLOWED TO BE EMPTY BECAUSE THAT WILL NOT SHOW UP ON THE TRAVERSALS DISPLAYED BELOW THE NOTES.

SO AFTER IT IS NOT EMPTY, WHEN THE TEXTAREA CHANGE LISTENER IS FIRED, IT WILL SHOW UP ON THE TRAVERSALS AFTER THE NOT IS PUT ON THE SERVER.

IF THE TEXTAREA WAS NOT EMPTY AND YOU CHANGE THE DATA, THEN IT WILL UPDATE THE DATA ON THE SERVER;
HOWEVER: IF IT WAS NOT EMPTY AND NOW IS, YOU WILL GET AN ERROR AND SERVER AND TEXTAREA WILL RETAIN THE OLD DATA.

IF YOU CLICK ADD KID LEFT OR RIGHT, IT WILL CREATE A NEW NODE ABOVE AND PUT IT IN THE CORRECT SPOT.

ASSUMING THAT THE SERVER FUNCTIONS, THEN DELETING THE NODE WILL REMOVE IT IN MOST CASES.

DEPENDING ON THE NODE YOU CHOSE TO DELETE AND HOW MANY KIDS IT HAS: determines where the other nodes will be put. IF YOU REMOVE THE ROOT NODE (or a root node that has a parent node) AND THE ROOT NODE HAS TWO KIDS: THEN THE FARTHEST LEFT NODE ON THE RIGHT SIDE will be the NEW ROOT NODE and it will have the LEFT KID and the NEW RIGHT KID.

IF YOU DELETE ALL OF THE NODES, THE FORM UP AT THE TOP WILL SHOW UP AND YOU WILL HAVE THOSE OPTIONS AGAIN.

THE TRANSVERSALS:

PreOrder:
InOrder:
PostOrder:

Number of Nodes on the BINARY SEARCH OR BINARY TREE:

Number of Levels on the Tree:

When there are nodes on the tree and on the sever, all of the above will be updated.

The nodes will each have a border around them, black for normal nodes and red for the root node as noted.

Also noted, you can hover over these nodes and it will display information about the node:

Its id,
its data,
its level,
and if it is the root node or not.

AS YOU SUCCESSFULLY REMOVE NODES, THEN THE TRAVERSALS AND NUMBERS WILL UPDATE AFTER THE SERVER UPDATES.

DEPENDING ON THE TYPE OF FAILURE ON THE SERVER, YOU MAY STILL BE ABLE TO REMOVE SOME OF THE NODES.

IF YOU CHOSE TO RELOAD THE PAGE WITHOUT REMOVING THE NODES: The user tree will still be on the server.

The user tree generically refers to all of the nodes on the server, even if you started with an example tree, you are not allowed to change the example trees on the server. Only the user tree.

TO LAUNCH IT:

You need to have JSON-SERVER INSTALLED. Then run json-server --watch db.json
You can then launch the HTML file in the browser.

SOME HELPFUL WEBSITES FOR THE TOOLTIP AND THE SUMMARY AND DETAILS TAGS:

https://css-tricks.com/exploring-what-the-details-and-summary-elements-can-do/
https://www.w3schools.com/css/css_tooltip.asp

IN GENERAL, I RECOMMEND USING https://www.w3schools.com/ FOR ALL WEB DEVELOPMENT NEEDS.

RESOURCES:

Robin Rendle on Nov 26, Rendle, R., Coyier, C., &amp; Hoebregts, L. (2020, November 26). Exploring what the details and summary elements can do: CSS-tricks. CSS. https://css-tricks.com/exploring-what-the-details-and-summary-elements-can-do/

https://www.w3schools.com/. (n.d.). CSS Tooltip. https://www.w3schools.com/css/css_tooltip.asp 

SOME PUBLISHER INFORMATION COULD NOT BE FOUND.
