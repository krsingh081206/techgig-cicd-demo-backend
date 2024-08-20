FROM node:18-alpine
# Create app directory
RUN mkdir -p /usr/src/app

# Hence, the next commands will start executing from the "WORKDIR" directory.
WORKDIR /usr/src/app

# To copy both package.json and package-lock.json to the working directory of the Alpine image.
# Prior to copying the entire current working directory, we copy the package.json file to the working directory of the Alpine image. This allows to take advantage of any cached layers.
COPY package*.json ./


# install all the dependencies specified in the package.json file.
RUN npm install

COPY . .

# This command will copy all the files in the current directory to the working directory of the Alpine image.

EXPOSE 8080
# Make the application available on port 8080. By doing this, you can access the Nodejs application via port 8080.

CMD node index.js
