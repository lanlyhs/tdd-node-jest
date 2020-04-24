const Posts = require("../models/Posts");

module.exports = {
    List: async (ctx) => {
        const posts = await Posts.query().select();

        ctx.status = 200;
        ctx.body = {
            data: posts,
        };
    },
    View: async (ctx) => {
        const { id } = ctx.params;

        const [post] = await Posts.query().select().where({ id });
        ctx.status = 200;
        ctx.body = { data: post };
    },
    Create: async (ctx) => {
        const { title, content } = ctx.request.body;

        const post = await Posts.query().insert({ title, content });

        ctx.status = 200;
        ctx.body = { data: post };
    },
    Patch: async (ctx) => {
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
    },
    Delete: async (ctx) => {
        const { id } = ctx.params;

        const affectedRows = await Posts.query().delete().where({ id });

        if (!affectedRows) {
            ctx.throw(409, { data: { message: "Conflict delete post" } });
        }

        ctx.status = 200;
        ctx.body = {
            message: "success",
        };
    },
};
