export const signUpUser = `
INSERT INTO users(firstName, otherName,lastName, passportUrl, email, password,isAdmin, userRole, createdOn)
VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *
`;


export const isUserExist = `
SELECT * FROM users WHERE email=$1;
`;