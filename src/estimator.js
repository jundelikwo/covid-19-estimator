const covid19ImpactEstimator = (data) => {
  const result = {
    data,
    impact: {},
    severeImpact: {}
  };

  result.impact.currentlyInfected = data.reportedCases * 10;
  result.severeImpact.currentlyInfected = data.reportedCases * 50;

  const factor = getInfectionsFactor(data.periodType, data.timeToElapse);

  result.impact.infectionsByRequestedTime = result.impact.currentlyInfected * (2 ** factor);
  result.severeImpact.infectionsByRequestedTime = result.severeImpact.currentlyInfected * (2 ** factor);

  return result;
};

const getInfectionsFactor = (periodType, timeToElapse) => {
  let factor;
  switch (periodType) {
    case 'days':
      factor = Math.floor(timeToElapse / 3);
      break;
    case 'weeks':
      factor = Math.floor(timeToElapse * 7 / 3);
      break;
    case 'months':
      factor = Math.floor(timeToElapse * 30 / 3);
      break;
    default:
      factor = 1;
      break;
  }
  return factor;
};

export default covid19ImpactEstimator;
