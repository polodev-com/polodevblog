FROM node:23-alpine as base
# If issues persist with native modules, you might need build tools.
# RUN apk add --no-cache g++ make py3-pip libc6-compat
WORKDIR /app
COPY package*.json ./
EXPOSE 3000

FROM base as builder
WORKDIR /app
RUN npm ci
COPY . .
RUN npm run build


FROM node:23-alpine as production
WORKDIR /app
ENV NODE_ENV=production

# Copy package files first
COPY package*.json ./
# Install ONLY production dependencies
RUN npm ci --omit=dev

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Copy built application from the builder stage
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
CMD ["npm", "start"]