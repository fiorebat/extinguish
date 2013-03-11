using UnityEngine;
using System.Collections;

public class ArmExtinguish : MonoBehaviour {

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}
	
	public void ArmExtinguisher() {
		SendMessage("arm");
	}
}
