const PI = 3.1415926535;

var phase = 0;
var phase_2 = 0;
var phase_3 = 0;

const vibrato_rate = 0.00;

var audioContext = new AudioContext();
var bufferSource = audioContext.createBufferSource();
var scriptProcessor = audioContext.createScriptProcessor(4096, 0, 1);
scriptProcessor.onaudioprocess = function(audioProcessingEvent)
{
  getBuffer(audioProcessingEvent.outputBuffer);
}

function getBuffer(outputBuffer)
{

  var delta = 440.0 * 2 * PI / outputBuffer.sampleRate;
  var outputData = outputBuffer.getChannelData(0);

  var delta_2 = 550 * 2 * PI / outputBuffer.sampleRate;

  var delta_3 = 660 * 2 * PI / outputBuffer.sampleRate;

for (var i = 0; i < outputBuffer.length; i++)
  {
    tone_1 = Math.cos(phase);
    /*tone_2 = Math.cos(phase_2);*/
    /*tone_3 = Math.cos(phase_3);*/

    /* phase += delta + Math.cos(phase_2) * vibrato_rate; */
    phase += delta;
    /*phase_2 += delta_2;*/
    /*phase_3 += delta_3;*/

    outputData[i] = 0.2 * tone_1;

  }
}

function onUserWantsToStart()
{
  bufferSource.connect(scriptProcessor);
  scriptProcessor.connect(audioContext.destination);
  bufferSource.start();
}


onUserWantsToStart();