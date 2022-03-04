---
title: Primitive VS non-premitive values in javascript
description: in this article you'll learn how javascript deal with different data types
img: /media/blogs/primitive.jpg
imgCaption: "JavaScript: values vs reference by @cmarghin"
darkClr: "#ffdd07"
tags:
  - post
  - javascript
  - featured
---
In javascript there are two main categories of data types, the first category called **primitive data types** which contains `string`, `boolean`, `number`, `null`, `undefined`, `bigInt`, `Symbol`. The second category called **Non-primitive values**, or Objects (and by objects I mean `Object`, `array`, `function` data types)

Let's start with some examples, so in the end we'll explain them.

```javascript
let a = [1, 2, 3];
let b = a; // [1, 2, 3]

// now let's change the first index of b
b[0] = 9; // [9, 2, 3]

console.log(a) // => [9, 2, 3] but how ???

/*
 * we have changed the array b and we notice
 * that array a has changed too
 */
let x = []
let y = []
let z = y;
console.log(x == y) // false
console.log(y == z) // true
// read the article and you will understand the reason
// behind that weird results
```

## How Javascript handle Primitive Data Types

Values that contains one of those primitive data types are called **static data**, and javascript store static data in **the stack**.

> The stack is a place inside the memory where javascript stores only static data, and also can store the refernce for other data types like objects. the reference is the adress that points to the value of our non-primitive value and we'll see that later.
>
> static data has one thing in common, their size is fixed, so javascript knows their size and how much it'll allocate in the memory, this called *static memory allocation* you can learn more about memory life cycle in [This article by Alex devero](https://blog.alexdevero.com/memory-life-cycle-heap-stack-javascript/)

If I create a variable with static data and assign it to another variable, javascript will copy the value of the first variable to the second variable, in this case we pass value by value, resulting in two variables in the stack with two distinct values. 

**Example:**

```javascript
let var1 = 10;
let var2 = var1;
// now var1 has value 10 and var2 has the same value

// ==== think of THE STACK as a table that contains name and values of a variable =====
/*
name    | value   |
--------|---------|
var1    |    10   | 
var2    |    10   |
*/
```

As you can see, if we assign a variable containing static data to another variable, javascript creates a new place for that variable in the stack and assigns it the same value as the first variable. If I change one of the variables, it will only affect that variable and will not affect the other variable because they are two separated values.
Isn't it simple? 

```javascript
let a = 10;
let b = a;
b += 15;
console.log(a) // 10
console.log(b) // 25
```

## What About Non-primitive Values ?

Well, any value that is not a primitive value is technically an Object, including arrays and functions. And javascript doesn't store their value in the memory stack, instead their value is stored in the **memory heap**,

> When it comes to memory heap, JavaScript doesn’t allocate fixed amount of memory. Instead, it allocates memory as needed at the moment. This type of memory allocation is called “dynamic memory allocation”. 
>
> *from [alex devero](https://blog.alexdevero.com/memory-life-cycle-heap-stack-javascript/#the-memory-heap)*

and the variable will not contain the value of that object, but rather the **reference** to that object.
And the reference is stored in the memory stack as an address that points to the value of the object in the heap. 

**Example:**

```javascript
let person = {
  name: 'charaf',
  age: 19
}

// ===== THE STACK ======= //
/*
    name      | value     | reference
    --------  |---------  |-----------
    person    |           | #1
*/
// ===== THE HEAP ====== //
/*
    reference | value
    ----------|----------
    #1        |  {
              |   name: "charaf",
              |   age: 19
              | }
*/
```

As you can see, the person variable has a reference (for example #1), and that reference points to the value that is stored in the heap, so assigning a variable that contains a non-primitive value to another variable is equivalent to copying the value's reference to another variable *'in this case, you're passing value by reference'*. 

Now it's time to explain the first examples in this code snippet 

```javascript
let a = [1, 2, 3];
// ==== the stack =======
/*
  name      | value     | reference
  --------  |---------  |-----------
  a         |           | #10
*/
// ===== the heap =======
/*
   reference | value
    ----------|----------
    #10       |  [1, 2, 3]
*/
let b = a; // now b doesn't contain the value [1, 2, 3], but it contains the reference #10
// ==== the stack =======
/*
  name      | value     | reference
  --------  |---------  |-----------
  a         |           | #10
  b         |           | #10
*/


// now let's change the first index of b
b[0] = 9; // [9, 2, 3]
// I have changed the value that has the reference #10 ...
// while both a and b have the same reference then the value will change for both variables


console.log(a) // => [9, 2, 3] a also changed bcs it have the same reference as b

/*
 * we have changed the array b and we notice
 * that array a has changed too
 */
let x = [] // new non-primitive value means new reference .. for example #11
let y = [] // for example #12
let z = y; // has the same reference as y #12
console.log(x == y) // false bcs both don't point to the same value
console.log(y == z) // true bcs both point to the same value
```

## Tricky Functions

Understanding these concepts can sometimes help you avoid unexpected bugs. One of them is passing a value as a function argument, for primitive data types this is like passing by value so if you try to change the value passed to a function it will only change the value of the parameter in the function, the value of that variable remains the same

**Example**

```javascript
let me = 'charaf';

function change(name) {
  name = 'cmarghin';
}
change(me)
console.log(me) // 'charaf' .. didn't change
```

But this is not true if we pass a non-primitive value as argument. the function will change the initial value because we are passing by reference, not by value.

**Example**

```javascript
let friends = ['reda'];

function addFriends(list) {
  list.push('javascript')
}

addFriends(friends)

console.log(friends) // ['reda', 'javascript']
```

## Conclusion

As I said, understanding how javascript works behind the scene will prevent you from making some unexpected bugs, and you can easily read, understand, and compile the code in your head, so you can debug it faster and make it clear.