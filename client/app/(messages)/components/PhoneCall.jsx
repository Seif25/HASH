"use client";

import AgoraRTC from "agora-rtc-sdk-ng";
import { Phone } from "lucide-react";

export default function PhoneCall() {
  let options = {
    // Pass your App ID here.
    appId: "28697650aa2642629c220efc76ab2ff7",
    // Set the channel name.
    channel: "seif25",
    // Pass your temp token here.
    token:
      "007eJxTYOC8qXab8ZpV/MuObVoBVQ98/31h610kuvVyUYBkW+SJjPMKDEYWZpbmZqYGiYlGZiZGZkaWyUZGBqlpyeZmiUlGaWnmzokmqQ2BjAwM6dNZGBkgEMRnYyhOzUwzMmVgAABtvh66",
    // Set the user ID.
    uid: 0,
  };

  let channelParameters = {
    // A variable to hold a local audio track.
    localAudioTrack: null,
    // A variable to hold a remote audio track.
    remoteAudioTrack: null,
    // A variable to hold the remote user id.
    remoteUid: null,
  };
  async function startBasicCall() {
    const agoraEngine = AgoraRTC.createClient({ mode: "rtc", codec: "vp9" });
    // Listen for the "user-published" event to retrieve an AgoraRTCRemoteUser object.
    agoraEngine.on("user-published", async (user, mediaType) => {
      // Subscribe to the remote user when the SDK triggers the "user-published" event.
      await agoraEngine.subscribe(user, mediaType);
      console.log("subscribe success");

      // Subscribe and play the remote audio track.
      if (mediaType == "audio") {
        channelParameters.remoteUid = user.uid;
        // Get the RemoteAudioTrack object from the AgoraRTCRemoteUser object.
        channelParameters.remoteAudioTrack = user.audioTrack;
        // Play the remote audio track.
        channelParameters.remoteAudioTrack.play();
        showMessage("Remote user connected: " + user.uid);
      }

      // Listen for the "user-unpublished" event.
      agoraEngine.on("user-unpublished", (user) => {
        console.log(user.uid + "has left the channel");
        showMessage("Remote user has left the channel");
      });
    });

    window.onload = function ()
    {
      // Listen to the Join button click event.
      document.getElementById("join-call").onclick = async function ()
      {
        // Join a channel.
        await agoraEngine.join(options.appId, options.channel, options.token, options.uid);
        showMessage("Joined channel: " + options.channel);
        // Create a local audio track from the microphone audio.
        channelParameters.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        // Publish the local audio track in the channel.
        await agoraEngine.publish(channelParameters.localAudioTrack);
        console.log("Publish success!");
      }
      
      // Listen to the Leave button click event.
      document.getElementById('leave').onclick = async function ()
      {
        // Destroy the local audio track.
        channelParameters.localAudioTrack.close();
        // Leave the channel
        await agoraEngine.leave();
        console.log("You left the channel");
        // Refresh the page for reuse
        window.location.reload();
      }
    }
  }

  function showMessage(text){
    document.getElementById("phone-message").textContent = text;
  }
  return (
    <button id="join-call" onClick={startBasicCall}>
      <Phone size={"20px"} className="text-accent1 hover:text-primary" />
    </button>
  );
}
