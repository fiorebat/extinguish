var windowPos : Rect;
var imgPos : Rect;
var customSkin : GUISkin;
var windowOpen : boolean = false;
var messageBox : String;
var extinguisherImage : Texture2D;
var extinguisherType : String;

function Start()
{
	windowPos = Rect (Screen.width/20, Screen.height/25, Screen.width/3 - Screen.width/20, Screen.height - Screen.height/10);
	imgPos = Rect (Screen.width/20+5, Screen.height/25+5, Screen.width/3 - Screen.width/10, Screen.width/3 - Screen.width/10);
	
	extinguisherImage = Resources.Load(extinguisherType,typeof(Texture2D)) as Texture2D;
}

function OnGUI()
{
	GUI.skin = customSkin;
	if (windowOpen) {
		GUI.Box(windowPos, messageBox);
		GUI.DrawTexture(imgPos,extinguisherImage,ScaleMode.ScaleAndCrop);
	}
}

// hide function for close the window (boolean=false)
function Hide() {
    windowOpen = false;
	return;
} 

function Show() {
	extinguisherImage = Resources.Load(extinguisherType,typeof(Texture2D)) as Texture2D;
	windowOpen = true;
	return;    
}