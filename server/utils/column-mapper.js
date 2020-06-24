let previousRowDate;

const getBest = (score, columnIndex) => {
  const best = [...score.entries()].reduce((a,e) => e[1][columnIndex] > a[1][columnIndex] ? e : a)[0];
  return best;
};

const getMapping = async (csvJson) => {
  // {dateColumn, amountColumn, typeColumn, descriptionColumn}
  console.log("getmapping");
  const score = scoreColumns(csvJson);

  const bestDate = getBest(score, 0);
  const bestAmount = getBest(score, 1);
  const bestType = getBest(score, 2);
  const bestDescription = getBest(score, 3);

  // TODO: Need to account for fields equally scored

  const mapping = {};
  mapping[bestDate] = "DATE";
  mapping[bestAmount] = "AMOUNT";
  mapping[bestType] = "TYPE";
  mapping[bestDescription] = "DESCRIPTION";

  return mapping;
};

const initializeScorecard = () => {
  // dateScore, amountScore, typeScore, descriptionScore
  return new Array(0, 0, 0, 0);
};

const incrementScore = (scorecard, columnIndex) => {
  scorecard[columnIndex] = scorecard[columnIndex] + 1;
};

const scoreForDate = (value, scorecard) => {
  // DATE: contains "date"; is number; contains 2 dashes or 2 slashes or 2 dots; date in current row is less than previous date in row
  if (!value) return;
  const fieldValue = value.toLowerCase();
  const dateColumn = 0;

  if (fieldValue.includes("date")) {
    incrementScore(scorecard, dateColumn);
    incrementScore(scorecard, dateColumn);
    incrementScore(scorecard, dateColumn);
    incrementScore(scorecard, dateColumn);
    return;
  }

  if (fieldValue.split("-").length === 3) {
    incrementScore(scorecard, dateColumn);
  } else if (fieldValue.split("/").length === 3) {
    incrementScore(scorecard, dateColumn);
  } else if (fieldValue.split(".").length === 3) {
    incrementScore(scorecard, dateColumn);
  }

  let dateValue = new Date(value);
  if (!isNaN(dateValue)) incrementScore(scorecard, dateColumn);

  let isLessThan = false;
  if (previousRowDate) {
    if (dateValue < previousRowDate) {
      incrementScore(scorecard, dateColumn);
      isLessThan = true;
    }
  }
  else {
    incrementScore(scorecard, dateColumn);
    incrementScore(scorecard, dateColumn);
  }
  //console.log(previousRowDate);
  //console.log(dateValue + " --- " + isNaN(dateValue) + " --- " + isLessThan);
  // if dateValue is NaN then use previousRowDate, otherwise if dateValue is less than previous date use dateValue, otherwise perviousRowDate
  previousRowDate = isNaN(dateValue)
    ? previousRowDate
    : isLessThan
    ? previousRowDate
    : dateValue;
};

//console.log(previousRowDate);

const scoreForAmount = (value, scorecard) => {
  // AMOUNT: contains "amount"; is number; contains 1 dot
  if (!value) return;
  const fieldValue = value.toLowerCase();
  const amountColumn = 1;

  if (fieldValue.includes("amount")) {
    incrementScore(scorecard, amountColumn);
    incrementScore(scorecard, amountColumn);
    incrementScore(scorecard, amountColumn);
    incrementScore(scorecard, amountColumn);
    return;
  }

  if (!isNaN(Number(value))) incrementScore(scorecard, amountColumn);

  if (value.split(".").length === 2) incrementScore(scorecard, amountColumn);
};

const scoreForType = (value, scorecard) => {
  // TYPE: contains "type"; is NaN; contains "withdraw" or "deposit"
  if (!value) return;
  const fieldValue = value.toLowerCase();
  const typeColumn = 2;

  let dateValue = new Date(fieldValue);
  if (!isNaN(dateValue)) return;

  let timeValue = new Date('1970-01-01T' + fieldValue + 'Z');
  if (!isNaN(timeValue)) return;

  if (fieldValue.includes("type")) {
    incrementScore(scorecard, typeColumn);
    incrementScore(scorecard, typeColumn);
    incrementScore(scorecard, typeColumn);
    incrementScore(scorecard, typeColumn);
    return;
  }

  if (isNaN(Number(fieldValue))) incrementScore(scorecard, typeColumn);

  if (fieldValue.includes("withdraw")) {
    incrementScore(scorecard, typeColumn);
  } else if (fieldValue.includes("deposit")) {
    incrementScore(scorecard, typeColumn);
  } else if (fieldValue.includes("sale")) {
    incrementScore(scorecard, typeColumn);
  }
};

const scoreForDescription = (value, scorecard) => {
  // DESCRIPTION: contains "description"; in NaN; does NOT contain "withdraw" or "deposit"
  if (!value) return;
  const fieldValue = value.toLowerCase();
  const descriptionColumn = 3;

  let dateValue = new Date(fieldValue);
  if (!isNaN(dateValue)) return;

  let timeValue = new Date('1970-01-01T' + fieldValue + 'Z');
  if (!isNaN(timeValue)) return;

  if (fieldValue.includes("description")) {
    incrementScore(scorecard, descriptionColumn);
    return;
  }

  if (isNaN(Number(fieldValue))) incrementScore(scorecard, descriptionColumn);

  if (!fieldValue.includes("deposit") && !fieldValue.includes("withdraw") && !fieldValue.includes("sale") && !fieldValue.includes("category"))
    incrementScore(scorecard, descriptionColumn);
};

const scoreColumns = (csvJson) => {
  //console.log("score columns");
  const fieldScores = new Map();
  csvJson.forEach((row) => {
    //console.log(row);
    previousRowDate = "";
    for (let [key, value] of Object.entries(row)) {
//console.log("---------------------------------");
//console.log("key: " + key + "  value: " + value);
      if (!fieldScores.has(key)) fieldScores.set(key, initializeScorecard());
      scoreForDate(value, fieldScores.get(key));
      scoreForAmount(value, fieldScores.get(key));
      scoreForType(value, fieldScores.get(key));
      scoreForDescription(value, fieldScores.get(key));
    }
  });
  //console.log(fieldScores);
  return fieldScores;
};

module.exports.getMapping = getMapping;
