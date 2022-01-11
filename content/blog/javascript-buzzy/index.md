---
title: "Weird Javascript: Buzzy statement"
date: "2017-02-10T02:22:00Z"
author: "Borys Generalov"
---

## Buzzy statement

Once I came across this weird statement written in Javascript:

```Javascript
++[[]][+[]]+[+[]]
```

Being sure that I am pretty good in Javascript, I was trying to figure out whether or not this weird statement is valid. If so, what is the result?

Let's sort it out together. In order to decode the statement we should split it into the parts. At first glance, you would split it on four groups as following:

<span style="background-color: #3598ff; color:#fff">++[[]][</span> + <span style="background-color: #3598ff; color:#fff">[]]</span> + <span style="background-color: #3598ff; color:#fff"> [</span> + <span style="background-color: #3598ff; color:#fff"> []] </span>

However, the correct break-down would be two groups as follows:

<span style="background-color: #3598ff; color:#fff">++[[]][+[]]</span> + <span style="background-color: #3598ff; color:#fff">[+[]]</span>

The statement consists of two parts: leftmost and righmost. Now, the easiest part to analyze is the rightmost. Let's have a look closer. We are dealing with one-element array declared in a literal way, check this out:

[<span style="background-color: #3598ff; color:#fff">+[]</span>] == [<span style="background-color: #3598ff; color:#fff">x</span>] == new Array(x)

And how to explain this statement inside the array:

+[]

The main hint here is the operator +. A statement written in such way is interpreted by JavaScript as a number, because + acts as unary operator:

+[] == Number([])

Outputting this via alert() function get us 0, i.e. converting an empty array to a number returns 0. Here is how the function Number() works:

Attempts to convert an array to Javascript primitive type by calling internal toPrimitive() function
In turn, toPrimitive function triggers valueOf() function. If result is primitive, return it
Otherwise, calls toString() function. Return primitive (if any)
Apply toNumber() to the result
Simply, [].valueOf() returns the array itself. Then the call [].toString() is made, which returns an empty string which, in turn is converted to 0 by calling ToNumber() internal function. So that the rightmost part can be re-written as follows:

[<span style="background-color: #3598ff; color:#fff">+[]</span>] == [<span style="background-color: #3598ff; color:#fff">0</span>]

Now, the process is pretty similar to what we have already seen and we do know that the result of this single statement is also 0*. Let's take a look at the leftmost part of the statement and pay attention to its rightmost part. The statement can be transformed as this:

<span style="background-color: #ff6a35; color:#fff">++[[]] </span> <span style="background-color: #3598ff; color:#fff">[+[]]</span> + <span style="background-color: #3598ff; color:#fff">[+[]]</span> == <span style="background-color: #ff6a35; color:#fff">++[[]] </span> <span style="background-color: #3598ff; color:#fff">[0]</span> + <span style="background-color: #3598ff; color:#fff">[0]</span>

Surprisingly, here we are dealing with an array, yet again. Bear in mind that an empty array is converted to empty string or to the 0 when conversion to number takes place. Leftmost part of the statement is really simple now:

++[<span style="background-color: #3598ff; color:#fff">[]</span>][0] == ++[<span style="background-color: #3598ff; color:#fff">""</span>][0]

See? This is an array with an empty string where the indexing is applied, i.e. an element with 0 index is retrieved. Then the result is incremented by 1, which in turn causes its conversion to the number:

```Javascript
++[""][0] == ++0 == 1
```

Huray, here is the final statement:

++[[]][+[]] + [+[]] == ++0 + [0] == 1 + 0 == 10

Huh?? Ok, what's going on now? I am sure you did notice the * somewhere above. The righmost part was evaluated to 0, even more - to "0", which is a string. Hence we saw the string concantenation rather than numerical sum.

And as a bonus, can you explain the following results?

* ++[[1],[2]][+[]] = 2
* [1,2]+[3] = [1,23]
* (1,1,1)+(1,1,1)+(1,1,1) = 3