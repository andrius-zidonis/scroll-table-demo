# Scroll Table

This app is used to display large amounts of data in table format without lagging on older browsers.

## General solution and assumptions

To render optimal table goal is to display only visible rows plus extra few for buffer at the beginning of the list and at the end. Then position visible rows in container that has fixed height (assuming that each row has same height). When scrolling visible rows indexes needs to be changed based on our scroll position.

## Requirements

- node with npm (versions are defined in package.json)

*recommending to use [nvm](https://github.com/nvm-sh/nvm) to install node

## Local Setup

In project folder run these commands:

``` npm install ```

``` npm run dev ```
