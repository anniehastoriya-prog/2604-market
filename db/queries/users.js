import db from "#db/client";
import bcrypt from "bcrypt";

// Creates a new user in the database
export async function createUser(username, password) {
  const sql = `
  INSERT INTO users
    (username, password)
  VALUES
    ($1, $2)
  RETURNING *
  `;
  const hashedPassword = await bcrypt.hash(password, 10);
  const {
    rows: [user],
  } = await db.query(sql, [username, hashedPassword]);
  return user;
}

//Verify and confirm if the username and password are correct.
//Returns if the password is incorrect.
export async function getUserByUsernameAndPassword(username, password) {
  const sql = `
  SELECT *
  FROM users
  WHERE username = $1
  `;
  const {
    rows: [user],
  } = await db.query(sql, [username]);
  if (!user) return null;
  //Checks if the password and the hashed password from the database match.
  //If the passwords do not match, returns null.
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;
  return user;
}

//Looks up a user using their ID number.
export async function getUserById(id) {
  const sql = `
  SELECT *
  FROM users
  WHERE id = $1
  `;
  const {
    rows: [user],
  } = await db.query(sql, [id]);
  return user;
}
