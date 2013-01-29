var speed = 6.0;
var jumpSpeed = 8.0;
var gravity = 20.0;
var footsteps: AudioClip[];
var stepWaitTime = 0.5;

private var moveDirection = Vector3.zero;
private var grounded : boolean = false;

function Start() { 
	while(true) {
		if (Mathf.Abs(Input.GetAxis("Vertical")) > 0.1){
	      yield WaitForSeconds(stepWaitTime);
	      audio.PlayOneShot(footsteps[Random.Range(0,footsteps.length)]);
	    }
	    yield; // let Unity free till next frame
	}
}

function FixedUpdate() {
	if (grounded) {
		// We are grounded, so recalculate movedirection directly from axes
		moveDirection = new Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical"));
		moveDirection = transform.TransformDirection(moveDirection);
		moveDirection *= speed;
		
		if (Input.GetButton ("Jump")) {
			moveDirection.y = jumpSpeed;
		} else { 
			
		}
	}

	// Apply gravity
	moveDirection.y -= gravity * Time.deltaTime;
	
	// Move the controller
	var controller : CharacterController = GetComponent(CharacterController);
	var flags = controller.Move(moveDirection * Time.deltaTime);
	grounded = (flags & CollisionFlags.CollidedBelow) != 0;
}

@script RequireComponent(CharacterController)