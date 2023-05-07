const express = require("express");
const app = express();
var cors = require("cors");
app.use(express.json());
app.use(cors());

const Database = require("better-sqlite3");
const db = new Database("data.db", { verbose: console.log });
const port = 3000;

// ------------------------------------------------------------------------------------ //
// ------------------------------------------------------------------------------------ //
// ------------------------------------------------------------------------------------ //

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// ------------------------------------------------------------------------------------ //
// ------------------------------------------------------------------------------------ //
// ------------------------------------------------------------------------------------ //

app.post("/api/shorten", (req, res) => {
  let num =
    BigInt(
      db.prepare("SELECT * FROM urls ORDER BY id DESC LIMIT 1").get().num
    ) + 1n;

  const shorturl = base10ToBase62(num);
  const longurl = req.body.longurl;

  db.prepare("INSERT INTO urls (num, shorturl, longurl) VALUES (?, ?, ?)").run(
    num.toString(),
    shorturl,
    longurl
  );

  res.send({ shorturl: base10ToBase62(num) });
});

// ------------------------------------------------------------------------------------ //
// ------------------------------------------------------------------------------------ //
// ------------------------------------------------------------------------------------ //

app.get("/api/search/:shorturl", (req, res) => {
  const shorturl = req.params.shorturl;
  const row =
    db.prepare("SELECT * FROM urls WHERE shorturl = ?").get(shorturl) ?? {};

  res.send({ longurl: row.longurl });
});

// ------------------------------------------------------------------------------------ //
// ------------------------------------------------------------------------------------ //
// ------------------------------------------------------------------------------------ //

function base10ToBase62(n) {
  const base62 =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (n < 62n) return base62[n];
  else return base10ToBase62(n / 62n) + base62[n % 62n];
}

// ------------------------------------------------------------------------------------ //
// ------------------------------------------------------------------------------------ //
// ------------------------------------------------------------------------------------ //
