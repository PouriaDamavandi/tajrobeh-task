# 🚀 Vite Module Federation Monorepo

A modern monorepo setup powered by **Turborepo** and **Vite Module Federation**, featuring a host application that dynamically integrates multiple remote micro-frontends.

## 📦 Applications

| Application         | Description                                   | Port   |
| ------------------- | --------------------------------------------- | ------ |
| **`container-app`** | Host application that consumes remote modules | `3000` |
| **`cart-app`**      | Remote application for cart functionality     | `3001` |
| **`products-app`**  | Remote application for product listings       | `3002` |

## 🛠️ Prerequisites

Ensure you have the following installed:

- **Node.js** >= 18.x
- **npm**, **yarn**, or **pnpm** (recommended)

## 🚀 Quick Start

### 1. Clone & Setup

```bash
git clone https://github.com/PouriaDamavandi/tajrobeh-task.git
cd tajrobeh-task
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm (recommended for Turborepo)
pnpm install
```

### 3. Development Workflow

#### Option A: Run All Applications Simultaneously

```bash
# Using Turborepo to run all apps in parallel
npm run dev
# or
pnpm dev
```

#### Option B: Run Applications Individually

```bash
# Terminal 1 - Start cart app (port 3001)
cd apps/cart-app && npm run dev

# Terminal 2 - Start products app (port 3002)
cd apps/products-app && npm run dev

# Terminal 3 - Start container app (port 3000)
cd apps/container-app && npm run dev
```

### 4. Build for Production

```bash
# Build all applications
npm run build

# Build specific application
npm run build -- --filter=container-app
```

## 📁 Project Structure

```
tajrobeh-task/
├── apps/
│   ├── cart-app/                 # Remote cart application
│   │   ├── src/
│   │   ├── package.json
│   │   └── vite.config.ts
│   ├── products-app/             # Remote products application
│   │   ├── src/
│   │   ├── package.json
│   │   └── vite.config.ts
│   └── container-app/            # Host application
│       ├── src/
│       ├── package.json
│       └── vite.config.ts
├── packages/
│   └── shared/                   # Shared utilities and components
│       ├── src/
│       └── package.json
├── turbo.json                    # Turborepo configuration
├── package.json                  # Root package.json
└── README.md
```

## ⚙️ Configuration Highlights

### Module Federation Setup

Each remote app exposes components via Vite Module Federation:

```javascript
// vite.config.js of remote apps
export default defineConfig({
  plugins: [
    federation({
      name: "cartApp",
      filename: "remoteEntry.js",
      exposes: {
        "./Cart": "./src/components/Cart.jsx",
      },
      shared: ["react", "react-dom"],
    }),
  ],
});
```

### Container App Configuration

```javascript
// vite.config.js of container app
export default defineConfig({
  plugins: [
    federation({
      name: "containerApp",
      remotes: {
        cartApp: "http://localhost:3001/assets/remoteEntry.js",
        productsApp: "http://localhost:3002/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom"],
    }),
  ],
});
```

## 🚦 Development Notes

- **Start order matters**: Remote apps should be running before the host app
- **Hot reloading**: Changes in remote apps will reflect in the host app automatically
- **Shared dependencies**: Common dependencies are shared to avoid duplication

## 📋 Available Scripts

| Command           | Description                                |
| ----------------- | ------------------------------------------ |
| `npm run dev`     | Start all applications in development mode |
| `npm run build`   | Build all applications for production      |
| `npm run preview` | Preview production build locally           |
| `npm run lint`    | Run linting across all applications        |

## 🛠️ Troubleshooting

### Common Issues

1. **Connection refused errors**: Ensure all remote apps are running on correct ports
2. **Module not found**: Check that exposed modules names match exactly
3. **Shared dependency conflicts**: Verify consistent versions in package.json files

### Port Conflicts

If ports are already in use, update the `vite.config.js` files:

```javascript
server: {
  port: 3000; // Change to available port
}
```

## 📚 Learn More

- [Vite Module Federation](https://github.com/originjs/vite-plugin-federation)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Micro-frontends Architecture](https://micro-frontends.org/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

---

**Note**: This setup demonstrates modern micro-frontend architecture using Vite Module Federation. For production deployment, consider using CDN hosting for remote entries and implementing proper versioning strategies.
