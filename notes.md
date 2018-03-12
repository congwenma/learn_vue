# Data and Methods

* when a Vue instance is created, it adds all properties found in `data` to Vue's `reactivity system`, when values of those properties change, the view will "react", updating the values.
* only `data` that existed during instantiation are `reactive`, so always initialize

# Event & Key Modifiers

! - .capture
~ - .once
~! - .capture.once
& - .passive

```js
on: {
  '!click': this.doThisInCapturingMode,
  '~keyup': this.doThisOnce,
  '~!mouseover': this.doThisOnceInCapturingMode
}
```

# Terms

`vm` - view model, refers to `Vue` instance
