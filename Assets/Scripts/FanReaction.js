#pragma strict

var audioVictory : AudioClip;
var audioDefeat : AudioClip;
var volumeVictory : float = 2.0;
var volumeDefeat : float = 2.0;


function playSoundOfVictory(isVictory : boolean) {
	// stop any other audio
	if (audio.isPlaying)
		audio.Stop();
		
	// play either victory or defeat audio
	audio.clip = isVictory ? audioVictory : audioDefeat;
	audio.volume = isVictory ? volumeVictory : volumeDefeat;
	audio.Play();
}


function resetGame(){
	// reset to original state
	if (audio.isPlaying)
		audio.Stop();
}

@script RequireComponent(AudioSource)