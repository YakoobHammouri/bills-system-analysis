require('dotenv').config();
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { validateLoginInfo } = require('../../helpers/Validation');

const { SECRET } = process.env;
const { logIn } = require('../../database/query/User');
const {
  successMessage,
  internalErrorMessage,
  faildLoginMessage,
  failedMessage,
} = require('../../helpers/responseMessage');

// To create user token
const createToken = (email, gid, display_name, secret) =>
  sign({ email, gid, display_name }, secret);

module.exports = (req, res) => {
  const { email, password } = req.body;
  const { error } = validateLoginInfo({ email, password });

  // If user type his/her email incorrectly OR If user doesn't enter his/her email or password or both of them
  if (error !== undefined) {
    return res
      .status(400)
      .json(
        failedMessage(
          null,
          error.details[0].message.replace(/[^a-zA-Z ]/g, ''),
        ),
      );
  }

  // TO get password for the entered email from database
  logIn(email)
    .then((result) => {
      // If the email isn't in the database
      if (result.rowCount === 0) {
        res
          .status(403)
          .json(faildLoginMessage(null, 'Make sure of your email or password'));
      }

      // Make a cryption for the entered password to ensure that is match one stored in the database
      const hashPassword = result.rows[0].password;
      bcrypt
        .compare(password, hashPassword)
        .then((result2) => {
          // If Password and email doesn't match
          if (!result2) {
            return res
              .status(403)
              .json(
                faildLoginMessage(null, 'Make sure of your email or password'),
              );
          }

          // If there is a result
          const { gid, display_name } = result.rows[0];
          const token = createToken(email, gid, display_name, SECRET);
          // Success login process
          return res
            .cookie('token', token, { maxAge: 900000, httpOnly: true })
            .status(200)
            .json(
              successMessage(
                { status: 'success', gid },
                'You are logged in successfully',
              ),
            );
        })

        // If there is a server error
        .catch((err) =>
          res
            .status(501)
            .json(internalErrorMessage(null, 'internal error with the server')),
        );
    })
    .catch((err) =>
      res
        .status(501)
        .json(internalErrorMessage(null, 'internal error with the server')),
    );
};
