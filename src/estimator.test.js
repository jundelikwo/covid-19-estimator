import covid19ImpactEstimator from './estimator';

const data = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
  },
  periodType: 'days',
  timeToElapse: 58,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
};

test('returns the right data structure', () => {
  const result = covid19ImpactEstimator(data);
  expect(result).toEqual(
    expect.objectContaining({
      data: expect.any(Object),
      impact: expect.any(Object),
      severeImpact: expect.any(Object)
    })
  );
});

test('impact.currentlyInfected returns the correct data', () => {
  const result = covid19ImpactEstimator(data);
  expect(result.impact.currentlyInfected).toBe(data.reportedCases * 10);
});

test('severeImpact.currentlyInfected returns the correct data', () => {
  const result = covid19ImpactEstimator(data);
  expect(result.severeImpact.currentlyInfected).toBe(data.reportedCases * 50);
});
