# Що читати і що тримати під рукою

Стек: pnpm workspaces · NestJS + Socket.IO (`apps/server`) · React + Vite (`apps/screen`,
`apps/controller`) · `packages/shared` (типи подій + zod) · Postgres + Drizzle · Vitest · пізніше
Redis і Docker.

**Правило:** «Прочитати» — до початку етапу, це кілька розділів, а не курс. «Під рукою» — не читати
наперед, відкривати, коли впреться.

---

## Завжди під рукою

| Що | Посилання |
|---|---|
| Nest: request lifecycle (що за чим виконується) | <https://docs.nestjs.com/faq/request-lifecycle> |
| Nest: шпаргалка декораторів, «де яка логіка» | `~/Desktop/Nest-JS-Guide.pdf`, стор. 37–48 |
| Nest: WebSocket-гейтвеї | <https://docs.nestjs.com/websockets/gateways> |
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
- Nest → [First steps](https://docs.nestjs.com/first-steps)

**Під рукою:** [Vite server options](https://vite.dev/config/server-options) (`server.host`, щоб
телефон бачив dev-сервер).

**Пастка:** Nest CLI має свій «monorepo mode» (`nest g app`). Це **не** pnpm workspaces, не плутай.
Тут Nest — один звичайний застосунок в `apps/server`.

---

## Етап 2 — Кімнати і лобі

**Прочитати:**

- Nest → [Gateways](https://docs.nestjs.com/websockets/gateways): `@WebSocketGateway`,
  `@SubscribeMessage`, `handleConnection` / `handleDisconnect`
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
- Nest → WebSocket [Pipes](https://docs.nestjs.com/websockets/pipes),
  [Guards](https://docs.nestjs.com/websockets/guards),
  [Exception filters](https://docs.nestjs.com/websockets/exception-filters): те саме, що в
  `chapter_5`, але для сокетів (`WsException` замість `HttpException`)
- Socket.IO → [Middlewares](https://socket.io/docs/v4/middlewares/): auth на рівні підключення,
  токен гравця
- Socket.IO → [Connection state recovery](https://socket.io/docs/v4/connection-state-recovery) і
  [Delivery guarantees](https://socket.io/docs/v4/delivery-guarantees): що Socket.IO відновлює сам,
  а що ні

**Під рукою:** TS → [Narrowing / discriminated unions](https://www.typescriptlang.org/docs/handbook/2/narrowing.html).

**Пам'ятай:** Socket.IO перепідключає **сокет**, а не **гравця**. «Той самий гравець після
блокування телефону» — твоя логіка.

---

## Етап 4 — Машина станів і тести

**Прочитати:**

- [Vitest Guide](https://vitest.dev/guide/) → Getting Started
- Vitest → [Mocking](https://vitest.dev/guide/mocking): детермінований кубик

**Під рукою:** Nest → [Testing](https://docs.nestjs.com/fundamentals/testing). Знадобиться лише для
тестів сервісів. Сама ігрова логіка — чисті функції без Nest, їм `Test.createTestingModule` не
потрібен.

---

## Етап 5 — Postgres, Drizzle, журнал подій

**Прочитати:**

- Drizzle → [Overview](https://orm.drizzle.team/docs/overview),
  [Migrations](https://orm.drizzle.team/docs/migrations),
  [Transactions](https://orm.drizzle.team/docs/transactions)
- Nest → [Custom providers](https://docs.nestjs.com/fundamentals/custom-providers) і
  [Lifecycle events](https://docs.nestjs.com/fundamentals/lifecycle-events): як правильно віддати
  Drizzle-клієнт через DI і закрити пул на shutdown (порівняй з `DatabaseModule` у `chapter_5`)

**Під рукою:** Nest → [Configuration](https://docs.nestjs.com/techniques/configuration) (`.env`).

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
- Nest → [Adapters](https://docs.nestjs.com/websockets/adapter): як підключити Redis-адаптер у Nest

**Під рукою:** [Redis docs](https://redis.io/docs/latest/).

---

## Етап 9 — Деплой

**Прочитати:** Docker → [Multi-stage builds](https://docs.docker.com/build/building/multi-stage/).

**Під рукою:** [GitHub Actions](https://docs.github.com/en/actions),
Nest → [Logger](https://docs.nestjs.com/techniques/logger).
