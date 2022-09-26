/*
There are two gymnastics teams, Dolphins and Koalas. They compete against each 
other 3 times. The winner with the highest average score wins the a trophy!

1. Calculate the average score for each team, using the test data below
2. Compare the team's average scores to determine the winner of the competition,
  and print it to the console. Don't forget that there can be a draw, so test
  for that as well (draw means they have the same average score).

3. BONUS 1: Include a requirement for a minimum score of 100. With this rule, a
  team only wins if it has a higher score than the other team, and the same time
  a score of at least 100 points. HINT: Use a logical operator to test for
  minimum score, as well as multiple else-if blocks 😉
4. BONUS 2: Minimum score also applies to a draw! So a draw only happens when
  both teams have the same score and both have a score greater or equal 100
  points. Otherwise, no team wins the trophy.

TEST DATA: Dolphins score 96, 108 and 89. Koalas score 88, 91 and 110
TEST DATA BONUS 1: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 123
TEST DATA BONUS 2: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 106

GOOD LUCK 😀
*/

let testData = {
  dolphins: {
    teamName: "Dolphins",
    scores: [96, 108, 89],
  },
  koalas: {
    teamName: "Koalas",
    scores: [88, 91, 110],
  },
};

let testDataBonus1 = {
  dolphins: {
    teamName: "Dolphins",
    scores: [97, 112, 101],
  },
  koalas: {
    teamName: "Koalas",
    scores: [109, 95, 123],
  },
};

let testDataBonus2 = {
  dolphins: {
    teamName: "Dolphins",
    scores: [97, 112, 101],
  },
  koalas: {
    teamName: "Koalas",
    scores: [109, 95, 106],
  },
};

let average = (array) =>
  array.reduce((acc, item) => acc + item, 0) / array.length;

let winner = (team1, team2) => {
  let team1Average = average(team1.scores);
  let team2Average = average(team2.scores);

  if (team1Average > team2Average && team1Average >= 100) {
    return team1.teamName;
  } else if (team2Average > team1Average && team2Average >= 100) {
    return team2.teamName;
  } else if (
    team1Average === team2Average &&
    team1Average >= 100 &&
    team2Average >= 100
  ) {
    return "draw";
  } else {
    return "no winner";
  }
};

console.log(winner(testDataBonus2.dolphins, testDataBonus2.koalas));
