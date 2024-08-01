# TODO

## TaskEditor

- [x] When modal closed check if form is dirty and alert user about unsaved changes
- [x] Add 3d-model container
- [x] Add dnd into editor preview to move description lists and 3d-model containers
- [x] Edit 3d-model container modal
- [x] Fix touch drag handler
- [x] Clear form fields button
- [x] Delete list button
- [x] Fix model container drag button z index
  - [x] Maybe add drop shadow when cursor is above
- [x] Add R3F canvas skeleton
- [x] Check confirmation modal
- [x] Add color theme picker menu
- [x] Fix bug of changing color back to original when closing modal
- [x] Make colorpicker button change color faster
- [x] Add confirmation when updating and resetting all fields
- [x] Add confirmation also on delete
- [x] Shift model drag handler upward when mobile
- [x] Fix edit modal default material selection and dropped textures. Not it shows only pink
- [x] Fix confirmation bug. It wont directly close modal
- [ ] Allow removing dropped files and their URLs
- [ ] Fix bug loading texture showing above modal
- [ ] Make cool
  - [x] Container Dragging
  - [ ] Check CSS class usage from every file
  - [x] Fix broken component props related to model-viewer, textures, and dropzone
  - [x] Still a bug in touch with containers, they move without using draghandler
- [ ] Add Amazon connection
- [x] Add your own texture
- [ ] Add your own model

## Idea

- - Companies can advertise through wellness campaign actions and build unique kits and offers.
- Users can complete daily tasks ranging from super easy to super challenging, on a global or local scale.
- Users can create and share tasks. If they allow advertising, they receive a share of the ad revenue.
- Users can review tasks before publication, earning credits or money.
- Users can sell design services to companies for crafting 3D ad designs, keeping 100% of the contract value, while the platform takes a cut from ads.
- Each completed task features a celebratory animation with a dancing blob figure.
- The blob figure becomes more colorful as users complete tasks in categories such as body, brain, recovery, social interaction, reflection, and nutrition.
- Completed tasks can be easily shared on other social media channels.
- The brain category could include coding challenges similar to Advent of Code, with some encouraging the use of LLMs and others that do not.

## VERY IMPORTANT

- [ ] There was a bug that TaskCarousel gets jammed in the bottom task when transitioning from task listing viewer
- [ ] Remove Opitimistic updates tests - server action time outs that are commented
- [ ] Shader materials
  - [ ] Vary vertices movement into circles to create sparking effect
  - [ ] Try convoluting randonm plane with circles
- [ ] Do optimistic duplicate and check id task delete is optimistic remove latency
- [ ] Check also tasks mark swithc update through otimistic
- [ ] Refresh session token and alarm when token is expired
  - [x] Inform user that session token has expired
  - [ ] Update NextAuth token and session
  - [ ] Refresh FastAPI token
- [ ] Fix transition to top task bug in carousel view when changing category
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
