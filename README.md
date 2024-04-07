# Scroll Table

This app is used to display large amounts of data in table format without lagging on older browsers.

## General solution and assumptions

To render optimal table goal is to display only visible rows plus extra few for buffer at the beginning of the list and at the end. Then position visible rows in container that has fixed height (assuming that each row has same height). When scrolling visible rows indexes needs to be changed based on our scroll position.
For better UI also had to fixate table column widths, since while scrolling value length increases. Also use `position: sticky` to freeze first row.

example data to download:
- [json url 18MB](https://t9017069553.p.clickup-attachments.com/t9017069553/79c97fbe-a008-45ad-a350-6296629804e7/huge_18MB.json)
- [json url 6MB](https://t9017069553.p.clickup-attachments.com/t9017069553/fad65577-b776-4f95-8204-e552e0e57469/huge_6MB.json)

## Requirements

- node with npm (versions are defined in package.json)

*recommending to use [nvm](https://github.com/nvm-sh/nvm) to install node

## Local Setup

In project folder run these commands:

``` npm install ```

``` npm run dev ```
