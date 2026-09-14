const express = require("express");
const session = require("express-session");
const path = require("path");
const env = require("./config/env");
const paths = require("./config/paths");
const routes = require("./routes");
const { protegerPaginaAdmin } = require("./middlewares/auth");
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

// Páginas administrativas protegidas
app.get("/admin.html", protegerPaginaAdmin, (req, res) => {
    res.sendFile(path.join(paths.PUBLIC_DIR, "admin.html"));
});
app.get("/editor-aula.html", protegerPaginaAdmin, (req, res) => {
    res.sendFile(path.join(paths.PUBLIC_DIR, "editor-aula.html"));
});
app.get("/editor-exercicio.html", protegerPaginaAdmin, (req, res) => {
    res.sendFile(path.join(paths.PUBLIC_DIR, "editor-exercicio.html"));
});

// Arquivos estáticos da pasta public (sem index automático para respeitar a raiz)
app.use(express.static(paths.PUBLIC_DIR, { index: false }));

// Aliases e índices públicos compatíveis com o ambiente local e com as rewrites do Vercel
app.get(["/pages", "/pages/"], (req, res) => {
    res.redirect("/");
});

app.get(["/professor", "/professor/"], (req, res) => {
    res.sendFile(path.join(paths.PUBLIC_DIR, "professor", "index.html"));
});

app.get(["/admin", "/admin/"], (req, res) => {
    res.sendFile(path.join(paths.PUBLIC_DIR, "admin.html"));
});

app.get(["/admin-login", "/admin-login/"], (req, res) => {
    res.sendFile(path.join(paths.PUBLIC_DIR, "admin-login.html"));
});

app.get(["/diagnostico", "/diagnostico/"], (req, res) => {
    res.sendFile(path.join(paths.PUBLIC_DIR, "diagnostico.html"));
});

app.get(["/redacao", "/redacao/"], (req, res) => {
    res.sendFile(path.join(paths.PUBLIC_DIR, "redacao.html"));
});

app.get(["/aula", "/aula/"], (req, res) => {
    res.sendFile(path.join(paths.PUBLIC_DIR, "aula.html"));
});

app.get(["/exercicios", "/exercicios/"], (req, res) => {
    res.sendFile(path.join(paths.PUBLIC_DIR, "exercicios.html"));
});

app.get(["/exercicio", "/exercicio/"], (req, res) => {
    res.sendFile(path.join(paths.PUBLIC_DIR, "exercicio.html"));
});

app.get(["/editor-aula", "/editor-aula/"], (req, res) => {
    res.sendFile(path.join(paths.PUBLIC_DIR, "editor-aula.html"));
});

app.get(["/editor-exercicio", "/editor-exercicio/"], (req, res) => {
    res.sendFile(path.join(paths.PUBLIC_DIR, "editor-exercicio.html"));
});

app.get(["/aluno", "/aluno/"], (req, res) => {
    res.sendFile(path.join(paths.PUBLIC_DIR, "aluno.html"));
});

// Rotas de API (suporta com e sem prefixo /api em serverless)
app.use("/api", routes);
app.use(routes);

// Rota raiz serve a landing page
app.get("/", (req, res) => {
    res.sendFile(path.join(paths.PUBLIC_DIR, "index.html"));
});

// Error Handler Centralizado
app.use(errorHandler);

module.exports = app;
