import covid19ImpactEstimator, { getInfectionsFactor } from './estimator';

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
  expect(result.impact.currentlyInfected).toBe(Math.floor(data.reportedCases * 10));
});

test('severeImpact.currentlyInfected returns the correct data', () => {
  const result = covid19ImpactEstimator(data);
  expect(result.severeImpact.currentlyInfected).toBe(Math.floor(data.reportedCases * 50));
});

test('impact.infectionsByRequestedTime returns the correct data', () => {
  const result = covid19ImpactEstimator(data);
  expect(result.impact.infectionsByRequestedTime).toBe(Math.floor(data.reportedCases * 10 * 524288));
});

test('severeImpact.infectionsByRequestedTime returns the correct data', () => {
  const result = covid19ImpactEstimator(data);
  expect(result.severeImpact.infectionsByRequestedTime).toBe(Math.floor(data.reportedCases * 50 * 524288));
});

test('getInfectionsFactor returns the correct data when requested time is 28 days', () => {
  expect(getInfectionsFactor('days', 28)).toBe(9);
});

test('getInfectionsFactor returns the correct data when requested time is 4 weeks', () => {
  expect(getInfectionsFactor('weeks', 2)).toBe(4);
});

test('getInfectionsFactor returns the correct data when requested time is 3 months', () => {
  expect(getInfectionsFactor('months', 3)).toBe(30);
});

test('impact.infectionsByRequestedTime returns the correct data when requested time is 28 days', () => {
  const inputData = { ...data, timeToElapse: 28 };
  const result = covid19ImpactEstimator(inputData);
  expect(result.impact.infectionsByRequestedTime).toBe(Math.floor(data.reportedCases * 10 * 512));
});

test('severeImpact.infectionsByRequestedTime returns the correct data when requested time is 28 days', () => {
  const inputData = { ...data, timeToElapse: 28 };
  const result = covid19ImpactEstimator(inputData);
  expect(result.severeImpact.infectionsByRequestedTime).toBe(Math.floor(data.reportedCases * 50 * 512));
});

test('impact.infectionsByRequestedTime returns the correct data when requested time is 3 weeks', () => {
  const inputData = { ...data, periodType: 'weeks', timeToElapse: 3 };
  const result = covid19ImpactEstimator(inputData);
  expect(result.impact.infectionsByRequestedTime).toBe(Math.floor(data.reportedCases * 10 * 128));
});

test('severeImpact.infectionsByRequestedTime returns the correct data when requested time is 3 weeks', () => {
  const inputData = { ...data, periodType: 'weeks', timeToElapse: 3 };
  const result = covid19ImpactEstimator(inputData);
  expect(result.severeImpact.infectionsByRequestedTime).toBe(Math.floor(data.reportedCases * 50 * 128));
});

test('impact.infectionsByRequestedTime returns the correct data when requested time is 2 months', () => {
  const inputData = { ...data, periodType: 'months', timeToElapse: 2 };
  const result = covid19ImpactEstimator(inputData);
  expect(result.impact.infectionsByRequestedTime).toBe(Math.floor(data.reportedCases * 10 * 1048576));
});

test('severeImpact.infectionsByRequestedTime returns the correct data when requested time is 2 months', () => {
  const inputData = { ...data, periodType: 'months', timeToElapse: 2 };
  const result = covid19ImpactEstimator(inputData);
  expect(result.severeImpact.infectionsByRequestedTime).toBe(Math.floor(data.reportedCases * 50 * 1048576));
});

test('impact.severeCasesByRequestedTime returns the correct data', () => {
  const result = covid19ImpactEstimator(data);
  expect(result.impact.severeCasesByRequestedTime).toBe(Math.floor(data.reportedCases * 10 * 524288 * 0.15));
});

test('severeImpact.severeCasesByRequestedTime returns the correct data', () => {
  const result = covid19ImpactEstimator(data);
  expect(result.severeImpact.severeCasesByRequestedTime).toBe(Math.floor(data.reportedCases * 50 * 524288 * 0.15));
});

test('impact.hospitalBedsByRequestedTime returns the correct data', () => {
  const result = covid19ImpactEstimator(data);
  const hospitalBedsByRequestedTime = Math.floor(data.totalHospitalBeds * 0.35) - (data.reportedCases * 10 * 524288 * 0.15);
  expect(result.impact.hospitalBedsByRequestedTime).toBe(Math.floor(hospitalBedsByRequestedTime));
});

test('severeImpact.hospitalBedsByRequestedTime returns the correct data', () => {
  const result = covid19ImpactEstimator(data);
  const hospitalBedsByRequestedTime = Math.floor(data.totalHospitalBeds * 0.35) - (data.reportedCases * 50 * 524288 * 0.15);
  expect(result.severeImpact.hospitalBedsByRequestedTime).toBe(Math.floor(hospitalBedsByRequestedTime));
});

test('impact.casesForICUByRequestedTime returns the correct data', () => {
  const result = covid19ImpactEstimator(data);
  expect(result.impact.casesForICUByRequestedTime).toBe(Math.floor(data.reportedCases * 10 * 524288 * 0.05));
});

test('severeImpact.casesForICUByRequestedTime returns the correct data', () => {
  const result = covid19ImpactEstimator(data);
  expect(result.severeImpact.casesForICUByRequestedTime).toBe(Math.floor(data.reportedCases * 50 * 524288 * 0.05));
});

test('impact.casesForVentilatorsByRequestedTime returns the correct data', () => {
  const result = covid19ImpactEstimator(data);
  expect(result.impact.casesForVentilatorsByRequestedTime).toBe(Math.floor(data.reportedCases * 10 * 524288 * 0.02));
});

test('severeImpact.casesForVentilatorsByRequestedTime returns the correct data', () => {
  const result = covid19ImpactEstimator(data);
  expect(result.severeImpact.casesForVentilatorsByRequestedTime).toBe(Math.floor(data.reportedCases * 50 * 524288 * 0.02));
});
