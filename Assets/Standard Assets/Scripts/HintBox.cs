using UnityEngine;
using System.Collections;

public class HintBox : MonoBehaviour {		
	public const int Search = 0, PressF = 1, PressE = 2, Arm = 3, Armed = 4, Exausted = 5, Ended = 6, Equipped = 7, Dropped = 8;

	public Rect windowPos;
	public GUISkin customSkin;
	public bool windowOpen = false;
	public int selectedMessage;
	public string[] messageText;
	
	void Start () {
		windowPos = new Rect(Screen.width/2 + 20, Screen.height-60, Screen.width/2 - 40, 40);
	
		messageText = new string[9];
		messageText[Search] = "Cerca un estintore per spegnere i fuochi";
		messageText[PressF] = "Premi [F] per equipaggiare l'estintore";
		messageText[PressE] = "Premi [E] per armare o vedere lo stato dell'estintore";
		messageText[Arm] = "Rimuovi l'anello per armare l'estintore";
		messageText[Armed] = "Estintore armato";
		messageText[Exausted] = "L'estintore è scarico premi [F] per lasciarlo";
		messageText[Ended] = "I fuochi sono spenti";
		messageText[Equipped] = "Estintore equipaggiato";
		messageText[Dropped] = "Estintore lasciato";
	}
	void OnGUI()
	{
		GUI.skin = customSkin;
		GUI.skin.box.fontSize = 22;
		GUI.skin.box.padding.left=10;
		GUI.skin.box.padding.bottom=7;
		if (windowOpen) {
			StartCoroutine(DisapearBoxAfter(3.0f));
			if (windowOpen) {
				GUI.Box(windowPos, messageText[selectedMessage]);
			}
		}
	}
	public void ShowMessage(int messageId) {
		StopAllCoroutines();
		selectedMessage = messageId;
		windowOpen = true;
	}
	IEnumerator DisapearBoxAfter(float waitTime) {
	    // suspend execution for waitTime seconds
	    yield return new WaitForSeconds (waitTime);
	    windowOpen = false;
	}
	
	void Update () {
	}
}


