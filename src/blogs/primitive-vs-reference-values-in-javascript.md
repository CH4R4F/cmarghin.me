---
title: Primitive VS reference values in javascript
description: There are two kind of values in javascript, primitive and
  non-primitive or reference values ...
img: /media/blogs/javascript-values.jpg
imgCaption: image contains "JAVASCRIPT Stack vs Heap"
darkClr: "#ffdd07"
tags:
  - post
  - featured
  - javascript
---
This is my first blog and I really want to talk about a problem I had when I wanted to copy an object (using the assignment operator `=`, I didn't know yet about `constructors` and `deep copy`), so what happens is when I tried to change some properties in the copied object it also changes the property of the original object,\
take an example

```javascript
let me = {
    name : "charaf"
};

//trying to copy my abject to another object and then edit it
let you = me;
you.name = "reader";

console.log(me)
console.log(you)
```