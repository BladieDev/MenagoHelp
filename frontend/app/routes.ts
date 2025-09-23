import { type RouteConfig, route,} from "@react-router/dev/routes";

export default [
    route("/SignIn","routes/SignIn.tsx"),
    route("/LogIn","routes/Login.tsx"),
] satisfies RouteConfig;