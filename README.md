# Why JavaScript / NodeJS?

I also have experience in Python for backends with Django and Flask, but I tend to only pick those when I'm doing something data-heavy that happens to have a particular Python package I'm looking to use. In this case where we're building a URL shortener and it's a web-centric task, JavaScript seems like the more natural fit, so I picked NodeJS (with Express) for my backend.

# Full stack framework like Remix?

I considered using Remix for this project as I know that Zaymo uses Remix so that would be good practice. I've used Remix in a project or two as well, so I was pretty confident I could pick it back and and implement server side actions/loaders, but given the short time constraint I wanted to make sure I nailed the backend side of the project since that is where the most complexity is, and leaning on Express seemed like the better choice for a lightweight project. In my view, Remix shines for web apps where you have dashboard-like experiences where you have lots of unrelated data loading at once in case where you'd have multiple loading spinners and managing the state and making optimistic updates, but in our case we are just loading a shortened url file, so we wouldn't be using Remix to its fullest potential anyways.

# Add TypeScript?

Yes. It doesn't add much but helps.

# ORM?

Normally would, but for such a small project we could raw dog it since we'll just be doing straight lookups. If we do get an ORM I'd probably do Prisma or Drizzle.

# Database to Use

While I have experience with SQLite, we were asked to consider performance as it scales, and if this got tons of usage I could see this starting to bottleneck.

pro sqlite - I used SQLite because it’s lightweight and ideal for a small demo app. If this were deployed at scale, it would be trivial to swap in PostgreSQL using the same ORM layer

pro postgres -  I chose PostgreSQL to reflect a more production-ready setup. It gives me hosted persistence and would scale well if this app handled higher traffic.”

# Front End – React vs. Templating Engine

While React is great to work in for larger frontends, for a small frontend like this with just 2 pages, it seemed a bit overkill to use React still. I still would have considered it, but realized that for such a simple frontend it would be much simpler to just do an HTML Templating Engine with EJS instead. This also keeps things a bit simpler being able to return HTML directly from the server rather than having to do all the extra networking boilerplate on the frontend. In a case like this where we have a small project and have a deadline and need to move quickly, a templating engine seemed like the obvious choice. If the project were to grow in frontend complexity, I'd reach for React.

# Which Templating Engine?

There's a lot of templating engine options but I don't need anything fancy so I like to just pick the most popular one so there's lots of community support and documentation, hence the choice in EJS.