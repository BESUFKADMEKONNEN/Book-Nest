import redis from "@/database/redis";
import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above
import { Redis } from "@upstash/redis";

// Create a new ratelimiter, that allows 5 requests per 2m
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(5, "120 s"),
  // limiter: Ratelimit.fixedWindow(5, "2m"),
  analytics: true,

  prefix: "@upstash/ratelimit",
});

export default ratelimit;
