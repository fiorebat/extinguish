#pragma strict
 var emptyExtinguisher:boolean = false;
 
function Start() {
	emptyExtinguisher=false;
	particleEmitter.emit=false;
}
function Update () {
	var myExtinguisher = this.gameObject.transform.parent.GetComponent(Extinguisher);
	if (Input.GetAxis("Fire1") && !emptyExtinguisher && myExtinguisher.equipped && myExtinguisher.armed) {
		particleEmitter.emit=true;
	} else {
		particleEmitter.emit=false;
	}
}
function OnParticleCollision (other : GameObject)
{
	var myExtinguisher = this.gameObject.transform.parent.GetComponent(Extinguisher);
	var hitFire = other.GetComponent(Fire);
    if (other.tag == "fire" && myExtinguisher.contentType == hitFire.fireType) {
    	other.particleEmitter.emit = false;
    }
}
public function exaustExtinguisher() {
	emptyExtinguisher = true;
}