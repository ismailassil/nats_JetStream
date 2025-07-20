# nats\_jetStream 🚀

A sample Node.js project demonstrating how to use **NATS JetStream** with subject wildcards (e.g., `dot.*`), durable consumers.

---

## 🧩 Features

* Connects to a local NATS server using credentials.
* Shows how to:

  * Create or retrieve a JetStream consumer with a subject filter (e.g. `dot.*`).
  * Use **pull-based consumption** with durable consumers.
  * Perform **core NATS subscriptions** for lightweight, non-durable use cases.

---

## 🛠️ Setup

### Prerequisites

* Node.js v14+
* A running NATS server (local or remote, with JetStream enabled)
* Valid `NATS_USER` and `NATS_PASSWORD` environment variables

### Installation

```bash
git clone https://github.com/ismailassil/nats_jetStream.git
cd nats_jetStream
npm install
```

---

## 💻 Usage

Edit `.env` or set your environment variables:

```bash
export NATS_USER=your_user
export NATS_PASSWORD=your_pass
```

## ✅ Which Should You Use?

| Requirement           | Solution                |
| --------------------- | ----------------------- |
| Replay, durability    | JetStream pull consumer |
| Lightweight real-time | Core NATS subscription  |
