using UnityEngine;
using System.Collections;

public class InteractExtinguisher : MonoBehaviour {
	public Camera mainCamera;
	
	// Use this for initialization
	void Start () {
		mainCamera.enabled = true;
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
			
		}
		if (Input.GetButtonDown("Fire1") && isExtinguisherEquiped && !mainCamera.enabled) {
			GameObject extinguisherEquiped = GameObject.Find("Weapons").transform.GetChild(0).gameObject;
		}
	}
	public bool isLookingExtinguisher()
	{
		return !mainCamera.enabled;
	}
}
