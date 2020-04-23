const Posts = require("../models/Posts");

module.exports = {
    List: async (ctx) => {
        try {
            const posts = await Posts.query().select();

            ctx.status = 200;
            ctx.body = {
                data: posts,
            };
        } catch (e) {
            const message = "Internal server error";
            ctx.status = e.statusCode || 500;
            ctx.body = {
                error: e.data || { message },
            };
        }
    },
    View: async (ctx) => {
        try {
            const { id } = ctx.params;

            const [post] = await Posts.query().select().where({ id });
            ctx.status = 200;
            ctx.body = { data: post };
        } catch (e) {
            const message = "Internal server error";
            ctx.status = e.statusCode || 500;
            ctx.body = {
                error: e.data || { message },
            };
        }
    },
    Create: async (ctx) => {
        try {
            const { title, content } = ctx.request.body;

            const post = await Posts.query().insert({ title, content });

            ctx.status = 200;
            ctx.body = { data: post };
        } catch (e) {
            const message = "Internal server error";
            ctx.status = e.statusCode || 500;
            ctx.body = {
                error: e.data || { message },
            };
        }
    },
    Patch: async (ctx) => {
        try {
            const { id } = ctx.params;
            const { status } = ctx.request.body;

            const affectedRows = await Posts.query()
                .patch({ status })
                .where({ id });

            if (!affectedRows) {
                ctx.throw(409, { data: { message: "Conflict patch posts." } });
            }

            ctx.status = 200;
            ctx.body = {
                data: { status },
            };
        } catch (e) {
            const message = "Internal server error";
            ctx.status = e.statusCode || 500;
            ctx.body = {
                error: e.data || { message },
            };
        }
    },
    Delete: async (ctx) => {
        try {
            const { id } = ctx.params;

            const affectedRows = await Posts.query().delete().where({ id });

            if (!affectedRows) {
                ctx.throw(409, { data: { message: "Conflict delete post" } });
            }

            ctx.status = 200;
            ctx.body = {
                message: "success",
            };
        } catch (e) {
            const message = "Internal server error";
            ctx.status = e.statusCode || 500;
            ctx.body = {
                error: e.data || { message },
            };
        }
    },
};
