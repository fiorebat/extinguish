var windowPos : Rect;
var imgPos : Rect[];
var customSkin : GUISkin;
var windowOpen : boolean = false;
var messageBox : String;
var messageBoxGuide : String;
var extinguisherImages : Texture2D[];
var extinguisherType : String;
var typeLetters : Texture2D[];
function Start()
{
	typeLetters = new Texture2D[6];
	typeLetters[0] = Resources.Load("A",typeof(Texture2D)) as Texture2D;
	typeLetters[1] = Resources.Load("B",typeof(Texture2D)) as Texture2D;
	typeLetters[2] = Resources.Load("C",typeof(Texture2D)) as Texture2D;
	typeLetters[3] = Resources.Load("D",typeof(Texture2D)) as Texture2D;
	typeLetters[4] = Resources.Load("E",typeof(Texture2D)) as Texture2D;
	typeLetters[5] = Resources.Load("F",typeof(Texture2D)) as Texture2D;
	
}

function OnGUI()
{
	GUI.skin = customSkin;
	if (windowOpen) {
		//extinguisher properties
		GUI.Box(windowPos, messageBox);
		
		
		//extinguisher types textures
		var i: int = 0;
		for (i = 0; i < extinguisherImages.Length; i++) {
			GUI.DrawTexture(imgPos[i],extinguisherImages[i],ScaleMode.ScaleAndCrop);
		}
		
		if (extinguisherImages.Length > 1) {
			var guidePos = Rect(imgPos[0].left, imgPos[i-1].bottom + 36, imgPos[1].right - imgPos[0].left - 10, imgPos[i-1].bottom + 100);
			
			//extinguisher guide
			GUI.Label(guidePos, messageBoxGuide); 
		}

	}
}
function getTypeResource( resource: String){
	switch (resource) {
		case "A":
			return typeLetters[0];
			break;
		case "B":
			return typeLetters[1];
			break;
		case "C":
			return typeLetters[2];
			break;
		case "D":
			return typeLetters[3];
			break;
		case "E":
			return typeLetters[4];
			break;
		case "F":
			return typeLetters[5];
			break;
		default: break;
	}


}


// hide function for close the window (boolean=false)
function Hide() {
    windowOpen = false;
	return;
} 

function Show() {
	var imgWidth : int = Screen.width/6 - Screen.width/20;
	var imgTop : int = Screen.height/25+5;
	var imgLeft : int = Screen.width/20+5;

	
	Debug.Log(extinguisherType);
	switch (extinguisherType)
	{
		case "Powder":
			Debug.Log("powder");
			extinguisherImages = new Texture2D[3];
			imgPos = new Rect[3]; 
			extinguisherImages[0] = getTypeResource("A");
			imgPos[0] = Rect (imgLeft, imgTop, imgWidth, imgWidth);
			imgLeft += imgWidth+(Screen.width/20);
			extinguisherImages[1] = getTypeResource("B");
			imgPos[1] = Rect (imgLeft, imgTop, imgWidth, imgWidth);
			imgLeft -= imgWidth+(Screen.width/20);
			imgTop += imgWidth+(Screen.width/20);
			extinguisherImages[2] = getTypeResource("C");
			imgPos[2] = Rect (imgLeft, imgTop, imgWidth, imgWidth);
			
			messageBoxGuide = "L'estintore a polvere chimica polivalente ABC è il più diffuso, è efficiente con tutti i tipi di fuochi escluso D. Sporca. Rimuovere l'anello (premere [E] dopo aver equipaggiato l'estintore e rimuoverlo) dirigere poi il getto sulla base del fuoco."; 
			break;
		case "CO2":
			Debug.Log("co2");
			extinguisherImages = new Texture2D[2];
			imgPos = new Rect[2]; 
			extinguisherImages[0] = getTypeResource("B");
			imgPos[0] = Rect (imgLeft, imgTop, imgWidth, imgWidth);
			imgLeft += imgWidth+(Screen.width/20);
			extinguisherImages[1] = getTypeResource("C");
			imgPos[1] = Rect (imgLeft, imgTop, imgWidth, imgWidth);
			
			messageBoxGuide = "L'estintore ad anidride carbonica è meno sporcante e usato per apparecchiature in tensione. Non efficiente all'esterno, con incendi di tipo A, modesto rischio di ustione congelante e asfissia per l'utilizzatore. Rimuovere l'anello (premere [E] dopo aver equipaggiato l'estintore e rimuoverlo) dirigere poi il getto sulla base del fuoco."; 
			break;
		default:
			Debug.Log("default");
			extinguisherImages = new Texture2D[1];
			imgPos = new Rect[1]; 
			imgWidth = Screen.width/3 - Screen.width/10;
			extinguisherImages[0] = getTypeResource(extinguisherType);;
			imgPos[0] = Rect (imgLeft, imgTop, imgWidth, imgWidth);
			break;
	}

	windowPos = Rect (Screen.width/20, Screen.height/25, Screen.width/3 - Screen.width/20, Screen.height - Screen.height/10);
	
	windowOpen = true;
	return;    
}