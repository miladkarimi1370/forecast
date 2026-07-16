export function getUserLocation() {
  if ("geolocation" in navigator) {

    navigator.geolocation.getCurrentPosition(
      (position) => {

        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }

    return coords        

      },
      (error) => {

        switch(error.code) {
          case 1:
            console.log("Permission denied");
            break;

          case 2:
            console.log("Position unavailable");
            break;

          case 3:
            console.log("Timeout");
            break;
        }

      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );

  }
}