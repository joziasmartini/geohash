const BASE32_CODES: string = "0123456789bcdefghjkmnpqrstuvwxyz";
const MAX_LATITUDE: number = 90;
const MIN_LATITUDE: number = -90;
const MAX_LONGITUDE: number = 180;
const MIN_LONGITUDE: number = -180;

/**
 * Encodes the latitude and longitude into a geohash string with the specified precision.
 * @param latitude The latitude value.
 * @param longitude The longitude value.
 * @param precision The desired precision of the geohash.
 * @returns The geohash string.
 */
function encode(latitude: number, longitude: number, precision: number): string {
  let hash = "";
  let minLat = MIN_LATITUDE;
  let maxLat = MAX_LATITUDE;
  let minLon = MIN_LONGITUDE;
  let maxLon = MAX_LONGITUDE;
  let mid: number;
  let isEven: boolean = true;
  let bit: number = 0;
  let index: number = 0;

  while (hash.length < precision) {
    if (isEven) {
      mid = (minLon + maxLon) / 2;
      if (longitude > mid) {
        bit = 1;
        minLon = mid;
      } else {
        bit = 0;
        maxLon = mid;
      }
    } else {
      mid = (minLat + maxLat) / 2;
      if (latitude > mid) {
        bit = 1;
        minLat = mid;
      } else {
        bit = 0;
        maxLat = mid;
      }
    }

    isEven = !isEven;
    index = index * 2 + bit;

    if (index >= BASE32_CODES.length) {
      hash += BASE32_CODES.charAt(index);
      index = 0;
    }
  }

  return hash;
}

// Usage
const latitude = -23.5505; // São Paulo latitude
const longitude = -46.6333; // São Paulo longitude
const precision = 6; // Geohash precision

// Encode the coordinates into a geohash
const geohash = encode(latitude, longitude, precision);

// Output the geohash
console.log(geohash);
