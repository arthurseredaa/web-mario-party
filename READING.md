# Що читати і що тримати під рукою

Стек: pnpm workspaces · Express + Socket.IO (`apps/server`) · React + Vite (`apps/screen`,
`apps/controller`) · `packages/shared` (типи подій + zod) · Postgres + Drizzle · Vitest · пізніше
Redis і Docker.

**Правило:** «Прочитати» — до початку етапу, це кілька розділів, а не курс. «Під рукою» — не читати
наперед, відкривати, коли впреться.

---

## Завжди під рукою

| Що | Посилання |
|---|---|
| Express: middleware (що за чим виконується) | <https://expressjs.com/en/guide/using-middleware.html> |
| Express: routing | <https://expressjs.com/en/guide/routing.html> |
| Socket.IO: emit cheatsheet (хто кому відправляє) | <https://socket.io/docs/v4/emit-cheatsheet/> |
| Socket.IO: типізація подій у TS | <https://socket.io/docs/v4/typescript/> |
| zod | <https://zod.dev/> |
| tsconfig — довідник опцій | <https://www.typescriptlang.org/tsconfig/> |

---

## Етап 1 — Монорепо і сетап

**Прочитати:**

- pnpm → [Workspaces](https://pnpm.io/workspaces) (особливо `workspace:` protocol) і
  [Filtering](https://pnpm.io/filtering) (`--filter`, `-r`)
- TS → [Project References](https://www.typescriptlang.org/docs/handbook/project-references.html):
  як один пакет бачить типи іншого
- Express → [Hello world](https://expressjs.com/en/starter/hello-world.html)

**Під рукою:** [Vite server options](https://vite.dev/config/server-options) (`server.host`, щоб
телефон бачив dev-сервер).

---

## Етап 2 — Кімнати і лобі

**Прочитати:**

- Socket.IO → [Tutorial](https://socket.io/docs/v4/tutorial/introduction) (кроки про Express і
  базове підключення) і [Server initialization](https://socket.io/docs/v4/server-initialization/):
  як Socket.IO сідає на HTTP-сервер Express
- Socket.IO → [Rooms](https://socket.io/docs/v4/rooms/) і
  [Emitting events](https://socket.io/docs/v4/emitting-events/) (включно з acknowledgements)
- Socket.IO → [How to use with React](https://socket.io/how-to/use-with-react): де створювати сокет,
  щоб він не плодився на кожен ререндер

**Під рукою:**

- [Client initialization](https://socket.io/docs/v4/client-initialization/)
- [Troubleshooting connection issues](https://socket.io/docs/v4/troubleshooting-connection-issues/),
  коли телефон не конектиться (CORS, IP, порт)
- [Admin UI](https://socket.io/docs/v4/admin-ui/): видно кімнати й сокети наживо

---

## Етап 3 — Протокол, валідація, надійність

**Прочитати:**

- Socket.IO → [TypeScript](https://socket.io/docs/v4/typescript/): мапи подій
  `ClientToServerEvents` / `ServerToClientEvents` у `shared`
- Socket.IO → [Middlewares](https://socket.io/docs/v4/middlewares/): auth на рівні підключення,
  токен гравця
- Socket.IO → [Connection state recovery](https://socket.io/docs/v4/connection-state-recovery) і
  [Delivery guarantees](https://socket.io/docs/v4/delivery-guarantees): що Socket.IO відновлює сам,
  а що ні
- zod → [Basic usage](https://zod.dev/) (`safeParse`): валідація payload'у в кожному обробнику події
- Express → [Error handling](https://expressjs.com/en/guide/error-handling.html): для HTTP-частини

**Під рукою:** TS → [Narrowing / discriminated unions](https://www.typescriptlang.org/docs/handbook/2/narrowing.html);
Socket.IO → [How it works](https://socket.io/docs/v4/how-it-works/) (heartbeat, `pingInterval` /
`pingTimeout`).

**Пам'ятай:** Socket.IO перепідключає **сокет**, а не **гравця**. «Той самий гравець після
блокування телефону» — твоя логіка.

---

## Етап 4 — Машина станів і тести

**Прочитати:**

- [Vitest Guide](https://vitest.dev/guide/) → Getting Started
- Vitest → [Mocking](https://vitest.dev/guide/mocking): детермінований кубик

**Під рукою:** ігрова логіка — чисті функції без Express і Socket.IO, тож для її тестів нічого,
крім Vitest, не потрібно.

---

## Етап 5 — Postgres, Drizzle, журнал подій

**Прочитати:**

- Drizzle → [Overview](https://orm.drizzle.team/docs/overview),
  [Migrations](https://orm.drizzle.team/docs/migrations),
  [Transactions](https://orm.drizzle.team/docs/transactions)

**Під рукою:** Node → [`--env-file`](https://nodejs.org/api/cli.html#--env-fileconfig) або `dotenv`
для `.env`; закрити пул з'єднань на shutdown (`SIGTERM` → `pool.end()`).

---

## Етап 6 — Мініігра

Окремих доків нема, тут думати. Під рукою: Socket.IO → [Emitting events](https://socket.io/docs/v4/emitting-events/)
(acknowledgements зручні, щоб міряти round-trip до телефону).

---

## Етап 7 — SQL глибше

**Прочитати:**

- Postgres → [Window Functions tutorial](https://www.postgresql.org/docs/current/tutorial-window.html)
- Postgres → [Using EXPLAIN](https://www.postgresql.org/docs/current/using-explain.html)

**Під рукою:** [Use The Index, Luke](https://use-the-index-luke.com/), найкраще пояснення індексів;
[Postgres → Indexes](https://www.postgresql.org/docs/current/indexes.html).

---

## Етап 8 — Redis і кілька інстансів

**Прочитати:**

- Socket.IO → [Using multiple nodes](https://socket.io/docs/v4/using-multiple-nodes/): **sticky
  sessions**, без них нічого не запрацює
- Socket.IO → [Redis adapter](https://socket.io/docs/v4/redis-adapter/)

**Під рукою:** [Redis docs](https://redis.io/docs/latest/).

---

## Етап 9 — Деплой

**Прочитати:** Docker → [Multi-stage builds](https://docs.docker.com/build/building/multi-stage/).

**Під рукою:** [GitHub Actions](https://docs.github.com/en/actions);
для логів на сервері — [pino](https://getpino.io/) (коли `console.log` стане замало).
