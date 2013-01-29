var windowPos : Rect;
var customSkin : GUISkin;
var windowOpen : boolean = false;
var messageBox : String;

function Start()
{
	windowPos = Rect ((Screen.width - 400)/2, (Screen.height/2)+ 75, 400, 175);
}

function OnGUI()
{
	GUI.skin = customSkin;
	if (windowOpen)
		GUI.Box(windowPos, messageBox);
}

// hide function for close the window (boolean=false)
function Hide() {
    windowOpen = false;
	return;
} 

function Show() {
	windowOpen = true;
	return;    
}