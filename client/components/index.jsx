/*
 `components/index.js` exists as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather
 * than having to figure out which file they belong to.
 */
export { default as EditNewt } from './EditNewt';
export { Login, Signup } from './auth-form';
export { default as Main } from './Main';
export { default as UserHome } from './user-home';
