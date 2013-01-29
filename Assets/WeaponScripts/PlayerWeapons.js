function Start () {
}

function Update () {
	var hit : RaycastHit;
	ray = camera.main.ScreenPointToRay (Vector3(Screen.width/2.0,Screen.height/2.0,0));
	//frame in cui viene schiacciato il pulsante R e non ho l'estintore (ARMARE)
	if (Input.GetKeyDown("r") && transform.childCount==0) { 
		
		if (Physics.Raycast(ray,hit,1)) {
			Debug.DrawRay(ray.origin,hit.point,Color.green);
			if(hit.collider.gameObject.tag == "pickupAble" && !hit.collider.GetComponent("Extinguisher").armed) {
	        	
	    		//arm
	    		hit.collider.GetComponent("Extinguisher").armed = true;

	    	} else {
	    		//non è un estintore o è già armato
			}
			
		} else {
			//nessun oggetto colpito
		}
		
	//frame in cui viene schiacciato il pulsante F e non ho l'estintore (EQUIPAGGIARE)
	} else if (Input.GetKeyDown("f") && transform.childCount==0) { 

		if (Physics.Raycast(ray,hit,1)) {
			Debug.DrawRay(ray.origin,hit.point,Color.green);
			if(hit.collider.gameObject.tag == "pickupAble" && hit.collider.GetComponent("Extinguisher").armed) {
	        	var weapons = GameObject.Find("Weapons");
	        	hit.transform.parent = weapons.transform;
	        	hit.collider.gameObject.transform.localPosition=Vector3(-8.65,1.66,-7.36);
	    		hit.collider.gameObject.transform.localRotation=Quaternion.Euler(0,0,0);
	    		hit.collider.gameObject.transform.Rotate(0,-90,0);
	    		
	    		//equip
	    		 hit.collider.GetComponent("Extinguisher").equip();

	    	} else {
	    		Debug.Log("Oggetto non raccoglibile");
			}
			
		} else {
			Debug.Log("Oggetto mancato");
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
			}
		}
		else {
			transform.GetChild(0).GetComponent("Extinguisher").unequip();
		}
		
	//in tutti gli altri frame vedo se mostrare info sugli oggetti presenti
	} else {
		//Debug.Log("Cerco oggetti vicini");
		var guiObject : GameObject = GameObject.Find("GUI");
		var infoBox : InfoBox = guiObject.GetComponent("InfoBox");
		if (Physics.Raycast(ray,hit,2)) {
			
			Debug.DrawRay(ray.origin,hit.point,Color.green);
			if(hit.collider.gameObject.tag == "pickupAble" ) {
				Debug.Log("Vicino estintore");
				infoBox.extinguisherType = hit.collider.gameObject.GetComponent("Extinguisher").contentType; 
				infoBox.messageBox = "Estintore: tipo " + hit.collider.gameObject.GetComponent("Extinguisher").contentType + "\n"+
									"Carica residua: " + (hit.collider.gameObject.GetComponent("Extinguisher").timeLeft).ToString("#.#") + "\n" +
									"Armato: " + (hit.collider.gameObject.GetComponent("Extinguisher").armed?"Si" + "\n" +
									"Premi [F] per equipaggiare":"No" + "\n" +
									"Premi [R] per armare");
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
