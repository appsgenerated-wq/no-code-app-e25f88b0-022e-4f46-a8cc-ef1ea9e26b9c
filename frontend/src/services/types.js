/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {'Admin' | 'User'} role
 */

/**
 * @typedef {Object} Recipe
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string[]} ingredients
 * @property {string} instructions
 * @property {number} prepTime
 * @property {number} cookTime
 * @property {string} imageUrl
 * @property {string} authorId
 * @property {User} User - The author, often included in responses.
 */
