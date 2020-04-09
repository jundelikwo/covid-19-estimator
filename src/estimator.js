export const getNumberOfDays = (periodType, timeToElapse) => {
  let days;
  switch (periodType) {
    case 'days':
      days = timeToElapse;
      break;
    case 'weeks':
      days = timeToElapse * 7;
      break;
    case 'months':
      days = timeToElapse * 30;
      break;
    default:
      days = 0;
      break;
  }
  return days;
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

  const days = getNumberOfDays(data.periodType, data.timeToElapse);
  const factor = Math.floor(days / 3);

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

  result.impact.dollarsInFlight = (result.impact.infectionsByRequestedTime * days * data.region.avgDailyIncomeInUSD * data.region.avgDailyIncomePopulation).toFixed(2);
  result.severeImpact.dollarsInFlight = (result.severeImpact.infectionsByRequestedTime * days * data.region.avgDailyIncomeInUSD * data.region.avgDailyIncomePopulation).toFixed(2);

  return result;
};

export default covid19ImpactEstimator;
