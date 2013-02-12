#pragma strict
var windowPos : Rect;
var customSkin : GUISkin;
var windowOpen : boolean = false;
var selectedMessage : int;
var messageText : String[];
function Start () {
	windowPos = new Rect(Screen.width/2 + 20, Screen.height-60, Screen.width/2 - 40, 40);

	messageText = new String[6];
	messageText[0] = "Cerca un estintore per spegnere i fuochi";
	messageText[1] = "Premi [F] per equipaggiare l'estintore";
	messageText[2] = "Premi [E] per armare o vedere lo stato dell'estintore";
	messageText[3] = "L'estintore deve essere armato funzionare";
	messageText[4] = "L'estintore è scarico premi [E] per lasciarlo";
	messageText[5] = "I fuochi sono spenti";

}
function OnGUI()
{
	GUI.skin = customSkin;
	GUI.skin.box.fontSize = 22;
	GUI.skin.box.padding.left=10;
	GUI.skin.box.padding.bottom=7;
	if (windowOpen) {
		StartCoroutine(DisapearBoxAfter(3.0));
		if (windowOpen) {
			GUI.Box(windowPos, messageText[selectedMessage]);
		}
	}
}
function DisapearBoxAfter(waitTime: float) {
    // suspend execution for waitTime seconds
    yield WaitForSeconds (waitTime);
    windowOpen = false;
    
}

function Update () {
}