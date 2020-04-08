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

test('impact.infectionsByRequestedTime returns the correct data when requested time is 28 days', () => {
  const inputData = { ...data, timeToElapse: 28 };
  const result = covid19ImpactEstimator(inputData);
  expect(result.impact.infectionsByRequestedTime).toBe(data.reportedCases * 10 * 512);
});

test('severeImpact.infectionsByRequestedTime returns the correct data when requested time is 28 days', () => {
  const inputData = { ...data, timeToElapse: 28 };
  const result = covid19ImpactEstimator(inputData);
  expect(result.severeImpact.infectionsByRequestedTime).toBe(data.reportedCases * 50 * 512);
});

test('impact.infectionsByRequestedTime returns the correct data when requested time is 3 weeks', () => {
  const inputData = { ...data, periodType: 'weeks', timeToElapse: 3 };
  const result = covid19ImpactEstimator(inputData);
  expect(result.impact.infectionsByRequestedTime).toBe(data.reportedCases * 10 * 128);
});

test('severeImpact.infectionsByRequestedTime returns the correct data when requested time is 3 weeks', () => {
  const inputData = { ...data, periodType: 'weeks', timeToElapse: 3 };
  const result = covid19ImpactEstimator(inputData);
  expect(result.severeImpact.infectionsByRequestedTime).toBe(data.reportedCases * 50 * 128);
});

test('impact.infectionsByRequestedTime returns the correct data when requested time is 2 months', () => {
  const inputData = { ...data, periodType: 'months', timeToElapse: 2 };
  const result = covid19ImpactEstimator(inputData);
  expect(result.impact.infectionsByRequestedTime).toBe(data.reportedCases * 10 * 1048576);
});

test('severeImpact.infectionsByRequestedTime returns the correct data when requested time is 2 months', () => {
  const inputData = { ...data, periodType: 'months', timeToElapse: 2 };
  const result = covid19ImpactEstimator(inputData);
  expect(result.severeImpact.infectionsByRequestedTime).toBe(data.reportedCases * 50 * 1048576);
});
