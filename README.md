# Why JavaScript / NodeJS?

I also have experience in Python for backends with Django and Flask, but I tend to only pick those when I'm doing something data-heavy that happens to have a particular Python package I'm looking to use. In this case where we're building a URL shortener and it's a web-centric task, JavaScript seems like the more natural fit, so I picked NodeJS for my backend.

# Add TypeScript?

Yes. It doesn't add much but helps.

# ORM?

Normally would, but for such a small project we could raw dog it since we'll just be doing straight lookups. If we do get an ORM I'd probably do Prisma or Drizzle.

# Database to Use

While I have 

# Front End – React vs. Templating Engine

While React is great to work in for larger frontends, for a small frontend like this with just 2 pages, it seemed a bit overkill to use React still. I still would have considered it, but realized that for such a simple frontend it would be much simpler to just do an HTML Templating Engine with EJS instead. This also keeps things a bit simpler being able to return HTML directly from the server rather than having to do all the extra networking boilerplate on the frontend. In a case like this where we have a small project and have a deadline and need to move quickly, a templating engine seemed like the obvious choice. If the project were to grow in frontend complexity, I'd reach for React.

# Which Templating Engine?

There's a lot of templating engine options but I don't need anything fancy so I like to just pick the most popular one so there's lots of community support and documentation, hence the choice in EJS.