const express = require("express");
const session = require("express-session");
const path = require("path");
const env = require("./config/env");
const paths = require("./config/paths");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// Middleware resiliente de parsing JSON compatível com Express 5 e Vercel Serverless
app.use((req, res, next) => {
    if (req.body && typeof req.body === "object") {
        return next();
    }
    let data = "";
    req.on("data", chunk => {
        data += chunk;
    });
    req.on("end", () => {
        if (data) {
            try {
                req.body = JSON.parse(data);
            } catch {
                req.body = {};
            }
        }
        next();
    });
    req.on("error", () => {
        next();
    });
});
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            sameSite: "lax",
            secure: env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 8 // 8 horas
        }
    })
);

// Assets gerados pelo Vite em produção ou fontes do frontend em desenvolvimento.
app.use(express.static(paths.PUBLIC_DIR, { index: false }));

// Rotas de API (suporta com e sem prefixo /api em serverless)
app.use("/api", routes);
app.use(routes);

// Fallback da SPA React para rotas do frontend.
app.use((req, res, next) => {
    if (req.method !== "GET" || req.path.startsWith("/api")) return next();
    res.sendFile(path.join(paths.PUBLIC_DIR, "index.html"));
});

// Error Handler Centralizado
app.use(errorHandler);

module.exports = app;
