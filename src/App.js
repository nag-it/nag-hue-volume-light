import React, { useEffect } from "react";
import "./App.css";

const queryParams = new URLSearchParams(window.location.search);
const HUE_BRIDGE_IP = queryParams.get("hue-bridge-ip");
const USERNAME = queryParams.get("username");

function App() {
  const [scenes, setScenes] = React.useState([]);
  const [error, setError] = React.useState(null);

  const loadScenes = async () => {
    try {
      const response = await fetch(
        `http://${HUE_BRIDGE_IP}/api/${USERNAME}/scenes`,
      );
      const json = await response.json();
      const scenes = Object.keys(json)
        .map((key) => {
          const scene = json[key];
          return {
            id: key,
            name: scene.name,
            group: scene.group,
          };
        })
        .reverse();
      setScenes(scenes);
      console.log(scenes);
    } catch (error) {
      console.error("Error fetching scenes:", error);
      setError("Only woks inside the nag network!");
    }
  };

  const turnOff = async (index = 0) => {
    try {
      console.log(scenes);
      console.log(scenes[0]);
      const response = await fetch(
        `http://${HUE_BRIDGE_IP}/api/${USERNAME}/groups/${scenes[index].group}/action`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ on: false }),
        },
      );
      const json = await response.json();
      console.log("Turned off:", json);

      if (scenes.length > index + 1) {
        turnOff(index + 1);
      }
    } catch (error) {
      console.error("Error turning off:", error);
    }
  };

  const turnOn = async (scene) => {
    try {
      const response = await fetch(
        `http://${HUE_BRIDGE_IP}/api/${USERNAME}/groups/${scene.group}/action`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ scene: scene.id }),
        },
      );
      const json = await response.json();
      console.log("Turned on:", json);
    } catch (error) {
      console.error("Error turning on:", error);
    }
  };

  useEffect(() => {
    loadScenes();
  }, []);

  return (
    <div>
      <h1>🚦 nag volume light</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <div>
          {scenes &&
            scenes.map((scene) => (
              <button onClick={() => turnOn(scene)}>{scene.name}</button>
            ))}
          <button onClick={() => turnOff()}>Fine</button>
        </div>
      )}
    </div>
  );
}

export default App;
