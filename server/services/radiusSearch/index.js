const SURFACE_DISTANCE_COEFFIENT = 111.320;

const degreesToRadians = degrees => degrees * Math.PI / 180;

const getRadiusSearchParams = (gpsLatFieldName, gpsLngFieldName, gpsLat, gpsLng, searchRadius) => {
  const distanceFormula = `(ST_Distance_Sphere(POINT(${gpsLngFieldName}, ${gpsLatFieldName}), POINT(${gpsLng}, ${gpsLat}))/1000)`;

  // Create a bounding box to reduce the scope of our search
  const index = Math.abs(Math.cos(degreesToRadians(gpsLat)) * SURFACE_DISTANCE_COEFFIENT);
  const lat1 = gpsLat - searchRadius / SURFACE_DISTANCE_COEFFIENT;
  const lat2 = gpsLat + searchRadius / SURFACE_DISTANCE_COEFFIENT;
  const lng1 = gpsLng - searchRadius / index;
  const lng2 = gpsLng + searchRadius / index;

  return {
    lat1,
    lat2,
    lng1,
    lng2,
    distanceFormula,
  };
};

module.exports = getRadiusSearchParams;
