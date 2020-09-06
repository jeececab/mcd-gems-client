# My climbing drills

### An open source social climbing training app

## Features

- Create your own training schedule and your own exercises with the available widgets
- Or, start from another user's template, or an available trainer's template
- Share your new template with the community
- Vote on other users training plans and exercises
- Log your trainings and see your progess over time
- Dynamic calendar with drag and drop features to move your training days and exercises around
- Build a profile and exchange with other passionate rock climbers

Note: it's mostly a personal project of mine to test some new stacks and technologies. I did a few different versions over the past few months, but I think this version will be my final chosen stack (GEMS - GraphQL, Express, MongoDB, Svelte)

If anybody's eventually interested in participating or see potential in that app, please contact me.

## Repos

There are two repos for this project, [one for the server](https://github.com/jeececab/mcd-gems-server) and [one for the client](https://github.com/jeececab/mcd-gems-client).

## Getting started

### Server

1. Install and setup a local MongoDB instance
2. Install and setup a local Redis instance
3. Clone the repo and run `npm install`
4. Run `npm run dev` to start the server.

### Client

1. Clone the repo and run `npm install`
2. Run `npm run dev`



---

# svelte app

This is a project template for [Svelte](https://svelte.dev) apps. It lives at https://github.com/sveltejs/template.

To create a new project based on this template using [degit](https://github.com/Rich-Harris/degit):

```bash
npx degit sveltejs/template svelte-app
cd svelte-app
```

*Note that you will need to have [Node.js](https://nodejs.org) installed.*


## Get started

Install the dependencies...

```bash
cd svelte-app
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.


## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).


## Single-page app mode

By default, sirv will only respond to requests that match files in `public`. This is to maximise compatibility with static fileservers, allowing you to deploy your app anywhere.

If you're building a single-page app (SPA) with multiple routes, sirv needs to be able to respond to requests for *any* path. You can make it so by editing the `"start"` command in package.json:

```js
"start": "sirv public --single"
```

## Using TypeScript

This template comes with a script to set up a TypeScript development environment, you can run it immediately after cloning the template with:

```bash
node scripts/setupTypeScript.js
```

Or remove the script via:

```bash
rm scripts/setupTypeScript.js
```

## Deploying to the web

### With [Vercel](https://vercel.com)

Install `vercel` if you haven't already:

```bash
npm install -g vercel
```

Then, from within your project folder:

```bash
cd public
vercel deploy --name my-project
```

### With [surge](https://surge.sh/)

Install `surge` if you haven't already:

```bash
npm install -g surge
```

Then, from within your project folder:

```bash
npm run build
surge public my-project.surge.sh
```
