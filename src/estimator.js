const covid19ImpactEstimator = (data) => {
  const result = {
    data,
    impact: {},
    severeImpact: {}
  };

  result.impact.currentlyInfected = data.reportedCases * 10;
  result.severeImpact.currentlyInfected = data.reportedCases * 50;

  result.impact.infectionsByRequestedTime = result.impact.currentlyInfected * 512;

  return result;
};

export default covid19ImpactEstimator;
