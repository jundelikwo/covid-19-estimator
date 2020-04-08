const covid19ImpactEstimator = (data) => ({
  data,
  impact: {
    currentlyInfected: data.reportedCases * 10
  },
  severeImpact: {}
});

export default covid19ImpactEstimator;
