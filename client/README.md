# shuttr 📸

Have you ever wanted to take amazing photos but don’t know where to go to take them?
We have the solution for you.
We wanted to build an innovative app for the creatives who love to take aesthetic photos but did not know where the prime locations were.
Shutter allows users to build a community where they can discover pins around London, explore hashtags you are interested in, run location searches, share your own photos and view other pins on a map.

![Home](./public/images/shuttr_preview.gif)

<!-- Table of Contents -->

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Features](#features)
  - [To Add](#to-add)
- [Planning](#planning)
  - [User Stories](#user-stories)
  - [Stretch Goals](#stretch-goals)
  - [Tech stack](#tech-stack)
- [Challenges](#challenges)

<!-- Overview -->

Map:
![Map](./public/images/preview_map.png)

Feed:
![Map](./public/images/preview_feed.png)

Modal:
![Modal](./public/images/preview_modal.png)

<!-- Getting Started -->

## Getting Started

Clone this repo and move into the project directory.
Run `yarn install` to ensure all node modules are running.

```
$ git clone https://github.com/philsmithies/shuttr.git
$ cd shuttr
$ yarn
```

Initialize the server and then run it

```
$ cd server
$ yarn
$ yarn server
```

Once yarn is installed you can run the project on the client side using this code

```
$ cd ..
$ yarn start
```

Visit `http://localhost:3000/` to view the app

<p>&nbsp;</p>

<!-- Features -->

## Features

- Create an account
- Password strength bar.
- View full screen map of all the posts within the locations (just London for now....)
- Upload photos with GPS coordinates created by user.
- View a dynamic map of hashtags.
- Direct link to the location of the photo via a modal of the image.
- View own posts on yours and other users profile.
- Remain logged in (remember token)
- Log out

<!-- To Add -->

### To Add

- Comments and ability to post multiple images to the same location.
- Mobile friendly / PWA support.

<!-- Planning -->

## Planning and Approach

<!-- User Stories -->

### User Stories

```
As a user
so that I can find interesting locations
I would like to sign up to the website
```

```
As a user
Because I would like to be able to access my account
I would like to login.
```

```
As a user
So I can be part of the community
I would like to be able to upload photos
```

```
As a user
So I can see where the hotspots are
I would like to be able to see the locations of the photos
```

<div align="center">

---

[Top](#table-of-contents)

---

</div>
