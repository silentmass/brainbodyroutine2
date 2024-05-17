# TODO

## VERY IMPORTANT

- [ ] Refresh session token and alarm when token is expired
  - [ ] Inform user that session token has expired
  - [ ] Update NextAuth token and session
  - [ ] Refresh FastAPI token
- [ ] The null user task doesn't get activated in carousel
- [ ] Code review and clean code with CGPT
  - [ ] Remove unused routes
  - [ ] Unify and simplify variable naming
  - [ ] Refactor components into smaller components
- [ ] Add more tailwind colors

## LESS IMPORTANT

- [ ] Add buttons to move tasks
- [ ] How to control visibility and creation of task categories
- [ ] Add lateral swipe to change category
- [ ] Make development and production separate
- [ ] Add order column in tasks, descriptionlist, and descriptions
- [ ] Check how navigation works when is open
  - [ ] Horizontal > Change task category
  - [ ] Vertical > Change task
- [ ] Finish form visuals
- [ ] Add create tag API endpoints
- [ ] Add delete tag API endpoints
- [ ] Add tag form

## DONE

- [x] Fix task view mode button when switching back from single view!!!!!
- [x] Save dark/light mode in cookie
- [x] Add user registration
- [x] Fetch user tasks
- [x] Fetch null user tasks
- [x] Check all task fetches and revalidations
- [x] Remove ability to CRUD task catgories
- [x] Authenticate GET data endpoints, except when user is null
- [x] Add button to duplicate general task
  - [x] Add form action
- [x] Add delete task button
- [x] Add delete user form
- [x] Fix carousel duplicate button z-index
- [x] Add hover and active to duplicate button
- [x] The is task active button doesn't refresh cache
