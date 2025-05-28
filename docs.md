🔧 worker_connections — What is it?
It defines the maximum number of simultaneous connections that a single NGINX worker process can handle.

You'll usually see it in the events block of your nginx.conf:

events {
    worker_connections 1024;
}
🔁 So what does that mean in practice?
Let’s say:

You have worker_processes 4;

You have worker_connections 1024;

🔢 That means:

Each worker can handle 1,024 connections


So NGINX can handle up to 4,096 simultaneous connections (in theory)


Total connections ≈ worker_processes × worker_connections
🧠 Keep in mind: connections include not just user requests, but also:

Keep-alive connections

WebSocket connections

Connections to upstream servers

⚠️ But wait, there’s a catch…
You're also limited by:

OS limits (like ulimit -n, which restricts open file descriptors per process)

NGINX’s use of file descriptors for sockets

So even if you set worker_connections high, the OS might prevent it from handling that many unless you tune your system settings.

✅ Example Config (with auto tuning)

worker_processes auto;

events {
    worker_connections 2048;
    use epoll;  # Linux-specific: use efficient event model
}
🧪 Summary
Term	Meaning
worker_processes	Number of OS processes to handle traffic
worker_connections	Max connections per worker process
Combined	Total simultaneous connections NGINX can handle
Real-world tuning	Needs to consider OS limits (e.g., file descriptors, memory, CPU cores)
