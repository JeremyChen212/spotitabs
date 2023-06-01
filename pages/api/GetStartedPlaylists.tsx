export default function handler(req, res) {
    const guitarPlaylists = [
        {
            id: "15EPc80XuFrb2LmOzGjuRg",
            name: "RNB Mix",
            image: "/images/3d-Icons/BlueDonut.webp",
            color: "#bec9ffaa",
            colorName: "blue"
          },
        { 
            id: "0r5ojPhjqGVq21oQR13UJy",
            name: "Neo Soul",
            image: "/images/3d-Icons/YellowSwirl.webp",
            color: "#CAFFAA",
            colorName: "green"
          },
        {
          id: "37i9dQZF1EIfOLbgZeBGUI",
          name: "Rock",
          image: "/images/3d-Icons/PinkCube.webp",
          color: "#FF92FB",
          colorName: "purple"
        },
        {
            id: "43Nvl9B8fErDqqPSx1OdW0",
            name: "Woozy Pop",
            image: "/images/3d-Icons/PinkBlanket.webp",
            color: "#FF449E",
             colorName: "pink"
            // FE6F6F
        },
        {
            id: "37i9dQZF1EQp62d3Dl7ECY",
            name: "Folk",
            image: "/images/3d-Icons/Circle.webp",
            color: "#FE6F6F",
            colorName: "orangeyellow"
        },
        {
            id: "37i9dQZF1EQmPV0vrce2QZ",
            name: "Country",
            image: "/images/3d-Icons/Diamond.webp",
            color: "#FEAB6F",
            colorName: "orange"
        },
      ]
  
    res.status(200).json(guitarPlaylists);
  }