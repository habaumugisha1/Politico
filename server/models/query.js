export const signUpUser = `
INSERT INTO users(firstName, otherName,lastName, passportUrl, email, password,isAdmin, userRole, createdOn)
VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *
`;

export const myParty = `
INSERT INTO party(name, hdAdress, logoUrl, createdOn) VALUES($1,$2,$3,$4) RETURNING *;
`;

export const isUserExist = `
SELECT * FROM users WHERE email=$1;
`;

export const isPartyExist = `
SELECT * FROM party WHERE name=$1;
`;

export const isUserAdmin = `SELECT * FROM users WHERE isAdmin =$1;`;