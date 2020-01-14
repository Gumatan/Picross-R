const { bdd } = require("./conf");
const values = [
  [
    "Coeur",
    "gum",
    10,
    10,
    "0011001100001100110011111111111111111111111111111111111111110011111100001111110000001100000000110000"
  ],
  [
    "Cerise",
    "gum",
    10,
    10,
    "0000001111000001100100001011000001100100001000010001110011101001110011101111011111110111110110001110"
  ],
  [
    "Chat",
    "gum",
    10,
    10,
    "0010100000011110000010111000101111100100011100011000111100110011111001011111100101101110111101111110"
  ],
  [
    "Café",
    "gum",
    10,
    10,
    "0010101100001010100000000000000111111100010011111101011111010101111111011111110000111110011111111111"
  ],
  [
    "Homme",
    "gum",
    10,
    10,
    "0111111111111110001101000000011111011110101111011111010110101111011110010100000001011000000100000000"
  ]
];

bdd.query("TRUNCATE TABLE puzzle", err => {
  if (err) {
    console.warn(err);
  } else {
    console.log("Succesfully truncated puzzle table");
    bdd.query(
      "INSERT INTO puzzle (name, creator, height, width, solutionString) VALUES ?",
      [values],
      function(err, result) {
        if (err) throw err;
        console.log("Succesfuly inserted " + result.affectedRows + " puzzles");
        console.warn("Reset succesful, END");
      }
    );
  }
});