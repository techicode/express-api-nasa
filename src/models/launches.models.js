const launches = require("./launches.mongo");
const planets = require("./planets.mongo");

const DEFAULT_FLIGHT_NUMBER = 100;

const lxch = {
  flightNumber: 101,
  mission: "test mission",
  rocket: "Exploration xX",
  launchDate: new Date("December 22, 2022"),
  target: "Kepler-442 b",
  customers: ["ZTM", "Techi"],
  upcoming: true,
  success: true,
};

saveLaunch(lxch);

async function saveLaunch(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });
  if (!planet) {
    throw new Error("No target match was found");
  }

  await launches.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}

async function scheduleNewLaunch(launch) {
  const lastFlightNumber = (await getLatestFLightNumber()) + 1;

  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ["TechiCode", "NASA"],
    flightNumber: lastFlightNumber,
  });

  await saveLaunch(newLaunch);
}

async function getLatestFLightNumber() {
  const lastFlight = await launches.findOne().sort("-flightNumber");

  if (!lastFlight) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return lastFlight.flightNumber;
}

async function getAllLaunches() {
  return launches.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
}

async function getLaunch(flightNumber) {
  return launches.findOne({
    flightNumber: flightNumber
  }, {
    _id: 0,
    __v: 0,
  });
}

async function cancelLaunch(id) {
  const aborted = await launches.updateOne({
    flightNumber: id,
  }, {
    upcoming: false,
    success: false,
  });
  return aborted.modifiedCount === 1;
}

module.exports = {
  getAllLaunches,
  getLaunch,
  cancelLaunch,
  scheduleNewLaunch,
};
