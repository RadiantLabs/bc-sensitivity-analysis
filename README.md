## Node.js environment

```
nvm install 20  # if not yet installed
nvm use 20 # node.js 20 LTS
```

## Run dev

Make sure assets are built (which are checked into git)

```
npm run buildAssets
```

Run during develoment (hot module reloading)

```
npm run dev
```

## Run production

Make sure assets are built (which are checked into git)

```
npm run buildAssets
```

Run normal JS build process

```
npm run build
```

## Datastore

Uses a single Zustand datastore for global state management
Can use Redux devtools in Chrome to view and manipulate state

## Notes

Top ranked inputs to model: To find top ranked, sort by cumulative std dev

## Resources

This was built with Vite.
Build process detailed: https://vitejs.dev/guide/build
