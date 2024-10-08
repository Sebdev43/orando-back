import { body } from "express-validator";
import { usersDataMappers } from "../dataMappers/index.dataMappers.js";
import { validateRequest } from "../middlewares/validateRequest.js";
/**
 * Middleware pour valider les champs de la requête d'inscription.
 * @module signupValidator
 */
export const signupValidator = [
  body("nickname")
    .exists()
    .withMessage("Le pseudo est requis.")
    .isString()
    .withMessage("Le pseudo doit être une chaîne de caractères.")
    .custom(async (nickname) => {
      const user = await usersDataMappers.getUserByNickname(nickname);
      if (user) {
        return Promise.reject("Le pseudo est déjà utilisé.");
      }
    }),
  body("localisation")
    .exists()
    .withMessage("La localisation est requise.")
    .isString()
    .withMessage("La localisation doit être une chaîne de caractères."),
  body("email")
    .exists()
    .withMessage("L'email est requis.")
    .isEmail()
    .withMessage("L'email doit être valide.")
    .custom(async (email) => {
      const user = await usersDataMappers.getUserByEmail(email);
      if (user) {
        return Promise.reject("L'email est déjà utilisé.");
      }
    }),
  body("password")
    .exists()
    .withMessage("Le mot de passe est requis.")
    .isLength({ min: 8 })
    .withMessage("Le mot de passe doit contenir au moins 8 caractères.")
    .matches(/[A-Z]/)
    .withMessage("Le mot de passe doit contenir au moins une lettre majuscule.")
    .matches(/[a-z]/)
    .withMessage("Le mot de passe doit contenir au moins une lettre minuscule.")
    .matches(/[0-9]/)
    .withMessage("Le mot de passe doit contenir au moins un chiffre.")
    .matches(/[^A-Za-z0-9]/)
    .withMessage(
      "Le mot de passe doit contenir au moins un caractère spécial."
    ),
  validateRequest,
];
