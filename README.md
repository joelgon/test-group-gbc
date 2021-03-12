# Back-end

create a Schema in a mysql database and name group-gbc, this name is mandatory

## check the .env.example file

create a .env file exactly the same as .env.example and apply your connection information

### `installing the dependencies`

run the command yarn or npm install
### `migrations`

to create tables and also populates run the command `yarn typeorm migration:run -c db1Connection`

### `start the project`

start the backend with the command `yarn dev` or `yarn start`, if you prefer use `npm run start` or `npm run dev`

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
