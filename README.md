# Local Sandbox

This is a sandbox environment where you can develop, test and generate your HTML, CSS, & JS files for your web application. You can also use this toolkit as a base for your production environment.

## Getting Started

### Download / Clone

Start by cloning or downloading the source files.

Clone the repo using Git:

```bash
git clone https://github.com/amardeeprai/local-sandbox.git
```

Alternatively you can [download](https://github.com/amardeeprai/local-sandbox/archive/master.zip)
this repository.

### Install required modules

Open your terminal window and change into the source diectory where you have cloned or downloaded the repo to. Run the command:

```
npm install
```

NOTE:You will need [node.js](https://nodejs.org/) installed on your computer before you can run this command.

### Initialise the environment

Open your terminal window and change into the source diectory where you have cloned or downloaded the repo to.

Once all of the required node modules have been downloaded and installed, run the command

```
gulp
```

This will generate the HTML, CSS, & JS files.

### Start your local environment

Open your terminal window and change into the source diectory where you have cloned or downloaded the repo to.

Run the command

```
gulp browser
```

This will startup your local environment using your default browser. On the terminal window it will also give you access urls for the local environment e.g. http://localhost:3000, http://192.168.1.164:3000

NOTE: if your mobile, tablet, & desktop devices are connected to the same network, you can use the latter of the access urls to sync your browsers to the same page (useful when you are testing). See [https://www.browsersync.io/](https://www.browsersync.io/) for more details.

### Making changes to HTML, CSS, & JS files

In the 'src' directory you can edit and/or add files.

If you add new files while you are running 'gulp browser', you will need to stop and start the command. However, if you are only amending files in the 'src' directory, changes to the files will automatically be picked up and your local browsers should automatically update with the changes.

You can use HTML partials when creating layouts. You should place any HTML partials in the directory 'src/partials/'. The full HTML pages will be compiled when 'gulp' or 'gulp pages' is run. Refer to: [https://www.npmjs.com/package/gulp-file-include](https://www.npmjs.com/package/gulp-file-include) for more instructions on using partials.

The minified CSS file is compiled from SASS files in the 'src' directory. To add or amend the css of your environment, you can add more SASS files int he 'src' directory (you will need to link any SASS files yo create to the main 'src/assets/stylesheet.scss' file).

If you add any new JS files in the 'src' directory, you will also need to define the file locations in the 'gulpfile.babel.js file on line 53. E.g.

```
const SOURCES = [
  'src/assets/scripts.js',
  // add any additional JS files you create here
  'src/assets/another-file-1.js',
  'src/assets/sub-dir/another-file-2.js',
];
```

### Viewing compiled HTML, CSS, & JS files

You can view all of the complied files by going to the 'dist' directory.

### Generating ALL files (HTML, CSS, JS, & images)

You can generate ALL files by running the following command:

```
gulp
```

NOTE: this can only be run from the directory where you have cloned or downloaded the repo to.

### Generating HTML files

You can generate HTML files by running the following command:

```
gulp pages
```

NOTE: this can only be run from the directory where you have cloned or downloaded the repo to.

### Generating CSS files

You can generate CSS files by running the following command:

```
gulp styles
```

NOTE: this can only be run from the directory where you have cloned or downloaded the repo to.

### Generating JS files

You can generate JS files by running the following command:

```
gulp scripts
```

NOTE: this can only be run from the directory where you have cloned or downloaded the repo to.

### Generating image files

You can generate image files by running the following command:

```
gulp images
```

NOTE: this can only be run from the directory where you have cloned or downloaded the repo to.

## License

Copyright 2017 Amardeep Rai. Licensed under an
[Apache-2](https://github.com/amardeeprai/local-sandbox/blob/master/LICENSE)
license.
