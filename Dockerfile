# Use the official Node.js image as the base image for the build
FROM node:18.10.0-alpine AS build

# Set up a working folder inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the working folder
COPY package.json package-lock.json ./

# Install dependencies using npm
RUN npm install

# Copy source code to container
COPY . .

# Copy the source code into the container
RUN npm run build

# New stage using Nginx image to host static content
FROM nginx:mainline-alpine-slim

# Copy the Nginx configuration to the correct folder
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the compiled frontend from the previous stage to the Nginx folder
COPY --from=build /usr/src/app/dist/trek-client /usr/share/nginx/html
