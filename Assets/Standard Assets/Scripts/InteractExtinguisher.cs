using UnityEngine;
using System.Collections;

public class InteractExtinguisher : MonoBehaviour {
	public Camera mainCamera;
	public Vector3 screenPoint;
	public Vector3 offset;
	public Vector3 draggedObjectOriginalPos;
	public bool dragging = false;
	public GameObject draggedObject;
	public HintBox hintBox;
	
	// Use this for initialization
	void Start () {
		mainCamera.enabled = true;
		GameObject guiObject = GameObject.Find("GUI");
		hintBox = (HintBox)guiObject.GetComponent("HintBox");
	}
	
	// Update is called once per frame
	void Update () {
		Camera extinguisherCamera;
		bool isExtinguisherEquiped = GameObject.Find("Weapons").transform.childCount > 0;
		if (Input.GetKeyDown(KeyCode.E) && isExtinguisherEquiped) {
			
			GameObject extinguisherEquiped = GameObject.Find("Weapons").transform.GetChild(0).gameObject;
			extinguisherCamera = extinguisherEquiped.transform.Find("Extinguisher Camera").camera;
						
			Debug.Log("Estintore equipaggiato"+extinguisherEquiped.name);
			mainCamera.enabled = !mainCamera.enabled;
			extinguisherCamera.enabled = !extinguisherCamera.enabled;
			
			if (extinguisherCamera.enabled)
				hintBox.ShowMessage(HintBox.Arm);
			
		}
		if (Input.GetButtonDown("Fire1") && isExtinguisherEquiped && !mainCamera.enabled) {
			//recupero oggetto estintore
			GameObject extinguisherEquiped = GameObject.Find("Weapons").transform.GetChild(0).gameObject;
			extinguisherCamera = extinguisherEquiped.transform.Find("Extinguisher Camera").camera;
			
			Ray ray = extinguisherCamera.ScreenPointToRay(Input.mousePosition);
		    RaycastHit hit;
		    if (Physics.Raycast(ray, out hit)){
				if(hit.collider.gameObject.tag == "ring") {
					Debug.Log("Colpito l'anello");
					dragging = true;
					draggedObject = hit.collider.gameObject;
					draggedObjectOriginalPos = hit.collider.gameObject.transform.position;
					
					//fisso la posizione iniziale dell'anello
					screenPoint = extinguisherCamera.WorldToScreenPoint(hit.transform.position);
		 
				    offset = hit.transform.position - extinguisherCamera.ScreenToWorldPoint(
				    						new Vector3(Input.mousePosition.x, Input.mousePosition.y, screenPoint.z));
				}
			}
		}
		if (Input.GetButton("Fire1")) {
			if (dragging) {
				//recupero oggetto estintore
				GameObject extinguisherEquiped = GameObject.Find("Weapons").transform.GetChild(0).gameObject;
				extinguisherCamera = extinguisherEquiped.transform.Find("Extinguisher Camera").camera;
			
				Vector3 curScreenPoint = new Vector3(Input.mousePosition.x, Input.mousePosition.y, screenPoint.z);
	 
			    Vector3 curPosition = extinguisherCamera.ScreenToWorldPoint(curScreenPoint) + offset;
			    draggedObject.transform.position = curPosition;
			}
		}
		if (Input.GetButtonUp("Fire1")) {
			if (dragging) {
				float distance = Vector3.Distance(draggedObject.transform.position, draggedObjectOriginalPos);
				
				if (distance > 0.07) { 
					draggedObject.transform.parent = null;
					draggedObject.AddComponent("Rigidbody");
					
					GameObject extinguisherEquipped = GameObject.Find("Weapons").transform.GetChild(0).gameObject;
					ArmExtinguish armer = (ArmExtinguish)extinguisherEquipped.GetComponent("ArmExtinguish");
					armer.ArmExtinguisher();
					
					hintBox.ShowMessage(HintBox.Armed);
					Debug.Log("Hai draggato "+distance);
				} else {
					Debug.Log("Draggato poco "+distance);
					draggedObject.transform.position= draggedObjectOriginalPos;
					hintBox.ShowMessage(HintBox.Arm);
				}
				dragging = false;
			}
		}
	}
	public bool isLookingExtinguisher()
	{
		return !mainCamera.enabled;
	}
}
