#pragma strict
enum Message { Search = 0, PressF = 1, PressE = 2, Arm = 3, Armed = 4, Exausted = 5, Ended = 6, Equipped = 7, Dropped = 8 } 

var windowPos : Rect;
var customSkin : GUISkin;
var windowOpen : boolean = false;
var selectedMessage : int;
var messageText : String[];
function Start () {
	windowPos = new Rect(Screen.width/2 + 20, Screen.height-60, Screen.width/2 - 40, 40);

	messageText = new String[9];
	messageText[Message.Search] = "Cerca un estintore per spegnere i fuochi";
	messageText[Message.PressF] = "Premi [F] per equipaggiare l'estintore";
	messageText[Message.PressE] = "Premi [E] per armare o vedere lo stato dell'estintore";
	messageText[Message.Arm] = "L'estintore deve essere armato funzionare";
	messageText[Message.Armed] = "Estintore armato";
	messageText[Message.Exausted] = "L'estintore è scarico premi [E] per lasciarlo";
	messageText[Message.Ended] = "I fuochi sono spenti";
	messageText[Message.Equipped] = "Estintore equipaggiato";
	messageText[Message.Dropped] = "Estintore lasciato";

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
function ShowMessage(messageId : int) {
	StopAllCoroutines();
	selectedMessage = messageId;
	windowOpen = true;
}
function DisapearBoxAfter(waitTime: float) {
    // suspend execution for waitTime seconds
    yield WaitForSeconds (waitTime);
    windowOpen = false;
    
}

function Update () {
}