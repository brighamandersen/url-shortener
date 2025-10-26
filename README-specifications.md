# Zaymo Take Home

Originally given on https://zaymo.notion.site/take-home.

### Time: 3-5 hours

We estimate this will take *at least* 3 hours. **Don’t spend more than 5 hours**, even if it isn’t completed. Just be ready to talk about the progress you made

### Problem

In email design, the size of the email matters. Deliverability is worse the larger an email is, and Gmail will clip any content over 200 KB.

One of the ways to decrease email size is by using a URL shortener. A URL shortener will replace URLs with a long path and/or lots of query parameters with a shorter version that points to the same content, saving on email size.

### Deliverable

Design and build a full-stack URL shortener. Don’t spend more than 3-5 hours. Send the result of your work (github repo, example files, etc, and a walk-through video or doc) to Danny.

### Specs

The URL shortener should

1. Take in an entire HTML email file. [Here](https://drive.google.com/file/d/1B69-m085K3AslH7VG20Jvgcyi4Omzgic/view?usp=sharing) is an example file you can use.
2. Find and replace all links in the template with shortened versions.
3. Return the replaced HTML file with functional, shortened links.

### What we are looking for

1. Ability to build full-stack. Points in this category for
    1. Architecture/Solution design. Why did you use the tools/stack that you used? Familiarity is a fair answer.
    2. Database design
    3. Being fully deployed (not running on localhost)
2. Design / UX sense. Points in this category for
    1. Does it look professional? A vanilla HTML input field is not ideal. Padding and layout matter.
    2. Is it easy to use?
3. Strong technical understanding. Points in this category for
    1. Understanding the pros and cons of the solution you built
    2. Understanding how your design would scale to handle 100k requests? How about 100m requests?

** You don’t need to do all of the above. Lean into your strengths. If I were to approach this problem, I would spend ~1 hour on research, ~30 minutes designing the UI, and ~1.5 hours on implementing the solution. I would choose where my time is best spent from the categories above. If deploying is going to take you 2 hours to figure out, it’s not worth doing. Take notes along the way and, at the end of 3-5 hours, just send me what you have.