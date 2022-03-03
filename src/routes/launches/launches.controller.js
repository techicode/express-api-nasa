let Validator = require('validatorjs');

const {
  getAllLaunches,
  scheduleNewLaunch,
  getLaunch,
  cancelLaunch,
} = require('../../models/launches.models');

async function httpGetAllLaunches(req, res) {
  return res.status(200).json(await getAllLaunches());
}

async function httpPostLaunch(req, res) {
  const validLaunchData = {
    mission: 'required',
    rocket: 'required',
    launchDate: 'required|date',
  };

  const launch = req.body;
  launch.launchDate = new Date(launch.launchDate);

  let validation = new Validator(launch, validLaunchData);

  if (validation.passes()) {
    await scheduleNewLaunch(launch);
    return res.status(201).json(launch);
  } else {
    if (validation.errors.first('mission')) {
      return res.status(400).json({ error: 'Invalid mission name' });
    }
    if (validation.errors.first('rocket')) {
      return res.status(400).json({ error: 'Invalid rocket name' });
    }
    if (validation.errors.first('launchDate')) {
      return res.status(400).json({ error: 'Invalid date' });
    }
  }
}

async function httpDeleteLaunch(req, res) {
  const validDeleteData = {
    id: 'required',
  };

  let flight = req.params;
  flight.id = Number(flight.id);
  let validation = new Validator(flight, validDeleteData);

  const existLaunch = await getLaunch(flight.id);

  if (validation.passes()) {
    if (!existLaunch) {
      return res.status(404).json({ error: 'ID not found' });
    }

    const aborted = await cancelLaunch(flight.id);
    if (!aborted) {
      return res.status(400).json({
        error: 'Launch not aborted',
      })
    }
    return res.status(200).json(await getLaunch(flight.id));
  } else {
    return res.status(400).json({ error: 'You have to enter a proper ID' });
  }
}

module.exports = {
  httpGetAllLaunches,
  httpPostLaunch,
  httpDeleteLaunch,
};
