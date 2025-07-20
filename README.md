# nats\_JetStream 🚀

A sample Node.js project demonstrating how to use **NATS JetStream** with subject wildcards (e.g., `dot.*`), durable consumers.

---

## 🛠️ Setup

### Prerequisites

* Node.js v14+
* A running NATS server (local or remote, with JetStream enabled)
* Valid `NATS_USER` and `NATS_PASSWORD` environment variables

### Installation

```bash
docker run -d -p 4222:4222 -p 8222:8222 --name nats -ti nats:alpine3.22 --user ${NATS_USER} --pass ${NATS_PASSWORD} -js
```

```bash
git clone https://github.com/ismailassil/nats_jetStream.git
cd nats_jetStream
npm install
```

---

## 💻 Usage

Edit `.env` or set your environment variables:

```bash
// create .env file
NATS_USER=your_user
NATS_PASSWORD=your_pass
```

## ✅ Which Should You Use?

| Requirement           | Solution                |
| --------------------- | ----------------------- |
| Replay, durability    | JetStream pull consumer |
| Lightweight real-time | Core NATS subscription  |
