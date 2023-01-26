FROM node
RUN apt update
RUN apt install -y golang-go
RUN apt install -y default-jre
WORKDIR /app
COPY package.json .
RUN npm install
COPY . . 
CMD ["npm", "start"]    