# Step 1: Choose the base image with the version of Node.js that suits your project
FROM node:16

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock) to leverage Docker cache
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of your application code
COPY . .

# # Step 6: Expose the port your app runs on
# EXPOSE 3001 TODO: NOT NEEDED

# Step 7: Define the command to run your app
CMD ["npm", "run", "dev"]