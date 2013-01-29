#pragma strict
var explosionTime = 1.0;
var explosionRadius = 5.0;
var explosionPower = 2000.0;

function Start () {
	Destroy(gameObject, explosionTime);
	
	//Find all nearby colliders
	var colliders : Collider[] = Physics.OverlapSphere( transform.position,
	explosionRadius );
	//Apply a force to all surrounding rigid bodies.
	for( var hit in colliders )
	{
		if( hit.rigidbody )
		{
			hit.rigidbody.AddExplosionForce( explosionPower,
			transform.position, explosionRadius );
		}
	}
	//If we have a particle emitter attached, emit particles for .5 seconds
	if( particleEmitter )
	{
		particleEmitter.emit = true;
		yield WaitForSeconds( 0.5 );
		particleEmitter.emit = false;
	}
}