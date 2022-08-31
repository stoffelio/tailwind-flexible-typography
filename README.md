# Tailwind Flexible Typography

This Tailwind plugin uses a very opinionated but highly flexible approach to creating global typography classes.

It was built to fit my personal workflow and projects, but could be adapted to other approaches as well.

Note that it's still a work in progress, some much needed code cleanup coming (hopefully) soon.

## Features:

* Freely add classes to any selectors and multiple selectors at once
* Add any styling attributes you might need
* Use fluid typography - font size, bottom margin, and line height continously adapt to the screensize within given boundaries
* Add special prefixed and postfixed styles where needed

## Setup

Easily install just like any other Tailwind plugin.

1. Add it to you project via npm:

    `npm install @stoffelio/tailwind-flexible-typography`

2. Add it to you Tailwind plugin array in tailwind.config.js
    ```
    plugins: [
        require('@stoffelio/tailwind-flexible-typography')({
            // parameters
        }),
    ],
    ```
3. Add all parameters to your personal liking

## Required parameters

In order for the plugin to work you need to submit the styles you want to add to your stylesheet as a fontStyles object. 

Here's an example input to follow. The `h1` has fluid values and a different color depending on the parent class, the `p` styles are the same on all screens but last-child paragraphs have no bottom margin.

```
fontStyles: {
    h1: {
        selectors: ["h1", ".h1"],
        styles: {
            fontSize: ["2.4rem", "3.2rem"],
            lineHeight: ["1.2", "1.1"],
            marginBottom: ["1rem", "1.25rem"],
            fontWeight: "600",
        },
        prefixedStyles: [
            {
                prefix: ".dark-bg ",
                styles: {
                    color: "#FFFFFF",
                },
            },
            {
                prefix: ".light-bg ",
                styles: {
                    color: "#000000",
                },
            },
        ],
    },

    p: {
        selectors: ["p", ".p"],
        styles: {
            fontSize: "1.1rem",
            lineHeight: "1.4",
            marginBottom: "1.1rem",
        },
        postfixedStyles: [
            {
                postfix: ":last-child",
                styles: {
                    marginBottom: 0,
                },
            },
        ],
    },
},
```

## Optional parameters

For the fluid values you can overwrite the default breakpoints by adding accordingly named parameters.

__bpMin__: fluid values start growing at this resolution, smaller screens use the min value (default: 40rem)

__bpMax__: fluid values stop growing at this point, any larger screen gets the max value (default: 64rem)

__bpFallback__: for older browser this fallback will switch from the min to the max value at this breakpoint (default: 48rem)