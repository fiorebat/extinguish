function Start () {
}

function Update () {
	var fpsObject : GameObject = GameObject.Find("First Person Controller");
	var lookExt : InteractExtinguisher = fpsObject.GetComponent("InteractExtinguisher");
	var isLookingExtinguisher = lookExt.isLookingExtinguisher();
	
	var guiObject : GameObject = GameObject.Find("GUI");
	var infoBox : InfoBox = guiObject.GetComponent("InfoBox");
	var hintBox : HintBox = guiObject.GetComponent("HintBox");
	
	///frame in cui viene schiacciato il pulsante F e non ho l'estintore (EQUIPAGGIARE)
	if (!isLookingExtinguisher) {
		var hit : RaycastHit;
		ray = camera.main.ScreenPointToRay (Vector3(Screen.width/2.0,Screen.height/2.0,0));
		
		if (Input.GetKeyDown("f") && transform.childCount==0) { 
	
			if (Physics.Raycast(ray,hit,1)) {
				Debug.DrawRay(ray.origin,hit.point,Color.green);
				if(hit.collider.gameObject.tag == "pickupAble") {
		        	var weapons = GameObject.Find("Weapons");
		        	hit.transform.parent = weapons.transform;
		        	hit.collider.gameObject.transform.localPosition=Vector3(-8.65,1.66,-7.36);
		    		hit.collider.gameObject.transform.localRotation=Quaternion.Euler(0,0,0);
		    		hit.collider.gameObject.transform.Rotate(0,-90,0);
		    		
		    		//equip
		    		hit.collider.GetComponent("Extinguisher").equip();
		    		hintBox.ShowMessage(HintBox.Equipped);
	
		    	} else {
		    		Debug.Log("Oggetto non raccoglibile");
		    		hintBox.ShowMessage(HintBox.Search);
				}
				
			} else {
				Debug.Log("Oggetto mancato");
				hintBox.ShowMessage(HintBox.Search);
			}
			
		//frame in cui viene schiacciato il pulsante ed ho estintori
		} else if (Input.GetKeyDown("f") && transform.childCount!=0) {
			Debug.Log("Estintore già equipaggiato");
			if (Physics.Raycast(ray,hit,1)) {
				Debug.DrawRay(ray.origin,hit.point,Color.green);
				if(hit.collider.gameObject.tag == "pickupAble") {
					Debug.Log("Lascia questo estintore prima di prenderne un altro");
				} else {
					transform.GetChild(0).GetComponent("Extinguisher").unequip();
					hintBox.ShowMessage(HintBox.Search);
				}
			}
			else {
				transform.GetChild(0).GetComponent("Extinguisher").unequip();
				hintBox.ShowMessage(HintBox.Search);
			}
			
		//in tutti gli altri frame vedo se mostrare info sugli oggetti presenti
		} else {			
			if (Physics.Raycast(ray,hit,3)) {
				
				Debug.DrawRay(ray.origin,hit.point,Color.green);
				if(hit.collider.gameObject.tag == "pickupAble" ) {
					Debug.Log("Vicino estintore");
					infoBox.extinguisherType = hit.collider.gameObject.GetComponent("Extinguisher").contentType; 
					infoBox.messageBox = "Estintore: tipo " + hit.collider.gameObject.GetComponent("Extinguisher").contentType + "\n"+
										"Armato: " + (hit.collider.gameObject.GetComponent("Extinguisher").armed?"Si":"No") + "\n" +
										"Premi [F] per equipaggiare";
					infoBox.Show();
				} else if(hit.collider.gameObject.tag == "fire" ) {
					Debug.Log("Vicino fuoco");
					infoBox.extinguisherType = hit.collider.gameObject.GetComponent("Fire").fireType; 
					infoBox.messageBox = "Fuoco: tipo " + hit.collider.gameObject.GetComponent("Fire").fireType + "\n";
					infoBox.Show();
				}
			} else {
				infoBox.Hide();
			}
		}
	}
}