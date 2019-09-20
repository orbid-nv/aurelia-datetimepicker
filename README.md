# `aurelia-datetimepicker`

## This project aims to provide an aurelia-friendly wrapper for the https://flatpickr.js.org/ datetimepicker

## This project is not production ready, we are still setting things up at this stage

### Dependencies, apart from the core aurelia modules:

```
flatpickr ^4.6.2
```

## Usage

### Configuration

import DatepickerConfig in **main.ts**

```typescript
import { DatepickerConfig } from "@orbid/aurelia-datetimepicker";
```

insert this code in the configure method in **main.ts**

```typescript
aurelia.use.plugin(
    "@orbid/aurelia-datetimepicker",
    (config: DatepickerConfig) => {
        config.dateFormat = "Y-m-d H:i";
        // all instantiated pickers will use these defaults,
        // unless they are overruled by a binding
    }
);
```

### example.html

```html
<template>
    <h1>Hello, this is an example for aurelia-datetimepicker</h1>
    <div>
        <or-datetimepicker
            o-disable.bind="disable"
            o-on-close.delegate="onClose($event.detail)"
            o-value.bind="date"
            o-date-format.bind="dateFormat"
            view-model.ref="flatpickrInstance"
        ></or-datetimepicker>
    </div>
</template>
```

### example.ts

```typescript
import { OrDatetimepicker } from "@orbid/aurelia-datetimepicker";
export class App {
    public date: Date = new Date();
    public mode: string = "single";
    public dateFormat: string = "m-d-Y";
    public flatpickrInstance: OrDatetimepicker;

    public onClose(detail) {
        console.log(detail);
    }

    // Disable every Saturday and Sunday
    public disable: any[] = [
        function(date) {
            return date.getDay() === 0 || date.getDay() === 6;
        }
    ];
}
```

### what makes this project :sparkles: special :sparkles:

We wanted to create a wrapper that exposes every single configuration element of flatpickr as a bindable property / custom event, instead of just wrapping the whole config object and making that bindable.
In order to do this, we generate most of our binding code based on the typings flatpickr provides with typedoc and handlebars.

## How to dev and run

