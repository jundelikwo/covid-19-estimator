import covid19ImpactEstimator from './estimator';

const data = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
  },
  periodType: 'days',
  timeToElapse: 28,
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

test('impact.infectionsByRequestedTime returns the correct data', () => {
  const result = covid19ImpactEstimator(data);
  expect(result.impact.infectionsByRequestedTime).toBe(data.reportedCases * 10 * 512);
});

test('severeImpact.infectionsByRequestedTime returns the correct data', () => {
  const result = covid19ImpactEstimator(data);
  expect(result.severeImpact.infectionsByRequestedTime).toBe(data.reportedCases * 50 * 512);
});
