# Step 1 — Use lightweight Nginx image
FROM nginx:alpine

# Step 2 — Remove default Nginx page
RUN rm -rf /usr/share/nginx/html/*

# Step 3 — Copy your project files into the container
COPY . /usr/share/nginx/html

# Step 4 — Copy your custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Step 5 — Expose port 80
EXPOSE 80

# Step 6 — Start Nginx
CMD ["nginx", "-g", "daemon off;"]