This project is bootstrapped by [aurelia-cli](https://github.com/aurelia/cli).

This Aurelia plugin project has a built-in dev app (with CLI built-in bundler and RequireJS) to simplify development.

1. The local `src/` folder, is the source code for the plugin.
2. The local `dev-app/` folder, is the code for the dev app, just like a normal app bootstrapped by aurelia-cli.
3. You can use normal `au run` and `au test` in development just like developing an app.
4. You can use aurelia-testing to test your plugin, just like developing an app.
5. To ensure compatibility to other apps, always use `PLATFORM.moduleName()` wrapper in files inside `src/`. You don't need to use the wrapper in `dev-app/` folder as CLI built-in bundler supports module name without the wrapper.

Note aurelia-cli doesn't provide a plugin skeleton with Webpack setup (not yet), but this plugin can be consumed by any app using Webpack, or CLI built-in bundler, or jspm.

Note the folder structure is only to help you organising the files, it's not a requirement of Aurelia. You can manually create new element (or other thing) anywhere in `src/`.

After you added some new file, you need to register it in `src/index.ts`. Like this:

```js
config.globalResources([
    // ...
    PLATFORM.moduleName("./path/to/new-file-without-ext")
]);
```

The usage of `PLATFORM.moduleName` wrapper is mandatory. It's needed for your plugin to be consumed by any app using webpack, CLI built-in bundler, or jspm.

## Resource import within the dev app

In dev app, when you need to import something from the inner plugin (for example, importing a class for dependency injection), use special name `"resources"` to reference the inner plugin.

```js
import { autoinject } from "aurelia-framework";
// "resources" refers the inner plugin src/index.ts
import { MyService } from "resources";

@autoinject()
export class App {
    constructor(myService: MyService) {}
}
```

## Manage dependencies

By default, this plugin has no "dependencies" in package.json. Theoretically this plugin depends on at least `aurelia-pal` because `src/index.ts` imports it. It could also depends on more core Aurelia package like `aurelia-binding` or `aurelia-templating` if you build advanced components that reference them.

Ideally you need to carefully add those `aurelia-pal` (`aurelia-binding`...) to "dependencies" in package.json. But in practice you don't have to. Because every app that consumes this plugin will have full Aurelia core packages installed.

Furthermore, there are two benefits by leaving those dependencies out of plugin's package.json.

1. ensure this plugin doesn't bring in a duplicated Aurelia core package to consumers' app. This is mainly for app built with webpack. We had been hit with `aurelia-binding` v1 and v2 conflicts due to 3rd party plugin asks for `aurelia-binding` v1.
2. reduce the burden for npm/yarn when installing this plugin.

If you are a perfectionist who could not stand leaving out dependencies, I recommend you to add `aurelia-pal` (`aurelia-binding`...) to "peerDependencies" in package.json. So at least it could not cause a duplicated Aurelia core package.

If your plugin depends on other npm package, like `lodash` or `jquery`, **you have to add them to "dependencies" in package.json**.

## Build Plugin

Run `au build-plugin`. This will transpile all files from `src/` folder to `dist/native-modules/` and `dist/commonjs/`.

For example, `src/index.ts` will become `dist/native-modules/index.js` and `dist/commonjs/index.js`.

Note all other files in `dev-app/` folder are for the dev app, they would not appear in the published npm package.

## Consume Plugin

By default, the `dist/` folder is not committed to git. (We have `/dist` in `.gitignore`). But that would not prevent you from consuming this plugin through direct git reference.

You can consume this plugin directly by:

```shell
npm i github:your_github_username/aurelia-datetimepicker
# or if you use bitbucket
npm i bitbucket:your_github_username/aurelia-datetimepicker
# or if you use gitlab
npm i gitlab:your_github_username/aurelia-datetimepicker
# or plain url
npm i https:/github.com/your_github_username/aurelia-datetimepicker.git
```

Then load the plugin in app's `main.ts` like this.

```js
aurelia.use.plugin("aurelia-datetimepicker");
// for webpack user, use PLATFORM.moduleName wrapper
aurelia.use.plugin(PLATFORM.moduleName("aurelia-datetimepicker"));
```

The missing `dist/` files will be filled up by npm through `"prepare": "npm run build"` (in `"scripts"` section of package.json).

Yarn has a [bug](https://github.com/yarnpkg/yarn/issues/5235) that ignores `"prepare"` script. If you want to use yarn to consume your plugin through direct git reference, remove `/dist` from `.gitignore` and commit all the files. Note you don't need to commit `dist/` files if you only use yarn to consume this plugin through published npm package (`npm i aurelia-datetimepicker`).

## Publish npm package

By default, `"private"` field in package.json has been turned on, this prevents you from accidentally publish a private plugin to npm.

To publish the plugin to npm for public assumption:

1. Remove `"private": true,` from package.json.

2. Pump up project version. This will run through `au test` (in "preversion" in package.json) first.

```shell
npm version patch # or minor or major
```

3. Push up changes to your git server

```shell
git push && git push --tags
```

4. Then publish to npm, you need to have your npm account logged in.

```shell
npm publish
```

## Automate changelog, git push, and npm publish

You can enable `npm version patch # or minor or major` to automatically update changelog, push commits and version tag to the git server, and publish to npm.

Here is one simple setup.

1. `npm i -D standard-changelog`. We use [`standard-changelog`](https://github.com/conventional-changelog/conventional-changelog) as a minimum example to support conventional changelog.

-   Alternatively you can use high level [standard-version](https://github.com/conventional-changelog/standard-version).

2. Add two commands to `"scripts"` section of package.json.

```
"scripts": {
  // ...
  "version": "standard-changelog && git add CHANGELOG.md",
  "postversion": "git push && git push --tags && npm publish"
},
```

3. you can remove `&& npm publish` if your project is private

For more information, go to https://aurelia.io/docs/cli/cli-bundler

## Run dev app

Run `au run`, then open `http://localhost:9000`

To open browser automatically, do `au run --open`.

To change dev server port, do `au run --port 8888`.

## Unit tests

Run `au test` (or `au karma`).

To run in watch mode, `au test --watch` or `au karma --watch`.
