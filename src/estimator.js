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

const covid19ImpactEstimator = (data) => {
  // CHALLENGE 1
  const result = {
    data,
    impact: {},
    severeImpact: {}
  };

  result.impact.currentlyInfected = Math.floor(data.reportedCases * 10);
  result.severeImpact.currentlyInfected = Math.floor(data.reportedCases * 50);

  const factor = getInfectionsFactor(data.periodType, data.timeToElapse);

  result.impact.infectionsByRequestedTime = Math.floor(result.impact.currentlyInfected * (2 ** factor));
  result.severeImpact.infectionsByRequestedTime = Math.floor(result.severeImpact.currentlyInfected * (2 ** factor));

  // CHALLENGE 2

  result.impact.severeCasesByRequestedTime = Math.floor(result.impact.infectionsByRequestedTime * 0.15);
  result.severeImpact.severeCasesByRequestedTime = Math.floor(result.severeImpact.infectionsByRequestedTime * 0.15);

  const availableBeds = Math.floor(data.totalHospitalBeds * 0.35);
  result.impact.hospitalBedsByRequestedTime = Math.floor(availableBeds - result.impact.severeCasesByRequestedTime);
  result.severeImpact.hospitalBedsByRequestedTime = Math.floor(availableBeds - result.severeImpact.severeCasesByRequestedTime);

  // CHALLENGE 3

  result.impact.casesForICUByRequestedTime = Math.floor(result.impact.infectionsByRequestedTime * 0.05);
  result.severeImpact.casesForICUByRequestedTime = Math.floor(result.severeImpact.infectionsByRequestedTime * 0.05);

  result.impact.casesForVentilatorsByRequestedTime = Math.floor(result.impact.infectionsByRequestedTime * 0.02);
  result.severeImpact.casesForVentilatorsByRequestedTime = Math.floor(result.severeImpact.infectionsByRequestedTime * 0.02);

  return result;
};

export default covid19ImpactEstimator;
